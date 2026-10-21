# Chiziqli algebra va analitik geometriya — interaktiv o'quv platformasi

Talabalar uchun interaktiv darslik, laboratoriya, mashqlar, mustaqil ishlar va sinf o'yinlari.
Qurish (build) bosqichi yo'q — oddiy HTML/CSS/JS. Jonli viktorina uchun Cloudflare Workers + Durable Objects.

## Imkoniyatlar

| Bo'lim | Nima qiladi | Metodika |
|---|---|---|
| 📘 Darslik | Fan 2 semestr o'qitiladi: 36 mavzu (1-semestr — chiziqli algebra, 18 mavzu; 2-semestr — analitik geometriya, 18 mavzu), Ivleva (2014) va Karchevskiy (2012) darsliklari asosida; Markdown boblar, LaTeX formulalar, ichki «O'zingizni tekshiring» savollari, PDF ko'rinish | Retrieval practice, flipped classroom |
| 🎞 Taqdimotlar | Har bir mavzu bo'yicha 30+ slaydli ma'ruza taqdimoti (36 ta taqdimot, jami 1097 slayd): ta'riflar, qadamma-qadam misollar, interaktiv savollar; to'liq ekran, ← → tugmalari, telefonda surish. Fayllar: `public/content/taqdimotlar/1-01.md` … `2-18.md`, slaydlar `---` qatori bilan ajratiladi | Ma'ruza + faol o'qitish |
| 🎬 Video-darslar | Har bir mavzu bo'yicha 1,5–2 daqiqalik qisqa video-dars (36 ta): mavzuning dolzarbligi, hayot bilan bog'liqligi, asosiy mazmuni. Brauzerda sahnalar, subtitrlar va (ovoz mavjud bo'lsa) diktor ovozi bilan ijro etiladi; «Video fayl qilib yuklab olish» — .webm fayl. Ssenariylar: `public/content/videolar/1-01.md` … `2-18.md` | Flipped classroom |
| 🔬 Laboratoriya | Chiziqli almashtirish (3Blue1Brown uslubi), 2D/3D vektorlar, konus kesimlari; sistemalarni Gauss, matritsaviy usul va Kramer qoidasi bilan yechish; determinantni Sarryus, yoyish va Gauss usullarida hisoblash; matritsa rangi va bazis minor; matritsa kalkulyatori — hammasi qadamma-qadam | Vizual intuitsiya (MIT 18.06) |
| 🎯 Mashqlar | 36 mavzu bo'yicha 61 xil masala generatori (semestrlar bo'yicha guruhlangan), cheksiz yangi masalalar, maslahatlar, to'liq yechim, mavzu bo'yicha o'zlashtirish darajasi | Mastery learning, worked examples, interleaving |
| 🔁 Takrorlash | Leitner qutilari (1-3-7-16-35 kun), 192 ta test savoli (har mavzuga kamida 5 ta) | Spaced repetition |
| 📝 Mustaqil ish | Har semestrda 4 ta hisob-grafik ish, oraliq va yakuniy nazorat (jami 12 ta); har talabaga shaxsiy variant, avtomatik tekshirish, tasdiqlash kodi | Individual variantlar (WeBWorK) |
| 🏆 Jonli viktorina | Kahoot uslubi: PIN/QR, telefondan javob, tezlik ballari, reyting, shohsupa, CSV | Peer Instruction (Mazur, Harvard) |
| 🎡 Ismlar g'ildiragi | Wheel of Names + tasodifiy savol | Cold calling |
| 🧩 Savollar taxtasi | Jeopardy uslubida jamoaviy o'yin | Geymifikatsiya |
| ⚡ Sprint / 🧠 Xotira | Tezkor hisob va juftlik topish o'yinlari | Fluency |
| 🧰 Sinf vositalari | Taymer, Think–Pair–Share, tasodifiy guruhlar, chiqish chiptasi | Faol o'qitish |
| 👩‍🏫 O'qituvchi paneli | Kodlarni (ommaviy) tekshirish, variant kaliti, bosma variantlar, darslik qo'shish va jonli ko'rib chiqish | — |

XP, darajalar, kunlik seriya va 16 ta nishon — har bir talabaning brauzerida saqlanadi.

## Cloudflare'ga GitHub orqali joylash

1. **GitHub'da yangi repozitoriy** yarating (masalan, `chiziqli-algebra`) va shu papkadagi barcha fayllarni yuklang:
   - Eng oson yo'l: GitHub sahifasida **Add file → Upload files** va papka ichidagi hamma narsani sudrab tashlang.
   - Yoki terminal orqali: `git init`, `git add .`, `git commit -m "Platforma"`, `git remote add origin <repo-url>`, `git push -u origin main`.
