// Interaktiv laboratoriya: chiziqli almashtirish, vektorlar, egri chiziqlar, 3D vektorlar,
// Gauss usuli, matritsaviy usul va Kramer, determinant, rang va matritsa kalkulyatori (qadamma-qadam).

import { $, $$, esc, mathText, texHtml } from "../ui.js";
import { F, Fr, parseNum, rrefSteps, texMat, det, inverse, mmul, madd, mscale, transpose, toFr, texLin, minor } from "../math.js";
import { addXP } from "../store.js";

const TABS = [
  ["almashtirish", "🌀 Chiziqli almashtirish"],
  ["vektorlar", "➡️ Vektorlar (2D)"],
  ["fazo", "🧊 3D vektorlar"],
  ["egri", "⭕ Egri chiziqlar"],
  ["gauss", "🧮 Gauss usuli"],
  ["matritsaviy", "📐 Matritsaviy usul va Kramer"],
  ["determinant", "|A| Determinant hisoblash"],
  ["rang", "📶 Matritsa rangi"],
  ["kalkulyator", "▦ Matritsa kalkulyatori"],
];

let visited = new Set();

export function render(el, params) {
  const tab = TABS.some((t) => t[0] === params[0]) ? params[0] : "almashtirish";
  el.innerHTML = `
    <div class="page-head"><h1>🔬 Laboratoriya</h1>
      <p>Formulalarni ko'z bilan ko'ring. Nuqtalarni sichqoncha yoki barmoq bilan suring, qiymatlarni o'zgartiring va natijani kuzating.</p></div>
    <div class="tabs">${TABS.map(([id, name]) => `<a class="tab ${id === tab ? "active" : ""}" href="#/lab/${id}">${name}</a>`).join("")}</div>
    <div id="lab-body"></div>`;
  if (!visited.has(tab)) { visited.add(tab); addXP(5, "laboratoriya"); }
  const body = $("#lab-body", el);
  return { almashtirish: labTransform, vektorlar: labVectors, fazo: lab3D, egri: labConics, gauss: labGauss, matritsaviy: labMatrix, determinant: labDet, rang: labRank, kalkulyator: labCalc }[tab](body);
}

// ================= Kanvas yordamchilari =================
const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const COL = { i: "#22c55e", j: "#ef4444", a: "#6366f1", b: "#f59e0b", c: "#ec4899", eig: "#0ea5e9" };

function makeView(canvas, range, draw) {
  const v = { canvas, ctx: canvas.getContext("2d"), range, W: 1, H: 1, s: 1, dpr: 1 };
  v.X = (x) => v.W / 2 + x * v.s;
  v.Y = (y) => v.H / 2 - y * v.s;
  v.inv = (px, py) => [(px - v.W / 2) / v.s, (v.H / 2 - py) / v.s];
  v.resize = () => {
    const r = canvas.getBoundingClientRect();
    v.dpr = window.devicePixelRatio || 1;
    v.W = Math.max(1, r.width); v.H = Math.max(1, r.height);
    canvas.width = v.W * v.dpr; canvas.height = v.H * v.dpr;
    v.s = Math.min(v.W, v.H) / (2 * v.range);
    v.redraw();
  };
  v.redraw = () => {
    const c = v.ctx;
    c.setTransform(v.dpr, 0, 0, v.dpr, 0, 0);
    c.clearRect(0, 0, v.W, v.H);
    draw(v);
  };
  const ro = new ResizeObserver(() => v.resize());
  ro.observe(canvas);
  const onTheme = () => v.redraw();
  window.addEventListener("themechange", onTheme);
  v.destroy = () => { ro.disconnect(); window.removeEventListener("themechange", onTheme); };
  return v;
}

function drawGrid(v, { light = false } = {}) {
  const c = v.ctx, R = Math.ceil(v.range * Math.max(v.W, v.H) / Math.min(v.W, v.H)) + 1;
  c.lineWidth = 1;
  c.strokeStyle = css("--grid");
  c.globalAlpha = light ? 0.6 : 1;
  for (let k = -R; k <= R; k++) {
    c.beginPath(); c.moveTo(v.X(k), 0); c.lineTo(v.X(k), v.H); c.stroke();
    c.beginPath(); c.moveTo(0, v.Y(k)); c.lineTo(v.W, v.Y(k)); c.stroke();
  }
  c.globalAlpha = 1;
  c.strokeStyle = css("--axis"); c.lineWidth = 1.5;
  c.beginPath(); c.moveTo(0, v.Y(0)); c.lineTo(v.W, v.Y(0)); c.moveTo(v.X(0), 0); c.lineTo(v.X(0), v.H); c.stroke();
  c.fillStyle = css("--muted"); c.font = "11px Inter";
  for (let k = -R; k <= R; k++) if (k && Math.abs(k) <= v.range) { c.fillText(k, v.X(k) + 2, v.Y(0) + 12); c.fillText(k, v.X(0) + 4, v.Y(k) - 2); }
}

function arrow(v, x0, y0, x1, y1, color, width = 3, label = "") {
  const c = v.ctx;
  const X0 = v.X(x0), Y0 = v.Y(y0), X1 = v.X(x1), Y1 = v.Y(y1);
  const ang = Math.atan2(Y1 - Y0, X1 - X0), len = Math.hypot(X1 - X0, Y1 - Y0);
  c.strokeStyle = c.fillStyle = color; c.lineWidth = width; c.lineCap = "round";
  if (len > 1) {
    const h = Math.min(14, len * 0.4);
    c.beginPath(); c.moveTo(X0, Y0); c.lineTo(X1 - Math.cos(ang) * h * 0.7, Y1 - Math.sin(ang) * h * 0.7); c.stroke();
    c.beginPath(); c.moveTo(X1, Y1);
    c.lineTo(X1 - h * Math.cos(ang - 0.4), Y1 - h * Math.sin(ang - 0.4));
    c.lineTo(X1 - h * Math.cos(ang + 0.4), Y1 - h * Math.sin(ang + 0.4));
    c.closePath(); c.fill();
  }
  if (label) { c.font = "bold 15px Inter"; c.fillText(label, X1 + 8, Y1 - 8); }
}

function handle(v, x, y, color) {
  const c = v.ctx;
  c.beginPath(); c.arc(v.X(x), v.Y(y), 7, 0, Math.PI * 2);
  c.fillStyle = css("--card"); c.fill(); c.lineWidth = 3; c.strokeStyle = color; c.stroke();
}

/** Sudrab olinadigan nuqtalar. getPts() -> [{x,y}], onMove(i, x, y) */
function draggable(v, getPts, onMove) {
  let active = -1;
  const pos = (e) => { const r = v.canvas.getBoundingClientRect(); return v.inv(e.clientX - r.left, e.clientY - r.top); };
  v.canvas.addEventListener("pointerdown", (e) => {
    const [x, y] = pos(e);
    let best = -1, bd = 22 / v.s;
    getPts().forEach((p, i) => { const d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; best = i; } });
    if (best >= 0) { active = best; v.canvas.setPointerCapture(e.pointerId); e.preventDefault(); }
  });
  v.canvas.addEventListener("pointermove", (e) => {
    const [x, y] = pos(e);
    if (active >= 0) onMove(active, x, y);
    else v.canvas.style.cursor = getPts().some((p) => Math.hypot(p.x - x, p.y - y) < 22 / v.s) ? "grab" : "default";
  });
  const up = () => (active = -1);
  v.canvas.addEventListener("pointerup", up);
  v.canvas.addEventListener("pointercancel", up);
}

const r1 = (x) => Math.round(x * 10) / 10;
const fmt = (x, d = 2) => (Math.abs(x) < 1e-9 ? "0" : String(+x.toFixed(d)));

