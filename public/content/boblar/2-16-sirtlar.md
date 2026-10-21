# 16-mavzu. Ikkinchi tartibli sirtlarning kanonik tenglamalari

**Bu mavzuda:** kesimlar usuli, sfera, ellipsoid, bir va ikki pallali giperboloidlar, konus, elliptik va giperbolik paraboloidlar, silindrlar, tasnif jadvali.

## 16.1. Kesimlar usuli

Sirt shaklini uni koordinata tekisliklariga parallel tekisliklar ($z = h$, $x = 0$, $y = 0$) bilan kesib, hosil bo'lgan chiziqlar orqali o'rganamiz. Har bir kesim — ikkinchi tartibli chiziq.

## 16.2. Sfera va ellipsoid

$$(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2\quad\text{— sfera}.$$

:::tarif Ellipsoid
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1.$$
:::

Kesimlar $z = h$: $|h| < c$ — ellipslar, $h$ o'sgan sari kichrayadi; $|h| = c$ — nuqta; $|h| > c$ — bo'sh. $a = b$ — aylanma ellipsoid; $a = b = c$ — sfera.

:::misol
$32x^2 + 8y^2 + 128z^2 = 128$: $\frac{x^2}{4} + \frac{y^2}{16} + \frac{z^2}{1} = 1$, $a = 2$, $b = 4$, $c = 1$.
:::

## 16.3. Giperboloidlar

:::tarif Bir pallali giperboloid
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 1.$$
:::
$z = h$ — ellipslar (eng kichigi $z = 0$ da — bo'yin ellipsi); $x = 0$, $y = 0$ — giperbolalar. Shakli — «g'altak».

:::tarif Ikki pallali giperboloid
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = -1.$$
:::
$|z| < c$ da nuqtalar yo'q — ikki alohida palla; $|z| > c$ — ellipslar.

**Qoida** (o'ng tomon 1): bitta minus — bir pallali, ikkita minus — ikki pallali; minus ishorali o'zgaruvchi — o'q.

:::savol
$x^2 - y^2 - z^2 = 1$ sirti?
- Bir pallali giperboloid
+ Ikki pallali giperboloid
- Konus
- Giperbolik silindr
:::

## 16.4. Konus

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 0.$$
Uchi — $O$; $z = h$ — ellipslar, $h$ ga proporsional. Ikkala giperboloidning **asimptotik konusi**. Konusni tekislik bilan kesish — konus kesimlari.

## 16.5. Paraboloidlar

:::tarif Elliptik paraboloid
$$\frac{x^2}{p} + \frac{y^2}{q} = 2z\quad(p, q > 0).$$
:::
$z = h > 0$ — ellipslar; $x = 0$, $y = 0$ — parabolalar. «Kosa». Parabolik antenna, aylanayotgan idishdagi suyuqlik sirti.

:::tarif Giperbolik paraboloid
$$\frac{x^2}{p} - \frac{y^2}{q} = 2z\quad(p, q > 0).$$
:::
$z = h$ — giperbolalar ($h = 0$ da — kesishuvchi to'g'ri chiziqlar); $y = 0$ — yuqoriga, $x = 0$ — pastga ochilgan parabolalar. «Egar». Pringles chipsi, ko'p zamonaviy tomlar.

:::misol
$z = 2xy$: $Oz$ atrofida $45^\circ$ burilsa $z = X^2 - Y^2$ — giperbolik paraboloid.
:::

## 16.6. Silindrlar

Bitta o'zgaruvchi qatnashmasa — yasovchilari shu o'qqa parallel silindr:
- $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ — elliptik; $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ — giperbolik; $y^2 = 2px$ — parabolik silindr.

:::savol
Fazoda $x^2 + y^2 = 4$ tenglama?
- Aylana
- Sfera
+ Doiraviy silindr
- Konus
:::

## 16.7. Tasnif jadvali

| Kanonik tenglama | Sirt |
|---|---|
| $\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1$ | ellipsoid |
| $\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 1$ | bir pallali giperboloid |
| $\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = -1$ | ikki pallali giperboloid |
| $\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 0$ | konus |
| $\frac{x^2}{p} + \frac{y^2}{q} = 2z$ | elliptik paraboloid |
| $\frac{x^2}{p} - \frac{y^2}{q} = 2z$ | giperbolik paraboloid |
| $F(x, y) = 0$ | silindr |

:::savol
$x^2 + 4y^2 = 2z$ sirti?
- Ellipsoid
+ Elliptik paraboloid
- Giperbolik paraboloid
- Elliptik silindr
:::

:::tarix
Ikkinchi tartibli sirtlarni L. Eyler (1748) birinchi bo'lib to'liq tasniflagan.
:::
