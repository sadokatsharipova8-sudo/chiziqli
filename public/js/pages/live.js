// Jonli viktorina (Kahoot uslubi) + Peer Instruction (Mazur, Harvard) rejimi.
// #/jonli      — o'qituvchi (xona yaratadi, ekranga chiqaradi)
// #/qoshilish  — talaba (PIN orqali telefondan qo'shiladi)

import { SAVOLLAR } from "../../content/savollar.js";
import { TOPICS } from "../generators.js";
import { store, addXP } from "../store.js";
import { $, $$, esc, mathText, toast, confetti, sound, download, shuffle, parseMcq } from "../ui.js";

const SHAPES = ["▲", "◆", "●", "■"];
const wsUrl = (pin, params) => `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/api/room/${pin}/ws?${new URLSearchParams(params)}`;
const ssGet = (k) => { try { return JSON.parse(sessionStorage.getItem(k) || "null"); } catch { return null; } };
const ssSet = (k, v) => { try { v == null ? sessionStorage.removeItem(k) : sessionStorage.setItem(k, JSON.stringify(v)); } catch {} };

export function render(el, params, query, name) {
  return name === "qoshilish" ? renderPlayer(el, query) : renderHost(el);
}

/** Matnli formatdagi savollarni o'qish: "? savol", "+ to'g'ri", "- noto'g'ri" */
export function parseCustom(text) {
  return text.split(/\n\s*\n/).map((block) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => (l.startsWith("? ") ? l.slice(2) : l));
    return parseMcq(lines.join("\n"));
  }).filter((q) => q.q && q.options.length >= 2 && q.options.length <= 4);
}

function optionsHtml(options, { buttons = false, dimExcept = null, counts = null } = {}) {
  return `<div class="k-opts">${options.map((o, i) => {
    const tag = buttons ? "button" : "div";
    const dim = dimExcept != null && dimExcept !== i ? "dim" : "";
    return `<${tag} class="k-opt k${i} ${dim}" data-i="${i}"><span class="shape">${SHAPES[i]}</span><span style="flex:1">${mathText(o)}</span>${counts ? `<b>${counts[i]}</b>` : ""}${dimExcept === i ? " ✓" : ""}</${tag}>`;
  }).join("")}</div>`;
}

function barsHtml(options, stats, correct) {
  const max = Math.max(1, ...stats);
  return `<div class="bars" style="--n:${options.length}">${options.map((_, i) => `<div style="display:flex;flex-direction:column;justify-content:flex-end;height:100%">
    <div class="bar k${i} ${correct === i ? "correct" : ""}" style="height:${Math.max(16, (stats[i] / max) * 100)}%">${stats[i]}</div>
    <div class="center" style="font-size:22px;margin-top:4px">${SHAPES[i]}${correct === i ? " ✓" : ""}</div></div>`).join("")}</div>`;
}

