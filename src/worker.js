// Chiziqli algebra platformasi — Cloudflare Worker.
// Statik fayllar "public/" dan beriladi; bu yerda faqat jonli viktorina (Kahoot uslubi) API si.
//
//   POST /api/teacher/login        -> { password } => { token } (o'qituvchi kirishi)
//   POST /api/teacher/check        -> { token } => { ok }
//   POST /api/student/login        -> { login, password } => { token, name, group } (talaba kirishi)
//   POST /api/student/check        -> { token } => { ok, name, group }
//   POST /api/students/list|create|reset|delete -> talabalar hisoblari (faqat o'qituvchi tokeni bilan)
//   POST /api/room                 -> yangi xona: { pin, hostKey } (faqat o'qituvchi tokeni bilan)
//   GET  /api/room/:pin/info       -> xona holati
//   GET  /api/room/:pin/ws         -> WebSocket (role=host&key=... yoki role=player&name=...&pid=...)
//
// O'qituvchi paroli kodda saqlanmaydi: Cloudflare → Worker → Settings → Variables and Secrets
// bo'limida TEACHER_PASSWORD nomli maxfiy o'zgaruvchi (Secret) sifatida kiritiladi.

import { DurableObject } from "cloudflare:workers";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const TOKEN_TTL = 30 * 24 * 3600 * 1000; // 30 kun
const enc = new TextEncoder();
const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey("raw", enc.encode("cag-teacher|" + secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

/** Uzunligi teng bo'lmagan satrlarni ham vaqt bo'yicha bir xil taqqoslaydi. */
async function safeEqual(a, b) {
  const [x, y] = await Promise.all([a, b].map((s) => crypto.subtle.digest("SHA-256", enc.encode(String(s)))));
  const u = new Uint8Array(x), v = new Uint8Array(y);
  let d = 0;
  for (let i = 0; i < u.length; i++) d |= u[i] ^ v[i];
  return d === 0;
}

async function makeToken(env) {
  const payload = String(Date.now() + TOKEN_TTL);
  return payload + "." + (await hmac(env.TEACHER_PASSWORD, payload));
}

async function checkToken(env, token) {
  if (!env.TEACHER_PASSWORD || typeof token !== "string") return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !(+payload > Date.now())) return false;
  return safeEqual(sig, await hmac(env.TEACHER_PASSWORD, payload));
}

const readJson = async (request) => { try { return await request.json(); } catch { return {}; } };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/teacher/login" && request.method === "POST") {
      if (!env.TEACHER_PASSWORD) return json({ error: "O'qituvchi paroli hali o'rnatilmagan (Cloudflare'da TEACHER_PASSWORD)" }, 503);
      const { password } = await readJson(request);
      if (!(await safeEqual(password ?? "", env.TEACHER_PASSWORD))) {
        await new Promise((r) => setTimeout(r, 600)); // parol tanlashni sekinlashtirish
        return json({ error: "Parol noto'g'ri" }, 401);
      }
      return json({ token: await makeToken(env) });
    }

    if (url.pathname === "/api/teacher/check" && request.method === "POST") {
      const { token } = await readJson(request);
      return json({ ok: await checkToken(env, token) });
    }

    // ---- Kurs sozlamalari (o'tilgan mavzular) ----
    if (url.pathname === "/api/settings") {
      const acc = env.ACCOUNTS.get(env.ACCOUNTS.idFromName("main"));
      if (request.method === "GET") return json(await acc.getSettings());
      if (request.method === "POST") {
        if (!(await checkToken(env, request.headers.get("x-teacher-token")))) return json({ error: "Faqat o'qituvchi uchun" }, 401);
        return json(await acc.setSettings(await readJson(request)));
      }
    }

    // ---- Talabalar hisoblari ----
    if (url.pathname.startsWith("/api/student") && request.method === "POST") {
      const acc = env.ACCOUNTS.get(env.ACCOUNTS.idFromName("main"));
      const body = await readJson(request);
      if (url.pathname === "/api/student/login") {
        const r = await acc.login(String(body.login ?? ""), String(body.password ?? ""));
        if (!r.ok) await new Promise((res) => setTimeout(res, 600));
        return json(r, r.ok ? 200 : r.status || 401);
      }
      if (url.pathname === "/api/student/check") return json(await acc.check(String(body.token ?? "")));

      // Quyidagilar faqat o'qituvchi uchun
      if (!(await checkToken(env, request.headers.get("x-teacher-token")))) return json({ error: "Faqat o'qituvchi uchun" }, 401);
      if (url.pathname === "/api/students/list") return json(await acc.list());
      if (url.pathname === "/api/students/create") return json(await acc.create(String(body.group ?? ""), Array.isArray(body.names) ? body.names : []));
      if (url.pathname === "/api/students/reset") return json(await acc.reset(String(body.login ?? "")));
      if (url.pathname === "/api/students/delete") return json(await acc.remove(body.login ? String(body.login) : null, body.group ? String(body.group) : null));
      return json({ error: "Topilmadi" }, 404);
    }

    if (url.pathname === "/api/room" && request.method === "POST") {
      if (!(await checkToken(env, request.headers.get("x-teacher-token")))) return json({ error: "Faqat o'qituvchi xona yarata oladi" }, 401);
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

// ===================== Talabalar hisoblari =====================
// Bitta "main" nusxa, SQLite jadvali. Parollar server tomonidan tasodifiy yaratiladi va faqat
// tuz + HMAC-SHA256 ko'rinishida saqlanadi (ochiq matn saqlanmaydi).

const PW_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";
const STUDENT_TTL = 120 * 24 * 3600 * 1000; // 120 kun (semestr)
const MAX_FAILS = 10, LOCK_MS = 15 * 60 * 1000;

const randStr = (n, abc = PW_ALPHABET) => {
  const b = crypto.getRandomValues(new Uint8Array(n));
  return [...b].map((x) => abc[x % abc.length]).join("");
};
const hexOf = (buf) => [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, "0")).join("");
async function hmacHex(key, data) {
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hexOf(await crypto.subtle.sign("HMAC", k, enc.encode(data)));
}