2. **Cloudflare Dashboard** → **Workers & Pages** → **Create** → **Import a repository** (Workers bo'limi).
3. GitHub hisobingizni ulang va repozitoriyni tanlang. Sozlamalar:
   - **Build command:** bo'sh qoldiring
   - **Deploy command:** `npx wrangler deploy`
4. **Deploy** tugmasini bosing. 1–2 daqiqadan so'ng sayt `https://chiziqli-algebra.<sizning-subdomen>.workers.dev` manzilida ochiladi.
5. Keyinchalik GitHub'dagi har bir o'zgarish (commit) saytni **avtomatik** yangilaydi.

> Jonli viktorina Durable Objects (SQLite) dan foydalanadi — bu Cloudflare'ning **bepul** rejasida ham mavjud.
> O'z domeningizni ulash: Worker → **Settings → Domains & Routes → Add custom domain**.

### O'qituvchi paroli

**O'tilgan mavzular:** O'qituvchi paneli → **📅 O'tilgan mavzular** — o'yinlar va takrorlashda faqat shu mavzugacha savollar chiqadi (semestr va mavzu tanlanadi) (sozlama serverda, barcha talabalar uchun). Har bir o'yinda mavzularni alohida tanlash mumkin.

Saytga faqat login va parol bilan kiriladi. O'qituvchi paneli (javob kalitlari, bosma variantlar, talabalar hisoblari) va jonli viktorina xonasini yaratish faqat o'qituvchiga ochiq. Jonli viktorinaga telefondan PIN orqali qo'shilish uchun kirish shart emas.

**Talabalar hisoblari:** O'qituvchi paneli → **👥 Talabalar** → guruh va talabalar ro'yxatini joylang → har biriga login va parol yaratiladi (chop etish yoki CSV). Hisoblar Cloudflare'da (Durable Object, SQLite) saqlanadi; parollar faqat xesh ko'rinishida. Parolni unutgan talabaga «🔑 Yangi parol» bering.

Parol kodda saqlanmaydi. Uni Cloudflare'da o'rnating:
**Workers & Pages → chiziqli → Settings → Variables and Secrets → Add** → Type: **Secret**, Name: `TEACHER_PASSWORD`, Value: parolingiz → **Deploy**.
Parolni almashtirsangiz, avval kirgan barcha o'qituvchi qurilmalari avtomatik chiqib ketadi.

### Mahalliy sinov (ixtiyoriy)

Node.js o'rnatilgan bo'lsa: `npm install`, so'ng `npx wrangler dev` — sayt `http://localhost:8787` da ochiladi (jonli viktorina ham ishlaydi).

## O'z darsligingizni qo'shish

```
public/content/
├── boblar.json        ← boblar ro'yxati (+ ixtiyoriy PDF)
├── boblar/*.md        ← har bir bob — alohida Markdown fayl
├── savollar.js        ← test savollari banki (o'yinlar va takrorlash uchun)
├── mustaqil.js        ← mustaqil ishlar ro'yxati va muddatlari (sem: 1 yoki 2)
├── taqdimotlar/*.md   ← taqdimotlar (slaydlar --- bilan ajratiladi)
└── videolar/*.md      ← video-darslar ssenariylari (sahnalar ---, diktor matni > qatorida)
```

**Bob qo'shish:** `public/content/boblar/3-01-yangi.md` faylini yarating va `boblar.json` ga qo'shing:

```json
{ "id": "3-01", "qism": "Qo'shimcha", "fayl": "boblar/3-01-yangi.md", "nomi": "Yangi bob", "mavzu": "matritsa", "daqiqa": 20 }
```

**PDF darslik:** faylni `public/content/darslik.pdf` qilib qo'ying va `boblar.json` da `"pdf": "content/darslik.pdf"` deb yozing.

**Formulalar:** `$...$` (qator ichida) va `$$...$$` (alohida qatorda), LaTeX sintaksisida.

**Maxsus bloklar:**

```
:::tarif
Ta'rif matni
:::

:::teorema Kramer qoidasi
...
:::

:::savol
Savol matni?
+ To'g'ri javob
- Noto'g'ri javob
- Noto'g'ri javob
> Izoh (ixtiyoriy)
:::
```

Bloklar: `tarif`, `teorema`, `misol`, `eslatma`, `xossa`, `diqqat`, `tarix`, `savol`.
O'qituvchi paneli → **Darslik qo'shish** bo'limida matnni joylab, natijani darhol ko'rishingiz mumkin.

## Mustaqil ishlar

`public/content/mustaqil.js` da topshiriqlarni belgilang (masala generatorlari ro'yxati shu faylda).
Talaba F.I.Sh. va guruhini kiritadi → shaxsiy variant oladi → topshirgach **tasdiqlash kodi** chiqadi → natija qatorini sizga yuboradi.
O'qituvchi paneli → **Natijalarni tekshirish** bo'limiga qatorlarni joylasangiz, kodlar avtomatik tekshiriladi.

`TUZ` qiymatini o'zgartirishni unutmang. Sayt kodi ochiq bo'lgani uchun bu kuchli himoya emas: tajribali talaba kodni soxtalashtirishi mumkin. Muhim nazoratlar uchun **Bosma variantlar** (qog'ozda) yoki «Variant kaliti» orqali og'zaki tekshiruvdan foydalaning.

## Tuzilma

```
src/worker.js          ← Cloudflare Worker + QuizRoom Durable Object (jonli viktorina)
wrangler.jsonc         ← Cloudflare konfiguratsiyasi
public/index.html      ← ilova qobig'i
public/css/style.css   ← dizayn (yorug'/qorong'i rejim, mobil)
public/js/
├── app.js             ← marshrutlash
├── math.js            ← kasrlar, matritsalar, Gauss usuli (qadamlari bilan)
├── generators.js      ← 36 mavzu (TOPICS: sem, no) va 61 ta masala generatori
├── store.js           ← XP, darajalar, nishonlar, takrorlash
└── pages/*.js         ← har bir bo'lim
```
