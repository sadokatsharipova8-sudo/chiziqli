# 13-mavzu. Chiziqli, bichiziqli va kvadratik formalar

**Bu mavzuda:** chiziqli forma va uning koeffitsiyentlari, bichiziqli forma va uning matritsasi, simmetrik formalar, bazis almashganda matritsaning o'zgarishi, kvadratik forma, uning matritsasi va rangi.

## 13.1. Chiziqli forma

:::tarif
$V$ da aniqlangan $f(\mathbf x)$ son funksiyasi
$$f(\alpha\mathbf x + \beta\mathbf y) = \alpha f(\mathbf x) + \beta f(\mathbf y)$$
shartni qanoatlantirsa — **chiziqli forma** (chiziqli funksional).
:::

Bazisda: $f(\mathbf x) = a_1x_1 + a_2x_2 + \dots + a_nx_n$, $\ a_i = f(\mathbf e_i)$.

**Misollar:** $f(x, y, z) = 2x - y + 5z$; Yevklid fazosida $f(\mathbf x) = (\mathbf a, \mathbf x)$; $C[a, b]$ da $f(g) = \int_a^b g(t)\,dt$; matritsa izi $\operatorname{tr}A$.

## 13.2. Bichiziqli forma

:::tarif
$B(\mathbf x, \mathbf y)$ har bir argumenti bo'yicha chiziqli bo'lsa — **bichiziqli forma**:
$B(\alpha\mathbf x_1 + \beta\mathbf x_2, \mathbf y) = \alpha B(\mathbf x_1, \mathbf y) + \beta B(\mathbf x_2, \mathbf y)$ va ikkinchi argument bo'yicha ham shunday.
:::

Bazisda:
$$B(\mathbf x, \mathbf y) = \sum_{i,j} b_{ij}x_iy_j = X^TBY,\qquad b_{ij} = B(\mathbf e_i, \mathbf e_j).$$

:::misol
$B(\mathbf x, \mathbf y) = x_1y_1 - x_1y_2 - 3x_2y_1$, $B = \begin{pmatrix} 1 & -1\\ -3 & 0\end{pmatrix}$. $\mathbf x = (-3, -1)$, $\mathbf y = (3, 2)$:
$$B(\mathbf x, \mathbf y) = -9 + 6 + 9 = 6.$$
:::

:::tarif
$B(\mathbf x, \mathbf y) = B(\mathbf y, \mathbf x)$ — **simmetrik** forma $\iff$ $B^T = B$.
:::

Skalyar ko'paytma — simmetrik bichiziqli forma ($B = E$ standart holda).

## 13.3. Bazis almashganda

$X = TX'$, $Y = TY'$ bo'lsa:
$$B(\mathbf x, \mathbf y) = X'^T(T^TBT)Y'.$$

:::xossa
Yangi bazisda bichiziqli forma matritsasi $B' = T^TBT$. Rang o'zgarmaydi: $r(B') = r(B)$ — u **forma rangi** deyiladi.
:::

:::diqqat
Solishtiring: chiziqli almashtirish matritsasi $T^{-1}AT$ qoida bo'yicha o'zgaradi (17-mavzu). Ortogonal $T$ uchun ($T^{-1} = T^T$) ikki qoida ustma-ust tushadi.
:::

## 13.4. Kvadratik forma

:::tarif
Simmetrik bichiziqli formada $\mathbf y = \mathbf x$ desak — **kvadratik forma**:
$$f(\mathbf x) = \sum_{i,j=1}^n a_{ij}x_ix_j = X^TAX,\qquad A^T = A.$$
$A$ — formaning matritsasi, $r(A)$ — rangi.
:::

:::diqqat
$x_i^2$ oldidagi koeffitsiyent — $a_{ii}$; $x_ix_j$ ($i \ne j$) oldidagi koeffitsiyent **ikkiga bo'linib**, $a_{ij}$ va $a_{ji}$ ga yoziladi.
:::

:::misol
$f = 3x_1^2 - 2x_2^2 + x_3^2 + 4x_1x_2 - 6x_2x_3$:
$$A = \begin{pmatrix} 3 & 2 & 0\\ 2 & -2 & -3\\ 0 & -3 & 1\end{pmatrix}.$$
$f(1, 1, 1) = 3 - 2 + 1 + 4 - 6 = 0$.
:::

:::savol
$f = x_1^2 + 6x_1x_2 - 5x_2^2$ matritsasida $a_{12}$ = ?
- 6
+ 3
- −5
- 1
:::

Har bir simmetrik bichiziqli forma kvadratik formani beradi va aksincha (**qutblashtirish**):
$$B(\mathbf x, \mathbf y) = \tfrac12\big(f(\mathbf x + \mathbf y) - f(\mathbf x) - f(\mathbf y)\big).$$

## 13.5. Qayerda uchraydi?

- **Ikkinchi tartibli chiziq va sirtlar** (2-semestr): bosh qism $ax^2 + 2bxy + cy^2$ — kvadratik forma.
- **Ko'p o'zgaruvchili funksiya ekstremumi:** ikkinchi differensial $d^2f$ — Gesse matritsali kvadratik forma.
- **Mexanika:** kinetik energiya $T = \frac12\sum m_{ij}\dot q_i\dot q_j$.
- **Statistika:** dispersiya $\operatorname{Var}(\mathbf w^TX) = \mathbf w^T\Sigma\mathbf w$.

:::savol
$A = \begin{pmatrix} 1 & -2\\ -2 & 4\end{pmatrix}$ matritsali forma qaysi?
+ $x^2 - 4xy + 4y^2$
- $x^2 - 2xy + 4y^2$
- $x^2 + 4y^2$
- $x^2 - 4xy - 4y^2$
> Bu $(x - 2y)^2$, rangi 1.
:::

:::tarix
Kvadratik formalar nazariyasini J. Lagranj, K. F. Gauss («Arifmetik tadqiqotlar», 1801) va J. Silvestr rivojlantirgan.
:::
