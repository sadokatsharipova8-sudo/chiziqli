// Sinf vositalari: taymer, Think–Pair–Share, tasodifiy guruhlar, Exit ticket / Muddiest point.

import { $, $$, esc, sound, shuffle, fmtTime, confetti, mathText } from "../ui.js";

const TABS = [["taymer", "⏱ Taymer"], ["tps", "💭 Think–Pair–Share"], ["guruh", "👥 Guruhlar"], ["chiqish", "🎫 Chiqish chiptasi"]];

export function render(el, params) {
  const tab = TABS.some((t) => t[0] === params[0]) ? params[0] : "taymer";
  el.innerHTML = `
    <div class="page-head"><h1>🧰 Sinf vositalari</h1><p>Faol o'qitish usullari uchun tayyor vositalar — proyektorga chiqarib ishlating.</p></div>
    <div class="tabs">${TABS.map(([id, n]) => `<a class="tab ${id === tab ? "active" : ""}" href="#/vositalar/${id}">${n}</a>`).join("")}</div>
    <div id="tool"></div>`;
  return { taymer: timerTool, tps: tpsTool, guruh: groupTool, chiqish: exitTool }[tab]($("#tool", el));
}

function bigTimer(box, { onEnd } = {}) {
  let left = 0, total = 0, id = null;
  const paint = () => {
    $(".big-timer", box).textContent = fmtTime(left);
    $(".progress i", box).style.width = total ? `${(left / total) * 100}%` : "0%";
  };
  return {
    set(sec) { clearInterval(id); left = total = sec; paint(); },
    start() {
      clearInterval(id);
      id = setInterval(() => {
        left = Math.max(0, left - 1); paint();
        if (left <= 5 && left > 0) sound("tick");
        if (left === 0) { clearInterval(id); sound("win"); onEnd?.(); }
      }, 1000);
    },
    pause() { clearInterval(id); },
    stop() { clearInterval(id); },
  };
}

function timerTool(box) {
  box.innerHTML = `
    <div class="card center">
      <div class="big-timer">5:00</div>
      <div class="progress mt mb"><i style="width:100%"></i></div>
      <div class="row" style="justify-content:center">${[1, 2, 3, 5, 10, 15, 20].map((m) => `<button class="btn sm" data-m="${m}">${m} daq</button>`).join("")}</div>
      <div class="row mt" style="justify-content:center"><button class="btn primary lg" id="st">▶ Boshlash</button><button class="btn lg" id="pa">⏸</button></div>
    </div>`;
  const t = bigTimer(box, { onEnd: () => confetti(60) });
  t.set(300);
  box.addEventListener("click", (e) => { const b = e.target.closest("[data-m]"); if (b) t.set(+b.dataset.m * 60); });
  $("#st", box).addEventListener("click", () => t.start());
  $("#pa", box).addEventListener("click", () => t.pause());
  return () => t.stop();
}

function tpsTool(box) {
  const PH = [
    ["💭 O'ylang (Think)", "Savol ustida yakka o'zingiz o'ylang va javobni yozing.", 60],
    ["👥 Juftlikda (Pair)", "Yoningizdagi talaba bilan fikr almashing. Kelishmovchiliklarni muhokama qiling.", 120],
    ["📢 Sinfga (Share)", "Juftliklar o'z xulosasini butun sinfga aytadi.", 180],
  ];
  let i = 0;
  box.innerHTML = `
    <div class="card mb"><label class="field">Muhokama savoli (ekranga chiqadi)<input id="q" value="Nima uchun $AB \\ne BA$ bo'lishi mumkin? Geometrik izoh bering."></label></div>
    <div class="card center">
      <div class="row" style="justify-content:center" id="steps">${PH.map((p, k) => `<span class="pill ${k === 0 ? "primary" : ""}">${p[0]}</span>`).join("")}</div>
      <h2 class="mt" id="ph"></h2><p class="muted" id="desc"></p>
      <div class="k-big" id="qq" style="font-size:24px"></div>
      <div class="big-timer mt"></div><div class="progress mt mb"><i></i></div>
      <div class="row" style="justify-content:center"><button class="btn primary lg" id="st">▶ Boshlash</button><button class="btn lg" id="nx">Keyingi bosqich →</button></div>
    </div>`;
  const t = bigTimer(box);
  const show = () => {
    $("#ph", box).textContent = PH[i][0];
    $("#desc", box).textContent = PH[i][1];
    $("#qq", box).innerHTML = mathText($("#q", box).value);
    $$("#steps .pill", box).forEach((p, k) => p.classList.toggle("primary", k === i));
    t.set(PH[i][2]);
  };
  $("#st", box).addEventListener("click", () => t.start());
  $("#nx", box).addEventListener("click", () => { i = (i + 1) % PH.length; show(); });
  $("#q", box).addEventListener("input", show);
  show();
  return () => t.stop();
}

