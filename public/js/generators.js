// Masala generatorlari: har chaqiruvda yangi masala (urug'li RNG bilan — variantlar uchun takrorlanadi).
// gen(rng) -> { q, answer: {type:'num'|'vec'|'mat', value, labels?}, hints:[], solution:[] }
// Matnlarda $...$ — KaTeX formulalar.

import { F, Fr, det, inverse, mmul, texMat, texVec, texLin, rrefSteps, minor, toFr } from "./math.js";

// Fan dasturidagi 18 ta mavzu (1–11: chiziqli algebra, 12–18: analitik geometriya).
export const TOPICS = [
  { id: "kompleks", name: "Kompleks sonlar", icon: "ℂ", color: "#a855f7" },
  { id: "matritsa", name: "Matritsalar va o'rin almashtirishlar", icon: "▦", color: "#6366f1" },
  { id: "determinant", name: "Determinantlar va xossalari", icon: "|A|", color: "#8b5cf6" },
  { id: "minor", name: "Minorlar va algebraik to'ldiruvchilar", icon: "Aᵢⱼ", color: "#7c3aed" },
  { id: "teskari", name: "Teskari matritsa. Kramer va matritsaviy usul", icon: "A⁻¹", color: "#ec4899" },
  { id: "rang", name: "Arifmetik fazo, chiziqli bog'liqlik, rang", icon: "r", color: "#db2777" },
  { id: "sistema", name: "CHTS umumiy yechimi, fundamental sistema", icon: "≡", color: "#f97316" },
  { id: "fazo", name: "Chiziqli fazo, bazis, qism fazolar", icon: "V", color: "#f59e0b" },
  { id: "yevklid", name: "Yevklid fazosi, Gram–Shmidt", icon: "⊥", color: "#84cc16" },
  { id: "kvadratik", name: "Kvadratik formalar", icon: "Q", color: "#10b981" },
  { id: "xos-qiymat", name: "Chiziqli almashtirishlar, xos sonlar", icon: "λ", color: "#ef4444" },
  { id: "vektor", name: "Vektorlar va skalyar ko'paytma", icon: "→", color: "#0ea5e9" },
  { id: "vkopaytma", name: "Vektor va aralash ko'paytma", icon: "×", color: "#06b6d4" },
  { id: "koordinata", name: "Koordinatalar sistemasi", icon: "⊕", color: "#3b82f6" },
  { id: "togri-chiziq", name: "Tekislikda to'g'ri chiziq", icon: "╱", color: "#14b8a6" },
  { id: "tekislik", name: "Fazoda tekislik va to'g'ri chiziq", icon: "◇", color: "#22c55e" },
  { id: "egri-chiziq", name: "Ikkinchi tartibli chiziqlar", icon: "◯", color: "#eab308" },
  { id: "sirt", name: "Ikkinchi tartibli sirtlar", icon: "⬭", color: "#64748b" },
];
export const topicById = (id) => TOPICS.find((t) => t.id === id);

const M = (m) => texMat(m);
const num = (v) => ({ type: "num", value: Fr.of(v) });
const vec = (vals, labels) => ({ type: "vec", value: vals.map((v) => Fr.of(v)), labels });
const mat = (m) => ({ type: "mat", value: m.map((r) => r.map((x) => Fr.of(x))) });
const par = (x) => (x < 0 ? `(${x})` : `${x}`);
const PYTH4 = [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [6, 6, 7, 11], [2, 10, 11, 15]];
const PYTH3 = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]];

function signedPerm(rng, arr) {
  return rng.shuffle(arr).map((x) => x * rng.sign());
}

