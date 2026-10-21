// Oraliqli takrorlash (Leitner qutilari): javob to'g'ri bo'lsa karta keyingi qutiga o'tadi va kamroq so'raladi.

import { SAVOLLAR } from "../../content/savollar.js";
import { store, dueIds, newIds, leitnerUpdate, addXP } from "../store.js";
import { renderMcq, $, esc, shuffle, confetti } from "../ui.js";
import { TOPICS, topicById } from "../generators.js";

export function render(el) {
  const all = SAVOLLAR.map((q) => q.id);
  const s = store.get();
  const due = dueIds(all), fresh = newIds(all);
  const boxes = [0, 1, 2, 3, 4, 5].map((b) => all.filter((id) => (s.leitner[id]?.box ?? -1) === b).length);

  el.innerHTML = `
    <div class="page-head">
      <h1>🔁 Takrorlash</h1>
      <p><b>Oraliqli takrorlash</b> (spaced repetition) — har bir savol siz uni qanchalik yaxshi bilishingizga qarab 1, 3, 7, 16, 35 kundan keyin qayta so'raladi. Bu Ebbingauz «unutish egri chizig'i»ga qarshi eng samarali ilmiy usul.</p>
    </div>
    <div class="grid g4 mb">
      <div class="card stat"><b>${due.length}</b><span>bugun takrorlash</span></div>
      <div class="card stat"><b>${fresh.length}</b><span>yangi kartalar</span></div>
      ${[1, 2, 3, 4, 5].map((b) => `<div class="card stat"><b>${boxes[b]}</b><span>${b}-quti</span></div>`).join("")}
    </div>
    <div class="card mb">
      <h3>Sessiya boshlash</h3>
      <div class="row">
        <button class="btn primary" data-mode="due" ${due.length ? "" : "disabled"}>🔁 Muddati kelganlar (${due.length})</button>
        <button class="btn" data-mode="new" ${fresh.length ? "" : "disabled"}>✨ 10 ta yangi karta</button>
        <select id="topic-sel"><option value="">Mavzu bo'yicha…</option>${TOPICS.map((t) => `<option value="${t.id}">${esc(t.name)}</option>`).join("")}</select>
      </div>
    </div>
    <div id="session"></div>`;

  const start = (ids, title) => runSession($("#session", el), shuffle(ids).slice(0, 15), title);
  el.querySelector('[data-mode="due"]').addEventListener("click", () => start(due, "Muddati kelganlar"));
  el.querySelector('[data-mode="new"]').addEventListener("click", () => start(fresh.slice(0, 40), "Yangi kartalar"));
  $("#topic-sel", el).addEventListener("change", (e) => {
    if (!e.target.value) return;
    start(SAVOLLAR.filter((q) => q.topic === e.target.value).map((q) => q.id), topicById(e.target.value).name);
  });
}

function runSession(box, ids, title) {
  if (!ids.length) { box.innerHTML = `<div class="card empty">Bu yerda hozircha karta yo'q.</div>`; return; }
  let i = 0, ok = 0;
  box.scrollIntoView({ behavior: "smooth" });
  const step = () => {
    if (i >= ids.length) {
      box.innerHTML = `<div class="card center"><h2>Sessiya yakunlandi! 🎉</h2><p class="k-big">${ok} / ${ids.length}</p><p class="muted">Xato javob berilgan kartalar ertaga yana so'raladi.</p><a class="btn primary" href="#/takrorlash" onclick="location.reload()">Yangilash</a></div>`;
      if (ok === ids.length) confetti();
      return;
    }
    const item = SAVOLLAR.find((q) => q.id === ids[i]);
    const t = topicById(item.topic);
    box.innerHTML = `<div class="card">
      <div class="row between mb"><span class="pill">${esc(title)} · ${i + 1}/${ids.length}</span><span class="pill" style="color:${t.color}">${esc(t.name)}</span></div>
      <div class="progress mb"><i style="width:${(i / ids.length) * 100}%"></i></div>
      <div class="mcq bare" id="card"></div>
      <div class="row mt"><button class="btn primary" id="nx" hidden>Keyingi →</button></div></div>`;
    renderMcq($("#card", box), item, {
      shuffle: true,
      onAnswer: (good) => {
        leitnerUpdate(item.id, good);
        if (good) { ok++; addXP(3, "takrorlash"); }
        const nx = $("#nx", box); nx.hidden = false; nx.focus();
      },
    });
    $("#nx", box).addEventListener("click", () => { i++; step(); });
  };
  step();
}
