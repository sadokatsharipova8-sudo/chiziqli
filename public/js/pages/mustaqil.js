// Mustaqil ish: har bir talabaga F.I.Sh + guruh asosida shaxsiy variant, natija va tasdiqlash kodi.

import { MUSTAQIL, TUZ } from "../../content/mustaqil.js";
import { genById } from "../generators.js";
import { makeRng, hashStr } from "../math.js";
import { store, addXP, setBest } from "../store.js";
import { hasStudentAccount } from "../auth.js";
import { mathText, answerInputs, checkInputs, answerTex, $, $$, esc, toast, modal, confetti, fmtTime } from "../ui.js";

export const norm = (s) => String(s || "").toLowerCase().replace(/[ʻʼ'`’‘]/g, "").replace(/\s+/g, " ").trim();

export function buildVariant(work, name, group) {
  const seed = hashStr(`${norm(name)}|${norm(group)}|${work.id}`);
  const rng = makeRng(seed);
  return {
    variant: (seed % 900) + 100,
    items: work.masalalar.map((gid) => {
      const gen = genById(gid);
      if (!gen) return null;
      return { gen, p: gen.gen(rng) };
    }).filter(Boolean),
  };
}

export function verifyCode(workId, name, group, score) {
  return hashStr(`${TUZ}|${workId}|${norm(name)}|${norm(group)}|${score}`).toString(36).slice(-6).toUpperCase();
}

const draftKey = (id, name, group) => `cag-draft-${id}-${hashStr(norm(name) + "|" + norm(group))}`;
const readJSON = (k) => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch { return null; } };
const writeJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export function render(el, params) {
  const id = params[0];
  const work = id && MUSTAQIL.find((w) => w.id === id);
  if (work) return renderWork(el, work);
  renderList(el);
}

function profileForm(s) {
  if (hasStudentAccount() && s.profile.name) return `<div class="card mb">
    <h3>👤 ${esc(s.profile.name)} · ${esc(s.profile.group)}</h3>
    <p class="small muted" style="margin:0">Variant hisobingizdagi F.I.Sh. va guruh asosida tuziladi. Xato bo'lsa — o'qituvchiga murojaat qiling.</p></div>`;
  return `<div class="card mb">
    <h3>👤 Talaba ma'lumotlari</h3>
    <p class="small muted">Variant aynan shu ma'lumotlar asosida tuziladi — o'qituvchiga beradigan F.I.Sh. va guruhingizni aniq yozing.</p>
    <div class="row">
      <input id="pf-name" placeholder="Familiya Ism" value="${esc(s.profile.name)}" style="flex:2;min-width:200px">
      <input id="pf-group" placeholder="Guruh (masalan, 101-21)" value="${esc(s.profile.group)}" style="flex:1;min-width:140px">
      <button class="btn primary" id="pf-save">Saqlash</button>
    </div></div>`;
}

function renderList(el) {
  const s = store.get();
  const results = readJSON("cag-results") || {};
  el.innerHTML = `
    <div class="page-head"><h1>📝 Mustaqil ish</h1>
      <p>Har bir talaba <b>o'z shaxsiy variant</b>ini oladi: masalalar bir xil turda, ammo sonlar har xil — ko'chirib bo'lmaydi. Topshirgach natija va <b>tasdiqlash kodi</b> chiqadi; uni o'qituvchiga yuborasiz.</p></div>
    ${profileForm(s)}
    ${[1, 2].map((sem) => `<h2 class="mt">${sem}-semestr. ${sem === 1 ? "Chiziqli algebra" : "Analitik geometriya"}</h2>
    <div class="grid g2">
      ${MUSTAQIL.filter((w) => (w.sem || 1) === sem).map((w) => {
        const r = results[w.id];
        const late = w.muddat && w.muddat < new Date().toISOString().slice(0, 10);
        return `<div class="card">
          <div class="row between"><span class="pill primary">${esc(w.id)}</span>${w.muddat ? `<span class="pill" style="${late ? "color:var(--bad)" : ""}">📅 ${esc(w.muddat)}</span>` : ""}</div>
          <h3 class="mt">${esc(w.nomi)}</h3>
          <p class="muted small">${w.masalalar.length} ta masala${w.daqiqa ? ` · ⏱ ${w.daqiqa} daqiqa` : ""}</p>
          ${r ? `<p class="small">✓ Topshirilgan: <b>${r.score}%</b> · kod <span class="mono">${esc(r.code)}</span></p>` : ""}
          <a class="btn ${r ? "" : "primary"}" href="#/mustaqil/${encodeURIComponent(w.id)}">${r ? "Ko'rish / qayta" : "Boshlash →"}</a>
        </div>`;
      }).join("")}
    </div>`).join("")}`;
  $("#pf-save", el)?.addEventListener("click", () => {
    const st = store.get();
    st.profile.name = $("#pf-name", el).value.trim();
    st.profile.group = $("#pf-group", el).value.trim();
    store.save();
    toast("Saqlandi ✓");
  });
}

function renderWork(el, work) {
  const s = store.get();
  const { name, group } = s.profile;
  if (!name || !group) {
    el.innerHTML = `<a class="btn ghost mb" href="#/mustaqil">← Orqaga</a>${profileForm(s)}`;
    $("#pf-save", el).addEventListener("click", () => {
      s.profile.name = $("#pf-name", el).value.trim();
      s.profile.group = $("#pf-group", el).value.trim();
      if (!s.profile.name || !s.profile.group) return toast("Ikkala maydonni to'ldiring");
      store.save();
      renderWork(el, work);
    });
    return;
  }

  const { variant, items } = buildVariant(work, name, group);
  const dk = draftKey(work.id, name, group);
  const draft = readJSON(dk) || { answers: {}, started: Date.now() };
  writeJSON(dk, draft);

  el.innerHTML = `
    <div class="row between mb no-print"><a class="btn ghost" href="#/mustaqil">← Mustaqil ishlar</a><span class="pill" id="timer"></span></div>
    <div class="card mb">
      <div class="row between"><div><h1 style="margin:0">${esc(work.nomi)}</h1>
      <p class="muted" style="margin:4px 0 0">${esc(name)} · ${esc(group)} · <b>Variant ${variant}</b></p></div>
      <span class="pill primary">${esc(work.id)}</span></div>
      <p class="small muted mt" style="margin-bottom:0">Kasr javoblarni <span class="mono">3/4</span> ko'rinishida yozing. Javoblaringiz shu qurilmada avtomatik saqlanadi.</p>
    </div>
    <div class="stack" id="items">
      ${items.map((it, i) => `
        <div class="card problem" data-i="${i}">
          <div class="row between"><b>${i + 1}-masala</b><span class="pill">${esc(it.gen.title)}</span></div>
          <div class="problem-q">${mathText(it.p.q)}</div>
          <div class="answer">${answerInputs(it.p.answer)}</div>
          <div class="item-res"></div>
        </div>`).join("")}
    </div>
    <div class="row mt no-print"><button class="btn primary lg" id="submit">📤 Topshirish</button></div>
    <div id="cert" class="mt"></div>`;

  // qoralamani tiklash
  $$(".problem", el).forEach((card) => {
    const saved = draft.answers[card.dataset.i] || [];
    $$(".ans-in", card).forEach((inp, k) => { if (saved[k] != null) inp.value = saved[k]; });
  });
  el.addEventListener("input", (e) => {
    const card = e.target.closest(".problem");
    if (!card) return;
    draft.answers[card.dataset.i] = $$(".ans-in", card).map((x) => x.value);
    writeJSON(dk, draft);
  });

  let timerId = null, submitted = false;
  if (work.daqiqa) {
    const end = draft.started + work.daqiqa * 60000;
    const tick = () => {
      const left = Math.max(0, (end - Date.now()) / 1000);
      $("#timer", el).textContent = `⏱ ${fmtTime(left)}`;
      if (left <= 0 && !submitted) { clearInterval(timerId); toast("Vaqt tugadi — ish avtomatik topshirildi", "info", 4000); submit(true); }
    };
    tick();
    timerId = setInterval(tick, 1000);
  } else $("#timer", el).textContent = "⏱ Vaqt cheklanmagan";

  function submit(force) {
    if (submitted) return;
    if (!force) {
      const empty = $$(".ans-in", el).filter((x) => !x.value.trim()).length;
      if (empty && !confirm(`${empty} ta maydon bo'sh. Baribir topshirasizmi?`)) return;
    }
    submitted = true;
    clearInterval(timerId);
    let right = 0;
    items.forEach((it, i) => {
      const card = el.querySelector(`.problem[data-i="${i}"]`);
      const res = checkInputs(card, it.p.answer);
      if (res.ok) right++;
      $$(".ans-in", card).forEach((inp, k) => { inp.disabled = true; inp.classList.add(res.cells[k] ? "ok" : "bad"); });
      $(".item-res", card).innerHTML = res.ok
        ? `<div class="result-banner ok">✓ To'g'ri</div>`
        : `<div class="result-banner bad">✗ Noto'g'ri. To'g'ri javob: ${mathText("$" + answerTex(it.p.answer) + "$")}</div>
           <details class="solution-box mt"><summary><b>Yechimni ko'rish</b></summary><ol>${it.p.solution.map((s) => `<li>${mathText(s)}</li>`).join("")}</ol></details>`;
    });
    const score = Math.round((right / items.length) * 100);
    const code = verifyCode(work.id, name, group, score);
    const results = readJSON("cag-results") || {};
    results[work.id] = { score, code, at: new Date().toISOString() };
    writeJSON("cag-results", results);
    try { localStorage.removeItem(dk); } catch {}
    setBest("selfwork", score);
    addXP(20 + right * 10, "mustaqil ish");
    if (score >= 80) confetti();
    $("#submit", el).hidden = true;
    const report = `${work.id} | ${name} | ${group} | Variant ${variant} | Natija: ${right}/${items.length} (${score}%) | Kod: ${code}`;
    $("#cert", el).innerHTML = `
      <div class="card cert">
        <div class="muted small">Mustaqil ish natijasi</div>
        <h2>${esc(work.nomi)}</h2>
        <p><b>${esc(name)}</b> · ${esc(group)} · Variant ${variant}</p>
        <div class="k-big">${right} / ${items.length} · ${score}%</div>
        <p class="muted small">Tasdiqlash kodi</p>
        <div class="code-big">${code}</div>
        <p class="small muted">${new Date().toLocaleString("uz-UZ")}</p>
        <div class="row no-print" style="justify-content:center">
          <button class="btn primary" id="copy">📋 Natijani nusxalash</button>
          <button class="btn" onclick="window.print()">🖨 Chop etish / PDF</button>
        </div>
      </div>`;
    $("#copy", el).addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(report); toast("Nusxalandi — o'qituvchiga yuboring"); }
      catch { modal(`<p>Quyidagi matnni nusxalang:</p><textarea readonly>${esc(report)}</textarea>`); }
    });
    $("#cert", el).scrollIntoView({ behavior: "smooth" });
  }
  $("#submit", el).addEventListener("click", () => submit(false));
  return () => clearInterval(timerId);
}
