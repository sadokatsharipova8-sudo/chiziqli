// Ismlar g'ildiragi (Wheel of Names) — tasodifiy talaba + ixtiyoriy tasodifiy savol.

import { SAVOLLAR } from "../../content/savollar.js";
import { TOPICS } from "../generators.js";
import { $, esc, modal, renderMcq, sound, confetti, shuffle } from "../ui.js";

const KEY = "cag-wheel-names";
const COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#22c55e", "#0ea5e9", "#ef4444", "#8b5cf6", "#14b8a6", "#f97316", "#84cc16"];
const DEFAULT = "Aziza\nBobur\nDilnoza\nJasur\nMalika\nOtabek\nSardor\nZarina";

export function render(el) {
  let names = [], rot = 0, spinning = false, raf = 0;
  let saved;
  try { saved = localStorage.getItem(KEY); } catch {}

  el.innerHTML = `
    <div class="page-head"><h1>🎡 Ismlar g'ildiragi</h1>
      <p>Tasodifiy tanlov barcha talabalarni darsga jalb qiladi — hamma tayyor turishi kerak (cold calling, Harvard Business School usuli). Savol rejimini yoqsangiz, tanlangan talabaga savol chiqadi.</p></div>
    <div class="lab">
      <div class="card">
        <div class="wheel-wrap"><canvas id="wheel"></canvas><div class="wheel-pointer"></div><div class="wheel-center" id="spin">AYLANTIR</div></div>
      </div>
      <div class="lab-panel">
        <div class="card">
          <div class="row between"><h3 style="margin:0">Ismlar</h3><span class="pill" id="cnt"></span></div>
          <textarea id="names" class="mt" style="min-height:220px">${esc(saved ?? DEFAULT)}</textarea>
          <div class="row mt"><button class="btn sm" id="shuffle">🔀 Aralashtirish</button><button class="btn sm" id="sort">A→Z</button><button class="btn sm danger" id="clear">Tozalash</button></div>
        </div>
        <div class="card stack">
          <label class="row small"><input type="checkbox" id="remove"> G'olibni ro'yxatdan olib tashlash</label>
          <label class="row small"><input type="checkbox" id="ask" checked> Tanlangan talabaga savol berish</label>
          <select id="topic"><option value="">Barcha mavzular</option>${TOPICS.map((t) => `<option value="${t.id}">${esc(t.name)}</option>`).join("")}</select>
        </div>
        <div class="card" id="history"><h3>Tarix</h3><p class="muted small">Hali hech kim tanlanmagan</p></div>
      </div>
    </div>`;

  const cv = $("#wheel", el), ctx = cv.getContext("2d");
  const history = [];

  function readNames() {
    names = $("#names", el).value.split("\n").map((s) => s.trim()).filter(Boolean);
    $("#cnt", el).textContent = `${names.length} ta`;
    try { localStorage.setItem(KEY, $("#names", el).value); } catch {}
    draw();
  }

  function draw() {
    const r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    const S = Math.max(1, r.width);
    if (cv.width !== Math.round(S * dpr)) { cv.width = cv.height = Math.round(S * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, S, S);
    const c = S / 2, R = S / 2 - 6;
    if (!names.length) { ctx.fillStyle = "#94a3b8"; ctx.font = "16px Inter"; ctx.textAlign = "center"; ctx.fillText("Ismlarni kiriting", c, c); return; }
    const seg = (Math.PI * 2) / names.length;
    names.forEach((n, i) => {
      const a0 = rot + i * seg, a1 = a0 + seg;
      ctx.beginPath(); ctx.moveTo(c, c); ctx.arc(c, c, R, a0, a1); ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length]; ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.6)"; ctx.lineWidth = 2; ctx.stroke();
      ctx.save(); ctx.translate(c, c); ctx.rotate(a0 + seg / 2);
      ctx.fillStyle = "#fff"; ctx.textAlign = "right"; ctx.textBaseline = "middle";
      const fs = Math.max(10, Math.min(24, (seg * R) / 2.2, 300 / Math.max(6, n.length)));
      ctx.font = `700 ${fs}px Inter`;
      ctx.fillText(n.length > 18 ? n.slice(0, 17) + "…" : n, R - 16, 0);
      ctx.restore();
    });
    ctx.beginPath(); ctx.arc(c, c, R, 0, Math.PI * 2); ctx.lineWidth = 6; ctx.strokeStyle = "rgba(0,0,0,.15)"; ctx.stroke();
  }

  const indexAtPointer = () => {
    const seg = (Math.PI * 2) / names.length;
    const a = (((-rot) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    return Math.floor(a / seg) % names.length;
  };

  function spin() {
    if (spinning || names.length < 1) return;
    spinning = true;
    const start = rot, total = Math.PI * 2 * (5 + Math.random() * 4) + Math.random() * Math.PI * 2;
    const dur = 4500 + Math.random() * 1500, t0 = performance.now();
    let lastIdx = indexAtPointer();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      rot = start + total * (1 - Math.pow(1 - p, 4));
      draw();
      const idx = indexAtPointer();
      if (idx !== lastIdx) { sound("tick"); lastIdx = idx; }
      if (p < 1) raf = requestAnimationFrame(step);
      else { spinning = false; winner(idx); }
    };
    raf = requestAnimationFrame(step);
  }

  function winner(idx) {
    const name = names[idx];
    sound("win"); confetti(90);
    history.unshift(name);
    $("#history", el).innerHTML = `<h3>Tarix</h3><ol style="margin:0;padding-left:20px">${history.slice(0, 12).map((h) => `<li>${esc(h)}</li>`).join("")}</ol>`;
    const ask = $("#ask", el).checked;
    const topic = $("#topic", el).value;
    const pool = SAVOLLAR.filter((q) => !topic || q.topic === topic);
    const q = ask && pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
    const m = modal(`<div class="center"><div class="muted">Tanlandi:</div><h1 style="font-size:44px;margin:6px 0 14px">🎉 ${esc(name)}</h1></div>${q ? `<div class="mcq bare" id="wq"></div>` : ""}<div class="row mt" style="justify-content:center"><button class="btn primary" id="ok">Yopish</button></div>`, { wide: !!q });
    if (q) renderMcq($("#wq", m.el), q, { shuffle: true });
    $("#ok", m.el).addEventListener("click", m.close);
    if ($("#remove", el).checked) {
      const ta = $("#names", el);
      const list = ta.value.split("\n").map((s) => s.trim()).filter(Boolean);
      list.splice(idx, 1);
      ta.value = list.join("\n");
      readNames();
    }
  }

  $("#names", el).addEventListener("input", readNames);
  $("#spin", el).addEventListener("click", spin);
  cv.addEventListener("click", spin);
  $("#shuffle", el).addEventListener("click", () => { $("#names", el).value = shuffle(names).join("\n"); readNames(); });
  $("#sort", el).addEventListener("click", () => { $("#names", el).value = [...names].sort((a, b) => a.localeCompare(b, "uz")).join("\n"); readNames(); });
  $("#clear", el).addEventListener("click", () => { if (confirm("Ro'yxatni tozalaysizmi?")) { $("#names", el).value = ""; readNames(); } });
  const onKey = (e) => { if (e.code === "Space" && e.target.tagName !== "TEXTAREA" && e.target.tagName !== "INPUT") { e.preventDefault(); spin(); } };
  document.addEventListener("keydown", onKey);
  const ro = new ResizeObserver(draw); ro.observe(cv);
  readNames();
  return () => { cancelAnimationFrame(raf); ro.disconnect(); document.removeEventListener("keydown", onKey); };
}
