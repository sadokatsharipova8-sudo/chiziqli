// O'qituvchi paneli: natijalarni tekshirish, variant kalitlari, bosma variantlar, kontent qo'shish yo'riqnomasi.

import { MUSTAQIL } from "../../content/mustaqil.js";
import { SAVOLLAR } from "../../content/savollar.js";
import { TOPICS, GENERATORS } from "../generators.js";
import { buildVariant, verifyCode } from "./mustaqil.js";
import { renderChapter } from "./darslik.js";
import { $, $$, esc, mathText, answerTex, download, toast } from "../ui.js";
import { teacherApi } from "../auth.js";
import { getCovered, setCovered } from "../course.js";

const TABS = [["talabalar", "👥 Talabalar"], ["kurs", "📅 O'tilgan mavzular"], ["tekshirish", "✅ Natijalarni tekshirish"], ["kalit", "🔑 Variant kaliti"], ["bosma", "🖨 Bosma variantlar"], ["kontent", "📚 Darslik qo'shish"], ["bank", "❓ Savollar banki"]];

export function render(el, params) {
  const tab = TABS.some((t) => t[0] === params[0]) ? params[0] : "talabalar";
  el.innerHTML = `
    <div class="page-head no-print"><h1>👩‍🏫 O'qituvchi paneli</h1><p>Mustaqil ishlarni tekshirish, kalitlar, bosma variantlar va o'z darsligingizni platformaga joylash.</p></div>
    <div class="tabs no-print">${TABS.map(([id, n]) => `<a class="tab ${id === tab ? "active" : ""}" href="#/oqituvchi/${id}">${n}</a>`).join("")}</div>
    <div id="tbody"></div>`;
  ({ talabalar, kurs, tekshirish, kalit, bosma, kontent, bank })[tab]($("#tbody", el));
}

// ---------------- O'tilgan mavzular ----------------
async function kurs(box) {
  const cur = await getCovered();
  box.innerHTML = `
    <div class="grid g2">
      <div class="card">
        <h3>📅 Qaysi mavzugacha o'tildi?</h3>
        <p class="small muted">O'yinlar (jonli viktorina, g'ildirak, savollar taxtasi, sprint, xotira) va takrorlash bo'limida faqat shu mavzugacha bo'lgan savollar chiqadi. Sozlama barcha talabalar uchun bir vaqtda o'zgaradi.</p>
        <select id="cov" style="width:100%">${TOPICS.map((t, i) => `<option value="${i + 1}" ${i + 1 === cur ? "selected" : ""}>1–${i + 1}-mavzular · oxirgisi: ${esc(t.name)}</option>`).join("")}</select>
        <div class="row mt"><button class="btn primary" id="save">Saqlash</button><button class="btn sm" id="next">➕ Keyingi mavzu o'tildi</button></div>
        <div id="msg" class="mt"></div>
      </div>
      <div class="card">
        <h3>Mavzular holati</h3>
        <div id="list" class="small"></div>
      </div>
    </div>`;
  const paint = (n) => {
    $("#list", box).innerHTML = TOPICS.map((t, i) => `<div style="padding:3px 0;${i < n ? "" : "opacity:.5"}">${i < n ? "✅" : "🔒"} <b>${i + 1}.</b> ${esc(t.name)}</div>`).join("");
  };
  paint(cur);
  $("#cov", box).addEventListener("change", (e) => paint(+e.target.value));
  const save = async (n) => {
    try {
      const v = await setCovered(n);
      $("#cov", box).value = String(v);
      paint(v);
      $("#msg", box).innerHTML = `<div class="result-banner ok">Saqlandi: o'yinlarda 1–${v}-mavzular savollari chiqadi.</div>`;
    } catch (err) {
      $("#msg", box).innerHTML = `<div class="result-banner bad">${esc(err.message)}</div>`;
    }
  };
  $("#save", box).addEventListener("click", () => save(+$("#cov", box).value));
  $("#next", box).addEventListener("click", () => save(Math.min(TOPICS.length, +$("#cov", box).value + 1)));
}

