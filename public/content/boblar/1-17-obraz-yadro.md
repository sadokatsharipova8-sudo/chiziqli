# 17-mavzu. Chiziqli almashtirishning obrazi, yadrosi. Turli bazislardagi matritsalar orasidagi bog'lanish

**Bu mavzuda:** obraz va yadro, rang va defekt, rang + defekt = o'lcham teoremasi, bazis almashganda operator matritsasi, o'xshash matritsalar va invariantlar.

## 17.1. Obraz va yadro

:::tarif
- $\operatorname{Im}\mathcal A = \{\mathcal A\mathbf x : \mathbf x \in V\}$ — **obraz** (tasvir);
- $\ker\mathcal A = \{\mathbf x : \mathcal A\mathbf x = \mathbf 0\}$ — **yadro**.
:::

:::teorema
$\operatorname{Im}\mathcal A$ va $\ker\mathcal A$ — qism fazolar.
:::

Isbot (yadro uchun): $\mathcal A\mathbf x = \mathcal A\mathbf y = \mathbf 0 \Rightarrow \mathcal A(\alpha\mathbf x + \beta\mathbf y) = \mathbf 0$.

- $\dim\operatorname{Im}\mathcal A$ — operator **rangi**;
- $\dim\ker\mathcal A$ — operator **defekti**.

**Hisoblash:** $\operatorname{Im}\mathcal A = L(A$ ning ustunlari$)$, shuning uchun $\operatorname{rang}\mathcal A = r(A)$. $\ker\mathcal A$ — $AX = O$ ning yechimlar fazosi, bazisi — FYS (8-mavzu).

## 17.2. Rang + defekt teoremasi

:::teorema
$$\operatorname{rang}\mathcal A + \operatorname{def}\mathcal A = \dim V.$$
:::

Bu 8-mavzudagi faktning operator tilidagi ifodasi: FYS dagi vektorlar soni $n - r$.

:::misol
$\mathcal A\mathbf x = (x_1 + x_2;\ x_2 + x_3;\ x_1 - x_3)$, $A = \begin{pmatrix} 1 & 1 & 0\\ 0 & 1 & 1\\ 1 & 0 & -1\end{pmatrix}$, $\det A = 0$, $r(A) = 2$.

Yadro: $x_1 = -x_2$, $x_3 = -x_2$ $\Rightarrow$ $\ker\mathcal A = L\big((1, -1, 1)\big)$, defekt 1.

Obraz: $A$ ning birinchi ikki ustuni $(1, 0, 1)$, $(1, 1, 0)$ bazis. $2 + 1 = 3$ ✓.
:::

:::xossa
- $\mathcal A$ xosmas $\iff \ker\mathcal A = \{\mathbf 0\} \iff \operatorname{Im}\mathcal A = V$.
- Proyeksiya uchun $V = \operatorname{Im}\mathcal P \oplus \ker\mathcal P$.
- $D$ (differensiallash, $P_n$): $\ker D$ — o'zgarmaslar (1-o'lchamli), $\operatorname{Im} D = P_{n-1}$ ($n$-o'lchamli).
:::

:::savol
$\mathbb R^3$ da operator rangi 2. Defekti?
- 2
+ 1
- 3
- 0
:::

## 17.3. Bazis almashganda operator matritsasi

Eski bazisdan yangisiga o'tish matritsasi $T$ (9-mavzu): $X = TX'$. $Y = AX$ dan $TY' = ATX'$:

:::teorema
$$A' = T^{-1}AT.$$
:::

:::misol
$A = \begin{pmatrix} 4 & 1\\ 2 & 3\end{pmatrix}$, yangi bazis $\mathbf e'_1 = (1, -2)$, $\mathbf e'_2 = (1, 1)$, $T = \begin{pmatrix} 1 & 1\\ -2 & 1\end{pmatrix}$:
$$A' = T^{-1}AT = \frac13\begin{pmatrix} 1 & -1\\ 2 & 1\end{pmatrix}\begin{pmatrix} 4 & 1\\ 2 & 3\end{pmatrix}\begin{pmatrix} 1 & 1\\ -2 & 1\end{pmatrix} = \begin{pmatrix} 2 & 0\\ 0 & 5\end{pmatrix}.$$
Yangi bazisda matritsa **diagonal** bo'ldi — bunday bazisni qanday topish 18-mavzuda.
:::

## 17.4. O'xshash matritsalar va invariantlar

:::tarif
$B = T^{-1}AT$ ($\det T \ne 0$) bo'lsa, $A$ va $B$ **o'xshash** matritsalar: ular bitta operatorni turli bazislarda ifodalaydi.
:::

:::xossa
O'xshash matritsalarda bir xil:
- determinant: $\det(T^{-1}AT) = \det A$;
- iz: $\operatorname{tr}(T^{-1}AT) = \operatorname{tr}A$;
- rang;
- xarakteristik ko'phad $\det(A - \lambda E)$ (18-mavzu).
:::

Bu kattaliklar bazisga bog'liq emas — ular operatorning o'zining **invariantlari**. Masalan, yuqoridagi misolda $\det A = 10 = 2\cdot 5$, $\operatorname{tr}A = 7 = 2 + 5$ ✓.

:::savol
$\operatorname{tr}A = 6$, $A' = T^{-1}AT$. $\operatorname{tr}A'$ = ?
- 0
+ 6
- $6\det T$
- aniqlab bo'lmaydi
:::

:::diqqat
Operator matritsasi $T^{-1}AT$, bichiziqli forma matritsasi esa $T^TBT$ bo'yicha o'zgaradi (13-mavzu). Ortogonal $T$ da ular bir xil.
:::

:::tarix
Rang va defekt teoremasini ba'zan «o'lchamlar haqidagi asosiy teorema» deyishadi; uning cheksiz o'lchamli umumlashmasi — Fredgolm alternativasi (1903).
:::
