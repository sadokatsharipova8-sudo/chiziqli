# 8. Chiziqli fazo, bazis va qism fazolar

**Bu mavzuda:** chiziqli fazo aksiomalari, misollar, qism fazo va chiziqli qobiq, bazis va o'lchov, vektor koordinatalari, bir bazisdan boshqasiga o'tish matritsasi, qism fazolar yig'indisi va kesishmasi.

## 8.1. Chiziqli fazo ta'rifi

:::tarif
Elementlari uchun qo'shish ($\mathbf x + \mathbf y$) va songa ko'paytirish ($\lambda\mathbf x$) amallari aniqlangan $V$ to'plam quyidagi 8 aksioma bajarilganda **chiziqli (vektor) fazo** deyiladi:
1. $\mathbf x + \mathbf y = \mathbf y + \mathbf x$;
2. $(\mathbf x + \mathbf y) + \mathbf z = \mathbf x + (\mathbf y + \mathbf z)$;
3. shunday $\mathbf 0$ mavjudki, $\mathbf x + \mathbf 0 = \mathbf x$;
4. har bir $\mathbf x$ uchun $-\mathbf x$ mavjudki, $\mathbf x + (-\mathbf x) = \mathbf 0$;
5. $1\cdot\mathbf x = \mathbf x$;
6. $\alpha(\beta\mathbf x) = (\alpha\beta)\mathbf x$;
7. $(\alpha + \beta)\mathbf x = \alpha\mathbf x + \beta\mathbf x$;
8. $\alpha(\mathbf x + \mathbf y) = \alpha\mathbf x + \alpha\mathbf y$.
:::

Sonlar haqiqiy bo'lsa — **haqiqiy**, kompleks bo'lsa — **kompleks** chiziqli fazo.

**Misollar:**
- $\mathbb R^n$ — arifmetik fazo (6-mavzu);
- tekislik yoki fazodagi geometrik vektorlar $V_2$, $V_3$ (12-mavzu);
- $m\times n$ o'lchamli matritsalar fazosi $M_{m\times n}$;
- darajasi $n$ dan oshmaydigan ko'phadlar fazosi $P_n$;
- $[a, b]$ da uzluksiz funksiyalar fazosi $C[a, b]$;
- bir jinsli chiziqli sistemaning yechimlari to'plami.

:::savol
Quyidagi to'plamlardan qaysi biri (odatiy amallarga nisbatan) chiziqli fazo **emas**?
- Darajasi $\le 3$ bo'lgan ko'phadlar
- $2\times 2$ simmetrik matritsalar
+ Darajasi aynan 3 ga teng ko'phadlar
- $x_1 + x_2 = 0$ shartni qanoatlantiruvchi $\mathbb R^2$ vektorlari
> $x^3 + x$ va $-x^3$ yig'indisi $x$ — darajasi 3 emas; nol ko'phad ham bu to'plamga kirmaydi.
:::

## 8.2. Qism fazo. Chiziqli qobiq

:::tarif
$V$ ning qo'shish va songa ko'paytirishga nisbatan yopiq bo'sh bo'lmagan $L$ qism to'plami **qism fazo** deyiladi:
$$\mathbf x, \mathbf y \in L \Rightarrow \alpha\mathbf x + \beta\mathbf y \in L.$$
:::

:::tarif
$\mathbf a_1, \dots, \mathbf a_k$ vektorlarning barcha chiziqli kombinatsiyalari to'plami ularning **chiziqli qobig'i** deyiladi:
$$L(\mathbf a_1, \dots, \mathbf a_k) = \{\lambda_1\mathbf a_1 + \dots + \lambda_k\mathbf a_k\}.$$
Bu — $\mathbf a_1, \dots, \mathbf a_k$ ni o'z ichiga oluvchi eng kichik qism fazo.
:::

Masalan, $\mathbb R^3$ da qism fazolar: $\{\mathbf 0\}$, koordinata boshidan o'tuvchi to'g'ri chiziqlar va tekisliklar, $\mathbb R^3$ ning o'zi.

## 8.3. Bazis va o'lchov

