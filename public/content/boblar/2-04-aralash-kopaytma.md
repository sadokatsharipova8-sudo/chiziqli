# 4-mavzu. Vektorlarning aralash ko'paytmasi va uning xossalari

**Bu mavzuda:** aralash ko'paytma ta'rifi, koordinatalardagi formula, geometrik ma'no (hajm, uchlik yo'nalishi), xossalar, komplanarlik sharti, piramida hajmi va balandligi.

## 4.1. Ta'rif

:::tarif
$$\mathbf a\mathbf b\mathbf c = (\mathbf a \times \mathbf b)\cdot\mathbf c$$
— $\mathbf a, \mathbf b, \mathbf c$ ning **aralash ko'paytmasi** (natija — son).
:::

## 4.2. Koordinatalarda

:::teorema
$$\mathbf a\mathbf b\mathbf c = \begin{vmatrix} a_x & a_y & a_z\\ b_x & b_y & b_z\\ c_x & c_y & c_z\end{vmatrix}.$$
:::

Isbot: $\mathbf a \times \mathbf b$ ning koordinatalari — 2-tartibli minorlar; ularni $\mathbf c$ ning koordinatalariga ko'paytirib qo'shsak, determinantning 3-satr bo'yicha yoyilmasi hosil bo'ladi.

## 4.3. Geometrik ma'no

:::teorema
$|\mathbf a\mathbf b\mathbf c|$ — $\mathbf a, \mathbf b, \mathbf c$ ga qurilgan **parallelepiped hajmi**. $\mathbf a\mathbf b\mathbf c > 0$ — o'ng uchlik, $< 0$ — chap uchlik.
:::

Isbot: $V = S_{\text{asos}}\cdot h = |\mathbf a \times \mathbf b|\cdot|\text{pr}_{\mathbf a\times\mathbf b}\mathbf c| = |(\mathbf a \times \mathbf b)\cdot\mathbf c|$.

**Tetraedr (uchburchakli piramida) hajmi:** $V = \frac16|\mathbf a\mathbf b\mathbf c|$.

## 4.4. Xossalar

:::xossa
1. Doiraviy almashtirishda o'zgarmaydi: $\mathbf a\mathbf b\mathbf c = \mathbf b\mathbf c\mathbf a = \mathbf c\mathbf a\mathbf b$;
2. ikki ko'paytuvchi o'rni almashsa, ishora o'zgaradi: $\mathbf b\mathbf a\mathbf c = -\mathbf a\mathbf b\mathbf c$;
3. $(\mathbf a \times \mathbf b)\cdot\mathbf c = \mathbf a\cdot(\mathbf b \times \mathbf c)$;
4. chiziqlilik: $(\lambda\mathbf a + \mu\mathbf a')\mathbf b\mathbf c = \lambda\,\mathbf a\mathbf b\mathbf c + \mu\,\mathbf a'\mathbf b\mathbf c$;
5. ikkita ko'paytuvchi teng yoki kollinear bo'lsa, $\mathbf a\mathbf b\mathbf c = 0$.
:::

Bular — determinant xossalari (1-semestr 3-mavzu).

:::savol
$\mathbf a\mathbf b\mathbf c = 5$. $\mathbf b\mathbf a\mathbf c$ = ?
- 5
+ −5
- 0
- 15
:::

## 4.5. Komplanarlik sharti

:::teorema
$$\mathbf a, \mathbf b, \mathbf c\ \text{komplanar} \iff \mathbf a\mathbf b\mathbf c = 0.$$
:::

:::misol
$A(1;\ 2;\ -1)$, $B(0;\ 1;\ 5)$, $C(-1;\ 2;\ 1)$, $D(2;\ 1;\ 3)$ bitta tekislikdami?
$$\overrightarrow{AB}\,\overrightarrow{AC}\,\overrightarrow{AD} = \begin{vmatrix} -1 & -1 & 6\\ -2 & 0 & 2\\ 1 & -1 & 4\end{vmatrix} = 0.$$
Ha, bitta tekislikda.
:::

:::savol
$\mathbf a = (1;\ 0;\ 0)$, $\mathbf b = (0;\ 2;\ 0)$, $\mathbf c = (1;\ 1;\ k)$ qaysi $k$ da komplanar?
+ $k = 0$
- $k = 1$
- $k = 2$
- hech qanday $k$ da
:::

## 4.6. Hajm va balandlik

:::misol
Piramida $A(1;\ 1;\ 1)$, $B(3;\ 1;\ 1)$, $C(1;\ 4;\ 1)$, $D(1;\ 1;\ 5)$: $\overrightarrow{AB} = (2;\ 0;\ 0)$, $\overrightarrow{AC} = (0;\ 3;\ 0)$, $\overrightarrow{AD} = (0;\ 0;\ 4)$.

$\overrightarrow{AB}\,\overrightarrow{AC}\,\overrightarrow{AD} = 24$, $V = 4$. Asos yuzi $S_{ABC} = \frac12|\overrightarrow{AB} \times \overrightarrow{AC}| = 3$, balandlik $h = \frac{3V}{S} = 4$.
:::

:::misol
$\mathbf a = (1;\ 2;\ 3)$, $\mathbf b = (0;\ 1;\ 1)$, $\mathbf c = (2;\ 1;\ 0)$: $\mathbf a\mathbf b\mathbf c = 1(0 - 1) - 2(0 - 2) + 3(0 - 2) = -1 + 4 - 6 = -3$. Chap uchlik, parallelepiped hajmi 3.
:::

**Tatbiqlar:** kristall panjara katakchasi hajmi; kompyuter grafikasida nuqta tekislikning qaysi tomonida ekanini aniqlash (ishora); uchburchakli to'rlarning hajmini hisoblash.

:::tarix
Aralash ko'paytmaning hajm bilan bog'liqligini J. Lagranj (1773) tetraedr hajmi formulasida ko'rsatgan.
:::
