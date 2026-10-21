# 14-mavzu. Ikkinchi tartibli chiziqlarning umumiy tenglamasini kanonik ko'rinishga keltirish (markaziy hol)

**Bu mavzuda:** $\delta \ne 0$ holi uchun algoritm — markazga ko'chirish, o'qlarni burish (xos sonlar), kanonik ko'rinish va invariantlar orqali tekshirish, to'liq ishlangan misollar.

## 14.1. Algoritm ($\delta \ne 0$)

**1-qadam. Markazni topish:**
$$\begin{cases} a_{11}x_0 + a_{12}y_0 + a_{13} = 0\\ a_{12}x_0 + a_{22}y_0 + a_{23} = 0\end{cases}$$

**2-qadam. Ko'chirish** $x = x' + x_0$, $y = y' + y_0$: chiziqli hadlar yo'qoladi,
$$a_{11}x'^2 + 2a_{12}x'y' + a_{22}y'^2 + c' = 0,\qquad c' = a_{13}x_0 + a_{23}y_0 + a_{33} = \frac{\Delta}{\delta}.$$

**3-qadam. Burish:** $A = \begin{pmatrix} a_{11} & a_{12}\\ a_{12} & a_{22}\end{pmatrix}$ ning xos sonlari $\lambda_1, \lambda_2$ ($\lambda^2 - I_1\lambda + \delta = 0$) va ortonormal xos vektorlar — yangi o'qlar:
$$\lambda_1X^2 + \lambda_2Y^2 + \frac\Delta\delta = 0.$$

Burish burchagi: $\operatorname{ctg}2\alpha = \dfrac{a_{11} - a_{22}}{2a_{12}}$.

**4-qadam.** Kanonik ko'rinishga bo'lib, turini aniqlash.

## 14.2. 1-misol: ellips

$$5x^2 + 4xy + 8y^2 - 36 = 0.$$

1. Markaz: $5x + 2y = 0$, $2x + 8y = 0$ $\Rightarrow$ $(0;\ 0)$ (chiziqli hadlar yo'q).
2. $\lambda^2 - 13\lambda + 36 = 0$: $\lambda_1 = 4$, $\lambda_2 = 9$.
3. Xos vektorlar: $\lambda_1 = 4$ — $(2;\ -1)$; $\lambda_2 = 9$ — $(1;\ 2)$; normallangan: $\frac{1}{\sqrt5}(2, -1)$, $\frac{1}{\sqrt5}(1, 2)$.
4. $4X^2 + 9Y^2 = 36 \Rightarrow \dfrac{X^2}{9} + \dfrac{Y^2}{4} = 1$ — ellips, $a = 3$, $b = 2$.

Burish formulalari: $x = \frac{2X + Y}{\sqrt5}$, $y = \frac{-X + 2Y}{\sqrt5}$.

## 14.3. 2-misol: giperbola

$$3x^2 + 10xy + 3y^2 - 2x - 14y - 13 = 0.$$

1. Markaz: $3x + 5y - 1 = 0$, $5x + 3y - 7 = 0$ $\Rightarrow$ $(2;\ -1)$.
2. $c' = (-1)\cdot2 + (-7)(-1) - 13 = -8$. Tekshirish: $\Delta = 128$, $\delta = -16$, $\frac\Delta\delta = -8$ ✓.
3. $\lambda^2 - 6\lambda - 16 = 0$: $\lambda_1 = 8$, $\lambda_2 = -2$; xos vektorlar $(1;\ 1)$ va $(1;\ -1)$ — burish $45^\circ$.
4. $8X^2 - 2Y^2 - 8 = 0 \Rightarrow X^2 - \dfrac{Y^2}{4} = 1$ — giperbola, $a = 1$, $b = 2$.

## 14.4. 3-misol: ozod hadli hol

$$8x^2 + 12xy - y^2 + 32x + 24y + 44 = 0.$$

1. Markaz: $8x + 6y + 16 = 0$, $6x - y + 12 = 0$ $\Rightarrow$ $(-2;\ 0)$.
2. $c' = 16\cdot(-2) + 12\cdot0 + 44 = 12$.
3. $\lambda^2 - 7\lambda - 44 = 0$: $\lambda_1 = -4$, $\lambda_2 = 11$.
4. $-4X^2 + 11Y^2 + 12 = 0 \Rightarrow \dfrac{X^2}{3} - \dfrac{Y^2}{12/11} = 1$ — giperbola.

:::savol
Markaziy chiziq uchun $\delta = -16$, $\Delta = 128$. Ko'chirishdan keyingi ozod had?
+ $-8$
- $8$
- $-2048$
- $112$
:::

## 14.5. Tekshirish va maslahatlar

:::xossa
- $\lambda_1 + \lambda_2 = a_{11} + a_{22}$, $\lambda_1\lambda_2 = \delta$ — invariantlar bilan tekshiring.
- $\lambda_1$, $\lambda_2$ bir xil ishorali va $c'$ ularga qarama-qarshi ishorali — **haqiqiy ellips**; $c'$ ham shu ishorali — mavhum ellips; $c' = 0$ — nuqta.
- $\lambda_1$, $\lambda_2$ turli ishorali: $c' \ne 0$ — giperbola, $c' = 0$ — kesishuvchi to'g'ri chiziqlar.
:::

:::diqqat
Burishda xos vektorlarni **normallash** shart, aks holda koordinatalar cho'zilib ketadi va yarim o'qlar noto'g'ri chiqadi.
:::

:::savol
$\lambda_1 = 4$, $\lambda_2 = 9$, $c' = -36$. Chiziq turi?
+ Ellips
- Giperbola
- Mavhum ellips
- Nuqta
:::

**Tatbiqlar:** sun'iy yo'ldosh orbitasini kuzatuv ma'lumotlaridan aniqlash (umumiy tenglama → kanonik), mashinali ko'rishda ellips shaklidagi obyektlarni (ko'z qorachig'i, g'ildirak) aniqlash, kristallardagi kuchlanish ellipslari.

:::tarix
Kanonik ko'rinishga keltirishning ortogonal (bosh o'qlar) usuli O. Koshi va K. Yakobi ishlarida XIX asrda shakllangan.
:::
