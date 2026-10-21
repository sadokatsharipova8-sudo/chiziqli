# 7-mavzu. Chiziqli bog'liq va erkli vektorlar haqidagi teoremalar. Matritsa rangi

**Bu mavzuda:** chiziqli bog'liqlik haqidagi asosiy teoremalar, vektorlar sistemasining rangi va bazisi, matritsa rangi, bazis minor teoremasi, rangni hisoblash usullari, Kroneker–Kapelli teoremasi.

## 7.1. Asosiy teoremalar

:::teorema 1
Sistema chiziqli bog'liq $\iff$ uning kamida bitta vektori qolganlarining chiziqli kombinatsiyasi.
:::

Isbot: $\lambda_1\mathbf a_1 + \dots + \lambda_k\mathbf a_k = \mathbf 0$ va $\lambda_1 \ne 0$ bo'lsa, $\mathbf a_1 = -\frac{\lambda_2}{\lambda_1}\mathbf a_2 - \dots - \frac{\lambda_k}{\lambda_1}\mathbf a_k$. Aksincha, $\mathbf a_1 = \sum_{i \ge 2}\mu_i\mathbf a_i$ bo'lsa, $1\cdot\mathbf a_1 - \sum\mu_i\mathbf a_i = \mathbf 0$ — notrivial kombinatsiya.

:::teorema 2
Bog'liq qism sistemaga ega sistema bog'liq. Erkli sistemaning har qanday qism sistemasi erkli.
:::

:::teorema 3
$\mathbf a_1, \dots, \mathbf a_k$ erkli, $\mathbf a_1, \dots, \mathbf a_k, \mathbf b$ esa bog'liq bo'lsa, $\mathbf b$ vektor $\mathbf a_1, \dots, \mathbf a_k$ orqali **yagona** usulda chiziqli ifodalanadi.
:::

:::teorema 4
$\mathbb R^n$ da $n$ dan ortiq vektordan iborat istalgan sistema chiziqli bog'liq.
:::

Isbot g'oyasi: $\sum\lambda_i\mathbf a_i = \mathbf 0$ — $n$ ta tenglama va $k > n$ noma'lumli bir jinsli sistema; noma'lumlar tenglamalardan ko'p, demak notrivial yechim bor.

:::teorema 5
$\mathbb R^n$ dagi $n$ ta vektor chiziqli erkli $\iff$ ulardan tuzilgan determinant noldan farqli.
:::

:::savol
$\mathbb R^3$ da 4 ta vektor qanday bo'ladi?
- Har doim erkli
+ Har doim bog'liq
- Vektorlarga qarab
- Ortogonal
:::

## 7.2. Vektorlar sistemasining rangi

:::tarif
Sistemaning **maksimal chiziqli erkli qism sistemasi** — erkli bo'lib, unga sistemaning istalgan boshqa vektorini qo'shganda bog'liq bo'ladigan qism sistema. Undagi vektorlar soni — sistemaning **rangi**.
:::

Teorema 3 ga ko'ra sistemaning har bir vektori maksimal erkli qism sistema orqali ifodalanadi. Barcha maksimal erkli qism sistemalar bir xil sondagi vektorlardan iborat — rang to'g'ri aniqlangan.

## 7.3. Matritsa rangi

:::tarif
$A$ matritsaning noldan farqli minorlarining eng yuqori tartibi — uning **rangi** $r(A)$. Shu tartibli noldan farqli minor — **bazis minor**.
:::

:::teorema Bazis minor haqida
Bazis minor joylashgan satrlar (ustunlar) chiziqli erkli; qolgan har bir satr (ustun) ularning chiziqli kombinatsiyasi.
:::

**Natija:** matritsa rangi = satrlar sistemasi rangi = ustunlar sistemasi rangi.

:::xossa
$r(A) \le \min(m, n)$; $\ r(A^T) = r(A)$; $\ r(AB) \le \min(r(A), r(B))$; kvadrat matritsa uchun $r(A) = n \iff \det A \ne 0$.
:::

## 7.4. Rangni hisoblash

**1. Hoshiyalovchi minorlar usuli.** Noldan farqli $k$-tartibli $M$ minor topilgan bo'lsa, faqat uni o'z ichiga oluvchi $(k+1)$-tartibli minorlarni tekshiramiz; hammasi nol bo'lsa, $r = k$.

**2. Elementar almashtirishlar usuli.** Elementar almashtirishlar rangni o'zgartirmaydi; matritsani pog'onasimon ko'rinishga keltirib, noldan farqli satrlarni sanaymiz.

:::misol
$$\begin{pmatrix} 2 & -1 & 3 & -2 & 4\\ 4 & -2 & 5 & 1 & 7\\ 2 & -1 & 1 & 8 & 2\end{pmatrix} \to \begin{pmatrix} 2 & -1 & 3 & -2 & 4\\ 0 & 0 & -1 & 5 & -1\\ 0 & 0 & -2 & 10 & -2\end{pmatrix} \to \begin{pmatrix} 2 & -1 & 3 & -2 & 4\\ 0 & 0 & -1 & 5 & -1\\ 0 & 0 & 0 & 0 & 0\end{pmatrix}.$$
$r(A) = 2$. Bazis minor: $\begin{vmatrix} 2 & 3\\ 4 & 5\end{vmatrix} = -2 \ne 0$.
:::

> 💡 [Laboratoriya → Matritsa rangi](#/lab/rang) da istalgan matritsa rangini qadamma-qadam toping.

:::savol
$\begin{pmatrix} 1 & 2 & 3\\ 2 & 4 & 6\\ 3 & 6 & 9\end{pmatrix}$ ning rangi?
+ 1
- 2
- 3
- 0
:::

## 7.5. Kroneker–Kapelli teoremasi

$AX = B$ sistemaning **kengaytirilgan matritsasi** $\overline A = (A\,|\,B)$.

:::teorema Kroneker–Kapelli
Sistema birgalikda $\iff$ $r(A) = r(\overline A)$. Bunda $r = n$ — yagona yechim, $r < n$ — cheksiz ko'p yechim ($n - r$ ta erkin noma'lum).
:::

Ma'nosi: $B$ ustun $A$ ning ustunlari chiziqli kombinatsiyasi bo'lishi kerak — ya'ni $B$ ni qo'shish rangni oshirmasligi kerak.

:::misol
$\begin{cases} x + y = 1\\ 2x + 2y = 3\end{cases}$: $r(A) = 1$, $r(\overline A) = 2$ — yechim yo'q (parallel to'g'ri chiziqlar).
:::

:::savol
5 noma'lumli sistemada $r(A) = r(\overline A) = 3$. Nechta erkin noma'lum bor?
- 3
+ 2
- 5
- 0
:::

:::tarix
L. Kroneker (1823–1891) va A. Kapelli (1855–1910). «Rang» atamasini F. G. Frobenius (1879) kiritgan.
:::
