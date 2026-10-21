// Xotira o'yini: juftlarni topish (matritsa ↔ determinant, tushuncha ↔ formula) — tanlangan mavzular bo'yicha.

import { makeRng, texMat } from "../math.js";
import { store, addXP, setBest } from "../store.js";
import { $, $$, mathText, sound, confetti, shuffle, fmtTime, toast } from "../ui.js";
import { topicPicker, getCovered, topicNo } from "../course.js";

// [mavzu, tushuncha, formula]
const CONCEPTS = [
  ["kompleks", "$i^2$", "$-1$"],
  ["kompleks", "$|z|$, $z = x + iy$", "$\\sqrt{x^2 + y^2}$"],
  ["kompleks", "Muavr formulasi", "$r^n(\\cos n\\varphi + i\\sin n\\varphi)$"],
  ["kompleks", "Eyler formulasi", "$e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi$"],
  ["matritsa", "$(AB)^T$", "$B^TA^T$"],
  ["matritsa", "$AE$", "$A$"],
  ["matritsa", "$(m\\times n)\\cdot(n\\times p)$", "$m\\times p$"],
  ["matritsa", "Inversiyalar soni juft", "Juft o'rin almashtirish"],
  ["determinant", "$\\begin{vmatrix} a & b\\\\ c & d\\end{vmatrix}$", "$ad - bc$"],
  ["determinant", "$\\det(AB)$", "$\\det A\\cdot\\det B$"],
  ["determinant", "$\\det A^T$", "$\\det A$"],
  ["determinant", "Ikki satr almashsa", "Ishora o'zgaradi"],
  ["minor", "$A_{ij}$", "$(-1)^{i+j}M_{ij}$"],
  ["minor", "$\\sum_j a_{1j}A_{2j}$", "$0$"],
  ["minor", "$\\begin{vmatrix} A & B\\\\ O & C\\end{vmatrix}$", "$\\det A\\cdot\\det C$"],
  ["teskari", "$A^{-1}$ mavjud", "$\\det A\\ne 0$"],
  ["teskari", "Kramer qoidasi", "$x_i = \\frac{\\Delta_i}{\\Delta}$"],
  ["teskari", "$(AB)^{-1}$", "$B^{-1}A^{-1}$"],
  ["teskari", "$AX = B$", "$X = A^{-1}B$"],
  ["rang", "Kroneker–Kapelli", "$r(A) = r(\\bar A)$"],
  ["rang", "$r(A)$, $m\\times n$", "$\\le \\min(m, n)$"],
  ["rang", "$\\mathbb R^n$ da $n+1$ vektor", "Chiziqli bog'liq"],
  ["sistema", "FYS vektorlari soni", "$n - r$"],
  ["sistema", "Umumiy yechim", "$X_{o.b.} + X_{x.n.}$"],
  ["sistema", "$AX = O$ notrivial yechim", "$r(A) < n$"],
  ["fazo", "$\\dim\\mathbb R^n$", "$n$"],
  ["fazo", "$\\dim P_n$", "$n + 1$"],
  ["fazo", "Grassman formulasi", "$\\dim L_1 + \\dim L_2 - \\dim(L_1\\cap L_2)$"],
  ["fazo", "Koordinatalar almashinuvi", "$X = TX'$"],
  ["yevklid", "Koshi–Bunyakovskiy", "$|(\\mathbf x, \\mathbf y)| \\le |\\mathbf x||\\mathbf y|$"],
  ["yevklid", "Ortogonallik", "$(\\mathbf x, \\mathbf y) = 0$"],
  ["yevklid", "$\\dim L + \\dim L^\\perp$", "$\\dim V$"],
  ["kvadratik", "Silvestr mezoni", "Barcha $\\Delta_k > 0$"],
  ["kvadratik", "Kvadratik forma", "$X^TAX$"],
  ["kvadratik", "Inersiya qonuni", "$p$, $q$ o'zgarmas"],
  ["xos-qiymat", "Xarakteristik tenglama", "$\\det(A-\\lambda E)=0$"],
  ["xos-qiymat", "Xos qiymatlar yig'indisi", "$\\operatorname{tr}A$"],
  ["xos-qiymat", "Xos qiymatlar ko'paytmasi", "$\\det A$"],
  ["xos-qiymat", "Rang + defekt", "$\\dim V$"],
  ["vektor", "Skalyar ko'paytma", "$|\\vec a||\\vec b|\\cos\\varphi$"],
  ["vektor", "$\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma$", "$1$"],
  ["vektor", "$\\text{pr}_{\\vec b}\\vec a$", "$\\frac{\\vec a\\cdot\\vec b}{|\\vec b|}$"],
  ["vkopaytma", "Parallelogramm yuzi", "$|\\vec a\\times\\vec b|$"],
  ["vkopaytma", "Komplanarlik", "$\\vec a\\vec b\\vec c=0$"],
  ["vkopaytma", "Tetraedr hajmi", "$\\frac16|\\vec a\\vec b\\vec c|$"],
  ["vkopaytma", "$\\vec i\\times\\vec j$", "$\\vec k$"],
  ["koordinata", "Qutb: $x$", "$r\\cos\\varphi$"],
  ["koordinata", "Ko'chirish", "$x = x' + a$"],
  ["koordinata", "Burish matritsasi", "$\\begin{pmatrix} \\cos\\alpha & -\\sin\\alpha\\\\ \\sin\\alpha & \\cos\\alpha\\end{pmatrix}$"],
  ["togri-chiziq", "Nuqtadan to'g'ri chiziqqacha", "$\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$"],
  ["togri-chiziq", "Perpendikulyarlik ($k$)", "$k_1k_2 = -1$"],
  ["togri-chiziq", "Kesmalarda tenglama", "$\\frac{x}{a} + \\frac{y}{b} = 1$"],
  ["tekislik", "Tekislik normali", "$(A;\\ B;\\ C)$"],
  ["tekislik", "Kesishma yo'nalishi", "$\\vec n_1\\times\\vec n_2$"],
  ["tekislik", "Chiziq ∥ tekislik", "$Al + Bm + Cn = 0$"],
  ["egri-chiziq", "Ellips ekssentrisiteti", "$\\varepsilon = \\frac{c}{a} < 1$"],
  ["egri-chiziq", "Giperbola: $c^2$", "$a^2 + b^2$"],
  ["egri-chiziq", "Parabola fokusi", "$F\\left(\\frac p2;\\ 0\\right)$"],
  ["egri-chiziq", "Giperbola asimptotalari", "$y = \\pm\\frac{b}{a}x$"],
  ["sirt", "Ellipsoid", "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=1$"],
  ["sirt", "Konus", "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=0$"],
  ["sirt", "Giperbolik paraboloid", "$z = x^2 - y^2$"],
  ["sirt", "Bir pallali giperboloid", "$x^2+y^2-z^2=1$"],
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
  let timer = null, picker = null;

  function intro() {
    const best = store.get().best.memory;
    el.innerHTML = `
      <div class="page-head"><h1>🧠 Xotira o'yini</h1><p>Kartalarni ochib, mos juftlarni toping. Kam yurish va tez vaqt — yaxshi natija.</p></div>
      <div class="card center" style="max-width:560px;margin:0 auto">
        ${best != null ? `<div class="muted">Eng yaxshi vaqt: <b>${fmtTime(best)}</b></div>` : ""}
        <div class="mt" style="text-align:left"><div class="small muted mb">«Tushuncha ↔ formula» uchun mavzular:</div><div id="tp"></div></div>
        <div class="row mt" style="justify-content:center">
          <button class="btn primary lg" data-m="con">📐 Tushuncha ↔ formula</button>
          <button class="btn lg" data-m="det" id="detbtn">|A| Determinantlar (2×2)</button>
        </div>
      </div>`;
    topicPicker($("#tp", el), { key: "xotira" }).then((p) => (picker = p));
    getCovered().then((c) => {
      const open = c >= topicNo("determinant");
      $("#detbtn", el).disabled = !open;
      if (!open) $("#detbtn", el).title = "Determinantlar mavzusi hali o'tilmagan";
    });
    $$("[data-m]", el).forEach((b) => b.addEventListener("click", () => {
      if (b.dataset.m === "con") {
        const ids = picker ? picker.get() : [];
        const pool = CONCEPTS.filter((c) => ids.includes(c[0]));
        if (pool.length < 4) return toast("Kamroq juftlik: yana mavzu tanlang (kamida 4 ta juftlik kerak)");
        return start("con", pool);
      }
      start("det");
    }));
  }

  function start(mode, pool = CONCEPTS) {
    const pairs = mode === "det" ? detPairs(8) : shuffle(pool).slice(0, 8).map(([, a, b]) => [a, b]);
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
