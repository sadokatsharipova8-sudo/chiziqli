// Talabaning shaxsiy progressi (brauzerda saqlanadi): XP, daraja, seriya, mavzular bo'yicha o'zlashtirish,
// takrorlash (Leitner qutilari), nishonlar.

const KEY = "cag-progress-v1";
const listeners = new Set();

const fresh = () => ({
  profile: { name: "", group: "" },
  xp: 0,
  days: [],
  streak: 0,
  mastery: {},
  attempts: {},
  leitner: {},
  read: {},
  badges: [],
  best: {},
  log: [],
});

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...fresh(), ...JSON.parse(raw) };
  } catch {}
  return fresh();
}

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  listeners.forEach((fn) => fn(state));
}

export const store = {
  get: () => state,
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  save: persist,
  reset() { state = fresh(); persist(); },
  export() { return JSON.stringify(state); },
  import(json) { state = { ...fresh(), ...JSON.parse(json) }; persist(); },
};

export const today = () => new Date().toISOString().slice(0, 10);

export const LEVELS = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000, 6500, 8500, 11000];
export const LEVEL_NAMES = ["Yangi boshlovchi", "Izlanuvchi", "Vektorchi", "Matritsachi", "Determinant bilimdoni", "Gauss shogirdi", "Bazis ustasi", "Fazolar sayyohi", "Xos qiymat ovchisi", "Algebra ritsari", "Geometriya sardori", "Professor", "Akademik"];

export function levelInfo(xp = state.xp) {
  let lvl = 0;
  while (lvl + 1 < LEVELS.length && xp >= LEVELS[lvl + 1]) lvl++;
  const cur = LEVELS[lvl], next = LEVELS[lvl + 1] ?? cur + 3000;
  return { level: lvl + 1, name: LEVEL_NAMES[lvl], cur, next, pct: Math.min(100, ((xp - cur) / (next - cur)) * 100) };
}

function touchDay() {
  const d = today();
  if (state.days[state.days.length - 1] === d) return;
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  state.streak = state.days[state.days.length - 1] === y ? state.streak + 1 : 1;
  state.days.push(d);
  if (state.days.length > 400) state.days = state.days.slice(-400);
}

let onBadge = () => {};
let onXp = () => {};
export const setNotifiers = (badge, xp) => { onBadge = badge; onXp = xp; };

export function addXP(n, reason = "") {
  if (n <= 0) return;
  const before = levelInfo().level;
  touchDay();
  state.xp += n;
  state.log.unshift({ t: Date.now(), n, reason });
  state.log = state.log.slice(0, 50);
  checkBadges();
  persist();
  onXp(n, reason, levelInfo().level > before ? levelInfo() : null);
}

/** Mashq natijasini qayd etish: o'zlashtirish ballini o'zgartiradi (Khan Academy uslubidagi mastery). */
export function recordAttempt(topic, ok, usedHint) {
  const m = state.mastery[topic] || 0;
  const a = (state.attempts[topic] ||= { ok: 0, total: 0 });
  a.total++;
  if (ok) a.ok++;
  let delta = ok ? (usedHint ? 6 : 15) : -8;
  state.mastery[topic] = Math.max(0, Math.min(100, m + delta));
  touchDay();
  checkBadges();
  persist();
  return state.mastery[topic];
}

export function masteryLabel(v = 0) {
  if (v >= 90) return { name: "Ustoz", cls: "m4" };
  if (v >= 60) return { name: "Malakali", cls: "m3" };
  if (v >= 30) return { name: "Tanish", cls: "m2" };
  if (v > 0) return { name: "Boshlangan", cls: "m1" };
  return { name: "Boshlanmagan", cls: "m0" };
}

