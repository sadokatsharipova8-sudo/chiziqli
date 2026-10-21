# 6-mavzu. n-o'lchamli arifmetik fazo. Chiziqli bog'liq va chiziqli erkli vektorlar

**Bu mavzuda:** $n$-o'lchovli arifmetik vektor, $\mathbb R^n$ dagi amallar va ularning xossalari, chiziqli kombinatsiya, chiziqli bog'liq va erkli sistemalar ta'rifi, ularni tekshirish usullari.

## 6.1. Arifmetik vektor

:::tarif
$n$ ta haqiqiy sonning tartiblangan to'plami
$$\mathbf a = (a_1, a_2, \dots, a_n)$$
**$n$-o'lchovli arifmetik vektor** deyiladi; $a_i$ — uning $i$-**komponentasi**. Ikki vektor barcha komponentalari mos ravishda teng bo'lgandagina teng.
:::

Arifmetik vektorlar hamma joyda uchraydi:
- matritsaning satrlari va ustunlari;
- chiziqli tenglama $a_1x_1 + \dots + a_nx_n = b$ — unga $(a_1, \dots, a_n, b)$ vektor mos keladi;
- talabaning $n$ ta fandan baholari, $n$ ta mahsulot narxi — iqtisodiyotdagi «narxlar vektori».

## 6.2. Amallar va xossalar

$$\mathbf a + \mathbf b = (a_1 + b_1, \dots, a_n + b_n),\qquad \lambda\mathbf a = (\lambda a_1, \dots, \lambda a_n).$$

:::xossa
1. $\mathbf a + \mathbf b = \mathbf b + \mathbf a$;
2. $(\mathbf a + \mathbf b) + \mathbf c = \mathbf a + (\mathbf b + \mathbf c)$;
3. $\mathbf a + \mathbf 0 = \mathbf a$, bunda $\mathbf 0 = (0, \dots, 0)$;
4. $\mathbf a + (-\mathbf a) = \mathbf 0$;
5. $1\cdot\mathbf a = \mathbf a$;
6. $\alpha(\beta\mathbf a) = (\alpha\beta)\mathbf a$;
7. $(\alpha + \beta)\mathbf a = \alpha\mathbf a + \beta\mathbf a$;
8. $\alpha(\mathbf a + \mathbf b) = \alpha\mathbf a + \alpha\mathbf b$.
:::

:::tarif
Barcha $n$-o'lchovli vektorlar to'plami shu amallar bilan **$n$-o'lchamli arifmetik fazo** deyiladi va $\mathbb R^n$ bilan belgilanadi.
:::

Bu 8 xossa keyinchalik (9-mavzu) umumiy **chiziqli fazo** ta'rifiga asos bo'ladi.

## 6.3. Chiziqli kombinatsiya

:::tarif
$\lambda_1, \dots, \lambda_k$ sonlar uchun
$$\lambda_1\mathbf a_1 + \lambda_2\mathbf a_2 + \dots + \lambda_k\mathbf a_k$$
— $\mathbf a_1, \dots, \mathbf a_k$ vektorlarning **chiziqli kombinatsiyasi**. Agar $\mathbf b$ shu ko'rinishda yozilsa, $\mathbf b$ vektor $\mathbf a_1, \dots, \mathbf a_k$ orqali **chiziqli ifodalanadi**.
:::

:::misol
$\mathbf c = (-1;\ -5;\ 3)$ ni $\mathbf a = (1;\ -1;\ 0)$ va $\mathbf b = (-1;\ -1;\ 1)$ orqali ifodalaymiz: $\mathbf c = \alpha\mathbf a + \beta\mathbf b$.
$$\begin{cases} \alpha - \beta = -1\\ -\alpha - \beta = -5\\ \beta = 3\end{cases} \Rightarrow \beta = 3,\ \alpha = 2.$$
Tekshirish: $2(1, -1, 0) + 3(-1, -1, 1) = (-1, -5, 3)$ ✓.
:::

