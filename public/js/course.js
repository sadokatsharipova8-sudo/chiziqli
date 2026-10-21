// Kurs holati: qaysi mavzugacha o'tilgan (o'qituvchi belgilaydi, serverda saqlanadi)
// va o'yinlar uchun mavzu tanlash komponenti.

import { TOPICS } from "./generators.js";
import { esc } from "./ui.js";
import { looksTeacher, teacherToken } from "./auth.js";

const LKEY = "cag-covered";
let cache = null;

const lsGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

/** Nechanchi mavzugacha o'tilgan (1..18). Belgilanmagan bo'lsa — barcha mavzular. */
export async function getCovered() {
  if (cache != null) return cache;
  try {
    const r = await fetch("/api/settings", { cache: "no-store" });
    const { covered } = await r.json();
    if (covered) lsSet(LKEY, String(covered));
    cache = covered || TOPICS.length;
  } catch {
    cache = +lsGet(LKEY) || TOPICS.length; // oflayn yoki mahalliy sinov
  }
  return Math.min(cache, TOPICS.length);
}

export async function setCovered(n) {
  const r = await fetch("/api/settings", {
    method: "POST",
    headers: { "content-type": "application/json", "x-teacher-token": teacherToken() },
    body: JSON.stringify({ covered: n }),
  }).catch(() => null);
  const data = r ? await r.json().catch(() => ({})) : {};
  if (!r || !r.ok || data.error) throw new Error(data.error || "Server bilan bog'lanib bo'lmadi");
  cache = data.covered;
  lsSet(LKEY, String(cache));
  return cache;
}

export const topicNo = (id) => TOPICS.findIndex((t) => t.id === id) + 1;

/** O'tilgan mavzular id lari. */
export async function coveredIds() {
  const n = await getCovered();
  return TOPICS.slice(0, n).map((t) => t.id);
}

/**
 * Mavzu tanlash komponenti.
 *  key      — tanlovni eslab qolish uchun kalit (o'yin nomi)
 *  only     — faqat shu mavzular ko'rsatiladi (masalan, sprint uchun generatori borlari)
 *  max      — eng ko'p tanlash mumkin bo'lgan mavzular soni
 * Talaba o'tilmagan mavzuni tanlay olmaydi; o'qituvchi tanlay oladi (belgi bilan).
 * Qaytaradi: { get(): string[] }
 */
export async function topicPicker(box, { key, only = null, max = 0, onChange } = {}) {
  const covered = await getCovered();
  const teacher = looksTeacher();
  const list = TOPICS.map((t, i) => ({ ...t, no: i + 1, open: i < covered })).filter((t) => !only || only.includes(t.id));
  let saved = null;
  try { saved = JSON.parse(lsGet("cag-pick-" + key) || "null"); } catch {}
  const allowed = (t) => t.open || teacher;
  let sel = new Set((saved || list.filter((t) => t.open).map((t) => t.id)).filter((id) => list.some((t) => t.id === id && allowed(t))));
  if (max && sel.size > max) sel = new Set([...sel].slice(-max));

  const paint = () => {
    box.innerHTML = `
      <div class="row between small" style="gap:6px;flex-wrap:wrap">
        <span class="muted">${covered < TOPICS.length ? `O'tilgan mavzular: <b>1–${covered}</b>` : "Barcha mavzular ochiq"}${max ? ` · ko'pi bilan ${max} ta` : ""}</span>
        <span class="row" style="gap:6px">
          <button type="button" class="btn sm" data-pick="covered">✓ O'tilganlar</button>
          ${max ? "" : `<button type="button" class="btn sm" data-pick="none">Tozalash</button>`}
        </span>
      </div>
      <div class="topic-chips mt">${list.map((t) => `
        <label class="topic-chip ${sel.has(t.id) ? "on" : ""} ${t.open ? "" : "closed"}" title="${t.open ? "" : "Hali o'tilmagan"}">
          <input type="checkbox" value="${t.id}" ${sel.has(t.id) ? "checked" : ""} ${allowed(t) ? "" : "disabled"}>
          <b>${t.no}</b> ${esc(t.name)}${t.open ? "" : " 🔒"}
        </label>`).join("")}</div>
      ${list.length && !list.some((t) => t.open) ? `<p class="small muted mt">Bu o'yin uchun mos mavzular hali o'tilmagan.</p>` : ""}`;
  };
  const save = () => { lsSet("cag-pick-" + key, JSON.stringify([...sel])); onChange?.([...sel]); };
  box.addEventListener("change", (e) => {
    const cb = e.target.closest("input[type=checkbox]");
    if (!cb) return;
    if (cb.checked) {
      sel.add(cb.value);
      if (max && sel.size > max) { const first = [...sel][0]; sel.delete(first); }
    } else sel.delete(cb.value);
    paint(); save();
  });
  box.addEventListener("click", (e) => {
    const b = e.target.closest("[data-pick]");
    if (!b) return;
    sel = b.dataset.pick === "none" ? new Set() : new Set(list.filter((t) => t.open).map((t) => t.id).slice(max ? -max : 0));
    paint(); save();
  });
  paint();
  return { get: () => list.filter((t) => sel.has(t.id)).map((t) => t.id) };
}

/** Yorliqlar uchun: «1, 2, 5-mavzular». */
export const topicsLabel = (ids) => ids.map(topicNo).sort((a, b) => a - b).join(", ") + "-mavzular";
