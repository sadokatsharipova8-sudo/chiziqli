# 4-mavzu. Algebraik to'ldiruvchi va minorlar. Laplas teoremasi

**Bu mavzuda:** minor va algebraik to'ldiruvchi, determinantni satr (ustun) bo'yicha yoyish, «begona» to'ldiruvchilar haqidagi teorema, $k$-tartibli minorlar va Laplas teoremasi.

## 4.1. Minor va algebraik to'ldiruvchi

:::tarif
$n$-tartibli $A$ matritsaning $a_{ij}$ elementi turgan $i$-satr va $j$-ustunni o'chirishdan hosil bo'lgan $(n-1)$-tartibli determinant $a_{ij}$ ning **minori** deyiladi va $M_{ij}$ bilan belgilanadi.

$$A_{ij} = (-1)^{i+j}M_{ij}$$
son $a_{ij}$ ning **algebraik to'ldiruvchisi** deyiladi.
:::

Ishoralar «shaxmat taxtasi» kabi joylashadi:
$$\begin{pmatrix} + & - & + & \dots\\ - & + & - & \dots\\ + & - & + & \dots\\ \vdots & & & \ddots\end{pmatrix}$$

:::misol
$A = \begin{pmatrix} 2 & 1 & -1\\ 3 & 0 & 4\\ 1 & 5 & 2\end{pmatrix}$ uchun $M_{12} = \begin{vmatrix} 3 & 4\\ 1 & 2\end{vmatrix} = 2$, $A_{12} = (-1)^{1+2}\cdot 2 = -2$.
:::

:::savol
$a_{23}$ elementining algebraik to'ldiruvchisi qaysi ishora bilan olinadi?
- $+M_{23}$
+ $-M_{23}$
- har doim musbat
- $a_{23}$ ishorasiga bog'liq
> $(-1)^{2+3} = -1$.
:::

## 4.2. Determinantni satr yoki ustun bo'yicha yoyish

:::teorema Yoyish teoremasi
Determinant istalgan satr (ustun) elementlarining ularning algebraik to'ldiruvchilariga ko'paytmalari yig'indisiga teng:
$$\det A = \sum_{j=1}^{n} a_{ij}A_{ij} = a_{i1}A_{i1} + a_{i2}A_{i2} + \dots + a_{in}A_{in},$$
$$\det A = \sum_{i=1}^{n} a_{ij}A_{ij}\quad (j\text{-ustun bo'yicha}).$$
:::

Bu teorema $n$-tartibli determinantni $(n-1)$-tartibli determinantlarga keltiradi. **Amaliy maslahat:** nollari ko'p satr yoki ustunni tanlang; bo'lmasa, 6-xossa yordamida (satrga boshqa satrni qo'shib) bitta satrda nollar hosil qiling.

:::misol
$$\begin{vmatrix} 3 & 2 & -1\\ 1 & 0 & 4\\ 2 & 0 & 5\end{vmatrix} = 2\cdot(-1)^{1+2}\begin{vmatrix} 1 & 4\\ 2 & 5\end{vmatrix} = -2\cdot(5 - 8) = 6$$
(ikkinchi ustunda faqat bitta noldan farqli element bor).
:::

:::misol To'rtinchi tartibli determinant
$$\Delta = \begin{vmatrix} 1 & 2 & 0 & 3\\ 0 & 1 & 0 & 2\\ 4 & -1 & 2 & 1\\ 2 & 0 & 0 & 1\end{vmatrix}.$$
3-ustunda bitta noldan farqli element ($a_{33} = 2$):
$$\Delta = 2\cdot(-1)^{3+3}\begin{vmatrix} 1 & 2 & 3\\ 0 & 1 & 2\\ 2 & 0 & 1\end{vmatrix} = 2\,(1 + 8 + 0 - 6 - 0 - 0) = 2\cdot 3 = 6.$$
:::

## 4.3. «Begona» algebraik to'ldiruvchilar

:::teorema
Bir satr elementlarini **boshqa** satr elementlarining algebraik to'ldiruvchilariga ko'paytirib qo'shsak, nol hosil bo'ladi:
$$\sum_{j=1}^{n} a_{ij}A_{kj} = \det A\cdot\delta_{ik},\qquad \delta_{ik} = \begin{cases} 1, & i = k,\\ 0, & i \ne k.\end{cases}$$
:::

Haqiqatan ham, $i \ne k$ bo'lsa, bu yig'indi $k$-satri $i$-satr bilan almashtirilgan determinantning yoyilmasi — unda ikkita teng satr bor, demak u nolga teng. Bu teorema keyingi mavzuda **teskari matritsa** formulasini isbotlash uchun kerak.

:::savol
$\sum_j a_{1j}A_{3j}$ yig'indi nimaga teng ($3\times 3$ matritsa uchun)?
- $\det A$
+ $0$
- $3\det A$
- $a_{13}$
:::

## 4.4. k-tartibli minorlar. Laplas teoremasi

:::tarif
$A$ ning ixtiyoriy $k$ ta satri $i_1 < \dots < i_k$ va $k$ ta ustuni $j_1 < \dots < j_k$ kesishmasidagi elementlardan tuzilgan determinant **$k$-tartibli minor** deyiladi. Qolgan satr va ustunlardan tuzilgan $(n-k)$-tartibli determinant — **to'ldiruvchi minor** $\overline M$; algebraik to'ldiruvchi: $(-1)^{i_1 + \dots + i_k + j_1 + \dots + j_k}\,\overline M$.
:::

:::teorema Laplas teoremasi
Ixtiyoriy $k$ ta satrni tanlaymiz. Determinant shu satrlarda joylashgan barcha $k$-tartibli minorlarning ularning algebraik to'ldiruvchilariga ko'paytmalari yig'indisiga teng.
:::

$k = 1$ da bu oddiy satr bo'yicha yoyishning o'zi. Laplas teoremasining muhim natijasi — **blok-uchburchak** matritsa uchun:
$$\begin{vmatrix} A & B\\ O & C\end{vmatrix} = \det A\cdot\det C.$$

:::misol
$$\begin{vmatrix} 2 & 1 & 5 & 7\\ 3 & 4 & -1 & 2\\ 0 & 0 & 1 & 3\\ 0 & 0 & 2 & 1\end{vmatrix} = \begin{vmatrix} 2 & 1\\ 3 & 4\end{vmatrix}\cdot\begin{vmatrix} 1 & 3\\ 2 & 1\end{vmatrix} = 5\cdot(-5) = -25.$$
:::

:::savol
Laplas teoremasi bo'yicha 4-tartibli determinantni birinchi ikki satr bo'yicha yoyganda nechta qo'shiluvchi hosil bo'ladi?
- 4
+ 6
- 8
- 24
> 2-tartibli minorlar soni: $C_4^2 = 6$.
:::

:::eslatma
Mashqlar bo'limidagi «Minorlar» mavzusida algebraik to'ldiruvchini topish va nollar qatori bor 4-tartibli determinantni yoyish masalalari bor.
:::

:::tarix
P. S. Laplas (1749–1827) — fransuz matematigi va astronomi. Yoyish teoremasini 1772-yilda e'lon qilgan.
:::