// ================= 1. Chiziqli almashtirish =================
function labTransform(body) {
  const st = { a: 1, b: 1, c: 0, d: 1, t: 1, grid: true, eig: true, circle: false, vec: true, vx: 2, vy: 1, anim: null };
  body.innerHTML = `
    <div class="lab">
      <canvas id="cv"></canvas>
      <div class="lab-panel">
        <div class="card">
          <h3>Matritsa ${mathText("$A$")}</h3>
          <div class="row"><div class="mat-edit" style="--cols:2">
            <input id="ma" type="number" step="0.1"><input id="mb" type="number" step="0.1">
            <input id="mc" type="number" step="0.1"><input id="md" type="number" step="0.1">
          </div></div>
          <p class="small muted mt" style="margin-bottom:0"><span class="legend-dot" style="background:${COL.i}"></span>${mathText("$\\hat\\imath$")} va <span class="legend-dot" style="background:${COL.j}"></span>${mathText("$\\hat\\jmath$")} uchlarini suring — ular ${mathText("$A$")} ning ustunlari!</p>
        </div>
        <div class="card">
          <div class="row"><button class="btn primary sm" id="play">▶ Animatsiya</button><span class="small muted">t</span><input type="range" id="t" min="0" max="1" step="0.01" style="flex:1"></div>
          <div class="row mt small">
            <label><input type="checkbox" id="c-eig"> Xos vektorlar</label>
            <label><input type="checkbox" id="c-circle"> Birlik aylana</label>
            <label><input type="checkbox" id="c-vec"> ${mathText("$\\vec v$")} vektor</label>
          </div>
        </div>
        <div class="card"><h3>Tayyor misollar</h3><div class="row" id="presets"></div></div>
        <div class="card" id="info"></div>
      </div>
    </div>`;

  const PRESETS = [
    ["Birlik", [1, 0, 0, 1]], ["Burish 90°", [0, -1, 1, 0]], ["Burish 30°", [0.87, -0.5, 0.5, 0.87]], ["Siljish", [1, 1, 0, 1]],
    ["Cho'zish", [2, 0, 0, 0.5]], ["Simmetriya Ox", [1, 0, 0, -1]], ["Proyeksiya", [1, 0, 0, 0]], ["Xos (4,1;2,3)", [4, 1, 2, 3]], ["det<0", [1, 2, 2, 1]],
  ];
  $("#presets", body).innerHTML = PRESETS.map(([n], i) => `<button class="btn sm" data-p="${i}">${n}</button>`).join("");
  const ins = { a: $("#ma", body), b: $("#mb", body), c: $("#mc", body), d: $("#md", body) };

  const M = () => { const t = st.t; return [1 - t + t * st.a, t * st.b, t * st.c, 1 - t + t * st.d]; };
  const ap = (m, x, y) => [m[0] * x + m[1] * y, m[2] * x + m[3] * y];

  const v = makeView($("#cv", body), 5, (v) => {
    const c = v.ctx, m = M();
    drawGrid(v, { light: true });
    // o'zgargan to'r
    if (st.grid) {
      c.strokeStyle = COL.a; c.globalAlpha = 0.35; c.lineWidth = 1.2;
      const N = 14;
      for (let k = -N; k <= N; k++) {
        let [x0, y0] = ap(m, k, -N), [x1, y1] = ap(m, k, N);
        c.beginPath(); c.moveTo(v.X(x0), v.Y(y0)); c.lineTo(v.X(x1), v.Y(y1)); c.stroke();
        [x0, y0] = ap(m, -N, k); [x1, y1] = ap(m, N, k);
        c.beginPath(); c.moveTo(v.X(x0), v.Y(y0)); c.lineTo(v.X(x1), v.Y(y1)); c.stroke();
      }
      c.globalAlpha = 1;
    }
    // birlik kvadrat -> parallelogramm
    const D = m[0] * m[3] - m[1] * m[2];
    const pts = [[0, 0], [1, 0], [1, 1], [0, 1]].map(([x, y]) => ap(m, x, y));
    c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(v.X(x), v.Y(y)) : c.moveTo(v.X(x), v.Y(y)))); c.closePath();
    c.fillStyle = D >= 0 ? "rgba(245,158,11,.30)" : "rgba(236,72,153,.30)"; c.fill();
    const cx = (pts[0][0] + pts[2][0]) / 2, cy = (pts[0][1] + pts[2][1]) / 2;
    c.fillStyle = css("--text"); c.font = "bold 13px Inter"; c.fillText(`det = ${fmt(D)}`, v.X(cx) - 26, v.Y(cy) + 4);
    if (st.circle) {
      c.strokeStyle = COL.c; c.lineWidth = 2.5; c.beginPath();
      for (let k = 0; k <= 100; k++) { const th = (k / 100) * Math.PI * 2; const [x, y] = ap(m, Math.cos(th), Math.sin(th)); k ? c.lineTo(v.X(x), v.Y(y)) : c.moveTo(v.X(x), v.Y(y)); }
      c.stroke();
    }
    // xos vektorlar
    if (st.eig && st.t === 1) {
      for (const e of eigen(st.a, st.b, st.c, st.d)) {
        const L = 20, n = Math.hypot(e.x, e.y);
        c.strokeStyle = COL.eig; c.lineWidth = 2; c.setLineDash([6, 6]);
        c.beginPath(); c.moveTo(v.X((-e.x / n) * L), v.Y((-e.y / n) * L)); c.lineTo(v.X((e.x / n) * L), v.Y((e.y / n) * L)); c.stroke();
        c.setLineDash([]);
      }
    }
    if (st.vec) {
      const [wx, wy] = ap(m, st.vx, st.vy);
      arrow(v, 0, 0, st.vx, st.vy, css("--muted"), 2, "");
      arrow(v, 0, 0, wx, wy, COL.c, 3, "Av");
    }
    const [ix, iy] = ap(m, 1, 0), [jx, jy] = ap(m, 0, 1);
    arrow(v, 0, 0, ix, iy, COL.i, 4, "î");
    arrow(v, 0, 0, jx, jy, COL.j, 4, "ĵ");
    if (st.t === 1) { handle(v, ix, iy, COL.i); handle(v, jx, jy, COL.j); if (st.vec) handle(v, st.vx, st.vy, css("--muted")); }
  });

  draggable(v, () => (st.t === 1 ? [{ x: st.a, y: st.c }, { x: st.b, y: st.d }, ...(st.vec ? [{ x: st.vx, y: st.vy }] : [])] : []), (i, x, y) => {
    if (i === 0) { st.a = r1(x); st.c = r1(y); }
    else if (i === 1) { st.b = r1(x); st.d = r1(y); }
    else { st.vx = r1(x); st.vy = r1(y); }
    sync();
  });

  function sync() {
    for (const k of "abcd") if (document.activeElement !== ins[k]) ins[k].value = st[k];
    $("#t", body).value = st.t;
    $("#c-eig", body).checked = st.eig; $("#c-circle", body).checked = st.circle; $("#c-vec", body).checked = st.vec;
    const D = st.a * st.d - st.b * st.c, tr = st.a + st.d;
    const eig = eigenVals(st.a, st.b, st.c, st.d);
    const T = (s) => mathText("$" + s + "$");
    $("#info", body).innerHTML = `<h3>Ko'rsatkichlar</h3><div class="kv">
      <span>${T("\\det A")}</span><b>${fmt(D)}</b>
      <span>${T("\\operatorname{tr} A")}</span><b>${fmt(tr)}</b>
      <span>${T("\\lambda_{1,2}")}</span><b>${eig}</b>
      <span>${T("A\\vec v")}</span><b>(${fmt(st.a * st.vx + st.b * st.vy)}; ${fmt(st.c * st.vx + st.d * st.vy)})</b></div>
      <p class="small muted mt" style="margin:8px 0 0">${Math.abs(D) < 1e-9 ? "⚠️ det = 0: tekislik to'g'ri chiziqqa yoki nuqtaga «yassilandi» — teskari almashtirish yo'q." : D < 0 ? "↺ det < 0: orientatsiya teskari (tekislik «ag'darildi»)." : `Har qanday shakl yuzi ${fmt(D)} marta o'zgaradi.`}</p>`;
    v.redraw();
  }

  for (const k of "abcd") ins[k].addEventListener("input", () => { const x = parseFloat(ins[k].value); if (!isNaN(x)) { st[k] = x; st.t = 1; sync(); } });
  $("#t", body).addEventListener("input", (e) => { st.t = +e.target.value; sync(); });
  $("#c-eig", body).addEventListener("change", (e) => { st.eig = e.target.checked; sync(); });
  $("#c-circle", body).addEventListener("change", (e) => { st.circle = e.target.checked; sync(); });
  $("#c-vec", body).addEventListener("change", (e) => { st.vec = e.target.checked; sync(); });
  $("#presets", body).addEventListener("click", (e) => {
    const b = e.target.closest("[data-p]"); if (!b) return;
    [st.a, st.b, st.c, st.d] = PRESETS[+b.dataset.p][1];
    play();
  });
  function play() {
    cancelAnimationFrame(st.anim);
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 1400);
      st.t = p < 1 ? Math.round((p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2) * 100) / 100 : 1;
      sync();
      if (p < 1) st.anim = requestAnimationFrame(step);
    };
    st.anim = requestAnimationFrame(step);
  }
  $("#play", body).addEventListener("click", play);
  sync();
  return () => { cancelAnimationFrame(st.anim); v.destroy(); };
}

function eigenVals(a, b, c, d) {
  const tr = a + d, D = a * d - b * c, disc = tr * tr - 4 * D;
  if (disc < -1e-9) return `${fmt(tr / 2)} ± ${fmt(Math.sqrt(-disc) / 2)}i (kompleks)`;
  const s = Math.sqrt(Math.max(0, disc));
  return `${fmt((tr - s) / 2)}; ${fmt((tr + s) / 2)}`;
}
function eigen(a, b, c, d) {
  const tr = a + d, D = a * d - b * c, disc = tr * tr - 4 * D;
  if (disc < -1e-9) return [];
  const s = Math.sqrt(Math.max(0, disc));
  const out = [];
  for (const l of s < 1e-9 ? [tr / 2] : [(tr - s) / 2, (tr + s) / 2]) {
    if (Math.abs(b) > 1e-9) out.push({ x: b, y: l - a });
    else if (Math.abs(c) > 1e-9) out.push({ x: l - d, y: c });
    else { out.push({ x: 1, y: 0 }, { x: 0, y: 1 }); break; }
  }
  return out;
}

