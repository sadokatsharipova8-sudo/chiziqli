# 14-mavzu. Kvadratik formaning kanonik shakli

**Bu mavzuda:** kanonik va normal ko'rinish, Lagranj usuli, ortogonal almashtirish usuli, inersiya qonuni, musbat va manfiy aniqlangan formalar, Silvestr mezoni, Yakobi usuli.

## 14.1. Kanonik ko'rinish

:::tarif
Faqat kvadratlardan iborat ko'rinish
$$f = \lambda_1y_1^2 + \lambda_2y_2^2 + \dots + \lambda_ny_n^2$$
— **kanonik ko'rinish**. Koeffitsiyentlar faqat $+1, -1, 0$ — **normal ko'rinish**.
:::

Matritsa tilida: shunday xosmas $T$ topish kerakki, $T^TAT$ — diagonal.

## 14.2. Lagranj usuli

:::teorema Lagranj
Har qanday kvadratik formani xosmas chiziqli almashtirish bilan kanonik ko'rinishga keltirish mumkin.
:::

**Usul** — to'liq kvadratlarni ketma-ket ajratish. Kvadratlar bo'lmasa, avval $x_1 = t_1 + t_2$, $x_2 = t_1 - t_2$.

:::misol
$f = x^2 + 4xy + 3y^2 = (x + 2y)^2 - y^2 = y_1^2 - y_2^2$.
:::

:::misol
$f = 2x_1x_2 - 6x_2x_3 + 2x_3x_1$. $x_1 = t_1 + t_2$, $x_2 = t_1 - t_2$, $x_3 = t_3$:
$$f = 2t_1^2 - 2t_2^2 - 4t_1t_3 + 8t_2t_3 = 2(t_1 - t_3)^2 - 2(t_2 - 2t_3)^2 + 6t_3^2.$$
$f = 2y_1^2 - 2y_2^2 + 6y_3^2$.
:::

## 14.3. Ortogonal almashtirish usuli

:::teorema
Har qanday haqiqiy kvadratik formani ortogonal almashtirish bilan
$$f = \lambda_1y_1^2 + \dots + \lambda_ny_n^2$$
ko'rinishga keltirish mumkin; $\lambda_i$ — $A$ ning xos sonlari, yangi o'qlar — ortonormal xos vektorlar (18-mavzu).
:::

:::misol
$f = 5x^2 + 4xy + 8y^2$: $\lambda^2 - 13\lambda + 36 = 0$, $\lambda_1 = 4$, $\lambda_2 = 9$. $f = 4x'^2 + 9y'^2$; o'qlar $(2, -1)/\sqrt5$ va $(1, 2)/\sqrt5$.
:::

Afzalligi: uzunlik va burchaklar saqlanadi — ikkinchi tartibli chiziq va sirtlar geometriyasi uchun zarur.

## 14.4. Inersiya qonuni

Kanonik ko'rinish yagona emas, ammo:

:::teorema Silvestr inersiya qonuni
Musbat koeffitsiyentlar soni $p$ va manfiylar soni $q$ almashtirish usulidan qat'i nazar o'zgarmaydi; $p + q = r$ — forma rangi.
:::

Misol: $2y_1^2 - 2y_2^2 + 6y_3^2$ da $p = 2$, $q = 1$.

## 14.5. Aniqlanganlik

:::tarif
$\mathbf x \ne \mathbf 0$ da $f(\mathbf x) > 0$ — **musbat aniqlangan**, $f(\mathbf x) < 0$ — **manfiy aniqlangan**; turli ishorali qiymatlar — **aniqlanmagan**.
:::

Burchak minorlari: $\Delta_1 = a_{11}$, $\Delta_2 = \begin{vmatrix} a_{11} & a_{12}\\ a_{21} & a_{22}\end{vmatrix}$, …, $\Delta_n = \det A$.

:::teorema Silvestr mezoni
1. Musbat aniqlangan $\iff \Delta_1 > 0, \Delta_2 > 0, \dots, \Delta_n > 0$.
2. Manfiy aniqlangan $\iff \Delta_1 < 0, \Delta_2 > 0, \Delta_3 < 0, \dots$
:::

:::misol
$f = 2x_1^2 + 2x_2^2 + 2x_3^2 + 2x_1x_2 + 2x_2x_3$: $\Delta_1 = 2$, $\Delta_2 = 3$, $\Delta_3 = 4$ — musbat aniqlangan.
:::

:::savol
$f = -x^2 + 2xy - 3y^2$ qanday forma?
- Musbat aniqlangan
+ Manfiy aniqlangan
- Aniqlanmagan
- Aynigan
> $\Delta_1 = -1 < 0$, $\Delta_2 = 2 > 0$.
:::

## 14.6. Yakobi usuli

Barcha $\Delta_k \ne 0$ bo'lsa ($\Delta_0 = 1$):
$$f = \frac{\Delta_1}{\Delta_0}y_1^2 + \frac{\Delta_2}{\Delta_1}y_2^2 + \dots + \frac{\Delta_n}{\Delta_{n-1}}y_n^2.$$

Yuqoridagi misolda: $f = 2y_1^2 + \frac32y_2^2 + \frac43y_3^2$.

## 14.7. Tatbiq: ekstremum

$f(x, y)$ ning statsionar nuqtasida $d^2f$ kvadratik forma (Gesse matritsasi):
- musbat aniqlangan — **minimum**; manfiy aniqlangan — **maksimum**; aniqlanmagan — ekstremum yo'q (egar).

:::savol
Kanonik ko'rinishi $3y_1^2 - y_2^2 + 0\cdot y_3^2$ bo'lgan forma rangi?
- 3
+ 2
- 1
- 0
:::

:::tarix
J. Silvestr (1814–1897) inersiya qonunini 1852-yilda isbotlagan.
:::
