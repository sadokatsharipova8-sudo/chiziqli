# 15-mavzu. Kompleks Yevklid fazo

**Bu mavzuda:** kompleks chiziqli fazo, ermit skalyar ko'paytma va uning aksiomalari, $\mathbb C^n$ dagi standart skalyar ko'paytma, uzunlik, Koshi–Bunyakovskiy tengsizligi, ortonormal bazis, unitar matritsalar.

## 15.1. Nega kompleks fazo kerak?

- Haqiqiy matritsaning xos sonlari kompleks bo'lishi mumkin (burish matritsasi: $\lambda = \pm i$).
- Elektrotexnikada o'zgaruvchan tok va kuchlanish kompleks amplituda bilan ifodalanadi.
- Kvant mexanikasida holatlar — kompleks fazoning vektorlari.
- Signallarni qayta ishlashda Furye almashtirishi kompleks eksponentalar $e^{ik t}$ bilan ishlaydi.

## 15.2. Ermit skalyar ko'paytma

Haqiqiy holdagi $(\mathbf x, \mathbf y) = \sum x_iy_i$ kompleks fazoda yaramaydi: $(\mathbf x, \mathbf x) = \sum x_i^2$ manfiy yoki kompleks bo'lishi mumkin (masalan $\mathbf x = (i)$ da $-1$).

:::tarif
Kompleks chiziqli fazo $V$ da har bir juftga $(\mathbf x, \mathbf y) \in \mathbb C$ mos qo'yilgan bo'lib:
1. $(\mathbf x, \mathbf y) = \overline{(\mathbf y, \mathbf x)}$ — **ermit simmetriyasi**;
2. $(\mathbf x + \mathbf y, \mathbf z) = (\mathbf x, \mathbf z) + (\mathbf y, \mathbf z)$;
3. $(\lambda\mathbf x, \mathbf y) = \lambda(\mathbf x, \mathbf y)$;
4. $(\mathbf x, \mathbf x) > 0$, $\mathbf x \ne \mathbf 0$ (1-aksiomadan $(\mathbf x, \mathbf x)$ haqiqiy),

bo'lsa — **kompleks Yevklid** (unitar) fazo.
:::

**Natija:** ikkinchi argument bo'yicha «qo'shma chiziqlilik»: $(\mathbf x, \lambda\mathbf y) = \bar\lambda(\mathbf x, \mathbf y)$.

## 15.3. Standart skalyar ko'paytma $\mathbb C^n$ da

$$(\mathbf x, \mathbf y) = x_1\bar y_1 + x_2\bar y_2 + \dots + x_n\bar y_n.$$

$(\mathbf x, \mathbf x) = |x_1|^2 + \dots + |x_n|^2 \ge 0$ — uzunlik haqiqiy:
$$|\mathbf x| = \sqrt{|x_1|^2 + \dots + |x_n|^2}.$$

:::misol
$\mathbf x = (1 + i;\ 2)$, $\mathbf y = (i;\ 1 - i)$:
$$(\mathbf x, \mathbf y) = (1 + i)\overline{i} + 2\,\overline{(1 - i)} = (1 + i)(-i) + 2(1 + i) = (1 - i) + (2 + 2i) = 3 + i.$$
$(\mathbf y, \mathbf x) = \overline{3 + i} = 3 - i$ — tartib muhim!

$|\mathbf x| = \sqrt{|1 + i|^2 + 4} = \sqrt{2 + 4} = \sqrt6$.
:::

:::savol
$\mathbb C^2$ da $\mathbf x = (i;\ 0)$ ning uzunligi?
- $i$
- $-1$
+ $1$
- $0$
> $|\mathbf x|^2 = |i|^2 = 1$.
:::

## 15.4. Asosiy xossalar

Haqiqiy holdagi deyarli barcha natijalar saqlanadi:

:::xossa
- **Koshi–Bunyakovskiy:** $|(\mathbf x, \mathbf y)| \le |\mathbf x|\,|\mathbf y|$;
- **uchburchak tengsizligi:** $|\mathbf x + \mathbf y| \le |\mathbf x| + |\mathbf y|$;
- **ortogonallik:** $(\mathbf x, \mathbf y) = 0$; ortogonal sistema erkli;
- **Gram–Shmidt** jarayoni o'zgarishsiz ishlaydi: $\mathbf b_2 = \mathbf a_2 - \frac{(\mathbf a_2, \mathbf b_1)}{(\mathbf b_1, \mathbf b_1)}\mathbf b_1$;
- ortonormal bazisda $x_i = (\mathbf x, \mathbf e_i)$ va $(\mathbf x, \mathbf y) = \sum x_i\bar y_i$.
:::

:::diqqat
Kompleks fazoda «burchak» tushunchasi odatda ishlatilmaydi — $(\mathbf x, \mathbf y)$ kompleks son. Ortogonallik esa saqlanadi.
:::

## 15.5. Ortonormal bazis: misol

$\mathbb C^2$ da $\mathbf e_1 = \frac{1}{\sqrt2}(1;\ i)$, $\mathbf e_2 = \frac{1}{\sqrt2}(1;\ -i)$:
$$(\mathbf e_1, \mathbf e_2) = \tfrac12\big(1\cdot1 + i\cdot\overline{(-i)}\big) = \tfrac12(1 + i\cdot i) = 0,\qquad (\mathbf e_1, \mathbf e_1) = \tfrac12(1 + 1) = 1.$$
Ortonormal bazis ✓. Diqqat: standart ko'paytma bo'yicha $(1, i)\cdot(1, i) = 1 + i^2 = 0$ chiqardi — shuning uchun qo'shma olish shart.

## 15.6. Ermit qo'shma va unitar matritsalar

:::tarif
$A^* = \bar A^T$ — **ermit qo'shma** matritsa. $A^* = A$ — **ermit** (o'z-o'ziga qo'shma) matritsa; $U^*U = E$ — **unitar** matritsa.
:::

:::xossa
- $(A\mathbf x, \mathbf y) = (\mathbf x, A^*\mathbf y)$;
- ermit matritsaning xos sonlari **haqiqiy** (18-mavzu);
- unitar matritsa uzunlikni saqlaydi: $|U\mathbf x| = |\mathbf x|$, ustunlari ortonormal; $|\det U| = 1$.
:::

:::misol
$U = \frac{1}{\sqrt2}\begin{pmatrix} 1 & 1\\ i & -i\end{pmatrix}$ — unitar (ustunlari yuqoridagi $\mathbf e_1, \mathbf e_2$).
:::

:::savol
Haqiqiy matritsa uchun unitarlik qaysi tushunchaga aylanadi?
- Simmetriklik
+ Ortogonallik
- Xosmaslik
- Diagonallik
:::

:::tarix
Ermit matritsalar fransuz matematigi Sh. Ermit (1822–1901) nomi bilan ataladi. Kompleks Yevklid (Gilbert) fazolari XX asr boshida D. Gilbert va J. fon Neyman ishlarida kvant mexanikasining tiliga aylandi.
:::
