# 2-mavzu. Vektorning o'qqa proyeksiyasi. Vektorlarning skalyar ko'paytmasi

**Bu mavzuda:** o'q, vektorning o'qqa proyeksiyasi va xossalari, yo'naltiruvchi kosinuslar, skalyar ko'paytma ta'rifi, xossalari, koordinatalardagi ifodasi va tatbiqlari.

## 2.1. Vektorning o'qqa proyeksiyasi

**O'q** — yo'nalishi tanlangan to'g'ri chiziq.

:::tarif
$\mathbf a$ vektorning $l$ o'qdagi **proyeksiyasi** — vektor boshi va oxiri proyeksiyalari orasidagi kesmaning ishorali uzunligi:
$$\text{pr}_l\,\mathbf a = |\mathbf a|\cos\varphi,$$
$\varphi$ — vektor va o'q orasidagi burchak.
:::

- $\varphi$ o'tkir — proyeksiya musbat; $\varphi = 90^\circ$ — nol; $\varphi$ o'tmas — manfiy.

:::xossa
$\text{pr}_l(\mathbf a + \mathbf b) = \text{pr}_l\mathbf a + \text{pr}_l\mathbf b$, $\quad\text{pr}_l(\lambda\mathbf a) = \lambda\,\text{pr}_l\mathbf a$.
:::

Vektorning Dekart koordinatalari — uning $Ox$, $Oy$, $Oz$ o'qlaridagi proyeksiyalari.

## 2.2. Yo'naltiruvchi kosinuslar

$\alpha, \beta, \gamma$ — $\mathbf a$ ning koordinata o'qlari bilan burchaklari:
$$\cos\alpha = \frac{a_x}{|\mathbf a|},\quad \cos\beta = \frac{a_y}{|\mathbf a|},\quad \cos\gamma = \frac{a_z}{|\mathbf a|},\qquad \cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1.$$

:::misol
$\mathbf a = (2;\ -1;\ 2)$: $|\mathbf a| = 3$, $\cos\alpha = \frac23$, $\cos\beta = -\frac13$, $\cos\gamma = \frac23$.
:::

## 2.3. Skalyar ko'paytma

:::tarif
$$\mathbf a\cdot\mathbf b = |\mathbf a|\,|\mathbf b|\cos\varphi = |\mathbf a|\,\text{pr}_{\mathbf a}\mathbf b.$$
Natija — **son**.
:::

:::xossa
1. $\mathbf a\cdot\mathbf b = \mathbf b\cdot\mathbf a$;
2. $(\lambda\mathbf a)\cdot\mathbf b = \lambda(\mathbf a\cdot\mathbf b)$;
3. $\mathbf a\cdot(\mathbf b + \mathbf c) = \mathbf a\cdot\mathbf b + \mathbf a\cdot\mathbf c$;
4. $\mathbf a\cdot\mathbf a = |\mathbf a|^2$;
5. $\mathbf a \perp \mathbf b \iff \mathbf a\cdot\mathbf b = 0$.
:::

Bu xossalar — 1-semestr 11-mavzudagi Yevklid fazosi aksiomalari: geometrik vektorlar fazosi — Yevklid fazosining asosiy namunasi.

## 2.4. Koordinatalarda

$\mathbf i\cdot\mathbf i = \mathbf j\cdot\mathbf j = \mathbf k\cdot\mathbf k = 1$, $\ \mathbf i\cdot\mathbf j = \mathbf j\cdot\mathbf k = \mathbf k\cdot\mathbf i = 0$, shuning uchun:
$$\mathbf a\cdot\mathbf b = a_xb_x + a_yb_y + a_zb_z.$$

:::misol
$(1;\ 2;\ 3)\cdot(4;\ -5;\ 6) = 4 - 10 + 18 = 12$.
:::

## 2.5. Tatbiqlar

**Burchak:**
$$\cos\varphi = \frac{a_xb_x + a_yb_y + a_zb_z}{\sqrt{a_x^2 + a_y^2 + a_z^2}\sqrt{b_x^2 + b_y^2 + b_z^2}}.$$

:::misol
Uchburchak $A(2;\ 3;\ 2)$, $B(-2;\ -1;\ 1)$, $C(1;\ 1;\ 1)$: $\overrightarrow{CA} = (1;\ 2;\ 1)$, $\overrightarrow{CB} = (-3;\ -2;\ 0)$, $\cos C = \frac{-7}{\sqrt6\sqrt{13}} = -\frac{7}{\sqrt{78}}$ — burchak o'tmas.
:::

**Proyeksiya:** $\text{pr}_{\mathbf b}\mathbf a = \dfrac{\mathbf a\cdot\mathbf b}{|\mathbf b|}$.

**Perpendikulyarlik:** $\mathbf a = (2;\ -1;\ 3) \perp \mathbf b = (1;\ k;\ -1) \iff 2 - k - 3 = 0 \iff k = -1$.

**Ish:** $\mathbf F$ kuch jismni $\mathbf s$ ga siljitganda $A = \mathbf F\cdot\mathbf s$. Masalan, $\mathbf F = (3;\ -2;\ 1)$, $\mathbf s = (2;\ 1;\ 3)$: $A = 6 - 2 + 3 = 7$.

**Kosinuslar teoremasi:** $|\mathbf a + \mathbf b|^2 = |\mathbf a|^2 + 2\,\mathbf a\cdot\mathbf b + |\mathbf b|^2$.

:::savol
$\mathbf a = (1;\ 2;\ -2)$ ning $\mathbf b = (2;\ 1;\ 2)$ dagi proyeksiyasi?
+ $0$
- $\frac83$
- $1$
- $-\frac23$
> $2 + 2 - 4 = 0$.
:::

:::savol
$|\mathbf a| = 3$, $|\mathbf b| = 4$, $\varphi = 60^\circ$. $(\mathbf a + \mathbf b)^2$ = ?
- 25
+ 37
- 49
- 13
:::

:::misol Rombning diagonallari
Romb tomonlari $\mathbf a$, $\mathbf b$, $|\mathbf a| = |\mathbf b|$. Diagonallar $\mathbf a + \mathbf b$ va $\mathbf a - \mathbf b$: $(\mathbf a + \mathbf b)\cdot(\mathbf a - \mathbf b) = |\mathbf a|^2 - |\mathbf b|^2 = 0$ — diagonallar perpendikulyar.
:::

> 💡 [Laboratoriya → 3D vektorlar](#/lab/fazo) da skalyar ko'paytma ishorasining burchakka bog'liqligini kuzating.

:::tarix
Skalyar ko'paytma Gamiltonning kvaternionlar ko'paytmasidan ajratib olingan; nomini J. Gibbs bergan.
:::
