# 9. Yevklid fazosi. Gram–Shmidt ortogonallashtirish jarayoni

**Bu mavzuda:** skalyar ko'paytma aksiomalari, vektor uzunligi va vektorlar orasidagi burchak, Koshi–Bunyakovskiy tengsizligi, ortogonal va ortonormal bazislar, Gram–Shmidt jarayoni, ortogonal to'ldiruvchi, kompleks Yevklid (unitar) fazo.

## 9.1. Skalyar ko'paytma

:::tarif
Haqiqiy chiziqli fazo $V$ da har bir $\mathbf x, \mathbf y$ juftga $(\mathbf x, \mathbf y)$ son mos qo'yilgan bo'lib, quyidagilar bajarilsa, $V$ **Yevklid fazosi** deyiladi:
1. $(\mathbf x, \mathbf y) = (\mathbf y, \mathbf x)$;
2. $(\mathbf x + \mathbf y, \mathbf z) = (\mathbf x, \mathbf z) + (\mathbf y, \mathbf z)$;
3. $(\lambda\mathbf x, \mathbf y) = \lambda(\mathbf x, \mathbf y)$;
4. $(\mathbf x, \mathbf x) > 0$, agar $\mathbf x \ne \mathbf 0$.
:::

**Misollar:**
- $\mathbb R^n$ da: $(\mathbf x, \mathbf y) = x_1y_1 + x_2y_2 + \dots + x_ny_n$ (standart skalyar ko'paytma);
- $C[a, b]$ da: $(f, g) = \displaystyle\int_a^b f(t)g(t)\,dt$.

:::tarif
$|\mathbf x| = \sqrt{(\mathbf x, \mathbf x)}$ — vektor **uzunligi** (normasi). $|\mathbf x| = 1$ bo'lsa vektor **normallangan**. $\dfrac{\mathbf x}{|\mathbf x|}$ — $\mathbf x$ ni normallash.
:::

## 9.2. Koshi–Bunyakovskiy tengsizligi

:::teorema Koshi–Bunyakovskiy tengsizligi
$$|(\mathbf x, \mathbf y)| \le |\mathbf x|\cdot|\mathbf y|,$$
tenglik faqat $\mathbf x$ va $\mathbf y$ chiziqli bog'liq bo'lganda bajariladi.
:::

Isbot g'oyasi: $(\mathbf x - t\mathbf y, \mathbf x - t\mathbf y) \ge 0$ — $t$ ga nisbatan kvadrat uchhad har doim nomanfiy, demak uning diskriminanti $\le 0$.

Natijalar:
- **burchak** aniqlanadi: $\cos\varphi = \dfrac{(\mathbf x, \mathbf y)}{|\mathbf x||\mathbf y|}$;
- **uchburchak tengsizligi**: $|\mathbf x + \mathbf y| \le |\mathbf x| + |\mathbf y|$.

:::tarif
$(\mathbf x, \mathbf y) = 0$ bo'lsa, vektorlar **ortogonal** deyiladi: $\mathbf x \perp \mathbf y$.
:::

:::savol
$\mathbb R^4$ da $\mathbf x = (1, 2, -1, 3)$ va $\mathbf y = (2, 1, a, 0)$ qaysi $a$ da ortogonal?
- $a = -4$
+ $a = 4$
- $a = 0$
- $a = 2$
> $2 + 2 - a = 0$.
:::

## 9.3. Ortogonal va ortonormal bazis

:::teorema
Noldan farqli o'zaro ortogonal vektorlar sistemasi chiziqli erkli.
:::

:::tarif
O'zaro ortogonal vektorlardan iborat bazis — **ortogonal**, qo'shimcha ravishda har bir vektor normallangan bo'lsa — **ortonormal** bazis: $(\mathbf e_i, \mathbf e_j) = \delta_{ij}$.
:::

Ortonormal bazisda hisoblash juda oson:
$$(\mathbf x, \mathbf y) = \sum x_iy_i,\qquad x_i = (\mathbf x, \mathbf e_i)\ \ (\textbf{Furye koeffitsiyentlari}).$$

## 9.4. Gram–Shmidt jarayoni

:::teorema
Har qanday chiziqli erkli $\mathbf a_1, \dots, \mathbf a_k$ sistemadan bir xil chiziqli qobiqqa ega ortogonal sistema qurish mumkin:
$$\mathbf b_1 = \mathbf a_1,$$
$$\mathbf b_2 = \mathbf a_2 - \frac{(\mathbf a_2, \mathbf b_1)}{(\mathbf b_1, \mathbf b_1)}\mathbf b_1,$$
$$\mathbf b_3 = \mathbf a_3 - \frac{(\mathbf a_3, \mathbf b_1)}{(\mathbf b_1, \mathbf b_1)}\mathbf b_1 - \frac{(\mathbf a_3, \mathbf b_2)}{(\mathbf b_2, \mathbf b_2)}\mathbf b_2,\ \dots$$
So'ng $\mathbf e_i = \mathbf b_i / |\mathbf b_i|$ — ortonormal sistema.
:::

Har bir qadamda $\mathbf a_k$ dan uning oldingi $\mathbf b$ lar bo'yicha **proyeksiyalarini** ayiramiz — qolgan qism ularning barchasiga perpendikulyar.

:::misol
$\mathbf a_1 = (1, 1, 0)$, $\mathbf a_2 = (2, 0, -1)$, $\mathbf a_3 = (1, -1, 1)$.

$\mathbf b_1 = (1, 1, 0)$, $(\mathbf b_1, \mathbf b_1) = 2$.

$(\mathbf a_2, \mathbf b_1) = 2$: $\ \mathbf b_2 = (2, 0, -1) - 1\cdot(1, 1, 0) = (1, -1, -1)$, $(\mathbf b_2, \mathbf b_2) = 3$.

$(\mathbf a_3, \mathbf b_1) = 0$, $(\mathbf a_3, \mathbf b_2) = 1 + 1 - 1 = 1$: $\ \mathbf b_3 = (1, -1, 1) - \frac13(1, -1, -1) = \left(\frac23, -\frac23, \frac43\right)$, yoki qulaylik uchun $\mathbf b_3' = (1, -1, 2)$.

Tekshirish: $(\mathbf b_1, \mathbf b_2) = 0$, $(\mathbf b_1, \mathbf b_3') = 0$, $(\mathbf b_2, \mathbf b_3') = 1 + 1 - 2 = 0$ ✓.

Ortonormal bazis:
$$\mathbf e_1 = \tfrac{1}{\sqrt2}(1, 1, 0),\quad \mathbf e_2 = \tfrac{1}{\sqrt3}(1, -1, -1),\quad \mathbf e_3 = \tfrac{1}{\sqrt6}(1, -1, 2).$$
:::

:::savol
Gram–Shmidt jarayonida $\mathbf a_1 = (1, 0)$, $\mathbf a_2 = (3, 4)$ bo'lsa, $\mathbf b_2$ nimaga teng?
- $(3, 4)$
+ $(0, 4)$
- $(3, 0)$
- $(0, 1)$
> $\mathbf b_2 = (3, 4) - 3(1, 0)$.
:::

## 9.5. Ortogonal to'ldiruvchi

:::tarif
$L$ qism fazoning har bir vektoriga ortogonal vektorlar to'plami $L^\perp$ — **ortogonal to'ldiruvchi**.
:::

:::teorema
$V = L \oplus L^\perp$, ya'ni har bir $\mathbf x$ yagona usulda $\mathbf x = \mathbf x_L + \mathbf x_\perp$ ko'rinishda yoziladi ($\mathbf x_L$ — $L$ ga **ortogonal proyeksiya**), va $\dim L + \dim L^\perp = \dim V$.
:::

$\mathbf x_\perp$ ning uzunligi — $\mathbf x$ dan $L$ gacha bo'lgan **masofa**; $\mathbf x_L$ — $L$ dagi $\mathbf x$ ga eng yaqin vektor (eng kichik kvadratlar usulining asosi).

## 9.6. Kompleks Yevklid (unitar) fazo

Kompleks fazoda simmetriklik aksiomasi o'rniga $(\mathbf x, \mathbf y) = \overline{(\mathbf y, \mathbf x)}$ talab qilinadi. $\mathbb C^n$ da standart skalyar ko'paytma:
$$(\mathbf x, \mathbf y) = x_1\bar y_1 + \dots + x_n\bar y_n,$$
shu tufayli $(\mathbf x, \mathbf x) = \sum|x_i|^2 \ge 0$.

:::savol
$\mathbb R^3$ da 1-o'lchovli $L$ qism fazoning ortogonal to'ldiruvchisi qanday o'lchovli?
- 1
+ 2
- 3
- 0
> $3 - 1 = 2$ — to'g'ri chiziqqa perpendikulyar tekislik.
:::

:::tarix
V. Ya. Bunyakovskiy (1804–1889) tengsizlikni integrallar uchun 1859-yilda isbotlagan. Ortogonallashtirish jarayonini J. Gram (1883) va E. Shmidt (1907) taklif qilgan.
:::
