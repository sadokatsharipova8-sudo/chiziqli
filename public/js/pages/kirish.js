// Kirish oynasi: #/kirish?rol=talaba|oqituvchi&next=<hash>

import { $, esc, toast } from "../ui.js";
import { store } from "../store.js";
import { studentLogin, teacherLogin, isLoggedIn } from "../auth.js";

const safeNext = (n) => (n && /^#\/[^:]*$/.test(n) && !n.startsWith("#/kirish") ? n : "#/");

export function render(el, params, query) {
  const rol = query.get("rol") === "oqituvchi" ? "oqituvchi" : "talaba";
  const next = safeNext(query.get("next"));
  const s = store.get();
  const link = (r) => `#/kirish?rol=${r}${query.get("next") ? "&next=" + encodeURIComponent(query.get("next")) : ""}`;

  el.innerHTML = `
    <div class="login-wrap">
      <div class="card login-card">
        <div class="login-head">
          <span class="brand-logo">λ</span>
          <div><h1>Kirish</h1><p class="muted small">Chiziqli algebra va analitik geometriya</p></div>
        </div>
        <div class="tabs login-tabs">
          <a class="tab ${rol === "talaba" ? "active" : ""}" href="${link("talaba")}">🎓 Talaba</a>
          <a class="tab ${rol === "oqituvchi" ? "active" : ""}" href="${link("oqituvchi")}">👩‍🏫 O'qituvchi</a>
        </div>
        ${rol === "talaba" ? `
        <form id="f" class="stack" autocomplete="on">
          <label class="small muted" for="nm">Familiya va ism</label>
          <input id="nm" name="name" required maxlength="60" placeholder="Masalan: Aliyev Vali" value="${esc(s.profile.name)}">
          <label class="small muted" for="gr">Guruh</label>
          <input id="gr" name="group" required maxlength="20" placeholder="Masalan: 101-26" value="${esc(s.profile.group)}">
          <button class="btn primary" type="submit">Kirish →</button>
          <p class="small muted" style="margin:0">F.I.Sh. va guruh mustaqil ish variantingizni belgilaydi — ularni to'g'ri va to'liq yozing. Progressingiz shu brauzerda saqlanadi.</p>
        </form>` : `
        <form id="f" class="stack" autocomplete="on">
          <input type="text" name="username" value="oqituvchi" autocomplete="username" hidden>
          <label class="small muted" for="pw">Parol</label>
          <input id="pw" name="password" type="password" required autocomplete="current-password" placeholder="O'qituvchi paroli">
          <button class="btn primary" type="submit" id="go">Kirish →</button>
          <div id="err"></div>
          <p class="small muted" style="margin:0">O'qituvchi paneli, javob kalitlari va jonli viktorina xonasini yaratish faqat o'qituvchiga ochiq. Kirish shu qurilmada 30 kun eslab qolinadi.</p>
        </form>`}
        ${isLoggedIn() ? `<p class="small" style="margin:16px 0 0;text-align:center"><a href="#/">← Bosh sahifaga qaytish</a></p>` : ""}
      </div>
    </div>`;

  $("#f", el).addEventListener("submit", async (e) => {
    e.preventDefault();
    if (rol === "talaba") {
      const name = $("#nm", el).value.trim().replace(/\s+/g, " "), group = $("#gr", el).value.trim();
      if (name.split(" ").length < 2) return toast("Familiya va ismni to'liq yozing");
      if (!group) return toast("Guruhni yozing");
      studentLogin(name, group);
      toast(`Xush kelibsiz, ${esc(name.split(" ")[1] || name)}!`);
      location.hash = next;
      return;
    }
    const btn = $("#go", el);
    btn.disabled = true;
    $("#err", el).innerHTML = "";
    try {
      await teacherLogin($("#pw", el).value);
      toast("O'qituvchi sifatida kirdingiz ✓");
      location.hash = next === "#/" ? "#/oqituvchi" : next;
    } catch (err) {
      $("#err", el).innerHTML = `<div class="result-banner bad">${esc(err.message)}</div>`;
      btn.disabled = false;
    }
  });
  setTimeout(() => (rol === "talaba" ? $("#nm", el) : $("#pw", el))?.focus(), 0);
}
