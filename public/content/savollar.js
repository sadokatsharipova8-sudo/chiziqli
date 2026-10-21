// SAVOLLAR BANKI — jonli viktorina, g'ildirak, savollar taxtasi va takrorlash shu yerdan oladi.
// Yangi savol qo'shish: shu formatda element qo'shing.
//   id      — takrorlanmas identifikator
//   topic   — mavzu id si (generators.js dagi TOPICS, 36 ta: 1-semestr 18 + 2-semestr 18)
//   d       — qiyinlik: 1 (oson), 2 (o'rta), 3 (qiyin)
//   q       — savol matni ($...$ ichida LaTeX formula)
//   options — 2–4 ta variant
//   correct — to'g'ri variant indeksi (0 dan boshlab)
//   explain — izoh (ixtiyoriy)

export const SAVOLLAR = [
  // ===== Matritsalar =====
  { id: "m1", topic: "matritsa", d: 1, q: "$3\\times 2$ o'lchamli matritsada nechta element bor?", options: ["5", "6", "9", "3"], correct: 1, explain: "$3\\cdot 2 = 6$." },
  { id: "m2", topic: "matritsa", d: 1, q: "Qaysi matritsalarni qo'shish mumkin?", options: ["Istalgan ikki matritsani", "Faqat kvadrat matritsalarni", "Bir xil o'lchamli matritsalarni", "Ustunlar soni teng bo'lganlarni"], correct: 2 },
  { id: "m3", topic: "matritsa", d: 2, q: "$A$ — $2\\times 3$, $B$ — $2\\times 3$. Qaysi ko'paytma aniqlangan?", options: ["$AB$", "$BA$", "$AB^T$", "Hech biri"], correct: 2, explain: "$A$ ($2\\times 3$) $\\cdot$ $B^T$ ($3\\times 2$) $\\to$ $2\\times 2$." },
  { id: "m4", topic: "matritsa", d: 2, q: "$(AB)^T$ ga teng:", options: ["$A^TB^T$", "$B^TA^T$", "$BA$", "$AB$"], correct: 1 },
  { id: "m5", topic: "matritsa", d: 1, q: "$\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}\\begin{pmatrix}1\\\\1\\end{pmatrix}$ = ?", options: ["$\\begin{pmatrix}3\\\\1\\end{pmatrix}$", "$\\begin{pmatrix}1\\\\3\\end{pmatrix}$", "$\\begin{pmatrix}2\\\\1\\end{pmatrix}$", "$\\begin{pmatrix}3\\\\0\\end{pmatrix}$"], correct: 0 },
  { id: "m6", topic: "matritsa", d: 3, q: "$A^2 = O$ bo'lsa, albatta $A = O$ bo'ladimi?", options: ["Ha, har doim", "Yo'q, masalan $\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$", "Faqat $2\\times 2$ da ha", "Faqat simmetrik matritsalar uchun yo'q"], correct: 1, explain: "Nilpotent matritsalar mavjud." },
  { id: "m7", topic: "matritsa", d: 1, q: "Birlik matritsa $E$ uchun $AE$ ga teng:", options: ["$E$", "$O$", "$A$", "$A^T$"], correct: 2 },

  // ===== Determinantlar =====
  { id: "d1", topic: "determinant", d: 1, q: "$\\begin{vmatrix}2&3\\\\1&4\\end{vmatrix}$ = ?", options: ["5", "11", "8", "-5"], correct: 0 },
  { id: "d2", topic: "determinant", d: 1, q: "Ikki satri bir xil determinant nimaga teng?", options: ["1", "0", "Satr elementlari yig'indisiga", "Aniqlab bo'lmaydi"], correct: 1 },
  { id: "d3", topic: "determinant", d: 2, q: "Determinantning ikki satri o'rnini almashtirsak:", options: ["O'zgarmaydi", "Nolga aylanadi", "Ishorasi o'zgaradi", "Ikki marta ortadi"], correct: 2 },
  { id: "d4", topic: "determinant", d: 2, q: "$\\det A = 2$, $\\det B = -3$ bo'lsa, $\\det(AB)$ = ?", options: ["-1", "-6", "6", "5"], correct: 1 },
  { id: "d5", topic: "determinant", d: 2, q: "$\\begin{vmatrix}1&0&0\\\\5&2&0\\\\7&8&3\\end{vmatrix}$ = ?", options: ["6", "0", "26", "-6"], correct: 0, explain: "Uchburchak matritsa: diagonal ko'paytmasi $1\\cdot2\\cdot3$." },
  { id: "d6", topic: "determinant", d: 3, q: "$4\\times 4$ matritsa uchun $\\det(-A)$ = ?", options: ["$-\\det A$", "$\\det A$", "$-4\\det A$", "$16\\det A$"], correct: 1, explain: "$(-1)^4\\det A$." },
  { id: "d7", topic: "minor", d: 2, q: "$a_{23}$ elementning algebraik to'ldiruvchisi ishorasi:", options: ["$+$", "$-$", "Elementga bog'liq", "Har doim 0"], correct: 1, explain: "$(-1)^{2+3} = -1$." },
  { id: "d8", topic: "determinant", d: 3, q: "$2\\times 2$ matritsa determinantining geometrik ma'nosi:", options: ["Ustun-vektorlar orasidagi burchak", "Parallelogrammning yo'naltirilgan yuzi", "Vektorlar uzunliklari yig'indisi", "Diagonal uzunligi"], correct: 1 },

  // ===== Teskari matritsa, rang =====
  { id: "t1", topic: "teskari", d: 1, q: "Teskari matritsa mavjud bo'lishi sharti:", options: ["$\\det A = 0$", "$\\det A \\ne 0$", "$A$ simmetrik", "$A$ diagonal"], correct: 1 },
  { id: "t2", topic: "teskari", d: 2, q: "$\\begin{pmatrix}2&0\\\\0&4\\end{pmatrix}^{-1}$ = ?", options: ["$\\begin{pmatrix}-2&0\\\\0&-4\\end{pmatrix}$", "$\\begin{pmatrix}\\frac12&0\\\\0&\\frac14\\end{pmatrix}$", "$\\begin{pmatrix}4&0\\\\0&2\\end{pmatrix}$", "Mavjud emas"], correct: 1 },
  { id: "t3", topic: "teskari", d: 2, q: "$(AB)^{-1}$ = ?", options: ["$A^{-1}B^{-1}$", "$B^{-1}A^{-1}$", "$BA$", "$A^{-1} + B^{-1}$"], correct: 1 },
  { id: "t4", topic: "rang", d: 1, q: "Nol matritsaning rangi:", options: ["0", "1", "Satrlar soni", "Aniqlanmagan"], correct: 0 },
  { id: "t5", topic: "rang", d: 2, q: "$\\begin{pmatrix}1&2&3\\\\2&4&6\\end{pmatrix}$ ning rangi:", options: ["1", "2", "3", "0"], correct: 0, explain: "Ikkinchi satr birinchisining 2 barobari." },
  { id: "t6", topic: "rang", d: 3, q: "$3\\times 5$ matritsa rangining eng katta mumkin qiymati:", options: ["5", "3", "15", "8"], correct: 1, explain: "$\\operatorname{rang} \\le \\min(m,n)$." },
  { id: "t7", topic: "teskari", d: 2, q: "$\\det A = 4$ bo'lsa, $\\det A^{-1}$ = ?", options: ["4", "-4", "$\\frac14$", "16"], correct: 2 },

  // ===== Sistemalar =====
  { id: "s1", topic: "teskari", d: 1, q: "Kramer qoidasini qo'llash sharti:", options: ["$\\Delta = 0$", "$\\Delta \\ne 0$ va sistema kvadrat", "Sistema bir jinsli", "Tenglamalar soni noma'lumlardan ko'p"], correct: 1 },
  { id: "s2", topic: "rang", d: 2, q: "Kroneker–Kapelli: sistema birgalikda $\\iff$", options: ["$\\det A \\ne 0$", "$\\operatorname{rang}A = \\operatorname{rang}\\bar A$", "$\\operatorname{rang}A = n$", "$B = 0$"], correct: 1 },
  { id: "s3", topic: "sistema", d: 2, q: "$\\begin{cases}x + y = 2\\\\ 2x + 2y = 5\\end{cases}$ sistema:", options: ["Yagona yechimli", "Cheksiz ko'p yechimli", "Yechimsiz", "Bir jinsli"], correct: 2, explain: "Chap tomonlar proporsional, o'ng tomonlar — yo'q." },
  { id: "s4", topic: "sistema", d: 1, q: "$\\begin{cases}x + y = 5\\\\ x - y = 1\\end{cases}$ yechimi:", options: ["$(3;2)$", "$(2;3)$", "$(4;1)$", "$(5;0)$"], correct: 0 },
  { id: "s5", topic: "sistema", d: 3, q: "$\\operatorname{rang}A = \\operatorname{rang}\\bar A = 2$, noma'lumlar soni 4. Erkin noma'lumlar soni:", options: ["0", "1", "2", "4"], correct: 2, explain: "$n - r = 4 - 2$." },
  { id: "s6", topic: "sistema", d: 2, q: "Bir jinsli sistema $AX=0$ har doim:", options: ["Yechimsiz", "Birgalikda", "Cheksiz ko'p yechimli", "Yagona yechimli"], correct: 1 },
  { id: "s7", topic: "sistema", d: 2, q: "Gauss usulining birinchi bosqichi natijasi:", options: ["Diagonal matritsa", "Pog'onasimon (uchburchak) matritsa", "Teskari matritsa", "Nol matritsa"], correct: 1 },

  // ===== Vektorlar =====
  { id: "v1", topic: "vektor", d: 1, q: "$\\vec a = (3;4)$ vektor uzunligi:", options: ["7", "5", "25", "1"], correct: 1 },
  { id: "v2", topic: "skalyar", d: 1, q: "$\\vec a\\cdot\\vec b = 0$ (nolmas vektorlar) bo'lsa:", options: ["Vektorlar kollinear", "Vektorlar perpendikulyar", "Vektorlar teng", "Biri nol"], correct: 1 },
  { id: "v3", topic: "vkopaytma", d: 2, q: "$|\\vec a\\times\\vec b|$ geometrik ma'nosi:", options: ["Uchburchak perimetri", "Parallelogramm yuzi", "Parallelepiped hajmi", "Burchak kosinusi"], correct: 1 },
  { id: "v4", topic: "skalyar", d: 2, q: "$(1;2;3)\\cdot(4;-5;6)$ = ?", options: ["12", "32", "-12", "0"], correct: 0, explain: "$4 - 10 + 18 = 12$." },
  { id: "v5", topic: "vkopaytma", d: 2, q: "$\\vec b\\times\\vec a$ = ?", options: ["$\\vec a\\times\\vec b$", "$-\\vec a\\times\\vec b$", "$0$", "$\\vec a\\cdot\\vec b$"], correct: 1 },
  { id: "v6", topic: "aralash", d: 3, q: "Uch vektor komplanar $\\iff$", options: ["Aralash ko'paytma 0", "Skalyar ko'paytmalar 0", "Uzunliklar teng", "Vektor ko'paytma 1"], correct: 0 },
  { id: "v7", topic: "vektor", d: 1, q: "$A(1;2)$, $B(4;6)$. $\\overrightarrow{AB}$ = ?", options: ["$(5;8)$", "$(3;4)$", "$(-3;-4)$", "$(4;3)$"], correct: 1 },
  { id: "v8", topic: "vkopaytma", d: 3, q: "$\\vec i\\times\\vec k$ = ?", options: ["$\\vec j$", "$-\\vec j$", "$0$", "$\\vec i$"], correct: 1, explain: "$\\vec k\\times\\vec i = \\vec j$, demak $\\vec i\\times\\vec k = -\\vec j$." },

  { id: "v9", topic: "skalyar", d: 2, q: "$\\vec a = (2;-1;2)$ ning yo'naltiruvchi kosinusi $\\cos\\alpha$ = ?", options: ["$\\frac23$", "$\\frac13$", "$2$", "$-\\frac13$"], correct: 0, explain: "$|\\vec a| = 3$, $\\cos\\alpha = \\frac{a_x}{|\\vec a|}$." },
  { id: "v10", topic: "vektor", d: 3, q: "$AB$ kesmaning o'rtasi: $A(1;3)$, $B(5;-1)$.", options: ["$(3;1)$", "$(2;2)$", "$(6;2)$", "$(4;-4)$"], correct: 0 },

  // ===== To'g'ri chiziq =====
  { id: "l1", topic: "togri-chiziq", d: 1, q: "$y = -3x + 2$ ning burchak koeffitsiyenti:", options: ["2", "-3", "3", "$-\\frac23$"], correct: 1 },
  { id: "l2", topic: "togri-chiziq", d: 1, q: "$Ax + By + C = 0$ ning normal vektori:", options: ["$(A;B)$", "$(B;-A)$", "$(A;C)$", "$(-B;A)$"], correct: 0 },
  { id: "l3", topic: "togri-chiziq", d: 2, q: "$y = 2x+1$ va $y = 2x - 5$ to'g'ri chiziqlar:", options: ["Kesishadi", "Parallel", "Perpendikulyar", "Ustma-ust"], correct: 1 },
  { id: "l4", topic: "togri-chiziq", d: 2, q: "Perpendikulyarlik sharti ($k_1$, $k_2$):", options: ["$k_1 = k_2$", "$k_1k_2 = 1$", "$k_1k_2 = -1$", "$k_1 + k_2 = 0$"], correct: 2 },
  { id: "l5", topic: "togri-chiziq", d: 2, q: "$\\frac{x}{3} + \\frac{y}{4} = 1$ to'g'ri chiziq $Oy$ o'qini qaysi nuqtada kesadi?", options: ["$(0;3)$", "$(0;4)$", "$(4;0)$", "$(0;1)$"], correct: 1 },
  { id: "l6", topic: "togri-chiziq", d: 3, q: "$(0;0)$ dan $6x + 8y - 20 = 0$ gacha masofa:", options: ["20", "2", "10", "$\\frac{10}{7}$"], correct: 1 },

  // ===== Tekislik =====
  { id: "p1", topic: "tekislik", d: 1, q: "$x + 2y - z + 5 = 0$ tekislikning normal vektori:", options: ["$(1;2;-1)$", "$(1;2;5)$", "$(2;1;-1)$", "$(-1;2;1)$"], correct: 0 },
  { id: "p2", topic: "tekislik", d: 2, q: "$z = 0$ tenglama nimani ifodalaydi?", options: ["$Oz$ o'qini", "$Oxy$ tekisligini", "Koordinatalar boshini", "$Oxz$ tekisligini"], correct: 1 },
  { id: "p3", topic: "tekislik", d: 2, q: "Ikki tekislik perpendikulyar $\\iff$", options: ["$\\vec n_1 \\parallel \\vec n_2$", "$\\vec n_1\\cdot\\vec n_2 = 0$", "$D_1 = D_2$", "$|\\vec n_1| = |\\vec n_2|$"], correct: 1 },
  { id: "p4", topic: "tekislik", d: 2, q: "$\\frac{x}{2} + \\frac{y}{3} + \\frac{z}{6} = 1$ tekislik $Oz$ o'qini kesadi:", options: ["$(0;0;6)$", "$(0;0;2)$", "$(6;0;0)$", "$(0;0;1)$"], correct: 0 },
  { id: "p5", topic: "tekislik", d: 3, q: "$(1;1;1)$ dan $2x + 2y + z - 2 = 0$ tekislikkacha masofa:", options: ["1", "3", "$\\frac13$", "$\\frac53$"], correct: 0, explain: "$|2+2+1-2|/3 = 1$." },
  { id: "p6", topic: "fazo-chiziq", d: 2, q: "Fazodagi to'g'ri chiziqning kanonik tenglamasida maxrajlar nimani bildiradi?", options: ["Nuqta koordinatalarini", "Yo'naltiruvchi vektorni", "Normal vektorni", "Masofani"], correct: 1 },

  // ===== Egri chiziqlar =====
  { id: "e1", topic: "ellips", d: 1, q: "$x^2 + y^2 = 49$ aylananing radiusi:", options: ["49", "7", "14", "$\\sqrt7$"], correct: 1 },
  { id: "e2", topic: "ellips", d: 1, q: "Ellips ekssentrisiteti:", options: ["$\\varepsilon = 1$", "$\\varepsilon > 1$", "$0 \\le \\varepsilon < 1$", "$\\varepsilon < 0$"], correct: 2 },
  { id: "e3", topic: "ellips", d: 2, q: "$\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ ellipsning katta yarim o'qi:", options: ["16", "4", "3", "5"], correct: 1 },
  { id: "e4", topic: "giperbola", d: 2, q: "Giperbola uchun $c^2$ = ?", options: ["$a^2 - b^2$", "$a^2 + b^2$", "$b^2 - a^2$", "$2ab$"], correct: 1 },
  { id: "e5", topic: "giperbola", d: 2, q: "$y^2 = 8x$ parabolaning direktrisasi:", options: ["$x = 2$", "$x = -2$", "$x = -4$", "$y = -2$"], correct: 1 },
  { id: "e6", topic: "ellips", d: 3, q: "$x^2 + y^2 + 6x - 2y = 6$ aylana markazi:", options: ["$(3;-1)$", "$(-3;1)$", "$(6;-2)$", "$(-6;2)$"], correct: 1, explain: "$(x+3)^2 + (y-1)^2 = 16$." },
  { id: "e7", topic: "giperbola", d: 3, q: "Teng tomonli giperbola ($a = b$) ekssentrisiteti:", options: ["1", "2", "$\\sqrt2$", "$\\frac{\\sqrt2}{2}$"], correct: 2 },

  // ===== Xos qiymatlar =====
  { id: "x1", topic: "xos-qiymat", d: 1, q: "$A\\vec x = \\lambda\\vec x$ tenglikda $\\lambda$ nima deyiladi?", options: ["Xos vektor", "Xos qiymat", "Determinant", "Iz"], correct: 1 },
  { id: "x2", topic: "xos-qiymat", d: 2, q: "Xarakteristik tenglama:", options: ["$\\det A = \\lambda$", "$\\det(A - \\lambda E) = 0$", "$A - \\lambda = 0$", "$\\operatorname{tr}A = \\lambda$"], correct: 1 },
  { id: "x3", topic: "xos-qiymat", d: 2, q: "$\\begin{pmatrix}2&1\\\\0&5\\end{pmatrix}$ ning xos qiymatlari:", options: ["2 va 5", "1 va 0", "2 va 1", "7 va 10"], correct: 0, explain: "Uchburchak matritsa — diagonal elementlar." },
  { id: "x4", topic: "xos-qiymat", d: 2, q: "Xos qiymatlar ko'paytmasi teng:", options: ["$\\operatorname{tr}A$", "$\\det A$", "$\\operatorname{rang}A$", "$n$"], correct: 1 },
  { id: "x5", topic: "xos-qiymat", d: 3, q: "$\\operatorname{tr}A = 6$, $\\det A = 8$ ($2\\times 2$). Xos qiymatlar:", options: ["2 va 4", "1 va 8", "3 va 3", "-2 va -4"], correct: 0, explain: "$\\lambda^2 - 6\\lambda + 8 = 0$." },
  { id: "x6", topic: "almashtirish", d: 1, q: "$\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$ qanday almashtirish?", options: ["Simmetriya", "$90^\\circ$ ga burish", "Siljish", "Proyeksiya"], correct: 1 },
  { id: "x7", topic: "xos-qiymat", d: 3, q: "$\\lambda = 0$ xos qiymat bo'lsa:", options: ["$A = O$", "$\\det A = 0$", "$A = E$", "$\\operatorname{tr}A = 0$"], correct: 1 },
  { id: "x8", topic: "yadro", d: 2, q: "Operator rangi 2, defekti 1. Fazo o'lchovi:", options: ["1", "2", "3", "4"], correct: 2, explain: "Rang + defekt = $\\dim V$." },
  { id: "x9", topic: "xos-qiymat", d: 3, q: "Simmetrik haqiqiy matritsaning xos sonlari:", options: ["Har doim haqiqiy", "Har doim musbat", "Har doim kompleks", "Har doim butun"], correct: 0 },

  // ===== Kompleks sonlar =====
  { id: "k1", topic: "kompleks", d: 1, q: "$i^2$ = ?", options: ["1", "-1", "$i$", "0"], correct: 1 },
  { id: "k2", topic: "kompleks", d: 1, q: "$z = 3 - 4i$ ning moduli:", options: ["5", "7", "-1", "25"], correct: 0, explain: "$\\sqrt{9 + 16} = 5$." },
  { id: "k3", topic: "kompleks", d: 2, q: "$(1 + i)^2$ = ?", options: ["2", "$2i$", "$1 + i$", "0"], correct: 1, explain: "$1 + 2i + i^2 = 2i$." },
  { id: "k4", topic: "kompleks", d: 2, q: "$i^{103}$ = ?", options: ["$i$", "$-i$", "1", "-1"], correct: 1, explain: "$103 = 4\\cdot 25 + 3$, $i^3 = -i$." },
  { id: "k5", topic: "kompleks", d: 2, q: "$z = 2 + 5i$ ning qo'shmasi:", options: ["$-2 + 5i$", "$2 - 5i$", "$-2 - 5i$", "$5 + 2i$"], correct: 1 },
  { id: "k6", topic: "kompleks", d: 3, q: "Muavr formulasi bo'yicha $(\\cos\\varphi + i\\sin\\varphi)^n$ = ?", options: ["$\\cos^n\\varphi + i\\sin^n\\varphi$", "$\\cos n\\varphi + i\\sin n\\varphi$", "$n\\cos\\varphi + in\\sin\\varphi$", "$\\cos\\varphi^n + i\\sin\\varphi^n$"], correct: 1 },
  { id: "k7", topic: "kompleks", d: 3, q: "$z^6 = 1$ tenglamaning nechta kompleks ildizi bor?", options: ["1", "2", "3", "6"], correct: 3 },

  // ===== Minorlar =====
  { id: "n1", topic: "minor", d: 1, q: "$M_{ij}$ minor qanday hosil qilinadi?", options: ["$i$-satr va $j$-ustunni o'chirib", "$a_{ij}$ ni nolga almashtirib", "$i$- va $j$-satrlarni almashtirib", "Matritsani transponirlab"], correct: 0 },
  { id: "n2", topic: "minor", d: 2, q: "$A_{ij}$ va $M_{ij}$ orasidagi bog'lanish:", options: ["$A_{ij} = M_{ij}$", "$A_{ij} = (-1)^{i+j}M_{ij}$", "$A_{ij} = -M_{ij}$", "$A_{ij} = a_{ij}M_{ij}$"], correct: 1 },
  { id: "n3", topic: "minor", d: 2, q: "$\\sum_j a_{1j}A_{2j}$ = ?", options: ["$\\det A$", "0", "$-\\det A$", "1"], correct: 1, explain: "«Begona» algebraik to'ldiruvchilar bo'yicha yoyish nolga teng." },
  { id: "n4", topic: "minor", d: 3, q: "$\\begin{vmatrix} A & B\\\\ O & C\\end{vmatrix}$ (blok-uchburchak) = ?", options: ["$\\det A + \\det C$", "$\\det A\\cdot\\det C$", "$\\det B$", "$\\det(AC - B)$"], correct: 1, explain: "Laplas teoremasi natijasi." },
  { id: "n5", topic: "minor", d: 1, q: "Determinantni yoyish uchun qaysi satrni tanlash qulay?", options: ["Eng katta sonlar bor satrni", "Nollari eng ko'p satrni", "Har doim birinchi satrni", "Oxirgi satrni"], correct: 1 },

  // ===== Rang =====
  { id: "r1", topic: "rang", d: 2, q: "Elementar almashtirishlar matritsa rangini:", options: ["O'zgartirmaydi", "Bittaga oshiradi", "Nolga aylantiradi", "Ikki marta oshiradi"], correct: 0 },
  { id: "r2", topic: "rang", d: 2, q: "$\\mathbb R^3$ da 4 ta vektor har doim:", options: ["Chiziqli erkli", "Chiziqli bog'liq", "Ortogonal", "Kollinear"], correct: 1 },
  { id: "r3", topic: "rang", d: 3, q: "$n\\times n$ matritsa uchun $\\operatorname{rang}A = n \\iff$", options: ["$\\det A = 0$", "$\\det A \\ne 0$", "$A$ simmetrik", "$\\operatorname{tr}A \\ne 0$"], correct: 1 },

  // ===== Chiziqli fazo =====
  { id: "f1", topic: "fazo", d: 1, q: "$\\mathbb R^n$ fazoning o'lchovi:", options: ["1", "$n$", "$n^2$", "Cheksiz"], correct: 1 },
  { id: "f2", topic: "fazo", d: 2, q: "Darajasi $\\le 3$ ko'phadlar fazosi $P_3$ ning o'lchovi:", options: ["3", "4", "2", "Cheksiz"], correct: 1, explain: "Bazis: $1, t, t^2, t^3$." },
  { id: "f3", topic: "qism-fazo", d: 2, q: "Qaysi to'plam $\\mathbb R^3$ ning qism fazosi?", options: ["$x + y + z = 1$ tekislik", "$x + y + z = 0$ tekislik", "Birlik sfera", "Birinchi oktant"], correct: 1, explain: "Qism fazo nol vektorni o'z ichiga olishi kerak." },
  { id: "f4", topic: "qism-fazo", d: 3, q: "$\\dim L_1 = 2$, $\\dim L_2 = 2$, $\\dim(L_1 \\cap L_2) = 1$. $\\dim(L_1 + L_2)$ = ?", options: ["4", "3", "2", "1"], correct: 1, explain: "Grassman formulasi: $2 + 2 - 1$." },
  { id: "f5", topic: "fazo", d: 2, q: "O'tish matritsasi $T$ bo'lsa, yangi koordinatalar:", options: ["$X' = TX$", "$X' = T^{-1}X$", "$X' = T^TX$", "$X' = X$"], correct: 1 },

  // ===== Yevklid fazosi =====
  { id: "y1", topic: "yevklid", d: 1, q: "$\\mathbb R^3$ da $(1;2;2)$ vektorning uzunligi:", options: ["5", "3", "9", "$\\sqrt5$"], correct: 1 },
  { id: "y2", topic: "yevklid", d: 2, q: "Koshi–Bunyakovskiy tengsizligi:", options: ["$|(x,y)| \\le |x||y|$", "$|x + y| \\ge |x| + |y|$", "$(x,y) \\ge 0$", "$|x||y| \\le (x,y)$"], correct: 0 },
  { id: "y3", topic: "yevklid", d: 2, q: "Ortonormal bazisda $\\mathbf x$ ning koordinatasi $x_i$ = ?", options: ["$|\\mathbf x|$", "$(\\mathbf x, \\mathbf e_i)$", "$|\\mathbf e_i|$", "$1$"], correct: 1, explain: "Furye koeffitsiyentlari." },
  { id: "y4", topic: "gram", d: 3, q: "Gram–Shmidt: $\\mathbf a_1 = (1;1)$, $\\mathbf a_2 = (1;0)$. $\\mathbf b_2$ = ?", options: ["$(\\frac12; -\\frac12)$", "$(1;0)$", "$(0;1)$", "$(1;-1)$"], correct: 0, explain: "$\\mathbf b_2 = (1;0) - \\frac12(1;1)$." },
  { id: "y5", topic: "gram", d: 2, q: "$\\dim L = 2$, $\\dim V = 5$. $\\dim L^\\perp$ = ?", options: ["2", "3", "5", "7"], correct: 1 },

  // ===== Kvadratik formalar =====
  { id: "q1", topic: "formalar", d: 1, q: "$f = x^2 + 4xy + y^2$ matritsasida $a_{12}$ = ?", options: ["4", "2", "1", "0"], correct: 1 },
  { id: "q2", topic: "kanonik", d: 2, q: "Silvestr mezoni: forma musbat aniqlangan $\\iff$", options: ["$\\det A > 0$", "Barcha burchak minorlari $> 0$", "$\\operatorname{tr}A > 0$", "Barcha elementlar $> 0$"], correct: 1 },
  { id: "q3", topic: "kanonik", d: 2, q: "$f = 2x^2 + 2xy + 3y^2$ qanday forma?", options: ["Musbat aniqlangan", "Manfiy aniqlangan", "Aniqlanmagan", "Aynigan"], correct: 0, explain: "$\\Delta_1 = 2 > 0$, $\\Delta_2 = 6 - 1 = 5 > 0$." },
  { id: "q4", topic: "kanonik", d: 3, q: "Inersiya qonuni nimani tasdiqlaydi?", options: ["Kanonik ko'rinish yagona", "Musbat va manfiy koeffitsiyentlar soni o'zgarmas", "Xos sonlar o'zgarmas", "Determinant o'zgarmas"], correct: 1 },
  { id: "q5", topic: "kanonik", d: 3, q: "$f = x^2 - y^2$ qanday forma?", options: ["Musbat aniqlangan", "Manfiy aniqlangan", "Aniqlanmagan", "Nol forma"], correct: 2 },

  // ===== Vektor va aralash ko'paytma =====
  { id: "w1", topic: "vkopaytma", d: 1, q: "$\\vec a\\times\\vec a$ = ?", options: ["$|\\vec a|^2$", "$\\vec 0$", "$2\\vec a$", "1"], correct: 1 },
  { id: "w2", topic: "aralash", d: 2, q: "Tetraedr hajmi aralash ko'paytma orqali:", options: ["$|\\vec a\\vec b\\vec c|$", "$\\frac12|\\vec a\\vec b\\vec c|$", "$\\frac16|\\vec a\\vec b\\vec c|$", "$\\frac13|\\vec a\\vec b\\vec c|$"], correct: 2 },
  { id: "w3", topic: "vkopaytma", d: 2, q: "$(1;0;0)\\times(0;1;0)$ = ?", options: ["$(0;0;1)$", "$(0;0;-1)$", "$(1;1;0)$", "0"], correct: 0 },

  // ===== Koordinatalar =====
  { id: "c1", topic: "qutb", d: 1, q: "Qutb koordinatalari $r = 2$, $\\varphi = \\frac{\\pi}{2}$ bo'lgan nuqta:", options: ["$(2;0)$", "$(0;2)$", "$(-2;0)$", "$(0;-2)$"], correct: 1 },
  { id: "c2", topic: "qutb", d: 2, q: "$M(1;1)$ ning qutb burchagi:", options: ["$\\frac{\\pi}{4}$", "$\\frac{\\pi}{2}$", "$\\frac{3\\pi}{4}$", "0"], correct: 0 },
  { id: "c3", topic: "dekart", d: 2, q: "Koordinata boshi $O'(2;3)$ ga ko'chirildi. $M(5;1)$ ning yangi koordinatalari:", options: ["$(7;4)$", "$(3;-2)$", "$(-3;2)$", "$(5;1)$"], correct: 1 },
  { id: "c4", topic: "dekart", d: 3, q: "O'qlarni burish matritsasi qanday matritsa?", options: ["Ortogonal", "Nol", "Aynigan", "Kososimmetrik"], correct: 0 },
  { id: "c5", topic: "qutb", d: 2, q: "Silindrik koordinatalarda $r = 3$ tenglama:", options: ["Sfera", "Doiraviy silindr", "Tekislik", "Konus"], correct: 1 },

  // ===== Sirtlar =====
  { id: "z1", topic: "sirt", d: 1, q: "$x^2 + y^2 + z^2 = 9$ sirti:", options: ["Sfera, $R = 9$", "Sfera, $R = 3$", "Ellipsoid", "Konus"], correct: 1 },
  { id: "z2", topic: "sirt", d: 2, q: "$z = x^2 - y^2$ sirti:", options: ["Elliptik paraboloid", "Giperbolik paraboloid", "Konus", "Giperboloid"], correct: 1 },
  { id: "z3", topic: "sirt", d: 2, q: "$x^2 + y^2 - z^2 = 0$ sirti:", options: ["Konus", "Silindr", "Sfera", "Paraboloid"], correct: 0 },
  { id: "z4", topic: "yasovchi", d: 3, q: "Qaysi sirt to'g'ri chiziqli yasovchilarga ega?", options: ["Ellipsoid", "Bir pallali giperboloid", "Ikki pallali giperboloid", "Elliptik paraboloid"], correct: 1, explain: "Shuxov minoralari shu xossaga asoslangan." },
  { id: "z5", topic: "sirt", d: 2, q: "Fazoda $x^2 + y^2 = 4$ tenglama:", options: ["Aylana", "Sfera", "Doiraviy silindr", "Konus"], correct: 2 },

  // ===== 1-semestr: yangi mavzular =====
  { id: "a1", topic: "arifmetik", d: 1, q: "$(1, 2, -1) + 2(0, 1, 3)$ = ?", options: ["$(1, 4, 5)$", "$(2, 6, 4)$", "$(1, 3, 2)$", "$(1, 4, 2)$"], correct: 0 },
  { id: "a2", topic: "arifmetik", d: 1, q: "Nol vektorni o'z ichiga olgan sistema qanday?", options: ["Har doim chiziqli erkli", "Har doim chiziqli bog'liq", "Vektorlarga bog'liq", "Ortonormal"], correct: 1 },
  { id: "a3", topic: "arifmetik", d: 2, q: "$\\vec a = (1, k)$ va $\\vec b = (3, 6)$ qaysi $k$ da chiziqli bog'liq?", options: ["$k = 3$", "$k = 2$", "$k = 6$", "hech qachon"], correct: 1, explain: "Proporsionallik: $\\frac13 = \\frac k6$." },
  { id: "a4", topic: "arifmetik", d: 2, q: "$(1, 0, 0)$, $(0, 1, 0)$, $(1, 1, 0)$ vektorlar?", options: ["Chiziqli erkli", "Chiziqli bog'liq", "Ortonormal", "Bazis"], correct: 1, explain: "Uchinchisi birinchi ikkitasining yig'indisi." },
  { id: "a5", topic: "arifmetik", d: 3, q: "Chiziqli bog'liqlik ta'rifida koeffitsiyentlar qanday?", options: ["Hammasi nol", "Kamida bittasi noldan farqli", "Hammasi birga teng", "Hammasi musbat"], correct: 1 },
  { id: "f6", topic: "fazo", d: 2, q: "$2\\times 2$ simmetrik matritsalar fazosining o'lchami?", options: ["4", "3", "2", "1"], correct: 1 },
  { id: "f7", topic: "fazo", d: 1, q: "Bazis — bu…", options: ["Istalgan vektorlar sistemasi", "Chiziqli erkli va to'liq sistema", "Ortogonal sistema", "Nol vektorli sistema"], correct: 1 },
  { id: "qf1", topic: "qism-fazo", d: 1, q: "Har qanday qism fazo nimani o'z ichiga oladi?", options: ["Birlik vektorni", "Nol vektorni", "Bazis vektorlarini", "Hech narsani"], correct: 1 },
  { id: "qf2", topic: "qism-fazo", d: 2, q: "$\\dim L(\\vec a_1, \\dots, \\vec a_k)$ nimaga teng?", options: ["$k$", "Vektorlar sistemasi rangiga", "$\\dim V$", "1"], correct: 1 },
  { id: "qf3", topic: "qism-fazo", d: 2, q: "$L_1 \\cap L_2 = \\{\\vec 0\\}$ bo'lsa, yig'indi…", options: ["Bo'sh", "To'g'ri yig'indi", "Qism fazo emas", "Birlashma"], correct: 1 },
  { id: "y6", topic: "yevklid", d: 2, q: "$\\vec x = (1, 0, 1)$, $\\vec y = (0, 1, 1)$ orasidagi burchak?", options: ["$30^\\circ$", "$60^\\circ$", "$45^\\circ$", "$90^\\circ$"], correct: 1, explain: "$\\cos\\varphi = \\frac{1}{2}$." },
  { id: "y7", topic: "yevklid", d: 3, q: "$|\\vec x| = 3$, $|\\vec y| = 4$. $(\\vec x, \\vec y)$ qaysi qiymatni qabul qila olmaydi?", options: ["12", "−12", "0", "13"], correct: 3, explain: "Koshi–Bunyakovskiy: $|(\\vec x, \\vec y)| \\le 12$." },
  { id: "g1", topic: "gram", d: 2, q: "Gram–Shmidt: $\\vec a_1 = (1, 0)$, $\\vec a_2 = (3, 4)$. $\\vec b_2$ = ?", options: ["$(3, 4)$", "$(0, 4)$", "$(3, 0)$", "$(0, 1)$"], correct: 1 },
  { id: "g2", topic: "gram", d: 2, q: "Gram–Shmidtda $\\vec b_k$ dan nima ayiriladi?", options: ["Oldingi $\\vec a_i$ lar", "Oldingi $\\vec b_i$ lar bo'yicha proyeksiyalar", "Nol vektor", "Hech narsa"], correct: 1 },
  { id: "g3", topic: "gram", d: 3, q: "$\\vec x$ ning $L$ ga ortogonal proyeksiyasi qanday xossaga ega?", options: ["Eng uzun", "$L$ dagi $\\vec x$ ga eng yaqin vektor", "Doim nol", "$\\vec x$ ga teng"], correct: 1 },
  { id: "fm1", topic: "formalar", d: 1, q: "$f = 3x_1^2 + 4x_1x_2 - x_2^2$ matritsasida $a_{12}$?", options: ["4", "2", "−1", "3"], correct: 1 },
  { id: "fm2", topic: "formalar", d: 2, q: "Bichiziqli forma matritsasi bazis almashganda qanday o'zgaradi?", options: ["$T^{-1}BT$", "$T^TBT$", "$TB$", "o'zgarmaydi"], correct: 1 },
  { id: "fm3", topic: "formalar", d: 2, q: "$f = x^2 - 2xy$ ning $(1, 1)$ dagi qiymati?", options: ["0", "−1", "1", "2"], correct: 1 },
  { id: "fm4", topic: "formalar", d: 3, q: "Kvadratik forma matritsasi qanday bo'ladi?", options: ["Istalgan", "Simmetrik", "Kososimmetrik", "Diagonal"], correct: 1 },
  { id: "kn1", topic: "kanonik", d: 2, q: "$f = 5x^2 + 4xy + 8y^2$ ning ortogonal kanonik ko'rinishi?", options: ["$4x'^2 + 9y'^2$", "$5x'^2 + 8y'^2$", "$x'^2 + 36y'^2$", "$13x'^2$"], correct: 0, explain: "Xos sonlar 4 va 9." },
  { id: "kv1", topic: "kyevklid", d: 1, q: "$\\mathbb C^n$ da standart skalyar ko'paytma?", options: ["$\\sum x_iy_i$", "$\\sum x_i\\bar y_i$", "$\\sum |x_i||y_i|$", "$\\sum \\bar x_i\\bar y_i$"], correct: 1 },
  { id: "kv2", topic: "kyevklid", d: 2, q: "$(\\vec x, \\vec y) = 2 - 3i$ bo'lsa, $(\\vec y, \\vec x)$?", options: ["$2 - 3i$", "$2 + 3i$", "$-2 + 3i$", "$3 - 2i$"], correct: 1 },
  { id: "kv3", topic: "kyevklid", d: 1, q: "$\\vec x = (i;\\ 0)$ ning uzunligi?", options: ["$i$", "−1", "1", "0"], correct: 2 },
  { id: "kv4", topic: "kyevklid", d: 2, q: "Ermit matritsa ta'rifi?", options: ["$A^T = A$", "$\\bar A^T = A$", "$A^2 = E$", "$\\det A = 1$"], correct: 1 },
  { id: "kv5", topic: "kyevklid", d: 3, q: "Ermit matritsaning xos sonlari qanday?", options: ["Har doim haqiqiy", "Har doim mavhum", "Har doim nol", "Istalgan kompleks"], correct: 0 },
  { id: "al1", topic: "almashtirish", d: 1, q: "Operator matritsasining ustunlari nima?", options: ["Bazis vektorlari obrazlari koordinatalari", "Xos vektorlar", "Nol vektorlar", "Satrlar"], correct: 0 },
  { id: "al2", topic: "almashtirish", d: 2, q: "Avval $\\mathcal B$, keyin $\\mathcal A$ bajariladigan almashtirish matritsasi?", options: ["$BA$", "$AB$", "$A + B$", "$A^{-1}B$"], correct: 1 },
  { id: "al3", topic: "almashtirish", d: 2, q: "Qaysi akslantirish chiziqli?", options: ["$(x, y) \\mapsto (x + 1, y)$", "$(x, y) \\mapsto (2x - y, x + 3y)$", "$(x, y) \\mapsto (xy, x)$", "$(x, y) \\mapsto (x^2, y)$"], correct: 1 },
  { id: "al4", topic: "almashtirish", d: 3, q: "Proyeksiya operatori uchun $\\mathcal P^2$?", options: ["$\\mathcal O$", "$\\mathcal P$", "$\\mathcal E$", "$-\\mathcal P$"], correct: 1 },
  { id: "yd1", topic: "yadro", d: 1, q: "Operator yadrosi — bu…", options: ["Nolga o'tadigan vektorlar", "Barcha obrazlar", "Xos vektorlar", "Bazis"], correct: 0 },
  { id: "yd2", topic: "yadro", d: 2, q: "Operator matritsasi bazis almashganda?", options: ["$T^TAT$", "$T^{-1}AT$", "$TAT^{-1}$", "o'zgarmaydi"], correct: 1 },
  { id: "yd3", topic: "yadro", d: 2, q: "O'xshash matritsalarda nima bir xil?", options: ["Barcha elementlar", "Determinant va iz", "Faqat birinchi satr", "Hech narsa"], correct: 1 },
  { id: "yd4", topic: "yadro", d: 3, q: "$\\begin{pmatrix} 1 & 2 & 3\\\\ 2 & 4 & 6\\\\ 3 & 6 & 9\\end{pmatrix}$ operatorining defekti?", options: ["1", "2", "3", "0"], correct: 1, explain: "Rang 1, defekt $3 - 1$." },

  // ===== 2-semestr: yangi mavzular =====
  { id: "vk1", topic: "vektor", d: 1, q: "$\\vec a = (2;\\ -4;\\ 6)$ va $\\vec b = (-1;\\ m;\\ -3)$ qaysi $m$ da kollinear?", options: ["$m = 2$", "$m = -2$", "$m = 4$", "hech qachon"], correct: 0 },
  { id: "vk2", topic: "vektor", d: 2, q: "Uchburchak og'irlik markazi?", options: ["$\\frac{A + B}{2}$", "$\\frac{A + B + C}{3}$", "$A + B + C$", "$\\frac{A + B + C}{2}$"], correct: 1 },
  { id: "sk1", topic: "skalyar", d: 2, q: "$|\\vec a| = 3$, $|\\vec b| = 4$, $\\varphi = 60^\\circ$. $\\vec a\\cdot\\vec b$?", options: ["12", "6", "$6\\sqrt3$", "0"], correct: 1 },
  { id: "sk2", topic: "skalyar", d: 2, q: "$\\vec F = (5;\\ 0)$ N, ko'chish $(0;\\ 3)$ m. Ish?", options: ["0 J", "15 J", "8 J", "5 J"], correct: 0 },
  { id: "ar1", topic: "aralash", d: 1, q: "Aralash ko'paytma nimaga teng?", options: ["Uchinchi tartibli determinantga", "Vektorga", "Skalyar ko'paytmalar yig'indisiga", "Nolga"], correct: 0 },
  { id: "ar2", topic: "aralash", d: 2, q: "$\\vec a\\vec b\\vec c = 5$. $\\vec b\\vec a\\vec c$?", options: ["5", "−5", "0", "15"], correct: 1 },
  { id: "ar3", topic: "aralash", d: 3, q: "$\\vec a = (1;0;0)$, $\\vec b = (0;2;0)$, $\\vec c = (1;1;k)$ qaysi $k$ da komplanar?", options: ["$k = 0$", "$k = 1$", "$k = 2$", "hech qachon"], correct: 0 },
  { id: "dk1", topic: "dekart", d: 2, q: "O'qlar $90^\\circ$ ga burildi. $M(3;\\ 1)$ ning yangi koordinatalari?", options: ["$(-1;\\ 3)$", "$(1;\\ -3)$", "$(3;\\ -1)$", "$(-3;\\ 1)$"], correct: 1 },
  { id: "dk2", topic: "dekart", d: 1, q: "Parallel ko'chirish qaysi hadlarni yo'qotadi?", options: ["Kvadrat hadlarni", "Birinchi darajali hadlarni", "$xy$ hadni", "Ozod hadni"], correct: 1 },
  { id: "dk3", topic: "dekart", d: 2, q: "Burish qaysi hadni yo'qotish uchun ishlatiladi?", options: ["$x^2$", "$xy$", "$x$", "ozod hadni"], correct: 1 },
  { id: "qb1", topic: "qutb", d: 1, q: "$M(-5;\\ 12)$ ning qutb radiusi?", options: ["7", "13", "17", "$\\sqrt{119}$"], correct: 1 },
  { id: "qb2", topic: "qutb", d: 2, q: "Sferik koordinatalarda $\\rho = R$ qanday sirt?", options: ["Silindr", "Sfera", "Konus", "Tekislik"], correct: 1 },
  { id: "fc1", topic: "fazo-chiziq", d: 1, q: "$\\frac{x - 1}{2} = \\frac{y + 1}{-1} = \\frac z3$ ning yo'naltiruvchi vektori?", options: ["$(1;\\ -1;\\ 0)$", "$(2;\\ -1;\\ 3)$", "$(-1;\\ 1;\\ 0)$", "$(2;\\ 1;\\ 3)$"], correct: 1 },
  { id: "fc2", topic: "fazo-chiziq", d: 2, q: "Ikki tekislik kesishmasining yo'naltiruvchi vektori?", options: ["$\\vec n_1 + \\vec n_2$", "$\\vec n_1 \\times \\vec n_2$", "$\\vec n_1 - \\vec n_2$", "$\\vec n_1\\cdot\\vec n_2$"], correct: 1 },
  { id: "fc3", topic: "fazo-chiziq", d: 2, q: "To'g'ri chiziq tekislikka parallel bo'lish sharti?", options: ["$\\vec n \\parallel \\vec s$", "$\\vec n\\cdot\\vec s = 0$", "$\\vec n = \\vec s$", "$|\\vec n| = |\\vec s|$"], correct: 1 },
  { id: "fc4", topic: "fazo-chiziq", d: 3, q: "Ayqash to'g'ri chiziqlar sharti?", options: ["$\\vec s_1 \\parallel \\vec s_2$", "Aralash ko'paytma $\\overrightarrow{M_1M_2}\\vec s_1\\vec s_2 \\ne 0$", "Aralash ko'paytma $= 0$", "$\\vec s_1\\cdot\\vec s_2 = 0$"], correct: 1 },
  { id: "el1", topic: "ellips", d: 2, q: "$\\frac{x^2}{100} + \\frac{y^2}{64} = 1$ ekssentrisiteti?", options: ["$\\frac35$", "$\\frac45$", "$\\frac{8}{10}$", "$\\frac34$"], correct: 0 },
  { id: "gp1", topic: "giperbola", d: 2, q: "$\\frac{x^2}{9} - \\frac{y^2}{4} = 1$ asimptotalari?", options: ["$y = \\pm\\frac23x$", "$y = \\pm\\frac32x$", "$y = \\pm\\frac49x$", "$y = \\pm x$"], correct: 0 },
  { id: "gp2", topic: "giperbola", d: 1, q: "$y^2 = 12x$ parabolaning fokusi?", options: ["$(0;\\ 3)$", "$(3;\\ 0)$", "$(6;\\ 0)$", "$(12;\\ 0)$"], correct: 1 },
  { id: "uc1", topic: "umumiy-chiziq", d: 1, q: "$x^2 + 4xy + 4y^2 + x - 1 = 0$ qanday turdagi chiziq?", options: ["Elliptik", "Giperbolik", "Parabolik", "Aylana"], correct: 2, explain: "$\\delta = 4 - 4 = 0$." },
  { id: "uc2", topic: "umumiy-chiziq", d: 2, q: "Markaziy chiziq sharti?", options: ["$\\delta = 0$", "$\\delta \\ne 0$", "$\\Delta = 0$", "$I_1 = 0$"], correct: 1 },
  { id: "uc3", topic: "umumiy-chiziq", d: 2, q: "$x^2 + 2y^2 - 4x + 8y + 1 = 0$ markazi?", options: ["$(2;\\ -2)$", "$(-2;\\ 2)$", "$(4;\\ -8)$", "$(2;\\ 2)$"], correct: 0 },
  { id: "uc4", topic: "umumiy-chiziq", d: 3, q: "Markazga ko'chirgandan keyingi ozod had?", options: ["$\\Delta\\cdot\\delta$", "$\\Delta/\\delta$", "$\\delta/\\Delta$", "$a_{33}$"], correct: 1 },
  { id: "uc5", topic: "umumiy-chiziq", d: 2, q: "$\\delta < 0$, $\\Delta \\ne 0$ bo'lsa chiziq?", options: ["Ellips", "Giperbola", "Parabola", "Nuqta"], correct: 1 },
  { id: "ck1", topic: "chiziq-kesish", d: 1, q: "Kvadrat tenglama diskriminanti nol bo'lsa, to'g'ri chiziq…", options: ["Kesishmaydi", "Urinma", "Ikki nuqtada kesadi", "Chiziqda yotadi"], correct: 1 },
  { id: "ck2", topic: "chiziq-kesish", d: 2, q: "Ellipsning nechta asimptotik yo'nalishi bor?", options: ["Yo'q", "Bitta", "Ikkita", "Cheksiz"], correct: 0 },
  { id: "ck3", topic: "chiziq-kesish", d: 2, q: "Parabolaning nechta asimptotik yo'nalishi bor?", options: ["Yo'q", "Bitta", "Ikkita", "Cheksiz"], correct: 1 },
  { id: "ck4", topic: "chiziq-kesish", d: 2, q: "$x^2 + y^2 = 25$ ga $(3;\\ 4)$ nuqtadagi urinma?", options: ["$3x + 4y = 25$", "$4x + 3y = 25$", "$3x - 4y = 25$", "$x + y = 7$"], correct: 0 },
  { id: "ck5", topic: "chiziq-kesish", d: 1, q: "$x^2 + y^2 = 4$ va $y = 3$ nechta nuqtada kesishadi?", options: ["0", "1", "2", "cheksiz"], correct: 0 },
  { id: "mk1", topic: "markaziy", d: 1, q: "Markaziy holda birinchi qadam?", options: ["Burish", "Markazni topib ko'chirish", "To'liq kvadrat", "Bo'lish"], correct: 1 },
  { id: "mk2", topic: "markaziy", d: 2, q: "Burishdan keyingi kanonik koeffitsiyentlar nima?", options: ["Bosh qism xos sonlari", "Markaz koordinatalari", "Invariant $\\Delta$", "Ozod had"], correct: 0 },
  { id: "mk3", topic: "markaziy", d: 2, q: "$\\delta = -16$, $\\Delta = 128$. Ko'chirishdan keyingi ozod had?", options: ["−8", "8", "−2048", "112"], correct: 0 },
  { id: "mk4", topic: "markaziy", d: 3, q: "$\\lambda_1 = 2$, $\\lambda_2 = 3$, $c' = 6$. Chiziq?", options: ["Ellips", "Giperbola", "Mavhum ellips", "Nuqta"], correct: 2 },
  { id: "mk5", topic: "markaziy", d: 2, q: "$\\lambda_1 = 4$, $\\lambda_2 = 9$, $c' = -36$. Chiziq?", options: ["Ellips", "Giperbola", "Mavhum ellips", "Nuqta"], correct: 0 },
  { id: "nm1", topic: "nomarkaziy", d: 1, q: "Nomarkaziy holda $\\delta$?", options: ["$> 0$", "$< 0$", "$= 0$", "$= 1$"], correct: 2 },
  { id: "nm2", topic: "nomarkaziy", d: 2, q: "Nomarkaziy holda nima avval bajariladi?", options: ["Ko'chirish", "Burish", "Bo'lish", "Hech narsa"], correct: 1 },
  { id: "nm3", topic: "nomarkaziy", d: 2, q: "$y^2 - 4y - 4x + 8 = 0$ parabolaning uchi?", options: ["$(1;\\ 2)$", "$(2;\\ 1)$", "$(-1;\\ 2)$", "$(1;\\ -2)$"], correct: 0 },
  { id: "nm4", topic: "nomarkaziy", d: 2, q: "$4x^2 - 4xy + y^2 - 9 = 0$ nima?", options: ["Parabola", "Ikki parallel to'g'ri chiziq", "Giperbola", "Nuqta"], correct: 1 },
  { id: "nm5", topic: "nomarkaziy", d: 3, q: "$\\delta = 0$, $\\Delta \\ne 0$ — bu…", options: ["ellips", "giperbola", "parabola", "ikki to'g'ri chiziq"], correct: 2 },
  { id: "sr1", topic: "sirt", d: 2, q: "$x^2 + 4y^2 = 2z$?", options: ["Ellipsoid", "Elliptik paraboloid", "Giperbolik paraboloid", "Elliptik silindr"], correct: 1 },
  { id: "ys1", topic: "yasovchi", d: 1, q: "Qaysi sirt to'g'ri chiziqli yasovchilarga ega emas?", options: ["Bir pallali giperboloid", "Ellipsoid", "Konus", "Silindr"], correct: 1 },
  { id: "ys2", topic: "yasovchi", d: 2, q: "Bir pallali giperboloidning har bir nuqtasidan nechta yasovchi o'tadi?", options: ["1", "2", "0", "cheksiz"], correct: 1 },
  { id: "ys3", topic: "yasovchi", d: 3, q: "Bir oilaning ikki yasovchisi qanday joylashgan?", options: ["Kesishadi", "Parallel", "Ayqash", "Ustma-ust"], correct: 2 },
  { id: "ys4", topic: "yasovchi", d: 2, q: "$x^2 + y^2 - z^2 = 1$ ning $(1;0;0)$ dagi yasovchilari yo'nalishi?", options: ["$(0;1;\\pm1)$", "$(1;0;0)$", "$(1;\\pm1;0)$", "yo'q"], correct: 0 },
  { id: "us1", topic: "umumiy-sirt", d: 1, q: "$x^2 + y^2 + z^2 + 2x - 6z - 6 = 0$ radiusi?", options: ["6", "4", "16", "$\\sqrt6$"], correct: 1 },
  { id: "us2", topic: "umumiy-sirt", d: 2, q: "$x^2 + 2y^2 - 3z^2 - 6x - 8y - 18z - 33 = 0$ markazi?", options: ["$(3;\\ 2;\\ -3)$", "$(3;\\ -2;\\ -3)$", "$(-3;\\ 2;\\ 3)$", "markaz yo'q"], correct: 0 },
  { id: "us3", topic: "umumiy-sirt", d: 2, q: "$z = 2xy$ qanday sirt?", options: ["Elliptik paraboloid", "Giperbolik paraboloid", "Konus", "Silindr"], correct: 1 },
  { id: "us4", topic: "umumiy-sirt", d: 3, q: "Bosh qism xos sonlari $2, 3, -1$, kanonik: $2X^2 + 3Y^2 - Z^2 = 6$. Sirt?", options: ["Bir pallali giperboloid", "Ikki pallali giperboloid", "Ellipsoid", "Konus"], correct: 0 },
  { id: "us5", topic: "umumiy-sirt", d: 2, q: "Bosh qism xos sonlari $1, 1, 0$, $Z$ bo'yicha chiziqli had bor. Sirt?", options: ["Ellipsoid", "Elliptik paraboloid", "Konus", "Giperbolik paraboloid"], correct: 1 },
];

export const savolById = (id) => SAVOLLAR.find((s) => s.id === id);