// =========================================================== O'QITUVCHI
function renderHost(el) {
  let ws = null, closed = false, timer = null, players = [], current = null, phase = "setup", pingId = null, autoRevealed = false;
  const session = ssGet("cag-host");

  function setupScreen() {
    el.innerHTML = `
      <div class="page-head"><h1>🏆 Jonli viktorina</h1>
        <p>Xona yarating, PIN kodni ekranga chiqaring — talabalar telefonidan <b>${esc(location.host)}/#/qoshilish</b> orqali qo'shiladi.
        <b>Peer Instruction</b> rejimi: ovozlarni javobsiz ko'rsating → talabalar juftlikda muhokama qiladi → qayta ovoz beradi.</p></div>
      ${session ? `<div class="card mb row between"><span>Faol xona: <b class="mono">${esc(session.pin)}</b></span><div class="row"><button class="btn primary" id="resume">Qaytish</button><button class="btn ghost" id="forget">Unutish</button></div></div>` : ""}
      <div class="grid g2">
        <div class="card">
          <label class="field">Viktorina nomi<input id="title" value="Chiziqli algebra viktorinasi"></label>
          <div class="tabs mt" style="margin-bottom:12px"><button class="tab active" data-src="bank">Savollar banki</button><button class="tab" data-src="custom">O'z savollarim</button></div>
          <div id="src-bank">
            <div class="small muted mb">Mavzular:</div>
            <div class="row small">${TOPICS.map((t) => `<label><input type="checkbox" class="tp" value="${t.id}" checked> ${esc(t.name)}</label>`).join("")}</div>
            <div class="row mt"><label class="field" style="flex:1">Savollar soni<input id="count" type="number" min="1" max="50" value="10"></label>
            <label class="field" style="flex:1">Qiyinlik<select id="diff"><option value="0">Aralash</option><option value="1">Oson</option><option value="2">O'rta</option><option value="3">Qiyin</option></select></label></div>
          </div>
          <div id="src-custom" hidden>
            <p class="small muted">Har bir savol bo'sh qator bilan ajratiladi. «+» — to'g'ri javob, «-» — noto'g'ri. Formulalar: <span class="mono">$...$</span></p>
            <textarea id="custom" placeholder="? 2x2 birlik matritsa determinanti?\n+ 1\n- 0\n- 2\n- -1\n\n? Vektor ko'paytma ...\n+ ...\n- ..."></textarea>
          </div>
          <div class="row mt">
            <label class="field" style="flex:1">Har savolga vaqt<select id="time">${[10, 15, 20, 30, 45, 60, 90, 120].map((s) => `<option value="${s}" ${s === 20 ? "selected" : ""}>${s} soniya</option>`).join("")}</select></label>
            <label class="row small" style="flex:1;margin-top:22px"><input type="checkbox" id="shuf" checked> Variantlarni aralashtirish</label>
          </div>
          <button class="btn primary lg mt" id="create" style="width:100%">🚀 Xona yaratish</button>
        </div>
        <div class="card">
          <h3>Qanday o'tkaziladi?</h3>
          <ol class="muted" style="padding-left:20px;margin:0">
            <li>Xona yarating va ekranni proyektorga chiqaring.</li>
            <li>Talabalar QR kodni skanerlaydi yoki PIN kiritadi.</li>
            <li>Har bir savolda tezroq to'g'ri javob — ko'proq ball (1000 gacha) + ketma-ketlik bonusi.</li>
            <li><b>Peer Instruction:</b> agar to'g'ri javoblar 30–70% bo'lsa, «📊 Ovozlar» → 2 daqiqa juftlikda muhokama → «🔄 Qayta ovoz». Tadqiqotlar (E. Mazur, Harvard) bu usul tushunishni keskin oshirishini ko'rsatgan.</li>
            <li>Oxirida — shohsupa va natijalarni CSV faylga yuklab olish.</li>
          </ol>
        </div>
      </div>`;
    let src = "bank";
    $$("[data-src]", el).forEach((b) => b.addEventListener("click", () => {
      src = b.dataset.src;
      $$("[data-src]", el).forEach((x) => x.classList.toggle("active", x === b));
      $("#src-bank", el).hidden = src !== "bank"; $("#src-custom", el).hidden = src !== "custom";
    }));
    $("#resume", el)?.addEventListener("click", () => connect(session.pin, session.hostKey, null));
    $("#forget", el)?.addEventListener("click", () => { ssSet("cag-host", null); location.reload(); });
    $("#create", el).addEventListener("click", async () => {
      const time = +$("#time", el).value, shuf = $("#shuf", el).checked;
      let qs;
      if (src === "bank") {
        const topics = $$(".tp:checked", el).map((x) => x.value), d = +$("#diff", el).value;
        qs = shuffle(SAVOLLAR.filter((q) => topics.includes(q.topic) && (!d || q.d === d))).slice(0, Math.max(1, +$("#count", el).value || 10));
      } else qs = parseCustom($("#custom", el).value);
      if (!qs.length) return toast("Savollar topilmadi — mavzular yoki matnni tekshiring");
      const quiz = {
        title: $("#title", el).value.trim() || "Viktorina",
        questions: qs.map((q) => {
          let order = q.options.map((_, i) => i);
          if (shuf) order = shuffle(order);
          return { q: q.q, options: order.map((i) => q.options[i]), correct: order.indexOf(q.correct), time };
        }),
      };
      $("#create", el).disabled = true;
      try {
        const r = await fetch("/api/room", { method: "POST" });
        if (!r.ok) throw new Error();
        const { pin, hostKey } = await r.json();
        ssSet("cag-host", { pin, hostKey });
        connect(pin, hostKey, quiz);
      } catch {
        $("#create", el).disabled = false;
        el.insertAdjacentHTML("afterbegin", `<div class="card mb" style="border-color:var(--bad)"><b>Jonli server bilan bog'lanib bo'lmadi.</b><p class="muted small" style="margin:0">Jonli viktorina Cloudflare Workers (Durable Objects) ga joylangandan keyin ishlaydi. Mahalliy sinov uchun: <span class="mono">npx wrangler dev</span>. Hozircha «Savollar taxtasi» yoki «Ismlar g'ildiragi»dan foydalanishingiz mumkin.</p></div>`);
      }
    });
  }

  function connect(pin, hostKey, quiz) {
    el.innerHTML = `<div class="card empty">Ulanmoqda…</div>`;
    const sock = (ws = new WebSocket(wsUrl(pin, { role: "host", key: hostKey })));
    ws.onmessage = (e) => onMsg(JSON.parse(e.data), pin, quiz);
    ws.onclose = () => {
      if (sock !== ws) return;
      clearInterval(pingId);
      if (closed) return;
      toast("Aloqa uzildi — qayta ulanmoqda…");
      setTimeout(() => !closed && connect(pin, hostKey, null), 1500);
    };
    ws.onerror = () => {};
    pingId = setInterval(() => ws.readyState === 1 && ws.send(JSON.stringify({ t: "ping" })), 25000);
  }
  const send = (o) => ws && ws.readyState === 1 && ws.send(JSON.stringify(o));

  function onMsg(m, pin, quiz) {
    switch (m.t) {
      case "hello":
        if (m.phase === "setup") { if (quiz) send({ t: "setup", quiz }); else { ssSet("cag-host", null); closed = true; ws.close(); setupScreen(); } return; }
        phase = m.phase;
        if (m.phase === "lobby") lobby(pin, m.title);
        return;
      case "players":
        players = m.players;
        if (phase === "lobby") paintPlayers();
        if (phase === "question") $("#answered", el) && ($("#answered", el).textContent = `${m.answered} / ${players.filter((p) => p.online).length}`);
        return;
      case "question": phase = "question"; return showQuestion(m);
      case "answered":
        if ($("#answered", el)) $("#answered", el).textContent = `${m.answered} / ${m.online}`;
        if (m.all && !autoRevealed && phase === "question") { autoRevealed = true; setTimeout(() => phase === "question" && send({ t: "reveal" }), 700); }
        return;
      case "stats": phase = "stats"; return showStats(m.stats);
      case "reveal": phase = "reveal"; return showReveal(m);
      case "end": phase = "end"; return showEnd(m);
      case "error": toast(m.message); return;
    }
  }

  function lobby(pin, title) {
    const joinUrl = `${location.origin}${location.pathname}#/qoshilish?pin=${pin}`;
    el.innerHTML = `
      <div class="card center">
        <div class="muted">${esc(title)}</div>
        <div class="row" style="justify-content:center;gap:40px;margin:14px 0">
          <div><div class="muted small">Sahifa: <b>${esc(location.host)}/#/qoshilish</b></div><div class="small muted">O'yin PIN kodi:</div><div class="pin-box">${pin}</div></div>
          <div id="qr" style="background:#fff;padding:10px;border-radius:12px"></div>
        </div>
        <div class="row" style="justify-content:center"><span class="pill primary" id="pcount">0 ishtirokchi</span>
          <button class="btn primary lg" id="start">▶ Boshlash</button>
          <button class="btn ghost" id="copy">🔗 Havolani nusxalash</button></div>
      </div>
      <div class="card mt"><div class="small muted mb">Ishtirokchilar (chiqarish uchun ismni bosing):</div><div class="players" id="players"></div></div>`;
    try { new window.QRCode($("#qr", el), { text: joinUrl, width: 150, height: 150 }); } catch { $("#qr", el).remove(); }
    $("#start", el).addEventListener("click", () => send({ t: "next" }));
    $("#copy", el).addEventListener("click", () => navigator.clipboard?.writeText(joinUrl).then(() => toast("Nusxalandi")));
    $("#players", el).addEventListener("click", (e) => {
      const b = e.target.closest("[data-id]");
      if (b && confirm(`${b.textContent} ni chiqarasizmi?`)) send({ t: "kick", id: b.dataset.id });
    });
    paintPlayers();
  }
  function paintPlayers() {
    const box = $("#players", el);
    if (!box) return;
    box.innerHTML = players.length ? players.map((p) => `<button class="player-chip ${p.online ? "" : "off"}" data-id="${esc(p.id)}">${esc(p.name)}</button>`).join("") : `<span class="muted">Hali hech kim yo'q… QR kodni skanerlang!</span>`;
    $("#pcount", el).textContent = `${players.filter((p) => p.online).length} ishtirokchi`;
  }

  function countdown(ms, total, onEnd) {
    clearInterval(timer);
    const end = Date.now() + ms;
    const tick = () => {
      const left = Math.max(0, end - Date.now());
      const ring = $("#ring", el);
      if (ring) { ring.style.setProperty("--p", `${(left / (total * 1000)) * 100}%`); $("span", ring).textContent = Math.ceil(left / 1000); }
      if (left <= 0) { clearInterval(timer); onEnd(); }
    };
    tick();
    timer = setInterval(tick, 200);
  }

  function showQuestion(m) {
    current = m; autoRevealed = false;
    el.innerHTML = `
      <div class="row between mb"><span class="pill primary">${m.qi + 1} / ${m.total}${m.round > 1 ? " · 🔄 qayta ovoz" : ""}</span>
        <div class="row"><button class="btn sm" id="pi-stats" title="Peer Instruction">📊 Ovozlar (javobsiz)</button><button class="btn sm" id="reveal">Javobni ochish</button><button class="btn sm ghost" id="end">Tugatish</button></div></div>
      <div class="card mb"><div class="k-big">${mathText(m.q)}</div></div>
      <div class="row mb" style="justify-content:space-between"><div class="timer-ring" id="ring"><span></span></div><div class="center"><div class="k-big" id="answered">0</div><div class="muted small">javob berdi</div></div></div>
      ${optionsHtml(m.options)}`;
    $("#reveal", el).addEventListener("click", () => send({ t: "reveal" }));
    $("#pi-stats", el).addEventListener("click", () => send({ t: "stats" }));
    $("#end", el).addEventListener("click", () => confirm("O'yinni tugatasizmi?") && send({ t: "end" }));
    countdown(m.remaining, m.time, () => phase === "question" && send({ t: "reveal" }));
  }

  function showStats(stats) {
    clearInterval(timer);
    const m = current;
    el.innerHTML = `
      <div class="row between mb"><span class="pill primary">${m.qi + 1} / ${m.total} · Peer Instruction</span></div>
      <div class="card mb"><div class="k-big">${mathText(m.q)}</div></div>
      <div class="card mb center"><h2>💬 Qo'shningiz bilan muhokama qiling!</h2><p class="muted">Boshqacha javob bergan sherigingizni toping va uni o'z fikringizga ishontiring. 1–2 daqiqa.</p>${barsHtml(m.options, stats, null)}</div>
      <div class="row" style="justify-content:center"><button class="btn primary lg" id="revote">🔄 Qayta ovoz berish</button><button class="btn lg" id="reveal">Javobni ochish</button></div>`;
    $("#revote", el).addEventListener("click", () => send({ t: "revote" }));
    $("#reveal", el).addEventListener("click", () => send({ t: "reveal" }));
  }

  function showReveal(m) {
    clearInterval(timer);
    const total = m.stats.reduce((a, b) => a + b, 0), pct = total ? Math.round((m.stats[m.correct] / total) * 100) : 0;
    sound("win");
    el.innerHTML = `
      <div class="row between mb"><span class="pill primary">${m.qi + 1} / ${m.total}</span><span class="pill">To'g'ri javob berganlar: ${pct}%</span></div>
      <div class="card mb"><div class="k-big" style="font-size:22px">${mathText(m.q)}</div></div>
      <div class="grid g2">
        <div class="card">${barsHtml(m.options, m.stats, m.correct)}<div class="mt">${optionsHtml(m.options, { dimExcept: m.correct })}</div></div>
        <div class="card"><h3>🏅 Reyting</h3><div class="lb">${m.leaderboard.slice(0, 5).map((r, i) => `<div class="lb-row" style="animation-delay:${i * 0.08}s"><span class="r">${i + 1}</span>${esc(r.name)}<span class="s">${r.score}</span></div>`).join("") || '<p class="muted">Hali hech kim yo\'q</p>'}</div>
          ${pct >= 30 && pct <= 70 ? `<p class="small muted mt">💡 Natija 30–70% oralig'ida — Peer Instruction uchun ideal savol edi.</p>` : ""}</div>
      </div>
      <div class="row mt" style="justify-content:center"><button class="btn primary lg" id="next">${m.last ? "🏆 Yakuniy natijalar" : "Keyingi savol →"}</button></div>`;
    $("#next", el).addEventListener("click", () => send({ t: "next" }));
  }

  function showEnd(m) {
    clearInterval(timer);
    confetti(200); sound("win");
    const r = m.ranking, colors = ["#f59e0b", "#94a3b8", "#b45309"], h = [190, 140, 110];
    const order = [1, 0, 2].filter((i) => r[i]);
    el.innerHTML = `
      <div class="card center"><h1>🏆 Yakuniy natijalar</h1>
        <div class="podium">${order.map((i) => `<div><div style="font-weight:800;font-size:18px">${esc(r[i].name)}</div><div class="muted small">${r[i].score} ball</div><div class="stand" style="height:${h[i]}px;background:${colors[i]};animation-delay:${(2 - i) * 0.3}s">${i + 1}</div></div>`).join("")}</div>
      </div>
      <div class="card mt"><table class="tbl"><thead><tr><th>#</th><th>Ism</th><th>To'g'ri</th><th>Ball</th></tr></thead>
        <tbody>${r.map((p, i) => `<tr><td>${i + 1}</td><td>${esc(p.name)}</td><td>${p.correct}/${m.total}</td><td><b>${p.score}</b></td></tr>`).join("")}</tbody></table>
        <div class="row mt"><button class="btn" id="csv">⬇️ CSV yuklab olish</button><button class="btn primary" id="new">Yangi o'yin</button></div></div>`;
    $("#csv", el).addEventListener("click", () => download(`viktorina-${new Date().toISOString().slice(0, 10)}.csv`, "﻿O'rin;Ism;To'g'ri;Ball\n" + r.map((p, i) => `${i + 1};"${p.name.replace(/"/g, '""')}";${p.correct};${p.score}`).join("\n"), "text/csv"));
    $("#new", el).addEventListener("click", () => { ssSet("cag-host", null); closed = true; ws?.close(); setupScreen(); });
  }

  setupScreen();
  return () => { closed = true; clearInterval(timer); clearInterval(pingId); try { ws?.close(); } catch {} };
}

