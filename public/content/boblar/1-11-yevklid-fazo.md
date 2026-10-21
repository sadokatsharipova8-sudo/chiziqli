# 11-mavzu. Yevklid fazosi. Ortogonal va ortonormal sistemalar

**Bu mavzuda:** skalyar ko'paytma aksiomalari, uzunlik, Koshi–Bunyakovskiy tengsizligi, burchak, ortogonallik, ortogonal sistemaning chiziqli erkliligi, ortonormal bazis va Furye koeffitsiyentlari.

## 11.1. Skalyar ko'paytma

:::tarif
Haqiqiy chiziqli fazo $V$ da har bir $\mathbf x, \mathbf y$ juftga $(\mathbf x, \mathbf y) \in \mathbb R$ mos qo'yilgan bo'lib:
1. $(\mathbf x, \mathbf y) = (\mathbf y, \mathbf x)$;
2. $(\mathbf x + \mathbf y, \mathbf z) = (\mathbf x, \mathbf z) + (\mathbf y, \mathbf z)$;
3. $(\lambda\mathbf x, \mathbf y) = \lambda(\mathbf x, \mathbf y)$;
4. $(\mathbf x, \mathbf x) > 0$, agar $\mathbf x \ne \mathbf 0$,

bo'lsa, $V$ **Yevklid fazosi** deyiladi.
:::

**Misollar:**
- $\mathbb R^n$: $(\mathbf x, \mathbf y) = x_1y_1 + \dots + x_ny_n$ (standart);
- $\mathbb R^2$: $(\mathbf x, \mathbf y) = 2x_1y_1 + 3x_2y_2$ — ham skalyar ko'paytma;
- $C[a, b]$: $(f, g) = \int_a^b f(t)g(t)\,dt$;
- matritsalar: $(A, B) = \operatorname{tr}(A^TB)$.

## 11.2. Uzunlik. Koshi–Bunyakovskiy tengsizligi

:::tarif
$|\mathbf x| = \sqrt{(\mathbf x, \mathbf x)}$ — **uzunlik** (norma). $|\mathbf x| = 1$ — normallangan vektor; $\mathbf x^0 = \mathbf x/|\mathbf x|$.
:::

:::teorema Koshi–Bunyakovskiy
$$|(\mathbf x, \mathbf y)| \le |\mathbf x|\,|\mathbf y|,$$
tenglik faqat $\mathbf x$, $\mathbf y$ chiziqli bog'liq bo'lganda.
:::

Isbot: $(\mathbf x - t\mathbf y, \mathbf x - t\mathbf y) \ge 0$ — $t$ ga nisbatan nomanfiy kvadrat uchhad, diskriminanti $\le 0$.

**Natijalar:**
- burchak: $\cos\varphi = \dfrac{(\mathbf x, \mathbf y)}{|\mathbf x||\mathbf y|}$;
- uchburchak tengsizligi: $|\mathbf x + \mathbf y| \le |\mathbf x| + |\mathbf y|$.

:::misol
$\mathbb R^4$: $\mathbf x = (1, 1, 1, 1)$, $\mathbf y = (1, 0, 0, 1)$: $\cos\varphi = \frac{2}{2\sqrt2} = \frac{1}{\sqrt2}$, $\varphi = 45^\circ$.
:::

## 11.3. Ortogonallik

:::tarif
$(\mathbf x, \mathbf y) = 0$ — vektorlar **ortogonal**. Vektorlar sistemasi **ortogonal**, agar uning har ikki vektori ortogonal bo'lsa; qo'shimcha ravishda barcha vektorlar normallangan bo'lsa — **ortonormal**: $(\mathbf e_i, \mathbf e_j) = \delta_{ij}$.
:::

**Pifagor teoremasi:** $\mathbf x \perp \mathbf y \Rightarrow |\mathbf x + \mathbf y|^2 = |\mathbf x|^2 + |\mathbf y|^2$.

:::teorema
Noldan farqli vektorlardan iborat ortogonal sistema chiziqli erkli.
:::

Isbot: $\sum\lambda_i\mathbf e_i = \mathbf 0$ ni $\mathbf e_k$ ga skalyar ko'paytirsak, $\lambda_k(\mathbf e_k, \mathbf e_k) = 0 \Rightarrow \lambda_k = 0$.

:::savol
$\mathbf x = (1, 2, -1, 3)$, $\mathbf y = (2, 1, a, 0)$ qaysi $a$ da ortogonal?
- $a = -4$
+ $a = 4$
- $a = 0$
- $a = 2$
:::

## 11.4. Ortonormal bazis

Ortonormal bazisda hisoblash juda oson:
- $(\mathbf x, \mathbf y) = x_1y_1 + \dots + x_ny_n$, $\ |\mathbf x|^2 = \sum x_i^2$;
- koordinatalar: $x_i = (\mathbf x, \mathbf e_i)$ — **Furye koeffitsiyentlari**;
- $\mathbf x = \sum_i (\mathbf x, \mathbf e_i)\mathbf e_i$.

:::misol
$\mathbf e_1 = \frac{1}{\sqrt2}(1, 1)$, $\mathbf e_2 = \frac{1}{\sqrt2}(1, -1)$ — ortonormal bazis. $\mathbf x = (5, 1)$: $x_1 = \frac{6}{\sqrt2} = 3\sqrt2$, $x_2 = \frac{4}{\sqrt2} = 2\sqrt2$. Sistema yechish shart emas!
:::

:::misol Ortogonal sistema funksiyalarda
$C[-\pi, \pi]$ da $1, \cos t, \sin t, \cos 2t, \sin 2t, \dots$ — ortogonal sistema: masalan, $\int_{-\pi}^{\pi}\sin t\cos t\,dt = 0$. Bu Furye qatorlari nazariyasining asosi.
:::

**Bessel tengsizligi:** ortonormal $\mathbf e_1, \dots, \mathbf e_k$ uchun $\sum_{i=1}^k (\mathbf x, \mathbf e_i)^2 \le |\mathbf x|^2$.

:::savol
Ortonormal bazisda $\mathbf x$ ning $i$-koordinatasi nimaga teng?
- $|\mathbf x|$
+ $(\mathbf x, \mathbf e_i)$
- $|\mathbf e_i|$
- 1
:::

:::tarix
V. Ya. Bunyakovskiy (1804–1889) tengsizlikni integrallar uchun 1859-yilda isbotlagan; yig'indilar uchun uni O. Koshi (1821) bergan.
:::
