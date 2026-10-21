# 5-mavzu. Teskari matritsa. Chiziqli tenglamalar sistemasini yechishning matritsaviy usuli

**Bu mavzuda:** teskari matritsa mavjudligi va formulasi, Gauss–Jordan usuli, $n$ noma'lumli $n$ ta tenglama sistemasini matritsaviy usulda va Kramer formulalari bilan yechish, matritsaviy tenglamalar.

## 5.1. Teskari matritsa

:::tarif
$A$ kvadrat matritsa uchun $AA^{-1} = A^{-1}A = E$ shartni qanoatlantiruvchi $A^{-1}$ matritsa **teskari matritsa** deyiladi.
:::

:::tarif
$\det A \ne 0$ bo'lsa matritsa **xosmas** (aynimagan), $\det A = 0$ bo'lsa — **xos** (aynigan) deyiladi.
:::

:::teorema
$A^{-1}$ mavjud bo'lishi uchun $A$ ning xosmas bo'lishi zarur va yetarli. Bunda teskari matritsa yagona va
$$A^{-1} = \frac{1}{\det A}\begin{pmatrix} A_{11} & A_{21} & \dots & A_{n1}\\ A_{12} & A_{22} & \dots & A_{n2}\\ \vdots & & & \vdots\\ A_{1n} & A_{2n} & \dots & A_{nn}\end{pmatrix} = \frac{1}{\det A}\,\widetilde A^{\,T}.$$
:::

:::diqqat
Algebraik to'ldiruvchilar **transponirlangan** holda joylashadi: $A_{ij}$ — $j$-satr, $i$-ustunda. Bu eng ko'p uchraydigan xato!
:::

Isbot g'oyasi: $A\cdot\widetilde A^{\,T}$ ko'paytmaning $(i, k)$ elementi $\sum_j a_{ij}A_{kj} = \det A\cdot\delta_{ik}$ (4-mavzudagi teorema), ya'ni $A\widetilde A^{\,T} = \det A\cdot E$.

:::misol
$A = \begin{pmatrix} -1 & 2 & -3\\ 0 & 1 & 2\\ 2 & 4 & 5\end{pmatrix}$, $\det A = -1(5 - 8) - 2(0 - 4) - 3(0 - 2) = 3 + 8 + 6 = 17$.

Algebraik to'ldiruvchilar:
$A_{11} = -3,\ A_{12} = 4,\ A_{13} = -2,\ A_{21} = -22,\ A_{22} = 1,\ A_{23} = 8,\ A_{31} = 7,\ A_{32} = 2,\ A_{33} = -1.$

$$A^{-1} = \frac{1}{17}\begin{pmatrix} -3 & -22 & 7\\ 4 & 1 & 2\\ -2 & 8 & -1\end{pmatrix}.$$
Tekshirish: $AA^{-1}$ ning birinchi elementi $\frac{1}{17}(3 + 8 + 6) = 1$ ✓.
:::

2×2 uchun qisqa qoida: $\begin{pmatrix} a & b\\ c & d\end{pmatrix}^{-1} = \dfrac{1}{ad - bc}\begin{pmatrix} d & -b\\ -c & a\end{pmatrix}$ — diagonal elementlar o'rin almashadi, qolganlari ishorasini o'zgartiradi.

:::xossa
$(A^{-1})^{-1} = A,\quad (AB)^{-1} = B^{-1}A^{-1},\quad (A^T)^{-1} = (A^{-1})^T,\quad \det A^{-1} = \dfrac{1}{\det A}.$
:::

:::savol
$\begin{pmatrix} 2 & 1\\ 5 & 3\end{pmatrix}^{-1}$ nimaga teng?
+ $\begin{pmatrix} 3 & -1\\ -5 & 2\end{pmatrix}$
- $\begin{pmatrix} 3 & 1\\ 5 & 2\end{pmatrix}$
- $\begin{pmatrix} 2 & -5\\ -1 & 3\end{pmatrix}$
- mavjud emas
> $\det = 6 - 5 = 1$.
:::

## 5.2. Gauss–Jordan usuli

Katta o'lchamlarda algebraik to'ldiruvchilar ko'p hisob talab qiladi. Samaraliroq yo'l: $(A\,|\,E)$ kengaytirilgan matritsani **faqat satrlar** ustida elementar almashtirishlar bilan $(E\,|\,A^{-1})$ ko'rinishga keltirish.

