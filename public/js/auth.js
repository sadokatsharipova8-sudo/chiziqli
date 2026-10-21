// Kirish: talaba (login + parol, hisobni o'qituvchi yaratadi) va o'qituvchi (parol).
// Ikkalasi ham Cloudflare serverida tekshiriladi; brauzerda faqat imzolangan token saqlanadi.

import { store } from "./store.js";

const TKEY = "cag-teacher", SKEY = "cag-student";
let tVerified = null, sVerified = null; // sahifa yangilanguncha keshlanadi

const lsGet = (k) => { try { return localStorage.getItem(k) || ""; } catch { return ""; } };
const lsSet = (k, v) => { try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch {} };

async function post(url, body, headers = {}) {
  let r;
  try {
    r = await fetch(url, { method: "POST", headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(body || {}) });
  } catch {
    throw new Error("Server bilan bog'lanib bo'lmadi");
  }
  const data = await r.json().catch(() => ({}));
  if (!r.ok || data.error) throw new Error(data.error || "Xatolik (" + r.status + ")");
  return data;
}

export const teacherToken = () => lsGet(TKEY);
export const studentToken = () => lsGet(SKEY);

/** Kirish qilinganmi. Tezkor, serverga murojaat qilmaydi. */
export const isLoggedIn = () => !!teacherToken() || !!studentToken();

/** Saqlangan o'qituvchi tokeni muddati o'tmaganmi (faqat ko'rinish uchun). */
export const looksTeacher = () => +teacherToken().split(".")[0] > Date.now();

// ---------- O'qituvchi ----------
export async function isTeacher() {
  const token = teacherToken();
  if (!token) return false;
  if (tVerified?.token === token) return tVerified.ok;
  try {
    const { ok } = await post("/api/teacher/check", { token });
    tVerified = { token, ok: !!ok };
    if (!ok) logoutTeacher();
    return !!ok;
  } catch {
    return false;
  }
}

export async function teacherLogin(password) {
  const { token } = await post("/api/teacher/login", { password });
  lsSet(TKEY, token);
  tVerified = { token, ok: true };
  store.save(); // yon panelni yangilash
}

export function logoutTeacher() {
  lsSet(TKEY, "");
  tVerified = null;
}

/** O'qituvchi nomidan talabalar hisoblari API siga murojaat. */
export const teacherApi = (action, body) => post("/api/students/" + action, body, { "x-teacher-token": teacherToken() });

// ---------- Talaba ----------
function applyProfile({ name, group }) {
  const s = store.get();
  if (s.profile.name !== name || s.profile.group !== group) {
    s.profile.name = name;
    s.profile.group = group;
    store.save();
  }
}

export async function studentLogin(login, password) {
  const data = await post("/api/student/login", { login, password });
  lsSet(SKEY, data.token);
  sVerified = { token: data.token, ok: true };
  applyProfile(data);
  return data;
}

/**
 * Talaba tokenini serverda tekshiradi (sahifa ochilganda bir marta).
 * Hisob o'chirilgan yoki paroli tiklangan bo'lsa — false. Server javob bermasa, kirishni saqlab qoladi.
 */
export async function verifyStudent() {
  const token = studentToken();
  if (!token) return false;
  if (sVerified?.token === token) return sVerified.ok;
  try {
    const r = await post("/api/student/check", { token });
    sVerified = { token, ok: !!r.ok };
    if (r.ok) applyProfile(r);
    else lsSet(SKEY, "");
    return !!r.ok;
  } catch {
    return true; // tarmoq xatosi — oflayn holatda ham o'qishga ruxsat
  }
}

export const hasStudentAccount = () => !!studentToken();

export function logoutAll() {
  logoutTeacher();
  lsSet(SKEY, "");
  sVerified = null;
  const s = store.get();
  s.profile.name = "";
  s.profile.group = "";
  store.save();
}
