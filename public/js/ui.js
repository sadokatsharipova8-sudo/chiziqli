// Umumiy UI yordamchilari: formulalar, markdown, toast, modal, konfetti, tovush, javob maydonlari.

import { parseNum, sameNum } from "./math.js";

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function katexHtml(src, display) {
  try {
    return window.katex.renderToString(src, { displayMode: display, throwOnError: false, strict: false });
  } catch {
    return esc(src);
  }
}

/** Oddiy matn + $...$ / $$...$$ formulalar -> HTML. */
export function mathText(s) {
  const parts = String(s ?? "").split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g);
  return parts
    .map((p) => {
      if (p.startsWith("$$") && p.endsWith("$$") && p.length > 4) return katexHtml(p.slice(2, -2), true);
      if (p.startsWith("$") && p.endsWith("$") && p.length > 2) return katexHtml(p.slice(1, -1), false);
      return esc(p).replace(/\n/g, "<br>");
    })
    .join("");
}

/** Ishonchli (o'zimiz yozgan) HTML ichidagi formulalarni chizadi; HTML teglar saqlanadi. */
export function texHtml(html) {
  return String(html)
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => katexHtml(m, true))
    .replace(/\$([^$]+?)\$/g, (_, m) => katexHtml(m, false));
}

const CALLOUTS = {
  tarif: "Ta'rif", teorema: "Teorema", misol: "Misol", eslatma: "Eslatma", xossa: "Xossa", tarix: "Tarixiy lavha", diqqat: "Diqqat",
};

/** Markdown + formulalar + maxsus bloklar (:::tarif, :::savol ...). Qaytaradi {html, mcqs}. */
export function md(src, mcqs = []) {
  const blocks = [];
  let text = String(src ?? "").replace(/\r\n/g, "\n");

  text = text.replace(/^:::(\w+)[ \t]*(.*)\n([\s\S]*?)\n:::[ \t]*$/gm, (_, type, title, body) => {
    type = type.toLowerCase();
    if (type === "savol") {
      mcqs.push(parseMcq(body));
      blocks.push(`<div class="mcq" data-mcq="${mcqs.length - 1}"></div>`);
    } else {
      const inner = md(body, mcqs);
      const label = CALLOUTS[type] || type;
      blocks.push(`<div class="callout callout-${esc(type)}"><div class="callout-title">${esc(label)}${title ? ": " + mathText(title) : ""}</div>${inner.html}</div>`);
    }
    return `\n\n@@BLOCK${blocks.length - 1}@@\n\n`;
  });

  const maths = [];
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => { maths.push(katexHtml(m, true)); return `@@MATH${maths.length - 1}@@`; });
  text = text.replace(/\$([^$\n]+?)\$/g, (_, m) => { maths.push(katexHtml(m, false)); return `@@MATH${maths.length - 1}@@`; });

  let html = window.marked ? window.marked.parse(text, { mangle: false, headerIds: true }) : `<p>${esc(text)}</p>`;
  html = html.replace(/<p>@@BLOCK(\d+)@@<\/p>/g, (_, i) => blocks[i]).replace(/@@BLOCK(\d+)@@/g, (_, i) => blocks[i]);
  html = html.replace(/@@MATH(\d+)@@/g, (_, i) => maths[i]);
  return { html, mcqs };
}

export function parseMcq(body) {
  const q = [], options = [];
  let correct = 0, explain = "";
  for (const line of body.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("+ ")) { correct = options.length; options.push(t.slice(2)); }
    else if (t.startsWith("- ")) options.push(t.slice(2));
    else if (t.startsWith("> ")) explain += t.slice(2) + " ";
    else q.push(t);
  }
  return { q: q.join("\n"), options, correct, explain: explain.trim() };
}

/** Bitta test savoli kartasi (darslik ichida va takrorlashda). */
export function renderMcq(el, item, { onAnswer, shuffle = false } = {}) {
  const order = item.options.map((_, i) => i);
  if (shuffle) order.sort(() => Math.random() - 0.5);
  el.innerHTML = `
    <div class="mcq-q">${mathText(item.q)}</div>
    <div class="mcq-opts">${order.map((i, k) => `<button class="mcq-opt" data-i="${i}"><span class="mcq-letter">${"ABCD"[k]}</span><span>${mathText(item.options[i])}</span></button>`).join("")}</div>
    <div class="mcq-feedback" hidden></div>`;
  let done = false;
  $$(".mcq-opt", el).forEach((b) =>
    b.addEventListener("click", () => {
      if (done) return;
      done = true;
      const i = +b.dataset.i, ok = i === item.correct;
      $$(".mcq-opt", el).forEach((x) => {
        x.disabled = true;
        if (+x.dataset.i === item.correct) x.classList.add("correct");
      });
      if (!ok) b.classList.add("wrong");
      const fb = $(".mcq-feedback", el);
      fb.hidden = false;
      fb.className = "mcq-feedback " + (ok ? "ok" : "bad");
      fb.innerHTML = (ok ? "✓ To'g'ri!" : "✗ Noto'g'ri.") + (item.explain ? " " + mathText(item.explain) : "");
      sound(ok ? "ok" : "bad");
      onAnswer?.(ok, i);
    })
  );
}

