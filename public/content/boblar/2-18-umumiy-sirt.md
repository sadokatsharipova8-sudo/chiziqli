# 18-mavzu. Ikkinchi tartibli sirtlarning umumiy tenglamasi

**Bu mavzuda:** umumiy tenglama va matritsalar, invariantlar, markaz, kanonik ko'rinishga keltirish algoritmi (to'liq kvadrat ajratish va burish), xos sonlar ishoralari bo'yicha tasnif, misollar.

## 18.1. Umumiy tenglama

$$F = a_{11}x^2 + a_{22}y^2 + a_{33}z^2 + 2a_{12}xy + 2a_{13}xz + 2a_{23}yz + 2a_{14}x + 2a_{24}y + 2a_{34}z + a_{44} = 0.$$

Bosh qism matritsasi $A$ ($3\times3$, simmetrik) va kengaytirilgan matritsa $\bar A$ ($4\times4$).

**Invariantlar** (harakatlarda o'zgarmaydi):
$$I_1 = \operatorname{tr}A,\quad I_2 = \text{2-tartibli bosh minorlar yig'indisi},\quad I_3 = \det A,\quad I_4 = \det\bar A.$$
$I_1 = \lambda_1 + \lambda_2 + \lambda_3$, $I_3 = \lambda_1\lambda_2\lambda_3$.

## 18.2. Markaz

Markaz tenglamalari ($\partial F/\partial x = \partial F/\partial y = \partial F/\partial z = 0$):
$$\begin{cases} a_{11}x + a_{12}y + a_{13}z + a_{14} = 0\\ a_{12}x + a_{22}y + a_{23}z + a_{24} = 0\\ a_{13}x + a_{23}y + a_{33}z + a_{34} = 0\end{cases}$$

$I_3 \ne 0$ — yagona markaz (ellipsoid, giperboloidlar, konus); $I_3 = 0$ — markaz yo'q (paraboloidlar) yoki cheksiz ko'p (silindrlar).

## 18.3. Algoritm

1. **Aralash hadlar yo'q bo'lsa** ($a_{12} = a_{13} = a_{23} = 0$): har bir o'zgaruvchi bo'yicha to'liq kvadrat ajratib, ko'chirish.
2. **Aralash hadlar bor bo'lsa:** $A$ ning xos sonlari $\lambda_1, \lambda_2, \lambda_3$ va ortonormal xos vektorlari — yangi o'qlar (burish, 1-semestr 18-mavzu). Bosh qism $\lambda_1X^2 + \lambda_2Y^2 + \lambda_3Z^2$ ga aylanadi.
3. Chiziqli hadlarni yangi koordinatalarda yozib, to'liq kvadrat ajratish.
4. Tasnif jadvalidan (16-mavzu) turini aniqlash.

## 18.4. Misollar

:::misol 1. Aralash hadsiz
$x^2 + 2y^2 - z^2 - 2x + 8y + 2z + 6 = 0$.
$$(x - 1)^2 - 1 + 2(y + 2)^2 - 8 - (z - 1)^2 + 1 + 6 = 0 \Rightarrow (x - 1)^2 + 2(y + 2)^2 - (z - 1)^2 = 2.$$
$$\frac{(x - 1)^2}{2} + \frac{(y + 2)^2}{1} - \frac{(z - 1)^2}{2} = 1$$
— markazi $(1;\ -2;\ 1)$ bo'lgan bir pallali giperboloid.
:::

:::misol 2. Sfera
$x^2 + y^2 + z^2 - 2x + 4y - 6z - 2 = 0 \Rightarrow (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 16$: markaz $(1;\ -2;\ 3)$, $R = 4$.
:::

:::misol 3. Burish bilan
$z = 2xy$: bosh qism $2xy$, matritsa $\begin{pmatrix} 0 & 1 & 0\\ 1 & 0 & 0\\ 0 & 0 & 0\end{pmatrix}$, xos sonlar $1, -1, 0$; o'qlar $\frac{1}{\sqrt2}(1, 1, 0)$, $\frac{1}{\sqrt2}(1, -1, 0)$, $(0, 0, 1)$:
$$z = X^2 - Y^2\ \text{— giperbolik paraboloid}.$$
:::

:::misol 4. Parabolik silindr
$x^2 + 2xy + y^2 = 2z$: $(x + y)^2 = 2z$. $X = \frac{x + y}{\sqrt2}$: $2X^2 = 2z$, ya'ni $z = X^2$ — parabolik silindr (yasovchilari $(1, -1, 0)$ yo'nalishida).
:::

:::savol
$x^2 + 2y^2 - 3z^2 - 6x - 8y - 18z - 33 = 0$ sirtining markazi?
+ $(3;\ 2;\ -3)$
- $(3;\ -2;\ -3)$
- $(-3;\ 2;\ 3)$
- markaz yo'q
> $2x - 6 = 0$, $4y - 8 = 0$, $-6z - 18 = 0$.
:::

## 18.5. Xos sonlar bo'yicha tasnif

| $\lambda_1, \lambda_2, \lambda_3$ ishoralari | Sirt turi |
|---|---|
| hammasi bir xil, $\ne 0$ | ellipsoid (haqiqiy/mavhum) yoki nuqta |
| turli ishorali, $\ne 0$ | giperboloid (bir/ikki pallali) yoki konus |
| bittasi 0, qolganlari bir ishorali | elliptik paraboloid yoki elliptik silindr |
| bittasi 0, qolganlari turli ishorali | giperbolik paraboloid yoki giperbolik silindr |
| ikkitasi 0 | parabolik silindr yoki tekisliklar juftligi |

:::savol
Bosh qism xos sonlari $2, 3, -1$, ozod had kanonik ko'rinishda $-6$ ($2X^2 + 3Y^2 - Z^2 = 6$). Sirt?
+ Bir pallali giperboloid
- Ikki pallali giperboloid
- Ellipsoid
- Konus
:::

## 18.6. Tatbiqlar

- **Kompyuter grafikasi va CAD:** sirtlar umumiy (ikkinchi darajali) tenglama bilan saqlanadi; turini aniqlash — ko'rsatish usulini tanlash.
- **Fizika:** inersiya ellipsoidi — jismning aylanish xossalarini ifodalaydi; uning bosh o'qlari — inersiya tenzorining xos vektorlari.
- **Statistika:** ko'p o'lchovli normal taqsimotning teng zichlik sirtlari — ellipsoidlar.

:::tarix
Sirtlarning invariantlar orqali tasnifi XIX asrda O. Koshi va boshqalar tomonidan yakunlangan.
:::
