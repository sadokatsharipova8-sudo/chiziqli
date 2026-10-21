# 11. Chiziqli almashtirishlar. Xos son va xos vektorlar

**Bu mavzuda:** chiziqli operator va uning matritsasi, bazis almashganda matritsaning o'zgarishi, yadro va obraz, xos son va xos vektorlar, xarakteristik ko'phad, diagonallashtirish, qo'shma, o'z-o'ziga qo'shma va ortogonal operatorlar.

## 11.1. Chiziqli operator

:::tarif
$V$ fazoni o'ziga akslantiruvchi $\mathcal A$ akslantirish
$$\mathcal A(\alpha\mathbf x + \beta\mathbf y) = \alpha\mathcal A\mathbf x + \beta\mathcal A\mathbf y$$
shartni qanoatlantirsa, **chiziqli operator** (chiziqli almashtirish) deyiladi.
:::

**Misollar:** tekislikni burish, o'qqa proyeksiyalash, simmetriya, cho'zish; ko'phadni differensiallash $P_n \to P_n$; nol va ayniy operatorlar.

:::tarif
$\mathcal A\mathbf e_j = \sum_i a_{ij}\mathbf e_i$ bo'lsin. $j$-ustuni $\mathcal A\mathbf e_j$ ning koordinatalaridan iborat $A = (a_{ij})$ matritsa operatorning $\mathbf e$ bazisdagi **matritsasi** deyiladi. Bunda $Y = AX$, ya'ni $\mathbf y = \mathcal A\mathbf x$ ning koordinatalari.
:::

:::misol
Tekislikni $\varphi$ burchakka burish operatorining standart bazisdagi matritsasi:
$$A = \begin{pmatrix} \cos\varphi & -\sin\varphi\\ \sin\varphi & \cos\varphi\end{pmatrix}.$$
$P_2$ da differensiallash operatori ($1, t, t^2$ bazis): $D1 = 0$, $Dt = 1$, $Dt^2 = 2t$, demak $D = \begin{pmatrix} 0 & 1 & 0\\ 0 & 0 & 2\\ 0 & 0 & 0\end{pmatrix}$.
:::

Operatorlar ko'paytmasiga (ketma-ket bajarish) matritsalar ko'paytmasi mos keladi.

> 💡 [Laboratoriya → Chiziqli almashtirish](#/lab/almashtirish) da $2\times 2$ matritsa tekislikni qanday o'zgartirishini jonli kuzating.

## 11.2. Bazis almashganda operator matritsasi

:::teorema
$T$ — eski bazisdan yangisiga o'tish matritsasi bo'lsa, operatorning yangi bazisdagi matritsasi
$$A' = T^{-1}AT.$$
:::

$A$ va $T^{-1}AT$ ko'rinishdagi matritsalar **o'xshash** deyiladi. O'xshash matritsalarning determinanti, izi ($\operatorname{tr}A = \sum a_{ii}$), rangi va xarakteristik ko'phadi bir xil — ular operatorning **invariantlari**.

## 11.3. Yadro va obraz

:::tarif
$\ker\mathcal A = \{\mathbf x : \mathcal A\mathbf x = \mathbf 0\}$ — **yadro**, $\operatorname{Im}\mathcal A = \{\mathcal A\mathbf x\}$ — **obraz** (tasvir). Ikkalasi qism fazo. $\dim\operatorname{Im}\mathcal A$ — operator **rangi**, $\dim\ker\mathcal A$ — **defekti**.
:::

:::teorema
$$\dim\operatorname{Im}\mathcal A + \dim\ker\mathcal A = \dim V,\qquad \dim\operatorname{Im}\mathcal A = r(A).$$
:::

:::misol
$\mathcal A\mathbf x = (x_1 + x_2;\ x_2 + x_3;\ x_1 - x_3)$, $A = \begin{pmatrix} 1 & 1 & 0\\ 0 & 1 & 1\\ 1 & 0 & -1\end{pmatrix}$, $\det A = 0$, $r(A) = 2$.

Yadro: $x_1 = -x_2$, $x_3 = -x_2$, ya'ni $\ker\mathcal A = L\big((1, -1, 1)\big)$, defekt 1. Rang + defekt $= 2 + 1 = 3$ ✓.
:::

## 11.4. Xos son va xos vektorlar

:::tarif
$\mathcal A\mathbf x = \lambda\mathbf x$, $\mathbf x \ne \mathbf 0$ bo'lsa, $\lambda$ — operatorning **xos soni**, $\mathbf x$ — unga mos **xos vektor**.
:::

Xos vektor operator ta'sirida faqat cho'ziladi yoki qisqaradi (yo'nalishi saqlanadi yoki teskarisiga o'zgaradi).

$(A - \lambda E)X = O$ bir jinsli sistema notrivial yechimga ega bo'lishi uchun:

:::teorema Xarakteristik tenglama
$$\det(A - \lambda E) = 0.$$
Chap tomon — $n$-darajali **xarakteristik ko'phad**. Uning ildizlari — xos sonlar. Xususan $\lambda_1 + \dots + \lambda_n = \operatorname{tr}A$, $\ \lambda_1\cdots\lambda_n = \det A$.
:::

**Algoritm:** 1) xarakteristik tenglamani yechib, $\lambda_i$ ni topish; 2) har bir $\lambda_i$ uchun $(A - \lambda_iE)X = O$ sistemaning FYS ini topish — bu xos vektorlar.