:::tarif
$V$ ning chiziqli erkli va $V$ ning har bir vektorini chiziqli ifodalaydigan (to'liq) $\mathbf e_1, \dots, \mathbf e_n$ sistemasi **bazis** deyiladi. Bazisdagi vektorlar soni fazoning **o'lchovi**: $\dim V = n$.
:::

:::teorema
Chekli o'lchovli fazoning barcha bazislari bir xil sondagi vektorlardan iborat. $n$-o'lchovli fazoda istalgan $n$ ta chiziqli erkli vektor bazis tashkil etadi.
:::

:::xossa
$\dim\mathbb R^n = n$ (standart bazis $\mathbf e_1 = (1, 0, \dots, 0), \dots$); $\ \dim P_n = n + 1$ (bazis $1, t, \dots, t^n$); $\ \dim M_{m\times n} = mn$; $\ \dim L(\mathbf a_1, \dots, \mathbf a_k) = r(\mathbf a_1, \dots, \mathbf a_k)$.
:::

:::savol
$2\times 2$ matritsalar fazosining o'lchovi nechaga teng?
- 2
+ 4
- 1
- 8
:::

## 8.4. Vektor koordinatalari

:::teorema
Har bir $\mathbf x \in V$ bazis bo'yicha **yagona** usulda yoyiladi:
$$\mathbf x = x_1\mathbf e_1 + x_2\mathbf e_2 + \dots + x_n\mathbf e_n.$$
$(x_1, \dots, x_n)$ sonlar $\mathbf x$ ning shu bazisdagi **koordinatalari**.
:::

Koordinatalar orqali vektorlar ustidagi amallar arifmetik vektorlar ustidagi amallarga aylanadi: har qanday $n$-o'lchovli haqiqiy fazo $\mathbb R^n$ ga **izomorf**.

:::misol
$\mathbb R^2$ da $\mathbf e_1 = (1, 1)$, $\mathbf e_2 = (1, -1)$ bazisda $\mathbf x = (5, 1)$ ning koordinatalari: $x_1 + x_2 = 5$, $x_1 - x_2 = 1$, demak $x_1 = 3$, $x_2 = 2$: $\mathbf x = 3\mathbf e_1 + 2\mathbf e_2$.
:::

## 8.5. Bazisni almashtirish

$\mathbf e_1, \dots, \mathbf e_n$ (eski) va $\mathbf e'_1, \dots, \mathbf e'_n$ (yangi) bazislar berilgan, $\mathbf e'_j = \sum_i t_{ij}\mathbf e_i$.

:::tarif
$j$-ustuni $\mathbf e'_j$ ning eski bazisdagi koordinatalaridan iborat $T = (t_{ij})$ matritsa eski bazisdan yangisiga **o'tish matritsasi** deyiladi. U doim xosmas: $\det T \ne 0$.
:::

:::teorema
Vektor koordinatalari quyidagicha bog'langan:
$$X = TX',\qquad X' = T^{-1}X,$$
bunda $X$ — eski, $X'$ — yangi bazisdagi koordinatalar ustuni.
:::

:::diqqat
Bazis vektorlari $T$ orqali, koordinatalar esa $T^{-1}$ orqali almashadi — koordinatalar bazisga «qarama-qarshi» (kontravariant) o'zgaradi.
:::

## 8.6. Qism fazolar yig'indisi va kesishmasi

:::tarif
$L_1 + L_2 = \{\mathbf x_1 + \mathbf x_2 : \mathbf x_1 \in L_1, \mathbf x_2 \in L_2\}$ — **yig'indi**; $L_1 \cap L_2$ — **kesishma**. Ikkalasi ham qism fazo. $L_1 \cap L_2 = \{\mathbf 0\}$ bo'lsa, yig'indi **to'g'ri yig'indi** deyiladi: $L_1 \oplus L_2$.
:::

:::teorema Grassman formulasi
$$\dim(L_1 + L_2) = \dim L_1 + \dim L_2 - \dim(L_1 \cap L_2).$$
:::

:::misol
$\mathbb R^3$ da ikki turli tekislik (koordinata boshidan o'tuvchi): $\dim L_1 = \dim L_2 = 2$, $L_1 + L_2 = \mathbb R^3$, demak $\dim(L_1 \cap L_2) = 2 + 2 - 3 = 1$ — ular to'g'ri chiziq bo'ylab kesishadi.
:::

:::savol
$\mathbb R^4$ da $\dim L_1 = 3$, $\dim L_2 = 2$, $L_1 + L_2 = \mathbb R^4$. $\dim(L_1 \cap L_2)$ nechaga teng?
- 0
+ 1
- 2
- 5
> $3 + 2 - 4 = 1$.
:::

:::tarix
Chiziqli fazoning aksiomatik ta'rifini G. Peano (1888) bergan; o'lchov formulasi H. Grassman (1844) nomi bilan bog'liq.
:::
