// Ilova qobig'i: marshrutlash (#/...), yon panel, mavzu, XP bildirishnomalari.

import { $, $$, toast, confetti, sound, esc, soundOn } from "./ui.js";
import { store, levelInfo, setNotifiers } from "./store.js";
import { isLoggedIn, isTeacher, looksTeacher, verifyStudent } from "./auth.js";

const ROUTES = {
  "": () => import("./pages/home.js"),
  kirish: () => import("./pages/kirish.js"),
  darslik: () => import("./pages/darslik.js"),
  lab: () => import("./pages/lab.js"),
  mashq: () => import("./pages/mashq.js"),
  takrorlash: () => import("./pages/takrorlash.js"),
  mustaqil: () => import("./pages/mustaqil.js"),
  oyinlar: () => import("./pages/oyinlar.js"),
  jonli: () => import("./pages/live.js"),
  qoshilish: () => import("./pages/live.js"),
  charx: () => import("./pages/wheel.js"),
  taxta: () => import("./pages/jeopardy.js"),
  sprint: () => import("./pages/sprint.js"),
  xotira: () => import("./pages/memory.js"),
  vositalar: () => import("./pages/tools.js"),
  metodika: () => import("./pages/metodika.js"),
  oqituvchi: () => import("./pages/teacher.js"),
  profil: () => import("./pages/profile.js"),
};

const NAV_OF = { jonli: "oyinlar", qoshilish: "oyinlar", charx: "oyinlar", taxta: "oyinlar", sprint: "oyinlar", xotira: "oyinlar", profil: "" };

// Kirishsiz ochiladigan sahifalar (jonli viktorinaga qo'shilish — telefondan, PIN orqali).
const PUBLIC = new Set(["kirish", "qoshilish"]);
// Faqat o'qituvchi uchun (javob kalitlari, jonli xona yaratish).
const TEACHER_ONLY = new Set(["oqituvchi", "jonli"]);

const toLogin = (rol) => {
  const next = location.hash && location.hash !== "#/" ? "&next=" + encodeURIComponent(location.hash) : "";
  location.replace(`#/kirish?rol=${rol}${next}`);
};

let cleanup = null;
let renderId = 0;

export function parseHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [path, query = ""] = raw.split("?");
  const parts = path.split("/").filter(Boolean).map(decodeURIComponent);
  return { name: parts[0] || "", params: parts.slice(1), query: new URLSearchParams(query) };
}

async function render() {
  const id = ++renderId;
  const { name, params, query } = parseHash();
  if (!PUBLIC.has(name) && !isLoggedIn()) return toLogin("talaba");
  if (!PUBLIC.has(name) && !looksTeacher() && !(await verifyStudent())) {
    if (id !== renderId) return;
    toast("Kirish muddati tugagan yoki parol yangilangan — qayta kiring");
    return toLogin("talaba");
  }
  if (TEACHER_ONLY.has(name) && !(await isTeacher())) {
    if (id !== renderId) return;
    toast("Bu bo'lim faqat o'qituvchi uchun");
    return toLogin("oqituvchi");
  }
  if (id !== renderId) return;
  document.body.classList.toggle("auth-mode", name === "kirish");
  paintNav();
  const loader = ROUTES[name] || ROUTES[""];
  const view = $("#view");
  if (typeof cleanup === "function") { try { cleanup(); } catch {} }
  cleanup = null;
  $$(".modal-backdrop").forEach((m) => m.remove());
  $$("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.route === (NAV_OF[name] ?? name)));
  $("#sidebar").classList.remove("open");
  try {
    const mod = await loader();
    if (id !== renderId) return;
    view.innerHTML = "";
    cleanup = await mod.render(view, params, query, name);
  } catch (e) {
    console.error(e);
    view.innerHTML = `<div class="card empty"><h2>Sahifani yuklab bo'lmadi</h2><p>${esc(e.message)}</p><a class="btn" href="#/">Bosh sahifa</a></div>`;
  }
  window.scrollTo(0, 0);
  view.focus({ preventScroll: true });
}

function paintNav() {
  const t = looksTeacher();
  $$("[data-teacher]").forEach((a) => (a.hidden = !t));
  const ll = $("#teacher-login-link");
  if (ll) ll.hidden = t;
}

function renderMe() {
  const s = store.get();
  const L = levelInfo();
  const t = looksTeacher();
  $("#me-card").innerHTML = t
    ? `<div class="row between"><b>👩‍🏫 O'qituvchi</b><span class="pill primary">kirilgan</span></div>
       <div class="lvl">${esc(s.profile.name || "Profil va chiqish")}</div>`
    : `<div class="row between"><b>${esc(s.profile.name || "Mehmon talaba")}</b><span class="pill primary">${L.level}-daraja</span></div>
    <div class="lvl">${esc(s.profile.group ? s.profile.group + " · " : "")}${esc(L.name)} · ${s.xp} XP · 🔥 ${s.streak}</div>
    <div class="progress" style="margin-top:8px"><i style="width:${L.pct}%"></i></div>`;
  $("#top-xp").textContent = `⭐ ${s.xp} XP · 🔥 ${s.streak}`;
  paintNav();
}

function setTheme(next) {
  if (next) document.documentElement.dataset.theme = next;
  else delete document.documentElement.dataset.theme;
  try { next ? localStorage.setItem("cag-theme", next) : localStorage.removeItem("cag-theme"); } catch {}
  window.dispatchEvent(new Event("themechange"));
}

function init() {
  setNotifiers(
    (b) => { toast(`${b.icon} Yangi nishon: <b>${esc(b.name)}</b>`, "badge", 3800); sound("win"); confetti(80); },
    (n, reason, lvlUp) => {
      toast(`+${n} XP${reason ? " · " + esc(reason) : ""}`, "xp", 1800);
      if (lvlUp) setTimeout(() => { toast(`🎉 Yangi daraja: ${lvlUp.level} — ${esc(lvlUp.name)}`, "badge", 4000); confetti(); sound("win"); }, 600);
    }
  );
  store.subscribe(renderMe);
  renderMe();

  $("#menu-btn").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  document.addEventListener("click", (e) => {
    const sb = $("#sidebar");
    if (sb.classList.contains("open") && !sb.contains(e.target) && !e.target.closest("#menu-btn")) sb.classList.remove("open");
  });
  $("#theme-btn").addEventListener("click", () => {
    const dark = getComputedStyle(document.documentElement).colorScheme === "dark";
    setTheme(dark ? "light" : "dark");
  });
  const sb = $("#sound-btn");
  const paintSound = () => (sb.textContent = soundOn() ? "🔊" : "🔇");
  paintSound();
  sb.addEventListener("click", () => {
    try { localStorage.setItem("cag-sound", soundOn() ? "0" : "1"); } catch {}
    paintSound();
  });

  window.addEventListener("hashchange", render);
  render();
}

init();
