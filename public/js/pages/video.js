// Video-darslar: har bir mavzu uchun 2–3 daqiqalik animatsion video (sahnalar + subtitr + ixtiyoriy ovoz).
// Ssenariylar: public/content/videolar/<id>.md — sahnalar "---" bilan ajratiladi.
// Sahna formati:
//   # Sarlavha
//   @ 🎯                 — katta belgi (ixtiyoriy)
//   > Diktor matni ...   — subtitr va ovoz (bir nechta ">" qatori bo'lishi mumkin)
//   qolgani — ekrandagi ko'rinish (markdown, formulalar, :::bloklar)
// #/video          — ro'yxat
// #/video/1-07     — video

import { $, $$, esc, toast, md } from "../ui.js";
import { loadManifest, mavzuNo } from "./darslik.js";
import { topicById } from "../generators.js";

const cache = {};
const lsGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

function parseScene(src) {
  const lines = src.split("\n");
  let title = "", icon = "", say = [];
  const body = [];
  for (const l of lines) {
    if (!title && /^#\s+/.test(l)) title = l.replace(/^#\s+/, "").trim();
    else if (!icon && /^@\s+/.test(l)) icon = l.replace(/^@\s+/, "").trim();
    else if (/^>\s?/.test(l)) say.push(l.replace(/^>\s?/, "").trim());
    else body.push(l);
  }
  return { title, icon, say: say.join(" "), body: body.join("\n").trim() };
}

export async function loadVideo(id) {
  if (cache[id]) return cache[id];
  const r = await fetch(`content/videolar/${id}.md`, { cache: "no-cache" });
  if (!r.ok) throw new Error("Video ssenariysi topilmadi");
  const text = (await r.text()).replace(/\r\n/g, "\n");
  return (cache[id] = text.split(/\n-{3,}[ \t]*\n/).map((s) => s.trim()).filter(Boolean).map(parseScene));
}

/** Sahna davomiyligi (soniya): o'qish tezligi ~2,4 so'z/s, kamida 6 s. */
const sceneSecs = (s) => Math.max(6, Math.round((s.say.split(/\s+/).filter(Boolean).length / 2.4 + 1.5) * 10) / 10);
const fmt = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;

export async function render(el, params) {
  const man = await loadManifest();
  const id = params[0];
  if (!id) return renderList(el, man);
  const idx = man.boblar.findIndex((b) => b.id === id);
  if (idx < 0) { location.hash = "#/video"; return; }
  return renderPlayer(el, man, idx);
}

async function renderList(el, man) {
  const durs = await Promise.all(man.boblar.map((b) => loadVideo(b.id).then((sc) => sc.reduce((s, x) => s + sceneSecs(x), 0)).catch(() => 0)));
  const seen = JSON.parse(lsGet("cag-videos-seen") || "{}");
  el.innerHTML = `
    <div class="page-head"><h1>🎬 Video-darslar</h1>
      <p>Har bir mavzu bo'yicha qisqa video: mavzuning <b>dolzarbligi</b>, <b>hayot bilan bog'liqligi</b> va <b>asosiy mazmuni</b>. Darsdan oldin ko'ring — keyin darslik va mashqlar ancha oson bo'ladi.</p></div>
    ${[...new Set(man.boblar.map((b) => b.qism || ""))].map((qism) => `
      ${qism ? `<h2 class="mt">${esc(qism)}</h2>` : ""}
      <div class="grid g3">
      ${man.boblar.map((b, i) => [b, i]).filter(([b]) => (b.qism || "") === qism).map(([b, i]) => {
        const t = topicById(b.mavzu);
        return `<a class="tile video-tile" href="#/video/${b.id}" style="border-top:4px solid ${t?.color || "var(--primary)"}">
          <div class="row between"><span class="pill">${esc(mavzuNo(b.id))}</span><span class="small muted">${seen[b.id] ? "✓ ko'rilgan · " : ""}▶ ${fmt(durs[i])}</span></div>
          <h3>${esc(b.nomi)}</h3><p>${t ? esc(t.icon) + " " + esc(t.name) : ""}</p></a>`;
      }).join("")}
      </div>`).join("")}`;
}

async function renderPlayer(el, man, idx) {
  const bob = man.boblar[idx];
  const scenes = await loadVideo(bob.id);
  const durs = scenes.map(sceneSecs);
  const starts = durs.reduce((a, d, i) => (a.push(i ? a[i - 1] + durs[i - 1] : 0), a), []);
  const total = durs.reduce((s, d) => s + d, 0);
  const t = topicById(bob.mavzu);
  const voices = () => (window.speechSynthesis ? speechSynthesis.getVoices() : []);

  let cur = 0, playing = false, elapsed = 0, last = 0, raf = 0, speed = +(lsGet("cag-vspeed") || 1);
  let voiceOn = lsGet("cag-vvoice-on") === "1", voiceName = lsGet("cag-vvoice") || "", speaking = false, utter = null;
  let rec = null;

  el.innerHTML = `
    <div class="deck-top no-print">
      <a class="btn ghost sm" href="#/video">← Video-darslar</a>
      <b class="deck-title">${esc(bob.qism ? bob.qism.split(".")[0] + ", " : "")}${esc(mavzuNo(bob.id))}. ${esc(bob.nomi)}</b>
      <div class="row"><a class="btn sm" href="#/darslik/${bob.id}">📘 Darslik</a><a class="btn sm" href="#/taqdimot/${bob.id}">🎞 Taqdimot</a></div>
    </div>
    <div class="vplayer" id="vp" tabindex="0" style="--accent:${t?.color || "var(--primary)"}">
      <div class="vstage" id="stage"></div>
      <div class="vsub" id="sub"></div>
      <div class="vbig" id="big">▶</div>
      <div class="vbar">
        <div class="vprog" id="prog">${starts.map((s) => `<i class="vmark" style="left:${(s / total) * 100}%"></i>`).join("")}<b id="fill"></b></div>
        <div class="vctrl">
          <button class="icon-btn" id="pp" title="Ijro / pauza (Space)">▶</button>
          <button class="icon-btn" id="pv" title="Oldingi sahna">⏮</button>
          <button class="icon-btn" id="nx" title="Keyingi sahna">⏭</button>
          <span class="vtime" id="tm">0:00 / ${fmt(total)}</span>
          <span class="vspacer"></span>
          <select id="sp" title="Tezlik">${[0.75, 1, 1.25, 1.5].map((v) => `<option value="${v}" ${v === speed ? "selected" : ""}>${v}×</option>`).join("")}</select>
          <button class="icon-btn" id="vo" title="Ovoz (diktor)">${voiceOn ? "🔊" : "🔇"}</button>
          <button class="icon-btn" id="fs" title="To'liq ekran (F)">⛶</button>
        </div>
      </div>
    </div>
    <div class="card mt no-print">
      <div class="row between" style="gap:10px;flex-wrap:wrap">
        <div class="small muted" id="vinfo"></div>
        <button class="btn sm" id="rec">⏺ Video fayl qilib yuklab olish</button>
      </div>
      <div class="row mt" id="vsel" hidden><label class="small">Diktor ovozi: <select id="voice"></select></label></div>
    </div>`;

  const stage = $("#stage", el), sub = $("#sub", el), vp = $("#vp", el);

  function voiceInfo() {
    const vs = voices();
    const uz = vs.find((v) => /^uz/i.test(v.lang));
    $("#vsel", el).hidden = !voiceOn || !vs.length;
    $("#voice", el).innerHTML = vs.map((v) => `<option value="${esc(v.name)}" ${v.name === (voiceName || uz?.name) ? "selected" : ""}>${esc(v.name)} (${esc(v.lang)})</option>`).join("");
    $("#vinfo", el).innerHTML = !window.speechSynthesis
      ? "Bu brauzerda ovoz chiqarish imkoni yo'q — subtitrlar bilan ko'ring."
      : voiceOn
        ? uz || voiceName ? "🔊 Diktor ovozi yoqilgan." : "🔊 O'zbekcha ovoz topilmadi — ro'yxatdan boshqa ovozni tanlang yoki subtitrlar bilan ko'ring."
        : "🔇 Ovoz o'chirilgan — subtitrlar bilan ko'rsatiladi. Ovozni 🔇 tugmasi bilan yoqing.";
  }
  if (window.speechSynthesis) speechSynthesis.onvoiceschanged = voiceInfo;

  function stopSpeech() {
    speaking = false;
    if (window.speechSynthesis) speechSynthesis.cancel();
    utter = null;
  }
  function speak(text) {
    if (!voiceOn || !window.speechSynthesis || !text) return false;
    const vs = voices();
    const v = vs.find((x) => x.name === voiceName) || vs.find((x) => /^uz/i.test(x.lang));
    if (!v) return false;
    stopSpeech();
    utter = new SpeechSynthesisUtterance(text.replace(/\$[^$]*\$/g, ""));
    utter.voice = v; utter.lang = v.lang; utter.rate = speed;
    speaking = true;
    utter.onend = () => { if (utter && speaking) { speaking = false; setTimeout(() => playing && !speaking && next(true), 600); } };
    speechSynthesis.speak(utter);
    return true;
  }

  function show(i, keepTime = false) {
    cur = Math.max(0, Math.min(scenes.length - 1, i));
    if (!keepTime) elapsed = starts[cur];
    const s = scenes[cur];
    const { html } = md(s.body || "");
    stage.innerHTML = `
      <div class="vscene ${cur === 0 ? "vtitle" : ""}">
        ${s.icon ? `<div class="vicon">${esc(s.icon)}</div>` : ""}
        ${s.title ? `<h2>${esc(s.title)}</h2>` : ""}
        <div class="vbody prose">${html}</div>
      </div>`;
    // ketma-ket paydo bo'lish
    $$(".vbody > *, .vbody li", stage).forEach((n, k) => { n.style.animationDelay = `${0.35 + k * 0.45 / speed}s`; n.classList.add("vin"); });
    sub.innerHTML = s.say ? esc(s.say) : "";
    if (playing) speak(s.say);
    paint();
  }

  function paint() {
    $("#fill", el).style.width = `${(Math.min(elapsed, total) / total) * 100}%`;
    $("#tm", el).textContent = `${fmt(elapsed)} / ${fmt(total)}`;
    $("#pp", el).textContent = playing ? "⏸" : "▶";
    $("#big", el).hidden = playing;
  }

  function next(auto = false) {
    if (cur < scenes.length - 1) show(cur + 1);
    else if (auto) finish();
  }

  function finish() {
    playing = false; stopSpeech(); cancelAnimationFrame(raf);
    elapsed = total; paint();
    const seen = JSON.parse(lsGet("cag-videos-seen") || "{}"); seen[bob.id] = Date.now(); lsSet("cag-videos-seen", JSON.stringify(seen));
    const nb = man.boblar[idx + 1];
    stage.innerHTML = `<div class="vscene vtitle"><div class="vicon">🎓</div><h2>Video tugadi!</h2>
      <div class="vbody"><p>Endi mavzuni chuqurroq o'rganing:</p>
      <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap">
        <a class="btn primary" href="#/darslik/${bob.id}">📘 Darslikni o'qish</a>
        <a class="btn" href="#/taqdimot/${bob.id}">🎞 Taqdimot</a>
        ${t ? `<a class="btn" href="#/mashq/${t.id}">🎯 Mashqlar</a>` : ""}
        ${nb ? `<a class="btn" href="#/video/${nb.id}">▶ Keyingi video</a>` : ""}
      </div></div></div>`;
    sub.textContent = "";
    if (rec) stopRec();
  }

  function tick(now) {
    if (!playing) return;
    const dt = Math.min(0.25, (now - last) / 1000) * speed;
    last = now;
    // ovoz yoqilgan bo'lsa, sahna ovoz tugashi bilan almashadi; vaqt chizig'i esa sahna chegarasidan oshmaydi
    const end = starts[cur] + durs[cur];
    elapsed = Math.min(elapsed + dt, speaking ? end - 0.05 : end);
    if (!speaking && elapsed >= end - 1e-6) {
      if (cur < scenes.length - 1) show(cur + 1); else return finish();
    }
    paint();
    raf = requestAnimationFrame(tick);
  }

  function play() {
    if (elapsed >= total) { elapsed = 0; show(0); }
    playing = true; last = performance.now();
    speak(scenes[cur].say);
    paint();
    raf = requestAnimationFrame(tick);
  }
  function pause() { playing = false; stopSpeech(); cancelAnimationFrame(raf); paint(); }
  const toggle = () => (playing ? pause() : play());

  $("#pp", el).addEventListener("click", toggle);
  $("#big", el).addEventListener("click", play);
  stage.addEventListener("click", (e) => { if (!e.target.closest("a, button, .mcq")) toggle(); });
  $("#pv", el).addEventListener("click", () => { stopSpeech(); show(cur - 1); });
  $("#nx", el).addEventListener("click", () => { stopSpeech(); if (cur < scenes.length - 1) show(cur + 1); else finish(); });
  $("#prog", el).addEventListener("click", (e) => {
    const r = e.currentTarget.getBoundingClientRect(), x = ((e.clientX - r.left) / r.width) * total;
    let i = starts.findIndex((s, k) => x >= s && x < s + durs[k]); if (i < 0) i = scenes.length - 1;
    stopSpeech(); show(i); elapsed = x; paint(); if (playing) speak(scenes[cur].say);
  });
  $("#sp", el).addEventListener("change", (e) => { speed = +e.target.value; lsSet("cag-vspeed", String(speed)); if (speaking) speak(scenes[cur].say); });
  $("#vo", el).addEventListener("click", (e) => {
    voiceOn = !voiceOn; lsSet("cag-vvoice-on", voiceOn ? "1" : "0");
    e.currentTarget.textContent = voiceOn ? "🔊" : "🔇";
    if (!voiceOn) stopSpeech(); else if (playing) speak(scenes[cur].say);
    voiceInfo();
  });
  $("#voice", el).addEventListener("change", (e) => { voiceName = e.target.value; lsSet("cag-vvoice", voiceName); if (playing) speak(scenes[cur].say); voiceInfo(); });
  $("#fs", el).addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else vp.requestFullscreen?.().catch(() => toast("To'liq ekran rejimi qo'llab-quvvatlanmaydi"));
  });

  // ---- Video faylga yozib olish (ekran/tab yozuvi) ----
  async function startRec() {
    if (!navigator.mediaDevices?.getDisplayMedia || !window.MediaRecorder) return toast("Bu brauzer video yozishni qo'llab-quvvatlamaydi (Chrome yoki Edge'dan foydalaning)");
    let stream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 30 }, audio: true, preferCurrentTab: true, selfBrowserSurface: "include" });
    } catch { return toast("Yozib olish bekor qilindi"); }
    const chunks = [];
    const mime = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"].find((m) => MediaRecorder.isTypeSupported(m));
    const mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    mr.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    mr.onstop = () => {
      stream.getTracks().forEach((tr) => tr.stop());
      const blob = new Blob(chunks, { type: "video/webm" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = `video-dars-${bob.id}.webm`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      toast("Video saqlandi ✓");
      $("#rec", el).textContent = "⏺ Video fayl qilib yuklab olish";
      rec = null;
    };
    stream.getVideoTracks()[0].addEventListener("ended", () => rec && stopRec());
    rec = mr;
    $("#rec", el).textContent = "⏹ Yozishni to'xtatish";
    vp.requestFullscreen?.().catch(() => {});
    pause(); elapsed = 0; show(0);
    setTimeout(() => { mr.start(1000); play(); }, 800);
  }
  function stopRec() { if (rec && rec.state !== "inactive") rec.stop(); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); }
  $("#rec", el).addEventListener("click", () => (rec ? stopRec() : startRec()));

  const onKey = (e) => {
    if (e.target.closest?.("input, textarea, select") || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === " " || e.key === "k") { e.preventDefault(); toggle(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); $("#nx", el).click(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); $("#pv", el).click(); }
    else if (e.key === "f" || e.key === "F") $("#fs", el).click();
  };
  document.addEventListener("keydown", onKey);

  show(0);
  voiceInfo();
  vp.focus({ preventScroll: true });
  return () => {
    playing = false; cancelAnimationFrame(raf); stopSpeech();
    document.removeEventListener("keydown", onKey);
    if (window.speechSynthesis) speechSynthesis.onvoiceschanged = null;
    if (rec) stopRec();
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };
}
