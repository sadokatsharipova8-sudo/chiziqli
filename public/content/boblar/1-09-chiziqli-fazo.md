# 9-mavzu. Chiziqli fazo. O'lcham va bazis

**Bu mavzuda:** chiziqli fazo aksiomalari va misollar, aksiomalardan natijalar, chiziqli bog'liqlik (umumiy holda), bazis va o'lcham, vektor koordinatalari, izomorfizm, o'tish matritsasi.

## 9.1. Chiziqli fazo ta'rifi

:::tarif
Elementlari uchun qo'shish $\mathbf x + \mathbf y$ va songa ko'paytirish $\lambda\mathbf x$ aniqlangan $V$ to'plam quyidagi 8 aksioma bajarilganda **chiziqli (vektor) fazo** deyiladi:
1. $\mathbf x + \mathbf y = \mathbf y + \mathbf x$;
2. $(\mathbf x + \mathbf y) + \mathbf z = \mathbf x + (\mathbf y + \mathbf z)$;
3. shunday $\mathbf 0$ mavjudki, $\mathbf x + \mathbf 0 = \mathbf x$;
4. har bir $\mathbf x$ uchun $-\mathbf x$ mavjud: $\mathbf x + (-\mathbf x) = \mathbf 0$;
5. $1\cdot\mathbf x = \mathbf x$;
6. $\alpha(\beta\mathbf x) = (\alpha\beta)\mathbf x$;
7. $(\alpha + \beta)\mathbf x = \alpha\mathbf x + \beta\mathbf x$;
8. $\alpha(\mathbf x + \mathbf y) = \alpha\mathbf x + \alpha\mathbf y$.
:::

Sonlar haqiqiy bo'lsa — haqiqiy, kompleks bo'lsa — kompleks chiziqli fazo.

**Aksiomalardan natijalar:** nol vektor va qarama-qarshi vektor yagona; $0\cdot\mathbf x = \mathbf 0$; $\lambda\mathbf 0 = \mathbf 0$; $(-1)\mathbf x = -\mathbf x$.

## 9.2. Misollar

| Fazo | Elementlari |
|---|---|
| $\mathbb R^n$ | arifmetik vektorlar (6-mavzu) |
| $V_2$, $V_3$ | tekislik va fazodagi geometrik vektorlar |
| $M_{m\times n}$ | $m\times n$ matritsalar |
| $P_n$ | darajasi $n$ dan oshmaydigan ko'phadlar |
| $C[a, b]$ | $[a, b]$ da uzluksiz funksiyalar |

:::savol
Qaysi to'plam (odatiy amallarga nisbatan) chiziqli fazo **emas**?
- Darajasi $\le 3$ ko'phadlar
- $2\times 2$ simmetrik matritsalar
+ Darajasi aynan 3 ga teng ko'phadlar
- $[0, 1]$ da uzluksiz funksiyalar
> $(x^3 + x) + (-x^3) = x$ — darajasi 3 emas; nol ko'phad ham yo'q.
:::

## 9.3. Bazis va o'lcham

Chiziqli bog'liqlik, chiziqli kombinatsiya va rang ta'riflari $\mathbb R^n$ dagidek (6–7-mavzular) umumiy fazoga ko'chadi.

:::tarif
$V$ ning chiziqli erkli va $V$ ning har bir vektorini chiziqli ifodalaydigan $\mathbf e_1, \dots, \mathbf e_n$ sistemasi **bazis** deyiladi. Bazisdagi vektorlar soni — fazoning **o'lchami**: $\dim V = n$.
:::

:::teorema
Chekli o'lchamli fazoning barcha bazislari bir xil sondagi vektorlardan iborat. $n$-o'lchamli fazoda istalgan $n$ ta chiziqli erkli vektor bazis tashkil etadi; $n + 1$ ta vektor esa har doim bog'liq.
:::

:::xossa Standart bazislar
- $\mathbb R^n$: $\mathbf e_1 = (1, 0, \dots, 0), \dots, \mathbf e_n = (0, \dots, 0, 1)$, $\ \dim = n$;
- $P_n$: $1, t, t^2, \dots, t^n$, $\ \dim = n + 1$;
- $M_{m\times n}$: $E_{ij}$ (bitta element 1, qolgani 0), $\ \dim = mn$;
- $C[a, b]$ — cheksiz o'lchamli fazo.
:::

:::savol
$2\times 2$ matritsalar fazosining o'lchami?
- 2
+ 4
- 1
- 8
:::

## 9.4. Vektor koordinatalari

:::teorema
Har bir $\mathbf x \in V$ bazis bo'yicha **yagona** usulda yoyiladi: $\mathbf x = x_1\mathbf e_1 + \dots + x_n\mathbf e_n$. $(x_1, \dots, x_n)$ — koordinatalar.
:::

:::misol
$\mathbb R^2$ da bazis $\mathbf e_1 = (1, 1)$, $\mathbf e_2 = (1, -1)$; $\mathbf x = (5, 1)$: $x_1 + x_2 = 5$, $x_1 - x_2 = 1$ $\Rightarrow$ $\mathbf x = 3\mathbf e_1 + 2\mathbf e_2$.

$P_2$ da $p(t) = 3 - 2t + 5t^2$: bazis $1, t, t^2$ da koordinatalar $(3, -2, 5)$; bazis $1, t - 1, (t - 1)^2$ da $(6, 8, 5)$ (Teylor koeffitsiyentlari).
:::

Koordinatalar yordamida amallar $\mathbb R^n$ dagi amallarga aylanadi:

:::teorema Izomorfizm
Har qanday $n$-o'lchamli haqiqiy chiziqli fazo $\mathbb R^n$ ga izomorf.
:::

## 9.5. Bazisni almashtirish

$\mathbf e'_j = \sum_i t_{ij}\mathbf e_i$. $j$-ustuni $\mathbf e'_j$ ning eski bazisdagi koordinatalari bo'lgan $T$ — **o'tish matritsasi**; $\det T \ne 0$.

:::teorema
$$X = TX',\qquad X' = T^{-1}X.$$
:::

:::misol
Standart bazisdan $\mathbf e'_1 = (1, 1)$, $\mathbf e'_2 = (1, -1)$ ga: $T = \begin{pmatrix} 1 & 1\\ 1 & -1\end{pmatrix}$, $T^{-1} = \frac12\begin{pmatrix} 1 & 1\\ 1 & -1\end{pmatrix}$. $X' = T^{-1}\begin{pmatrix} 5\\ 1\end{pmatrix} = \begin{pmatrix} 3\\ 2\end{pmatrix}$ ✓.
:::

:::diqqat
Bazis vektorlari $T$ orqali, koordinatalar esa $T^{-1}$ orqali almashadi.
:::

:::tarix
Chiziqli fazoning aksiomatik ta'rifini G. Peano (1888) bergan.
:::
