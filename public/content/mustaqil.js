// MUSTAQIL ISHLAR — o'qituvchi shu yerda topshiriqlarni belgilaydi.
// Har bir talaba F.I.Sh. va guruhi asosida o'zining SHAXSIY VARIANTini oladi (sonlar har xil).
// Tuzilma fan dasturidagi baholash tizimiga mos: 4 ta hisob-grafik ish (joriy nazorat),
// oraliq nazorat va yakuniy nazorat (5 ta topshiriq, 80 daqiqa).
//
//   id        — takrorlanmas kod
//   nomi      — sarlavha
//   muddat    — topshirish muddati (YYYY-MM-DD), ixtiyoriy
//   daqiqa    — vaqt chegarasi (daqiqa), 0 — cheklanmagan
//   masalalar — generator identifikatorlari (js/generators.js dagi id lar)
//
// Generatorlar (mavzu bo'yicha):
//   1 kompleks:     cmul, cdiv, moivre, cmod
//   2 matritsa:     mat-lin, mat-mul, mat-elem
//   3 determinant:  det2, det3
//   4 minor:        cofactor, det4
//   5 teskari:      inv2, cramer2
//   6 rang:         rank3, ldep
//   7 sistema:      gauss3, fsr
//   8 fazo:         coord
//   9 yevklid:      gram2, orth4
//  10 kvadratik:    qf-canon, sylvester
//  11 xos-qiymat:   eigen2, transform
//  12 vektor:       dot, len, perp
//  13 vkopaytma:    cross, mixed, triarea
//  14 koordinata:   polar, axes
//  15 togri-chiziq: line2p, distline, intersect
//  16 tekislik:     planeD, distplane, planeAngle
//  17 egri-chiziq:  ellipse, hyperbola, circle, parabola
//  18 sirt:         sphere, ellipsoid

export const MUSTAQIL = [
  {
    id: "HGI-1",
    nomi: "1-hisob-grafik ish: Kompleks sonlar, matritsalar, determinantlar (1–4-mavzular)",
    muddat: "2026-11-01",
    daqiqa: 0,
    masalalar: ["cmul", "cdiv", "moivre", "mat-mul", "det3", "cofactor", "det4"],
  },
  {
    id: "HGI-2",
    nomi: "2-hisob-grafik ish: Teskari matritsa, rang, CHTS (5–7-mavzular)",
    muddat: "2026-11-22",
    daqiqa: 0,
    masalalar: ["inv2", "cramer2", "rank3", "ldep", "gauss3", "fsr"],
  },
  {
    id: "HGI-3",
    nomi: "3-hisob-grafik ish: Chiziqli fazolar, kvadratik formalar, xos sonlar (8–11-mavzular)",
    muddat: "2026-12-13",
    daqiqa: 0,
    masalalar: ["coord", "gram2", "orth4", "qf-canon", "sylvester", "eigen2", "transform"],
  },
  {
    id: "HGI-4",
    nomi: "4-hisob-grafik ish: Vektorlar, to'g'ri chiziq, tekislik, egri chiziq va sirtlar (12–18-mavzular)",
    muddat: "2027-01-10",
    daqiqa: 0,
    masalalar: ["dot", "cross", "mixed", "polar", "distline", "distplane", "ellipse", "sphere"],
  },
  {
    id: "ON-1",
    nomi: "Oraliq nazorat (1–9-mavzular, 60 daqiqa)",
    muddat: "",
    daqiqa: 60,
    masalalar: ["moivre", "det3", "det4", "inv2", "rank3", "gauss3", "gram2"],
  },
  {
    id: "YN",
    nomi: "Yakuniy nazorat (5 ta topshiriq, 80 daqiqa)",
    muddat: "",
    daqiqa: 80,
    masalalar: ["cramer2", "eigen2", "mixed", "distplane", "hyperbola"],
  },
];

// Tasdiqlash kodlarini hisoblash uchun "tuz". O'qituvchi o'zgartirishi tavsiya etiladi.
// (Diqqat: sayt kodi ochiq, shuning uchun bu kuchli himoya emas — faqat tasodifiy soxtalashtirishdan saqlaydi.)
export const TUZ = "chiziqli-algebra-2026";
