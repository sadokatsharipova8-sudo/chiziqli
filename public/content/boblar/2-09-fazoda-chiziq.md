# 9-mavzu. Fazoda to'g'ri chiziq tenglamalari. O'zaro vaziyatlar

**Bu mavzuda:** kanonik, parametrik, ikki nuqta orqali va umumiy tenglamalar; ikki to'g'ri chiziqning o'zaro vaziyati, ayqash chiziqlar orasidagi masofa; to'g'ri chiziq va tekislikning o'zaro vaziyati, burchak, kesishish nuqtasi, proyeksiya.

## 9.1. To'g'ri chiziq tenglamalari

$M_0(x_0;\ y_0;\ z_0)$ nuqta va yo'naltiruvchi $\mathbf s = (l;\ m;\ n)$:

- **kanonik:** $\dfrac{x - x_0}{l} = \dfrac{y - y_0}{m} = \dfrac{z - z_0}{n}$ (maxraj 0 bo'lsa, surat ham 0);
- **parametrik:** $x = x_0 + lt$, $y = y_0 + mt$, $z = z_0 + nt$;
- **ikki nuqta orqali:** $\dfrac{x - x_1}{x_2 - x_1} = \dfrac{y - y_1}{y_2 - y_1} = \dfrac{z - z_1}{z_2 - z_1}$;
- **umumiy** (ikki tekislik kesishmasi): $\begin{cases} A_1x + B_1y + C_1z + D_1 = 0\\ A_2x + B_2y + C_2z + D_2 = 0\end{cases}$.

**Umumiydan kanonikka:** $\mathbf s = \mathbf n_1 \times \mathbf n_2$; $M_0$ — sistemaning biror yechimi.

:::misol
$\begin{cases} x + 2y - z = 3\\ 2x - y + z = 1\end{cases}$: $\mathbf s = (1;\ 2;\ -1)\times(2;\ -1;\ 1) = (1;\ -3;\ -5)$; $z = 0$ da $x = y = 1$:
$$\frac{x - 1}{1} = \frac{y - 1}{-3} = \frac{z}{-5}.$$
:::

:::savol
$\frac{x - 1}{2} = \frac{y + 1}{-1} = \frac z3$ ning yo'naltiruvchi vektori?
- $(1;\ -1;\ 0)$
+ $(2;\ -1;\ 3)$
- $(-1;\ 1;\ 0)$
- $(2;\ 1;\ 3)$
:::

## 9.2. Ikki to'g'ri chiziq

$L_1$: $M_1$, $\mathbf s_1$; $L_2$: $M_2$, $\mathbf s_2$.

| Shart | Vaziyat |
|---|---|
| $\mathbf s_1 \parallel \mathbf s_2$, $\overrightarrow{M_1M_2} \parallel \mathbf s_1$ | ustma-ust |
| $\mathbf s_1 \parallel \mathbf s_2$, aks holda | parallel |
| $\overrightarrow{M_1M_2}\,\mathbf s_1\,\mathbf s_2 = 0$, $\mathbf s_1 \nparallel \mathbf s_2$ | kesishadi |
| $\overrightarrow{M_1M_2}\,\mathbf s_1\,\mathbf s_2 \ne 0$ | **ayqash** |

Burchak: $\cos\varphi = \dfrac{|\mathbf s_1\cdot\mathbf s_2|}{|\mathbf s_1||\mathbf s_2|}$.

**Ayqash chiziqlar orasidagi masofa:**
$$d = \frac{|\overrightarrow{M_1M_2}\,\mathbf s_1\,\mathbf s_2|}{|\mathbf s_1 \times \mathbf s_2|}.$$

:::misol
$L_1$ — $Ox$ o'qi; $L_2$: $M_2(0;\ 1;\ 2)$, $\mathbf s_2 = (0;\ 1;\ 0)$. Aralash ko'paytma $2 \ne 0$ — ayqash; $|\mathbf s_1 \times \mathbf s_2| = 1$, $d = 2$.
:::

## 9.3. To'g'ri chiziq va tekislik

Tekislik $\mathbf n = (A;\ B;\ C)$, to'g'ri chiziq $\mathbf s = (l;\ m;\ n)$:

:::xossa
- **parallel** (yoki tekislikda yotadi): $Al + Bm + Cn = 0$; $M_0$ tekislikda bo'lsa — chiziq tekislikda yotadi;
- **perpendikulyar:** $\frac Al = \frac Bm = \frac Cn$;
- burchak: $\sin\varphi = \dfrac{|Al + Bm + Cn|}{|\mathbf n|\,|\mathbf s|}$ (sinus — chunki $\mathbf n$ tekislikka perpendikulyar).
:::

**Kesishish nuqtasi:** parametrik tenglamani tekislikka qo'yamiz.

:::misol
$x = 1 + t$, $y = 2t$, $z = -1 + t$ va $x + y + z - 6 = 0$: $4t - 6 = 0$, $t = \frac32$, nuqta $\left(\frac52;\ 3;\ \frac12\right)$.
:::

:::misol Nuqtaning tekislikdagi proyeksiyasi
$M(4;\ 3;\ 2)$, tekislik $x + y + z - 3 = 0$. Perpendikulyar: $x = 4 + t$, $y = 3 + t$, $z = 2 + t$; $9 + 3t - 3 = 0 \Rightarrow t = -2$. Proyeksiya $K(2;\ 1;\ 0)$; simmetrik nuqta $M' = 2K - M = (0;\ -1;\ -2)$.
:::

:::savol
$\frac x1 = \frac y2 = \frac z{-1}$ va $x + y + 3z - 5 = 0$ qanday joylashgan?
+ Parallel
- Perpendikulyar
- Chiziq tekislikda yotadi
- $45^\circ$ ostida kesishadi
> $1 + 2 - 3 = 0$, $O$ esa tekislikda emas.
:::

**Tatbiqlar:** nur va sirt kesishishi (kompyuter grafikasida *ray tracing*), robot qo'lining harakat trayektoriyasi, uchish yo'llarining eng yaqin yaqinlashuvi (ayqash chiziqlar masofasi).

:::tarix
Fazodagi to'g'ri chiziq tenglamalarini A. Klero va L. Eyler XVIII asrda rivojlantirgan.
:::
