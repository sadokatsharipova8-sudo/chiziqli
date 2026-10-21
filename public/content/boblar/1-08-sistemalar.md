# 8-mavzu. Chiziqli tenglamalar sistemasini to'la yechish. Bir jinsli sistemaning fundamental yechimlari

**Bu mavzuda:** Gauss usuli, bazis va erkin noma'lumlar, umumiy yechim, bir jinsli sistemalar va fundamental yechimlar sistemasi (FYS), bir jinsli bo'lmagan sistemaning yechimlari tuzilishi, Fredgolm teoremasi.

## 7.1. Asosiy tushunchalar

$$\begin{cases} a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n = b_1\\ \dots\dots\dots\dots\dots\dots\dots\dots\\ a_{m1}x_1 + a_{m2}x_2 + \dots + a_{mn}x_n = b_m\end{cases}\qquad (AX = B)$$

:::tarif
Sistema yechimga ega bo'lsa **birgalikda**, aks holda **birgalikda emas** deyiladi. Birgalikdagi sistema yagona yechimga ega bo'lsa **aniq**, cheksiz ko'p yechimga ega bo'lsa — **aniqmas**. Bir xil yechimlar to'plamiga ega sistemalar **teng kuchli**.
:::

Elementar almashtirishlar (tenglamalar o'rnini almashtirish, tenglamani $\ne 0$ songa ko'paytirish, bir tenglamaga boshqasini songa ko'paytirib qo'shish) sistemani teng kuchli sistemaga o'tkazadi.

## 7.2. Gauss usuli

Usul uch bosqichdan iborat:
1. **To'g'ri yo'l:** kengaytirilgan matritsa $\overline A$ ni elementar almashtirishlar bilan pog'onasimon ko'rinishga keltirish.
2. **Tahlil:** $(0\ 0\ \dots\ 0\,|\,b)$, $b \ne 0$ ko'rinishdagi satr paydo bo'lsa — sistema birgalikda emas. Aks holda birgalikda; rang $r$ — noldan farqli satrlar soni.
3. **Teskari yo'l:** oxirgi tenglamadan boshlab noma'lumlarni ketma-ket topish.

:::misol
$$\begin{cases} x_1 + x_2 + x_3 + x_4 = 10\\ 2x_1 - x_2 + x_3 - x_4 = -1\\ x_1 + 2x_2 - x_3 + x_4 = 6\\ 3x_1 + x_2 + 2x_3 - 2x_4 = 3\end{cases}$$

$$\left(\begin{array}{cccc|c} 1 & 1 & 1 & 1 & 10\\ 2 & -1 & 1 & -1 & -1\\ 1 & 2 & -1 & 1 & 6\\ 3 & 1 & 2 & -2 & 3\end{array}\right) \to \left(\begin{array}{cccc|c} 1 & 1 & 1 & 1 & 10\\ 0 & 1 & -2 & 0 & -4\\ 0 & -3 & -1 & -3 & -21\\ 0 & -2 & -1 & -5 & -27\end{array}\right) \to$$
$$\to \left(\begin{array}{cccc|c} 1 & 1 & 1 & 1 & 10\\ 0 & 1 & -2 & 0 & -4\\ 0 & 0 & -7 & -3 & -33\\ 0 & 0 & -5 & -5 & -35\end{array}\right) \to \left(\begin{array}{cccc|c} 1 & 1 & 1 & 1 & 10\\ 0 & 1 & -2 & 0 & -4\\ 0 & 0 & 1 & 1 & 7\\ 0 & 0 & 0 & 4 & 16\end{array}\right).$$

Teskari yo'l: $x_4 = 4$, $x_3 = 7 - 4 = 3$, $x_2 = -4 + 2\cdot 3 = 2$, $x_1 = 10 - 2 - 3 - 4 = 1$.

Javob: $(1;\ 2;\ 3;\ 4)$.
:::

