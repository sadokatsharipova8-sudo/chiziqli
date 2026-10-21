// Savollar taxtasi (Jeopardy uslubi) — jamoaviy sinf o'yini, proyektor uchun.

import { SAVOLLAR } from "../../content/savollar.js";
import { TOPICS } from "../generators.js";
import { topicPicker } from "../course.js";
import { $, $$, esc, mathText, modal, sound, confetti, shuffle, toast } from "../ui.js";

const VALUES = [100, 200, 300, 400, 500];

export function render(el) {
  let teams = [], board = [], timer = null;

  function setup() {
    el.innerHTML = `
      <div class="page-head"><h1>🧩 Savollar taxtasi</h1>
        <p>Sinfni jamoalarga bo'ling. Jamoalar navbat bilan mavzu va ball tanlaydi; savol qanchalik qimmat bo'lsa — shunchalik qiyin. To'g'ri javob — ball qo'shiladi, noto'g'ri — ayiriladi.</p></div>
      <div class="grid g2">
        <div class="card">
          <h3>Mavzular (5 tagacha)</h3>
          <p class="small muted" style="margin-top:0">Har bir mavzu — taxtadagi bitta ustun.</p>
          <div id="tp"></div>
        </div>
        <div class="card">
          <h3>Jamoalar</h3>
          <textarea id="teams" style="min-height:140px">Vektorlar\nMatritsalar\nDeterminantlar</textarea>
          <p class="small muted">Har qatorda bitta jamoa nomi (2–6 ta).</p>
          <button class="btn primary lg" id="go" style="width:100%">▶ O'yinni boshlash</button>
        </div>
      </div>`;
    let picker = null;
    topicPicker($("#tp", el), { key: "taxta", max: 5 }).then((p) => (picker = p));
    $("#go", el).addEventListener("click", () => {
      const topics = (picker ? picker.get() : []).slice(0, 5);
      if (!topics.length) return toast("Kamida bitta mavzu tanlang");
      const names = $("#teams", el).value.split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 6);
      if (topics.length < 1 || names.length < 1) return;
      teams = names.map((n) => ({ name: n, score: 0 }));
      board = topics.map((tid) => {
        const qs = SAVOLLAR.filter((q) => q.topic === tid);
        const sorted = shuffle(qs).sort((a, b) => a.d - b.d).slice(0, 5);
        return { topic: TOPICS.find((t) => t.id === tid), cells: sorted.map((q, i) => ({ q, value: VALUES[i], used: false })) };
      });
      play();
    });
  }

  function play() {
    const rows = Math.max(...board.map((c) => c.cells.length));
    el.innerHTML = `
      <div class="row between mb"><h2 style="margin:0">🧩 Savollar taxtasi</h2><button class="btn ghost sm" id="reset">↺ Qayta sozlash</button></div>
      <div class="board" style="--cols:${board.length}">
        ${board.map((c) => `<div class="head">${esc(c.topic.name)}</div>`).join("")}
        ${Array.from({ length: rows }, (_, r) => board.map((c, ci) => {
          const cell = c.cells[r];
          return cell ? `<button class="cell" data-c="${ci}" data-r="${r}" ${cell.used ? "disabled" : ""}>${cell.value}</button>` : "<div></div>";
        }).join("")).join("")}
      </div>
      <div class="teams mt">${teams.map((t) => `<div class="team"><div>${esc(t.name)}</div><b>${t.score}</b></div>`).join("")}</div>`;
    $("#reset", el).addEventListener("click", () => confirm("Joriy o'yin o'chadi. Davom etasizmi?") && setup());
    $$(".cell", el).forEach((b) => b.addEventListener("click", () => openCell(+b.dataset.c, +b.dataset.r)));
    if (board.every((c) => c.cells.every((x) => x.used))) finish();
  }

  function openCell(ci, r) {
    const cell = board[ci].cells[r], q = cell.q;
    let left = 30;
    const m = modal(`
      <div class="row between"><span class="pill primary">${esc(board[ci].topic.name)} · ${cell.value}</span><span class="pill" id="tm">⏱ ${left}</span></div>
      <div class="k-big mt mb" style="font-size:26px">${mathText(q.q)}</div>
      <div class="mcq-opts">${q.options.map((o, i) => `<div class="mcq-opt" data-i="${i}"><span class="mcq-letter">${"ABCD"[i]}</span><span>${mathText(o)}</span></div>`).join("")}</div>
      <div id="expl" class="mt"></div>
      <div class="row mt"><button class="btn primary" id="show">👁 Javobni ko'rsatish</button></div>
      <div class="mt small muted">Ballni berish:</div>
      <div class="row mt">${teams.map((t, i) => `<div class="row" style="gap:4px"><button class="btn sm ok" data-t="${i}" data-s="1">+ ${esc(t.name)}</button><button class="btn sm danger" data-t="${i}" data-s="-1">−</button></div>`).join("")}</div>
      <div class="row mt"><button class="btn" id="done">Yopish</button></div>`, { wide: true, onClose: () => { clearInterval(timer); cell.used = true; play(); } });
    timer = setInterval(() => {
      left--;
      const tm = $("#tm", m.el);
      if (tm) tm.textContent = `⏱ ${Math.max(0, left)}`;
      if (left <= 5 && left > 0) sound("tick");
      if (left <= 0) { clearInterval(timer); sound("bad"); }
    }, 1000);
    $("#show", m.el).addEventListener("click", () => {
      clearInterval(timer);
      $$(".mcq-opt", m.el).forEach((o) => +o.dataset.i === q.correct && o.classList.add("correct"));
      if (q.explain) $("#expl", m.el).innerHTML = `<div class="mcq-feedback ok">${mathText(q.explain)}</div>`;
      sound("ok");
    });
    m.el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-t]");
      if (!b) return;
      teams[+b.dataset.t].score += cell.value * +b.dataset.s;
      sound(+b.dataset.s > 0 ? "win" : "bad");
      b.textContent = +b.dataset.s > 0 ? "✓" : "✗";
    });
    $("#done", m.el).addEventListener("click", m.close);
  }

  function finish() {
    const best = [...teams].sort((a, b) => b.score - a.score)[0];
    confetti(200); sound("win");
    el.insertAdjacentHTML("beforeend", `<div class="card center mt"><h2>🏆 G'olib: ${esc(best.name)} — ${best.score} ball</h2></div>`);
  }

  setup();
  return () => clearInterval(timer);
}
