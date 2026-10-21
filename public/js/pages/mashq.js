import { TOPICS, topicById, generatorsFor, GENERATORS } from "../generators.js";
import { makeRng } from "../math.js";
import { store, addXP, recordAttempt, masteryLabel } from "../store.js";
import { problemCard } from "../problem.js";
import { $, esc } from "../ui.js";

export function render(el, params) {
  const topic = params[0];
  if (!topic) return renderList(el);
  return renderSession(el, topic);
}

function renderList(el) {
  const s = store.get();
  el.innerHTML = `
    <div class="page-head">
      <h1>🎯 Mashqlar</h1>
      <p>Har safar yangi sonlar bilan yangi masala. Maslahatlar bosqichma-bosqich ochiladi, to'liq yechim har doim mavjud.
      To'g'ri javoblar mavzuni <b>Boshlangan → Tanish → Malakali → Ustoz</b> darajalariga ko'taradi.</p>
    </div>
    <a class="card tile mb" href="#/mashq/aralash" style="flex-direction:row;align-items:center;gap:16px;border-left:5px solid var(--primary)">
      <span class="ico" style="background:var(--primary-soft)">🔀</span>
      <div><h3>Aralash mashq (interleaving)</h3><p>Mavzular aralashib keladi — tadqiqotlar bu usul uzoq muddatli bilimni sezilarli oshirishini ko'rsatgan. Kuchsiz mavzular ko'proq tushadi.</p></div>
    </a>
    <div class="grid g3">
      ${TOPICS.map((t) => {
        const v = s.mastery[t.id] || 0, m = masteryLabel(v), a = s.attempts[t.id];
        return `<a class="card tile topic-card" style="--c:${t.color}" href="#/mashq/${t.id}">
          <div class="row between"><span class="t-ico">${t.icon}</span><span class="m-label ${m.cls}">${m.name}</span></div>
          <h3>${esc(t.name)}</h3>
          <div class="progress"><i style="width:${v}%;background:${t.color}"></i></div>
          <p class="small">${generatorsFor(t.id).length} xil masala${a ? ` · ${a.ok}/${a.total} to'g'ri` : ""}</p></a>`;
      }).join("")}
    </div>`;
}

function pickMixed() {
  const s = store.get();
  const weights = TOPICS.map((t) => 110 - (s.mastery[t.id] || 0));
  let r = Math.random() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < TOPICS.length; i++) { r -= weights[i]; if (r <= 0) return TOPICS[i].id; }
  return TOPICS[0].id;
}

function renderSession(el, topicParam) {
  const mixed = topicParam === "aralash";
  if (!mixed && !topicById(topicParam)) { location.hash = "#/mashq"; return; }
  let count = 0, correct = 0, genFilter = "";

  el.innerHTML = `
    <div class="row between mb">
      <a href="#/mashq" class="btn ghost">← Mavzular</a>
      <div class="row">
        <span class="pill" id="sess">0 / 0</span>
        ${mixed ? "" : `<select id="gen-sel"><option value="">Barcha turdagi masalalar</option>${generatorsFor(topicParam).map((g) => `<option value="${g.id}">${esc(g.title)}</option>`).join("")}</select>`}
      </div>
    </div>
    <div class="card mb" id="mastery-box"></div>
    <div id="problem"></div>`;

  function paintMastery(topic) {
    const t = topicById(topic), v = store.get().mastery[topic] || 0, m = masteryLabel(v);
    $("#mastery-box", el).innerHTML = `
      <div class="row between"><h2 style="margin:0">${mixed ? "🔀 Aralash mashq · " : ""}${t.icon} ${esc(t.name)}</h2><span class="m-label ${m.cls}">${m.name} · ${v}%</span></div>
      <div class="progress mt"><i style="width:${v}%;background:${t.color}"></i></div>
      <p class="small muted" style="margin:8px 0 0">To'g'ri (maslahatsiz) +15 · maslahat bilan +6 · xato −8. 90% — «Ustoz».</p>`;
  }

  function next() {
    const topic = mixed ? pickMixed() : topicParam;
    const pool = genFilter ? GENERATORS.filter((g) => g.id === genFilter) : generatorsFor(topic);
    const gen = pool[Math.floor(Math.random() * pool.length)];
    const problem = gen.gen(makeRng());
    paintMastery(gen.topic);
    $("#sess", el).textContent = `${correct} / ${count} to'g'ri`;
    let counted = false;
    problemCard($("#problem", el), gen, problem, {
      onAttempt: (ok) => {
        if (counted) return;
        counted = true; count++;
        recordAttempt(gen.topic, false, false);
        paintMastery(gen.topic);
        $("#sess", el).textContent = `${correct} / ${count} to'g'ri`;
      },
      onSolved: (quality) => {
        if (!counted) {
          counted = true; count++; correct++;
          recordAttempt(gen.topic, true, quality === "hint");
        }
        const xp = { clean: 10, retry: 5, hint: 5, solution: 0 }[quality];
        if (xp) addXP(xp, "masala");
        paintMastery(gen.topic);
        $("#sess", el).textContent = `${correct} / ${count} to'g'ri`;
      },
      onNext: next,
    });
  }

  $("#gen-sel", el)?.addEventListener("change", (e) => { genFilter = e.target.value; next(); });
  next();
}