// =========================================================== TALABA
function renderPlayer(el, query) {
  let ws = null, closed = false, timer = null, pingId = null, retries = 0, current = null, myName = "";
  let pid;
  try { pid = localStorage.getItem("cag-pid") || crypto.randomUUID(); localStorage.setItem("cag-pid", pid); } catch { pid = crypto.randomUUID(); }

  function joinScreen(err = "") {
    const s = store.get();
    el.innerHTML = `
      <div class="player-screen" style="max-width:440px;margin:0 auto">
        <div class="center"><span class="brand-logo" style="margin:0 auto 10px;width:64px;height:64px;font-size:38px">λ</span><h1>O'yinga qo'shilish</h1></div>
        ${err ? `<div class="result-banner bad">${esc(err)}</div>` : ""}
        <input id="pin" inputmode="numeric" maxlength="6" placeholder="PIN kod" value="${esc(query.get("pin") || "")}" style="font-size:28px;text-align:center;font-weight:800;letter-spacing:.2em">
        <input id="nm" maxlength="20" placeholder="Ismingiz" value="${esc(s.profile.name ? s.profile.name.split(" ").slice(0, 2).join(" ") : "")}" style="font-size:20px;text-align:center">
        <button class="btn primary lg" id="go">Kirish →</button>
      </div>`;
    $("#go", el).addEventListener("click", join);
    el.addEventListener("keydown", (e) => e.key === "Enter" && e.target.matches("#pin,#nm") && join());
  }

  async function join() {
    const pin = $("#pin", el).value.replace(/\D/g, ""), name = $("#nm", el).value.trim();
    if (pin.length !== 6) return toast("6 xonali PIN kiriting");
    if (!name) return toast("Ismingizni kiriting");
    try {
      const r = await fetch(`/api/room/${pin}/info`);
      const info = await r.json();
      if (!info.ready) return joinScreen("Bunday faol xona topilmadi. PIN ni tekshiring.");
      if (info.phase === "end") return joinScreen("Bu o'yin allaqachon tugagan.");
    } catch { return joinScreen("Server bilan bog'lanib bo'lmadi."); }
    myName = name;
    ssSet("cag-player", { pin, name });
    connect(pin, name);
  }

  function connect(pin, name) {
    const sock = (ws = new WebSocket(wsUrl(pin, { role: "player", name, pid })));
    ws.onopen = () => { retries = 0; };
    ws.onmessage = (e) => onMsg(JSON.parse(e.data));
    ws.onclose = (e) => {
      if (sock !== ws) return;
      clearInterval(pingId);
      if (closed) return;
      if (e.code === 4001) { ssSet("cag-player", null); return joinScreen("Siz o'yindan chiqarildingiz."); }
      if (e.code === 4000) { el.innerHTML = `<div class="card empty">Siz boshqa oynadan ulandingiz.</div>`; return; }
      if (retries++ < 8) setTimeout(() => !closed && connect(pin, name), 1500);
      else joinScreen("Aloqa uzildi.");
    };
    pingId = setInterval(() => ws.readyState === 1 && ws.send(JSON.stringify({ t: "ping" })), 25000);
  }
  const send = (o) => ws && ws.readyState === 1 && ws.send(JSON.stringify(o));

  const wait = (title, sub = "") => {
    clearInterval(timer);
    el.innerHTML = `<div class="player-screen center"><div style="font-size:64px">⏳</div><h1>${title}</h1><p class="muted">${sub}</p><div class="pill primary" style="margin:0 auto">${esc(myName)}</div></div>`;
  };

  function onMsg(m) {
    switch (m.t) {
      case "hello":
        myName = m.name;
        if (m.phase === "lobby") wait("Siz o'yindasiz!", `Ismingizni ekranda ko'ring. «${esc(m.title)}» tez orada boshlanadi…`);
        return;
      case "count": return;
      case "question": return question(m);
      case "accepted": return wait("Javob qabul qilindi!", "Boshqalarni kutamiz…");
      case "late": return wait("Vaqt tugadi ⌛", "Keyingi savolda tezroq bo'ling!");
      case "stats":
        clearInterval(timer);
        el.innerHTML = `<div class="player-screen center"><div style="font-size:64px">💬</div><h1>Muhokama vaqti!</h1><p class="muted">Yoningizdagi talaba bilan javoblaringizni solishtiring va bir-biringizni ishontirishga harakat qiling. Keyin qayta ovoz berasiz.</p>${current ? barsHtml(current.options, m.stats, null) : ""}</div>`;
        return;
      case "reveal": {
        clearInterval(timer);
        const y = m.you;
        if (y.ok) { sound("ok"); addXP(5, "jonli viktorina"); } else sound("bad");
        el.innerHTML = `<div class="player-screen">
          <div class="big-feedback ${y.ok ? "ok" : "bad"}"><h1>${y.ok ? "✓ To'g'ri!" : y.choice == null ? "⌛ Javob bermadingiz" : "✗ Noto'g'ri"}</h1>
            <div style="font-size:28px;font-weight:800">${y.ok ? `+${y.delta}` : "+0"}</div>
            ${y.streak > 1 ? `<div>🔥 ${y.streak} ta ketma-ket!</div>` : ""}</div>
          <div class="card center"><div class="muted small">Umumiy ball</div><div class="k-big">${y.score}</div><div class="pill primary" style="margin:0 auto">${y.rank}-o'rin</div></div>
          ${optionsHtml(m.options, { dimExcept: m.correct })}</div>`;
        return;
      }
      case "end": {
        clearInterval(timer);
        const y = m.you || { rank: "?", score: 0, correct: 0 };
        if (y.rank <= 3) confetti();
        el.innerHTML = `<div class="player-screen center"><div style="font-size:72px">${["🥇", "🥈", "🥉"][y.rank - 1] || "🎉"}</div>
          <h1>${y.rank}-o'rin!</h1><div class="k-big">${y.score} ball</div><p class="muted">${y.correct} / ${m.total} to'g'ri javob</p>
          <a class="btn primary" href="#/oyinlar">O'yinlar</a></div>`;
        ssSet("cag-player", null);
        closed = true; ws.close();
        return;
      }
      case "kicked": closed = true; ssSet("cag-player", null); return joinScreen("Siz o'yindan chiqarildingiz.");
    }
  }

  function question(m) {
    current = m;
    if (m.answered) return wait("Javob qabul qilindi!", "Boshqalarni kutamiz…");
    el.innerHTML = `<div class="player-screen">
      <div class="row between"><span class="pill primary">${m.qi + 1} / ${m.total}${m.round > 1 ? " · qayta ovoz" : ""}</span><b id="left"></b></div>
      <div class="progress"><i id="bar" style="width:100%"></i></div>
      <div class="card"><div style="font-size:18px;font-weight:600">${mathText(m.q)}</div></div>
      ${optionsHtml(m.options, { buttons: true })}</div>`;
    const end = Date.now() + m.remaining;
    clearInterval(timer);
    timer = setInterval(() => {
      const left = Math.max(0, end - Date.now());
      const bar = $("#bar", el), lf = $("#left", el);
      if (bar) bar.style.width = `${(left / (m.time * 1000)) * 100}%`;
      if (lf) lf.textContent = Math.ceil(left / 1000) + " s";
      if (left <= 0) clearInterval(timer);
    }, 200);
    $$(".k-opt", el).forEach((b) => b.addEventListener("click", () => {
      $$(".k-opt", el).forEach((x) => { x.disabled = true; if (x !== b) x.classList.add("dim"); });
      sound("pop");
      send({ t: "answer", choice: +b.dataset.i, qi: m.qi, round: m.round });
    }));
  }

  const prev = ssGet("cag-player");
  if (prev && (!query.get("pin") || query.get("pin") === prev.pin)) { myName = prev.name; wait("Qayta ulanmoqda…"); connect(prev.pin, prev.name); }
  else joinScreen();
  return () => { closed = true; clearInterval(timer); clearInterval(pingId); try { ws?.close(); } catch {} };
}