:::misol
$$\left(\begin{array}{cc|cc} 1 & 2 & 1 & 0\\ 3 & 7 & 0 & 1\end{array}\right) \to \left(\begin{array}{cc|cc} 1 & 2 & 1 & 0\\ 0 & 1 & -3 & 1\end{array}\right) \to \left(\begin{array}{cc|cc} 1 & 0 & 7 & -2\\ 0 & 1 & -3 & 1\end{array}\right),$$
demak $A^{-1} = \begin{pmatrix} 7 & -2\\ -3 & 1\end{pmatrix}$.
:::

## 5.3. Sistemani matritsaviy usulda yechish

$n$ noma'lumli $n$ ta chiziqli tenglama sistemasi matritsaviy ko'rinishda $AX = B$ yoziladi, bunda $A$ — koeffitsiyentlar matritsasi, $X$ — noma'lumlar ustuni, $B$ — ozod hadlar ustuni.

:::teorema
$\det A \ne 0$ bo'lsa, sistema yagona yechimga ega: $X = A^{-1}B$.
:::

:::misol
$\begin{cases} -x_1 + 2x_2 - 3x_3 = -2\\ x_2 + 2x_3 = 3\\ 2x_1 + 4x_2 + 5x_3 = 11\end{cases}$ — yuqoridagi $A$ matritsa bilan.
$$X = \frac{1}{17}\begin{pmatrix} -3 & -22 & 7\\ 4 & 1 & 2\\ -2 & 8 & -1\end{pmatrix}\begin{pmatrix} -2\\ 3\\ 11\end{pmatrix} = \frac{1}{17}\begin{pmatrix} 6 - 66 + 77\\ -8 + 3 + 22\\ 4 + 24 - 11\end{pmatrix} = \begin{pmatrix} 1\\ 1\\ 1\end{pmatrix}.$$
:::

## 5.4. Kramer qoidasi

:::teorema Kramer formulalari
$\Delta = \det A \ne 0$ bo'lsa, sistemaning yagona yechimi
$$x_j = \frac{\Delta_j}{\Delta},\qquad j = 1, \dots, n,$$
bunda $\Delta_j$ — $A$ ning $j$-ustunini ozod hadlar ustuni $B$ bilan almashtirishdan hosil bo'lgan determinant.
:::

:::misol
$\begin{cases} 3x_1 - x_2 + 3x_3 = -1\\ 2x_1 + x_2 + x_3 = 2\\ x_1 + x_2 + 2x_3 = 0\end{cases}$

$\Delta = \begin{vmatrix} 3 & -1 & 3\\ 2 & 1 & 1\\ 1 & 1 & 2\end{vmatrix} = 6 - 1 + 6 - 3 + 4 - 3 = 9$.

$\Delta_1 = \begin{vmatrix} -1 & -1 & 3\\ 2 & 1 & 1\\ 0 & 1 & 2\end{vmatrix} = -2 + 0 + 6 - 0 + 4 + 1 = 9$, $\ \Delta_2 = \begin{vmatrix} 3 & -1 & 3\\ 2 & 2 & 1\\ 1 & 0 & 2\end{vmatrix} = 9$, $\ \Delta_3 = \begin{vmatrix} 3 & -1 & -1\\ 2 & 1 & 2\\ 1 & 1 & 0\end{vmatrix} = -9$.

Javob: $x_1 = 1,\ x_2 = 1,\ x_3 = -1$. Tekshirish: $3 - 1 - 3 = -1$ ✓.
:::

:::diqqat
$\Delta = 0$ bo'lsa Kramer qoidasini qo'llab bo'lmaydi: sistema yo yechimga ega emas, yo cheksiz ko'p yechimga ega. Bunday holatlar 7–8-mavzularda o'rganiladi.
:::

:::savol
$\begin{cases} x + 2y = 5\\ 3x + 4y = 11\end{cases}$ sistemada $x$ nimaga teng?
+ $1$
- $2$
- $-1$
- $3$
> $\Delta = 4 - 6 = -2$, $\Delta_x = 20 - 22 = -2$, $x = 1$ (va $y = 2$).
:::

## 5.5. Matritsaviy tenglamalar

:::xossa
$AX = B \Rightarrow X = A^{-1}B$; $\quad XA = B \Rightarrow X = BA^{-1}$; $\quad AXB = C \Rightarrow X = A^{-1}CB^{-1}$.
:::

:::diqqat
Ko'paytma kommutativ emas, shuning uchun teskari matritsaga **qaysi tomondan** ko'paytirish muhim.
:::

> 💡 [Mashqlar → «Teskari matritsa»](#/mashq/teskari) bo'limida Kramer qoidasi va teskari matritsa masalalari tasodifiy generatsiya qilinadi.

:::tarix
G. Kramer (1704–1752) — shveytsariyalik matematik; formulalarni 1750-yilda algebraik egri chiziqlar haqidagi kitobida e'lon qilgan.
:::
