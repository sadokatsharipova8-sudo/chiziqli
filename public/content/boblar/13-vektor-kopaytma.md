# 13. Vektor va aralash ko'paytmalar

**Bu mavzuda:** vektorlarning o'ng va chap uchligi, vektor ko'paytma va uning xossalari, parallelogramm va uchburchak yuzi, aralash ko'paytma, parallelepiped va piramida hajmi, komplanarlik sharti.

## 13.1. Vektorlarning uchligi

Nokomplanar $\mathbf a, \mathbf b, \mathbf c$ vektorlarning tartiblangan uchligi **o'ng** deyiladi, agar $\mathbf c$ ning oxiridan qaraganda $\mathbf a$ dan $\mathbf b$ ga eng qisqa burilish soat strelkasiga qarshi bo'lsa; aks holda — **chap** uchlik. $\mathbf i, \mathbf j, \mathbf k$ — o'ng uchlik.

## 13.2. Vektor ko'paytma

:::tarif
$\mathbf a$ va $\mathbf b$ ning **vektor ko'paytmasi** $\mathbf c = \mathbf a \times \mathbf b$ quyidagi shartlar bilan aniqlanadi:
1. $|\mathbf c| = |\mathbf a||\mathbf b|\sin\varphi$;
2. $\mathbf c \perp \mathbf a$, $\mathbf c \perp \mathbf b$;
3. $\mathbf a, \mathbf b, \mathbf c$ — o'ng uchlik.
:::

:::xossa
1. $\mathbf a \times \mathbf b = -\mathbf b \times \mathbf a$ (antikommutativlik);
2. $(\lambda\mathbf a) \times \mathbf b = \lambda(\mathbf a \times \mathbf b)$; $\ \mathbf a \times (\mathbf b + \mathbf c) = \mathbf a \times \mathbf b + \mathbf a \times \mathbf c$;
3. $\mathbf a \times \mathbf b = \mathbf 0 \iff \mathbf a \parallel \mathbf b$; xususan $\mathbf a \times \mathbf a = \mathbf 0$;
4. $\mathbf i \times \mathbf j = \mathbf k$, $\ \mathbf j \times \mathbf k = \mathbf i$, $\ \mathbf k \times \mathbf i = \mathbf j$.
:::

:::teorema Koordinatalarda
$$\mathbf a \times \mathbf b = \begin{vmatrix} \mathbf i & \mathbf j & \mathbf k\\ a_x & a_y & a_z\\ b_x & b_y & b_z\end{vmatrix} = \begin{vmatrix} a_y & a_z\\ b_y & b_z\end{vmatrix}\mathbf i - \begin{vmatrix} a_x & a_z\\ b_x & b_z\end{vmatrix}\mathbf j + \begin{vmatrix} a_x & a_y\\ b_x & b_y\end{vmatrix}\mathbf k.$$
:::

**Geometrik ma'no:** $|\mathbf a \times \mathbf b|$ — $\mathbf a$ va $\mathbf b$ ga qurilgan **parallelogramm yuzi**; uchburchak yuzi $S = \frac12|\mathbf a \times \mathbf b|$.

**Mexanik ma'no:** $A$ nuqtaga qo'yilgan $\mathbf F$ kuchning $O$ nuqtaga nisbatan **momenti** $\mathbf M = \overrightarrow{OA} \times \mathbf F$.

:::misol
$\mathbf a = (1;\ 2;\ -1)$, $\mathbf b = (2;\ 0;\ 3)$:
$$\mathbf a \times \mathbf b = \begin{vmatrix} \mathbf i & \mathbf j & \mathbf k\\ 1 & 2 & -1\\ 2 & 0 & 3\end{vmatrix} = (6 - 0)\mathbf i - (3 + 2)\mathbf j + (0 - 4)\mathbf k = (6;\ -5;\ -4).$$
Parallelogramm yuzi: $\sqrt{36 + 25 + 16} = \sqrt{77}$.
:::

:::misol
$|\mathbf a| = 2$, $|\mathbf b| = 3$, $\varphi = \frac{\pi}{3}$. $\mathbf a$ va $\mathbf b$ ga qurilgan parallelogramm yuzi: $2\cdot 3\cdot\frac{\sqrt3}{2} = 3\sqrt3$.

