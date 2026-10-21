# 13-mavzu. Ikkinchi tartibli chiziq va to'g'ri chiziqning o'zaro vaziyati

**Bu mavzuda:** to'g'ri chiziqni chiziq tenglamasiga qo'yish, kesishish nuqtalari soni, asimptotik yo'nalishlar, urinma, urinma tenglamasi, diametr tushunchasi.

## 13.1. Kesishishni tekshirish

To'g'ri chiziq $x = x_0 + lt$, $y = y_0 + mt$ ni $F(x, y) = 0$ ga qo'yamiz:
$$\varphi(l, m)\,t^2 + 2\big(F_1 l + F_2 m\big)t + F(x_0, y_0) = 0,$$
bunda $\varphi(l, m) = a_{11}l^2 + 2a_{12}lm + a_{22}m^2$, $F_1 = a_{11}x_0 + a_{12}y_0 + a_{13}$, $F_2 = a_{12}x_0 + a_{22}y_0 + a_{23}$.

**1-hol: $\varphi(l, m) \ne 0$** — kvadrat tenglama:
- $D > 0$ — ikki kesishish nuqtasi (**kesuvchi**);
- $D = 0$ — bitta ikki karrali nuqta (**urinma**);
- $D < 0$ — umumiy nuqta yo'q.

**2-hol: $\varphi(l, m) = 0$** — tenglama chiziqli: ko'pi bilan bitta nuqta (yoki to'g'ri chiziq butunlay chiziqda yotadi, yoki umumiy nuqta yo'q). Bunday $(l:m)$ — **asimptotik yo'nalish**.

## 13.2. Asimptotik yo'nalishlar

$\varphi(l, m) = 0$ ning yechimlari soni $\delta$ ga bog'liq:

| Chiziq | $\delta$ | Asimptotik yo'nalishlar |
|---|---|---|
| ellips | $> 0$ | yo'q |
| giperbola | $< 0$ | ikkita — asimptotalarga parallel |
| parabola | $= 0$ | bitta — o'qqa parallel |

:::misol
Parabola $y^2 = 4x$ ga $Ox$ ga parallel istalgan to'g'ri chiziq ($m = 0$) faqat bitta nuqtada kesadi: $y = c$ $\Rightarrow$ $x = \frac{c^2}{4}$. Giperbolaning asimptotalariga parallel to'g'ri chiziqlar ham bittadan ortiq nuqtada kesmaydi.
:::

## 13.3. Kesishish nuqtalarini topish

Amalda: to'g'ri chiziqdan bir o'zgaruvchini ifodalab, chiziq tenglamasiga qo'yamiz.

:::misol
$x^2 + y^2 = 100$ va $2x + y + 10 = 0$: $y = -2x - 10$,
$$x^2 + (2x + 10)^2 = 100 \Rightarrow 5x^2 + 40x = 0 \Rightarrow x_1 = -8,\ x_2 = 0.$$
Nuqtalar $(-8;\ 6)$, $(0;\ -10)$.
:::

:::misol
$\dfrac{x^2}{4} + y^2 = 1$ va $y = x + m$: $x^2 + 4(x + m)^2 = 4 \Rightarrow 5x^2 + 8mx + 4m^2 - 4 = 0$, $\ \frac D4 = 16m^2 - 5(4m^2 - 4) = 20 - 4m^2$.

$|m| < \sqrt5$ — ikki nuqta; $m = \pm\sqrt5$ — urinadi; $|m| > \sqrt5$ — kesishmaydi.
:::

:::savol
To'g'ri chiziq va ellips tenglamalaridan hosil bo'lgan kvadrat tenglamaning diskriminanti nolga teng. Bu nimani bildiradi?
- Kesishmaydi
+ To'g'ri chiziq urinma
- Ikki nuqtada kesishadi
- Chiziq ellipsda yotadi
:::

## 13.4. Urinma

:::teorema
Chiziqdagi $M_0(x_0;\ y_0)$ nuqtadagi urinma (agar $M_0$ markaz yoki maxsus nuqta bo'lmasa):
$$F_1(x - x_0) + F_2(y - y_0) = 0,$$
ya'ni normal vektor $(F_1;\ F_2) = \frac12\nabla F$.
:::

Kanonik chiziqlar uchun («ikkilantirish» qoidasi: $x^2 \to xx_0$, $y \to \frac{y + y_0}{2}$):
$$\frac{xx_0}{a^2} + \frac{yy_0}{b^2} = 1\ (\text{ellips}),\qquad \frac{xx_0}{a^2} - \frac{yy_0}{b^2} = 1\ (\text{giperbola}),\qquad yy_0 = p(x + x_0)\ (\text{parabola}).$$

:::misol
$x^2 + y^2 = 25$ ga $(3;\ 4)$ nuqtadagi urinma: $3x + 4y = 25$. Tekshirish: markazdan masofa $\frac{25}{5} = 5 = R$ ✓.
:::

:::savol
$\frac{x^2}{8} + \frac{y^2}{2} = 1$ ga $(2;\ 1)$ nuqtadagi urinma?
+ $x + 2y = 4$
- $2x + y = 4$
- $x + y = 3$
- $x - 2y = 0$
> $\frac{2x}{8} + \frac{y}{2} = 1$.
:::

## 13.5. Diametr

Berilgan yo'nalishdagi parallel vatarlar o'rtalari bitta to'g'ri chiziqda yotadi — bu chiziqning shu yo'nalishga **qo'shma diametri**. Markaziy chiziqlarda barcha diametrlar markazdan o'tadi; parabolada — o'qqa parallel.

**Tatbiqlar:** optikada nurning ko'zgudan qaytishi (urinma va normal), kompyuter grafikasida egri chiziq va to'g'ri chiziq kesishishi, sun'iy yo'ldoshning Yer soyasiga kirish-chiqish nuqtalari.

:::tarix
Urinmalarni topishning umumiy usullarini P. Ferma va R. Dekart XVII asrda ishlab chiqqan — bu differensial hisobning boshlanishi bo'lgan.
:::
