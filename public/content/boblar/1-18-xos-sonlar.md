# 18-mavzu. Invariant qism fazolar. Chiziqli almashtirishlarning xos son va xos vektorlari

**Bu mavzuda:** invariant qism fazo, xos son va xos vektor, xarakteristik tenglama, xos sonlarni topish algoritmi, diagonallashtirish, simmetrik (o'z-o'ziga qo'shma) operatorlar.

## 18.1. Invariant qism fazolar

:::tarif
$\mathcal A L \subset L$ bo'lsa (ya'ni $\mathbf x \in L \Rightarrow \mathcal A\mathbf x \in L$), $L$ — **invariant qism fazo**.
:::

**Misollar:** $\{\mathbf 0\}$, $V$; $\ker\mathcal A$ va $\operatorname{Im}\mathcal A$; fazoni $Oz$ atrofida burishda $Oz$ o'qi va $Oxy$ tekisligi.

Agar $V = L_1 \oplus L_2$ va ikkalasi invariant bo'lsa, $L_1$, $L_2$ bazislaridan tuzilgan bazisda matritsa **blok-diagonal**: $\begin{pmatrix} A_1 & O\\ O & A_2\end{pmatrix}$. Eng sodda holat — **bir o'lchamli** invariant qism fazolar.

## 18.2. Xos son va xos vektor

:::tarif
$$\mathcal A\mathbf x = \lambda\mathbf x,\qquad \mathbf x \ne \mathbf 0.$$
$\lambda$ — **xos son**, $\mathbf x$ — unga mos **xos vektor**.
:::

$L(\mathbf x)$ — bir o'lchamli invariant qism fazo. Geometrik: operator xos vektorni burmaydi, faqat $\lambda$ marta cho'zadi.

:::misol
- $Ox$ ga proyeksiya: $\mathbf i$ ($\lambda = 1$), $\mathbf j$ ($\lambda = 0$).
- $Ox$ ga nisbatan simmetriya: $\mathbf i$ ($\lambda = 1$), $\mathbf j$ ($\lambda = -1$).
- $90^\circ$ ga burish: haqiqiy xos vektor yo'q ($\lambda = \pm i$).
:::

## 18.3. Xarakteristik tenglama

$\mathcal A\mathbf x = \lambda\mathbf x \iff (A - \lambda E)X = O$ — notrivial yechim mavjud $\iff$
$$\det(A - \lambda E) = 0.$$

$\det(A - \lambda E)$ — **xarakteristik ko'phad** ($n$-darajali, o'xshash matritsalarda bir xil).

:::xossa
$\lambda_1 + \dots + \lambda_n = \operatorname{tr}A$, $\quad\lambda_1\cdots\lambda_n = \det A$. $2\times2$ uchun: $\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0$.
:::

**Algoritm:** 1) xarakteristik tenglamani yechish; 2) har bir $\lambda_i$ uchun $(A - \lambda_iE)X = O$ ning FYS ini topish.

:::misol
$A = \begin{pmatrix} 4 & 1\\ 2 & 3\end{pmatrix}$: $\lambda^2 - 7\lambda + 10 = 0$, $\lambda_1 = 2$, $\lambda_2 = 5$.

$\lambda_1 = 2$: $2x_1 + x_2 = 0 \Rightarrow X_1 = c(1;\ -2)$. $\quad\lambda_2 = 5$: $x_1 = x_2 \Rightarrow X_2 = c(1;\ 1)$.
:::

:::misol Kompleks xos sonlar
Xarakteristik ko'phad $\lambda^3 - 5\lambda^2 + 17\lambda - 13$: $\lambda = 1$ ildiz; $\lambda - 1$ ga bo'lsak $\lambda^2 - 4\lambda + 13$, $\lambda_{2,3} = 2 \pm 3i$.
:::

:::savol
$\begin{pmatrix} 3 & 0\\ 0 & -2\end{pmatrix}$ ning xos sonlari?
+ $3$ va $-2$
- $0$ va $1$
- $1$ va $-6$
- $3$ va $2$
:::

## 18.4. Diagonallashtirish

:::teorema
Har xil xos sonlarga mos xos vektorlar chiziqli erkli.
:::

Xos vektorlardan bazis tuzish mumkin bo'lsa, shu bazisda $T^{-1}AT = \operatorname{diag}(\lambda_1, \dots, \lambda_n)$ ($T$ ustunlari — xos vektorlar). $n$ ta har xil xos son — yetarli shart. Tatbiq: $A^k = TD^kT^{-1}$.

:::misol Diagonallashmaydigan matritsa
$A = \begin{pmatrix} 1 & 1\\ 0 & 1\end{pmatrix}$: $\lambda = 1$ (ikki karrali), xos yo'nalish faqat $(1, 0)$ — bazis tuzib bo'lmaydi.
:::

## 18.5. Simmetrik operatorlar

:::tarif
$(\mathcal A\mathbf x, \mathbf y) = (\mathbf x, \mathcal A\mathbf y)$ — **o'z-o'ziga qo'shma** (simmetrik) operator; ortonormal bazisda $A^T = A$ (kompleks holda $A^* = A$).
:::

:::teorema
O'z-o'ziga qo'shma operator uchun:
1. barcha xos sonlar **haqiqiy**;
2. har xil xos sonlarga mos xos vektorlar **ortogonal**;
3. xos vektorlardan **ortonormal bazis** tuzish mumkin: $Q^TAQ = D$.
:::

Bu teorema 14-mavzudagi kvadratik formani ortogonal almashtirish bilan kanonik ko'rinishga keltirish va 2-semestrdagi ikkinchi tartibli chiziq va sirtlarni soddalashtirishning asosi.

:::savol
$3\times3$ matritsada $\operatorname{tr}A = 6$, ikki xos son $1$ va $2$. Uchinchisi?
- 2
+ 3
- 6
- 0
:::

**Tatbiqlar:** Google PageRank (katta matritsaning xos vektori), tebranishlarning xos chastotalari, bosh komponentalar tahlili (PCA), kvant mexanikasida o'lchanadigan kattaliklar.

:::tarix
«Xos son» (*Eigenwert*) atamasi D. Gilbert (1904) ishlaridan tarqalgan. Simmetrik matritsalar xos sonlarining haqiqiyligini O. Koshi (1829) isbotlagan.
:::
