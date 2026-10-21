// Kirish oynasi: #/kirish?rol=talaba|oqituvchi&next=<hash>

import { $, esc, toast } from "../ui.js";
import { studentLogin, teacherLogin, isLoggedIn } from "../auth.js";

const safeNext = (n) => (n && /^#\/[^:]*$/.test(n) && !n.startsWith("#/kirish") ? n : "#/");

export function render(el, params, query) {
  const rol = query.get("rol") === "oqituvchi" ? "oqituvchi" : "talaba";
  const next = safeNext(query.get("next"));
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
          <label class="small muted" for="lg">Login</label>
          <input id="lg" name="username" required maxlength="40" autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="Masalan: aliyev.v">
          <label class="small muted" for="spw">Parol</label>
          <input id="spw" name="password" type="password" required autocomplete="current-password" placeholder="O'qituvchi bergan parol">
          <button class="btn primary" type="submit" id="go">Kirish →</button>
          <div id="err"></div>
          <p class="small muted" style="margin:0">Login va parolni fan o'qituvchingiz beradi. Parolni unutsangiz — o'qituvchiga murojaat qiling, u yangisini beradi.</p>
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
    const btn = $("#go", el);
    btn.disabled = true;
    $("#err", el).innerHTML = "";
    try {
      if (rol === "talaba") {
        const me = await studentLogin($("#lg", el).value, $("#spw", el).value);
        toast(`Xush kelibsiz, ${esc(me.name.split(" ")[1] || me.name)}!`);
        location.hash = next;
      } else {
        await teacherLogin($("#pw", el).value);
        toast("O'qituvchi sifatida kirdingiz ✓");
        location.hash = next === "#/" ? "#/oqituvchi" : next;
      }
    } catch (err) {
      $("#err", el).innerHTML = `<div class="result-banner bad">${esc(err.message)}</div>`;
      btn.disabled = false;
    }
  });
  setTimeout(() => (rol === "talaba" ? $("#lg", el) : $("#pw", el))?.focus(), 0);
}
