# 18. Ikkinchi tartibli sirtlar

**Bu mavzuda:** sfera, ellipsoid, bir va ikki pallali giperboloidlar, konus, elliptik va giperbolik paraboloidlar, silindrlar; kesimlar usuli; to'g'ri chiziqli yasovchilar; umumiy tenglamani kanonik ko'rinishga keltirish.

## 18.1. Umumiy tenglama

$$a_{11}x^2 + a_{22}y^2 + a_{33}z^2 + 2a_{12}xy + 2a_{13}xz + 2a_{23}yz + 2a_{14}x + 2a_{24}y + 2a_{34}z + a_{44} = 0.$$

Bosh qism — uch o'zgaruvchili kvadratik forma. Uni 10–11-mavzulardagi kabi ortogonal almashtirish bilan $\lambda_1x'^2 + \lambda_2y'^2 + \lambda_3z'^2$ ga keltirib, so'ng to'liq kvadratlar ajratsak, quyidagi kanonik ko'rinishlardan biri hosil bo'ladi.

**Kesimlar usuli:** sirt shaklini koordinata tekisliklariga parallel tekisliklar bilan kesib, hosil bo'lgan chiziqlar (17-mavzu) orqali o'rganamiz.

## 18.2. Sfera va ellipsoid

$$(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2\qquad\text{— sfera.}$$

:::misol
$x^2 + y^2 + z^2 - 2x + 4y - 6z - 2 = 0$: $(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 1 + 4 + 9 + 2 = 16$. Markaz $(1;\ -2;\ 3)$, $R = 4$.
:::

:::tarif Ellipsoid
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1.$$
Barcha kesimlari — ellipslar. $a = b$ bo'lsa — aylanma ellipsoid, $a = b = c$ — sfera.
:::

## 18.3. Giperboloidlar va konus

:::tarif Bir pallali giperboloid
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 1.$$
$z = h$ kesimlari — ellipslar (eng kichigi — «bo'yin» ellipsi $z = 0$ da), $x = 0$ va $y = 0$ kesimlari — giperbolalar.
:::

:::tarif Ikki pallali giperboloid
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = -1.$$
$|z| < c$ da sirt nuqtalari yo'q — ikki alohida «palla»dan iborat.
:::

:::tarif Ikkinchi tartibli konus
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 0.$$
Uchi koordinata boshida; ikkala giperboloidning **asimptotik konusi**. Uning tekislik bilan kesimlari — ellips, giperbola, parabola yoki to'g'ri chiziqlar juftligi (konus kesimlari).
:::

:::savol
$x^2 + y^2 - z^2 = 4$ sirti nima?
+ Bir pallali giperboloid
- Ikki pallali giperboloid
- Konus
- Sfera
:::

## 18.4. Paraboloidlar

:::tarif Elliptik paraboloid
$$\frac{x^2}{p} + \frac{y^2}{q} = 2z\qquad(p, q > 0).$$
$z = h > 0$ kesimlari — ellipslar, $x = 0$ va $y = 0$ kesimlari — parabolalar. «Kosa» shaklida; parabolik antennalar shunday sirtdir.
:::

:::tarif Giperbolik paraboloid
$$\frac{x^2}{p} - \frac{y^2}{q} = 2z\qquad(p, q > 0).$$
$z = h$ kesimlari — giperbolalar, $x = 0$ va $y = 0$ kesimlari — qarama-qarshi tomonga ochilgan parabolalar. «Egar» shaklidagi sirt.
:::

:::misol
$z = 2xy$ sirti: o'qlarni $Oz$ atrofida $45^\circ$ ga burib ($x = \frac{x' - y'}{\sqrt2}$, $y = \frac{x' + y'}{\sqrt2}$) $z = x'^2 - y'^2$ ni olamiz — giperbolik paraboloid.
:::

## 18.5. Silindrlar

Tenglamada bitta o'zgaruvchi (masalan $z$) qatnashmasa, sirt yasovchilari $Oz$ ga parallel **silindr** bo'ladi; uning yo'naltiruvchisi — $Oxy$ tekislikdagi chiziq:
- $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ — elliptik silindr;
- $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$ — giperbolik silindr;
- $y^2 = 2px$ — parabolik silindr.

:::savol
Fazoda $y^2 = 4x$ tenglama nimani ifodalaydi?
- Parabola
+ Parabolik silindr
- Elliptik paraboloid
- Konus
> $z$ qatnashmaydi — har bir $z$ da bir xil parabola.
:::

## 18.6. To'g'ri chiziqli yasovchilar

:::teorema
Bir pallali giperboloid va giperbolik paraboloid **ikki oila to'g'ri chiziqli yasovchilarga** ega: sirtning har bir nuqtasidan unda butunlay yotuvchi ikkita to'g'ri chiziq o'tadi.
:::

Masalan, bir pallali giperboloid uchun:
$$\left(\frac{x}{a} - \frac{z}{c}\right)\left(\frac{x}{a} + \frac{z}{c}\right) = \left(1 - \frac{y}{b}\right)\left(1 + \frac{y}{b}\right)$$
dan $\dfrac{x}{a} - \dfrac{z}{c} = k\left(1 - \dfrac{y}{b}\right)$, $\ k\left(\dfrac{x}{a} + \dfrac{z}{c}\right) = 1 + \dfrac{y}{b}$ — har bir $k$ uchun to'g'ri chiziq.

Muhandislikda bu juda qulay: egri sirt to'g'ri balkalardan quriladi. Mashhur misol — V. G. Shuxov loyihalagan **Shabolovka teleminorasi** (Moskva, 1922) va boshqa giperboloid minoralar, shuningdek atom elektr stansiyalarining sovitish minoralari.

## 18.7. Tasnif (qisqacha)

| Kanonik tenglama | Sirt |
|---|---|
| $\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1$ | ellipsoid |
| $\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 1$ | bir pallali giperboloid |
| $\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = -1$ | ikki pallali giperboloid |
| $\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 0$ | konus |
| $\frac{x^2}{p} + \frac{y^2}{q} = 2z$ | elliptik paraboloid |
| $\frac{x^2}{p} - \frac{y^2}{q} = 2z$ | giperbolik paraboloid |
| $F(x, y) = 0$ | silindr |

**Amaliy qoida:** bosh qism matritsasining xos sonlari ishoralari sirt turini aniqlaydi: hammasi bir ishorali — ellipsoid tipidagi; turli ishorali — giperboloid yoki konus; bittasi nol — paraboloid yoki silindr.

:::savol
$x^2 + 4y^2 = 2z$ sirti nima?
- Ellipsoid
+ Elliptik paraboloid
- Giperbolik paraboloid
- Elliptik silindr
:::

:::savol
$x^2 - y^2 - z^2 = 1$ sirti nima?
- Bir pallali giperboloid
+ Ikki pallali giperboloid
- Konus
- Giperbolik silindr
> $-x^2 + y^2 + z^2 = -1$ ko'rinishida yozsak, $Ox$ o'qi bo'ylab joylashgan ikki pallali giperboloid.
:::

:::tarix
Ikkinchi tartibli sirtlarning to'liq tasnifini L. Eyler (1748) bergan. V. G. Shuxov (1853–1939) giperboloid konstruksiyalarni 1896-yilda patentlagan.
:::