// ================= 2. Vektorlar (2D) =================
function labVectors(body) {
  const st = { ax: 3, ay: 1, bx: 1, by: 3, snap: true, sum: true, diff: false, proj: true };
  body.innerHTML = `
    <div class="lab">
      <canvas id="cv"></canvas>
      <div class="lab-panel">
        <div class="card small">
          <p style="margin-top:0">Vektorlar uchlarini suring.</p>
          <div class="row">
            <label><input type="checkbox" id="snap" checked> Butun sonlarga</label>
            <label><input type="checkbox" id="sum" checked> a + b</label>
            <label><input type="checkbox" id="diff"> a − b</label>
            <label><input type="checkbox" id="proj" checked> Proyeksiya</label>
          </div>
        </div>
        <div class="card" id="info"></div>
        <div class="card small muted">💡 Topshiriq: $\\vec a\\cdot\\vec b = 0$ bo'ladigan holatni toping. Bunda burchak qancha? Parallelogramm yuzi qachon nolga teng?</div>
      </div>
    </div>`;
  const tip = $(".lab-panel .card.small.muted", body); tip.innerHTML = mathText(tip.textContent);

  const v = makeView($("#cv", body), 6, (v) => {
    const c = v.ctx; drawGrid(v);
    const { ax, ay, bx, by } = st;
    // parallelogramm
    c.beginPath(); c.moveTo(v.X(0), v.Y(0)); c.lineTo(v.X(ax), v.Y(ay)); c.lineTo(v.X(ax + bx), v.Y(ay + by)); c.lineTo(v.X(bx), v.Y(by)); c.closePath();
    c.fillStyle = "rgba(99,102,241,.12)"; c.fill();
    if (st.sum) {
      c.setLineDash([5, 5]); c.strokeStyle = css("--muted"); c.lineWidth = 1.5;
      c.beginPath(); c.moveTo(v.X(ax), v.Y(ay)); c.lineTo(v.X(ax + bx), v.Y(ay + by)); c.lineTo(v.X(bx), v.Y(by)); c.stroke(); c.setLineDash([]);
      arrow(v, 0, 0, ax + bx, ay + by, COL.c, 3, "a+b");
    }
    if (st.diff) arrow(v, bx, by, ax, ay, "#14b8a6", 3, "a−b");
    const bb = bx * bx + by * by;
    if (st.proj && bb > 0) {
      const k = (ax * bx + ay * by) / bb, px = k * bx, py = k * by;
      c.setLineDash([3, 4]); c.strokeStyle = COL.a; c.lineWidth = 1.5;
      c.beginPath(); c.moveTo(v.X(ax), v.Y(ay)); c.lineTo(v.X(px), v.Y(py)); c.stroke(); c.setLineDash([]);
      arrow(v, 0, 0, px, py, COL.eig, 5, "");
    }
    // burchak yoyi
    const a1 = Math.atan2(ay, ax), a2 = Math.atan2(by, bx);
    let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    c.beginPath(); c.strokeStyle = css("--text"); c.lineWidth = 1.5;
    c.arc(v.X(0), v.Y(0), 30, -a1, -a1 - d, d > 0); c.stroke();
    arrow(v, 0, 0, ax, ay, COL.a, 4, "a");
    arrow(v, 0, 0, bx, by, COL.b, 4, "b");
    handle(v, ax, ay, COL.a); handle(v, bx, by, COL.b);
  });
  draggable(v, () => [{ x: st.ax, y: st.ay }, { x: st.bx, y: st.by }], (i, x, y) => {
    const f = st.snap ? Math.round : r1;
    if (i === 0) { st.ax = f(x); st.ay = f(y); } else { st.bx = f(x); st.by = f(y); }
    sync();
  });
  function sync() {
    const { ax, ay, bx, by } = st;
    const dot = ax * bx + ay * by, la = Math.hypot(ax, ay), lb = Math.hypot(bx, by);
    const cos = la && lb ? dot / (la * lb) : NaN, ang = (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
    const cross = ax * by - ay * bx;
    $("#info", body).innerHTML = `<h3>Hisob-kitob</h3><div class="kv">
      <span style="color:${COL.a}">a</span><b>(${fmt(ax)}; ${fmt(ay)})</b>
      <span style="color:${COL.b}">b</span><b>(${fmt(bx)}; ${fmt(by)})</b>
      <span>|a|, |b|</span><b>${fmt(la)}, ${fmt(lb)}</b>
      <span>a · b</span><b>${fmt(ax)}·${fmt(bx)} + ${fmt(ay)}·${fmt(by)} = ${fmt(dot)}</b>
      <span>burchak φ</span><b>${isNaN(ang) ? "—" : fmt(ang, 1) + "°"} ${Math.abs(dot) < 1e-9 && la && lb ? "⟂" : ""}</b>
      <span>cos φ</span><b>${isNaN(cos) ? "—" : fmt(cos, 3)}</b>
      <span>pr<sub>b</sub>a</span><b>${lb ? fmt(dot / lb) : "—"}</b>
      <span>S (paral.)</span><b>|${fmt(cross)}| = ${fmt(Math.abs(cross))}</b></div>`;
    v.redraw();
  }
  for (const k of ["snap", "sum", "diff", "proj"]) $("#" + k, body).addEventListener("change", (e) => { st[k] = e.target.checked; sync(); });
  sync();
  return () => v.destroy();
}

// ================= 3. 3D vektorlar =================
function lab3D(body) {
  const st = { a: [2, 0, 1], b: [0, 2, 1], yaw: -0.6, pitch: 0.45 };
  body.innerHTML = `
    <div class="lab">
      <canvas id="cv"></canvas>
      <div class="lab-panel">
        <div class="card">
          <p class="small muted" style="margin-top:0">Fazoni aylantirish uchun kanvasni suring.</p>
          <div class="stack">
            <div class="row"><b style="color:${COL.a};width:20px">a</b>${[0, 1, 2].map((k) => `<input type="number" step="1" data-v="a" data-k="${k}" style="width:70px">`).join("")}</div>
            <div class="row"><b style="color:${COL.b};width:20px">b</b>${[0, 1, 2].map((k) => `<input type="number" step="1" data-v="b" data-k="${k}" style="width:70px">`).join("")}</div>
          </div>
        </div>
        <div class="card" id="info"></div>
      </div>
    </div>`;
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const v = makeView($("#cv", body), 6, (v) => {
    const c = v.ctx;
    const P = ([x, y, z]) => {
      const cy = Math.cos(st.yaw), sy = Math.sin(st.yaw), cp = Math.cos(st.pitch), sp = Math.sin(st.pitch);
      const x1 = x * cy - y * sy, y1 = x * sy + y * cy;
      return [x1, z * cp - y1 * sp];
    };
    const line = (p, q, color, w = 1, dash) => {
      const [x0, y0] = P(p), [x1, y1] = P(q);
      c.strokeStyle = color; c.lineWidth = w; c.setLineDash(dash || []);
      c.beginPath(); c.moveTo(v.X(x0), v.Y(y0)); c.lineTo(v.X(x1), v.Y(y1)); c.stroke(); c.setLineDash([]);
    };
    // pol to'ri
    for (let k = -5; k <= 5; k++) { line([k, -5, 0], [k, 5, 0], css("--grid")); line([-5, k, 0], [5, k, 0], css("--grid")); }
    [["x", [5.5, 0, 0]], ["y", [0, 5.5, 0]], ["z", [0, 0, 5.5]]].forEach(([n, p]) => {
      line([0, 0, 0], p, css("--axis"), 1.5);
      const [x, y] = P(p); c.fillStyle = css("--muted"); c.font = "bold 14px Inter"; c.fillText(n, v.X(x) + 4, v.Y(y));
    });
    const { a, b } = st, n = cross(a, b);
    const poly = [[0, 0, 0], a, [a[0] + b[0], a[1] + b[1], a[2] + b[2]], b].map(P);
    c.beginPath(); poly.forEach(([x, y], i) => (i ? c.lineTo(v.X(x), v.Y(y)) : c.moveTo(v.X(x), v.Y(y)))); c.closePath();
    c.fillStyle = "rgba(99,102,241,.18)"; c.fill();
    const draw3 = (p, color, label) => { const [x, y] = P(p); arrow(v, 0, 0, x, y, color, 4, label); };
    // proyeksiya chiziqlari
    for (const p of [a, b]) { line(p, [p[0], p[1], 0], css("--muted"), 1, [3, 4]); }
    draw3(a, COL.a, "a"); draw3(b, COL.b, "b");
    const nl = Math.hypot(...n);
    if (nl > 0) draw3(nl > 6 ? n.map((x) => (x / nl) * 6) : n, COL.c, nl > 6 ? "a×b (masshtab)" : "a×b");
  });
  let drag = null;
  v.canvas.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY, yaw: st.yaw, pitch: st.pitch }; v.canvas.setPointerCapture(e.pointerId); });
  v.canvas.addEventListener("pointermove", (e) => {
    if (!drag) return;
    st.yaw = drag.yaw + (e.clientX - drag.x) * 0.01;
    st.pitch = Math.max(-1.4, Math.min(1.4, drag.pitch + (e.clientY - drag.y) * 0.01));
    v.redraw();
  });
  v.canvas.addEventListener("pointerup", () => (drag = null));
  v.canvas.style.cursor = "grab";
  $$("[data-v]", body).forEach((inp) => {
    inp.value = st[inp.dataset.v][+inp.dataset.k];
    inp.addEventListener("input", () => { const x = parseFloat(inp.value); if (!isNaN(x)) { st[inp.dataset.v][+inp.dataset.k] = x; sync(); } });
  });
  function sync() {
    const { a, b } = st, n = cross(a, b);
    const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2], la = Math.hypot(...a), lb = Math.hypot(...b), S = Math.hypot(...n);
    const ang = la && lb ? (Math.acos(Math.max(-1, Math.min(1, dot / (la * lb)))) * 180) / Math.PI : NaN;
    $("#info", body).innerHTML = `<h3>Natijalar</h3><div class="kv">
      <span>a · b</span><b>${fmt(dot)}</b>
      <span style="color:${COL.c}">a × b</span><b>(${n.map((x) => fmt(x)).join("; ")})</b>
      <span>|a × b|</span><b>${fmt(S)} — parallelogramm yuzi</b>
      <span>S△</span><b>${fmt(S / 2)}</b>
      <span>φ</span><b>${isNaN(ang) ? "—" : fmt(ang, 1) + "°"}</b>
      <span>(a×b)·a</span><b>${fmt(n[0] * a[0] + n[1] * a[1] + n[2] * a[2])} ⇒ a×b ⟂ a</b></div>`;
    v.redraw();
  }
  sync();
  return () => v.destroy();
}

