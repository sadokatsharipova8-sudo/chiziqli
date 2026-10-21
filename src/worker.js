// Chiziqli algebra platformasi — Cloudflare Worker.
// Statik fayllar "public/" dan beriladi; bu yerda faqat jonli viktorina (Kahoot uslubi) API si.
//
//   POST /api/room                 -> yangi xona: { pin, hostKey }
//   GET  /api/room/:pin/info       -> xona holati
//   GET  /api/room/:pin/ws         -> WebSocket (role=host&key=... yoki role=player&name=...&pid=...)

import { DurableObject } from "cloudflare:workers";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/room" && request.method === "POST") {
      for (let i = 0; i < 10; i++) {
        const pin = String(100000 + Math.floor(Math.random() * 900000));
        const stub = env.ROOMS.get(env.ROOMS.idFromName(pin));
        const r = await stub.init();
        if (r.ok) return json({ pin, hostKey: r.hostKey });
      }
      return json({ error: "Xona yaratib bo'lmadi, qayta urinib ko'ring" }, 503);
    }

    const m = url.pathname.match(/^\/api\/room\/(\d{6})\/(ws|info)$/);
    if (m) {
      const stub = env.ROOMS.get(env.ROOMS.idFromName(m[1]));
      if (m[2] === "info") return json(await stub.info());
      return stub.fetch(request);
    }

    if (url.pathname === "/api/health") return json({ ok: true });
    if (url.pathname.startsWith("/api/")) return json({ error: "Topilmadi" }, 404);
    return env.ASSETS.fetch(request);
  },
};

const ROOM_TTL = 5 * 3600 * 1000; // 5 soat
const MAX_PLAYERS = 250;
const GRACE_MS = 1500;

const clean = (s, max) =>
  String(s ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, max);

