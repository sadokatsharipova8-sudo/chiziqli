// O'qituvchi paneli: natijalarni tekshirish, variant kalitlari, bosma variantlar, kontent qo'shish yo'riqnomasi.

import { MUSTAQIL } from "../../content/mustaqil.js";
import { SAVOLLAR } from "../../content/savollar.js";
import { TOPICS, GENERATORS } from "../generators.js";
import { buildVariant, verifyCode } from "./mustaqil.js";
import { renderChapter } from "./darslik.js";
import { $, $$, esc, mathText, answerTex, download } from "../ui.js";

const TABS = [["tekshirish", "✅ Natijalarni tekshirish"], ["kalit", "🔑 Variant kaliti"], ["bosma", "🖨 Bosma variantlar"], ["kontent", "📚 Darslik qo'shish"], ["bank", "❓ Savollar banki"]];

export function render(el, params) {
  const tab = TABS.some((t) => t[0] === params[0]) ? params[0] : "tekshirish";
  el.innerHTML = `
    <div class="page-head no-print"><h1>👩‍🏫 O'qituvchi paneli</h1><p>Mustaqil ishlarni tekshirish, kalitlar, bosma variantlar va o'z darsligingizni platformaga joylash.</p></div>
    <div class="tabs no-print">${TABS.map(([id, n]) => `<a class="tab ${id === tab ? "active" : ""}" href="#/oqituvchi/${id}">${n}</a>`).join("")}</div>
    <div id="tbody"></div>`;
  ({ tekshirish, kalit, bosma, kontent, bank })[tab]($("#tbody", el));
}

const workSel = (id = "w") => `<select id="${id}">${MUSTAQIL.map((w) => `<option value="${w.id}">${esc(w.id)} — ${esc(w.nomi)}</option>`).join("")}</select>`;

function tekshirish(box) {
  box.innerHTML = `
    <div class="grid g2">
      <div class="card">
        <h3>Bitta natijani tekshirish</h3>
        <div class="stack">
          ${workSel()}
          <input id="nm" placeholder="Familiya Ism">
          <input id="gr" placeholder="Guruh">
          <div class="row"><input id="sc" type="number" placeholder="Ball (%)" style="flex:1"><input id="cd" placeholder="Kod" style="flex:1;text-transform:uppercase"></div>
          <button class="btn primary" id="chk">Tekshirish</button>
          <div id="res"></div>
        </div>
      </div>
      <div class="card">
        <h3>Ommaviy tekshirish</h3>
        <p class="small muted">Talabalar yuborgan natija qatorlarini (Telegram, e-pochta…) shu yerga joylang — har bir qator avtomatik tekshiriladi.</p>
        <textarea id="bulk" placeholder="MI-1 | Aliyev Vali | 101-21 | Variant 345 | Natija: 5/6 (83%) | Kod: 7GQ2KD"></textarea>
        <div class="row mt"><button class="btn primary" id="bchk">Tekshirish</button><button class="btn" id="csv" hidden>⬇️ CSV</button></div>
      </div>
    </div>
    <div class="card mt" id="bres" hidden></div>`;
  $("#chk", box).addEventListener("click", () => {
    const ok = verifyCode($("#w", box).value, $("#nm", box).value, $("#gr", box).value, +$("#sc", box).value) === $("#cd", box).value.trim().toUpperCase();
    $("#res", box).innerHTML = `<div class="result-banner ${ok ? "ok" : "bad"}">${ok ? "✓ Kod haqiqiy" : "✗ Kod mos kelmadi (ism, guruh yoki ball noto'g'ri)"}</div>`;
  });
  let rows = [];
  $("#bchk", box).addEventListener("click", () => {
    rows = $("#bulk", box).value.split("\n").map((l) => l.trim()).filter(Boolean).map((line) => {
      const p = line.split("|").map((s) => s.trim());
      const score = +(line.match(/\((\d+)%\)/)?.[1] ?? NaN);
      const code = line.match(/Kod:\s*([A-Z0-9]+)/i)?.[1]?.toUpperCase() || "";
      const ok = p.length >= 3 && !isNaN(score) && verifyCode(p[0], p[1], p[2], score) === code;
      return { work: p[0], name: p[1] || "", group: p[2] || "", score, code, ok };
    });
    $("#bres", box).hidden = false;
    $("#csv", box).hidden = !rows.length;
    $("#bres", box).innerHTML = `<table class="tbl"><thead><tr><th>Ish</th><th>Talaba</th><th>Guruh</th><th>Ball</th><th>Kod</th><th>Holat</th></tr></thead><tbody>
      ${rows.map((r) => `<tr><td>${esc(r.work)}</td><td>${esc(r.name)}</td><td>${esc(r.group)}</td><td>${isNaN(r.score) ? "—" : r.score + "%"}</td><td class="mono">${esc(r.code)}</td><td>${r.ok ? '<b style="color:var(--ok)">✓ Haqiqiy</b>' : '<b style="color:var(--bad)">✗ Shubhali</b>'}</td></tr>`).join("")}</tbody></table>`;
  });
  $("#csv", box).addEventListener("click", () => download("natijalar.csv", "﻿Ish;Talaba;Guruh;Ball;Kod;Holat\n" + rows.map((r) => [r.work, r.name, r.group, r.score, r.code, r.ok ? "haqiqiy" : "shubhali"].map((x) => `"${String(x).replace(/"/g, '""')}"`).join(";")).join("\n"), "text/csv"));
}

