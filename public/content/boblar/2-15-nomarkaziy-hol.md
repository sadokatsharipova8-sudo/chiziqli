# 15-mavzu. Ikkinchi tartibli chiziqlarning umumiy tenglamasini kanonik ko'rinishga keltirish (nomarkaziy hol)

**Bu mavzuda:** $\delta = 0$ holi, bosh qismning to'liq kvadrat bo'lishi, avval burish keyin ko'chirish algoritmi, parabolaning kanonik ko'rinishi va parametri, aynigan holatlar (parallel to'g'ri chiziqlar).

## 15.1. Nomarkaziy holning xususiyati

$\delta = a_{11}a_{22} - a_{12}^2 = 0$ bo'lsa, bosh qism to'liq kvadrat:
$$a_{11}x^2 + 2a_{12}xy + a_{22}y^2 = \pm(\alpha x + \beta y)^2.$$

Xos sonlar: $\lambda_1 = 0$, $\lambda_2 = I_1 = a_{11} + a_{22}$. Markaz tenglamalari birgalikda emas (markaz yo'q) yoki cheksiz ko'p yechimli (markazlar to'g'ri chizig'i).

Shuning uchun tartib boshqacha: **avval burish, keyin ko'chirish**.

## 15.2. Algoritm ($\delta = 0$)

1. Xos vektorlarni topish: $\lambda_1 = 0$ ga mos $\mathbf e_1$, $\lambda_2 = I_1$ ga mos $\mathbf e_2$ (normallangan).
2. Burish: $x$, $y$ ni $X$, $Y$ orqali ifodalab, tenglamaga qo'yish. Natija:
$$I_1Y^2 + 2b_1X + 2b_2Y + a_{33} = 0.$$
3. $Y$ bo'yicha to'liq kvadrat ajratish va ko'chirish.
4. Natija:
 - $b_1 \ne 0$: **parabola** $Y'^2 = 2pX'$;
 - $b_1 = 0$: ikki **parallel** (yoki ustma-ust, yoki mavhum) to'g'ri chiziq.

**Invariant formula:** parabola uchun $p = \sqrt{-\dfrac{\Delta}{I_1^3}}$.

## 15.3. Misol: parabola

$$x^2 + 4xy + 4y^2 - 20x + 10y = 0.$$

$\delta = 4 - 4 = 0$, bosh qism $(x + 2y)^2$, $I_1 = 5$.

1. $\lambda_1 = 0$: $(2;\ -1)$; $\lambda_2 = 5$: $(1;\ 2)$. Normallab:
$$x = \frac{2X + Y}{\sqrt5},\qquad y = \frac{-X + 2Y}{\sqrt5}.$$
2. $x + 2y = \frac{5Y}{\sqrt5} = \sqrt5\,Y$, ya'ni $(x + 2y)^2 = 5Y^2$.
   $-20x + 10y = \frac{-40X - 20Y - 10X + 20Y}{\sqrt5} = -\frac{50X}{\sqrt5} = -10\sqrt5\,X$.
3. $5Y^2 - 10\sqrt5\,X = 0 \Rightarrow Y^2 = 2\sqrt5\,X$.

Parabola, $p = \sqrt5$, uchi koordinata boshida, o'qi $(2;\ -1)$ yo'nalishida.

**Invariant bilan tekshirish:** $\Delta = \begin{vmatrix} 1 & 2 & -10\\ 2 & 4 & 5\\ -10 & 5 & 0\end{vmatrix} = -625$, $\ p = \sqrt{\frac{625}{125}} = \sqrt5$ ✓.

## 15.4. Misol: ko'chirish ham kerak

$$y^2 - 2y - 8x + 9 = 0\quad(\delta = 0,\ \text{burish shart emas}).$$
$(y - 1)^2 = 8x - 8 = 8(x - 1)$. Ko'chirish $X = x - 1$, $Y = y - 1$: $Y^2 = 8X$ — parabola, $p = 4$, uchi $(1;\ 1)$.

## 15.5. Aynigan hollar

:::misol
- $x^2 + 4xy + 4y^2 - 1 = 0$: $(x + 2y)^2 = 1$ — ikki parallel to'g'ri chiziq $x + 2y = \pm1$.
- $(x + 2y)^2 = 0$ — ustma-ust to'g'ri chiziqlar (bitta «qo'sh» to'g'ri chiziq).
- $(x + 2y)^2 + 1 = 0$ — mavhum parallel to'g'ri chiziqlar.
:::

Bu hollarda $\Delta = 0$; markazlar to'g'ri chizig'i mavjud (masalan, $x + 2y = 0$ — simmetriya o'qi).

:::savol
Nomarkaziy holda nima uchun avval burish bajariladi?
- Burish osonroq
+ Markaz yo'q — ko'chirish uchun nuqta topib bo'lmaydi
- Ko'chirish natijani o'zgartiradi
- Farqi yo'q
:::

:::savol
$\delta = 0$, $\Delta \ne 0$ bo'lgan chiziq — bu…
- ellips
- giperbola
+ parabola
- ikki to'g'ri chiziq
:::

## 15.6. Umumiy jadval

| $\delta$ | $\Delta \ne 0$ | $\Delta = 0$ |
|---|---|---|
| $> 0$ | ellips (haqiqiy/mavhum) | nuqta |
| $< 0$ | giperbola | ikki kesishuvchi to'g'ri chiziq |
| $= 0$ | parabola | parallel / ustma-ust / mavhum to'g'ri chiziqlar |

Bu jadval 12–15-mavzularning yakuni: istalgan ikkinchi tartibli chiziqni ko'chirish va burish bilan ana shu 9 turdan biriga keltirish mumkin.

**Tatbiqlar:** ballistika (otilgan jism trayektoriyasi og'ma koordinatalarda), parabolik antennalarni o'rnatishda o'q yo'nalishini aniqlash.

:::tarix
L. Eyler «Cheksizlar tahliliga kirish» (1748) kitobida ikkinchi tartibli chiziqlarning to'liq tasnifini bergan.
:::
