// Aniq hisoblash: kasrlar, matritsalar, Gauss usuli (qadamlari bilan), tasodifiy sonlar.

export function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

export class Fr {
  constructor(n, d = 1) {
    if (d === 0) throw new Error("Nolga bo'lish");
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d);
    this.n = n / g || 0;
    this.d = d / g;
  }
  static of(x) {
    if (x instanceof Fr) return x;
    if (Number.isInteger(x)) return new Fr(x, 1);
    let d = 1;
    while (!Number.isInteger(Math.round(x * d * 1e9) / 1e9) && d < 1e9) d *= 10;
    return new Fr(Math.round(x * d), d);
  }
  add(o) { o = Fr.of(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Fr.of(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Fr.of(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = Fr.of(o); return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  abs() { return new Fr(Math.abs(this.n), this.d); }
  isZero() { return this.n === 0; }
  eq(o) { o = Fr.of(o); return this.n === o.n && this.d === o.d; }
  valueOf() { return this.n / this.d; }
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
  tex() {
    if (this.d === 1) return String(this.n);
    return (this.n < 0 ? "-" : "") + `\\frac{${Math.abs(this.n)}}{${this.d}}`;
  }
}

export const F = (n, d = 1) => new Fr(n, d);

/** "3/4", "-2", "0.75", "0,75", "−1/2" ni kasrga aylantiradi; xato bo'lsa null. */
export function parseNum(str) {
  if (str == null) return null;
  let s = String(str).trim().replace(/\s+/g, "").replace(/−/g, "-").replace(",", ".");
  if (!s) return null;
  let m = s.match(/^([+-]?\d+)\/([+-]?\d+)$/);
  if (m) { const d = +m[2]; return d === 0 ? null : new Fr(+m[1], d); }
  if (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return Fr.of(parseFloat(s));
  return null;
}

/** Foydalanuvchi javobini to'g'risi bilan solishtirish (o'nli kasrga kichik tolerantlik). */
export function sameNum(user, truth) {
  if (!user) return false;
  if (user.eq(truth)) return true;
  return Math.abs(+user - +truth) < 0.006;
}

// ---------- Matritsalar ----------
export const toFr = (M) => M.map((r) => r.map((x) => Fr.of(x)));
export const clone = (M) => M.map((r) => r.slice());
export const transpose = (M) => M[0].map((_, j) => M.map((r) => r[j]));
export const madd = (A, B) => A.map((r, i) => r.map((x, j) => Fr.of(x).add(B[i][j])));
export const mscale = (A, k) => A.map((r) => r.map((x) => Fr.of(x).mul(k)));
export function mmul(A, B) {
  return A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s.add(Fr.of(x).mul(B[k][j])), F(0))));
}
export const identity = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => F(i === j ? 1 : 0)));

export function texMat(M, opts = {}) {
  const { aug = 0, br = "p" } = opts;
  const cols = M[0].length;
  const body = M.map((r) => r.map((x) => (x instanceof Fr ? x.tex() : String(x))).join(" & ")).join(" \\\\ ");
  if (aug) {
    const spec = "c".repeat(cols - aug) + "|" + "c".repeat(aug);
    return `\\left(\\begin{array}{${spec}} ${body} \\end{array}\\right)`;
  }
  return `\\begin{${br}matrix} ${body} \\end{${br}matrix}`;
}

export const texVec = (v) => `(${v.map((x) => (x instanceof Fr ? x.tex() : x)).join(";\\ ")})`;

/** Koeffitsiyentni chiziqli ifodada chiroyli yozish: 1x -> x, -1y -> -y, +0 tashlanadi. */
export function texLin(coefs, vars, constTerm = null) {
  let out = "";
  coefs.forEach((c, i) => {
    c = Fr.of(c);
    if (c.isZero()) return;
    const neg = c.n < 0;
    const a = c.abs();
    const coef = a.eq(1) ? "" : a.tex();
    out += out ? (neg ? " - " : " + ") : neg ? "-" : "";
    out += coef + vars[i];
  });
  if (constTerm != null) {
    const c = Fr.of(constTerm);
    if (!c.isZero()) out += out ? (c.n < 0 ? " - " : " + ") + c.abs().tex() : c.tex();
  }
  return out || "0";
}

