# 3-mavzu. n-tartibli determinantlar va ularning xossalari

**Bu mavzuda:** 2- va 3-tartibli determinantlar, $n$-tartibli determinant ta'rifi, determinant xossalari, uchburchak ko'rinishga keltirib hisoblash.

## 3.1. Ikkinchi va uchinchi tartibli determinantlar

Ikki noma'lumli sistema $\begin{cases} a_{11}x_1 + a_{12}x_2 = b_1\\ a_{21}x_1 + a_{22}x_2 = b_2\end{cases}$ ni yechishda $a_{11}a_{22} - a_{12}a_{21}$ ifoda paydo bo'ladi.

:::tarif
$$\begin{vmatrix} a_{11} & a_{12}\\ a_{21} & a_{22}\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}.$$
:::

:::misol
$\begin{vmatrix} 1 & 2\\ 5 & 7\end{vmatrix} = 7 - 10 = -3$.
:::

Uchinchi tartibli determinant **uchburchaklar (Sarryus) qoidasi** bilan hisoblanadi:
$$\begin{vmatrix} a_{11} & a_{12} & a_{13}\\ a_{21} & a_{22} & a_{23}\\ a_{31} & a_{32} & a_{33}\end{vmatrix} = a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31} - a_{12}a_{21}a_{33} - a_{11}a_{23}a_{32}.$$

Musbat ishorali uchta qo'shiluvchi — bosh diagonal va unga «parallel» uchburchaklar, manfiylari — yordamchi diagonal va unga parallel uchburchaklar.

:::misol
$\begin{vmatrix} 1&2&3\\4&5&6\\7&8&9\end{vmatrix} = 45 + 84 + 96 - 105 - 72 - 48 = 0$.
:::

## 3.2. n-tartibli determinant

Uchinchi tartibli determinantning har bir qo'shiluvchisi $\pm a_{1n_1}a_{2n_2}a_{3n_3}$ ko'rinishda: har bir satr va har bir ustundan bittadan element olingan, ishora esa $(n_1, n_2, n_3)$ o'rin almashtirishning juft-toqligi bilan aniqlanadi. Shu kuzatuv umumiy ta'rifga olib keladi.

:::tarif
$n$-tartibli kvadrat matritsaning **determinanti**:
$$\det A = |A| = \sum_{(n_1,\dots,n_n)} (-1)^{\sigma(n_1,\dots,n_n)}\,a_{1n_1}a_{2n_2}\cdots a_{nn_n},$$
yig'indi barcha $n!$ ta o'rin almashtirish bo'yicha olinadi.
:::

Har bir qo'shiluvchi — matritsaning har bir satri va ustunidan bittadan olingan $n$ ta element ko'paytmasi («diagonal»). Qo'shiluvchilarning yarmi «+», yarmi «−» ishorali.

:::savol
5-tartibli determinant yoyilmasida nechta qo'shiluvchi bor?
- 25
- 10
+ 120
- 60
> $5! = 120$.
:::

## 3.3. Determinant xossalari

:::xossa
1. **Transponirlashda o'zgarmaydi:** $\det A^T = \det A$. Shu sababli satrlar uchun to'g'ri bo'lgan har bir xossa ustunlar uchun ham to'g'ri.
2. Biror satr butunlay noldan iborat bo'lsa, $\det A = 0$.
3. **Chiziqlilik:** satrning umumiy ko'paytuvchisini determinant belgisidan tashqariga chiqarish mumkin; satr ikki satr yig'indisi bo'lsa, determinant ikki determinant yig'indisiga teng.
4. Ikki satri teng (yoki proporsional) determinant nolga teng.
5. Ikki satr o'rni almashsa, determinant **ishorasini o'zgartiradi**.
6. Bir satrga boshqa satrni istalgan songa ko'paytirib qo'shilsa, determinant **o'zgarmaydi**.
7. $\det A = 0$ bo'lishi uchun satrlarning **chiziqli bog'liq** bo'lishi zarur va yetarli.
8. $\det(AB) = \det A\cdot\det B$.
:::

:::savol
$\det A = 5$ bo'lsa, $4\times 4$ matritsa uchun $\det(2A)$ nimaga teng?
- 10
- 40
+ 80
- 20
> Har bir satrdan 2 chiqadi: $2^4\cdot 5 = 80$.
:::

## 3.4. Uchburchak matritsaning determinanti

:::teorema
Uchburchak (xususan, diagonal) matritsaning determinanti bosh diagonal elementlari ko'paytmasiga teng:
$$\det A = a_{11}a_{22}\cdots a_{nn}.$$
:::

Bundan **eng samarali hisoblash usuli** kelib chiqadi: 5- va 6-xossalar yordamida determinantni uchburchak ko'rinishga keltirish (Gauss usuli). Har bir satr almashinuvi ishorani o'zgartirishini unutmang.

:::misol
$$\begin{vmatrix} 1&1&1\\1&2&3\\1&3&6\end{vmatrix} = \begin{vmatrix} 1&1&1\\0&1&2\\0&2&5\end{vmatrix} = \begin{vmatrix} 1&1&1\\0&1&2\\0&0&1\end{vmatrix} = 1\cdot1\cdot1 = 1.$$
(2- va 3-satrdan 1-satr ayirildi, so'ng 3-satrdan 2-satrning ikki barobari ayirildi.)
:::

## 3.5. Vandermond determinanti

$$\begin{vmatrix} 1 & 1 & \dots & 1\\ a_1 & a_2 & \dots & a_n\\ \vdots & & & \vdots\\ a_1^{n-1} & a_2^{n-1} & \dots & a_n^{n-1}\end{vmatrix} = \prod_{1 \le j < i \le n}(a_i - a_j).$$

Bu determinant $a_i$ lar har xil bo'lganda noldan farqli — shuning uchun $n+1$ ta nuqtadan o'tuvchi $n$-darajali interpolyatsion ko'phad yagona.

## 3.6. Geometrik ma'no

$2\times 2$ matritsaning determinanti — ustun-vektorlar ustiga qurilgan parallelogrammning **yo'naltirilgan yuzi**, $3\times 3$ uchun — parallelepipedning yo'naltirilgan hajmi.

> 💡 [Laboratoriya → Chiziqli almashtirish](#/lab/almashtirish): matritsani o'zgartirib, birlik kvadrat yuzi $\det A$ ga teng bo'lishini kuzating.

:::savol
Qaysi almashtirish determinantni o'zgartirmaydi?
- Ikki satr o'rnini almashtirish
- Satrni 2 ga ko'paytirish
+ 1-satrga 3-satrni $(-5)$ ga ko'paytirib qo'shish
- Satrni nol bilan almashtirish
:::

:::tarix
Determinantlar g'oyasi 1683-yilda Yaponiyada Seki Takakazu va 1693-yilda G. Leybnis ishlarida uchraydi. Umumiy nazariyani O. Koshi (1812) yaratgan, «determinant» atamasini K. F. Gauss kiritgan.
:::
