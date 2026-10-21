# 12-mavzu. Ortogonallashtirish jarayoni. Qism fazoning ortogonal to'ldiruvchisi

**Bu mavzuda:** vektorning vektorga proyeksiyasi, Gram–Shmidt jarayoni, ortonormal bazisning mavjudligi, ortogonal to'ldiruvchi, ortogonal proyeksiya va masofa.

## 12.1. Vektorga proyeksiya

$\mathbf a$ ning $\mathbf b \ne \mathbf 0$ yo'nalishidagi ortogonal proyeksiyasi:
$$\text{pr}_{\mathbf b}\mathbf a = \frac{(\mathbf a, \mathbf b)}{(\mathbf b, \mathbf b)}\,\mathbf b.$$

$\mathbf a - \text{pr}_{\mathbf b}\mathbf a$ vektor $\mathbf b$ ga ortogonal: $(\mathbf a - \frac{(\mathbf a, \mathbf b)}{(\mathbf b, \mathbf b)}\mathbf b, \mathbf b) = (\mathbf a, \mathbf b) - (\mathbf a, \mathbf b) = 0$.

## 12.2. Gram–Shmidt jarayoni

:::teorema
Har qanday chiziqli erkli $\mathbf a_1, \dots, \mathbf a_k$ sistemadan bir xil chiziqli qobiqli ortogonal sistema qurish mumkin:
$$\mathbf b_1 = \mathbf a_1,$$
$$\mathbf b_2 = \mathbf a_2 - \frac{(\mathbf a_2, \mathbf b_1)}{(\mathbf b_1, \mathbf b_1)}\mathbf b_1,$$
$$\mathbf b_3 = \mathbf a_3 - \frac{(\mathbf a_3, \mathbf b_1)}{(\mathbf b_1, \mathbf b_1)}\mathbf b_1 - \frac{(\mathbf a_3, \mathbf b_2)}{(\mathbf b_2, \mathbf b_2)}\mathbf b_2,\ \dots$$
So'ng $\mathbf e_i = \mathbf b_i/|\mathbf b_i|$ — ortonormal sistema.
:::

G'oya: har qadamda $\mathbf a_k$ dan oldingi $\mathbf b$ lar bo'yicha proyeksiyalarni ayiramiz — qolgan qism ularning hammasiga perpendikulyar.

:::misol
$\mathbf a_1 = (1, 1, 0)$, $\mathbf a_2 = (2, 0, -1)$, $\mathbf a_3 = (1, -1, 1)$.

$\mathbf b_1 = (1, 1, 0)$, $(\mathbf b_1, \mathbf b_1) = 2$.

$(\mathbf a_2, \mathbf b_1) = 2$: $\mathbf b_2 = (2, 0, -1) - (1, 1, 0) = (1, -1, -1)$, $(\mathbf b_2, \mathbf b_2) = 3$.

$(\mathbf a_3, \mathbf b_1) = 0$, $(\mathbf a_3, \mathbf b_2) = 1$: $\mathbf b_3 = (1, -1, 1) - \frac13(1, -1, -1) = \frac23(1, -1, 2)$.

Ortonormal bazis: $\mathbf e_1 = \frac{1}{\sqrt2}(1, 1, 0)$, $\mathbf e_2 = \frac{1}{\sqrt3}(1, -1, -1)$, $\mathbf e_3 = \frac{1}{\sqrt6}(1, -1, 2)$.
:::

:::teorema Natija
Har qanday chekli o'lchamli Yevklid fazosida ortonormal bazis mavjud.
:::

:::savol
$\mathbf a_1 = (1, 0)$, $\mathbf a_2 = (3, 4)$. $\mathbf b_2$ = ?
- $(3, 4)$
+ $(0, 4)$
- $(3, 0)$
- $(0, 1)$
:::

**Muhim:** Gram–Shmidtda $\mathbf a_i$ larga emas, **$\mathbf b_i$ larga** proyeksiyalanadi. Agar biror qadamda $\mathbf b_k = \mathbf 0$ chiqsa — $\mathbf a_k$ oldingilar orqali ifodalanadi (sistema bog'liq).

**QR-yoyilma:** Gram–Shmidtning matritsaviy shakli — $A = QR$, $Q$ — ortonormal ustunli, $R$ — yuqori uchburchak. Sonli usullarda keng qo'llaniladi.

## 12.3. Ortogonal to'ldiruvchi

:::tarif
$L^\perp = \{\mathbf x : (\mathbf x, \mathbf y) = 0\ \ \forall\mathbf y \in L\}$ — $L$ qism fazoning **ortogonal to'ldiruvchisi**.
:::

:::teorema
$$V = L \oplus L^\perp,\qquad \dim L + \dim L^\perp = \dim V,\qquad (L^\perp)^\perp = L.$$
:::

:::misol
$L = L\big((1, 1, 0)\big) \subset \mathbb R^3$. $L^\perp$: $x_1 + x_2 = 0$ — bir jinsli sistema; FYS: $(-1, 1, 0)$, $(0, 0, 1)$. $L^\perp$ — tekislik.

Umuman: $L = L(\mathbf a_1, \dots, \mathbf a_k)$ bo'lsa, $L^\perp$ — $\mathbf a_i$ lar satr bo'lgan bir jinsli sistemaning yechimlar fazosi.
:::

:::savol
$\mathbb R^5$ da $\dim L = 2$. $\dim L^\perp$ = ?
- 2
+ 3
- 5
- 7
:::

## 12.4. Ortogonal proyeksiya va masofa

Har bir $\mathbf x$ yagona usulda $\mathbf x = \mathbf x_L + \mathbf x_\perp$ ($\mathbf x_L \in L$, $\mathbf x_\perp \in L^\perp$).

- $\mathbf x_L$ — $\mathbf x$ ning $L$ ga **ortogonal proyeksiyasi**; ortonormal bazisda $\mathbf x_L = \sum(\mathbf x, \mathbf e_i)\mathbf e_i$.
- $\mathbf x_L$ — $L$ dagi $\mathbf x$ ga **eng yaqin** vektor.
- $|\mathbf x_\perp|$ — $\mathbf x$ dan $L$ gacha masofa.

:::misol
$\mathbf x = (1, 2, 3)$ ni $L = L\big((1, 1, 0)\big)$ ga proyeksiyalaymiz: $\mathbf x_L = \frac{3}{2}(1, 1, 0)$, $\mathbf x_\perp = \left(-\frac12, \frac12, 3\right)$, masofa $\sqrt{\frac14 + \frac14 + 9} = \sqrt{9{,}5}$.
:::

Bu **eng kichik kvadratlar usuli**ning asosi: tajriba ma'lumotlariga eng yaxshi mos keluvchi to'g'ri chiziq — proyeksiya.

:::tarix
Ortogonallashtirish jarayonini J. Gram (1883) va E. Shmidt (1907) taklif qilgan; g'oya P. Laplas ishlarida ham uchraydi.
:::
