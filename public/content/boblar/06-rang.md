# 6. Arifmetik fazo, chiziqli bog'liqlik va matritsa rangi

**Bu mavzuda:** $\mathbb R^n$ arifmetik vektor fazo, vektorlarning chiziqli kombinatsiyasi, chiziqli bog'liq va erkli sistemalar, matritsa rangi (minorlar va elementar almashtirishlar orqali), Kroneker–Kapelli teoremasi.

## 6.1. Arifmetik vektor fazo

:::tarif
$n$ ta haqiqiy sonning tartiblangan to'plami $\mathbf a = (a_1, a_2, \dots, a_n)$ **$n$-o'lchovli arifmetik vektor** deyiladi. Barcha bunday vektorlar to'plami qo'shish
$$\mathbf a + \mathbf b = (a_1 + b_1, \dots, a_n + b_n)$$
va songa ko'paytirish $\lambda\mathbf a = (\lambda a_1, \dots, \lambda a_n)$ amallari bilan birga **arifmetik fazo** $\mathbb R^n$ ni tashkil etadi.
:::

Matritsaning satrlari va ustunlari — arifmetik vektorlar. Chiziqli tenglama ham vektor: $a_1x_1 + \dots + a_nx_n = b$ tenglamaga $(a_1, \dots, a_n, b)$ vektor mos keladi.

## 6.2. Chiziqli bog'liqlik

:::tarif
$\lambda_1\mathbf a_1 + \lambda_2\mathbf a_2 + \dots + \lambda_k\mathbf a_k$ ifoda $\mathbf a_1, \dots, \mathbf a_k$ vektorlarning **chiziqli kombinatsiyasi** deyiladi.

Agar kamida bittasi noldan farqli $\lambda_1, \dots, \lambda_k$ sonlar uchun
$$\lambda_1\mathbf a_1 + \dots + \lambda_k\mathbf a_k = \mathbf 0$$
bo'lsa, sistema **chiziqli bog'liq**; bu tenglik faqat $\lambda_1 = \dots = \lambda_k = 0$ da bajarilsa — **chiziqli erkli** deyiladi.
:::

:::xossa
1. Sistema chiziqli bog'liq $\iff$ uning kamida bitta vektori qolganlarining chiziqli kombinatsiyasi.
2. Nol vektorni o'z ichiga olgan sistema chiziqli bog'liq.
3. Chiziqli bog'liq qism sistemaga ega sistema ham bog'liq; erkli sistemaning har bir qism sistemasi erkli.
4. $\mathbb R^n$ da $n$ dan ortiq vektor har doim chiziqli bog'liq.
5. $\mathbb R^n$ dagi $n$ ta vektor chiziqli erkli $\iff$ ulardan tuzilgan determinant $\ne 0$.
:::

:::misol
$\mathbf a_1 = (1, 2, 3)$, $\mathbf a_2 = (2, 1, 0)$, $\mathbf a_3 = (4, 5, 6)$. Determinant:
$$\begin{vmatrix} 1 & 2 & 3\\ 2 & 1 & 0\\ 4 & 5 & 6\end{vmatrix} = 6 + 0 + 30 - 12 - 24 - 0 = 0,$$
demak vektorlar chiziqli bog'liq. Haqiqatan, $\mathbf a_3 = 2\mathbf a_1 + \mathbf a_2$.
:::

:::savol
$\mathbf a = (1, k)$ va $\mathbf b = (3, 6)$ vektorlar qaysi $k$ da chiziqli bog'liq?
- $k = 3$
+ $k = 2$
- $k = 6$
- hech qanday $k$ da
> $\begin{vmatrix} 1 & k\\ 3 & 6\end{vmatrix} = 6 - 3k = 0$.
:::

## 6.3. Matritsa rangi

:::tarif
$A$ matritsaning noldan farqli minorlarining eng yuqori tartibi uning **rangi** deyiladi: $r(A)$ yoki $\operatorname{rang} A$. Shu tartibdagi noldan farqli minor — **bazis minor**.
:::