function variantHtml(work, name, group, withKey) {
  const { variant, items } = buildVariant(work, name, group);
  return `<div class="card mb" style="break-after:page">
    <div class="row between"><b>${esc(work.id)} · ${esc(work.nomi)}</b><span>Variant ${variant}</span></div>
    <div class="muted small">${esc(name)} · ${esc(group)}</div>
    <ol>${items.map((it) => `<li style="margin:10px 0">${mathText(it.p.q)}${withKey ? `<div class="small" style="color:var(--ok)">Javob: ${mathText("$" + answerTex(it.p.answer) + "$")}</div>` : ""}</li>`).join("")}</ol></div>`;
}

function kalit(box) {
  box.innerHTML = `
    <div class="card mb no-print">
      <p class="small muted">Talabaning F.I.Sh. va guruhini aynan u kiritgandek yozing — xuddi o'sha variant va javoblar chiqadi.</p>
      <div class="row">${workSel()}<input id="nm" placeholder="Familiya Ism" style="flex:1"><input id="gr" placeholder="Guruh"><button class="btn primary" id="go">Ko'rsatish</button></div>
    </div><div id="out"></div>`;
  $("#go", box).addEventListener("click", () => {
    const w = MUSTAQIL.find((x) => x.id === $("#w", box).value);
    $("#out", box).innerHTML = variantHtml(w, $("#nm", box).value, $("#gr", box).value, true);
  });
}

function bosma(box) {
  box.innerHTML = `
    <div class="card mb no-print">
      <p class="small muted">Auditoriyada qog'ozda yozdirish uchun: guruh ro'yxatini kiriting — har bir talabaga shaxsiy variant va alohida javoblar kaliti tayyorlanadi.</p>
      <div class="row">${workSel()}<input id="gr" placeholder="Guruh"></div>
      <textarea id="names" class="mt" placeholder="Har qatorda bitta talaba: Familiya Ism"></textarea>
      <div class="row mt"><button class="btn primary" id="go">Tayyorlash</button><label class="row small"><input type="checkbox" id="key"> Javoblar bilan (kalit)</label><button class="btn" onclick="window.print()">🖨 Chop etish</button></div>
    </div><div id="out"></div>`;
  $("#go", box).addEventListener("click", () => {
    const w = MUSTAQIL.find((x) => x.id === $("#w", box).value), g = $("#gr", box).value;
    const names = $("#names", box).value.split("\n").map((s) => s.trim()).filter(Boolean);
    $("#out", box).innerHTML = names.map((n) => variantHtml(w, n, g, $("#key", box).checked)).join("") || `<p class="muted">Ro'yxat bo'sh</p>`;
  });
}