// ================= 4. Egri chiziqlar =================
function labConics(body) {
  const st = { type: "ellips", a: 4, b: 2.5, p: 2, R: 3, th: 0.8, play: true, raf: 0 };
  body.innerHTML = `
    <div class="lab">
      <canvas id="cv"></canvas>
      <div class="lab-panel">
        <div class="card">
          <div class="row">${[["ellips", "Ellips"], ["giperbola", "Giperbola"], ["parabola", "Parabola"], ["aylana", "Aylana"]].map(([k, n]) => `<button class="btn sm" data-type="${k}">${n}</button>`).join("")}</div>
          <div id="sliders" class="stack mt"></div>
          <div class="row mt"><button class="btn sm" id="pp">⏸ To'xtatish</button><input type="range" id="th" min="0" max="6.283" step="0.01" style="flex:1"></div>
        </div>
        <div class="card" id="info"></div>
      </div>
    </div>`;
  const slider = (k, label, min, max) => `<label class="field"><span>${label} = <b id="v-${k}">${st[k]}</b></span><input type="range" data-k="${k}" min="${min}" max="${max}" step="0.1" value="${st[k]}"></label>`;
  function buildSliders() {
    $$("[data-type]", body).forEach((b) => b.classList.toggle("primary", b.dataset.type === st.type));
    $("#sliders", body).innerHTML = st.type === "parabola" ? slider("p", "p", 0.5, 6) : st.type === "aylana" ? slider("R", "R", 0.5, 5.5) : slider("a", "a", 0.5, 5.5) + slider("b", "b", 0.5, 5.5);
  }
  const point = () => {
    const { a, b, p, R, th } = st;
    if (st.type === "ellips") return [a * Math.cos(th), b * Math.sin(th)];
    if (st.type === "aylana") return [R * Math.cos(th), R * Math.sin(th)];
    if (st.type === "giperbola") { const t = Math.sin(th) * 1.8, s = Math.cos(th) >= 0 ? 1 : -1; return [s * a * Math.cosh(t), b * Math.sinh(t)]; }
    const t = Math.sin(th) * 5; return [(t * t) / (2 * p), t];
  };
  const v = makeView($("#cv", body), 7, (v) => {
    const c = v.ctx; drawGrid(v);
    const { a, b, p, R } = st;
    const path = (fn, t0, t1, n = 300) => { c.beginPath(); for (let k = 0; k <= n; k++) { const [x, y] = fn(t0 + ((t1 - t0) * k) / n); k ? c.lineTo(v.X(x), v.Y(y)) : c.moveTo(v.X(x), v.Y(y)); } c.stroke(); };
    const vline = (x, color) => { c.strokeStyle = color; c.setLineDash([6, 5]); c.lineWidth = 1.5; c.beginPath(); c.moveTo(v.X(x), 0); c.lineTo(v.X(x), v.H); c.stroke(); c.setLineDash([]); };
    const dot = (x, y, color, label) => { c.fillStyle = color; c.beginPath(); c.arc(v.X(x), v.Y(y), 6, 0, 7); c.fill(); if (label) { c.font = "bold 13px Inter"; c.fillText(label, v.X(x) + 8, v.Y(y) + 16); } };
    let foci = [];
    c.lineWidth = 3; c.strokeStyle = COL.a;
    if (st.type === "ellips") {
      path((t) => [a * Math.cos(t), b * Math.sin(t)], 0, 2 * Math.PI);
      const cc = Math.sqrt(Math.abs(a * a - b * b));
      foci = a >= b ? [[-cc, 0], [cc, 0]] : [[0, -cc], [0, cc]];
      const e = cc / Math.max(a, b);
      if (e > 0.05 && a >= b) { vline(a / e, COL.b); vline(-a / e, COL.b); }
    } else if (st.type === "giperbola") {
      path((t) => [a * Math.cosh(t), b * Math.sinh(t)], -3, 3);
      path((t) => [-a * Math.cosh(t), b * Math.sinh(t)], -3, 3);
      const cc = Math.hypot(a, b); foci = [[-cc, 0], [cc, 0]];
      c.strokeStyle = css("--muted"); c.lineWidth = 1.5; c.setLineDash([4, 4]);
      path((t) => [t, (b / a) * t], -20, 20, 2); path((t) => [t, (-b / a) * t], -20, 20, 2); c.setLineDash([]);
      const e = cc / a; vline(a / e, COL.b); vline(-a / e, COL.b);
    } else if (st.type === "parabola") {
      path((t) => [(t * t) / (2 * p), t], -12, 12);
      foci = [[p / 2, 0]]; vline(-p / 2, COL.b);
    } else {
      path((t) => [R * Math.cos(t), R * Math.sin(t)], 0, 2 * Math.PI);
      foci = [[0, 0]];
    }
    const [px, py] = point();
    c.lineWidth = 2;
    foci.forEach(([fx, fy], i) => {
      c.strokeStyle = i ? COL.j : COL.i; c.beginPath(); c.moveTo(v.X(fx), v.Y(fy)); c.lineTo(v.X(px), v.Y(py)); c.stroke();
      dot(fx, fy, i ? COL.j : COL.i, st.type === "aylana" ? "O" : `F${foci.length > 1 ? i + 1 : ""}`);
    });
    if (st.type === "parabola") { c.strokeStyle = COL.b; c.beginPath(); c.moveTo(v.X(-p / 2), v.Y(py)); c.lineTo(v.X(px), v.Y(py)); c.stroke(); }
    dot(px, py, COL.c, "M");
    st._foci = foci; st._P = [px, py];
  });
  function info() {
    const { a, b, p, R } = st, [px, py] = st._P || point();
    const d = (f) => Math.hypot(px - f[0], py - f[1]);
    let html = "";
    if (st.type === "ellips") {
      const big = Math.max(a, b), cc = Math.sqrt(Math.abs(a * a - b * b)), e = cc / big;
      html = `${mathText(`$$\\frac{x^2}{${fmt(a * a)}} + \\frac{y^2}{${fmt(b * b)}} = 1$$`)}<div class="kv">
        <span>c</span><b>${fmt(cc)}</b><span>ε = c/a</span><b>${fmt(e, 3)}</b>
        <span>r₁ + r₂</span><b>${fmt(d(st._foci[0]))} + ${fmt(d(st._foci[1]))} = ${fmt(d(st._foci[0]) + d(st._foci[1]))}</b>
        <span>2a</span><b>${fmt(2 * big)} ✓</b></div><p class="small muted mt">M nuqta qayerda bo'lmasin, fokuslargacha masofalar yig'indisi o'zgarmas!</p>`;
    } else if (st.type === "giperbola") {
      const cc = Math.hypot(a, b);
      html = `${mathText(`$$\\frac{x^2}{${fmt(a * a)}} - \\frac{y^2}{${fmt(b * b)}} = 1$$`)}<div class="kv">
        <span>c</span><b>${fmt(cc)}</b><span>ε</span><b>${fmt(cc / a, 3)}</b><span>asimptotalar</span><b>y = ±${fmt(b / a, 3)}x</b>
        <span>|r₁ − r₂|</span><b>${fmt(Math.abs(d(st._foci[0]) - d(st._foci[1])))}</b><span>2a</span><b>${fmt(2 * a)} ✓</b></div>`;
    } else if (st.type === "parabola") {
      html = `${mathText(`$$y^2 = ${fmt(2 * p)}x$$`)}<div class="kv"><span>Fokus</span><b>(${fmt(p / 2)}; 0)</b><span>Direktrisa</span><b>x = ${fmt(-p / 2)}</b>
        <span>|MF|</span><b>${fmt(d(st._foci[0]))}</b><span>M → direktrisa</span><b>${fmt(px + p / 2)} ✓</b><span>ε</span><b>1</b></div>`;
    } else {
      html = `${mathText(`$$x^2 + y^2 = ${fmt(R * R)}$$`)}<div class="kv"><span>R</span><b>${fmt(R)}</b><span>|OM|</span><b>${fmt(d([0, 0]))}</b><span>ε</span><b>0</b></div>`;
    }
    $("#info", body).innerHTML = "<h3>Xossalar</h3>" + html;
  }
  function sync() { v.redraw(); info(); $("#th", body).value = st.th; }
  body.addEventListener("click", (e) => { const b = e.target.closest("[data-type]"); if (b) { st.type = b.dataset.type; buildSliders(); sync(); } });
  body.addEventListener("input", (e) => {
    const k = e.target.dataset.k;
    if (k) { st[k] = +e.target.value; $("#v-" + k, body).textContent = st[k]; sync(); }
    if (e.target.id === "th") { st.th = +e.target.value; st.play = false; $("#pp", body).textContent = "▶ Davom"; sync(); }
  });
  $("#pp", body).addEventListener("click", () => { st.play = !st.play; $("#pp", body).textContent = st.play ? "⏸ To'xtatish" : "▶ Davom"; });
  let last = 0;
  const loop = (now) => {
    if (st.play && now - last > 30) { st.th = (st.th + 0.012) % (2 * Math.PI); last = now; sync(); }
    st.raf = requestAnimationFrame(loop);
  };
  buildSliders(); sync();
  st.raf = requestAnimationFrame(loop);
  return () => { cancelAnimationFrame(st.raf); v.destroy(); };
}