export const GENERATORS = [
  // ---------------- Matritsalar ----------------
  {
    id: "mat-lin", topic: "matritsa", title: "Matritsalarning chiziqli kombinatsiyasi",
    gen(rng) {
      const A = rng.mat(2, 2, -5, 5), B = rng.mat(2, 2, -4, 4);
      const k = rng.pick([2, 3, -2, -1, 4]);
      const C = A.map((r, i) => r.map((x, j) => x + k * B[i][j]));
      const op = k === -1 ? "- B" : k < 0 ? `- ${-k}B` : `+ ${k}B`;
      return {
        q: `$A=${M(A)}$, $B=${M(B)}$ bo'lsa, $C = A ${op}$ matritsani toping.`,
        answer: mat(C),
        hints: ["Matritsalar elementma-element qo'shiladi: $c_{ij}=a_{ij}+k\\,b_{ij}$.", `Masalan, $c_{11} = ${A[0][0]} + ${par(k)}\\cdot ${par(B[0][0])}$.`],
        solution: [
          `$c_{ij} = a_{ij} + (${k})\\,b_{ij}$`,
          `$C = ${texMat(A.map((r, i) => r.map((x, j) => `${x}+${par(k)}\\cdot${par(B[i][j])}`)))} = ${M(C)}$`,
        ],
      };
    },
  },
  {
    id: "mat-mul", topic: "matritsa", title: "Matritsalarni ko'paytirish",
    gen(rng) {
      const A = rng.mat(2, 2, -4, 4), B = rng.mat(2, 2, -4, 4);
      const C = mmul(A, B);
      const cell = (i, j) => `${par(A[i][0])}\\cdot${par(B[0][j])}+${par(A[i][1])}\\cdot${par(B[1][j])}`;
      return {
        q: `$A=${M(A)}$ va $B=${M(B)}$ bo'lsa, $AB$ ko'paytmani hisoblang.`,
        answer: mat(C),
        hints: ["$c_{ij}$ — $A$ ning $i$-satri bilan $B$ ning $j$-ustunining skalyar ko'paytmasi.", `$c_{11} = ${cell(0, 0)}$`],
        solution: [`$AB = ${texMat([[cell(0, 0), cell(0, 1)], [cell(1, 0), cell(1, 1)]])}$`, `$AB = ${M(C)}$`],
      };
    },
  },
  {
    id: "mat-elem", topic: "matritsa", title: "Ko'paytmaning bitta elementi", quick: true,
    gen(rng) {
      const A = rng.mat(2, 3, -3, 4), B = rng.mat(3, 2, -3, 4);
      const i = rng.int(0, 1), j = rng.int(0, 1);
      const v = A[i].reduce((s, x, k) => s + x * B[k][j], 0);
      const expr = A[i].map((x, k) => `${par(x)}\\cdot${par(B[k][j])}`).join("+");
      return {
        q: `$A=${M(A)}$, $B=${M(B)}$. $C=AB$ matritsaning $c_{${i + 1}${j + 1}}$ elementini toping.`,
        answer: num(v),
        hints: [`$A$ ning ${i + 1}-satri va $B$ ning ${j + 1}-ustunini oling.`],
        solution: [`$c_{${i + 1}${j + 1}} = ${expr} = ${v}$`],
      };
    },
  },
  // ---------------- Determinantlar ----------------
  {
    id: "det2", topic: "determinant", title: "2-tartibli determinant", quick: true,
    gen(rng) {
      const A = rng.mat(2, 2, -9, 9);
      const v = A[0][0] * A[1][1] - A[0][1] * A[1][0];
      return {
        q: `$\\Delta = ${texMat(A, { br: "v" })}$ determinantni hisoblang.`,
        answer: num(v),
        hints: ["$\\begin{vmatrix} a & b \\\\ c & d\\end{vmatrix} = ad - bc$"],
        solution: [`$\\Delta = ${par(A[0][0])}\\cdot${par(A[1][1])} - ${par(A[0][1])}\\cdot${par(A[1][0])} = ${v}$`],
      };
    },
  },
  {
    id: "det3", topic: "determinant", title: "3-tartibli determinant (Sarryus)",
    gen(rng) {
      const A = rng.mat(3, 3, -4, 4);
      const [a, b, c] = A;
      const plus = [a[0] * b[1] * c[2], a[1] * b[2] * c[0], a[2] * b[0] * c[1]];
      const minus = [a[2] * b[1] * c[0], a[0] * b[2] * c[1], a[1] * b[0] * c[2]];
      const v = plus.reduce((s, x) => s + x, 0) - minus.reduce((s, x) => s + x, 0);
      return {
        q: `$\\Delta = ${texMat(A, { br: "v" })}$ determinantni hisoblang.`,
        answer: num(v),
        hints: ["Sarryus (uchburchaklar) qoidasi: bosh diagonal va unga parallel uchburchaklar «+», yordamchi diagonal bo'yichalar «−» ishora bilan.", "Yoki birinchi satr bo'yicha yoyish: $\\Delta = a_{11}A_{11}+a_{12}A_{12}+a_{13}A_{13}$."],
        solution: [
          `«+» hadlar: $${plus.map(par).join(" + ")} = ${plus.reduce((s, x) => s + x, 0)}$`,
          `«−» hadlar: $${minus.map(par).join(" + ")} = ${minus.reduce((s, x) => s + x, 0)}$`,
          `$\\Delta = ${plus.reduce((s, x) => s + x, 0)} - ${par(minus.reduce((s, x) => s + x, 0))} = ${v}$`,
        ],
      };
    },
  },
  {
    id: "cofactor", topic: "minor", title: "Algebraik to'ldiruvchi",
    gen(rng) {
      const A = rng.mat(3, 3, -5, 5);
      const i = rng.int(0, 2), j = rng.int(0, 2);
      const m = minor(A, i, j);
      const Mij = m[0][0] * m[1][1] - m[0][1] * m[1][0];
      const s = (i + j) % 2 ? -1 : 1;
      return {
        q: `$A=${M(A)}$ matritsa uchun $a_{${i + 1}${j + 1}}$ elementning algebraik to'ldiruvchisi $A_{${i + 1}${j + 1}}$ ni toping.`,
        answer: num(s * Mij),
        hints: [`$A_{ij} = (-1)^{i+j} M_{ij}$, bu yerda $M_{ij}$ — ${i + 1}-satr va ${j + 1}-ustunni o'chirgandagi minor.`],
        solution: [
          `$M_{${i + 1}${j + 1}} = ${texMat(m, { br: "v" })} = ${Mij}$`,
          `$A_{${i + 1}${j + 1}} = (-1)^{${i + j + 2}}\\cdot ${par(Mij)} = ${s * Mij}$`,
        ],
      };
    },
  },
  // ---------------- Teskari matritsa, rang ----------------
  {
    id: "inv2", topic: "teskari", title: "2×2 teskari matritsa",
    gen(rng) {
      let A, d;
      do { A = rng.mat(2, 2, -5, 5); d = A[0][0] * A[1][1] - A[0][1] * A[1][0]; } while (![1, -1, 2, -2, 3, -3, 4].includes(d));
      const adj = [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]];
      const inv = adj.map((r) => r.map((x) => F(x, d)));
      return {
        q: `$A=${M(A)}$ matritsaga teskari $A^{-1}$ matritsani toping. (Kasrlarni $a/b$ ko'rinishida yozing.)`,
        answer: mat(inv),
        hints: ["$A^{-1} = \\dfrac{1}{\\det A}\\begin{pmatrix} d & -b \\\\ -c & a\\end{pmatrix}$", `$\\det A = ${d}$`],
        solution: [`$\\det A = ${d}$`, `$A^{-1} = \\dfrac{1}{${d}}${M(adj)} = ${texMat(inv)}$`, "Tekshirish: $AA^{-1}=E$."],
      };
    },
  },
  {
    id: "rank3", topic: "rang", title: "Matritsa rangi",
    gen(rng) {
      const r = rng.pick([1, 2, 2, 3]);
      let A;
      if (r === 1) {
        const u = [rng.nz(-3, 3), rng.nz(-3, 3), rng.nz(-3, 3)], v = [rng.nz(-2, 3), rng.int(-2, 3), rng.nz(-3, 3)];
        A = u.map((x) => v.map((y) => x * y));
      } else if (r === 2) {
        let r1, r2;
        do { r1 = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]; r2 = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]; }
        while (rrefSteps([r1, r2]).rank < 2);
        const a = rng.nz(-2, 2), b = rng.nz(-2, 2);
        A = rng.shuffle([r1, r2, r1.map((x, k) => a * x + b * r2[k])]);
      } else {
        do A = rng.mat(3, 3, -3, 4); while (det(A).isZero());
      }
      const res = rrefSteps(A, 0, { jordan: false });
      return {
        q: `$A=${M(A)}$ matritsaning rangini toping.`,
        answer: num(res.rank),
        hints: ["Elementar almashtirishlar bilan pog'onasimon ko'rinishga keltiring.", "Rang = pog'onasimon matritsadagi nolmas satrlar soni."],
        solution: [
          ...res.steps.map((s) => `$${s.op}:\\quad ${texMat(s.M)}$`),
          `Nolmas satrlar soni: $\\operatorname{rang} A = ${res.rank}$`,
        ],
      };
    },
  },
  // ---------------- Sistemalar ----------------
  {
    id: "cramer2", topic: "teskari", title: "Kramer qoidasi (2×2)",
    gen(rng) {
      let A, d;
      do { A = rng.mat(2, 2, -5, 6); d = A[0][0] * A[1][1] - A[0][1] * A[1][0]; } while (d === 0);
      const x = rng.int(-5, 5), y = rng.int(-5, 5);
      const b = [A[0][0] * x + A[0][1] * y, A[1][0] * x + A[1][1] * y];
      const dx = b[0] * A[1][1] - A[0][1] * b[1], dy = A[0][0] * b[1] - b[0] * A[1][0];
      const eq = (r, c) => `${texLin(r, ["x", "y"])} = ${c}`;
      return {
        q: `Sistemani Kramer qoidasi bilan yeching: $\\begin{cases} ${eq(A[0], b[0])} \\\\ ${eq(A[1], b[1])} \\end{cases}$`,
        answer: vec([x, y], ["x", "y"]),
        hints: ["$x = \\Delta_x/\\Delta$, $y=\\Delta_y/\\Delta$.", `$\\Delta = ${d}$`],
        solution: [
          `$\\Delta = ${texMat(A, { br: "v" })} = ${d}$`,
          `$\\Delta_x = ${texMat([[b[0], A[0][1]], [b[1], A[1][1]]], { br: "v" })} = ${dx}$, $\\quad \\Delta_y = ${texMat([[A[0][0], b[0]], [A[1][0], b[1]]], { br: "v" })} = ${dy}$`,
          `$x = \\dfrac{${dx}}{${d}} = ${x}$, $\\quad y = \\dfrac{${dy}}{${d}} = ${y}$`,
        ],
      };
    },
  },
  {
    id: "gauss3", topic: "sistema", title: "Gauss usuli (3×3)",
    gen(rng) {
      let A;
      do A = rng.mat(3, 3, -3, 3); while (det(A).isZero() || A[0][0] === 0);
      const s = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)];
      const b = A.map((r) => r[0] * s[0] + r[1] * s[1] + r[2] * s[2]);
      const aug = A.map((r, i) => [...r, b[i]]);
      const res = rrefSteps(aug, 1);
      const eq = (i) => `${texLin(A[i], ["x", "y", "z"])} = ${b[i]}`;
      return {
        q: `Sistemani Gauss usuli bilan yeching: $\\begin{cases} ${eq(0)} \\\\ ${eq(1)} \\\\ ${eq(2)} \\end{cases}$`,
        answer: vec(s, ["x", "y", "z"]),
        hints: ["Kengaytirilgan matritsani yozing va birinchi ustunda $a_{11}$ ostidagi elementlarni nolga aylantiring.", "So'ng ikkinchi ustunda xuddi shunday — keyin teskari yo'l."],
        solution: [
          `Kengaytirilgan matritsa: $${texMat(aug, { aug: 1 })}$`,
          ...res.steps.map((st) => `$${st.op}:\\quad ${texMat(st.M, { aug: 1 })}$`),
          `Javob: $x=${s[0]},\\ y=${s[1]},\\ z=${s[2]}$`,
        ],
      };
    },
  },
  // ---------------- Vektorlar ----------------
  {
    id: "dot", topic: "vektor", title: "Skalyar ko'paytma", quick: true,
    gen(rng) {
      const a = [rng.int(-5, 5), rng.int(-5, 5), rng.int(-5, 5)], b = [rng.int(-5, 5), rng.int(-5, 5), rng.int(-5, 5)];
      const v = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      return {
        q: `$\\vec a = ${texVec(a)}$, $\\vec b = ${texVec(b)}$. $\\vec a\\cdot\\vec b$ ni toping.`,
        answer: num(v),
        hints: ["$\\vec a\\cdot \\vec b = a_x b_x + a_y b_y + a_z b_z$"],
        solution: [`$\\vec a\\cdot\\vec b = ${a.map((x, i) => `${par(x)}\\cdot${par(b[i])}`).join("+")} = ${v}$`],
      };
    },
  },
  {
    id: "len", topic: "vektor", title: "Vektor uzunligi", quick: true,
    gen(rng) {
      const [p, q, r, L] = rng.pick(PYTH4);
      const a = signedPerm(rng, [p, q, r]);
      return {
        q: `$\\vec a = ${texVec(a)}$ vektorning uzunligi $|\\vec a|$ ni toping.`,
        answer: num(L),
        hints: ["$|\\vec a| = \\sqrt{a_x^2 + a_y^2 + a_z^2}$"],
        solution: [`$|\\vec a| = \\sqrt{${a.map((x) => `${par(x)}^2`).join("+")}} = \\sqrt{${L * L}} = ${L}$`],
      };
    },
  },
  {
    id: "cross", topic: "vkopaytma", title: "Vektor ko'paytma",
    gen(rng) {
      const a = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)], b = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)];
      const c = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
      return {
        q: `$\\vec a = ${texVec(a)}$, $\\vec b = ${texVec(b)}$. $\\vec a\\times\\vec b$ vektor ko'paytmani toping.`,
        answer: vec(c, ["x", "y", "z"]),
        hints: ["$\\vec a \\times \\vec b = \\begin{vmatrix} \\vec i & \\vec j & \\vec k \\\\ a_x & a_y & a_z \\\\ b_x & b_y & b_z \\end{vmatrix}$"],
        solution: [
          `$\\vec a\\times\\vec b = ${texMat([["\\vec i", "\\vec j", "\\vec k"], a, b], { br: "v" })}$`,
          `$= \\vec i(${par(a[1])}\\cdot${par(b[2])}-${par(a[2])}\\cdot${par(b[1])}) - \\vec j(${par(a[0])}\\cdot${par(b[2])}-${par(a[2])}\\cdot${par(b[0])}) + \\vec k(${par(a[0])}\\cdot${par(b[1])}-${par(a[1])}\\cdot${par(b[0])})$`,
          `$= ${texVec(c)}$`,
        ],
      };
    },
  },
  {
    id: "mixed", topic: "vkopaytma", title: "Aralash ko'paytma",
    gen(rng) {
      const A = rng.mat(3, 3, -3, 4);
      const v = det(A);
      return {
        q: `$\\vec a=${texVec(A[0])}$, $\\vec b=${texVec(A[1])}$, $\\vec c=${texVec(A[2])}$. Aralash ko'paytma $(\\vec a,\\vec b,\\vec c)$ ni toping.`,
        answer: num(v),
        hints: ["Aralash ko'paytma — koordinatalardan tuzilgan 3-tartibli determinant."],
        solution: [`$(\\vec a,\\vec b,\\vec c) = ${texMat(A, { br: "v" })} = ${v.tex()}$`, `Geometrik ma'nosi: $|${v.tex()}|$ — parallelepiped hajmi.`],
      };
    },
  },
  {
    id: "perp", topic: "vektor", title: "Perpendikulyarlik sharti",
    gen(rng) {
      const a = [rng.int(-4, 4), rng.int(-4, 4), rng.nz(-4, 4)];
      const b1 = rng.int(-5, 5), b2 = rng.int(-5, 5);
      const k = F(-(a[0] * b1 + a[1] * b2), a[2]);
      return {
        q: `$\\vec a = ${texVec(a)}$ va $\\vec b = (${b1};\\ ${b2};\\ k)$ vektorlar perpendikulyar bo'lishi uchun $k$ ni toping.`,
        answer: num(k),
        hints: ["Perpendikulyarlik sharti: $\\vec a\\cdot\\vec b = 0$."],
        solution: [`$${par(a[0])}\\cdot${par(b1)} + ${par(a[1])}\\cdot${par(b2)} + ${par(a[2])}k = 0$`, `$${a[0] * b1 + a[1] * b2} + ${par(a[2])}k = 0 \\Rightarrow k = ${k.tex()}$`],
      };
    },
  },
  // ---------------- Tekislikdagi to'g'ri chiziq ----------------
  {
    id: "line2p", topic: "togri-chiziq", title: "Ikki nuqtadan o'tuvchi to'g'ri chiziq",
    gen(rng) {
      const x1 = rng.int(-5, 5), y1 = rng.int(-5, 5);
      let x2; do x2 = rng.int(-5, 5); while (x2 === x1);
      const y2 = rng.int(-6, 6);
      const k = F(y2 - y1, x2 - x1);
      const b = F(y1).sub(k.mul(x1));
      return {
        q: `$A(${x1};\\ ${y1})$ va $B(${x2};\\ ${y2})$ nuqtalardan o'tuvchi to'g'ri chiziqning $y = kx + b$ tenglamasidagi $k$ va $b$ ni toping.`,
        answer: vec([k, b], ["k", "b"]),
        hints: ["$k = \\dfrac{y_2 - y_1}{x_2 - x_1}$", "$b = y_1 - kx_1$"],
        solution: [`$k = \\dfrac{${y2} - ${par(y1)}}{${x2} - ${par(x1)}} = ${k.tex()}$`, `$b = ${y1} - ${k.tex()}\\cdot ${par(x1)} = ${b.tex()}$`, `$y = ${texLin([k], ["x"], b)}$`],
      };
    },
  },
  {
    id: "distline", topic: "togri-chiziq", title: "Nuqtadan to'g'ri chiziqqacha masofa",
    gen(rng) {
      const [p, q, n] = rng.pick(PYTH3);
      const [A, B] = rng.next() < 0.5 ? [p * rng.sign(), q * rng.sign()] : [q * rng.sign(), p * rng.sign()];
      const C = rng.int(-12, 12), x0 = rng.int(-5, 5), y0 = rng.int(-5, 5);
      const val = A * x0 + B * y0 + C;
      return {
        q: `$M(${x0};\\ ${y0})$ nuqtadan $${texLin([A, B], ["x", "y"], C)} = 0$ to'g'ri chiziqqacha masofani toping.`,
        answer: num(F(Math.abs(val), n)),
        hints: ["$d = \\dfrac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$"],
        solution: [`$d = \\dfrac{|${par(A)}\\cdot${par(x0)} + ${par(B)}\\cdot${par(y0)} + ${par(C)}|}{\\sqrt{${A * A}+${B * B}}} = \\dfrac{${Math.abs(val)}}{${n}} = ${F(Math.abs(val), n).tex()}$`],
      };
    },
  },
  {
    id: "intersect", topic: "togri-chiziq", title: "Ikki to'g'ri chiziq kesishishi",
    gen(rng) {
      const x0 = rng.int(-5, 5), y0 = rng.int(-5, 5);
      let a1, b1, a2, b2;
      do { a1 = rng.int(-4, 4); b1 = rng.int(-4, 4); a2 = rng.int(-4, 4); b2 = rng.int(-4, 4); } while (a1 * b2 - a2 * b1 === 0);
      const c1 = -(a1 * x0 + b1 * y0), c2 = -(a2 * x0 + b2 * y0);
      return {
        q: `$${texLin([a1, b1], ["x", "y"], c1)} = 0$ va $${texLin([a2, b2], ["x", "y"], c2)} = 0$ to'g'ri chiziqlarning kesishish nuqtasini toping.`,
        answer: vec([x0, y0], ["x", "y"]),
        hints: ["Ikkala tenglamani sistema sifatida yeching."],
        solution: [`$\\begin{cases} ${texLin([a1, b1], ["x", "y"])} = ${-c1} \\\\ ${texLin([a2, b2], ["x", "y"])} = ${-c2} \\end{cases}$`, `$\\Delta = ${a1 * b2 - a2 * b1}$ ⇒ $x = ${x0},\\ y = ${y0}$`],
      };
    },
  },
  // ---------------- Fazoda tekislik ----------------
  {
    id: "planeD", topic: "tekislik", title: "Nuqta va normal bo'yicha tekislik",
    gen(rng) {
      const n = [rng.nz(-5, 5), rng.int(-5, 5), rng.nz(-5, 5)], P = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)];
      const D = -(n[0] * P[0] + n[1] * P[1] + n[2] * P[2]);
      return {
        q: `$M_0${texVec(P)}$ nuqtadan o'tib, $\\vec n = ${texVec(n)}$ vektorga perpendikulyar tekislik tenglamasi $${texLin(n, ["x", "y", "z"])} + D = 0$ ko'rinishda. $D$ ni toping.`,
        answer: num(D),
        hints: ["$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$", "$D = -(Ax_0 + By_0 + Cz_0)$"],
        solution: [`$D = -(${n.map((c, i) => `${par(c)}\\cdot${par(P[i])}`).join("+")}) = ${D}$`],
      };
    },
  },
  {
    id: "distplane", topic: "tekislik", title: "Nuqtadan tekislikkacha masofa",
    gen(rng) {
      const [p, q, r, L] = rng.pick(PYTH4.slice(0, 5));
      const n = signedPerm(rng, [p, q, r]);
      const D = rng.int(-10, 10), P = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)];
      const val = n[0] * P[0] + n[1] * P[1] + n[2] * P[2] + D;
      return {
        q: `$M${texVec(P)}$ nuqtadan $${texLin(n, ["x", "y", "z"], D)} = 0$ tekislikkacha masofani toping.`,
        answer: num(F(Math.abs(val), L)),
        hints: ["$d = \\dfrac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}$"],
        solution: [`$d = \\dfrac{|${val}|}{\\sqrt{${n.map((x) => x * x).join("+")}}} = \\dfrac{${Math.abs(val)}}{${L}} = ${F(Math.abs(val), L).tex()}$`],
      };
    },
  },
  {
    id: "planeAngle", topic: "tekislik", title: "Tekisliklar perpendikulyarligi",
    gen(rng) {
      const n1 = [rng.int(-4, 4), rng.int(-4, 4), rng.nz(-4, 4)];
      let a, b;
      do { a = rng.int(-4, 4); b = rng.int(-4, 4); } while (a === 0 && b === 0);
      const k = F(-(n1[0] * a + n1[1] * b), n1[2]);
      const d1 = rng.int(-6, 6), d2 = rng.int(-6, 6);
      return {
        q: `$${texLin(n1, ["x", "y", "z"], d1)} = 0$ va $${texLin([a, b], ["x", "y"])} + kz ${d2 < 0 ? "-" : "+"} ${Math.abs(d2)} = 0$ tekisliklar perpendikulyar bo'lishi uchun $k$ ni toping.`,
        answer: num(k),
        hints: ["Tekisliklar perpendikulyar ⇔ normal vektorlar perpendikulyar: $\\vec n_1 \\cdot \\vec n_2 = 0$."],
        solution: [`$\\vec n_1 = ${texVec(n1)}$, $\\vec n_2 = (${a};\\ ${b};\\ k)$`, `$${n1[0] * a + n1[1] * b} + ${par(n1[2])}k = 0 \\Rightarrow k = ${k.tex()}$`],
      };
    },
  },
  // ---------------- Egri chiziqlar ----------------
  {
    id: "ellipse", topic: "egri-chiziq", title: "Ellips ekssentrisiteti",
    gen(rng) {
      const [p, q, h] = rng.pick(PYTH3);
      const a = h, [b, c] = rng.next() < 0.5 ? [p, q] : [q, p];
      return {
        q: `$\\dfrac{x^2}{${a * a}} + \\dfrac{y^2}{${b * b}} = 1$ ellipsning fokuslari orasidagi yarim masofa $c$ va ekssentrisiteti $\\varepsilon$ ni toping.`,
        answer: vec([c, F(c, a)], ["c", "ε"]),
        hints: ["Ellips uchun $c^2 = a^2 - b^2$.", "$\\varepsilon = c/a$"],
        solution: [`$a = ${a},\\ b = ${b}$`, `$c = \\sqrt{${a * a} - ${b * b}} = ${c}$`, `$\\varepsilon = \\dfrac{${c}}{${a}} = ${F(c, a).tex()}$`],
      };
    },
  },
  {
    id: "hyperbola", topic: "egri-chiziq", title: "Giperbola fokusi va asimptotasi",
    gen(rng) {
      const [p, q, h] = rng.pick(PYTH3);
      const [a, b] = rng.next() < 0.5 ? [p, q] : [q, p];
      return {
        q: `$\\dfrac{x^2}{${a * a}} - \\dfrac{y^2}{${b * b}} = 1$ giperbola uchun $c$ ni va $y = kx$ asimptotaning musbat burchak koeffitsiyenti $k$ ni toping.`,
        answer: vec([h, F(b, a)], ["c", "k"]),
        hints: ["Giperbola uchun $c^2 = a^2 + b^2$.", "Asimptotalar: $y = \\pm \\dfrac{b}{a}x$."],
        solution: [`$c = \\sqrt{${a * a}+${b * b}} = ${h}$`, `$k = \\dfrac{b}{a} = ${F(b, a).tex()}$`],
      };
    },
  },
  {
    id: "circle", topic: "egri-chiziq", title: "Aylana markazi va radiusi",
    gen(rng) {
      const x0 = rng.int(-5, 5), y0 = rng.int(-5, 5), R = rng.int(1, 7);
      const D = -2 * x0, E = -2 * y0, Fc = x0 * x0 + y0 * y0 - R * R;
      return {
        q: `$x^2 + y^2 ${texLin([D, E], ["x", "y"], Fc).replace(/^(?!-)/, "+ ")} = 0$ aylananing markazi $(x_0;\\ y_0)$ va radiusi $R$ ni toping.`,
        answer: vec([x0, y0, R], ["x₀", "y₀", "R"]),
        hints: ["To'liq kvadrat ajrating: $x^2 + Dx = (x + D/2)^2 - D^2/4$."],
        solution: [`$(x ${x0 > 0 ? "-" : "+"} ${Math.abs(x0)})^2 + (y ${y0 > 0 ? "-" : "+"} ${Math.abs(y0)})^2 = ${R * R}$`, `Markaz $(${x0};\\ ${y0})$, $R = ${R}$`],
      };
    },
  },
  {
    id: "parabola", topic: "egri-chiziq", title: "Parabola fokusi", quick: true,
    gen(rng) {
      const p = rng.int(1, 8) * rng.sign();
      const twoP = 2 * p;
      return {
        q: `$y^2 = ${twoP}x$ parabola fokusining abssissasini toping.`,
        answer: num(F(p, 2)),
        hints: ["$y^2 = 2px$ parabola fokusi $F(p/2;\\ 0)$, direktrisasi $x = -p/2$."],
        solution: [`$2p = ${twoP} \\Rightarrow p = ${p}$`, `$F\\left(${F(p, 2).tex()};\\ 0\\right)$`],
      };
    },
  },
  // ---------------- Xos qiymatlar ----------------
  {
    id: "eigen2", topic: "xos-qiymat", title: "Xos qiymatlar (2×2)",
    gen(rng) {
      let l1, l2;
      do { l1 = rng.int(-4, 5); l2 = rng.int(-4, 5); } while (l1 === l2);
      const P = rng.pick([[[1, 1], [0, 1]], [[2, 1], [1, 1]], [[1, 0], [1, 1]], [[1, 2], [1, 3]], [[1, -1], [1, 0]], [[3, 2], [1, 1]]]);
      const Pinv = [[P[1][1], -P[0][1]], [-P[1][0], P[0][0]]];
      const A = mmul(mmul(P, [[l1, 0], [0, l2]]), Pinv).map((r) => r.map((x) => +x));
      const tr = A[0][0] + A[1][1], dt = A[0][0] * A[1][1] - A[0][1] * A[1][0];
      const [s1, s2] = [l1, l2].sort((a, b) => a - b);
      return {
        q: `$A = ${M(A)}$ matritsaning xos qiymatlarini toping ($\\lambda_1 < \\lambda_2$).`,
        answer: vec([s1, s2], ["λ₁", "λ₂"]),
        hints: ["Xarakteristik tenglama: $\\det(A - \\lambda E) = 0$.", `2×2 uchun: $\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0$, bu yerda $\\operatorname{tr}A = ${tr}$.`],
        solution: [`$\\det(A-\\lambda E) = ${texMat([[`${A[0][0]}-\\lambda`, A[0][1]], [A[1][0], `${A[1][1]}-\\lambda`]], { br: "v" })} = 0$`, `$\\lambda^2 ${tr <= 0 ? "+" : "-"} ${Math.abs(tr)}\\lambda ${dt < 0 ? "-" : "+"} ${Math.abs(dt)} = 0$`, `$\\lambda_1 = ${s1},\\ \\lambda_2 = ${s2}$`],
      };
    },
  },
  {
    id: "transform", topic: "xos-qiymat", title: "Almashtirish ostidagi nuqta", quick: true,
    gen(rng) {
      const A = rng.mat(2, 2, -3, 3), v = [rng.int(-4, 4), rng.int(-4, 4)];
      const w = [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
      return {
        q: `$A = ${M(A)}$ chiziqli almashtirish $\\vec v = ${texVec(v)}$ vektorni qaysi vektorga o'tkazadi?`,
        answer: vec(w, ["x'", "y'"]),
        hints: ["$A\\vec v$ — matritsani ustun-vektorga ko'paytiring."],
        solution: [`$A\\vec v = ${M(A)}${M([[v[0]], [v[1]]])} = ${M([[w[0]], [w[1]]])}$`],
      };
    },
  },

  // ---------------- Kompleks sonlar ----------------
  {
    id: "cmul", topic: "kompleks", title: "Kompleks sonlarni ko'paytirish", quick: true,
    gen(rng) {
      const a = rng.int(-5, 5), b = rng.nz(-5, 5), c = rng.int(-4, 4), d = rng.nz(-4, 4);
      const re = a * c - b * d, im = a * d + b * c;
      return {
        q: `$z_1 = ${cpx(a, b)}$, $z_2 = ${cpx(c, d)}$. $z_1 z_2 = x + iy$ ko'paytmani toping.`,
        answer: vec([re, im], ["x", "y"]),
        hints: ["Qavslarni oching va $i^2 = -1$ ekanini hisobga oling.", "$(a+bi)(c+di) = (ac - bd) + (ad + bc)i$"],
        solution: [`$x = ${par(a)}\\cdot${par(c)} - ${par(b)}\\cdot${par(d)} = ${re}$`, `$y = ${par(a)}\\cdot${par(d)} + ${par(b)}\\cdot${par(c)} = ${im}$`, `$z_1z_2 = ${cpx(re, im)}$`],
      };
    },
  },
  {
    id: "cdiv", topic: "kompleks", title: "Kompleks sonlarni bo'lish",
    gen(rng) {
      const a = rng.int(-6, 6), b = rng.int(-6, 6), c = rng.nz(-4, 4), d = rng.nz(-4, 4);
      const n = c * c + d * d, re = F(a * c + b * d, n), im = F(b * c - a * d, n);
      return {
        q: `$\\dfrac{${cpx(a, b)}}{${cpx(c, d)}} = x + iy$ bo'linmani toping. (Kasrlarni $a/b$ ko'rinishida yozing.)`,
        answer: vec([re, im], ["x", "y"]),
        hints: ["Surat va maxrajni maxrajning qo'shmasiga ko'paytiring: $z\\bar z = |z|^2$.", `Maxraj: $(${cpx(c, d)})(${cpx(c, -d)}) = ${n}$`],
        solution: [
          `$\\dfrac{(${cpx(a, b)})(${cpx(c, -d)})}{${c * c}+${d * d}} = \\dfrac{${cpx(a * c + b * d, b * c - a * d)}}{${n}}$`,
          `$x = ${re.tex()},\\quad y = ${im.tex()}$`,
        ],
      };
    },
  },
  {
    id: "moivre", topic: "kompleks", title: "Muavr formulasi",
    gen(rng) {
      const a = rng.sign(), b = rng.sign(), n = rng.int(2, 9);
      let re = 1, im = 0;
      for (let k = 0; k < n; k++) [re, im] = [re * a - im * b, re * b + im * a];
      const phi = { "1,1": "\\frac{\\pi}{4}", "-1,1": "\\frac{3\\pi}{4}", "-1,-1": "-\\frac{3\\pi}{4}", "1,-1": "-\\frac{\\pi}{4}" }[`${a},${b}`];
      return {
        q: `Muavr formulasidan foydalanib $(${cpx(a, b)})^{${n}} = x + iy$ ni hisoblang.`,
        answer: vec([re, im], ["x", "y"]),
        hints: ["Avval trigonometrik shaklga o'ting: $r = \\sqrt 2$, $\\varphi = \\arg z$.", "$z^n = r^n(\\cos n\\varphi + i\\sin n\\varphi)$"],
        solution: [
          `$${cpx(a, b)} = \\sqrt2\\left(\\cos${phi} + i\\sin${phi}\\right)$`,
          `$z^{${n}} = (\\sqrt2)^{${n}}\\left(\\cos ${n}\\cdot${phi} + i\\sin ${n}\\cdot${phi}\\right) = ${cpx(re, im)}$`,
        ],
      };
    },
  },
  {
    id: "cmod", topic: "kompleks", title: "Kompleks son moduli", quick: true,
    gen(rng) {
      const [p, q, h] = rng.pick(PYTH3);
      const [a, b] = rng.next() < 0.5 ? [p * rng.sign(), q * rng.sign()] : [q * rng.sign(), p * rng.sign()];
      return {
        q: `$z = ${cpx(a, b)}$ kompleks sonning moduli $|z|$ ni toping.`,
        answer: num(h),
        hints: ["$|x + iy| = \\sqrt{x^2 + y^2}$"],
        solution: [`$|z| = \\sqrt{${a * a} + ${b * b}} = ${h}$`],
      };
    },
  },
  // ---------------- Minorlar (4-tartib) ----------------
  {
    id: "det4", topic: "minor", title: "4-tartibli determinant (Laplas yoyilmasi)",
    gen(rng) {
      const A = rng.mat(4, 4, -3, 3);
      const r = rng.int(0, 3), keep = rng.int(0, 3);
      for (let j = 0; j < 4; j++) if (j !== keep) A[r][j] = 0;
      if (A[r][keep] === 0) A[r][keep] = rng.nz(-3, 3);
      const sub = A.filter((_, i) => i !== r).map((row) => row.filter((_, j) => j !== keep));
      const m = det(sub), sgn = (r + keep) % 2 ? -1 : 1, v = det(A);
      return {
        q: `$\\Delta = ${texMat(A, { br: "v" })}$ determinantni hisoblang.`,
        answer: num(v),
        hints: [`${r + 1}-satrda bitta nolmas element bor — shu satr bo'yicha yoying.`, "$\\Delta = a_{ij}A_{ij}$, $A_{ij} = (-1)^{i+j}M_{ij}$"],
        solution: [
          `${r + 1}-satr bo'yicha: $\\Delta = ${par(A[r][keep])}\\cdot(-1)^{${r + 1}+${keep + 1}}M_{${r + 1}${keep + 1}}$`,
          `$M_{${r + 1}${keep + 1}} = ${texMat(sub, { br: "v" })} = ${m.tex()}$`,
          `$\\Delta = ${par(A[r][keep])}\\cdot(${sgn})\\cdot(${m.tex()}) = ${v.tex()}$`,
        ],
      };
    },
  },
  // ---------------- Chiziqli bog'liqlik ----------------
  {
    id: "ldep", topic: "rang", title: "Chiziqli bog'liqlik parametri",
    gen(rng) {
      let a, b, c1, c2, coef;
      do {
        a = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]; b = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)];
        c1 = rng.int(-4, 4); c2 = rng.int(-4, 4);
        coef = a[0] * b[1] - a[1] * b[0];
      } while (coef === 0);
      const free = det([a, b, [c1, c2, 0]]);
      const k = free.neg().div(coef);
      return {
        q: `$\\vec a=${texVec(a)}$, $\\vec b=${texVec(b)}$, $\\vec c=(${c1};\\ ${c2};\\ k)$ vektorlar chiziqli bog'liq bo'lishi uchun $k$ ni toping.`,
        answer: num(k),
        hints: ["Uchta vektor chiziqli bog'liq ⇔ ulardan tuzilgan determinant nolga teng.", "Determinantni uchinchi ustun bo'yicha yoying — $k$ ga nisbatan chiziqli tenglama hosil bo'ladi."],
        solution: [
          `$${texMat([a, b, [c1, c2, "k"]], { br: "v" })} = 0$`,
          `$${coef}k ${free.n < 0 ? "-" : "+"} ${free.abs().tex()} = 0 \\Rightarrow k = ${k.tex()}$`,
        ],
      };
    },
  },
  // ---------------- Fundamental sistema ----------------
  {
    id: "fsr", topic: "sistema", title: "Fundamental sistemadagi yechimlar soni",
    gen(rng) {
      const r = rng.pick([1, 2, 2, 3]);
      const rows = [];
      while (rows.length < r) {
        const v = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)];
        if (rrefSteps([...rows, v]).rank === rows.length + 1) rows.push(v);
      }
      while (rows.length < 3) {
        const a = rng.int(-2, 2), b = rng.nz(-2, 2);
        rows.push(rows[0].map((x, k) => a * x + b * rows[rows.length - 1][k]));
      }
      const A = rng.shuffle(rows);
      const res = rrefSteps(A, 0, { jordan: false });
      const eq = (i) => `${texLin(A[i], ["x_1", "x_2", "x_3", "x_4"])} = 0`;
      return {
        q: `Bir jinsli sistema $\\begin{cases} ${eq(0)} \\\\ ${eq(1)} \\\\ ${eq(2)} \\end{cases}$ ning fundamental yechimlar sistemasi nechta vektordan iborat?`,
        answer: num(4 - res.rank),
        hints: ["FYS dagi vektorlar soni $n - r$, bu yerda $n$ — noma'lumlar soni, $r$ — matritsa rangi.", "Rangni pog'onasimon ko'rinish orqali toping."],
        solution: [...res.steps.map((s) => `$${s.op}:\\quad ${texMat(s.M)}$`), `$r = ${res.rank}$, $n = 4$ ⇒ $n - r = ${4 - res.rank}$`],
      };
    },
  },
  // ---------------- Chiziqli fazo, bazis ----------------
  {
    id: "coord", topic: "fazo", title: "Vektorning bazisdagi koordinatalari",
    gen(rng) {
      let P, d;
      do { P = rng.mat(2, 2, -3, 3); d = P[0][0] * P[1][1] - P[0][1] * P[1][0]; } while (![1, -1, 2, -2, 3, -3].includes(d));
      const c = [rng.int(-4, 4), rng.int(-4, 4)];
      const x = [P[0][0] * c[0] + P[0][1] * c[1], P[1][0] * c[0] + P[1][1] * c[1]];
      const e1 = [P[0][0], P[1][0]], e2 = [P[0][1], P[1][1]];
      return {
        q: `$\\vec e_1 = ${texVec(e1)}$, $\\vec e_2 = ${texVec(e2)}$ bazisda $\\vec x = ${texVec(x)}$ vektorning koordinatalarini toping: $\\vec x = \\alpha\\vec e_1 + \\beta\\vec e_2$.`,
        answer: vec(c, ["α", "β"]),
        hints: ["Koordinatalar bo'yicha sistema tuzing: $\\alpha e_{1k} + \\beta e_{2k} = x_k$.", `Sistema determinanti $${d}$ — bazis haqiqatan bazis.`],
        solution: [
          `$\\begin{cases} ${texLin([e1[0], e2[0]], ["\\alpha", "\\beta"])} = ${x[0]} \\\\ ${texLin([e1[1], e2[1]], ["\\alpha", "\\beta"])} = ${x[1]} \\end{cases}$`,
          `$\\alpha = ${c[0]},\\ \\beta = ${c[1]}$`,
        ],
      };
    },
  },
  // ---------------- Yevklid fazosi ----------------
  {
    id: "gram2", topic: "yevklid", title: "Gram–Shmidt ortogonallashtirish",
    gen(rng) {
      let a1, a2;
      do { a1 = [rng.int(-2, 2), rng.int(-2, 2), rng.int(-2, 2)]; a2 = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]; }
      while (a1.every((x) => x === 0) || cross3(a1, a2).every((x) => x === 0));
      const s = dot3(a2, a1), n = dot3(a1, a1), k = F(s, n);
      const b2 = a2.map((x, i) => F(x).sub(k.mul(a1[i])));
      return {
        q: `$\\vec a_1 = ${texVec(a1)}$, $\\vec a_2 = ${texVec(a2)}$ sistemani Gram–Shmidt usulida ortogonallashtiring: $\\vec b_1 = \\vec a_1$. $\\vec b_2$ ni toping.`,
        answer: vec(b2, ["x", "y", "z"]),
        hints: ["$\\vec b_2 = \\vec a_2 - \\dfrac{(\\vec a_2, \\vec b_1)}{(\\vec b_1, \\vec b_1)}\\vec b_1$", `$(\\vec a_2,\\vec b_1) = ${s}$, $(\\vec b_1,\\vec b_1) = ${n}$`],
        solution: [`$\\vec b_2 = ${texVec(a2)} - ${k.tex()}\\cdot${texVec(a1)} = ${texVec(b2)}$`, "Tekshirish: $(\\vec b_2, \\vec b_1) = 0$."],
      };
    },
  },
  {
    id: "orth4", topic: "yevklid", title: "Ortogonallik sharti (R⁴)", quick: true,
    gen(rng) {
      const a = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4), rng.nz(-3, 3)], b = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)];
      const k = F(-(a[0] * b[0] + a[1] * b[1] + a[2] * b[2]), a[3]);
      return {
        q: `$\\mathbb R^4$ da $\\vec x = ${texVec(a)}$ va $\\vec y = (${b.join(";\\ ")};\\ k)$ vektorlar ortogonal bo'lishi uchun $k$ ni toping.`,
        answer: num(k),
        hints: ["Ortogonallik: $(\\vec x, \\vec y) = \\sum x_i y_i = 0$."],
        solution: [`$${a[0] * b[0] + a[1] * b[1] + a[2] * b[2]} + ${par(a[3])}k = 0 \\Rightarrow k = ${k.tex()}$`],
      };
    },
  },
  // ---------------- Kvadratik formalar ----------------
  {
    id: "qf-canon", topic: "kvadratik", title: "Kvadratik formaning kanonik ko'rinishi",
    gen(rng) {
      const [p, q] = rng.pick([[3, 2], [6, 4], [5, 6], [15, 4], [9, 6], [8, 3], [12, 8]]);
      const h = Math.round(Math.sqrt(p * p + 4 * q * q));
      const c = rng.int(-4, 4), a = c + p, b = q * rng.sign();
      const [l1, l2] = [(a + c - h) / 2, (a + c + h) / 2];
      return {
        q: `$Q(x,y) = ${texLin([a, 2 * b, c], ["x^2", "xy", "y^2"])}$ kvadratik formani ortogonal almashtirish bilan kanonik ko'rinishga keltiring: $Q = \\lambda_1 x'^2 + \\lambda_2 y'^2$, $\\lambda_1 < \\lambda_2$.`,
        answer: vec([l1, l2], ["λ₁", "λ₂"]),
        hints: [`Forma matritsasi: $A = ${M([[a, b], [b, c]])}$.`, "Kanonik koeffitsiyentlar — $A$ ning xos sonlari: $\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0$."],
        solution: [`$A = ${M([[a, b], [b, c]])}$, $\\operatorname{tr}A = ${a + c}$, $\\det A = ${a * c - b * b}$`, `$\\lambda^2 - ${par(a + c)}\\lambda + ${par(a * c - b * b)} = 0 \\Rightarrow \\lambda_1 = ${l1},\\ \\lambda_2 = ${l2}$`, `$Q = ${texLin([l1, l2], ["x'^2", "y'^2"])}$`],
      };
    },
  },
  {
    id: "sylvester", topic: "kvadratik", title: "Silvestr mezoni: bosh minorlar",
    gen(rng) {
      const a = rng.int(-3, 5), d = rng.int(-3, 5), f = rng.int(-3, 5), b = rng.int(-2, 2), c = rng.int(-2, 2), e = rng.int(-2, 2);
      const A = [[a, b, c], [b, d, e], [c, e, f]];
      const D1 = a, D2 = a * d - b * b, D3 = det(A);
      return {
        q: `$Q = ${texLin([a, d, f, 2 * b, 2 * c, 2 * e], ["x_1^2", "x_2^2", "x_3^2", "x_1x_2", "x_1x_3", "x_2x_3"])}$ forma matritsasining bosh minorlari $\\Delta_1, \\Delta_2, \\Delta_3$ ni toping.`,
        answer: vec([D1, D2, D3], ["Δ₁", "Δ₂", "Δ₃"]),
        hints: ["Forma matritsasi simmetrik: diagonalda kvadratlar oldidagi koeffitsiyentlar, $a_{ij}$ — $x_ix_j$ oldidagi koeffitsiyentning yarmi.", "Silvestr: forma musbat aniqlangan ⇔ $\\Delta_1>0, \\Delta_2>0, \\Delta_3>0$."],
        solution: [`$A = ${M(A)}$`, `$\\Delta_1 = ${D1}$, $\\Delta_2 = ${texMat([[a, b], [b, d]], { br: "v" })} = ${D2}$, $\\Delta_3 = \\det A = ${D3.tex()}$`, D1 > 0 && D2 > 0 && D3.n > 0 ? "Forma musbat aniqlangan." : "Forma musbat aniqlangan emas."],
      };
    },
  },
  // ---------------- Koordinatalar sistemasi ----------------
  {
    id: "polar", topic: "koordinata", title: "Qutb radiusi", quick: true,
    gen(rng) {
      const [p, q, h] = rng.pick(PYTH3);
      const [x, y] = rng.next() < 0.5 ? [p * rng.sign(), q * rng.sign()] : [q * rng.sign(), p * rng.sign()];
      return {
        q: `Dekart koordinatalari $M(${x};\\ ${y})$ bo'lgan nuqtaning qutb radiusi $\\rho$ ni toping.`,
        answer: num(h),
        hints: ["$\\rho = \\sqrt{x^2 + y^2}$, $\\operatorname{tg}\\varphi = y/x$."],
        solution: [`$\\rho = \\sqrt{${x * x} + ${y * y}} = ${h}$`],
      };
    },
  },
  {
    id: "axes", topic: "koordinata", title: "Koordinatalarni almashtirish",
    gen(rng) {
      const x0 = rng.int(-4, 4), y0 = rng.int(-4, 4), alpha = rng.pick([90, 180, 270]);
      const [cs, sn] = { 90: [0, 1], 180: [-1, 0], 270: [0, -1] }[alpha];
      const x = rng.int(-6, 6), y = rng.int(-6, 6);
      // x = x0 + x' cos - y' sin;  y = y0 + x' sin + y' cos  =>  x' = (x-x0)cos + (y-y0)sin, y' = -(x-x0)sin + (y-y0)cos
      const xp = (x - x0) * cs + (y - y0) * sn, yp = -(x - x0) * sn + (y - y0) * cs;
      return {
        q: `Koordinata boshi $O'(${x0};\\ ${y0})$ nuqtaga ko'chirildi va o'qlar $${alpha}^\\circ$ ga buraldi. $M(${x};\\ ${y})$ nuqtaning yangi koordinatalari $(x';\\ y')$ ni toping.`,
        answer: vec([xp, yp], ["x'", "y'"]),
        hints: ["$x = x_0 + x'\\cos\\alpha - y'\\sin\\alpha$, $\\ y = y_0 + x'\\sin\\alpha + y'\\cos\\alpha$.", "Teskarisi: $x' = (x-x_0)\\cos\\alpha + (y-y_0)\\sin\\alpha$, $\\ y' = -(x-x_0)\\sin\\alpha + (y-y_0)\\cos\\alpha$."],
        solution: [`$\\cos\\alpha = ${cs},\\ \\sin\\alpha = ${sn}$, $\\ x - x_0 = ${x - x0},\\ y - y_0 = ${y - y0}$`, `$x' = ${xp},\\quad y' = ${yp}$`],
      };
    },
  },
  // ---------------- Vektor ko'paytma: yuz ----------------
  {
    id: "triarea", topic: "vkopaytma", title: "Uchburchak yuzi",
    gen(rng) {
      const P = [[rng.int(-4, 4), rng.int(-4, 4)], [rng.int(-4, 4), rng.int(-4, 4)], [rng.int(-4, 4), rng.int(-4, 4)]];
      let d = (P[1][0] - P[0][0]) * (P[2][1] - P[0][1]) - (P[2][0] - P[0][0]) * (P[1][1] - P[0][1]);
      if (d === 0) { P[2][1] += 3; d = (P[1][0] - P[0][0]) * (P[2][1] - P[0][1]) - (P[2][0] - P[0][0]) * (P[1][1] - P[0][1]); }
      if (d === 0) { P[2][0] += 2; d = (P[1][0] - P[0][0]) * (P[2][1] - P[0][1]) - (P[2][0] - P[0][0]) * (P[1][1] - P[0][1]); }
      const S = F(Math.abs(d), 2);
      return {
        q: `Uchlari $A(${P[0].join(";\\ ")})$, $B(${P[1].join(";\\ ")})$, $C(${P[2].join(";\\ ")})$ bo'lgan uchburchak yuzini toping.`,
        answer: num(S),
        hints: ["$S = \\frac12|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$", "Tekislikda: $S = \\frac12\\left|\\begin{vmatrix} x_B - x_A & y_B - y_A \\\\ x_C - x_A & y_C - y_A\\end{vmatrix}\\right|$"],
        solution: [`$\\overrightarrow{AB} = (${P[1][0] - P[0][0]};\\ ${P[1][1] - P[0][1]})$, $\\overrightarrow{AC} = (${P[2][0] - P[0][0]};\\ ${P[2][1] - P[0][1]})$`, `$S = \\frac12|${d}| = ${S.tex()}$`],
      };
    },
  },
  // ---------------- Sirtlar ----------------
  {
    id: "sphere", topic: "sirt", title: "Sfera markazi va radiusi",
    gen(rng) {
      const c = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)], R = rng.int(1, 6);
      const D = c.map((x) => -2 * x), G = c[0] ** 2 + c[1] ** 2 + c[2] ** 2 - R * R;
      const lin = texLin(D, ["x", "y", "z"], G);
      return {
        q: `$x^2 + y^2 + z^2 ${lin === "0" ? "" : (lin.startsWith("-") ? "" : "+ ") + lin} = 0$ sferaning markazi $(x_0;\\ y_0;\\ z_0)$ va radiusi $R$ ni toping.`,
        answer: vec([...c, R], ["x₀", "y₀", "z₀", "R"]),
        hints: ["Har bir o'zgaruvchi bo'yicha to'liq kvadrat ajrating.", "$(x-x_0)^2 + (y-y_0)^2 + (z-z_0)^2 = R^2$"],
        solution: [`$(x ${c[0] > 0 ? "-" : "+"} ${Math.abs(c[0])})^2 + (y ${c[1] > 0 ? "-" : "+"} ${Math.abs(c[1])})^2 + (z ${c[2] > 0 ? "-" : "+"} ${Math.abs(c[2])})^2 = ${R * R}$`, `Markaz $${texVec(c)}$, $R = ${R}$`],
      };
    },
  },
  {
    id: "ellipsoid", topic: "sirt", title: "Ellipsoidning yarim o'qlari",
    gen(rng) {
      const [a, b, c] = rng.shuffle([1, 2, 3, 4, 5, 6]).slice(0, 3);
      const L = a * a * b * b * c * c;
      const k = rng.pick([1, 2, 3]);
      const co = [L / (a * a), L / (b * b), L / (c * c)].map((x) => x * k);
      return {
        q: `$${texLin(co, ["x^2", "y^2", "z^2"])} = ${L * k}$ ellipsoidning $Ox, Oy, Oz$ o'qlaridagi yarim o'qlari $a, b, c$ ni toping.`,
        answer: vec([a, b, c], ["a", "b", "c"]),
        hints: [`Ikkala tomonni $${L * k}$ ga bo'ling: $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} + \\dfrac{z^2}{c^2} = 1$.`],
        solution: [`$\\dfrac{x^2}{${a * a}} + \\dfrac{y^2}{${b * b}} + \\dfrac{z^2}{${c * c}} = 1$`, `$a = ${a},\\ b = ${b},\\ c = ${c}$`],
      };
    },
  },
];

function cpx(a, b) {
  a = Fr.of(a); b = Fr.of(b);
  if (b.isZero()) return a.tex();
  const bi = b.abs().eq(1) ? "i" : `${b.abs().tex()}i`;
  if (a.isZero()) return (b.n < 0 ? "-" : "") + bi;
  return `${a.tex()} ${b.n < 0 ? "-" : "+"} ${bi}`;
}
function dot3(u, v) { return u.reduce((s, x, i) => s + x * v[i], 0); }
function cross3(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }

export const generatorsFor = (topic) => GENERATORS.filter((g) => g.topic === topic);
export const genById = (id) => GENERATORS.find((g) => g.id === id);
