# 2. Matritsalar va o'rin almashtirishlar

**Bu mavzuda:** matritsa turlari, matritsalar ustida amallar, transponirlash, o'rin almashtirishlar va inversiyalar, juft va toq o'rin almashtirishlar.

## 2.1. Matritsa tushunchasi

:::tarif
$m$ ta satr va $n$ ta ustundan iborat sonlar jadvali $m\times n$ o'lchamli **matritsa** deyiladi:
$$A = \begin{pmatrix} a_{11} & a_{12} & \dots & a_{1n}\\ a_{21} & a_{22} & \dots & a_{2n}\\ \vdots & & & \vdots\\ a_{m1} & a_{m2} & \dots & a_{mn}\end{pmatrix} = (a_{ij}).$$
$a_{ij}$ — $i$-satr va $j$-ustun kesishmasidagi element.
:::

**Matritsa turlari:**
- $m = n$ — **kvadrat** matritsa ($n$-tartibli); $a_{11}, a_{22}, \dots, a_{nn}$ — bosh diagonal;
- $1\times n$ — satr-matritsa, $m\times 1$ — ustun-matritsa (vektor);
- **diagonal**: bosh diagonaldan tashqari elementlar nol; **skalyar**: diagonal elementlari teng;
- **birlik** $E$ (yoki $I$): diagonalda 1, qolgani 0;
- **yuqori (quyi) uchburchak**: bosh diagonaldan pastdagi (yuqoridagi) elementlar nol;
- **nol matritsa** $O$: barcha elementlari nol.

## 2.2. Chiziqli amallar

:::tarif
Bir xil o'lchamli $A$ va $B$ ning **yig'indisi**: $(A + B)_{ij} = a_{ij} + b_{ij}$. Matritsani **songa ko'paytirish**: $(\lambda A)_{ij} = \lambda a_{ij}$.
:::

:::xossa
$A + B = B + A$, $\ (A + B) + C = A + (B + C)$, $\ A + O = A$, $\ (\alpha + \beta)A = \alpha A + \beta A$, $\ \alpha(A + B) = \alpha A + \alpha B$.
:::

## 2.3. Matritsalarni ko'paytirish

:::tarif
$A$ — $m\times n$, $B$ — $n\times p$ bo'lsa, $C = AB$ — $m\times p$ matritsa:
$$c_{ij} = \sum_{k=1}^{n} a_{ik}b_{kj} = a_{i1}b_{1j} + a_{i2}b_{2j} + \dots + a_{in}b_{nj}.$$
Ya'ni $c_{ij}$ — $A$ ning $i$-satri bilan $B$ ning $j$-ustunining «skalyar ko'paytmasi».
:::

**Muhim:** ko'paytma faqat $A$ ning ustunlari soni $B$ ning satrlari soniga teng bo'lganda aniqlangan.

:::misol
$$\begin{pmatrix} 2 & -1 & 3\\ 0 & 4 & -2\end{pmatrix}\begin{pmatrix} 1 & -2\\ -3 & 1\\ 2 & 3\end{pmatrix} = \begin{pmatrix} 2 + 3 + 6 & -4 - 1 + 9\\ 0 - 12 - 4 & 0 + 4 - 6\end{pmatrix} = \begin{pmatrix} 11 & 4\\ -16 & -2\end{pmatrix}.$$
:::

:::diqqat
Umuman olganda $AB \ne BA$. Masalan,
$\begin{pmatrix}1&2\\3&2\end{pmatrix}\begin{pmatrix}1&2\\1&1\end{pmatrix} = \begin{pmatrix}3&4\\5&8\end{pmatrix}$, lekin $\begin{pmatrix}1&2\\1&1\end{pmatrix}\begin{pmatrix}1&2\\3&2\end{pmatrix} = \begin{pmatrix}7&6\\4&4\end{pmatrix}$.
$AB = BA$ bo'lsa, matritsalar **o'rin almashinuvchi** (kommutativ) deyiladi.
:::

:::xossa
$(AB)C = A(BC)$, $\ (A + B)C = AC + BC$, $\ C(A + B) = CA + CB$, $\ AE = EA = A$.
:::

> 💡 [Laboratoriya → Matritsa kalkulyatori](#/lab/kalkulyator) da ko'paytmani bosqichma-bosqich ko'ring.

:::savol
$A$ — $2\times 3$, $B$ — $3\times 4$ matritsa. $AB$ ning o'lchami qanday?
- $3\times 3$
+ $2\times 4$
- $4\times 2$
- Ko'paytma aniqlanmagan
:::

## 2.4. Transponirlash

:::tarif
$A^T$ — satrlari $A$ ning ustunlaridan iborat matritsa: $(A^T)_{ij} = a_{ji}$.
:::

:::xossa
$(A^T)^T = A$, $\ (\alpha A + \beta B)^T = \alpha A^T + \beta B^T$, $\ (AB)^T = B^TA^T$.
:::

$A^T = A$ bo'lsa matritsa **simmetrik**, $A^T = -A$ bo'lsa — **kososimmetrik**. Har qanday kvadrat matritsa yagona usulda simmetrik va kososimmetrik qismlar yig'indisiga yoyiladi: $A = \frac12(A + A^T) + \frac12(A - A^T)$.

## 2.5. Elementar almashtirishlar

Matritsaning **elementar almashtirishlari**:
1. ikki satr (ustun) o'rnini almashtirish;
2. satrni noldan farqli songa ko'paytirish;
3. bir satrga boshqa satrni songa ko'paytirib qo'shish.

Bu almashtirishlar Gauss usuli, rangni topish va teskari matritsani hisoblashning asosi.

## 2.6. O'rin almashtirishlar

:::tarif
$1, 2, \dots, n$ sonlarining ma'lum tartibda joylashuvi $(n_1, n_2, \dots, n_n)$ **o'rin almashtirish** deyiladi. Jami o'rin almashtirishlar soni $P_n = n!$.
:::

:::tarif
$i < j$ bo'lib $n_i > n_j$ bo'lsa, $(n_i, n_j)$ juftlik **inversiya** hosil qiladi. Inversiyalar soni $\sigma(n_1, \dots, n_n)$ juft bo'lsa o'rin almashtirish **juft**, aks holda **toq**.
:::

:::misol
$(3, 1, 4, 2)$ da inversiyalar: $(3,1), (3,2), (4,2)$ — jami 3 ta, demak o'rin almashtirish toq.

Uchta element uchun: $123, 231, 312$ — juft; $321, 213, 132$ — toq.
:::

:::teorema
Ikki elementning o'rnini almashtirish (**transpozitsiya**) o'rin almashtirishning juft-toqligini o'zgartiradi. Shuning uchun $n \ge 2$ da juft va toq o'rin almashtirishlar soni teng: $n!/2$ tadan.
:::

O'rin almashtirishlar keyingi mavzuda $n$-tartibli determinantni aniqlash uchun kerak bo'ladi.

:::savol
$(2, 4, 1, 3)$ o'rin almashtirishda nechta inversiya bor?
- 2
+ 3
- 4
- 1
> $(2,1), (4,1), (4,3)$.
:::

:::savol
$4$ ta elementdan nechta toq o'rin almashtirish tuzish mumkin?
- 24
+ 12
- 6
- 4
> $4!/2 = 12$.
:::

:::tarix
«Matritsa» atamasini 1850-yilda J. Silvestr kiritgan, matritsalar algebrasini A. Keli (1858) yaratgan.
:::