Vektorning chiziqli ifodalanishi — chiziqli tenglamalar sistemasining birgalikdaligiga teng kuchli: $\mathbf b$ ifodalanadi $\iff$ $\mathbf a_1, \dots, \mathbf a_k$ ustunlar va $\mathbf b$ ozod hadlar ustuni bo'lgan sistema yechimga ega.

## 6.4. Chiziqli bog'liqlik

:::tarif
Agar kamida bittasi noldan farqli $\lambda_1, \dots, \lambda_k$ sonlar uchun
$$\lambda_1\mathbf a_1 + \dots + \lambda_k\mathbf a_k = \mathbf 0$$
bo'lsa, $\mathbf a_1, \dots, \mathbf a_k$ sistema **chiziqli bog'liq** deyiladi. Bu tenglik faqat $\lambda_1 = \dots = \lambda_k = 0$ da bajarilsa, sistema **chiziqli erkli** deyiladi.
:::

**Tekshirish usuli:** $\sum\lambda_i\mathbf a_i = \mathbf 0$ — bu $\lambda_i$ larga nisbatan **bir jinsli** sistema. Sistema erkli $\iff$ bu sistema faqat trivial yechimga ega.

:::misol
$\mathbf a = (1, 1)$, $\mathbf b = (1, -1)$: $\lambda(1, 1) + \mu(1, -1) = \mathbf 0 \Rightarrow \lambda + \mu = 0,\ \lambda - \mu = 0 \Rightarrow \lambda = \mu = 0$. Erkli.

$\mathbf a = (1, 2)$, $\mathbf b = (-2, -4)$: $2\mathbf a + \mathbf b = \mathbf 0$. Bog'liq.
:::

:::savol
$\mathbf a = (1, k)$ va $\mathbf b = (3, 6)$ qaysi $k$ da chiziqli bog'liq?
- $k = 3$
+ $k = 2$
- $k = 6$
- hech qanday $k$ da
> Proporsionallik: $\frac13 = \frac k6$.
:::

## 6.5. Eng sodda xossalar

:::xossa
1. Bitta vektor bog'liq $\iff$ u nol vektor.
2. Ikki vektor bog'liq $\iff$ ular proporsional.
3. Nol vektorni o'z ichiga olgan sistema bog'liq.
4. Ikkita teng vektorli sistema bog'liq.
5. Birlik vektorlar $\mathbf e_1 = (1, 0, \dots, 0)$, …, $\mathbf e_n = (0, \dots, 0, 1)$ — chiziqli erkli.
:::

:::misol Determinant orqali tekshirish
$\mathbb R^3$ da $\mathbf a_1 = (1, 2, 3)$, $\mathbf a_2 = (2, 1, 0)$, $\mathbf a_3 = (4, 5, 6)$:
$$\begin{vmatrix} 1 & 2 & 3\\ 2 & 1 & 0\\ 4 & 5 & 6\end{vmatrix} = 0.$$
Demak sistema bog'liq ($\mathbf a_3 = 2\mathbf a_1 + \mathbf a_2$). Bu usulning asoslanishi — keyingi mavzuda.
:::

## 6.6. Geometrik ma'no

- $\mathbb R^2$, $\mathbb R^3$ da ikki vektor bog'liq — ular bitta to'g'ri chiziqda (kollinear).
- $\mathbb R^3$ da uch vektor bog'liq — ular bitta tekislikda (komplanar).
- Erkli sistema — «yangi yo'nalishlar» beradigan vektorlar: hech biri qolganlari bilan «takrorlanmaydi».

:::savol
$\mathbb R^3$ da $(1, 0, 0)$, $(0, 1, 0)$, $(1, 1, 0)$ vektorlar qanday?
- Chiziqli erkli
+ Chiziqli bog'liq
- Ortonormal
- Bazis tashkil etadi
> Uchinchisi birinchi ikkitasining yig'indisi.
:::

:::tarix
Arifmetik vektor tushunchasi XIX asrda G. Grassman va A. Keli ishlarida shakllangan. «Chiziqli bog'liqlik» tushunchasi tenglamalar sistemalarini tahlil qilishdan kelib chiqqan.
:::