const rowName = (i) => `R_{${i + 1}}`;

/**
 * Gauss–Jordan qadamlari. aug — o'ng tomondagi kengaytirilgan ustunlar soni.
 * Qaytaradi: { steps: [{ op, M }], R (rref), rank, pivots, swaps, det (kvadrat bo'lsa) }
 */
export function rrefSteps(M0, aug = 0, opts = {}) {
  const { jordan = true } = opts;
  const M = toFr(M0).map((r) => r.slice());
  const rows = M.length, cols = M[0].length - aug;
  const steps = [];
  let r = 0, swaps = 0;
  let detProd = F(1);
  const pivots = [];
  const snap = (op) => steps.push({ op, M: clone(M) });

  for (let c = 0; c < cols && r < rows; c++) {
    let p = -1;
    for (let i = r; i < rows; i++) if (!M[i][c].isZero()) { p = i; break; }
    if (p < 0) continue;
    if (p !== r) {
      [M[p], M[r]] = [M[r], M[p]];
      swaps++;
      snap(`${rowName(r)} \\leftrightarrow ${rowName(p)}`);
    }
    const pv = M[r][c];
    detProd = detProd.mul(pv);
    if (jordan && !pv.eq(1)) {
      M[r] = M[r].map((x) => x.div(pv));
      snap(`${rowName(r)} \\to ${F(1).div(pv).tex()}\\cdot ${rowName(r)}`);
    }
    const ops = [];
    for (let i = 0; i < rows; i++) {
      if (i === r || M[i][c].isZero()) continue;
      if (!jordan && i < r) continue;
      const k = M[i][c].div(M[r][c]);
      M[i] = M[i].map((x, j) => x.sub(k.mul(M[r][j])));
      const sign = k.n > 0 ? "-" : "+";
      const kk = k.abs().eq(1) ? "" : k.abs().tex() + "\\cdot ";
      ops.push(`${rowName(i)} \\to ${rowName(i)} ${sign} ${kk}${rowName(r)}`);
    }
    if (ops.length) snap(ops.join(",\\quad "));
    pivots.push(c);
    r++;
  }
  const out = { steps, R: M, rank: r, pivots, swaps };
  if (rows === cols && aug === 0) out.det = r < rows ? F(0) : detProd.mul(swaps % 2 ? -1 : 1);
  return out;
}

export function det(M) {
  const n = M.length;
  if (n === 1) return Fr.of(M[0][0]);
  if (n === 2) return Fr.of(M[0][0]).mul(M[1][1]).sub(Fr.of(M[0][1]).mul(M[1][0]));
  return rrefSteps(M, 0, { jordan: false }).det;
}

export function inverse(M) {
  const n = M.length;
  const A = toFr(M).map((r, i) => [...r, ...identity(n)[i]]);
  const res = rrefSteps(A, n);
  for (let i = 0; i < n; i++) if (!res.R[i][i].eq(1)) return { inv: null, steps: res.steps };
  return { inv: res.R.map((r) => r.slice(n)), steps: res.steps };
}

export const rank = (M) => rrefSteps(M).rank;

export function minor(M, i, j) {
  return M.filter((_, r) => r !== i).map((row) => row.filter((_, c) => c !== j));
}

// ---------- Tasodifiy sonlar (urug'li — variantlar takrorlanishi uchun) ----------
export function hashStr(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export function makeRng(seed = Date.now() ^ (Math.random() * 1e9)) {
  let a = seed >>> 0;
  const next = () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const rng = {
    next,
    int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
    nz: (lo, hi) => { let x; do x = rng.int(lo, hi); while (x === 0); return x; },
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    sign: () => (next() < 0.5 ? -1 : 1),
    shuffle: (arr) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      return a;
    },
    mat: (r, c, lo, hi) => Array.from({ length: r }, () => Array.from({ length: c }, () => rng.int(lo, hi))),
  };
  return rng;
}
