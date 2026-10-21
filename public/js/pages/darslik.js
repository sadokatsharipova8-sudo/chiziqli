import { md, renderMcq, $, $$, esc, toast } from "../ui.js";
import { store, addXP, markRead } from "../store.js";
import { topicById } from "../generators.js";

let manifestCache = null;
export async function loadManifest() {
  if (manifestCache) return manifestCache;
  const r = await fetch("content/boblar.json", { cache: "no-cache" });
  if (!r.ok) throw new Error("content/boblar.json topilmadi");
  manifestCache = await r.json();
  return manifestCache;
}

const answered = new Set();

/** Markdown matnni elementga chizadi va ichidagi savollarni jonlantiradi. */
export function renderChapter(target, text, keyPrefix = "") {
  const { html, mcqs } = md(text);
  target.innerHTML = html;
  $$(".mcq", target).forEach((box) => {
    const i = +box.dataset.mcq;
    const item = mcqs[i];
    if (!item || item.options.length < 2) { box.remove(); return; }
    renderMcq(box, item, {
      onAnswer: (ok) => {
        const key = keyPrefix + i;
        if (ok && !answered.has(key)) { answered.add(key); addXP(5, "darslikdagi savol"); }
      },
    });
  });
}

export async function render(el, params) {
  const man = await loadManifest();
  const list = man.boblar;
  const id = params[0] || null;
  const s = store.get();

  const toc = `
    <div class="card flat toc">
      <div class="small muted" style="padding:4px 10px 8px">${esc(man.kitob.nomi)}</div>
      ${man.kitob.pdf ? `<a href="#/darslik/pdf" class="${id === "pdf" ? "active" : ""}">📄 PDF darslik</a>` : ""}
      ${list.map((b) => `<a href="#/darslik/${b.id}" class="${b.id === id ? "active" : ""} ${s.read[b.id] ? "done" : ""}"><b>${esc(b.id)}</b> ${esc(b.nomi)}</a>`).join("")}
    </div>`;

  if (!id) {
    const readCount = list.filter((b) => s.read[b.id]).length;
    el.innerHTML = `
      <div class="page-head">
        <h1>📘 Darslik</h1>
        <p>${esc(man.kitob.nomi)} · <span class="muted">${esc(man.kitob.muallif || "")}</span></p>
        <div class="row"><span class="pill primary">${readCount}/${list.length} bob o'qildi</span>${man.kitob.pdf ? `<a class="btn sm" href="#/darslik/pdf">📄 PDF ko'rinishida ochish</a>` : ""}</div>
      </div>
      ${[...new Set(list.map((b) => b.qism || ""))].map((qism) => `
        ${qism ? `<h2 class="mt">${esc(qism)}</h2>` : ""}
        <div class="grid g3">
        ${list.filter((b) => (b.qism || "") === qism).map((b) => {
          const t = topicById(b.mavzu);
          return `<a class="tile" href="#/darslik/${b.id}" style="border-top:4px solid ${t?.color || "var(--primary)"}">
            <div class="row between"><span class="pill">${esc(b.id)}-mavzu</span>${s.read[b.id] ? '<span class="pill" style="color:var(--ok)">✓ O\'qildi</span>' : `<span class="small muted">~${b.daqiqa || 20} daqiqa</span>`}</div>
            <h3>${esc(b.nomi)}</h3>
            <p>${t ? esc(t.name) : ""}</p></a>`;
        }).join("")}
        </div>`).join("")}
      <div class="card mt">
        <h3>📖 Darslikdan qanday samarali foydalanish kerak?</h3>
        <p class="muted" style="margin:0">1) Bobni o'qing va har bir <b>«O'zingizni tekshiring»</b> savoliga javob bering — bu xotirada saqlab qolishni kuchaytiradi (retrieval practice). 2) Laboratoriyada formulani «ko'ring». 3) Mashqlar bo'limida mavzuni «Ustoz» darajasigacha yetkazing. 4) Bir necha kundan so'ng Takrorlash bo'limiga qayting.</p>
      </div>`;
    return;
  }

  if (id === "pdf") {
    el.innerHTML = `<div class="reader">${toc}<div><h1>📄 PDF darslik</h1>
      <iframe class="pdf-frame" src="${esc(man.kitob.pdf)}" title="PDF darslik"></iframe>
      <p class="small muted mt">Ko'rinmasa: <a href="${esc(man.kitob.pdf)}" target="_blank" rel="noopener">yangi oynada ochish</a></p></div></div>`;
    return;
  }

  const idx = list.findIndex((b) => b.id === id);
  if (idx < 0) { location.hash = "#/darslik"; return; }
  const bob = list[idx];
  el.innerHTML = `<div class="reader">${toc}<div><article class="prose" id="prose"><p class="muted">Yuklanmoqda…</p></article><div id="chapter-foot"></div></div></div>`;

  const r = await fetch("content/" + bob.fayl, { cache: "no-cache" });
  const text = r.ok ? await r.text() : `# ${bob.nomi}\n\nFayl topilmadi: \`content/${bob.fayl}\``;
  renderChapter($("#prose", el), text, bob.id + ":");

  const prev = list[idx - 1], next = list[idx + 1];
  const t = topicById(bob.mavzu);
  $("#chapter-foot", el).innerHTML = `
    <div class="card mt" style="max-width:760px">
      <h3>Bobni yakunladingizmi?</h3>
      <p class="muted">Bilimni mustahkamlash uchun keyingi qadam — mavzu bo'yicha mashq.</p>
      <div class="row">
        <button class="btn ${s.read[bob.id] ? "" : "primary"}" id="mark-read">${s.read[bob.id] ? "✓ O'qilgan" : "✓ O'qidim (+30 XP)"}</button>
        ${t ? `<a class="btn" href="#/mashq/${t.id}">🎯 «${esc(t.name)}» bo'yicha mashq</a>` : ""}
      </div>
    </div>
    <div class="chapter-nav" style="max-width:760px">
      ${prev ? `<a class="btn" href="#/darslik/${prev.id}">← ${esc(prev.nomi)}</a>` : "<span></span>"}
      ${next ? `<a class="btn primary" href="#/darslik/${next.id}">${esc(next.nomi)} →</a>` : ""}
    </div>`;
  $("#mark-read", el).addEventListener("click", (e) => {
    if (markRead(bob.id)) { addXP(30, "bob o'qildi"); e.target.textContent = "✓ O'qilgan"; e.target.classList.remove("primary"); }
    else toast("Bu bob allaqachon belgilangan");
  });
}