// ================= Matritsa kiritish =================
function matInput(container, rows, cols, values = [], aug = 0) {
  container.innerHTML = `<div class="mat-edit" style="--cols:${cols}">${Array.from({ length: rows * cols }, (_, k) => {
    const i = Math.floor(k / cols), j = k % cols;
    const val = values[i]?.[j] ?? 0;
    return `<input value="${val}" style="${aug && j === cols - aug ? "border-left:3px solid var(--primary)" : ""}">`;
  }).join("")}</div>`;
  return () => {
    const ins = $$("input", container);
    const M = [];
    for (let i = 0; i < rows; i++) {
      M.push([]);
      for (let j = 0; j < cols; j++) {
        const x = parseNum(ins[i * cols + j].value || "0");
        if (!x) throw new Error(`(${i + 1}, ${j + 1}) katakda noto'g'ri son`);
        M[i].push(x);
      }
    }
    return M;
  };
}

const stepsHtml = (steps, aug = 0) =>
  steps.length
    ? `<div class="steps">${steps.map((s, i) => `<div class="step"><div class="op">${i + 1}-qadam: ${mathText("$" + s.op + "$")}</div>${mathText("$$" + texMat(s.M, { aug }) + "$$")}</div>`).join("")}</div>`
    : `<p class="muted">Almashtirish talab qilinmadi.</p>`;

// ================= 5. Gauss usuli =================
function labGauss(body) {
  let n = 3, m = 3;
  let values = [[1, 1, 1, 6], [2, -1, 1, 3], [1, 2, -1, 2]];
  body.innerHTML = `
    <div class="grid split">
      <div class="card">
        <h3>Sistema</h3>
        <div class="row small"><label>Tenglamalar <select id="n">${[1, 2, 3, 4, 5].map((k) => `<option ${k === n ? "selected" : ""}>${k}</option>`).join("")}</select></label>
        <label>Noma'lumlar <select id="m">${[1, 2, 3, 4, 5].map((k) => `<option ${k === m ? "selected" : ""}>${k}</option>`).join("")}</select></label></div>
        <p class="small muted">Kengaytirilgan matritsa $(A\\,|\\,B)$. Kasr: 1/2.</p>
        <div id="mat" style="overflow-x:auto"></div>
        <div class="row mt"><button class="btn primary" id="solve">Yechish</button><button class="btn sm" id="rand">🎲 Tasodifiy</button></div>
        <div id="sys" class="mt"></div>
      </div>
      <div class="card" id="out"><p class="muted">«Yechish» tugmasini bosing — har bir qadam ko'rsatiladi.</p></div>
    </div>`;
  const p = $(".card p.small.muted", body); p.innerHTML = mathText(p.textContent);
  const vars = (k) => (m <= 3 ? ["x", "y", "z"][k] : `x_${k + 1}`);
  let read;
  const build = () => { read = matInput($("#mat", body), n, m + 1, values, 1); preview(); };
  function preview() {
    try {
      const M = read();
      $("#sys", body).innerHTML = mathText(`$$\\begin{cases} ${M.map((r) => `${texLin(r.slice(0, m), Array.from({ length: m }, (_, k) => vars(k)))} = ${r[m].tex()}`).join(" \\\\ ")} \\end{cases}$$`);
    } catch { $("#sys", body).innerHTML = ""; }
  }
  $("#mat", body).addEventListener("input", preview);
  $("#n", body).addEventListener("change", (e) => { n = +e.target.value; build(); });
  $("#m", body).addEventListener("change", (e) => { m = +e.target.value; build(); });
  $("#rand", body).addEventListener("click", () => {
    const sol = Array.from({ length: m }, () => Math.floor(Math.random() * 9) - 4);
    values = Array.from({ length: n }, () => { const r = Array.from({ length: m }, () => Math.floor(Math.random() * 7) - 3); return [...r, r.reduce((s, x, k) => s + x * sol[k], 0)]; });
    build();
  });
  $("#solve", body).addEventListener("click", () => {
    let M;
    try { M = read(); } catch (e) { $("#out", body).innerHTML = `<p style="color:var(--bad)">${esc(e.message)}</p>`; return; }
    values = M.map((r) => r.map(String));
    const res = rrefSteps(M, 1);
    const R = res.R;
    const rankA = res.pivots.length;
    const inconsistent = R.some((r) => r.slice(0, m).every((x) => x.isZero()) && !r[m].isZero());
    let verdict;
    if (inconsistent) {
      verdict = `<div class="result-banner bad">Sistema birgalikda emas: $\\operatorname{rang}A = ${rankA} < \\operatorname{rang}\\bar A = ${rankA + 1}$ — yechim yo'q.</div>`;
    } else if (rankA === m) {
      const xs = Array(m).fill(F(0));
      res.pivots.forEach((c, i) => (xs[c] = R[i][m]));
      verdict = `<div class="result-banner ok">Yagona yechim ($\\operatorname{rang}A = \\operatorname{rang}\\bar A = n = ${m}$):</div>$$${xs.map((x, k) => `${vars(k)} = ${x.tex()}`).join(",\\quad ")}$$`;
    } else {
      const free = Array.from({ length: m }, (_, k) => k).filter((k) => !res.pivots.includes(k));
      const lines = res.pivots.map((c, i) => {
        const coefs = free.map((f) => R[i][f].neg());
        return `${vars(c)} = ${texLin(coefs, free.map(vars), R[i][m])}`;
      });
      verdict = `<div class="result-banner ok">Cheksiz ko'p yechim: $\\operatorname{rang} = ${rankA} < n = ${m}$, erkin noma'lumlar: $${free.map(vars).join(", ")}$</div>$$\\begin{cases} ${lines.join(" \\\\ ")} \\end{cases}$$`;
    }
    $("#out", body).innerHTML = `<h3>Yechim qadamlari</h3>
      <div class="step"><div class="op">Boshlang'ich kengaytirilgan matritsa</div>${mathText("$$" + texMat(M, { aug: 1 }) + "$$")}</div>
      <div class="mt">${stepsHtml(res.steps, 1)}</div><div class="mt">${texHtml(verdict)}</div>`;
  });
  build();
}

