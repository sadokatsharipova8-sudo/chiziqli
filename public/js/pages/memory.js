// Xotira o'yini: juftlarni topish (matritsa ↔ determinant, tushuncha ↔ formula).

import { makeRng, texMat } from "../math.js";
import { store, addXP, setBest } from "../store.js";
import { $, $$, mathText, sound, confetti, shuffle, fmtTime } from "../ui.js";

const CONCEPTS = [
  ["Ellips ekssentrisiteti", "$\\varepsilon = \\frac{c}{a} < 1$"],
  ["Giperbola: $c^2$", "$a^2 + b^2$"],
  ["Parabola fokusi", "$F\\left(\\frac p2;\\ 0\\right)$"],
  ["Skalyar ko'paytma", "$|\\vec a||\\vec b|\\cos\\varphi$"],
  ["Parallelogramm yuzi", "$|\\vec a\\times\\vec b|$"],
  ["Komplanarlik", "$(\\vec a,\\vec b,\\vec c)=0$"],
  ["Teskari matritsa mavjud", "$\\det A\\ne 0$"],
  ["Kramer qoidasi", "$x_i = \\frac{\\Delta_i}{\\Delta}$"],
  ["Xarakteristik tenglama", "$\\det(A-\\lambda E)=0$"],
  ["Nuqtadan to'g'ri chiziqqacha", "$\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$"],
  ["Perpendikulyarlik ($k$)", "$k_1k_2 = -1$"],
  ["$(AB)^T$", "$B^TA^T$"],
  ["Ortogonallik", "$\\vec a\\cdot\\vec b = 0$"],
  ["Xos qiymatlar yig'indisi", "$\\operatorname{tr}A$"],
];

function detPairs(n) {
  const rng = makeRng(), seen = new Set(), out = [];
  while (out.length < n) {
    const M = rng.mat(2, 2, -5, 6), d = M[0][0] * M[1][1] - M[0][1] * M[1][0];
    if (seen.has(d)) continue;
    seen.add(d);
    out.push([`$${texMat(M, { br: "v" })}$`, `$${d}$`]);
  }
  return out;
}

export function render(el) {
  let timer = null;

  function intro() {
    const best = store.get().best.memory;
    el.innerHTML = `
      <div class="page-head"><h1>🧠 Xotira o'yini</h1><p>Kartalarni ochib, mos juftlarni toping. Kam yurish va tez vaqt — yaxshi natija.</p></div>
      <div class="card center" style="max-width:560px;margin:0 auto">
        ${best != null ? `<div class="muted">Eng yaxshi vaqt: <b>${fmtTime(best)}</b></div>` : ""}
        <div class="row mt" style="justify-content:center">
          <button class="btn primary lg" data-m="det">|A| Determinantlar</button>
          <button class="btn lg" data-m="con">📐 Tushuncha ↔ formula</button>
        </div>
      </div>`;
    $$("[data-m]", el).forEach((b) => b.addEventListener("click", () => start(b.dataset.m)));
  }

  function start(mode) {
    const pairs = mode === "det" ? detPairs(8) : shuffle(CONCEPTS).slice(0, 8);
    const cards = shuffle(pairs.flatMap(([a, b], i) => [{ id: i, html: a }, { id: i, html: b }]));
    let open = [], found = 0, moves = 0, lock = false;
    const t0 = Date.now();
    el.innerHTML = `
      <div class="row between mb" style="max-width:760px;margin:0 auto 16px"><span class="pill primary" id="mv">Yurishlar: 0</span><span class="pill" id="tm">0:00</span><button class="btn ghost sm" id="back">← Orqaga</button></div>
      <div class="mem-grid">${cards.map((c, k) => `<button class="mem-card" data-k="${k}"><div class="mem-inner"><div class="mem-face mem-front">λ</div><div class="mem-face mem-back">${mathText(c.html)}</div></div></button>`).join("")}</div>`;
    $("#back", el).addEventListener("click", () => { clearInterval(timer); intro(); });
    timer = setInterval(() => ($("#tm", el).textContent = fmtTime((Date.now() - t0) / 1000)), 500);
    $$(".mem-card", el).forEach((b) => b.addEventListener("click", () => {
      if (lock || b.classList.contains("flip") || b.classList.contains("done")) return;
      b.classList.add("flip"); sound("pop");
      open.push(b);
      if (open.length < 2) return;
      moves++; $("#mv", el).textContent = `Yurishlar: ${moves}`;
      const [x, y] = open, same = cards[+x.dataset.k].id === cards[+y.dataset.k].id;
      open = [];
      if (same) {
        x.classList.add("done"); y.classList.add("done"); sound("ok"); found++;
        if (found === pairs.length) {
          clearInterval(timer);
          const secs = Math.round((Date.now() - t0) / 1000);
          const prev = store.get().best.memory;
          if (prev == null || secs < prev) { store.get().best.memory = secs; store.save(); }
          setBest("memoryGames", (store.get().best.memoryGames || 0) + 1);
          addXP(Math.max(10, 40 - (moves - pairs.length) * 2), "xotira o'yini");
          confetti();
          setTimeout(() => el.insertAdjacentHTML("beforeend", `<div class="card center mt" style="max-width:560px;margin:16px auto"><h2>🎉 Barakalla!</h2><p>${moves} yurish · ${fmtTime(secs)}</p><button class="btn primary" id="again">↻ Yana</button></div>`) || $("#again", el).addEventListener("click", intro), 600);
        }
      } else {
        lock = true;
        setTimeout(() => { x.classList.remove("flip"); y.classList.remove("flip"); lock = false; }, 900);
      }
    }));
  }

  intro();
  return () => clearInterval(timer);
}
