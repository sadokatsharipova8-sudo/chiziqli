// Kirish: talaba (F.I.Sh. + guruh, brauzerda saqlanadi) va o'qituvchi (parol Cloudflare serverida tekshiriladi).

import { store } from "./store.js";

const TKEY = "cag-teacher";
let verified = null; // { token, ok } — sahifa yangilanguncha keshlanadi

export const teacherToken = () => {
  try { return localStorage.getItem(TKEY) || ""; } catch { return ""; }
};

/** Kirish qilinganmi (talaba yoki o'qituvchi sifatida). Tezkor, serverga murojaat qilmaydi. */
export const isLoggedIn = () => !!teacherToken() || !!store.get().profile.name;

/** Saqlangan token muddati (serverga murojaatsiz, faqat ko'rinish uchun). */
export const looksTeacher = () => {
  const exp = +teacherToken().split(".")[0];
  return exp > Date.now();
};

/** O'qituvchi tokenini serverda tekshiradi. */
export async function isTeacher() {
  const token = teacherToken();
  if (!token) return false;
  if (verified?.token === token) return verified.ok;
  try {
    const r = await fetch("/api/teacher/check", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token }) });
    const { ok } = await r.json();
    verified = { token, ok: !!ok };
    if (!ok) logoutTeacher();
    return !!ok;
  } catch {
    return false; // server bilan aloqa yo'q
  }
}

export async function teacherLogin(password) {
  let r;
  try {
    r = await fetch("/api/teacher/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
  } catch {
    throw new Error("Server bilan bog'lanib bo'lmadi");
  }
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.token) throw new Error(data.error || "Kirib bo'lmadi");
  try { localStorage.setItem(TKEY, data.token); } catch {}
  verified = { token: data.token, ok: true };
  store.save(); // yon panelni yangilash uchun
}

export function logoutTeacher() {
  try { localStorage.removeItem(TKEY); } catch {}
  verified = null;
}

export function studentLogin(name, group) {
  const s = store.get();
  s.profile.name = name.trim();
  s.profile.group = group.trim();
  store.save();
}

export function logoutAll() {
  logoutTeacher();
  const s = store.get();
  s.profile.name = "";
  s.profile.group = "";
  store.save();
}
