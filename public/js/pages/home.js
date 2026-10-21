import { store, levelInfo, BADGES, masteryLabel, dueIds } from "../store.js";
import { TOPICS } from "../generators.js";
import { SAVOLLAR } from "../../content/savollar.js";
import { esc } from "../ui.js";

const ART = `<svg class="hero-art" viewBox="0 0 200 200" fill="none" stroke="white" stroke-width="1.4">
  ${Array.from({ length: 9 }, (_, i) => `<line x1="${i * 25}" y1="0" x2="${i * 25 + 40}" y2="200"/><line x1="0" y1="${i * 25}" x2="200" y2="${i * 25 - 20}"/>`).join("")}
  <ellipse cx="100" cy="100" rx="80" ry="45" transform="rotate(-20 100 100)" stroke-width="2.5"/>
  <line x1="100" y1="100" x2="170" y2="40" stroke-width="4"/><line x1="100" y1="100" x2="60" y2="30" stroke-width="4"/>
</svg>`;

export function render(el) {
  const s = store.get();
  const L = levelInfo();
  const due = dueIds(SAVOLLAR.map((q) => q.id)).length;
  const mastered = Object.values(s.mastery).filter((v) => v >= 90).length;
  // "Familiya Ism" -> Ism
  const parts = (s.profile.name || "").trim().split(/\s+/).filter(Boolean);
  const name = esc(parts[1] || parts[0] || "");

  el.innerHTML = `
    <section class="hero">
      ${ART}
      <span class="pill" style="background:rgba(255,255,255,.18);color:#fff">Interaktiv o'quv platformasi</span>
      <h1 style="margin-top:12px">${name ? `Xush kelibsiz, ${name}!` : "Chiziqli algebra va analitik geometriya"}</h1>
      <p>O'qing, ko'ring, sinab ko'ring, o'ynang. Darslik, interaktiv laboratoriya, mashqlar va sinf o'yinlari — bitta joyda.</p>
      <div class="row mt">
        <a class="btn primary lg" href="#/darslik">📘 O'qishni boshlash</a>
        <a class="btn lg" href="#/qoshilish">🎮 O'yinga qo'shilish</a>
      </div>
    </section>

    <div class="grid g4 mb">
      <div class="card stat"><b>${s.xp}</b><span>XP · ${L.level}-daraja</span><div class="progress mt"><i style="width:${L.pct}%"></i></div><span class="small">${esc(L.name)}</span></div>
      <div class="card stat"><b>🔥 ${s.streak}</b><span>kunlik seriya</span></div>
      <div class="card stat"><b>${mastered}/${TOPICS.length}</b><span>mavzu «Ustoz» darajasida</span></div>
      <a class="card stat" href="#/takrorlash" style="color:inherit;text-decoration:none"><b>🔁 ${due}</b><span>bugun takrorlash kerak</span></a>
    </div>

    <h2>Nimadan boshlaymiz?</h2>
    <div class="grid g3 mb">
      ${[
        ["📘", "Darslik", "Formulalar, ta'riflar va har bo'lim ichida «O'zingizni tekshiring» savollari.", "#/darslik", "#6366f1"],
        ["🔬", "Laboratoriya", "Matritsani o'zgartiring — tekislik qanday o'zgarishini ko'ring. Gauss usuli qadamma-qadam.", "#/lab", "#0ea5e9"],
        ["🎯", "Mashqlar", "Cheksiz yangi masalalar, maslahatlar va to'liq yechimlar. Mavzuni «Ustoz» darajasigacha o'zlashtiring.", "#/mashq", "#22c55e"],
        ["🔁", "Takrorlash", "Oraliqli takrorlash: unutish egri chizig'iga qarshi ilmiy usul.", "#/takrorlash", "#f59e0b"],
        ["📝", "Mustaqil ish", "Har bir talabaga shaxsiy variant, natija va tasdiqlash kodi.", "#/mustaqil", "#ec4899"],
        ["🎮", "O'yinlar", "Jonli viktorina, ismlar g'ildiragi, savollar taxtasi, sprint va xotira o'yini.", "#/oyinlar", "#ef4444"],
      ].map(([ico, t, d, href, c]) => `<a class="tile" href="${href}"><span class="ico" style="background:${c}22;color:${c}">${ico}</span><h3>${t}</h3><p>${d}</p></a>`).join("")}
    </div>

    <div class="grid g2">
      <div class="card">
        <div class="row between"><h2 style="margin:0">Mavzular bo'yicha o'zlashtirish</h2><a href="#/mashq" class="small">Mashq qilish →</a></div>
        <div class="mt">
          ${TOPICS.map((t) => {
            const v = s.mastery[t.id] || 0, m = masteryLabel(v);
            return `<a class="mastery-row" href="#/mashq/${t.id}" style="color:inherit;text-decoration:none">
              <span><span class="muted small">${t.sem}.${t.no}</span> ${esc(t.name)}</span><span class="m-label ${m.cls}">${m.name}</span>
              <div class="progress" style="grid-column:1/-1"><i style="width:${v}%;background:${t.color}"></i></div></a>`;
          }).join("")}
        </div>
      </div>
      <div class="card">
        <div class="row between"><h2 style="margin:0">Nishonlar</h2><span class="muted small">${s.badges.length}/${BADGES.length}</span></div>
        <div class="badge-grid mt">
          ${BADGES.map((b) => `<div class="badge ${s.badges.includes(b.id) ? "" : "locked"}" title="${esc(b.desc)}"><span class="b-ico">${b.icon}</span>${esc(b.name)}</div>`).join("")}
        </div>
      </div>
    </div>`;
}