// ================= 6. Matritsa kalkulyatori =================
function labCalc(body) {
  const st = { ar: 3, ac: 3, br: 3, bc: 3, A: [[2, 1, 0], [1, 3, 1], [0, 1, 4]], B: [[1, 0, 2], [0, 1, 0], [1, 1, 1]] };
  const sizeSel = (id, val) => `<select id="${id}">${[1, 2, 3, 4, 5].map((k) => `<option ${k === val ? "selected" : ""}>${k}</option>`).join("")}</select>`;
  body.innerHTML = `
    <div class="grid g2 mb">
      <div class="card"><div class="row between"><h3 style="margin:0">A</h3><span class="small">${sizeSel("ar", st.ar)} × ${sizeSel("ac", st.ac)}</span></div><div id="A" class="mt" style="overflow-x:auto"></div></div>
      <div class="card"><div class="row between"><h3 style="margin:0">B</h3><span class="small">${sizeSel("br", st.br)} × ${sizeSel("bc", st.bc)}</span></div><div id="B" class="mt" style="overflow-x:auto"></div></div>
    </div>
    <div class="card mb"><div class="row" id="ops">
      ${[["det", "det A"], ["inv", "A⁻¹"], ["rank", "rang A"], ["rref", "Pog'onasimon (RREF)"], ["T", "Aᵀ"], ["add", "A + B"], ["sub", "A − B"], ["mul", "A · B"], ["bmul", "B · A"], ["pow", "A²"], ["eig", "Xos qiymatlar (2×2)"]]
        .map(([k, n]) => `<button class="btn sm" data-op="${k}">${n}</button>`).join("")}
    </div></div>
    <div class="card" id="out"><p class="muted">Amalni tanlang.</p></div>`;
  let readA, readB;
  const build = () => { readA = matInput($("#A", body), st.ar, st.ac, st.A); readB = matInput($("#B", body), st.br, st.bc, st.B); };
  ["ar", "ac", "br", "bc"].forEach((k) => $("#" + k, body).addEventListener("change", (e) => {
    try { st.A = readA().map((r) => r.map(String)); st.B = readB().map((r) => r.map(String)); } catch {}
    st[k] = +e.target.value; build();
  }));
  const out = (html) => ($("#out", body).innerHTML = html);
  const show = (title, tex, extra = "") => out(`<h3>${title}</h3>${mathText("$$" + tex + "$$")}${extra}`);
  $("#ops", body).addEventListener("click", (e) => {
    const op = e.target.closest("[data-op]")?.dataset.op;
    if (!op) return;
    let A, B;
    try { A = readA(); B = readB(); } catch (err) { return out(`<p style="color:var(--bad)">${esc(err.message)}</p>`); }
    const sq = A.length === A[0].length;
    const need = (cond, msg) => { if (!cond) { out(`<p style="color:var(--bad)">⚠️ ${msg}</p>`); return false; } return true; };
    switch (op) {
      case "det": {
        if (!need(sq, "Determinant faqat kvadrat matritsa uchun.")) return;
        const res = rrefSteps(A, 0, { jordan: false });
        return out(`<h3>Determinant — Gauss usuli bilan uchburchak ko'rinishga keltirish</h3>${stepsHtml(res.steps)}
          <p class="mt">${mathText(`Uchburchak matritsa determinanti — diagonal ko'paytmasi${res.swaps ? `, satrlar ${res.swaps} marta almashgani uchun ishora $(-1)^{${res.swaps}}$` : ""}:`)}</p>
          ${mathText(`$$\\det A = ${res.det.tex()}$$`)}`);
      }
      case "inv": {
        if (!need(sq, "Teskari matritsa faqat kvadrat matritsa uchun.")) return;
        const n = A.length, { inv, steps } = inverse(A);
        return out(`<h3>Gauss–Jordan: ${mathText("$[A\\,|\\,E] \\to [E\\,|\\,A^{-1}]$")}</h3>${stepsHtml(steps, n)}${inv ? mathText(`$$A^{-1} = ${texMat(inv)}$$`) : `<div class="result-banner bad">det A = 0 — teskari matritsa mavjud emas.</div>`}`);
      }
      case "rank": {
        const res = rrefSteps(A, 0, { jordan: false });
        return out(`<h3>Rang</h3>${stepsHtml(res.steps)}${mathText(`$$\\operatorname{rang} A = ${res.rank}$$`)}`);
      }
      case "rref": {
        const res = rrefSteps(A);
        return out(`<h3>Keltirilgan pog'onasimon ko'rinish</h3>${stepsHtml(res.steps)}${mathText(`$$${texMat(res.R)}$$`)}`);
      }
      case "T": return show("Transponirlangan", `A^T = ${texMat(transpose(A))}`);
      case "add": case "sub":
        if (!need(A.length === B.length && A[0].length === B[0].length, "O'lchamlar bir xil bo'lishi kerak.")) return;
        return show(op === "add" ? "Yig'indi" : "Ayirma", `A ${op === "add" ? "+" : "-"} B = ${texMat(madd(A, op === "add" ? B : mscale(B, -1)))}`);
      case "mul":
        if (!need(A[0].length === B.length, `A ning ustunlari (${A[0].length}) B ning satrlariga (${B.length}) teng bo'lishi kerak.`)) return;
        return show("Ko'paytma", `AB = ${texMat(mmul(A, B))}`, `<p class="small muted">${mathText("$c_{ij}$ — $A$ ning $i$-satri va $B$ ning $j$-ustuni skalyar ko'paytmasi.")}</p>`);
      case "bmul":
        if (!need(B[0].length === A.length, `B ning ustunlari A ning satrlariga teng bo'lishi kerak.`)) return;
        return show("Ko'paytma", `BA = ${texMat(mmul(B, A))}`, `<p class="small muted">${mathText("Solishtiring: odatda $AB \\ne BA$.")}</p>`);
      case "pow":
        if (!need(sq, "Kvadrat matritsa kerak.")) return;
        return show("Kvadrat", `A^2 = ${texMat(mmul(A, A))}`);
      case "eig": {
        if (!need(A.length === 2 && A[0].length === 2, "Hozircha 2×2 matritsa uchun.")) return;
        const [[a, b], [c, d]] = A.map((r) => r.map(Number));
        const tr = A[0][0].add(A[1][1]), D = det(A);
        return out(`<h3>Xos qiymatlar</h3>${mathText(`$$\\det(A - \\lambda E) = \\lambda^2 - ${tr.tex()}\\lambda + ${D.tex()} = 0$$`.replace("- -", "+ ").replace("+ -", "- "))}
          <p>${mathText("$\\lambda_{1,2}$")} = <b>${eigenVals(a, b, c, d)}</b></p>
          ${eigen(a, b, c, d).map((e, i) => `<p>${mathText(`Xos vektor $\\vec x_{${i + 1}}$`)} ∥ (${fmt(e.x, 3)}; ${fmt(e.y, 3)})</p>`).join("")}`);
      }
    }
  });
  build();
}

// ================= 7. Matritsaviy usul va Kramer qoidasi =================
const pt = (x) => (Fr.of(x).n < 0 ? `(${Fr.of(x).tex()})` : Fr.of(x).tex());
const sizeOpts = (list, val) => list.map((k) => `<option ${k === val ? "selected" : ""}>${k}</option>`).join("");

function randSystem(n) {
  for (let t = 0; t < 200; t++) {
    const A = Array.from({ length: n }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 7) - 3));
    const d = +det(A);
    if (d !== 0 && Math.abs(d) <= 30) {
      const sol = Array.from({ length: n }, () => Math.floor(Math.random() * 7) - 3);
      return A.map((r) => [...r, r.reduce((s, x, k) => s + x * sol[k], 0)]);
    }
  }
  return null;
}

