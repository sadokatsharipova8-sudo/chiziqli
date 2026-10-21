import { store, levelInfo, BADGES, LEVELS, LEVEL_NAMES } from "../store.js";
import { $, esc, toast, download } from "../ui.js";
import { looksTeacher, logoutTeacher, logoutAll, hasStudentAccount } from "../auth.js";

export function render(el) {
  const s = store.get(), L = levelInfo();
  el.innerHTML = `
    <div class="page-head"><h1>👤 Profil</h1></div>
    <div class="grid g2">
      <div class="card">
        ${hasStudentAccount()
          ? `<h3 style="margin:0">${esc(s.profile.name)}</h3><p class="muted small" style="margin:4px 0 0">Guruh: ${esc(s.profile.group)} · Ism va guruhni o'qituvchi belgilaydi</p>`
          : `<div class="row"><input id="nm" placeholder="Familiya Ism" value="${esc(s.profile.name)}" style="flex:2"><input id="gr" placeholder="Guruh" value="${esc(s.profile.group)}" style="flex:1"><button class="btn primary" id="save">Saqlash</button></div>`}
        <div class="grid g3 mt">
          <div class="stat"><b>${s.xp}</b><span>XP</span></div>
          <div class="stat"><b>${L.level}</b><span>${esc(L.name)}</span></div>
          <div class="stat"><b>🔥 ${s.streak}</b><span>kunlik seriya</span></div>
        </div>
        <div class="progress mt"><i style="width:${L.pct}%"></i></div>
        <p class="small muted">Keyingi darajagacha: ${Math.max(0, L.next - s.xp)} XP</p>
        <h3 class="mt">Darajalar</h3>
        <div class="small">${LEVEL_NAMES.map((n, i) => `<div style="${i + 1 === L.level ? "font-weight:800;color:var(--primary)" : "color:var(--muted)"}">${i + 1}. ${esc(n)} — ${LEVELS[i]} XP</div>`).join("")}</div>
      </div>
      <div class="card">
        <h3>Nishonlar (${s.badges.length}/${BADGES.length})</h3>
        <div class="badge-grid">${BADGES.map((b) => `<div class="badge ${s.badges.includes(b.id) ? "" : "locked"}"><span class="b-ico">${b.icon}</span><b>${esc(b.name)}</b><br><span class="muted">${esc(b.desc)}</span></div>`).join("")}</div>
        <h3 class="mt">So'nggi faollik</h3>
        <div class="small">${s.log.slice(0, 10).map((l) => `<div>+${l.n} XP · ${esc(l.reason)} <span class="muted">${new Date(l.t).toLocaleString("uz-UZ")}</span></div>`).join("") || '<span class="muted">Hali faollik yo\'q</span>'}</div>
      </div>
    </div>
    <div class="card mt">
      <h3>Hisob</h3>
      <p class="small muted">${looksTeacher() ? "Siz o'qituvchi sifatida kirgansiz." : "Siz talaba sifatida kirgansiz."} Umumiy kompyuterda ishlagan bo'lsangiz, oxirida chiqib keting. Talaba chiqqanda XP va progress shu brauzerda saqlanib qoladi.</p>
      <div class="row">
        ${looksTeacher() ? `<button class="btn" id="out-t">🔒 O'qituvchi hisobidan chiqish</button>` : `<a class="btn" href="#/kirish?rol=oqituvchi">🔐 O'qituvchi sifatida kirish</a>`}
        <button class="btn" id="out-all">🚪 Chiqish</button>
      </div>
    </div>
    <div class="card mt">
      <h3>Ma'lumotlar</h3>
      <p class="small muted">Progress faqat shu brauzerda saqlanadi. Boshqa qurilmaga ko'chirish uchun eksport/import qiling.</p>
      <div class="row"><button class="btn" id="exp">⬇️ Eksport</button><label class="btn">⬆️ Import<input type="file" id="imp" accept=".json" hidden></label><button class="btn danger" id="reset">Hammasini o'chirish</button></div>
    </div>`;
  $("#save", el)?.addEventListener("click", () => { s.profile.name = $("#nm", el).value.trim(); s.profile.group = $("#gr", el).value.trim(); store.save(); toast("Saqlandi ✓"); });
  $("#out-t", el)?.addEventListener("click", () => { logoutTeacher(); store.save(); toast("O'qituvchi hisobidan chiqdingiz"); render(el); });
  $("#out-all", el).addEventListener("click", () => { logoutAll(); location.hash = "#/kirish"; });
  $("#exp", el).addEventListener("click", () => download("chiziqli-algebra-progress.json", store.export(), "application/json"));
  $("#imp", el).addEventListener("change", async (e) => {
    try { store.import(await e.target.files[0].text()); toast("Import qilindi"); render(el); } catch { toast("Fayl noto'g'ri"); }
  });
  $("#reset", el).addEventListener("click", () => { if (confirm("Barcha progress o'chiriladi. Ishonchingiz komilmi?")) { store.reset(); render(el); } });
}