// ---------------- Talabalar hisoblari ----------------
const csvCell = (x) => `"${String(x ?? "").replace(/"/g, '""')}"`;
const fmtDate = (t) => (t ? new Date(t).toLocaleString("uz-UZ", { dateStyle: "short", timeStyle: "short" }) : "—");

function credCards(list) {
  const site = location.host;
  return `<div class="cred-grid">${list.map((s) => `
    <div class="cred-card">
      <b>${esc(s.name)}</b><span class="muted small">${esc(s.group)}</span>
      <div class="small">Sayt: <span class="mono">${esc(site)}</span></div>
      <div>Login: <span class="mono">${esc(s.login)}</span></div>
      <div>Parol: <span class="mono">${esc(s.password)}</span></div>
    </div>`).join("")}</div>`;
}

function talabalar(box) {
  box.innerHTML = `
    <div class="grid g2 no-print">
      <div class="card">
        <h3>➕ Hisob yaratish</h3>
        <p class="small muted">Guruhni yozing va talabalar ro'yxatini joylang (har qatorda bitta: <b>Familiya Ism</b>). Har biriga login va parol avtomatik yaratiladi.</p>
        <div class="stack">
          <input id="cg" placeholder="Guruh (masalan, 101-26)" maxlength="20">
          <textarea id="cn" placeholder="Aliyev Vali&#10;Karimova Malika&#10;..."></textarea>
          <button class="btn primary" id="create">Hisoblarni yaratish</button>
        </div>
      </div>
      <div class="card">
        <h3>ℹ️ Qanday ishlaydi</h3>
        <ol class="small" style="padding-left:18px;margin:0">
          <li>Hisob yaratilgach parollar <b>faqat bir marta</b> ko'rsatiladi — darhol chop eting yoki CSV yuklab oling.</li>
          <li>Talaba saytga login va parol bilan kiradi; F.I.Sh. va guruh hisobdan olinadi, ularni o'zgartira olmaydi.</li>
          <li>Parolni unutgan talabaga ro'yxatdan «🔑 Yangi parol» bering — eski parol va kirgan qurilmalari bekor bo'ladi.</li>
          <li>Ro'yxatda allaqachon bor talaba qayta qo'shilmaydi.</li>
        </ol>
      </div>
    </div>
    <div id="created"></div>
    <div class="card mt no-print">
      <div class="row between"><h3 style="margin:0">📋 Talabalar ro'yxati</h3>
        <div class="row"><select id="fg"><option value="">Barcha guruhlar</option></select><button class="btn sm" id="reload">↻ Yangilash</button></div></div>
      <div id="list" class="mt"><p class="muted">Yuklanmoqda…</p></div>
    </div>`;

  const showCreated = (rows, title) => {
    const fresh = rows.filter((r) => r.password);
    const skipped = rows.filter((r) => r.existed);
    if (!fresh.length) {
      $("#created", box).innerHTML = `<div class="card mt no-print"><p class="muted" style="margin:0">Yangi hisob yaratilmadi${skipped.length ? `: ${skipped.length} ta talaba allaqachon ro'yxatda bor` : ""}.</p></div>`;
      return;
    }
    $("#created", box).innerHTML = `
      <div class="card mt">
        <div class="row between no-print"><h3 style="margin:0">🔐 ${esc(title)}</h3>
          <div class="row"><button class="btn primary sm" id="pr">🖨 Chop etish</button><button class="btn sm" id="dl">⬇️ CSV</button></div></div>
        <p class="small no-print" style="color:var(--bad)">Parollar faqat hozir ko'rinadi — sahifadan chiqishdan oldin chop eting yoki saqlang.${skipped.length ? ` ${skipped.length} ta talaba ro'yxatda allaqachon bor edi va qayta yaratilmadi.` : ""}</p>
        ${credCards(fresh)}
      </div>`;
    $("#pr", box).addEventListener("click", () => window.print());
    $("#dl", box).addEventListener("click", () => download(`loginlar-${fresh[0].group}.csv`, "﻿F.I.Sh.;Guruh;Login;Parol;Sayt\n" + fresh.map((r) => [r.name, r.group, r.login, r.password, location.host].map(csvCell).join(";")).join("\n"), "text/csv"));
  };

  let all = [];
  const paint = () => {
    const g = $("#fg", box).value;
    const rows = all.filter((r) => !g || r.group === g);
    $("#list", box).innerHTML = rows.length
      ? `<table class="tbl"><thead><tr><th>#</th><th>F.I.Sh.</th><th>Guruh</th><th>Login</th><th>Oxirgi kirish</th><th></th></tr></thead><tbody>
        ${rows.map((r, i) => `<tr><td>${i + 1}</td><td>${esc(r.name)}</td><td>${esc(r.group)}</td><td class="mono">${esc(r.login)}</td><td class="small">${fmtDate(r.lastLogin)}</td>
          <td class="row" style="flex-wrap:nowrap"><button class="btn sm" data-reset="${esc(r.login)}">🔑 Yangi parol</button><button class="btn sm danger" data-del="${esc(r.login)}" title="O'chirish">🗑</button></td></tr>`).join("")}
        </tbody></table>
        ${g ? `<div class="row mt"><button class="btn sm danger" id="delg">🗑 «${esc(g)}» guruhini butunlay o'chirish</button></div>` : ""}`
      : `<p class="muted">Hali hisob yo'q. Yuqorida guruh ro'yxatini joylab, hisob yarating.</p>`;
    $("#delg", box)?.addEventListener("click", async () => {
      if (!confirm(`«${g}» guruhidagi barcha ${rows.length} ta hisob o'chiriladi. Davom etasizmi?`)) return;
      try { await teacherApi("delete", { group: g }); toast("Guruh o'chirildi"); load(); } catch (e) { toast(esc(e.message)); }
    });
  };
  const load = async () => {
    try {
      all = await teacherApi("list");
      const groups = [...new Set(all.map((r) => r.group))];
      const cur = $("#fg", box).value;
      $("#fg", box).innerHTML = `<option value="">Barcha guruhlar (${all.length})</option>` + groups.map((g) => `<option ${g === cur ? "selected" : ""}>${esc(g)}</option>`).join("");
      paint();
    } catch (e) {
      $("#list", box).innerHTML = `<div class="result-banner bad">${esc(e.message)}</div>`;
    }
  };

  $("#fg", box).addEventListener("change", paint);
  $("#reload", box).addEventListener("click", load);
  $("#list", box).addEventListener("click", async (e) => {
    const rs = e.target.closest("[data-reset]")?.dataset.reset, dl = e.target.closest("[data-del]")?.dataset.del;
    try {
      if (rs) {
        if (!confirm(`${rs} uchun yangi parol yaratilsinmi? Eski parol ishlamay qoladi.`)) return;
        const r = await teacherApi("reset", { login: rs });
        showCreated([r], "Yangi parol");
        $("#created", box).scrollIntoView({ behavior: "smooth" });
      } else if (dl) {
        if (!confirm(`${dl} hisobi o'chirilsinmi?`)) return;
        await teacherApi("delete", { login: dl });
        toast("O'chirildi");
        load();
      }
    } catch (err) { toast(esc(err.message)); }
  });
  $("#create", box).addEventListener("click", async (e) => {
    const group = $("#cg", box).value.trim();
    const names = $("#cn", box).value.split("\n").map((s) => s.trim().replace(/\s+/g, " ")).filter(Boolean);
    if (!group) return toast("Guruhni yozing");
    if (!names.length) return toast("Talabalar ro'yxatini joylang");
    const bad = names.filter((n) => n.split(" ").length < 2);
    if (bad.length && !confirm(`${bad.length} ta qatorda faqat bitta so'z bor (masalan, «${bad[0]}»). Baribir davom etilsinmi?`)) return;
    e.target.disabled = true;
    try {
      const r = await teacherApi("create", { group, names });
      showCreated(r.students, `${group} guruhi uchun loginlar`);
      $("#cn", box).value = "";
      load();
    } catch (err) { toast(esc(err.message)); }
    e.target.disabled = false;
  });
  load();
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
