# 12-mavzu. Ikkinchi tartibli chiziqlarning umumiy tenglamasi. Markaz. Markaziy va nomarkaziy chiziqlar

**Bu mavzuda:** umumiy tenglama va uning matritsalari, koordinatalar almashganda koeffitsiyentlarning o'zgarishi, invariantlar $I_1, \delta, \Delta$, markaz ta'rifi va markaz tenglamalari, markaziy va nomarkaziy chiziqlar, tasnif.

## 12.1. Umumiy tenglama

$$F(x, y) = a_{11}x^2 + 2a_{12}xy + a_{22}y^2 + 2a_{13}x + 2a_{23}y + a_{33} = 0.$$

Matritsalar:
$$A = \begin{pmatrix} a_{11} & a_{12}\\ a_{12} & a_{22}\end{pmatrix}\ (\text{bosh qism}),\qquad \bar A = \begin{pmatrix} a_{11} & a_{12} & a_{13}\\ a_{12} & a_{22} & a_{23}\\ a_{13} & a_{23} & a_{33}\end{pmatrix}.$$

:::diqqat
$xy$, $x$, $y$ oldidagi koeffitsiyentlar **ikkiga bo'linib** matritsaga yoziladi: $2a_{12}xy$, $2a_{13}x$, $2a_{23}y$.
:::

## 12.2. Invariantlar

Ko'chirish va burishda (harakatlarda) quyidagilar o'zgarmaydi:
$$I_1 = a_{11} + a_{22},\qquad \delta = I_2 = \begin{vmatrix} a_{11} & a_{12}\\ a_{12} & a_{22}\end{vmatrix},\qquad \Delta = I_3 = \det\bar A.$$

$I_1 = \lambda_1 + \lambda_2$, $\delta = \lambda_1\lambda_2$ — bosh qism matritsasining iz va determinanti (1-semestr 17–18-mavzular).

:::misol
$3x^2 + 10xy + 3y^2 - 2x - 14y - 13 = 0$: $a_{11} = 3$, $a_{12} = 5$, $a_{22} = 3$, $a_{13} = -1$, $a_{23} = -7$, $a_{33} = -13$.
$I_1 = 6$, $\delta = 9 - 25 = -16$, $\Delta = 128$.
:::

## 12.3. Markaz

:::tarif
$S$ nuqta chiziqning **markazi**, agar chiziq $S$ ga nisbatan simmetrik bo'lsa: $M$ chiziqda $\Rightarrow$ $M$ ga $S$ ga nisbatan simmetrik nuqta ham chiziqda.
:::

:::teorema
$S(x_0;\ y_0)$ markaz $\iff$
$$\begin{cases} a_{11}x_0 + a_{12}y_0 + a_{13} = 0\\ a_{12}x_0 + a_{22}y_0 + a_{23} = 0\end{cases}\qquad\left(\frac{\partial F}{\partial x} = \frac{\partial F}{\partial y} = 0\right).$$
:::

Isbot g'oyasi: markazga ko'chirganda ($x = x' + x_0$) birinchi darajali hadlar yo'qolishi kerak — ularning koeffitsiyentlari aynan shu ifodalar.

Markazga ko'chirgandan keyin ozod had:
$$a'_{33} = F(x_0, y_0) = a_{13}x_0 + a_{23}y_0 + a_{33} = \frac{\Delta}{\delta}.$$

:::misol
Yuqoridagi misolda: $\begin{cases} 3x + 5y - 1 = 0\\ 5x + 3y - 7 = 0\end{cases} \Rightarrow S(2;\ -1)$. $a'_{33} = -2 + 7 - 13 = -8 = \frac{128}{-16}$ ✓.
:::

## 12.4. Markaziy va nomarkaziy chiziqlar

:::tarif
- $\delta \ne 0$ — **markaziy** chiziq: yagona markaz;
- $\delta = 0$ — **nomarkaziy** chiziq: markaz yo'q yoki markazlar to'g'ri chizig'i.
:::

| $\delta$ | Tur | Kanonik ko'rinish ($\Delta \ne 0$) |
|---|---|---|
| $> 0$ | elliptik | ellips (haqiqiy yoki mavhum) |
| $< 0$ | giperbolik | giperbola |
| $= 0$ | parabolik | parabola |

$\Delta = 0$ — **aynigan** chiziq: nuqta ($\delta > 0$), ikki kesishuvchi to'g'ri chiziq ($\delta < 0$), ikki parallel, ustma-ust yoki mavhum to'g'ri chiziqlar ($\delta = 0$).

:::misol
- $x^2 - y^2 = 0$: $(x - y)(x + y) = 0$ — ikki kesishuvchi to'g'ri chiziq.
- $x^2 + y^2 = 0$ — nuqta; $x^2 + y^2 + 1 = 0$ — mavhum ellips.
- $(x + 2y)^2 = 1$ — ikki parallel to'g'ri chiziq $x + 2y = \pm1$.
:::

:::savol
$x^2 + 4xy + 4y^2 + x - 1 = 0$ qanday turdagi chiziq?
- Elliptik
- Giperbolik
+ Parabolik (nomarkaziy)
- Aylana
> $\delta = 1\cdot 4 - 2^2 = 0$.
:::

:::savol
$-3x^2 + 4xy - y^2 - 6x + 6y + 1 = 0$ ning markazi?
+ $(-3;\ -3)$
- $(3;\ 3)$
- $(-3;\ 3)$
- markaz yo'q
> $-3x + 2y - 3 = 0$, $2x - y + 3 = 0$.
:::

## 12.5. Tatbiq: kanonik ko'rinishgacha bo'lgan reja

1. $\delta$ ni hisoblab, turini aniqlash.
2. $\delta \ne 0$: markazga ko'chirish, so'ng burish (14-mavzu).
3. $\delta = 0$: avval burish, so'ng to'liq kvadrat ajratish (15-mavzu).
4. Invariantlar bilan tekshirish: $\lambda_1 + \lambda_2 = I_1$, $\lambda_1\lambda_2 = \delta$.

:::tarix
Ikkinchi tartibli chiziqlarning invariantlar orqali to'liq tasnifini L. Eyler (1748) bergan.
:::