function labMatrix(body) {
  let n = 3, method = "matritsa";
  let values = [[-1, 2, -3, -2], [0, 1, 2, 3], [2, 4, 5, 11]];
  body.innerHTML = `
    <div class="grid split">
      <div class="card">
        <h3>Sistema ${mathText("$AX = B$")}</h3>
        <div class="row small">
          <label>Tartib <select id="n">${sizeOpts([2, 3, 4], n)}</select></label>
          <label>Usul <select id="meth"><option value="matritsa">Matritsaviy usul (X = A⁻¹B)</option><option value="kramer">Kramer qoidasi</option></select></label>
        </div>
        <p class="small muted">Kengaytirilgan matritsa: oxirgi ustun — ozod hadlar. Kasr: 1/2.</p>
        <div id="mat" style="overflow-x:auto"></div>
        <div class="row mt"><button class="btn primary" id="solve">Yechish</button><button class="btn sm" id="rand">🎲 Tasodifiy</button></div>
        <div id="sys" class="mt"></div>
        <div class="callout callout-eslatma mt"><div class="callout-title">Eslatma</div><div class="small">${mathText("Ikkala usul ham faqat $\\det A \\ne 0$ bo'lganda ishlaydi. $\\det A = 0$ bo'lsa — «Gauss usuli» bo'limidan foydalaning.")}</div></div>
      </div>
      <div class="card" id="out"><p class="muted">«Yechish» tugmasini bosing — har bir qadam ko'rsatiladi.</p></div>
    </div>`;
  const vars = (k) => (n <= 3 ? ["x", "y", "z"][k] : `x_${k + 1}`);
  let read;
  const build = () => { read = matInput($("#mat", body), n, n + 1, values, 1); preview(); };
  function preview() {
    try {
      const M = read();
      $("#sys", body).innerHTML = mathText(`$$\\begin{cases} ${M.map((r) => `${texLin(r.slice(0, n), Array.from({ length: n }, (_, k) => vars(k)))} = ${r[n].tex()}`).join(" \\\\ ")} \\end{cases}$$`);
    } catch { $("#sys", body).innerHTML = ""; }
  }
  $("#mat", body).addEventListener("input", preview);
  $("#n", body).addEventListener("change", (e) => { n = +e.target.value; values = randSystem(n); build(); $("#out", body).innerHTML = `<p class="muted">«Yechish» tugmasini bosing.</p>`; });
  $("#meth", body).addEventListener("change", (e) => (method = e.target.value));
  $("#rand", body).addEventListener("click", () => { values = randSystem(n); build(); });

  $("#solve", body).addEventListener("click", () => {
    let M;
    try { M = read(); } catch (e) { $("#out", body).innerHTML = `<p style="color:var(--bad)">${esc(e.message)}</p>`; return; }
    values = M.map((r) => r.map(String));
    const A = M.map((r) => r.slice(0, n)), B = M.map((r) => [r[n]]);
    const D = det(A);
    const X = Array.from({ length: n }, (_, k) => `${vars(k)}`);
    let html = `<h3>${method === "kramer" ? "Kramer qoidasi" : "Matritsaviy usul"}</h3>
      <div class="step"><div class="op">1. Matritsaviy ko'rinish ${mathText("$AX = B$")}</div>${mathText(`$$${texMat(A)}\\begin{pmatrix} ${X.join(" \\\\ ")} \\end{pmatrix} = ${texMat(B)}$$`)}</div>
      <div class="step"><div class="op">2. Asosiy determinant</div>${mathText(`$$\\Delta = \\det A = ${texMat(A, { br: "v" })} = ${D.tex()}$$`)}</div>`;
    if (D.isZero()) {
      $("#out", body).innerHTML = html + `<div class="result-banner bad">${mathText("$\\Delta = 0$ — matritsa xos, bu usulni qo'llab bo'lmaydi. Sistema yo yechimsiz, yo cheksiz ko'p yechimga ega: «Gauss usuli» bo'limida tekshiring.")}</div>`;
      return;
    }
    let xs;
    if (method === "kramer") {
      xs = [];
      for (let j = 0; j < n; j++) {
        const Aj = A.map((r, i) => r.map((x, k) => (k === j ? B[i][0] : x)));
        const Dj = det(Aj);
        xs.push(Dj.div(D));
        html += `<div class="step"><div class="op">${j + 3}. ${mathText(`$\\Delta_{${j + 1}}$`)}: ${j + 1}-ustun o'rniga ozod hadlar</div>${mathText(`$$\\Delta_{${j + 1}} = ${texMat(Aj, { br: "v" })} = ${Dj.tex()},\\qquad ${vars(j)} = \\frac{\\Delta_{${j + 1}}}{\\Delta} = \\frac{${Dj.tex()}}{${D.tex()}} = ${Dj.div(D).tex()}$$`)}</div>`;
      }
    } else {
      // Algebraik to'ldiruvchilar
      const C = A.map((r, i) => r.map((_, j) => {
        const mn = minor(A, i, j);
        const md = n === 1 ? F(1) : det(mn);
        return { mn, md, v: (i + j) % 2 ? md.neg() : md };
      }));
      const list = n <= 3
        ? C.flatMap((r, i) => r.map((c, j) => `A_{${i + 1}${j + 1}} = ${(i + j) % 2 ? "-" : "+"}${n === 2 ? pt(c.mn[0][0]) : texMat(c.mn, { br: "v" })} = ${c.v.tex()}`))
        : C.flatMap((r, i) => r.map((c, j) => `A_{${i + 1}${j + 1}} = ${c.v.tex()}`));
      html += `<div class="step"><div class="op">3. Algebraik to'ldiruvchilar ${mathText("$A_{ij} = (-1)^{i+j}M_{ij}$")}</div><div class="cof-grid">${list.map((s) => `<div>${mathText("$" + s + "$")}</div>`).join("")}</div></div>`;
      const adj = A.map((_, i) => A.map((_, j) => C[j][i].v));
      const inv = adj.map((r) => r.map((x) => x.div(D)));
      html += `<div class="step"><div class="op">4. Biriktirilgan matritsa (to'ldiruvchilar <b>transponirlangan</b> holda) va teskari matritsa</div>${mathText(`$$A^{-1} = \\frac{1}{\\Delta}\\widetilde A^{\\,T} = \\frac{1}{${D.tex()}}${texMat(adj)} = ${texMat(inv)}$$`)}</div>`;
      const Xv = mmul(inv, B), adjB = mmul(adj, B);
      xs = Xv.map((r) => r[0]);
      html += `<div class="step"><div class="op">5. Yechim ${mathText("$X = A^{-1}B$")}</div>${mathText(`$$X = \\frac{1}{${D.tex()}}${texMat(adj)}${texMat(B)} = \\frac{1}{${D.tex()}}${texMat(adjB)} = ${texMat(Xv)}$$`)}</div>`;
    }
    const check = mmul(A, xs.map((x) => [x])).every((r, i) => r[0].eq(B[i][0]));
    html += `<div class="result-banner ok mt">Javob: ${mathText(`$${xs.map((x, k) => `${vars(k)} = ${x.tex()}`).join(",\\ ")}$`)}</div>
      <p class="small ${check ? "" : "muted"}">${check ? "✓ Tekshirish: barcha tenglamalarga qo'yilganda to'g'ri tenglik hosil bo'ladi." : ""}</p>`;
    $("#out", body).innerHTML = html;
  });
  build();
}