function kontent(box) {
  box.innerHTML = `
    <div class="grid g2">
      <div class="card">
        <h3>📚 O'z darsligingizni qanday joylash kerak</h3>
        <ol class="small" style="padding-left:18px">
          <li><b>Markdown (tavsiya):</b> har bir bob — <span class="mono">public/content/boblar/</span> papkasidagi alohida <span class="mono">.md</span> fayl. Formulalar <span class="mono">$...$</span> va <span class="mono">$$...$$</span> ichida (LaTeX).</li>
          <li>Bobni <span class="mono">public/content/boblar.json</span> ro'yxatiga qo'shing (id, fayl, nomi, mavzu).</li>
          <li><b>PDF:</b> faylni <span class="mono">public/content/darslik.pdf</span> qilib qo'ying va <span class="mono">boblar.json</span> da <span class="mono">"pdf": "content/darslik.pdf"</span> deb yozing — «Darslik» bo'limida PDF ko'rinishi paydo bo'ladi.</li>
          <li>GitHub'ga yuklang (commit/push) — Cloudflare 1–2 daqiqada saytni avtomatik yangilaydi.</li>
        </ol>
        <h3>Maxsus bloklar</h3>
        <pre class="mono small" style="background:var(--bg2);padding:12px;border-radius:10px;overflow-x:auto">:::tarif
Matn va $formula$
:::

:::teorema Kramer qoidasi
...
:::

:::savol
Savol matni?
+ To'g'ri javob
- Noto'g'ri javob
- Noto'g'ri javob
> Izoh (ixtiyoriy)
:::</pre>
        <p class="small muted">Bloklar: <span class="mono">tarif, teorema, misol, eslatma, xossa, diqqat, tarix, savol</span>.</p>
      </div>
      <div class="card">
        <div class="row between"><h3 style="margin:0">👁 Jonli ko'rib chiqish</h3><label class="btn sm">📂 .md faylni ochish<input type="file" id="file" accept=".md,.txt" hidden></label></div>
        <p class="small muted">Matnni yozing yoki joylang — natija pastda darhol ko'rinadi.</p>
        <textarea id="src" style="min-height:200px"># Yangi bob

:::tarif
Kvadrat matritsaning **izi** — diagonal elementlari yig'indisi: $\\operatorname{tr}A = \\sum a_{ii}$.
:::

:::savol
$\\operatorname{tr}\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$ = ?
+ $5$
- $10$
- $-2$
:::</textarea>
        <div class="prose card flat mt" id="prev" style="max-width:none"></div>
      </div>
    </div>`;
  const upd = () => renderChapter($("#prev", box), $("#src", box).value, "preview:");
  $("#src", box).addEventListener("input", upd);
  $("#file", box).addEventListener("change", async (e) => { const f = e.target.files[0]; if (f) { $("#src", box).value = await f.text(); upd(); } });
  upd();
}

function bank(box) {
  box.innerHTML = `
    <div class="card mb">
      <h3>Savollar banki: ${SAVOLLAR.length} ta savol · Generatorlar: ${GENERATORS.length} ta</h3>
      <p class="small muted">Yangi savollarni <span class="mono">public/content/savollar.js</span> fayliga qo'shing. Mustaqil ishlar — <span class="mono">public/content/mustaqil.js</span>.</p>
      <table class="tbl"><thead><tr><th>Mavzu</th><th>Savollar</th><th>Oson / O'rta / Qiyin</th><th>Generatorlar</th></tr></thead><tbody>
      ${TOPICS.map((t) => {
        const qs = SAVOLLAR.filter((q) => q.topic === t.id);
        return `<tr><td>${esc(t.name)}</td><td>${qs.length}</td><td>${[1, 2, 3].map((d) => qs.filter((q) => q.d === d).length).join(" / ")}</td><td class="small">${GENERATORS.filter((g) => g.topic === t.id).map((g) => `<span class="mono">${g.id}</span>`).join(", ")}</td></tr>`;
      }).join("")}</tbody></table>
    </div>
    <div class="card"><h3>Barcha savollar</h3><div class="stack">${SAVOLLAR.map((q) => `<div class="small" style="border-bottom:1px dashed var(--line);padding-bottom:8px"><span class="pill">${esc(q.id)}</span> ${mathText(q.q)} → <b style="color:var(--ok)">${mathText(q.options[q.correct])}</b></div>`).join("")}</div></div>`;
}
