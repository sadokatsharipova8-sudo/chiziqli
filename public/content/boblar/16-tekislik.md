# 16. Fazoda tekislik va to'g'ri chiziq

**Bu mavzuda:** tekislik tenglamalari, tekisliklar orasidagi burchak, nuqtadan tekislikkacha masofa, fazoda to'g'ri chiziq tenglamalari, to'g'ri chiziq va tekislikning o'zaro joylashuvi, ayqash to'g'ri chiziqlar.

## 16.1. Tekislik tenglamalari

:::teorema
Fazoda har qanday tekislik birinchi darajali tenglama bilan beriladi:
$$Ax + By + Cz + D = 0\qquad(\textbf{umumiy tenglama}),$$
$\mathbf n = (A;\ B;\ C)$ — tekislikka perpendikulyar **normal vektor**.
:::

| Tenglama | Ko'rinishi |
|---|---|
| Nuqta va normal | $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$ |
| Kesmalarda | $\dfrac{x}{a} + \dfrac{y}{b} + \dfrac{z}{c} = 1$ |
| Normal | $x\cos\alpha + y\cos\beta + z\cos\gamma - p = 0$ |
| Uch nuqta orqali | $\begin{vmatrix} x - x_1 & y - y_1 & z - z_1\\ x_2 - x_1 & y_2 - y_1 & z_2 - z_1\\ x_3 - x_1 & y_3 - y_1 & z_3 - z_1\end{vmatrix} = 0$ |

Uch nuqta orqali o'tuvchi tekislik tenglamasi — $\overrightarrow{M_1M}$, $\overrightarrow{M_1M_2}$, $\overrightarrow{M_1M_3}$ vektorlarning komplanarlik sharti (13-mavzu).

**Xususiy hollar:** $D = 0$ — tekislik koordinata boshidan o'tadi; $C = 0$ — $Oz$ o'qqa parallel; $B = C = 0$ — $Oyz$ tekislikka parallel ($x = \text{const}$).

:::misol
$M_1(1;\ 1;\ 1)$, $M_2(2;\ 3;\ 1)$, $M_3(1;\ 2;\ 3)$ orqali:
$$\begin{vmatrix} x - 1 & y - 1 & z - 1\\ 1 & 2 & 0\\ 0 & 1 & 2\end{vmatrix} = 4(x - 1) - 2(y - 1) + (z - 1) = 0,$$
ya'ni $4x - 2y + z - 3 = 0$. Tekshirish: $M_2$: $8 - 6 + 1 - 3 = 0$ ✓.
:::

:::savol
$2x - 3y + 6z - 12 = 0$ tekislik $Oz$ o'qdan qanday kesma ajratadi?
- 6
+ 2
- −12
- 12
> Kesmalarda: $\frac{x}{6} + \frac{y}{-4} + \frac{z}{2} = 1$.
:::

## 16.2. Tekisliklarning o'zaro joylashuvi

Tekisliklar orasidagi burchak — normal vektorlar orasidagi burchak:
$$\cos\varphi = \frac{|A_1A_2 + B_1B_2 + C_1C_2|}{\sqrt{A_1^2 + B_1^2 + C_1^2}\sqrt{A_2^2 + B_2^2 + C_2^2}}.$$

:::xossa
- Parallellik: $\dfrac{A_1}{A_2} = \dfrac{B_1}{B_2} = \dfrac{C_1}{C_2}$;
- Perpendikulyarlik: $A_1A_2 + B_1B_2 + C_1C_2 = 0$.
:::

:::misol
$x + 2y + 2z - 3 = 0$ va $6x + 2y - 3z + 1 = 0$: $\ \cos\varphi = \dfrac{|6 + 4 - 6|}{3\cdot 7} = \dfrac{4}{21}$.
:::

## 16.3. Nuqtadan tekislikkacha masofa

$$d = \frac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2 + B^2 + C^2}}.$$

:::misol
$M(1;\ 2;\ 3)$ dan $2x - y + 2z + 5 = 0$ gacha: $d = \dfrac{|2 - 2 + 6 + 5|}{3} = \dfrac{11}{3}$.
:::

## 16.4. Fazoda to'g'ri chiziq

$M_0(x_0;\ y_0;\ z_0)$ nuqtadan $\mathbf s = (l;\ m;\ n)$ yo'naltiruvchi vektor bo'yicha o'tuvchi to'g'ri chiziq:
- **kanonik:** $\dfrac{x - x_0}{l} = \dfrac{y - y_0}{m} = \dfrac{z - z_0}{n}$;
- **parametrik:** $x = x_0 + lt,\ y = y_0 + mt,\ z = z_0 + nt$;
- **ikki nuqta orqali:** $\dfrac{x - x_1}{x_2 - x_1} = \dfrac{y - y_1}{y_2 - y_1} = \dfrac{z - z_1}{z_2 - z_1}$;
- **umumiy** (ikki tekislik kesishmasi): $\begin{cases} A_1x + B_1y + C_1z + D_1 = 0\\ A_2x + B_2y + C_2z + D_2 = 0\end{cases}$.

