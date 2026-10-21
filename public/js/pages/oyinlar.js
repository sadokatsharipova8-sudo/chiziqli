import { getCovered, coveredLabel } from "../course.js";
import { TOPICS } from "../generators.js";
import { looksTeacher } from "../auth.js";
import { esc } from "../ui.js";

export async function render(el) {
  const cov = await getCovered();
  const games = [
    ["#/jonli", "🏆", "Jonli viktorina", "Kahoot uslubida: o'qituvchi ekranida savol, talabalar telefondan javob beradi. Tezlik uchun ball, reyting, shohsupa. Peer Instruction rejimi bilan.", "linear-gradient(135deg,#4f46e5,#7c3aed)", "Sinf · Jonli"],
    ["#/charx", "🎡", "Ismlar g'ildiragi", "Wheel of Names: tasodifiy talabani tanlang — xohlasangiz, unga tasodifiy savol ham chiqadi.", "linear-gradient(135deg,#f59e0b,#ef4444)", "Sinf"],
    ["#/taxta", "🧩", "Savollar taxtasi", "Jeopardy uslubida jamoaviy o'yin: mavzu va ball tanlanadi, jamoalar raqobatlashadi.", "linear-gradient(135deg,#0ea5e9,#2563eb)", "Sinf · Jamoa"],
    ["#/sprint", "⚡", "60 soniya sprint", "Bir daqiqada imkon qadar ko'p hisob-kitob: determinant, skalyar ko'paytma, vektor uzunligi…", "linear-gradient(135deg,#22c55e,#0d9488)", "Yakka"],
    ["#/xotira", "🧠", "Xotira o'yini", "Juftlarni toping: matritsa ↔ determinant, tushuncha ↔ formula.", "linear-gradient(135deg,#ec4899,#8b5cf6)", "Yakka"],
    ["#/qoshilish", "📱", "O'yinga qo'shilish", "O'qituvchi bergan PIN kod bilan jonli viktorinaga kiring.", "linear-gradient(135deg,#334155,#0f172a)", "Talaba"],
  ];
  el.innerHTML = `
    <div class="page-head"><h1>🎮 O'yinlar</h1>
      <p>Geymifikatsiya — faollik va motivatsiyani oshiradi. Har bir o'yin dars mazmuniga bog'langan: savollar banki va masala generatorlaridan foydalanadi.</p></div>
    <div class="card mb row between" style="gap:10px">
      <span>📅 ${cov < TOPICS.length ? `${coveredLabel(cov)}. O'yinlarda faqat shu mavzular savollari chiqadi (oxirgisi: ${esc(TOPICS[cov - 1].name)}). Har bir o'yinda mavzularni alohida tanlash mumkin.` : "O'yinlarda barcha mavzular savollari chiqadi. Har bir o'yinda mavzularni alohida tanlash mumkin."}</span>
      ${looksTeacher() ? `<a class="btn sm" href="#/oqituvchi/kurs">O'tilgan mavzularni belgilash</a>` : ""}
    </div>
    <div class="grid g3">
      ${games.map(([href, ico, t, d, bg, tag]) => `<a class="tile game-tile" href="${href}" style="background:${bg}"><span class="pill tag">${tag}</span><span class="ico">${ico}</span><h3>${t}</h3><p>${d}</p></a>`).join("")}
    </div>`;
}