:::misol
$A = \begin{pmatrix} 4 & 1\\ 2 & 3\end{pmatrix}$: $\ \begin{vmatrix} 4 - \lambda & 1\\ 2 & 3 - \lambda\end{vmatrix} = \lambda^2 - 7\lambda + 10 = 0$, $\lambda_1 = 2$, $\lambda_2 = 5$.

$\lambda_1 = 2$: $\begin{pmatrix} 2 & 1\\ 2 & 1\end{pmatrix}X = O \Rightarrow X_1 = c(1;\ -2)$.

$\lambda_2 = 5$: $\begin{pmatrix} -1 & 1\\ 2 & -2\end{pmatrix}X = O \Rightarrow X_2 = c(1;\ 1)$.
:::

:::misol Kompleks xos sonlar
Xarakteristik ko'phad $\lambda^3 - 5\lambda^2 + 17\lambda - 13$ bo'lsa: $\lambda = 1$ ildiz (koeffitsiyentlar yig'indisi 0); $\lambda - 1$ ga bo'lgandan so'ng $\lambda^2 - 4\lambda + 13 = 0$, $\lambda_{2,3} = 2 \pm 3i$.
:::

:::savol
$A = \begin{pmatrix} 3 & 0\\ 0 & -2\end{pmatrix}$ ning xos sonlari qanday?
+ $3$ va $-2$
- $0$ va $1$
- $1$ va $-6$
- $3$ va $2$
> Diagonal matritsaning xos sonlari — diagonal elementlari.
:::

:::savol
$3\times 3$ matritsada $\operatorname{tr}A = 6$, ikki xos son $1$ va $2$. Uchinchisi nechaga teng?
- 2
+ 3
- 6
- 0
:::

## 11.5. Diagonallashtirish. Invariant qism fazolar

:::teorema
Har xil xos sonlarga mos xos vektorlar chiziqli erkli. $V$ da xos vektorlardan iborat bazis mavjud bo'lsa, shu bazisda operator matritsasi **diagonal**: $T^{-1}AT = \operatorname{diag}(\lambda_1, \dots, \lambda_n)$, bunda $T$ ning ustunlari — xos vektorlar.
:::

Xususan, $n$ ta har xil xos son bo'lsa, matritsa diagonallashadi. Bu $A^k$ ni oson hisoblash imkonini beradi: $A^k = TD^kT^{-1}$.

:::tarif
$\mathcal A L \subset L$ bo'lsa, $L$ — **invariant qism fazo**. Har bir xos vektor bir o'lchovli invariant qism fazoni hosil qiladi.
:::

## 11.6. Yevklid fazosidagi operatorlar

:::tarif
$(\mathcal A\mathbf x, \mathbf y) = (\mathbf x, \mathcal A^*\mathbf y)$ shartni qanoatlantiruvchi $\mathcal A^*$ — **qo'shma** operator; ortonormal bazisda $A^* = A^T$ (kompleks holda $\bar A^T$).
- $\mathcal A^* = \mathcal A$ — **o'z-o'ziga qo'shma** (simmetrik) operator;
- $\mathcal A^*\mathcal A = \mathcal E$ — **ortogonal** (kompleks holda **unitar**) operator, uzunlik va burchaklarni saqlaydi;
- $\mathcal A^*\mathcal A = \mathcal A\mathcal A^*$ — **normal** operator.
:::

:::teorema
O'z-o'ziga qo'shma operatorning barcha xos sonlari haqiqiy, har xil xos sonlarga mos xos vektorlari ortogonal, va xos vektorlaridan **ortonormal bazis** tuzish mumkin. Ya'ni har qanday simmetrik matritsa ortogonal almashtirish bilan diagonallashadi.
:::

Bu teorema 10-mavzudagi kvadratik formani ortogonal almashtirish bilan kanonik ko'rinishga keltirishning asosidir.

:::savol
Ortogonal matritsaning determinanti qanday qiymatlar qabul qilishi mumkin?
- Faqat 1
+ $1$ yoki $-1$
- Istalgan musbat son
- 0
> $\det(A^TA) = (\det A)^2 = 1$.
:::

:::tarix
«Xos son» (nemischa *Eigenwert*) atamasi D. Gilbert (1904) ishlaridan keng tarqalgan. Simmetrik matritsalarning xos sonlari haqiqiyligini O. Koshi (1829) isbotlagan.
:::