export class QuizRoom extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.s = null;
    ctx.blockConcurrencyWhile(async () => {
      this.s = (await ctx.storage.get("s")) || null;
    });
  }

  async save() {
    await this.ctx.storage.put("s", this.s);
  }

  // ---- RPC ----
  async init() {
    if (this.s && Date.now() - this.s.created < ROOM_TTL) return { ok: false };
    await this.ctx.storage.deleteAll();
    this.s = {
      created: Date.now(),
      hostKey: crypto.randomUUID(),
      phase: "setup", // setup | lobby | question | stats | reveal | end
      quiz: null,
      qi: -1,
      round: 1,
      startAt: 0,
      players: {}, // pid -> { name, score, streak, correct, lastDelta, lastOk, lastChoice }
      answers: {}, // pid -> { choice, ms }
      lastReveal: null,
    };
    await this.save();
    await this.ctx.storage.setAlarm(Date.now() + ROOM_TTL);
    return { ok: true, hostKey: this.s.hostKey };
  }

  async info() {
    if (!this.s || !this.s.quiz) return { exists: !!this.s, ready: false };
    return {
      exists: true,
      ready: true,
      phase: this.s.phase,
      title: this.s.quiz.title,
      players: Object.keys(this.s.players).length,
    };
  }

  async alarm() {
    for (const ws of this.ctx.getWebSockets()) {
      try { ws.close(1000, "Xona yopildi"); } catch {}
    }
    await this.ctx.storage.deleteAll();
    this.s = null;
  }

  // ---- WebSocket ulanish ----
  async fetch(request) {
    if (request.headers.get("Upgrade") !== "websocket") return json({ error: "WebSocket kerak" }, 426);
    if (!this.s) return json({ error: "Bunday xona yo'q" }, 404);

    const url = new URL(request.url);
    const role = url.searchParams.get("role");
    let att;

    if (role === "host") {
      if (url.searchParams.get("key") !== this.s.hostKey) return json({ error: "Ruxsat yo'q" }, 403);
      att = { role: "host" };
    } else {
      if (!this.s.quiz) return json({ error: "Xona hali tayyor emas" }, 409);
      if (this.s.phase === "end") return json({ error: "O'yin tugagan" }, 410);
      const pid = clean(url.searchParams.get("pid"), 40);
      let name = clean(url.searchParams.get("name"), 20);
      if (!pid || !name) return json({ error: "Ism kiriting" }, 400);
      if (!this.s.players[pid]) {
        if (Object.keys(this.s.players).length >= MAX_PLAYERS) return json({ error: "Xona to'la" }, 409);
        const taken = new Set(Object.values(this.s.players).map((p) => p.name.toLowerCase()));
        let base = name, n = 2;
        while (taken.has(name.toLowerCase())) name = `${base} ${n++}`;
        this.s.players[pid] = { name, score: 0, streak: 0, correct: 0, lastDelta: 0, lastOk: false, lastChoice: null };
        await this.save();
      }
      // shu pid bilan eski ulanishlarni yopamiz
      for (const ws of this.ctx.getWebSockets()) {
        const a = ws.deserializeAttachment();
        if (a && a.role === "player" && a.pid === pid) { try { ws.close(4000, "Boshqa qurilmadan ulandi"); } catch {} }
      }
      att = { role: "player", pid };
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.ctx.acceptWebSocket(server);
    server.serializeAttachment(att);
    this.sync(server, att);
    if (att.role === "player") this.pushPlayers();
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws, raw) {
    if (!this.s) return;
    let msg;
    try { msg = JSON.parse(typeof raw === "string" ? raw : new TextDecoder().decode(raw)); } catch { return; }
    const att = ws.deserializeAttachment();
    if (!att) return;
    if (msg.t === "ping") return this.send(ws, { t: "pong" });
    if (att.role === "host") return this.onHost(ws, msg);
    if (att.role === "player") return this.onPlayer(ws, att.pid, msg);
  }

  async webSocketClose(ws, code, reason) {
    try { ws.close(code, reason); } catch {}
    const att = ws.deserializeAttachment();
    if (att && att.role === "player") this.pushPlayers(ws);
  }

  async webSocketError(ws) {
    const att = ws.deserializeAttachment();
    if (att && att.role === "player") this.pushPlayers(ws);
  }

  // ---- Yordamchilar ----
  send(ws, obj) {
    try { ws.send(JSON.stringify(obj)); } catch {}
  }

  sockets(role, exclude) {
    return this.ctx.getWebSockets().filter((ws) => {
      if (ws === exclude) return false;
      const a = ws.deserializeAttachment();
      return a && (!role || a.role === role);
    });
  }

  onlinePids(exclude) {
    const set = new Set();
    for (const ws of this.sockets("player", exclude)) set.add(ws.deserializeAttachment().pid);
    return set;
  }

  ranking() {
    return Object.entries(this.s.players)
      .map(([id, p]) => ({ id, name: p.name, score: p.score, correct: p.correct }))
      .sort((a, b) => b.score - a.score);
  }

  pushPlayers(exclude) {
    const online = this.onlinePids(exclude);
    const players = Object.entries(this.s.players).map(([id, p]) => ({ id, name: p.name, score: p.score, online: online.has(id) }));
    for (const ws of this.sockets("host")) this.send(ws, { t: "players", players, answered: Object.keys(this.s.answers).length });
    for (const ws of this.sockets("player", exclude)) this.send(ws, { t: "count", count: online.size });
  }

  questionPayload() {
    const q = this.s.quiz.questions[this.s.qi];
    const remaining = Math.max(0, q.time * 1000 - (Date.now() - this.s.startAt));
    return { t: "question", qi: this.s.qi, total: this.s.quiz.questions.length, q: q.q, options: q.options, time: q.time, remaining, round: this.s.round };
  }

  stats() {
    const q = this.s.quiz.questions[this.s.qi];
    const counts = q.options.map(() => 0);
    for (const a of Object.values(this.s.answers)) if (counts[a.choice] !== undefined) counts[a.choice]++;
    return counts;
  }

  playerReveal(pid) {
    const p = this.s.players[pid];
    const rank = this.ranking().findIndex((r) => r.id === pid) + 1;
    return { ...this.s.lastReveal, you: { ok: p.lastOk, delta: p.lastDelta, score: p.score, rank, streak: p.streak, choice: p.lastChoice } };
  }

  sync(ws, att) {
    const s = this.s;
    if (att.role === "host") {
      this.send(ws, { t: "hello", role: "host", phase: s.phase, title: s.quiz?.title || "", total: s.quiz?.questions.length || 0, qi: s.qi });
      this.pushPlayers();
    } else {
      const p = s.players[att.pid];
      this.send(ws, { t: "hello", role: "player", name: p.name, title: s.quiz.title, phase: s.phase, score: p.score });
    }
    if (s.phase === "question" || s.phase === "stats") {
      const qp = this.questionPayload();
      if (att.role === "player") qp.answered = !!s.answers[att.pid];
      this.send(ws, qp);
      if (s.phase === "stats") this.send(ws, { t: "stats", stats: this.stats() });
    } else if (s.phase === "reveal") {
      this.send(ws, att.role === "host" ? s.lastReveal : this.playerReveal(att.pid));
    } else if (s.phase === "end") {
      this.send(ws, this.endPayload(att.role === "player" ? att.pid : null));
    }
  }

  endPayload(pid) {
    const ranking = this.ranking();
    const out = { t: "end", ranking: ranking.slice(0, 50), total: this.s.quiz.questions.length };
    if (pid) {
      const i = ranking.findIndex((r) => r.id === pid);
      out.you = { rank: i + 1, score: ranking[i]?.score || 0, correct: ranking[i]?.correct || 0 };
    }
    return out;
  }

  // ---- O'qituvchi buyruqlari ----
  async onHost(ws, msg) {
    const s = this.s;
    switch (msg.t) {
      case "setup": {
        const quiz = this.validateQuiz(msg.quiz);
        if (!quiz) return this.send(ws, { t: "error", message: "Savollar noto'g'ri formatda" });
        s.quiz = quiz;
        s.phase = "lobby";
        await this.save();
        return this.sync(ws, { role: "host" });
      }
      case "next": {
        if (!s.quiz || s.phase === "end") return;
        s.qi++;
        if (s.qi >= s.quiz.questions.length) return this.finish();
        return this.startRound(1);
      }
      case "stats": {
        if (s.phase !== "question") return;
        s.phase = "stats";
        await this.save();
        const stats = this.stats();
        for (const w of this.sockets()) this.send(w, { t: "stats", stats });
        return;
      }
      case "revote": {
        if (s.phase !== "question" && s.phase !== "stats") return;
        return this.startRound(s.round + 1);
      }
      case "reveal":
        if (s.phase === "question" || s.phase === "stats") return this.reveal();
        return;
      case "end":
        return this.finish();
      case "kick": {
        const pid = String(msg.id || "");
        if (!s.players[pid]) return;
        delete s.players[pid];
        delete s.answers[pid];
        await this.save();
        for (const w of this.sockets("player")) {
          if (w.deserializeAttachment().pid === pid) { this.send(w, { t: "kicked" }); try { w.close(4001, "Chiqarildi"); } catch {} }
        }
        return this.pushPlayers();
      }
    }
  }

  validateQuiz(q) {
    if (!q || !Array.isArray(q.questions) || q.questions.length < 1 || q.questions.length > 100) return null;
    const questions = [];
    for (const it of q.questions) {
      if (!it || !Array.isArray(it.options)) return null;
      const options = it.options.map((o) => clean(o, 300)).filter(Boolean);
      const correct = Number(it.correct);
      const text = clean(it.q, 1000);
      if (!text || options.length < 2 || options.length > 4) return null;
      if (!Number.isInteger(correct) || correct < 0 || correct >= options.length) return null;
      const time = Math.min(240, Math.max(5, Math.round(Number(it.time) || 20)));
      questions.push({ q: text, options, correct, time });
    }
    return { title: clean(q.title, 120) || "Viktorina", questions };
  }

  async startRound(round) {
    const s = this.s;
    s.phase = "question";
    s.round = round;
    s.answers = {};
    s.startAt = Date.now();
    await this.save();
    const qp = this.questionPayload();
    for (const w of this.sockets()) this.send(w, { ...qp, answered: false });
    this.pushPlayers();
  }

  async reveal() {
    const s = this.s;
    const q = s.quiz.questions[s.qi];
    const T = q.time * 1000;
    for (const [pid, p] of Object.entries(s.players)) {
      const a = s.answers[pid];
      p.lastChoice = a ? a.choice : null;
      if (a && a.choice === q.correct) {
        p.streak++;
        const speed = Math.max(0, Math.min(1, a.ms / T));
        p.lastDelta = Math.round(1000 * (1 - speed / 2)) + Math.min(p.streak - 1, 5) * 100;
        p.score += p.lastDelta;
        p.correct++;
        p.lastOk = true;
      } else {
        p.streak = 0;
        p.lastDelta = 0;
        p.lastOk = false;
      }
    }
    s.phase = "reveal";
    s.lastReveal = {
      t: "reveal",
      qi: s.qi,
      total: s.quiz.questions.length,
      q: q.q,
      options: q.options,
      correct: q.correct,
      stats: this.stats(),
      leaderboard: this.ranking().slice(0, 10),
      last: s.qi === s.quiz.questions.length - 1,
    };
    await this.save();
    for (const w of this.sockets()) {
      const a = w.deserializeAttachment();
      this.send(w, a.role === "host" ? s.lastReveal : this.playerReveal(a.pid));
    }
  }

  async finish() {
    this.s.phase = "end";
    await this.save();
    for (const w of this.sockets()) {
      const a = w.deserializeAttachment();
      this.send(w, this.endPayload(a.role === "player" ? a.pid : null));
    }
  }

  async onPlayer(ws, pid, msg) {
    const s = this.s;
    if (msg.t !== "answer" || s.phase !== "question" || !s.players[pid]) return;
    if (msg.qi !== s.qi || msg.round !== s.round || s.answers[pid]) return;
    const q = s.quiz.questions[s.qi];
    const choice = Number(msg.choice);
    if (!Number.isInteger(choice) || choice < 0 || choice >= q.options.length) return;
    const ms = Date.now() - s.startAt;
    if (ms > q.time * 1000 + GRACE_MS) return this.send(ws, { t: "late" });
    s.answers[pid] = { choice, ms };
    await this.save();
    this.send(ws, { t: "accepted" });
    const online = this.onlinePids();
    const answered = Object.keys(s.answers).length;
    const all = [...online].every((id) => s.answers[id]);
    for (const h of this.sockets("host")) this.send(h, { t: "answered", answered, online: online.size, all });
  }
}