function groupTool(box) {
  let saved = "";
  try { saved = localStorage.getItem("cag-wheel-names") || ""; } catch {}
  box.innerHTML = `
    <div class="grid split">
      <div class="card">
        <h3>Talabalar</h3>
        <textarea id="names" style="min-height:260px">${esc(saved)}</textarea>
        <p class="small muted">Ro'yxat «Ismlar g'ildiragi» bilan umumiy.</p>
        <div class="row"><label class="field" style="flex:1">Guruhlar soni<input id="k" type="number" min="2" max="20" value="4"></label></div>
        <div class="row mt"><button class="btn primary" id="go">🎲 Guruhlarga bo'lish</button></div>
      </div>
      <div class="card"><div id="out" class="group-list"><p class="muted">Natija shu yerda ko'rinadi.</p></div></div>
    </div>`;
  $("#go", box).addEventListener("click", () => {
    const names = shuffle($("#names", box).value.split("\n").map((s) => s.trim()).filter(Boolean));
    const k = Math.max(1, Math.min(names.length || 1, +$("#k", box).value || 2));
    const groups = Array.from({ length: k }, () => []);
    names.forEach((n, i) => groups[i % k].push(n));
    const roles = ["📝 Kotib", "🗣 Ma'ruzachi", "⏱ Vaqt nazoratchisi", "❓ Savolchi"];
    $("#out", box).innerHTML = groups.map((g, i) => `<div class="group-box"><h4>${i + 1}-guruh</h4>${g.map((n, j) => `<div>${esc(n)} <span class="small muted">${roles[j] || ""}</span></div>`).join("")}</div>`).join("");
    sound("pop");
  });
}

function exitTool(box) {
  box.innerHTML = `
    <div class="card center">
      <h2>🎫 Chiqish chiptasi (3–2–1)</h2>
      <p class="muted">Dars oxirida har bir talaba qog'ozga yoki telefoniga yozadi:</p>
      <div class="grid g3 mt" style="text-align:left">
        <div class="card flat"><div class="k-big">3</div><b>ta narsa o'rgandim</b><p class="small muted">Bugungi darsdan uchta asosiy g'oya.</p></div>
        <div class="card flat"><div class="k-big">2</div><b>ta qiziq narsa</b><p class="small muted">Ikki qiziqarli fakt yoki bog'liqlik.</p></div>
        <div class="card flat"><div class="k-big">1</div><b>ta savol</b><p class="small muted">Hali tushunarsiz qolgan narsa — «Muddiest point».</p></div>
      </div>
      <p class="small muted mt">«Eng noaniq nuqta» (Muddiest Point, F. Mosteller, Harvard) — o'qituvchiga keyingi darsni nimadan boshlash kerakligini ko'rsatadi. Jonli so'rov uchun «Jonli viktorina → O'z savollarim» dan foydalaning: masalan «Bugungi qaysi mavzu eng qiyin bo'ldi?» degan 4 variantli savol.</p>
    </div>`;
}
