// Platformada jamlangan xalqaro metodikalar va ular qayerda qo'llanilgani.

import { esc } from "../ui.js";

const METHODS = [
  { ico: "🗳", name: "Peer Instruction (o'zaro o'qitish)", src: "Eric Mazur, Harvard universiteti", what: "Konseptual savol → individual ovoz → juftlikda muhokama → qayta ovoz. To'g'ri javoblar ulushi odatda sezilarli oshadi.", where: [["Jonli viktorina → «📊 Ovozlar» va «🔄 Qayta ovoz»", "#/jonli"]] },
  { ico: "🎥", name: "Vizual intuitsiya (explorable explanations)", src: "G. Strang (MIT 18.06), 3Blue1Brown «Essence of Linear Algebra»", what: "Matritsa — tekislikni o'zgartiruvchi almashtirish; determinant — yuza koeffitsiyenti; xos vektor — yo'nalishi saqlanadigan chiziq. Formulani avval «ko'rish», keyin isbotlash.", where: [["Laboratoriya → Chiziqli almashtirish", "#/lab/almashtirish"], ["Egri chiziqlar", "#/lab/egri"]] },
  { ico: "🧠", name: "Retrieval practice (eslab chiqarish)", src: "H. Roediger, J. Karpicke — Washington University in St. Louis", what: "O'qilganni qayta o'qishdan ko'ra, uni xotiradan chiqarishga urinish uzoq muddatli xotirani ancha kuchliroq mustahkamlaydi.", where: [["Darslik ichidagi «O'zingizni tekshiring»", "#/darslik"]] },
  { ico: "🔁", name: "Oraliqli takrorlash (spaced repetition)", src: "H. Ebbinghaus; Leitner tizimi", what: "Savollar 1, 3, 7, 16, 35 kunlik oraliqlarda qaytariladi — unutish egri chizig'iga qarshi.", where: [["Takrorlash", "#/takrorlash"]] },
  { ico: "🎯", name: "Mastery learning (o'zlashtirishga asoslangan)", src: "B. Bloom (Chicago); Khan Academy", what: "Keyingi mavzuga o'tishdan oldin joriy mavzuni yuqori darajada o'zlashtirish. Har bir mavzu: Boshlangan → Tanish → Malakali → Ustoz.", where: [["Mashqlar", "#/mashq"]] },
  { ico: "🔀", name: "Interleaving (aralash mashq)", src: "D. Rohrer, K. Taylor — University of South Florida", what: "Har xil turdagi masalalarni aralashtirib yechish — talaba «qaysi usulni qo'llash kerak» degan savolni o'rganadi.", where: [["Aralash mashq", "#/mashq/aralash"]] },
  { ico: "📖", name: "Worked examples & faded guidance", src: "J. Sweller — kognitiv yuklama nazariyasi", what: "Yangi boshlovchiga to'liq yechilgan misol, keyin bosqichma-bosqich kamayuvchi yordam: maslahat 1 → maslahat 2 → to'liq yechim.", where: [["Mashqlardagi «💡 Maslahat» va «📖 Yechim»", "#/mashq"]] },
  { ico: "⚡", name: "Darhol qayta aloqa (immediate feedback)", src: "Carnegie Mellon — Open Learning Initiative", what: "Har bir javobga zudlik bilan baho va izoh — xato tushuncha mustahkamlanib qolmaydi.", where: [["Mashqlar", "#/mashq"], ["Laboratoriya kalkulyatori", "#/lab/kalkulyator"]] },
  { ico: "🏫", name: "Faol o'qitish va flipped classroom", src: "MIT TEAL, Stanford, Harvard; Freeman va boshq. (PNAS, 2014)", what: "Nazariya uyda (darslik + laboratoriya), auditoriya vaqti — muammo yechish, muhokama va o'yinlarga. Meta-tahlillarga ko'ra faol o'qitish an'anaviy ma'ruzaga nisbatan muvaffaqiyatsizlikni sezilarli kamaytiradi.", where: [["Darslik", "#/darslik"], ["Sinf vositalari", "#/vositalar"]] },
  { ico: "💭", name: "Think–Pair–Share", src: "F. Lyman, University of Maryland", what: "Yakka o'ylash → juftlikda muhokama → sinf bilan bo'lishish. Har bir talaba gapirishga majbur bo'ladi.", where: [["Sinf vositalari → Think–Pair–Share", "#/vositalar/tps"]] },
  { ico: "🎫", name: "Exit ticket / Muddiest point", src: "F. Mosteller, Harvard", what: "Dars oxirida «eng tushunarsiz nuqta»ni yozish — o'qituvchiga tezkor diagnostika.", where: [["Chiqish chiptasi", "#/vositalar/chiqish"]] },
  { ico: "🎡", name: "Cold calling (tasodifiy chaqirish)", src: "Harvard Business School case-metodi", what: "Tasodifiy tanlov barcha talabalarni tayyor turishga undaydi va faollikni tenglashtiradi.", where: [["Ismlar g'ildiragi", "#/charx"]] },
  { ico: "🏆", name: "Geymifikatsiya", src: "Kahoot! (NTNU, Norvegiya), Duolingo tajribasi", what: "XP, darajalar, seriyalar, nishonlar, reyting va jamoaviy musobaqalar — ichki motivatsiyani qo'llab-quvvatlaydi.", where: [["O'yinlar", "#/oyinlar"], ["Profil va nishonlar", "#/profil"]] },
  { ico: "🧩", name: "Individual variantlar (akademik halollik)", src: "Parametrlashtirilgan masalalar — WeBWorK (University of Rochester), MIT", what: "Har bir talabaga bir xil turdagi, ammo boshqa sonli masala — ko'chirishning ma'nosi yo'q, o'qituvchi esa kalit bo'yicha tekshiradi.", where: [["Mustaqil ish", "#/mustaqil"]] },
];

export function render(el) {
  el.innerHTML = `
    <div class="page-head"><h1>🎓 Metodika</h1>
      <p>Platforma dunyoning yetakchi universitetlarida samaradorligi tadqiqotlarda isbotlangan o'qitish usullarini bitta tizimga jamlaydi. Quyida — har bir usul, uning manbasi va platformadagi o'rni.</p></div>
    <div class="card mb">
      <h3>📅 Tavsiya etilgan haftalik sikl (flipped classroom)</h3>
      <div class="grid g4 mt">
        <div><span class="pill primary">Darsdan oldin</span><p class="small mt">Darslik bobi + ichki savollar, laboratoriyada vizualizatsiya (30–40 daq).</p></div>
        <div><span class="pill primary">Dars boshida</span><p class="small mt">Jonli viktorina (5–7 savol) — kim nimani tushunmaganini aniqlash.</p></div>
        <div><span class="pill primary">Dars o'rtasida</span><p class="small mt">Peer Instruction, Think–Pair–Share, g'ildirak bilan doskaga chaqirish, savollar taxtasi.</p></div>
        <div><span class="pill primary">Darsdan keyin</span><p class="small mt">Mashqlar («Ustoz» darajasigacha), takrorlash, mustaqil ish, chiqish chiptasi.</p></div>
      </div>
    </div>
    <div class="grid g2">
      ${METHODS.map((m) => `<div class="card method-card">
        <h3><span style="font-size:26px">${m.ico}</span>${esc(m.name)}</h3>
        <div class="src">📚 ${esc(m.src)}</div>
        <p class="mt">${esc(m.what)}</p>
        <div class="row">${m.where.map(([t, h]) => `<a class="btn sm" href="${h}">${esc(t)} →</a>`).join("")}</div>
      </div>`).join("")}
    </div>`;
}
