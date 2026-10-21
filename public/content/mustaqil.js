// MUSTAQIL ISHLAR — o'qituvchi shu yerda topshiriqlarni belgilaydi.
// Har bir talaba F.I.Sh. va guruhi asosida o'zining SHAXSIY VARIANTini oladi (sonlar har xil).
// Fan 2 semestr o'qitiladi; har semestrda: 4 ta hisob-grafik ish (joriy nazorat),
// oraliq nazorat va yakuniy nazorat.
//
//   id        — takrorlanmas kod
//   sem       — semestr (1 yoki 2)
//   nomi      — sarlavha
//   muddat    — topshirish muddati (YYYY-MM-DD), ixtiyoriy
//   daqiqa    — vaqt chegarasi (daqiqa), 0 — cheklanmagan
//   masalalar — generator identifikatorlari (js/generators.js dagi id lar)
//
// Generatorlar (mavzu bo'yicha):
// 1-semestr. Chiziqli algebra
//   1 kompleks: cmul, cdiv, moivre, cmod      10 qism-fazo:    subsum
//   2 matritsa: mat-lin, mat-mul, mat-elem    11 yevklid:      orth4
//   3 determinant: det2, det3                 12 gram:         gram2
//   4 minor: cofactor, det4                   13 formalar:     qf-value, bilin
//   5 teskari: inv2, cramer2                  14 kanonik:      qf-canon, sylvester
//   6 arifmetik: ldep, lincomb2               15 kyevklid:     cinner
//   7 rang: rank3                             16 almashtirish: transform, compose
//   8 sistema: gauss3, fsr                    17 yadro:        defect
//   9 fazo: coord                             18 xos-qiymat:   eigen2
// 2-semestr. Analitik geometriya
//   1 vektor: len, lincomb3                   10 ellips:        ellipse, circle
//   2 skalyar: dot, perp                      11 giperbola:     hyperbola, parabola
//   3 vkopaytma: cross, triarea               12 umumiy-chiziq: center2, delta
//   4 aralash: mixed                          13 chiziq-kesish: lineconic
//   5 dekart: axes                            14 markaziy:      central-canon
//   6 qutb: polar                             15 nomarkaziy:    parab-vertex
//   7 togri-chiziq: line2p, distline, intersect  16 sirt:        ellipsoid, hyp-axes
//   8 tekislik: planeD, distplane, planeAngle 17 yasovchi:      gen-line
//   9 fazo-chiziq: lineplane                  18 umumiy-sirt:   sphere, quadric-center

export const MUSTAQIL = [
  // ===== 1-semestr =====
  { id: "1-HGI-1", sem: 1, nomi: "1-hisob-grafik ish: Kompleks sonlar, matritsalar, determinantlar (1–4-mavzular)", muddat: "", daqiqa: 0,
    masalalar: ["cmul", "cdiv", "moivre", "mat-mul", "det3", "cofactor", "det4"] },
  { id: "1-HGI-2", sem: 1, nomi: "2-hisob-grafik ish: Teskari matritsa, chiziqli bog'liqlik, rang, CHTS (5–8-mavzular)", muddat: "", daqiqa: 0,
    masalalar: ["inv2", "cramer2", "ldep", "lincomb2", "rank3", "gauss3", "fsr"] },
  { id: "1-HGI-3", sem: 1, nomi: "3-hisob-grafik ish: Chiziqli fazo, qism fazolar, Yevklid fazosi (9–12-mavzular)", muddat: "", daqiqa: 0,
    masalalar: ["coord", "subsum", "orth4", "gram2"] },
  { id: "1-HGI-4", sem: 1, nomi: "4-hisob-grafik ish: Formalar, kompleks Yevklid fazo, chiziqli almashtirishlar (13–18-mavzular)", muddat: "", daqiqa: 0,
    masalalar: ["bilin", "qf-canon", "sylvester", "cinner", "compose", "defect", "eigen2"] },
  { id: "1-ON", sem: 1, nomi: "1-semestr oraliq nazorat (1–9-mavzular, 60 daqiqa)", muddat: "", daqiqa: 60,
    masalalar: ["moivre", "det3", "det4", "inv2", "rank3", "gauss3", "coord"] },
  { id: "1-YN", sem: 1, nomi: "1-semestr yakuniy nazorat (5 ta topshiriq, 80 daqiqa)", muddat: "", daqiqa: 80,
    masalalar: ["cramer2", "fsr", "gram2", "qf-canon", "eigen2"] },

  // ===== 2-semestr =====
  { id: "2-HGI-1", sem: 2, nomi: "1-hisob-grafik ish: Vektorlar va ularning ko'paytmalari (1–4-mavzular)", muddat: "", daqiqa: 0,
    masalalar: ["lincomb3", "dot", "perp", "cross", "triarea", "mixed"] },
  { id: "2-HGI-2", sem: 2, nomi: "2-hisob-grafik ish: Koordinatalar, to'g'ri chiziq va tekislik (5–9-mavzular)", muddat: "", daqiqa: 0,
    masalalar: ["axes", "polar", "line2p", "distline", "distplane", "planeAngle", "lineplane"] },
  { id: "2-HGI-3", sem: 2, nomi: "3-hisob-grafik ish: Ikkinchi tartibli chiziqlar (10–15-mavzular)", muddat: "", daqiqa: 0,
    masalalar: ["ellipse", "hyperbola", "parabola", "delta", "lineconic", "central-canon", "parab-vertex"] },
  { id: "2-HGI-4", sem: 2, nomi: "4-hisob-grafik ish: Ikkinchi tartibli sirtlar (16–18-mavzular)", muddat: "", daqiqa: 0,
    masalalar: ["ellipsoid", "hyp-axes", "gen-line", "sphere", "quadric-center"] },
  { id: "2-ON", sem: 2, nomi: "2-semestr oraliq nazorat (1–9-mavzular, 60 daqiqa)", muddat: "", daqiqa: 60,
    masalalar: ["dot", "cross", "mixed", "polar", "distline", "distplane", "lineplane"] },
  { id: "2-YN", sem: 2, nomi: "2-semestr yakuniy nazorat (5 ta topshiriq, 80 daqiqa)", muddat: "", daqiqa: 80,
    masalalar: ["mixed", "distplane", "hyperbola", "central-canon", "quadric-center"] },
];

// Tasdiqlash kodlarini hisoblash uchun "tuz". O'qituvchi o'zgartirishi tavsiya etiladi.
// (Diqqat: sayt kodi ochiq, shuning uchun bu kuchli himoya emas — faqat tasodifiy soxtalashtirishdan saqlaydi.)
export const TUZ = "chiziqli-algebra-2026";