$\mathbf p = 2\mathbf a + \mathbf b$ va $\mathbf q = \mathbf a - 2\mathbf b$ ga qurilgan parallelogramm yuzi: $\mathbf p \times \mathbf q = -4\,\mathbf a \times \mathbf b + \mathbf b \times \mathbf a = -5\,\mathbf a \times \mathbf b$, demak $S = 5\cdot 3\sqrt3 = 15\sqrt3$, uchburchakniki esa $\frac{15\sqrt3}{2}$.
:::

:::savol
$\mathbf j \times \mathbf i$ nimaga teng?
- $\mathbf k$
+ $-\mathbf k$
- $\mathbf 0$
- $1$
:::

## 13.3. Aralash ko'paytma

:::tarif
$(\mathbf a \times \mathbf b)\cdot\mathbf c$ son $\mathbf a, \mathbf b, \mathbf c$ ning **aralash ko'paytmasi** deyiladi: $\mathbf a\mathbf b\mathbf c$ yoki $(\mathbf a, \mathbf b, \mathbf c)$.
:::

:::teorema Koordinatalarda
$$\mathbf a\mathbf b\mathbf c = \begin{vmatrix} a_x & a_y & a_z\\ b_x & b_y & b_z\\ c_x & c_y & c_z\end{vmatrix}.$$
:::

:::xossa
1. $|\mathbf a\mathbf b\mathbf c|$ — $\mathbf a, \mathbf b, \mathbf c$ ga qurilgan **parallelepiped hajmi**; tetraedr (uchburchakli piramida) hajmi $V = \frac16|\mathbf a\mathbf b\mathbf c|$.
2. $\mathbf a\mathbf b\mathbf c > 0$ — o'ng uchlik, $< 0$ — chap uchlik.
3. Doiraviy almashtirishda o'zgarmaydi: $\mathbf a\mathbf b\mathbf c = \mathbf b\mathbf c\mathbf a = \mathbf c\mathbf a\mathbf b$; ikki ko'paytuvchi o'rni almashsa ishora o'zgaradi.
4. **Komplanarlik sharti:** $\mathbf a, \mathbf b, \mathbf c$ komplanar $\iff \mathbf a\mathbf b\mathbf c = 0$.
:::

:::misol
Piramida uchlari $A(1;\ 1;\ 1)$, $B(3;\ 1;\ 1)$, $C(1;\ 4;\ 1)$, $D(1;\ 1;\ 5)$.
$\overrightarrow{AB} = (2;\ 0;\ 0)$, $\overrightarrow{AC} = (0;\ 3;\ 0)$, $\overrightarrow{AD} = (0;\ 0;\ 4)$:
$$\overrightarrow{AB}\,\overrightarrow{AC}\,\overrightarrow{AD} = 2\cdot 3\cdot 4 = 24,\qquad V = \frac{24}{6} = 4.$$
Parallelepiped hajmi esa 24.
:::

:::misol
To'rtta nuqta bitta tekislikda yotadimi: $A(1;\ 2;\ -1)$, $B(0;\ 1;\ 5)$, $C(-1;\ 2;\ 1)$, $D(2;\ 1;\ 3)$?
$$\begin{vmatrix} -1 & -1 & 6\\ -2 & 0 & 2\\ 1 & -1 & 4\end{vmatrix} = 0 - 2 + 12 - 0 - 8 - 2 = 0.$$
Ha, nuqtalar bitta tekislikda yotadi.
:::

:::savol
$\mathbf a\mathbf b\mathbf c = 5$ bo'lsa, $\mathbf b\mathbf a\mathbf c$ nimaga teng?
- 5
+ −5
- 0
- 15
:::

:::savol
$\mathbf a = (1;\ 0;\ 0)$, $\mathbf b = (0;\ 2;\ 0)$, $\mathbf c = (1;\ 1;\ k)$ vektorlar qaysi $k$ da komplanar?
+ $k = 0$
- $k = 1$
- $k = 2$
- hech qanday $k$ da
> $\mathbf a\mathbf b\mathbf c = 2k = 0$.
:::

> 💡 [Mashqlar → «Vektor va aralash ko'paytma»](#/mashq/vkopaytma) bo'limida vektor ko'paytma, uchburchak yuzi va piramida hajmi masalalari bor.

:::tarix
Vektor ko'paytma kvaternionlarni ko'paytirishdan kelib chiqqan (U. Gamilton, 1843). Aralash ko'paytmaning hajm bilan bog'liqligini J. Lagranj (1773) tetraedr hajmi formulasida ko'rsatgan.
:::