> 💡 [Laboratoriya → Gauss usuli](#/lab/gauss) da har bir qadamni o'zingiz bajaring.

## 7.3. Bazis va erkin noma'lumlar. Umumiy yechim

Pog'onasimon ko'rinishda $r < n$ bo'lsin. Bazis minorga kiruvchi ustunlarga mos $r$ ta noma'lum — **bazis noma'lumlar**, qolgan $n - r$ tasi — **erkin noma'lumlar**. Bazis noma'lumlarni erkin noma'lumlar orqali ifodalash **umumiy yechim** deyiladi. Erkin noma'lumlarga aniq qiymat berilsa — **xususiy yechim**.

:::misol
$\begin{cases} x_1 + x_2 - x_3 = 2\\ 2x_1 + 3x_2 + x_3 = 7\end{cases} \to \begin{cases} x_1 + x_2 - x_3 = 2\\ x_2 + 3x_3 = 3\end{cases}$

$x_3 = c$ — erkin: $x_2 = 3 - 3c$, $x_1 = 2 - x_2 + x_3 = -1 + 4c$.

Umumiy yechim: $X = (-1 + 4c;\ 3 - 3c;\ c)$, $c \in \mathbb R$. Masalan, $c = 1$ da $(3;\ 0;\ 1)$.
:::

:::savol
Pog'onasimon ko'rinishda $(0\ 0\ 0\ |\ 5)$ satr hosil bo'ldi. Bu nimani bildiradi?
- Yechim yagona
- Yechimlar cheksiz ko'p
+ Sistema birgalikda emas
- $x_3 = 5$
> Bu satr $0 = 5$ tenglamaga mos keladi.
:::

## 7.4. Bir jinsli sistemalar

:::tarif
$B = O$ bo'lgan $AX = O$ sistema **bir jinsli** deyiladi. U doim birgalikda: $X = O$ (trivial yechim).
:::

:::teorema
Bir jinsli sistema notrivial yechimga ega $\iff r(A) < n$. Xususan, $n$ ta tenglama, $n$ noma'lumli sistema uchun $\iff \det A = 0$.
:::

:::xossa
Bir jinsli sistema yechimlarining istalgan chiziqli kombinatsiyasi yana yechim. Demak yechimlar to'plami $\mathbb R^n$ ning **qism fazosi** (10-mavzu).
:::

## 7.5. Fundamental yechimlar sistemasi

:::tarif
Bir jinsli sistemaning $n - r$ ta chiziqli erkli yechimlari $E_1, \dots, E_{n-r}$ **fundamental yechimlar sistemasi** (FYS) deyiladi.
:::

:::teorema
$r < n$ bo'lsa FYS mavjud, u $n - r$ ta yechimdan iborat va har qanday yechim ularning chiziqli kombinatsiyasi:
$$X_{\text{o.b.}} = c_1E_1 + c_2E_2 + \dots + c_{n-r}E_{n-r}.$$
:::

**FYS ni qurish:** erkin noma'lumlarga navbatma-navbat birlik qiymatlar $(1, 0, \dots, 0)$, $(0, 1, \dots, 0)$, … beriladi.

:::misol
$$\begin{cases} x_1 + x_2 - 9x_3 + 13x_4 = 0\\ x_1 - x_2 - 3x_3 + 5x_4 = 0\\ 2x_1 + x_2 - 15x_3 + 22x_4 = 0\end{cases}$$
$$\begin{pmatrix} 1 & 1 & -9 & 13\\ 1 & -1 & -3 & 5\\ 2 & 1 & -15 & 22\end{pmatrix} \to \begin{pmatrix} 1 & 1 & -9 & 13\\ 0 & -2 & 6 & -8\\ 0 & -1 & 3 & -4\end{pmatrix} \to \begin{pmatrix} 1 & 1 & -9 & 13\\ 0 & 1 & -3 & 4\\ 0 & 0 & 0 & 0\end{pmatrix}.$$
$r = 2$, $n - r = 2$. Bazis: $x_1, x_2$; erkin: $x_3, x_4$.

$x_2 = 3x_3 - 4x_4$, $\ x_1 = -x_2 + 9x_3 - 13x_4 = 6x_3 - 9x_4$.

$x_3 = 1, x_4 = 0$: $E_1 = (6;\ 3;\ 1;\ 0)$; $\quad x_3 = 0, x_4 = 1$: $E_2 = (-9;\ -4;\ 0;\ 1)$.

Umumiy yechim: $X = c_1E_1 + c_2E_2$.
:::

:::savol
$3\times 5$ bir jinsli sistemada $r(A) = 3$. FYS nechta vektordan iborat?
- 3
+ 2
- 5
- 1
:::

## 7.6. Bir jinsli bo'lmagan sistema yechimlarining tuzilishi

:::teorema
Bir jinsli bo'lmagan birgalikdagi sistemaning umumiy yechimi = mos bir jinsli sistemaning umumiy yechimi + bir jinsli bo'lmagan sistemaning biror xususiy yechimi:
$$X_{\text{o.n.}} = X_{\text{o.b.}} + X_{\text{x.n.}}.$$
:::

:::misol
Yuqoridagi sistemaning o'ng tomonlarini mos ravishda $2,\ 0,\ 3$ ga almashtiramiz. $X_{\text{x.n.}} = (1;\ 1;\ 0;\ 0)$ — xususiy yechim (tekshiring!). Umumiy yechim:
$$X = (1;\ 1;\ 0;\ 0) + c_1(6;\ 3;\ 1;\ 0) + c_2(-9;\ -4;\ 0;\ 1).$$
:::

Geometrik ma'no: $\mathbb R^3$ da bir jinsli sistema yechimlari koordinata boshidan o'tuvchi to'g'ri chiziq yoki tekislik; bir jinsli bo'lmaganniki — unga parallel, $X_{\text{x.n.}}$ ga surilgan to'g'ri chiziq yoki tekislik.

## 7.7. Fredgolm teoremasi

:::teorema Fredgolm
$AX = B$ sistema birgalikda bo'lishi uchun $B$ ning $A^TY = O$ qo'shma bir jinsli sistemaning har bir yechimiga ortogonal bo'lishi ($Y^TB = 0$) zarur va yetarli.
:::

:::savol
Bir jinsli bo'lmagan sistemaning ikki yechimi ayirmasi $X_1 - X_2$ nima?
- Yana bir jinsli bo'lmagan sistemaning yechimi
+ Mos bir jinsli sistemaning yechimi
- Har doim nol vektor
- Hech qanday yechim emas
> $A(X_1 - X_2) = B - B = O$.
:::

:::tarix
Usul K. F. Gauss (1777–1855) nomi bilan atalsa-da, uning g'oyasi miloddan avvalgi II asrdagi xitoy «To'qqiz bobli matematika» kitobida uchraydi.
:::
