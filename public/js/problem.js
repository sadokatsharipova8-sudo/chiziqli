// Masala kartasi: javob kiritish, tekshirish, bosqichma-bosqich maslahat va to'liq yechim (worked example).

import { mathText, answerInputs, checkInputs, answerTex, $, $$, esc, toast, sound } from "./ui.js";
import { topicById } from "./generators.js";

export function problemCard(host, gen, problem, { onSolved, onAttempt, onNext } = {}) {
  // Har safar yangi ichki element — eski tinglovchilar qolib ketmasligi uchun.
  const el = document.createElement("div");
  host.replaceChildren(el);
  const t = topicById(gen.topic);
  let hintsShown = 0, solutionSeen = false, wrongs = 0, solved = false;

  el.innerHTML = `
    <div class="card problem">
      <div class="row between"><span class="pill" style="color:${t.color}">${t.icon} ${esc(t.name)}</span><span class="pill">${esc(gen.title)}</span></div>
      <div class="problem-q">${mathText(problem.q)}</div>
      <div class="answer">${answerInputs(problem.answer)}</div>
      <div class="row mt">
        <button class="btn primary" data-a="check">✓ Tekshirish</button>
        <button class="btn" data-a="hint">💡 Maslahat <span class="muted small">(${problem.hints.length})</span></button>
        <button class="btn ghost" data-a="sol">📖 Yechimni ko'rish</button>
        <button class="btn ok" data-a="next" hidden>Keyingi masala →</button>
      </div>
      <div class="hints"></div>
      <div class="result"></div>
      <div class="solution"></div>
    </div>`;

  const q = (s) => $(s, el);
  const first = q(".ans-in");
  setTimeout(() => first?.focus({ preventScroll: true }), 50);

  function showSolution() {
    solutionSeen = true;
    q(".solution").innerHTML = `<div class="solution-box"><b>📖 Yechim</b><ol>${problem.solution.map((s) => `<li>${mathText(s)}</li>`).join("")}</ol>
      <div class="mt"><b>Javob:</b> ${mathText("$" + answerTex(problem.answer) + "$")}</div></div>`;
    q('[data-a="sol"]').hidden = true;
  }

  function finish() {
    solved = true;
    q('[data-a="check"]').hidden = true;
    q('[data-a="hint"]').hidden = true;
    const nx = q('[data-a="next"]');
    nx.hidden = false;
    nx.focus();
  }

  function check() {
    if (solved) return onNext?.();
    const res = checkInputs(el, problem.answer);
    if (!res.filled) { toast("Barcha maydonlarni to'ldiring (kasr: 3/4, o'nli: 0.75)"); return; }
    $$(".ans-in", el).forEach((inp, i) => { inp.classList.toggle("ok", res.cells[i]); inp.classList.toggle("bad", !res.cells[i]); });
    if (res.ok) {
      sound("ok");
      const quality = solutionSeen ? "solution" : hintsShown ? "hint" : wrongs ? "retry" : "clean";
      q(".result").innerHTML = `<div class="result-banner ok">✓ To'g'ri! ${quality === "clean" ? "Ajoyib — birinchi urinishda!" : ""}</div>`;
      if (!solutionSeen) showSolution();
      onSolved?.(quality);
      finish();
    } else {
      sound("bad");
      wrongs++;
      if (wrongs === 1) onAttempt?.(false);
      q(".result").innerHTML = `<div class="result-banner bad">✗ Hali to'g'ri emas. ${wrongs >= 2 ? "Maslahat yoki yechimga qarang." : "Qizil maydonlarni qayta tekshiring."}</div>`;
    }
  }

  el.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.classList.contains("ans-in")) check(); });
  q('[data-a="check"]').addEventListener("click", check);
  q('[data-a="next"]').addEventListener("click", () => onNext?.());
  q('[data-a="sol"]').addEventListener("click", () => { showSolution(); if (!solved) onAttempt?.(false, true); });
  q('[data-a="hint"]').addEventListener("click", () => {
    if (hintsShown >= problem.hints.length) { toast("Boshqa maslahat yo'q — yechimga qarang"); return; }
    hintsShown++;
    q(".hints").innerHTML = `<div class="hint-box">${problem.hints.slice(0, hintsShown).map((h, i) => `<div>💡 <b>${i + 1}.</b> ${mathText(h)}</div>`).join("")}</div>`;
  });
}
