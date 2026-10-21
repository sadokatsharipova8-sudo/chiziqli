// 60 soniyalik sprint: tezkor hisob-kitob (avtomatlashtirish — fluency).

import { GENERATORS } from "../generators.js";
import { topicPicker } from "../course.js";
import { makeRng, parseNum, sameNum } from "../math.js";
import { store, addXP, setBest } from "../store.js";
import { $, mathText, sound, confetti, toast } from "../ui.js";

const ALL = GENERATORS.filter((g) => g.quick && g.gen(makeRng(1)).answer.type === "num");
const SPRINT_TOPICS = [...new Set(ALL.map((g) => g.topic))];

export function render(el) {
  let timer = null, picker = null, POOL = ALL;

  function intro() {
    const best = store.get().best.sprint || 0;
    el.innerHTML = `
      <div class="page-head"><h1>⚡ 60 soniya sprint</h1><p>Bir daqiqada imkon qadar ko'p misol yeching. Javobni yozib <b>Enter</b> bosing. Xato bo'lsa — to'g'ri javob ko'rsatiladi va keyingisiga o'tiladi.</p></div>
      <div class="card center" style="max-width:560px;margin:0 auto">
        <div class="muted">Shaxsiy rekord</div><div class="k-big">🏅 ${best}</div>
        <div class="mt" style="text-align:left"><div class="small muted mb">Qaysi mavzulardan misollar tushsin:</div><div id="tp"></div></div>
        <p class="muted small mt" id="kinds"></p>
        <button class="btn primary lg" id="go">▶ Boshlash</button>
      </div>`;
    const kinds = (ids) => {
      const list = ALL.filter((g) => ids.includes(g.topic));
      $("#kinds", el).textContent = list.length ? "Misollar: " + list.map((g) => g.title).join(", ") : "Tezkor misollari bor mavzuni tanlang.";
    };
    topicPicker($("#tp", el), { key: "sprint", only: SPRINT_TOPICS, onChange: kinds }).then((p) => { picker = p; kinds(p.get()); });
    $("#go", el).addEventListener("click", () => {
      POOL = ALL.filter((g) => (picker ? picker.get() : []).includes(g.topic));
      if (!POOL.length) return toast("Kamida bitta mavzu tanlang");
      start();
    });
  }

  function start() {
    let score = 0, wrong = 0, cur = null, lock = false;
    const end = Date.now() + 60000;
    el.innerHTML = `
      <div class="card" style="max-width:640px;margin:0 auto">
        <div class="row between"><span class="pill primary" id="sc">✓ 0</span><b class="k-big" id="tl" style="font-size:28px">60</b><span class="pill" id="wr">✗ 0</span></div>
        <div class="progress mt"><i id="bar" style="width:100%"></i></div>
        <div class="problem-q center mt" id="q" style="min-height:110px"></div>
        <div class="row" style="justify-content:center"><input id="ans" class="ans-in" style="width:200px;font-size:22px" autocomplete="off" inputmode="text" placeholder="Javob"></div>
        <div class="center mt" id="fb" style="min-height:28px;font-weight:700"></div>
      </div>`;
    const inp = $("#ans", el);
    const next = () => {
      const g = POOL[Math.floor(Math.random() * POOL.length)];
      cur = g.gen(makeRng());
      $("#q", el).innerHTML = mathText(cur.q);
      inp.value = ""; inp.className = "ans-in"; inp.focus();
      lock = false;
    };
    inp.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" || lock || !inp.value.trim()) return;
      if (sameNum(parseNum(inp.value), cur.answer.value)) {
        score++; sound("ok"); $("#fb", el).innerHTML = `<span style="color:var(--ok)">✓ +1</span>`; next();
      } else {
        wrong++; sound("bad"); lock = true; inp.classList.add("bad");
        $("#fb", el).innerHTML = `<span style="color:var(--bad)">✗ To'g'ri javob: ${mathText("$" + cur.answer.value.tex() + "$")}</span>`;
        setTimeout(next, 1100);
      }
      $("#sc", el).textContent = `✓ ${score}`; $("#wr", el).textContent = `✗ ${wrong}`;
    });
    timer = setInterval(() => {
      const left = Math.max(0, end - Date.now());
      $("#tl", el).textContent = Math.ceil(left / 1000);
      $("#bar", el).style.width = `${left / 600}%`;
      if (left <= 10000 && left > 0 && left % 1000 < 110) sound("tick");
      if (left <= 0) { clearInterval(timer); finish(score, wrong); }
    }, 100);
    next();
  }

  function finish(score, wrong) {
    const record = setBest("sprint", score);
    if (score) addXP(score * 2, "sprint");
    if (record && score > 0) confetti();
    el.innerHTML = `
      <div class="card center" style="max-width:560px;margin:0 auto">
        <h1>${record && score ? "🏆 Yangi rekord!" : "Vaqt tugadi!"}</h1>
        <div class="k-big">${score} ta to'g'ri</div>
        <p class="muted">${wrong} ta xato · aniqlik ${score + wrong ? Math.round((score / (score + wrong)) * 100) : 0}%</p>
        <div class="row" style="justify-content:center"><button class="btn primary lg" id="again">↻ Yana</button><a class="btn lg" href="#/oyinlar">O'yinlar</a></div>
      </div>`;
    $("#again", el).addEventListener("click", start);
    el.querySelector(".row").insertAdjacentHTML("beforeend", `<button class="btn lg" id="topics">Mavzular</button>`);
    $("#topics", el).addEventListener("click", intro);
  }

  intro();
  return () => clearInterval(timer);
}