// ================= 8. Determinantni hisoblash =================
function labDet(body) {
  let n = 3, method = "sarrus", line = "r0";
  let values = [[2, 1, -1], [3, 0, 4], [1, 5, 2]];
  body.innerHTML = `
    <div class="grid split">
      <div class="card">
        <h3>Matritsa</h3>
        <div class="row small">
          <label>Tartib <select id="n">${sizeOpts([2, 3, 4, 5], n)}</select></label>
          <label>Usul <select id="meth"></select></label>
          <label id="lineWrap">Yoyish <select id="line"></select></label>
        </div>
        <div id="mat" class="mt" style="overflow-x:auto"></div>
        <div class="row mt"><button class="btn primary" id="go">Hisoblash</button><button class="btn sm" id="rand">🎲 Tasodifiy</button><button class="btn sm" id="zeros">🎲 Nollari ko'p</button></div>
        <div class="callout callout-eslatma mt"><div class="callout-title">Qaysi usul qachon?</div><div class="small">${mathText("Sarryus — faqat $3\\times3$. Yoyish — nollari ko'p satr/ustun bo'lsa. Gauss usuli — har qanday tartibda eng tez: uchburchak ko'rinishga keltirib, diagonalni ko'paytiramiz.")}</div></div>
      </div>
      <div class="card" id="out"><p class="muted">Usulni tanlang va «Hisoblash» ni bosing.</p></div>
    </div>`;
  let read;
  const methods = () => [
    ...(n === 2 ? [["formula", "2×2 formula"]] : []),
    ...(n === 3 ? [["sarrus", "Sarryus (uchburchaklar) qoidasi"]] : []),
    ["yoyish", "Satr yoki ustun bo'yicha yoyish"],
    ["gauss", "Gauss usuli (uchburchak ko'rinish)"],
  ];
  function syncControls() {
    const ms = methods();
    if (!ms.some((m) => m[0] === method)) method = ms[0][0];
    $("#meth", body).innerHTML = ms.map(([k, t]) => `<option value="${k}" ${k === method ? "selected" : ""}>${t}</option>`).join("");
    $("#line", body).innerHTML = [...Array.from({ length: n }, (_, i) => [`r${i}`, `${i + 1}-satr`]), ...Array.from({ length: n }, (_, j) => [`c${j}`, `${j + 1}-ustun`])]
      .map(([k, t]) => `<option value="${k}" ${k === line ? "selected" : ""}>${t}</option>`).join("");
    $("#lineWrap", body).style.display = method === "yoyish" ? "" : "none";
  }
  const build = () => { read = matInput($("#mat", body), n, n, values); syncControls(); };
  const randM = (zeros) => Array.from({ length: n }, () => Array.from({ length: n }, () => (zeros && Math.random() < 0.45 ? 0 : Math.floor(Math.random() * 9) - 4)));
  $("#n", body).addEventListener("change", (e) => { n = +e.target.value; values = randM(n > 3); if (!line.endsWith("0")) line = "r0"; build(); });
  $("#meth", body).addEventListener("change", (e) => { method = e.target.value; syncControls(); });
  $("#line", body).addEventListener("change", (e) => (line = e.target.value));
  $("#rand", body).addEventListener("click", () => { values = randM(false); build(); });
  $("#zeros", body).addEventListener("click", () => { values = randM(true); build(); });

  $("#go", body).addEventListener("click", () => {
    let A;
    try { A = read(); } catch (e) { $("#out", body).innerHTML = `<p style="color:var(--bad)">${esc(e.message)}</p>`; return; }
    values = A.map((r) => r.map(String));
    const D = det(A);
    let html = "";
    if (method === "formula") {
      html = `<h3>2×2 determinant</h3>${mathText(`$$\\begin{vmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}$$`)}
        ${mathText(`$$${texMat(A, { br: "v" })} = ${pt(A[0][0])}\\cdot${pt(A[1][1])} - ${pt(A[0][1])}\\cdot${pt(A[1][0])} = ${D.tex()}$$`)}`;
    } else if (method === "sarrus") {
      const a = A, P = (i, j, k) => a[0][i].mul(a[1][j]).mul(a[2][k]);
      const plus = [[0, 1, 2], [1, 2, 0], [2, 0, 1]], minus = [[2, 1, 0], [1, 0, 2], [0, 2, 1]];
      const term = ([i, j, k]) => `${pt(a[0][i])}\\cdot${pt(a[1][j])}\\cdot${pt(a[2][k])}`;
      const sp = plus.reduce((s, t) => s.add(P(...t)), F(0)), sm = minus.reduce((s, t) => s.add(P(...t)), F(0));
      html = `<h3>Sarryus qoidasi</h3>
        <div class="step"><div class="op">«+» hadlar: bosh diagonal va unga parallel uchburchaklar</div>${mathText(`$$${plus.map(term).join(" + ")} = ${plus.map((t) => P(...t).tex()).join(" + ").replace(/\+ -/g, "- ")} = ${sp.tex()}$$`)}</div>
        <div class="step"><div class="op">«−» hadlar: yordamchi diagonal va unga parallel uchburchaklar</div>${mathText(`$$${minus.map(term).join(" + ")} = ${minus.map((t) => P(...t).tex()).join(" + ").replace(/\+ -/g, "- ")} = ${sm.tex()}$$`)}</div>
        ${mathText(`$$\\det A = ${sp.tex()} - ${pt(sm)} = ${D.tex()}$$`)}`;
    } else if (method === "yoyish") {
      const isRow = line[0] === "r", idx = +line.slice(1);
      const zc = (arr) => arr.filter((x) => x.isZero()).length;
      const best = Array.from({ length: n }, (_, k) => [["r", k, zc(A[k])], ["c", k, zc(A.map((row) => row[k]))]]).flat().sort((p, q) => q[2] - p[2])[0];
      const elems = Array.from({ length: n }, (_, k) => (isRow ? [idx, k] : [k, idx]));
      const terms = elems.map(([i, j]) => {
        const a = A[i][j], s = (i + j) % 2 ? -1 : 1;
        if (a.isZero()) return { i, j, a, s, zero: true };
        const mn = minor(A, i, j), md = det(mn);
        return { i, j, a, s, mn, md, val: a.mul(md).mul(s) };
      });
      html = `<h3>${isRow ? `${idx + 1}-satr` : `${idx + 1}-ustun`} bo'yicha yoyish</h3>
        ${best[2] > 0 && !(best[0] === line[0] && best[1] === idx) ? `<p class="small muted">💡 Maslahat: ${best[0] === "r" ? `${best[1] + 1}-satrda` : `${best[1] + 1}-ustunda`} ${best[2]} ta nol bor — o'sha bo'yicha yoyish qisqaroq.</p>` : ""}
        ${mathText(`$$\\det A = \\sum ${isRow ? `_{j} a_{${idx + 1}j}A_{${idx + 1}j}` : `_{i} a_{i${idx + 1}}A_{i${idx + 1}}`},\\qquad A_{ij} = (-1)^{i+j}M_{ij}$$`)}
        ${terms.map((t) => `<div class="step"><div class="op">${mathText(`$a_{${t.i + 1}${t.j + 1}} = ${t.a.tex()}$`)}${t.zero ? " — nol, bu hadni hisoblash shart emas" : ""}</div>${t.zero ? "" : mathText(`$$${t.s < 0 ? "-" : "+"}\\,${pt(t.a)}\\cdot ${t.mn.length === 1 ? pt(t.mn[0][0]) : texMat(t.mn, { br: "v" })} = ${t.s < 0 ? "-" : ""}${pt(t.a)}\\cdot${pt(t.md)} = ${t.val.tex()}$$`)}</div>`).join("")}
        ${mathText(`$$\\det A = ${terms.filter((t) => !t.zero).map((t) => pt(t.val)).join(" + ") || "0"} = ${D.tex()}$$`)}
        ${n >= 4 ? `<p class="small muted">${mathText(`$${n - 1}$-tartibli minorlar ham xuddi shunday (yoki Gauss usuli bilan) hisoblanadi.`)}</p>` : ""}`;
    } else {
      const res = rrefSteps(A, 0, { jordan: false });
      html = `<h3>Gauss usuli: uchburchak ko'rinishga keltirish</h3>
        <p class="small muted">${mathText("Bir satrga boshqasini songa ko'paytirib qo'shish determinantni o'zgartirmaydi; satrlarni almashtirish ishorani o'zgartiradi; satrni songa bo'lsak — o'sha son tashqariga chiqadi.")}</p>
        ${stepsHtml(res.steps)}
        <p>${mathText(res.rank < n ? "" : `Uchburchak matritsa determinanti — diagonal elementlar ko'paytmasi${res.swaps ? `; satrlar ${res.swaps} marta almashgani uchun ishora $(-1)^{${res.swaps}}$` : ""}.`)}</p>
        ${res.rank < n ? `<p>${mathText("Nol satr hosil bo'ldi — satrlar chiziqli bog'liq, $\\det A = 0$.")}</p>` : ""}`;
    }
    $("#out", body).innerHTML = html + `<div class="result-banner ok mt">${mathText(`$\\det A = ${D.tex()}$`)}</div>`;
  });
  build();
}

// ================= 9. Matritsa rangi =================
function labRank(body) {
  let m = 3, n = 5;
  let values = [[2, -1, 3, -2, 4], [4, -2, 5, 1, 7], [2, -1, 1, 8, 2]];
  body.innerHTML = `
    <div class="grid split">
      <div class="card">
        <h3>Matritsa</h3>
        <div class="row small"><label>Satrlar <select id="m">${sizeOpts([1, 2, 3, 4, 5], m)}</select></label><label>Ustunlar <select id="nn">${sizeOpts([1, 2, 3, 4, 5, 6], n)}</select></label></div>
        <div id="mat" class="mt" style="overflow-x:auto"></div>
        <div class="row mt"><button class="btn primary" id="go">Rangni topish</button><button class="btn sm" id="rand">🎲 Tasodifiy</button><button class="btn sm" id="dep">🎲 Bog'liq satrlar bilan</button></div>
        <div class="callout callout-tarif mt"><div class="callout-title">Ta'rif</div><div class="small">${mathText("$\\operatorname{rang}A$ — noldan farqli minorlarning eng yuqori tartibi = chiziqli erkli satrlarning maksimal soni. Elementar almashtirishlar rangni o'zgartirmaydi.")}</div></div>
      </div>
      <div class="card" id="out"><p class="muted">«Rangni topish» tugmasini bosing.</p></div>
    </div>`;
  let read;
  const build = () => { read = matInput($("#mat", body), m, n, values); };
  const rnd = () => Math.floor(Math.random() * 9) - 4;
  $("#m", body).addEventListener("change", (e) => { m = +e.target.value; values = Array.from({ length: m }, () => Array.from({ length: n }, rnd)); build(); });
  $("#nn", body).addEventListener("change", (e) => { n = +e.target.value; values = Array.from({ length: m }, () => Array.from({ length: n }, rnd)); build(); });
  $("#rand", body).addEventListener("click", () => { values = Array.from({ length: m }, () => Array.from({ length: n }, rnd)); build(); });
  $("#dep", body).addEventListener("click", () => {
    const k = Math.max(1, Math.min(m - 1, n, 2));
    const base = Array.from({ length: k }, () => Array.from({ length: n }, rnd));
    values = Array.from({ length: m }, (_, i) => (i < k ? base[i] : base.reduce((s, r) => { const c = Math.floor(Math.random() * 5) - 2; return s.map((x, j) => x + c * r[j]); }, Array(n).fill(0))));
    build();
  });

  const combos = (arr, k) => (k === 0 ? [[]] : arr.flatMap((x, i) => combos(arr.slice(i + 1), k - 1).map((c) => [x, ...c])));

  $("#go", body).addEventListener("click", () => {
    let A;
    try { A = read(); } catch (e) { $("#out", body).innerHTML = `<p style="color:var(--bad)">${esc(e.message)}</p>`; return; }
    values = A.map((r) => r.map(String));
    const res = rrefSteps(A, 0, { jordan: false });
    const r = res.rank;
    let basis = null;
    if (r > 0) {
      const cols = res.pivots;
      for (const rows of combos(Array.from({ length: m }, (_, i) => i), r)) {
        const sub = rows.map((i) => cols.map((j) => A[i][j]));
        const d = det(sub);
        if (!d.isZero()) { basis = { rows, cols, sub, d }; break; }
      }
    }
    $("#out", body).innerHTML = `<h3>Elementar almashtirishlar bilan pog'onasimon ko'rinish</h3>
      <div class="step"><div class="op">Boshlang'ich matritsa</div>${mathText("$$" + texMat(A) + "$$")}</div>
      ${stepsHtml(res.steps)}
      <div class="step"><div class="op">Pog'onasimon ko'rinish: noldan farqli satrlar soni — ${r}</div>${mathText("$$" + texMat(res.R) + "$$")}</div>
      ${basis ? `<div class="step"><div class="op">Bazis minor (${basis.rows.map((i) => i + 1).join(", ")}-satrlar, ${basis.cols.map((j) => j + 1).join(", ")}-ustunlar) — dastlabki matritsada</div>${mathText(`$$M = ${basis.sub.length === 1 ? `|${basis.sub[0][0].tex()}|` : texMat(basis.sub, { br: "v" })} = ${basis.d.tex()} \\ne 0$$`)}
        <p class="small muted">${mathText(`Bazis minor teoremasiga ko'ra, $${r + 1}$-tartibli barcha minorlar nolga teng${r < Math.min(m, n) ? "" : " (bunday minorlar yo'q)"}.`)}</p></div>` : ""}
      <div class="result-banner ok mt">${mathText(`$\\operatorname{rang}A = ${r}$`)}</div>
      <p class="small">${r < m ? mathText(`Satrlar chiziqli bog'liq: $${m - r}$ ta satr qolganlarining chiziqli kombinatsiyasi.`) : "Barcha satrlar chiziqli erkli."} ${r < n ? mathText(`Ustunlardan $${n - r}$ tasi qolganlari orqali ifodalanadi.`) : ""}</p>`;
  });
  build();
}