const TR = { а:"a",б:"b",в:"v",г:"g",ғ:"g",д:"d",е:"e",ё:"yo",ж:"j",з:"z",и:"i",й:"y",к:"k",қ:"q",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ў:"o",ф:"f",х:"x",ҳ:"h",ц:"s",ч:"ch",ш:"sh",щ:"sh",ъ:"",ы:"i",ь:"",э:"e",ю:"yu",я:"ya" };
const slug = (s) => [...String(s).toLowerCase()].map((c) => TR[c] ?? c).join("").replace(/[^a-z0-9]/g, "");

export class Accounts extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS students (
      login TEXT PRIMARY KEY, name TEXT NOT NULL, grp TEXT NOT NULL,
      salt TEXT NOT NULL, hash TEXT NOT NULL, ver INTEGER NOT NULL DEFAULT 1,
      created INTEGER NOT NULL, last_login INTEGER, fails INTEGER NOT NULL DEFAULT 0, lock_until INTEGER NOT NULL DEFAULT 0)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v TEXT NOT NULL)`);
    const row = this.sql.exec(`SELECT v FROM meta WHERE k = 'secret'`).toArray()[0];
    this.secret = row?.v;
    if (!this.secret) {
      this.secret = randStr(48, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
      this.sql.exec(`INSERT INTO meta (k, v) VALUES ('secret', ?)`, this.secret);
    }
  }

  row(login) {
    return this.sql.exec(`SELECT * FROM students WHERE login = ?`, login).toArray()[0];
  }

  async newPassword() {
    const password = randStr(8), salt = randStr(16);
    return { password, salt, hash: await hmacHex(salt, password) };
  }

  async token(r) {
    const payload = btoa(JSON.stringify({ l: r.login, v: r.ver, e: Date.now() + STUDENT_TTL })).replace(/=+$/, "");
    return payload + "." + (await hmacHex(this.secret, payload));
  }

  // ---- RPC ----
  async login(login, password) {
    login = login.trim().toLowerCase();
    const r = this.row(login);
    if (!r) return { ok: false, error: "Login yoki parol noto'g'ri" };
    if (r.lock_until > Date.now()) return { ok: false, status: 429, error: "Juda ko'p noto'g'ri urinish. 15 daqiqadan so'ng qayta urinib ko'ring" };
    if (!(await safeEqual(await hmacHex(r.salt, password.trim()), r.hash))) {
      const fails = r.fails + 1;
      this.sql.exec(`UPDATE students SET fails = ?, lock_until = ? WHERE login = ?`, fails >= MAX_FAILS ? 0 : fails, fails >= MAX_FAILS ? Date.now() + LOCK_MS : 0, login);
      return { ok: false, error: "Login yoki parol noto'g'ri" };
    }
    this.sql.exec(`UPDATE students SET fails = 0, lock_until = 0, last_login = ? WHERE login = ?`, Date.now(), login);
    return { ok: true, token: await this.token(r), login: r.login, name: r.name, group: r.grp };
  }

  async check(token) {
    const [payload, sig] = String(token).split(".");
    if (!payload || !sig || !(await safeEqual(sig, await hmacHex(this.secret, payload)))) return { ok: false };
    let p;
    try { p = JSON.parse(atob(payload)); } catch { return { ok: false }; }
    const r = this.row(p.l);
    if (!r || r.ver !== p.v || !(p.e > Date.now())) return { ok: false };
    return { ok: true, login: r.login, name: r.name, group: r.grp };
  }

  async list() {
    return this.sql.exec(`SELECT login, name, grp AS "group", created, last_login AS lastLogin FROM students ORDER BY grp, name`).toArray();
  }

  async create(group, names) {
    group = clean(group, 20);
    if (!group) return { error: "Guruhni kiriting" };
    const out = [];
    for (const raw of names.slice(0, 300)) {
      const name = clean(raw, 60).replace(/\s+/g, " ");
      if (!name) continue;
      const exist = this.sql.exec(`SELECT login FROM students WHERE name = ? AND grp = ?`, name, group).toArray()[0];
      if (exist) { out.push({ name, group, login: exist.login, existed: true }); continue; }
      const [fam, ism = ""] = name.split(" ");
      const base = (slug(fam) || "talaba") + (slug(ism)[0] ? "." + slug(ism)[0] : "");
      let login = base, i = 2;
      while (this.row(login)) login = base + i++;
      const { password, salt, hash } = await this.newPassword();
      this.sql.exec(`INSERT INTO students (login, name, grp, salt, hash, created) VALUES (?, ?, ?, ?, ?, ?)`, login, name, group, salt, hash, Date.now());
      out.push({ name, group, login, password });
    }
    return { ok: true, students: out };
  }

  async reset(login) {
    const r = this.row(login);
    if (!r) return { error: "Bunday login yo'q" };
    const { password, salt, hash } = await this.newPassword();
    this.sql.exec(`UPDATE students SET salt = ?, hash = ?, ver = ver + 1, fails = 0, lock_until = 0 WHERE login = ?`, salt, hash, login);
    return { ok: true, login, name: r.name, group: r.grp, password };
  }

  async getSettings() {
    const row = this.sql.exec(`SELECT v FROM meta WHERE k = 'covered'`).toArray()[0];
    return { covered: row ? +row.v : null };
  }

  async setSettings({ covered }) {
    const n = Math.round(+covered);
    if (!(n >= 1 && n <= 50)) return { error: "Mavzu raqami noto'g'ri" };
    this.sql.exec(`INSERT INTO meta (k, v) VALUES ('covered', ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v`, String(n));
    return { ok: true, covered: n };
  }

  async remove(login, group) {
    if (login) this.sql.exec(`DELETE FROM students WHERE login = ?`, login);
    else if (group) this.sql.exec(`DELETE FROM students WHERE grp = ?`, group);
    return { ok: true };
  }
}