// ---------- Oraliqli takrorlash (Leitner tizimi) ----------
const BOX_DAYS = [0, 1, 3, 7, 16, 35];
export function leitnerUpdate(id, ok) {
  const e = state.leitner[id] || { box: 0 };
  e.box = ok ? Math.min(5, e.box + 1) : 1;
  const due = new Date(Date.now() + BOX_DAYS[e.box] * 864e5);
  e.due = due.toISOString().slice(0, 10);
  state.leitner[id] = e;
  persist();
}
export function dueIds(allIds) {
  const d = today();
  return allIds.filter((id) => state.leitner[id] && state.leitner[id].due <= d);
}
export const newIds = (allIds) => allIds.filter((id) => !state.leitner[id]);

export function markRead(chapterId) {
  if (state.read[chapterId]) return false;
  state.read[chapterId] = Date.now();
  persist();
  return true;
}

export function setBest(key, value) {
  if ((state.best[key] ?? -Infinity) >= value) return false;
  state.best[key] = value;
  checkBadges();
  persist();
  return true;
}

// ---------- Nishonlar ----------
export const BADGES = [
  { id: "first", icon: "🌱", name: "Birinchi qadam", desc: "Birinchi XP ni oling", test: (s) => s.xp > 0 },
  { id: "xp100", icon: "⭐", name: "Yuzlik", desc: "100 XP to'plang", test: (s) => s.xp >= 100 },
  { id: "xp1000", icon: "🌟", name: "Mingta", desc: "1000 XP to'plang", test: (s) => s.xp >= 1000 },
  { id: "xp5000", icon: "💫", name: "Yulduz", desc: "5000 XP to'plang", test: (s) => s.xp >= 5000 },
  { id: "streak3", icon: "🔥", name: "Uch kun ketma-ket", desc: "3 kunlik seriya", test: (s) => s.streak >= 3 },
  { id: "streak7", icon: "🚀", name: "Haftalik seriya", desc: "7 kunlik seriya", test: (s) => s.streak >= 7 },
  { id: "master1", icon: "🎯", name: "Birinchi ustozlik", desc: "Bitta mavzuda «Ustoz» darajasi", test: (s) => Object.values(s.mastery).some((v) => v >= 90) },
  { id: "master5", icon: "🏆", name: "Ko'p qirrali", desc: "5 ta mavzuda «Ustoz»", test: (s) => Object.values(s.mastery).filter((v) => v >= 90).length >= 5 },
  { id: "det", icon: "🧮", name: "Determinant ustasi", desc: "Determinantlar — Ustoz", test: (s) => (s.mastery.determinant || 0) >= 90 },
  { id: "geo", icon: "📐", name: "Geometr", desc: "Ellips va giperbola — Ustoz", test: (s) => (s.mastery["ellips"] || 0) >= 90 && (s.mastery["giperbola"] || 0) >= 90 },
  { id: "reader", icon: "📖", name: "Kitobxon", desc: "3 ta bobni o'qing", test: (s) => Object.keys(s.read).length >= 3 },
  { id: "sprint10", icon: "⚡", name: "Chaqmoq", desc: "Sprintda 10+ ball", test: (s) => (s.best.sprint || 0) >= 10 },
  { id: "sprint20", icon: "🌩️", name: "Bo'ron", desc: "Sprintda 20+ ball", test: (s) => (s.best.sprint || 0) >= 20 },
  { id: "memory", icon: "🧠", name: "Xotira", desc: "Xotira o'yinini yakunlang", test: (s) => s.best.memory != null },
  { id: "review", icon: "🔁", name: "Takrorlovchi", desc: "20 ta kartani takrorlang", test: (s) => Object.keys(s.leitner).length >= 20 },
  { id: "self", icon: "📝", name: "Mustaqil", desc: "Mustaqil ishni topshiring", test: (s) => (s.best.selfwork || 0) > 0 },
];

function checkBadges() {
  for (const b of BADGES) {
    if (!state.badges.includes(b.id) && b.test(state)) {
      state.badges.push(b.id);
      setTimeout(() => onBadge(b), 300);
    }
  }
}