// ---------- Javob maydonlari ----------
export function answerInputs(answer) {
  if (answer.type === "num") return `<div class="ans-row"><input class="ans-in" inputmode="text" autocomplete="off" placeholder="Javob"></div>`;
  if (answer.type === "vec")
    return `<div class="ans-row">${answer.value.map((_, i) => `<label class="ans-lbl"><span>${esc(answer.labels?.[i] ?? i + 1)} =</span><input class="ans-in" autocomplete="off"></label>`).join("")}</div>`;
  const rows = answer.value.length, cols = answer.value[0].length;
  return `<div class="ans-mat" style="--cols:${cols}">${Array.from({ length: rows * cols }, () => `<input class="ans-in" autocomplete="off">`).join("")}</div>`;
}

/** Kiritilgan javoblarni o'qib tekshiradi: {ok, filled, cells:[bool]} */
export function checkInputs(root, answer) {
  const ins = $$(".ans-in", root);
  const truth = answer.type === "num" ? [answer.value] : answer.type === "vec" ? answer.value : answer.value.flat();
  const cells = ins.map((inp, i) => sameNum(parseNum(inp.value), truth[i]));
  const filled = ins.every((inp) => parseNum(inp.value) !== null);
  return { ok: cells.every(Boolean), filled, cells, raw: ins.map((i) => i.value.trim()) };
}

export function answerTex(answer) {
  if (answer.type === "num") return answer.value.tex();
  if (answer.type === "vec") return answer.value.map((v, i) => `${answer.labels?.[i] ?? ""}=${v.tex()}`).join(",\\ ");
  return `\\begin{pmatrix}${answer.value.map((r) => r.map((x) => x.tex()).join("&")).join("\\\\")}\\end{pmatrix}`;
}

// ---------- Toast / modal ----------
export function toast(html, type = "info", ms = 2800) {
  const root = $("#toast-root");
  const t = document.createElement("div");
  t.className = `toast toast-${type}`;
  t.innerHTML = html;
  root.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, ms);
}

export function modal(html, { onClose, wide = false } = {}) {
  const wrap = document.createElement("div");
  wrap.className = "modal-backdrop";
  wrap.innerHTML = `<div class="modal ${wide ? "wide" : ""}" role="dialog" aria-modal="true"><button class="modal-x" aria-label="Yopish">×</button><div class="modal-body">${html}</div></div>`;
  document.body.appendChild(wrap);
  const close = () => { wrap.remove(); document.removeEventListener("keydown", onKey); onClose?.(); };
  const onKey = (e) => e.key === "Escape" && close();
  document.addEventListener("keydown", onKey);
  wrap.addEventListener("click", (e) => e.target === wrap && close());
  $(".modal-x", wrap).addEventListener("click", close);
  return { el: $(".modal-body", wrap), close };
}

// ---------- Konfetti ----------
export function confetti(n = 140) {
  const c = document.createElement("canvas");
  c.className = "confetti";
  document.body.appendChild(c);
  const ctx = c.getContext("2d");
  const W = (c.width = innerWidth), H = (c.height = innerHeight);
  const colors = ["#6366f1", "#ec4899", "#f59e0b", "#22c55e", "#0ea5e9", "#ef4444"];
  const ps = Array.from({ length: n }, () => ({
    x: W / 2 + (Math.random() - 0.5) * W * 0.4, y: H * 0.35, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4,
    s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: colors[(Math.random() * colors.length) | 0],
  }));
  $$(".confetti").forEach((x) => x !== c && x.remove());
  const t0 = performance.now();
  setTimeout(() => c.remove(), 4000);
  (function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const p of ps) {
      p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
    }
    if (performance.now() - t0 < 3200 && c.isConnected) requestAnimationFrame(tick); else c.remove();
  })();
}

// ---------- Tovush (WebAudio) ----------
let actx = null;
export function soundOn() {
  try { return localStorage.getItem("cag-sound") !== "0"; } catch { return true; }
}
export function sound(kind) {
  if (!soundOn()) return;
  try {
    actx ||= new (window.AudioContext || window.webkitAudioContext)();
    const notes = { ok: [660, 880], bad: [220, 160], tick: [1200], win: [523, 659, 784, 1047], pop: [500] }[kind] || [440];
    notes.forEach((f, i) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = kind === "bad" ? "sawtooth" : "sine";
      o.frequency.value = f;
      const t0 = actx.currentTime + i * (kind === "tick" ? 0 : 0.09);
      const dur = kind === "tick" ? 0.03 : 0.14;
      g.gain.setValueAtTime(kind === "tick" ? 0.05 : 0.12, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      o.connect(g).connect(actx.destination);
      o.start(t0); o.stop(t0 + dur + 0.02);
    });
  } catch {}
}

export function download(filename, text, type = "text/plain") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type: type + ";charset=utf-8" }));
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export const fmtTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
