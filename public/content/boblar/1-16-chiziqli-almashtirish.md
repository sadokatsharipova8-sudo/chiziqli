# 16-mavzu. Chiziqli almashtirishlar va ularning matritsasi. Qo'shish va ko'paytirish

**Bu mavzuda:** chiziqli almashtirish (operator) ta'rifi va misollar, operator matritsasi, koordinatalarda $Y = AX$, operatorlarni qo'shish, songa ko'paytirish va ko'paytirish, teskari operator.

## 16.1. Chiziqli almashtirish

:::tarif
$V$ ni o'ziga akslantiruvchi $\mathcal A$
$$\mathcal A(\alpha\mathbf x + \beta\mathbf y) = \alpha\mathcal A\mathbf x + \beta\mathcal A\mathbf y$$
shartni qanoatlantirsa — **chiziqli almashtirish** (chiziqli operator).
:::

Natija: $\mathcal A\mathbf 0 = \mathbf 0$; to'g'ri chiziqlar to'g'ri chiziqqa (yoki nuqtaga) o'tadi.

**Misollar:**
- tekislikni $\varphi$ burchakka **burish**;
- o'qqa **proyeksiyalash**, o'qqa nisbatan **simmetriya**;
- $k$ marta **cho'zish** (gomotetiya) $\mathcal A\mathbf x = k\mathbf x$;
- ko'phadni **differensiallash** $D: P_n \to P_n$;
- nol $\mathcal O$ va ayniy $\mathcal E$ operatorlar.

**Chiziqli emas:** siljitish $\mathbf x \mapsto \mathbf x + \mathbf a$ ($\mathbf a \ne \mathbf 0$), chunki $\mathbf 0 \mapsto \mathbf a$.

## 16.2. Operator matritsasi

Chiziqli operator bazis vektorlari obrazlari bilan to'liq aniqlanadi: $\mathcal A\mathbf x = \sum x_j\mathcal A\mathbf e_j$.

:::tarif
$\mathcal A\mathbf e_j = \sum_i a_{ij}\mathbf e_i$. $j$-ustuni $\mathcal A\mathbf e_j$ ning koordinatalaridan iborat $A = (a_{ij})$ — operator **matritsasi**.
:::

:::teorema
$\mathbf y = \mathcal A\mathbf x$ bo'lsa, koordinatalarda $Y = AX$.
:::

:::misol
Burish: $\mathcal A\mathbf i = (\cos\varphi, \sin\varphi)$, $\mathcal A\mathbf j = (-\sin\varphi, \cos\varphi)$:
$$A = \begin{pmatrix} \cos\varphi & -\sin\varphi\\ \sin\varphi & \cos\varphi\end{pmatrix}.$$

Differensiallash ($P_2$, bazis $1, t, t^2$): $D1 = 0$, $Dt = 1$, $Dt^2 = 2t$:
$$D = \begin{pmatrix} 0 & 1 & 0\\ 0 & 0 & 2\\ 0 & 0 & 0\end{pmatrix}.$$
$p = 3 - 2t + 5t^2$: $D\cdot(3, -2, 5)^T = (-2, 10, 0)^T$, ya'ni $p' = -2 + 10t$ ✓.
:::

:::misol
$Ox$ o'qqa proyeksiya: $\begin{pmatrix} 1 & 0\\ 0 & 0\end{pmatrix}$; $Ox$ ga nisbatan simmetriya: $\begin{pmatrix} 1 & 0\\ 0 & -1\end{pmatrix}$; $y = x$ ga nisbatan simmetriya: $\begin{pmatrix} 0 & 1\\ 1 & 0\end{pmatrix}$.
:::

:::savol
$\begin{pmatrix} 0 & -1\\ 1 & 0\end{pmatrix}$ qanday almashtirish?
- O'qqa nisbatan simmetriya
+ $90^\circ$ ga burish
- Siljitish
- Proyeksiya
:::

> 💡 [Laboratoriya → Chiziqli almashtirish](#/lab/almashtirish) da matritsa tekislikni qanday o'zgartirishini jonli kuzating.

## 16.3. Operatorlar ustida amallar

:::tarif
- **Yig'indi:** $(\mathcal A + \mathcal B)\mathbf x = \mathcal A\mathbf x + \mathcal B\mathbf x$;
- **songa ko'paytirish:** $(\lambda\mathcal A)\mathbf x = \lambda(\mathcal A\mathbf x)$;
- **ko'paytma** (ketma-ket bajarish): $(\mathcal A\mathcal B)\mathbf x = \mathcal A(\mathcal B\mathbf x)$ — avval $\mathcal B$, keyin $\mathcal A$.
:::

:::teorema
Bir bazisda: $\mathcal A + \mathcal B \leftrightarrow A + B$, $\ \lambda\mathcal A \leftrightarrow \lambda A$, $\ \mathcal A\mathcal B \leftrightarrow AB$.
:::

Bu — matritsalar ko'paytmasi ta'rifining asl ma'nosi: **almashtirishlarni ketma-ket bajarish**. Shuning uchun $AB \ne BA$ (avval buramiz, keyin cho'zamiz — yoki aksincha — natija turlicha bo'lishi mumkin).

:::misol
$\mathcal A$ — $90^\circ$ ga burish, $\mathcal B$ — $Ox$ ga nisbatan simmetriya:
$$AB = \begin{pmatrix} 0 & -1\\ 1 & 0\end{pmatrix}\begin{pmatrix} 1 & 0\\ 0 & -1\end{pmatrix} = \begin{pmatrix} 0 & 1\\ 1 & 0\end{pmatrix},\qquad BA = \begin{pmatrix} 0 & -1\\ -1 & 0\end{pmatrix}.$$
$\mathcal A\mathcal B$ — $y = x$ ga nisbatan simmetriya, $\mathcal B\mathcal A$ — $y = -x$ ga nisbatan simmetriya.
:::

Chiziqli operatorlar to'plami o'zi ham chiziqli fazo ($n^2$ o'lchamli) va ko'paytmaga nisbatan **algebra** tashkil etadi.

## 16.4. Teskari operator

:::tarif
$\mathcal A\mathcal A^{-1} = \mathcal A^{-1}\mathcal A = \mathcal E$ bo'lsa, $\mathcal A^{-1}$ — **teskari** operator.
:::

:::teorema
$\mathcal A^{-1}$ mavjud $\iff \det A \ne 0$ (operator **xosmas**); uning matritsasi $A^{-1}$. $(\mathcal A\mathcal B)^{-1} = \mathcal B^{-1}\mathcal A^{-1}$.
:::

Masalan, $\varphi$ ga burishning teskarisi — $-\varphi$ ga burish; proyeksiyaning teskarisi yo'q ($\det = 0$).

:::savol
Proyeksiya operatori $\mathcal P$ uchun $\mathcal P^2$ = ?
- $\mathcal O$
+ $\mathcal P$
- $\mathcal E$
- $-\mathcal P$
> Proyeksiyani ikki marta bajarish birinchisidan farq qilmaydi.
:::

:::tarix
Chiziqli almashtirishlar va ularning matritsalari g'oyasi A. Keli (1858) ishlarida shakllangan: u matritsalar ko'paytmasini aynan almashtirishlar kompozitsiyasi sifatida kiritgan.
:::
