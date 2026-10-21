// Taqdimotlar: har bir mavzu uchun slaydlar (public/content/taqdimotlar/NN.md, slaydlar "---" qatori bilan ajratiladi).
// #/taqdimot          — ro'yxat
// #/taqdimot/07/12    — 7-mavzu, 12-slayd

import { $, esc, toast } from "../ui.js";
import { loadManifest, renderChapter } from "./darslik.js";
import { topicById } from "../generators.js";

const cache = {};

export async function loadDeck(id) {
  if (cache[id]) return cache[id];
  const r = await fetch(`content/taqdimotlar/${id}.md`, { cache: "no-cache" });
  if (!r.ok) throw new Error("Taqdimot topilmadi");
  const text = (await r.text()).replace(/\r\n/g, "\n");
  return (cache[id] = text.split(/\n-{3,}[ \t]*\n/).map((s) => s.trim()).filter(Boolean));
}

export async function render(el, params) {
  const man = await loadManifest();
  const id = params[0];
  if (!id) return renderList(el, man);
  const idx = man.boblar.findIndex((b) => b.id === id);
  if (idx < 0) { location.hash = "#/taqdimot"; return; }
  return renderDeck(el, man, idx, Math.max(1, parseInt(params[1], 10) || 1));
}

async function renderList(el, man) {
  const counts = await Promise.all(man.boblar.map((b) => loadDeck(b.id).then((d) => d.length).catch(() => 0)));
  el.innerHTML = `
    <div class="page-head"><h1>🎞 Taqdimotlar</h1>
      <p>Har bir mavzu bo'yicha ma'ruza taqdimoti: ta'riflar, teoremalar, qadamma-qadam misollar va sinf bilan ishlash uchun savollar. Proyektorda <b>⛶ To'liq ekran</b> rejimida ko'rsating; slaydlar ← → tugmalari bilan almashadi.</p></div>
    ${[...new Set(man.boblar.map((b) => b.qism || ""))].map((qism) => `
      ${qism ? `<h2 class="mt">${esc(qism)}</h2>` : ""}
      <div class="grid g3">
      ${man.boblar.map((b, i) => [b, i]).filter(([b]) => (b.qism || "") === qism).map(([b, i]) => {
        const t = topicById(b.mavzu);
        return `<a class="tile" href="#/taqdimot/${b.id}" style="border-top:4px solid ${t?.color || "var(--primary)"}">
          <div class="row between"><span class="pill">${esc(b.id)}-mavzu</span><span class="small muted">🎞 ${counts[i]} slayd</span></div>
          <h3>${esc(b.nomi)}</h3><p>${t ? esc(t.name) : ""}</p></a>`;
      }).join("")}
      </div>`).join("")}`;
}

async function renderDeck(el, man, idx, start) {
  const bob = man.boblar[idx];
  const slides = await loadDeck(bob.id);
  let i = Math.min(start, slides.length) - 1;

  el.innerHTML = `
    <div class="deck-top no-print">
      <a class="btn ghost sm" href="#/taqdimot">← Taqdimotlar</a>
      <b class="deck-title">${esc(bob.id)}. ${esc(bob.nomi)}</b>
      <div class="row">
        <a class="btn sm" href="#/darslik/${bob.id}">📘 Darslik</a>
        <button class="btn sm" id="fs">⛶ To'liq ekran</button>
      </div>
    </div>
    <div class="deck" id="deck" tabindex="0">
      <div class="slide-frame"><article class="slide prose" id="slide"></article></div>
      <div class="deck-bar">
        <button class="btn sm" id="prev" aria-label="Oldingi slayd">←</button>
        <select id="jump" aria-label="Slaydga o'tish">${slides.map((s, k) => `<option value="${k}">${k + 1}. ${esc(slideTitle(s))}</option>`).join("")}</select>
        <span class="deck-count" id="cnt"></span>
        <button class="btn sm primary" id="next" aria-label="Keyingi slayd">→</button>
      </div>
      <div class="deck-progress"><i id="prog"></i></div>
    </div>`;

  const deck = $("#deck", el);
  const show = (k, push = true) => {
    i = Math.max(0, Math.min(slides.length - 1, k));
    renderChapter($("#slide", el), slides[i], `deck${bob.id}-${i}:`);
    $("#slide", el).classList.toggle("title-slide", i === 0);
    $("#cnt", el).textContent = `${i + 1} / ${slides.length}`;
    $("#jump", el).value = String(i);
    $("#prog", el).style.width = `${((i + 1) / slides.length) * 100}%`;
    $("#prev", el).disabled = i === 0;
    const last = i === slides.length - 1;
    const nb = man.boblar[idx + 1];
    $("#next", el).textContent = last ? (nb ? "Keyingi mavzu →" : "✓") : "→";
    $("#next", el).disabled = last && !nb;
    if (push) history.replaceState(null, "", `#/taqdimot/${bob.id}/${i + 1}`);
    $(".slide-frame", el).scrollTop = 0;
  };
  const next = () => {
    if (i < slides.length - 1) show(i + 1);
    else if (man.boblar[idx + 1]) location.hash = `#/taqdimot/${man.boblar[idx + 1].id}`;
  };
  const prev = () => show(i - 1);

  $("#next", el).addEventListener("click", next);
  $("#prev", el).addEventListener("click", prev);
  $("#jump", el).addEventListener("change", (e) => show(+e.target.value));
  $("#fs", el).addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else deck.requestFullscreen?.().catch(() => toast("To'liq ekran rejimi qo'llab-quvvatlanmaydi"));
  });

  const onKey = (e) => {
    if (e.target.closest?.("input, textarea, select") || e.ctrlKey || e.metaKey || e.altKey) return;
    if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); next(); }
    else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); prev(); }
    else if (e.key === "Home") show(0);
    else if (e.key === "End") show(slides.length - 1);
    else if (e.key === "f" || e.key === "F") $("#fs", el).click();
  };
  document.addEventListener("keydown", onKey);

  let x0 = null;
  deck.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  deck.addEventListener("touchend", (e) => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
    x0 = null;
  });

  show(i, false);
  deck.focus({ preventScroll: true });
  return () => {
    document.removeEventListener("keydown", onKey);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };
}

function slideTitle(src) {
  const m = src.match(/^#{1,3}\s+(.+)$/m);
  return (m ? m[1] : src.split("\n")[0]).replace(/\$[^$]*\$/g, "…").replace(/[*_`]/g, "").slice(0, 60);
}
