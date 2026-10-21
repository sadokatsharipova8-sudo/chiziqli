# 3-mavzu. Vektorlarning vektor ko'paytmasi va uning xossalari

**Bu mavzuda:** o'ng va chap uchlik, vektor ko'paytma ta'rifi, algebraik xossalari, koordinatalardagi formulasi, geometrik va mexanik ma'nosi, tatbiqlar.

## 3.1. O'ng va chap uchlik

Nokomplanar $\mathbf a, \mathbf b, \mathbf c$ uchligi **o'ng**, agar $\mathbf c$ ning oxiridan qaraganda $\mathbf a$ dan $\mathbf b$ ga eng qisqa burilish soat strelkasiga qarshi bo'lsa; aks holda — **chap**. **O'ng qo'l qoidasi:** bosh barmoq — $\mathbf a$, ko'rsatkich — $\mathbf b$, o'rta barmoq — $\mathbf c$. $\mathbf i, \mathbf j, \mathbf k$ — o'ng uchlik.

## 3.2. Ta'rif

:::tarif
$\mathbf c = \mathbf a \times \mathbf b$ — **vektor ko'paytma**:
1. $|\mathbf c| = |\mathbf a|\,|\mathbf b|\sin\varphi$;
2. $\mathbf c \perp \mathbf a$, $\mathbf c \perp \mathbf b$;
3. $\mathbf a, \mathbf b, \mathbf c$ — o'ng uchlik.
:::

**Geometrik ma'no:** $|\mathbf a \times \mathbf b|$ — $\mathbf a$, $\mathbf b$ ga qurilgan **parallelogramm yuzi**; uchburchak yuzi $\frac12|\mathbf a \times \mathbf b|$.

## 3.3. Xossalar

:::xossa
1. $\mathbf a \times \mathbf b = -\mathbf b \times \mathbf a$ (antikommutativlik);
2. $(\lambda\mathbf a) \times \mathbf b = \lambda(\mathbf a \times \mathbf b)$;
3. $\mathbf a \times (\mathbf b + \mathbf c) = \mathbf a \times \mathbf b + \mathbf a \times \mathbf c$;
4. $\mathbf a \times \mathbf b = \mathbf 0 \iff \mathbf a \parallel \mathbf b$; xususan $\mathbf a \times \mathbf a = \mathbf 0$;
5. $\mathbf i \times \mathbf j = \mathbf k$, $\mathbf j \times \mathbf k = \mathbf i$, $\mathbf k \times \mathbf i = \mathbf j$.
:::

:::diqqat
Vektor ko'paytma **assotsiativ emas**: $(\mathbf i \times \mathbf i) \times \mathbf j = \mathbf 0$, lekin $\mathbf i \times (\mathbf i \times \mathbf j) = \mathbf i \times \mathbf k = -\mathbf j$.
:::

:::savol
$\mathbf i \times \mathbf k$ = ?
- $\mathbf j$
+ $-\mathbf j$
- $\mathbf 0$
- $\mathbf i$
:::

## 3.4. Koordinatalarda

:::teorema
$$\mathbf a \times \mathbf b = \begin{vmatrix} \mathbf i & \mathbf j & \mathbf k\\ a_x & a_y & a_z\\ b_x & b_y & b_z\end{vmatrix} = \begin{vmatrix} a_y & a_z\\ b_y & b_z\end{vmatrix}\mathbf i - \begin{vmatrix} a_x & a_z\\ b_x & b_z\end{vmatrix}\mathbf j + \begin{vmatrix} a_x & a_y\\ b_x & b_y\end{vmatrix}\mathbf k.$$
:::

Isbot: xossalar 2–3 va bazis jadvali yordamida $(a_x\mathbf i + a_y\mathbf j + a_z\mathbf k) \times (b_x\mathbf i + \dots)$ ni ochib chiqamiz.

:::misol
$\mathbf a = (1;\ 2;\ -1)$, $\mathbf b = (2;\ 0;\ 3)$: $\mathbf a \times \mathbf b = (6 - 0)\mathbf i - (3 + 2)\mathbf j + (0 - 4)\mathbf k = (6;\ -5;\ -4)$.

Tekshirish: $(6, -5, -4)\cdot(1, 2, -1) = 6 - 10 + 4 = 0$ ✓. Parallelogramm yuzi $\sqrt{77}$.
:::

## 3.5. Tatbiqlar

**Yuza:**
:::misol
$|\mathbf a| = 2$, $|\mathbf b| = 3$, $\varphi = \frac\pi3$: $|\mathbf a \times \mathbf b| = 3\sqrt3$. $\mathbf p = 2\mathbf a + \mathbf b$, $\mathbf q = \mathbf a - 2\mathbf b$: $\mathbf p \times \mathbf q = -5\,\mathbf a \times \mathbf b$, demak $S = 15\sqrt3$.
:::

**Tekislikdagi uchburchak:** $S = \frac12\left|\begin{vmatrix} x_2 - x_1 & y_2 - y_1\\ x_3 - x_1 & y_3 - y_1\end{vmatrix}\right|$. Masalan, $A(0;\ -2)$, $B(-2;\ -1)$, $C(0;\ 3)$: $S = \frac12|-10| = 5$.

**Tekislik normali:** $\mathbf n = \overrightarrow{AB} \times \overrightarrow{AC}$ (8-mavzu).

**Nuqtadan to'g'ri chiziqqacha masofa (fazoda):** $d = \dfrac{|\overrightarrow{AM} \times \mathbf s|}{|\mathbf s|}$.

**Mexanika:** kuch momenti $\mathbf M = \overrightarrow{OA} \times \mathbf F$; chiziqli tezlik $\mathbf v = \boldsymbol\omega \times \mathbf r$; Lorens kuchi $\mathbf F = q\,\mathbf v \times \mathbf B$.

:::savol
$\mathbf a = (1;\ 0;\ 0)$, $\mathbf b = (0;\ 2;\ 0)$ ga qurilgan uchburchak yuzi?
- 2
+ 1
- 0
- 4
> $|\mathbf a \times \mathbf b| = |(0, 0, 2)| = 2$, $S = 1$.
:::

## 3.6. Qo'sh vektor ko'paytma

$$\mathbf a \times (\mathbf b \times \mathbf c) = \mathbf b(\mathbf a\cdot\mathbf c) - \mathbf c(\mathbf a\cdot\mathbf b)\quad(\text{«BAC − CAB»}).$$

:::tarix
Vektor ko'paytma kvaternionlarni ko'paytirishdan kelib chiqqan (U. Gamilton, 1843). Elektrodinamikada uni J. Maksvell keng qo'llagan.
:::