:::teorema Bazis minor haqida
Bazis minor joylashgan satrlar (ustunlar) chiziqli erkli, qolgan har bir satr (ustun) ularning chiziqli kombinatsiyasi. Demak, **rang = chiziqli erkli satrlarning maksimal soni = chiziqli erkli ustunlarning maksimal soni.**
:::

**Rangni topish usullari:**

1. **Hoshiyalovchi minorlar usuli.** Noldan farqli $k$-tartibli $M$ minor topilgan bo'lsa, faqat uni o'z ichiga oluvchi («hoshiyalovchi») $(k+1)$-tartibli minorlarni tekshirish kifoya. Ularning hammasi nol bo'lsa, $r = k$.
2. **Elementar almashtirishlar usuli.** Elementar almashtirishlar rangni o'zgartirmaydi. Matritsani **pog'onasimon** ko'rinishga keltiramiz; rang noldan farqli satrlar soniga teng.

:::misol
$$A = \begin{pmatrix} 2 & -1 & 3 & -2 & 4\\ 4 & -2 & 5 & 1 & 7\\ 2 & -1 & 1 & 8 & 2\end{pmatrix} \to \begin{pmatrix} 2 & -1 & 3 & -2 & 4\\ 0 & 0 & -1 & 5 & -1\\ 0 & 0 & -2 & 10 & -2\end{pmatrix} \to \begin{pmatrix} 2 & -1 & 3 & -2 & 4\\ 0 & 0 & -1 & 5 & -1\\ 0 & 0 & 0 & 0 & 0\end{pmatrix}.$$
(2-satrdan 1-satrning 2 barobari, 3-satrdan 1-satr ayirildi; so'ng 3-satrdan 2-satrning 2 barobari ayirildi.) Noldan farqli satrlar 2 ta: $r(A) = 2$. Bazis minor: $\begin{vmatrix} 2 & 3\\ 4 & 5\end{vmatrix} = -2 \ne 0$.
:::

:::xossa
$r(A) \le \min(m, n)$; $\quad r(A^T) = r(A)$; $\quad r(AB) \le \min(r(A), r(B))$; $\quad n$-tartibli kvadrat matritsa uchun $r(A) = n \iff \det A \ne 0$.
:::

:::savol
$\begin{pmatrix} 1 & 2 & 3\\ 2 & 4 & 6\\ 3 & 6 & 9\end{pmatrix}$ matritsaning rangi nechaga teng?
+ 1
- 2
- 3
- 0
> Barcha satrlar birinchi satrga proporsional.
:::

## 6.4. Kroneker–Kapelli teoremasi

$m$ ta tenglama, $n$ noma'lumli sistema $AX = B$ uchun $\overline A = (A\,|\,B)$ — **kengaytirilgan matritsa**.

:::teorema Kroneker–Kapelli
Sistema **birgalikda** (yechimga ega) bo'lishi uchun $r(A) = r(\overline A)$ bo'lishi zarur va yetarli. Bunda:
- $r = n$ bo'lsa — yechim **yagona**;
- $r < n$ bo'lsa — yechimlar **cheksiz ko'p**, $n - r$ ta noma'lum ixtiyoriy (erkin) qiymat qabul qiladi.
:::

:::misol
$\begin{cases} x + y = 1\\ 2x + 2y = 3\end{cases}$: $r(A) = 1$, lekin $\overline A = \begin{pmatrix} 1 & 1 & 1\\ 2 & 2 & 3\end{pmatrix}$ uchun $\begin{vmatrix} 1 & 1\\ 2 & 3\end{vmatrix} = 1 \ne 0$, $r(\overline A) = 2$. Sistema birgalikda emas.
:::

:::savol
5 noma'lumli sistemada $r(A) = r(\overline A) = 3$. Nechta erkin noma'lum bor?
- 3
+ 2
- 5
- 0
:::

:::tarix
L. Kroneker (1823–1891) — nemis, A. Kapelli (1855–1910) — italyan matematiklari. «Rang» atamasini F. G. Frobenius (1879) kiritgan.
:::
