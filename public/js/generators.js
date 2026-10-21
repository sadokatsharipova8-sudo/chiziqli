// Masala generatorlari: har chaqiruvda yangi masala (urug'li RNG bilan — variantlar uchun takrorlanadi).
// gen(rng) -> { q, answer: {type:'num'|'vec'|'mat', value, labels?}, hints:[], solution:[] }
// Matnlarda $...$ — KaTeX formulalar.

import { F, Fr, det, inverse, mmul, texMat, texVec, texLin, rrefSteps, minor, toFr } from "./math.js";

// Fan dasturi: 2 semestr × 18 mavzu. sem — semestr, no — semestrdagi tartib raqami.
const T = (sem, no, id, name, icon, color) => ({ sem, no, id, name, icon, color });
export const TOPICS = [
  // ===== 1-semestr: chiziqli algebra =====
  T(1, 1, "kompleks", "Kompleks sonlar. Trigonometrik shakl, Muavr formulasi", "ℂ", "#a855f7"),
  T(1, 2, "matritsa", "Matritsalar va ular ustida amallar. O'rin almashtirishlar", "▦", "#6366f1"),
  T(1, 3, "determinant", "n-tartibli determinantlar va ularning xossalari", "|A|", "#8b5cf6"),
  T(1, 4, "minor", "Algebraik to'ldiruvchi va minorlar", "Aᵢⱼ", "#7c3aed"),
  T(1, 5, "teskari", "Teskari matritsa. Sistemani matritsaviy usulda yechish", "A⁻¹", "#ec4899"),
  T(1, 6, "arifmetik", "n-o'lchamli arifmetik fazo. Chiziqli bog'liq va erkli vektorlar", "ℝⁿ", "#db2777"),
  T(1, 7, "rang", "Chiziqli bog'liqlik haqidagi teoremalar. Matritsa rangi", "r", "#e11d48"),
  T(1, 8, "sistema", "Sistemani to'la yechish. Fundamental yechimlar", "≡", "#f97316"),
  T(1, 9, "fazo", "Chiziqli fazo. O'lcham va bazis", "V", "#f59e0b"),
  T(1, 10, "qism-fazo", "Qism fazo. Qism fazolar yig'indisi va kesishmasi", "⊂", "#eab308"),
  T(1, 11, "yevklid", "Yevklid fazosi. Ortogonal va ortonormal sistemalar", "⊥", "#84cc16"),
  T(1, 12, "gram", "Ortogonallashtirish jarayoni. Ortogonal to'ldiruvchi", "G", "#22c55e"),
  T(1, 13, "formalar", "Chiziqli, bichiziqli va kvadratik formalar", "Q", "#10b981"),
  T(1, 14, "kanonik", "Kvadratik formaning kanonik shakli", "λx²", "#14b8a6"),
  T(1, 15, "kyevklid", "Kompleks Yevklid fazo", "ℂⁿ", "#06b6d4"),
  T(1, 16, "almashtirish", "Chiziqli almashtirishlar va ularning matritsasi", "𝒜", "#0ea5e9"),
  T(1, 17, "yadro", "Obraz va yadro. Turli bazislardagi matritsalar", "ker", "#3b82f6"),
  T(1, 18, "xos-qiymat", "Invariant qism fazolar. Xos son va xos vektorlar", "λ", "#ef4444"),
  // ===== 2-semestr: analitik geometriya =====
  T(2, 1, "vektor", "Vektorlar va ular ustida chiziqli amallar", "→", "#0284c7"),
  T(2, 2, "skalyar", "Vektorning o'qqa proyeksiyasi. Skalyar ko'paytma", "·", "#0891b2"),
  T(2, 3, "vkopaytma", "Vektor ko'paytma va uning xossalari", "×", "#0d9488"),
  T(2, 4, "aralash", "Aralash ko'paytma va uning xossalari", "abc", "#059669"),
  T(2, 5, "dekart", "Dekart koordinatalar sistemasini almashtirish", "⊕", "#16a34a"),
  T(2, 6, "qutb", "Qutb, silindrik va sferik koordinatalar", "ρφ", "#65a30d"),
  T(2, 7, "togri-chiziq", "Tekislikda to'g'ri chiziq tenglamalari", "╱", "#ca8a04"),
  T(2, 8, "tekislik", "Fazoda tekislik. O'zaro vaziyat, masofa", "◇", "#d97706"),
  T(2, 9, "fazo-chiziq", "Fazoda to'g'ri chiziq. Chiziq va tekislik vaziyati", "↗", "#ea580c"),
  T(2, 10, "ellips", "Ikkinchi tartibli chiziqlar. Ellips", "⬯", "#dc2626"),
  T(2, 11, "giperbola", "Giperbola va parabola", ")(", "#e11d48"),
  T(2, 12, "umumiy-chiziq", "Chiziqning umumiy tenglamasi. Markaz", "⊙", "#c026d3"),
  T(2, 13, "chiziq-kesish", "Ikkinchi tartibli chiziq va to'g'ri chiziq", "⨯", "#9333ea"),
  T(2, 14, "markaziy", "Kanonik ko'rinishga keltirish: markaziy hol", "◎", "#7c3aed"),
  T(2, 15, "nomarkaziy", "Kanonik ko'rinishga keltirish: nomarkaziy hol", "∪", "#4f46e5"),
  T(2, 16, "sirt", "Ikkinchi tartibli sirtlarning kanonik tenglamalari", "⬭", "#2563eb"),
  T(2, 17, "yasovchi", "Sirtlarning to'g'ri chiziqli yasovchilari", "⫽", "#475569"),
  T(2, 18, "umumiy-sirt", "Ikkinchi tartibli sirtning umumiy tenglamasi", "∯", "#64748b"),
];export const topicById = (id) => TOPICS.find((t) => t.id === id);

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
    id: "dot", topic: "skalyar", title: "Skalyar ko'paytma", quick: true,
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
    id: "mixed", topic: "aralash", title: "Aralash ko'paytma",
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
    id: "perp", topic: "skalyar", title: "Perpendikulyarlik sharti",
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
    id: "ellipse", topic: "ellips", title: "Ellips ekssentrisiteti",
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
    id: "hyperbola", topic: "giperbola", title: "Giperbola fokusi va asimptotasi",
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
    id: "circle", topic: "ellips", title: "Aylana markazi va radiusi",
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
    id: "parabola", topic: "giperbola", title: "Parabola fokusi", quick: true,
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
    id: "transform", topic: "almashtirish", title: "Almashtirish ostidagi nuqta", quick: true,
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
    id: "ldep", topic: "arifmetik", title: "Chiziqli bog'liqlik parametri",
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
    id: "gram2", topic: "gram", title: "Gram–Shmidt ortogonallashtirish",
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
    id: "qf-canon", topic: "kanonik", title: "Kvadratik formaning kanonik ko'rinishi",
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
    id: "sylvester", topic: "kanonik", title: "Silvestr mezoni: bosh minorlar",
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
    id: "polar", topic: "qutb", title: "Qutb radiusi", quick: true,
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
    id: "axes", topic: "dekart", title: "Koordinatalarni almashtirish",
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
    id: "sphere", topic: "umumiy-sirt", title: "Sfera markazi va radiusi",
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
  // ================= Yangi mavzular uchun generatorlar =================
  {
    id: "lincomb2", topic: "arifmetik", title: "Vektorni chiziqli kombinatsiya orqali ifodalash",
    gen(rng) {
      let a, b;
      do { a = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]; b = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]; }
      while (cross3(a, b).every((x) => x === 0) || a[0] * b[1] - a[1] * b[0] === 0);
      const al = rng.nz(-3, 3), be = rng.nz(-3, 3);
      const c = a.map((x, i) => al * x + be * b[i]);
      return {
        q: `$\\mathbb R^3$ da $\\vec c = ${texVec(c)}$ vektorni $\\vec a = ${texVec(a)}$ va $\\vec b = ${texVec(b)}$ orqali ifodalang: $\\vec c = \\alpha\\vec a + \\beta\\vec b$.`,
        answer: vec([al, be], ["α", "β"]),
        hints: ["Komponentalar bo'yicha sistema tuzing: $\\alpha a_k + \\beta b_k = c_k$, $k = 1, 2, 3$.", "Ikki tenglamadan $\\alpha, \\beta$ ni toping, uchinchisi bilan tekshiring."],
        solution: [
          `$\\begin{cases} ${texLin([a[0], b[0]], ["\\alpha", "\\beta"])} = ${c[0]} \\\\ ${texLin([a[1], b[1]], ["\\alpha", "\\beta"])} = ${c[1]} \\\\ ${texLin([a[2], b[2]], ["\\alpha", "\\beta"])} = ${c[2]} \\end{cases}$`,
          `$\\alpha = ${al},\\ \\beta = ${be}$`,
        ],
      };
    },
  },
  {
    id: "subsum", topic: "qism-fazo", title: "Qism fazolar yig'indisi va kesishmasi o'lchami",
    gen(rng) {
      const v4 = () => [rng.int(-2, 2), rng.int(-2, 2), rng.int(-2, 2), rng.int(-2, 2)];
      let a1, a2, b1, b2, r;
      for (;;) {
        a1 = v4(); a2 = v4(); b1 = v4();
        if (rrefSteps([a1, a2, b1]).rank < 3) continue;
        if (rng.next() < 0.6) {
          const al = rng.nz(-2, 2), be = rng.int(-2, 2), ga = rng.nz(-1, 1);
          b2 = a1.map((x, i) => al * x + be * a2[i] + ga * b1[i]);
        } else b2 = v4();
        if (rrefSteps([b1, b2]).rank < 2) continue;
        r = rrefSteps([a1, a2, b1, b2]).rank;
        if (r >= 3) break;
      }
      return {
        q: `$\\mathbb R^4$ da $L_1 = L(\\vec a_1, \\vec a_2)$, $L_2 = L(\\vec b_1, \\vec b_2)$, bunda $\\vec a_1 = ${texVec(a1)}$, $\\vec a_2 = ${texVec(a2)}$, $\\vec b_1 = ${texVec(b1)}$, $\\vec b_2 = ${texVec(b2)}$. $\\dim(L_1 + L_2)$ va $\\dim(L_1\\cap L_2)$ ni toping.`,
        answer: vec([r, 4 - r], ["dim(L₁+L₂)", "dim(L₁∩L₂)"]),
        hints: ["$\\dim(L_1 + L_2)$ — to'rtala vektordan tuzilgan matritsa rangi.", "Grassman formulasi: $\\dim(L_1\\cap L_2) = \\dim L_1 + \\dim L_2 - \\dim(L_1 + L_2)$, bu yerda $\\dim L_1 = \\dim L_2 = 2$."],
        solution: [`$r${texMat([a1, a2, b1, b2])} = ${r}$`, `$\\dim(L_1 + L_2) = ${r}$, $\\ \\dim(L_1\\cap L_2) = 2 + 2 - ${r} = ${4 - r}$`],
      };
    },
  },
  {
    id: "cinner", topic: "kyevklid", title: "Kompleks skalyar ko'paytma",
    gen(rng) {
      const z = () => [rng.int(-3, 3), rng.int(-3, 3)];
      const x = [z(), z()], y = [z(), z()];
      // (x, y) = x1·conj(y1) + x2·conj(y2)
      const prod = ([a, b], [c, d]) => [a * c + b * d, b * c - a * d];
      const p1 = prod(x[0], y[0]), p2 = prod(x[1], y[1]);
      const re = p1[0] + p2[0], im = p1[1] + p2[1];
      const cx = (u) => `(${cpx(u[0], u[1])})`;
      return {
        q: `$\\mathbb C^2$ da $\\vec x = (${cpx(...x[0])};\\ ${cpx(...x[1])})$, $\\vec y = (${cpx(...y[0])};\\ ${cpx(...y[1])})$. Skalyar ko'paytma $(\\vec x, \\vec y) = x_1\\bar y_1 + x_2\\bar y_2$ ni $a + bi$ ko'rinishda toping.`,
        answer: vec([re, im], ["Re", "Im"]),
        hints: ["Ikkinchi ko'paytuvchining **qo'shmasi** olinadi: $\\overline{c + di} = c - di$.", "$(a + bi)(c - di) = (ac + bd) + (bc - ad)i$"],
        solution: [
          `$x_1\\bar y_1 = ${cx(x[0])}\\cdot\\overline{${cx(y[0])}} = ${cpx(...p1)}$`,
          `$x_2\\bar y_2 = ${cx(x[1])}\\cdot\\overline{${cx(y[1])}} = ${cpx(...p2)}$`,
          `$(\\vec x, \\vec y) = ${cpx(re, im)}$`,
        ],
      };
    },
  },
  {
    id: "compose", topic: "almashtirish", title: "Almashtirishlar ko'paytmasining matritsasi",
    gen(rng) {
      const A = rng.mat(2, 2, -3, 3), B = rng.mat(2, 2, -3, 3);
      return {
        q: `$\\mathcal A$ va $\\mathcal B$ almashtirishlarning matritsalari $A = ${M(A)}$, $B = ${M(B)}$. Avval $\\mathcal B$, keyin $\\mathcal A$ bajariladigan $\\mathcal A\\mathcal B$ almashtirish matritsasini toping.`,
        answer: mat(mmul(A, B)),
        hints: ["$(\\mathcal A\\mathcal B)\\vec x = \\mathcal A(\\mathcal B\\vec x)$ — matritsasi $AB$ (tartib muhim!).", "$c_{ij}$ — $A$ ning $i$-satri va $B$ ning $j$-ustuni skalyar ko'paytmasi."],
        solution: [`$AB = ${M(A)}${M(B)} = ${M(mmul(A, B))}$`],
      };
    },
  },
  {
    id: "defect", topic: "yadro", title: "Almashtirishning rangi va defekti", quick: true,
    gen(rng) {
      const r = rng.pick([1, 2, 2]);
      let rows;
      do {
        const u = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)], v = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)];
        const comb = () => { const a = rng.int(-2, 2), b = r === 2 ? rng.int(-2, 2) : 0; return u.map((x, i) => a * x + b * v[i]); };
        rows = rng.shuffle([u, r === 2 ? v : comb(), comb()]);
      } while (rrefSteps(rows).rank !== r);
      return {
        q: `$\\mathbb R^3$ dagi $\\mathcal A$ almashtirishning matritsasi $A = ${M(rows)}$. Uning defekti $\\dim\\ker\\mathcal A$ ni toping.`,
        answer: num(3 - r),
        hints: ["$\\operatorname{rang}\\mathcal A + \\operatorname{def}\\mathcal A = \\dim V = 3$.", "$\\operatorname{rang}\\mathcal A = r(A)$ — pog'onasimon ko'rinish orqali."],
        solution: [`$r(A) = ${r}$`, `$\\dim\\ker\\mathcal A = 3 - ${r} = ${3 - r}$`],
      };
    },
  },
  {
    id: "qf-value", topic: "formalar", title: "Kvadratik forma qiymati", quick: true,
    gen(rng) {
      const a = rng.int(-3, 3), b = rng.int(-2, 2), c = rng.int(-3, 3);
      const x = rng.nz(-3, 3), y = rng.nz(-3, 3);
      const v = a * x * x + 2 * b * x * y + c * y * y;
      return {
        q: `$Q(x, y) = ${texLin([a, 2 * b, c], ["x^2", "xy", "y^2"])}$ kvadratik formaning $\\vec v = (${x};\\ ${y})$ dagi qiymatini toping.`,
        answer: num(v),
        hints: [`$Q = X^TAX$, $A = ${M([[a, b], [b, c]])}$.`],
        solution: [`$Q(${x}, ${y}) = ${par(a)}\\cdot${par(x)}^2 + ${par(2 * b)}\\cdot${par(x)}\\cdot${par(y)} + ${par(c)}\\cdot${par(y)}^2 = ${v}$`],
      };
    },
  },
  {
    id: "bilin", topic: "formalar", title: "Bichiziqli forma qiymati",
    gen(rng) {
      const B = rng.mat(2, 2, -3, 3), x = [rng.int(-3, 3), rng.int(-3, 3)], y = [rng.int(-3, 3), rng.int(-3, 3)];
      const v = x[0] * (B[0][0] * y[0] + B[0][1] * y[1]) + x[1] * (B[1][0] * y[0] + B[1][1] * y[1]);
      return {
        q: `Bichiziqli forma $B(\\vec x, \\vec y) = ${texLin([B[0][0], B[0][1], B[1][0], B[1][1]], ["x_1y_1", "x_1y_2", "x_2y_1", "x_2y_2"])}$. $\\vec x = ${texVec(x)}$, $\\vec y = ${texVec(y)}$ uchun $B(\\vec x, \\vec y)$ ni toping.`,
        answer: num(v),
        hints: [`$B(\\vec x, \\vec y) = X^TBY$, $B = ${M(B)}$.`],
        solution: [`$X^TBY = ${texVec(x)}${M(B)}${texMat([[y[0]], [y[1]]])} = ${v}$`],
      };
    },
  },
  {
    id: "lincomb3", topic: "vektor", title: "Vektorlarning chiziqli kombinatsiyasi", quick: false,
    gen(rng) {
      const a = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)], b = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)];
      const k1 = rng.pick([2, 3, -2, -1, 1]), k2 = rng.pick([1, -1, 3, -3, 2, -2]);
      const c = a.map((x, i) => k1 * x + k2 * b[i]);
      return {
        q: `$\\vec a = ${texVec(a)}$, $\\vec b = ${texVec(b)}$. $\\vec c = ${texLin([k1, k2], ["\\vec a", "\\vec b"])}$ vektorni toping.`,
        answer: vec(c, ["x", "y", "z"]),
        hints: ["Chiziqli amallar koordinatalar bo'yicha bajariladi."],
        solution: [`$\\vec c = (${a.map((x, i) => `${k1}\\cdot${par(x)} + ${par(k2)}\\cdot${par(b[i])}`).join(";\\ ")}) = ${texVec(c)}$`],
      };
    },
  },
  {
    id: "lineplane", topic: "fazo-chiziq", title: "To'g'ri chiziq va tekislik kesishish nuqtasi",
    gen(rng) {
      let s, n;
      do { s = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]; n = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]; } while (dot3(s, n) === 0 || s.every((x) => !x));
      const P = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)], t0 = rng.nz(-2, 2);
      const M0 = P.map((x, i) => x - t0 * s[i]), D = -dot3(n, P);
      const can = ["x", "y", "z"].map((v, i) => `\\frac{${v} ${M0[i] > 0 ? "-" : "+"} ${Math.abs(M0[i])}}{${s[i]}}`.replace(/ [+-] 0\}/, "}")).join(" = ");
      return {
        q: `$${can}$ to'g'ri chiziq va $${texLin(n, ["x", "y", "z"], D)} = 0$ tekislikning kesishish nuqtasini toping.`,
        answer: vec(P, ["x", "y", "z"]),
        hints: ["To'g'ri chiziqni parametrik ko'rinishga o'tkazing: $x = x_0 + lt$, $y = y_0 + mt$, $z = z_0 + nt$.", "Tekislik tenglamasiga qo'yib, $t$ ni toping."],
        solution: [`$x = ${M0[0]} + ${par(s[0])}t,\\ y = ${M0[1]} + ${par(s[1])}t,\\ z = ${M0[2]} + ${par(s[2])}t$`, `Tekislikka qo'ysak: $t = ${t0}$`, `Nuqta: $${texVec(P)}$`],
      };
    },
  },
  {
    id: "center2", topic: "umumiy-chiziq", title: "Ikkinchi tartibli chiziq markazi",
    gen(rng) {
      let a, b, c;
      do { a = rng.int(-4, 5); b = rng.int(-3, 3); c = rng.int(-4, 5); } while (a * c - b * b === 0 || !a || !c);
      const x0 = rng.int(-3, 3), y0 = rng.int(-3, 3);
      const d = -(a * x0 + b * y0), e = -(b * x0 + c * y0), f = rng.int(-9, 9);
      return {
        q: `$${texLin([a, 2 * b, c, 2 * d, 2 * e], ["x^2", "xy", "y^2", "x", "y"], f)} = 0$ chiziqning markazini toping.`,
        answer: vec([x0, y0], ["x₀", "y₀"]),
        hints: ["Markaz sistemasi: $\\begin{cases} a_{11}x + a_{12}y + a_{13} = 0 \\\\ a_{12}x + a_{22}y + a_{23} = 0\\end{cases}$ ($xy$, $x$, $y$ oldidagi koeffitsiyentlarning yarmi olinadi).", `$\\delta = ${a * c - b * b} \\ne 0$ — chiziq markaziy.`],
        solution: [`$\\begin{cases} ${texLin([a, b], ["x", "y"], d)} = 0 \\\\ ${texLin([b, c], ["x", "y"], e)} = 0\\end{cases}$`, `$x_0 = ${x0},\\ y_0 = ${y0}$`],
      };
    },
  },
  {
    id: "delta", topic: "umumiy-chiziq", title: "δ invariant va chiziq turi", quick: true,
    gen(rng) {
      const a = rng.int(-4, 5), b = rng.int(-3, 3), c = rng.int(-4, 5);
      const v = a * c - b * b;
      return {
        q: `$${texLin([a, 2 * b, c, rng.int(-6, 6), rng.int(-6, 6)], ["x^2", "xy", "y^2", "x", "y"], rng.int(-9, 9))} = 0$ chiziq uchun $\\delta = \\begin{vmatrix} a_{11} & a_{12} \\\\ a_{12} & a_{22}\\end{vmatrix}$ ni hisoblang.`,
        answer: num(v),
        hints: ["$a_{12}$ — $xy$ oldidagi koeffitsiyentning yarmi.", "$\\delta > 0$ — elliptik, $\\delta < 0$ — giperbolik, $\\delta = 0$ — parabolik (nomarkaziy) tur."],
        solution: [`$\\delta = ${par(a)}\\cdot${par(c)} - ${par(b)}^2 = ${v}$ — ${v > 0 ? "elliptik" : v < 0 ? "giperbolik" : "parabolik"} tur.`],
      };
    },
  },
  {
    id: "lineconic", topic: "chiziq-kesish", title: "To'g'ri chiziq va aylananing kesishish nuqtalari",
    gen(rng) {
      const R = rng.pick([5, 10, 13]);
      const base = { 5: [[3, 4], [4, 3], [5, 0], [0, 5]], 10: [[6, 8], [8, 6], [10, 0], [0, 10]], 13: [[5, 12], [12, 5], [13, 0], [0, 13]] }[R];
      const pts = base.flatMap(([x, y]) => [[x, y], [-x, y], [x, -y], [-x, -y]]).filter((p, i, arr) => arr.findIndex((q) => q[0] === p[0] && q[1] === p[1]) === i);
      let p1, p2;
      do { [p1, p2] = rng.shuffle(pts).slice(0, 2); } while (p1[0] === p2[0] && p1[1] === p2[1]);
      if (p1[0] > p2[0] || (p1[0] === p2[0] && p1[1] > p2[1])) [p1, p2] = [p2, p1];
      let A = p2[1] - p1[1], B = -(p2[0] - p1[0]), C = -(A * p1[0] + B * p1[1]);
      const g = [A, B, C].reduce((s, x) => { let a = Math.abs(s), b = Math.abs(x); while (b) [a, b] = [b, a % b]; return a; }, 0) || 1;
      A /= g; B /= g; C /= g;
      if (A < 0 || (A === 0 && B < 0)) { A = -A; B = -B; C = -C; }
      return {
        q: `$x^2 + y^2 = ${R * R}$ aylana va $${texLin([A, B], ["x", "y"], C)} = 0$ to'g'ri chiziqning kesishish nuqtalarini toping ($x_1 \\le x_2$; teng bo'lsa $y_1 < y_2$).`,
        answer: vec([...p1, ...p2], ["x₁", "y₁", "x₂", "y₂"]),
        hints: ["To'g'ri chiziqdan bir o'zgaruvchini ifodalab, aylana tenglamasiga qo'ying.", "Hosil bo'lgan kvadrat tenglama diskriminanti: $D > 0$ — 2 nuqta, $D = 0$ — urinadi, $D < 0$ — kesishmaydi."],
        solution: [`Kvadrat tenglamani yechib: $(${p1.join(";\\ ")})$ va $(${p2.join(";\\ ")})$`, `Tekshirish: $${p1[0] * p1[0]} + ${p1[1] * p1[1]} = ${R * R}$ ✓`],
      };
    },
  },
  {
    id: "central-canon", topic: "markaziy", title: "Markaziy chiziqni kanonik ko'rinishga keltirish",
    gen(rng) {
      const [p, q] = rng.pick([[3, 2], [6, 4], [5, 6], [15, 4], [9, 6], [8, 3]]);
      const h = Math.round(Math.sqrt(p * p + 4 * q * q));
      const c = rng.int(-3, 3), a = c + p, b = q * rng.sign();
      const l1 = (a + c - h) / 2, l2 = (a + c + h) / 2;
      const x0 = rng.int(-2, 2), y0 = rng.int(-2, 2), cc = rng.nz(-12, 12);
      const d = -(a * x0 + b * y0), e = -(b * x0 + c * y0), f = cc - (d * x0 + e * y0);
      return {
        q: `$${texLin([a, 2 * b, c, 2 * d, 2 * e], ["x^2", "xy", "y^2", "x", "y"], f)} = 0$ chiziqni kanonik ko'rinishga keltiring: $\\lambda_1x'^2 + \\lambda_2y'^2 + c' = 0$ ($\\lambda_1 < \\lambda_2$). $\\lambda_1, \\lambda_2, c'$ ni toping.`,
        answer: vec([l1, l2, cc], ["λ₁", "λ₂", "c'"]),
        hints: ["1) Markazni toping (markaz sistemasi). 2) Ko'chirishdan keyin ozod had: $c' = a_{13}x_0 + a_{23}y_0 + a_{33}$.", `3) Burish: $\\lambda_{1,2}$ — $${M([[a, b], [b, c]])}$ ning xos sonlari.`],
        solution: [`Markaz: $(${x0};\\ ${y0})$, $\\ c' = ${par(d)}\\cdot${par(x0)} + ${par(e)}\\cdot${par(y0)} + ${par(f)} = ${cc}$`, `$\\lambda^2 - ${par(a + c)}\\lambda + ${par(a * c - b * b)} = 0 \\Rightarrow \\lambda_1 = ${l1},\\ \\lambda_2 = ${l2}$`, `Kanonik: $${texLin([l1, l2], ["x'^2", "y'^2"], cc)} = 0$`],
      };
    },
  },
  {
    id: "parab-vertex", topic: "nomarkaziy", title: "Parabolaning uchi va parametri",
    gen(rng) {
      const x0 = rng.int(-4, 4), y0 = rng.int(-4, 4), p = rng.nz(-4, 4);
      return {
        q: `$${texLin([1, -2 * y0, -2 * p], ["y^2", "y", "x"], y0 * y0 + 2 * p * x0)} = 0$ parabolani $(y - y_0)^2 = 2p(x - x_0)$ ko'rinishga keltiring. $x_0, y_0, p$ ni toping.`,
        answer: vec([x0, y0, p], ["x₀", "y₀", "p"]),
        hints: ["$y$ bo'yicha to'liq kvadrat ajrating, qolganini o'ng tomonga o'tkazing.", "$\\delta = 0$ — chiziq nomarkaziy (parabolik tur)."],
        solution: [`$(y ${y0 > 0 ? "-" : "+"} ${Math.abs(y0)})^2 = ${2 * p}x ${-2 * p * x0 >= 0 ? "+" : "-"} ${Math.abs(2 * p * x0)} = ${2 * p}(x ${x0 > 0 ? "-" : "+"} ${Math.abs(x0)})$`.replace(/[+-] 0\)/g, ")").replace(/ [+-] 0 =/, " ="), `Uchi $(${x0};\\ ${y0})$, $p = ${p}$`],
      };
    },
  },
  {
    id: "hyp-axes", topic: "sirt", title: "Bir pallali giperboloid yarim o'qlari",
    gen(rng) {
      const [a, b, c] = rng.shuffle([1, 2, 3, 4, 5, 6]).slice(0, 3);
      const L = a * a * b * b * c * c;
      return {
        q: `$${texLin([L / (a * a), L / (b * b), -L / (c * c)], ["x^2", "y^2", "z^2"])} = ${L}$ sirtining turi va yarim o'qlari $a, b, c$ ni toping.`,
        answer: vec([a, b, c], ["a", "b", "c"]),
        hints: [`Ikkala tomonni $${L}$ ga bo'ling.`, "Bitta minus ishora va o'ng tomon $1$ — bir pallali giperboloid."],
        solution: [`$\\dfrac{x^2}{${a * a}} + \\dfrac{y^2}{${b * b}} - \\dfrac{z^2}{${c * c}} = 1$ — bir pallali giperboloid`, `$a = ${a},\\ b = ${b},\\ c = ${c}$`],
      };
    },
  },
  {
    id: "gen-line", topic: "yasovchi", title: "Giperboloidning to'g'ri chiziqli yasovchisi",
    gen(rng) {
      const [a, b, c] = rng.shuffle([1, 2, 3, 4, 5]).slice(0, 3);
      return {
        q: `$\\dfrac{x^2}{${a * a}} + \\dfrac{y^2}{${b * b}} - \\dfrac{z^2}{${c * c}} = 1$ giperboloidning $M(${a};\\ 0;\\ 0)$ nuqtasidan o'tuvchi to'g'ri chiziqli yasovchisining yo'naltiruvchi vektorini toping ($y$-komponentasi $${b}$, $z$-komponentasi musbat).`,
        answer: vec([0, b, c], ["l", "m", "n"]),
        hints: ["Yasovchi: $x = " + a + " + lt$, $y = mt$, $z = nt$. Tenglamaga qo'yib, $t$ ning har bir darajasi oldidagi koeffitsiyentni nolga tenglang.", "$t$ oldidagi had: $\\frac{2l}{" + a + "} = 0 \\Rightarrow l = 0$; $t^2$: $\\frac{m^2}{" + b * b + "} - \\frac{n^2}{" + c * c + "} = 0$."],
        solution: [`$l = 0$, $\\dfrac{m^2}{${b * b}} = \\dfrac{n^2}{${c * c}}$, $m = ${b} \\Rightarrow n = ${c}$`, `$\\vec s = (0;\\ ${b};\\ ${c})$ (ikkinchi yasovchi: $(0;\\ ${b};\\ -${c})$)`],
      };
    },
  },
  {
    id: "quadric-center", topic: "umumiy-sirt", title: "Ikkinchi tartibli sirt markazi",
    gen(rng) {
      const k = [rng.nz(-4, 4), rng.nz(-4, 4), rng.nz(-4, 4)], c = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)];
      const lin = k.map((x, i) => -2 * x * c[i]), G = k.reduce((s, x, i) => s + x * c[i] * c[i], 0) - rng.int(-9, 9);
      return {
        q: `$${texLin([...k, ...lin], ["x^2", "y^2", "z^2", "x", "y", "z"], G)} = 0$ sirtning markazini toping.`,
        answer: vec(c, ["x₀", "y₀", "z₀"]),
        hints: ["Har bir o'zgaruvchi bo'yicha to'liq kvadrat ajrating: $ax^2 + 2bx = a\\left(x + \\frac ba\\right)^2 - \\frac{b^2}{a}$.", "Markaz — $\\partial F/\\partial x = \\partial F/\\partial y = \\partial F/\\partial z = 0$ nuqta."],
        solution: [`$${k.map((x, i) => `${i ? (x < 0 ? " - " : " + ") : x < 0 ? "-" : ""}${Math.abs(x) === 1 ? "" : Math.abs(x)}(${"xyz"[i]} ${c[i] > 0 ? "-" : "+"} ${Math.abs(c[i])})^2`).join("")} = \\text{const}$`.replace(/ [+-] 0\)/g, ")"), `Markaz $${texVec(c)}$`],
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
