# 8-mavzu. Fazoda tekislikning turli tenglamalari. Tekisliklarning o'zaro vaziyati. Nuqtadan tekislikkacha masofa

**Bu mavzuda:** tekislikning umumiy tenglamasi va normal vektor, xususiy hollar, nuqta va normal, uch nuqta, kesmalarda va normal tenglamalar, ikki tekislik orasidagi burchak, parallellik va perpendikulyarlik, nuqtadan tekislikkacha masofa, tekisliklar dastasi.

## 8.1. Umumiy tenglama

:::teorema
Fazoda har qanday tekislik birinchi darajali tenglama bilan beriladi va aksincha:
$$Ax + By + Cz + D = 0,\qquad \mathbf n = (A;\ B;\ C)\ne\mathbf 0.$$
$\mathbf n$ — tekislikka perpendikulyar **normal vektor**.
:::

| Shart | Tekislik |
|---|---|
| $D = 0$ | koordinata boshidan o'tadi |
| $C = 0$ | $Oz$ o'qiga parallel |
| $B = C = 0$ | $Oyz$ ga parallel ($x = \text{const}$) |
| $C = D = 0$ | $Oz$ o'qidan o'tadi |

## 8.2. Tenglama turlari

**Nuqta va normal:** $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$.

:::misol
$M_0(1;\ -2;\ 3)$, $\mathbf n = (2;\ 1;\ -1)$: $2x + y - z + 3 = 0$.
:::

**Uch nuqta orqali** — $\overrightarrow{M_1M}$, $\overrightarrow{M_1M_2}$, $\overrightarrow{M_1M_3}$ komplanarligi:
$$\begin{vmatrix} x - x_1 & y - y_1 & z - z_1\\ x_2 - x_1 & y_2 - y_1 & z_2 - z_1\\ x_3 - x_1 & y_3 - y_1 & z_3 - z_1\end{vmatrix} = 0.$$

:::misol
$M_1(1;\ 1;\ 1)$, $M_2(2;\ 3;\ 1)$, $M_3(1;\ 2;\ 3)$: $4(x - 1) - 2(y - 1) + (z - 1) = 0$, ya'ni $4x - 2y + z - 3 = 0$.
:::

**Kesmalarda:** $\dfrac xa + \dfrac yb + \dfrac zc = 1$.

**Normal tenglama:** $x\cos\alpha + y\cos\beta + z\cos\gamma - p = 0$, $p$ — boshdan masofa; umumiy tenglamani $\mu = \pm\frac{1}{|\mathbf n|}$ ga ko'paytirib hosil qilinadi ($\mu$ ishorasi $D$ ga teskari).

:::savol
$2x - 3y + 6z - 12 = 0$ tekislik $Oz$ dan qanday kesma ajratadi?
- 6
+ 2
- −12
- 12
:::

## 8.3. Ikki tekislikning o'zaro vaziyati

Ikki tekislik: kesishadi (to'g'ri chiziq bo'ylab), parallel yoki ustma-ust.

:::xossa
- **Ustma-ust:** $\frac{A_1}{A_2} = \frac{B_1}{B_2} = \frac{C_1}{C_2} = \frac{D_1}{D_2}$;
- **parallel:** $\frac{A_1}{A_2} = \frac{B_1}{B_2} = \frac{C_1}{C_2} \ne \frac{D_1}{D_2}$;
- **perpendikulyar:** $A_1A_2 + B_1B_2 + C_1C_2 = 0$.
:::

**Burchak** — normallar orasidagi burchak:
$$\cos\varphi = \frac{|A_1A_2 + B_1B_2 + C_1C_2|}{\sqrt{A_1^2 + B_1^2 + C_1^2}\sqrt{A_2^2 + B_2^2 + C_2^2}}.$$

:::misol
$x + 2y + 2z - 3 = 0$ va $6x + 2y - 3z + 1 = 0$: $\cos\varphi = \frac{|6 + 4 - 6|}{3\cdot7} = \frac{4}{21}$.
:::

:::savol
$2x - y + 3z = 1$ va $x + 5y + kz = 0$ qaysi $k$ da perpendikulyar?
+ $k = 1$
- $k = -1$
- $k = 3$
- $k = 0$
:::

## 8.4. Nuqtadan tekislikkacha masofa

:::teorema
$$d = \frac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2 + B^2 + C^2}}.$$
:::

Isbot: tekislikdagi istalgan $M_1$ dan $M_0$ ga vektorning $\mathbf n$ dagi proyeksiyasi moduli.

:::misol
$M(1;\ 2;\ 3)$ dan $2x - y + 2z + 5 = 0$ gacha: $d = \frac{|2 - 2 + 6 + 5|}{3} = \frac{11}{3}$.

Parallel tekisliklar $Ax + By + Cz + D_1 = 0$ va $\dots + D_2 = 0$ orasidagi masofa: $\frac{|D_1 - D_2|}{|\mathbf n|}$.
:::

Ishora $Ax_0 + By_0 + Cz_0 + D$ nuqta tekislikning qaysi tomonida ekanini bildiradi.

## 8.5. Tekisliklar dastasi

Kesishuvchi ikki tekislik orqali o'tuvchi barcha tekisliklar:
$$\alpha(A_1x + B_1y + C_1z + D_1) + \beta(A_2x + B_2y + C_2z + D_2) = 0.$$

:::misol
$x + y - z = 0$ va $2x - y + 3z - 1 = 0$ kesishmasidan va $O$ dan o'tuvchi tekislik: $\alpha\cdot 0 + \beta\cdot(-1) = 0 \Rightarrow \beta = 0$; javob $x + y - z = 0$ (birinchi tekislikning o'zi, u $O$ dan o'tadi).
:::

**Tatbiqlar:** kompyuter grafikasida yoritish (normal va nur orasidagi burchak), 3D-modellashtirishda yuzalar, geodeziyada qiyalikni o'lchash.

:::tarix
Tekislik tenglamasini J. Lagranj va G. Monj (XVIII asr oxiri) hozirgi ko'rinishga keltirgan.
:::