Umumiy tenglamadan kanonikka o'tish: $\mathbf s = \mathbf n_1 \times \mathbf n_2$, $M_0$ — sistemaning biror yechimi.

:::misol
$\begin{cases} x + 2y - z = 3\\ 2x - y + z = 1\end{cases}$. $\ \mathbf s = (1;\ 2;\ -1) \times (2;\ -1;\ 1) = (1;\ -3;\ -5)$.

$z = 0$ deb: $x + 2y = 3$, $2x - y = 1$, ya'ni $x = 1$, $y = 1$. Kanonik tenglama:
$$\frac{x - 1}{1} = \frac{y - 1}{-3} = \frac{z}{-5}.$$
:::

:::savol
$\frac{x - 1}{2} = \frac{y + 1}{-1} = \frac{z}{3}$ to'g'ri chiziqning yo'naltiruvchi vektori qaysi?
- $(1;\ -1;\ 0)$
+ $(2;\ -1;\ 3)$
- $(-1;\ 1;\ 0)$
- $(2;\ 1;\ 3)$
:::

## 16.5. To'g'ri chiziq va tekislik

To'g'ri chiziq ($\mathbf s$) va tekislik ($\mathbf n$) orasidagi burchak:
$$\sin\varphi = \frac{|Al + Bm + Cn|}{\sqrt{A^2 + B^2 + C^2}\sqrt{l^2 + m^2 + n^2}}.$$

:::xossa
- To'g'ri chiziq tekislikka parallel: $\mathbf n\cdot\mathbf s = Al + Bm + Cn = 0$;
- To'g'ri chiziq tekislikka perpendikulyar: $\mathbf n \parallel \mathbf s$, ya'ni $\dfrac{A}{l} = \dfrac{B}{m} = \dfrac{C}{n}$.
:::

**Kesishish nuqtasi:** parametrik tenglamani tekislik tenglamasiga qo'yib, $t$ topiladi.

:::misol Nuqtaning tekislikdagi proyeksiyasi
$M(4;\ 3;\ 2)$ dan $x + y + z - 3 = 0$ ga perpendikulyar: $x = 4 + t$, $y = 3 + t$, $z = 2 + t$. Tekislikka qo'yamiz: $9 + 3t - 3 = 0$, $t = -2$. Proyeksiya: $K(2;\ 1;\ 0)$, masofa $|MK| = 2\sqrt3$.
:::

## 16.6. Ikki to'g'ri chiziqning o'zaro joylashuvi

$L_1$: $M_1$, $\mathbf s_1$; $\ L_2$: $M_2$, $\mathbf s_2$.
- $\mathbf s_1 \parallel \mathbf s_2$ — parallel (yoki ustma-ust);
- $\overrightarrow{M_1M_2}\,\mathbf s_1\,\mathbf s_2 = 0$, $\mathbf s_1 \nparallel \mathbf s_2$ — kesishadi;
- $\overrightarrow{M_1M_2}\,\mathbf s_1\,\mathbf s_2 \ne 0$ — **ayqash** to'g'ri chiziqlar.

Ayqash to'g'ri chiziqlar orasidagi masofa:
$$d = \frac{|\overrightarrow{M_1M_2}\,\mathbf s_1\,\mathbf s_2|}{|\mathbf s_1 \times \mathbf s_2|}.$$

:::misol
$L_1$: $O(0;\ 0;\ 0)$, $\mathbf s_1 = (1;\ 0;\ 0)$; $\ L_2$: $M_2(0;\ 1;\ 2)$, $\mathbf s_2 = (0;\ 1;\ 0)$.
Aralash ko'paytma $\begin{vmatrix} 0 & 1 & 2\\ 1 & 0 & 0\\ 0 & 1 & 0\end{vmatrix} = 2 \ne 0$ — ayqash. $|\mathbf s_1 \times \mathbf s_2| = |\mathbf k| = 1$, $d = 2$.
:::

:::savol
$\frac{x}{1} = \frac{y}{2} = \frac{z}{-1}$ to'g'ri chiziq va $x + y + 3z - 5 = 0$ tekislik qanday joylashgan?
+ To'g'ri chiziq tekislikka parallel
- Perpendikulyar
- To'g'ri chiziq tekislikda yotadi
- $45^\circ$ burchak ostida kesishadi
> $\mathbf n\cdot\mathbf s = 1 + 2 - 3 = 0$, va $O(0;0;0)$ tekislikda yotmaydi ($-5 \ne 0$).
:::

> 💡 [Laboratoriya → 3D vektorlar](#/lab/fazo) da tekislik normal vektorini ko'rish mumkin.

:::tarix
Fazoviy analitik geometriyani A. Klero (1731) va L. Eyler (1748) rivojlantirgan; tekislik tenglamasini J. Lagranj va G. Monj zamonaviy ko'rinishga keltirgan.
:::
