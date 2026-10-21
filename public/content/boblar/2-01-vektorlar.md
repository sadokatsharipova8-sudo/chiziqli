# 1-mavzu. Vektorlar va ular ustida chiziqli amallar

**Bu mavzuda:** vektor tushunchasi, tenglik, kollinear va komplanar vektorlar, qo'shish va songa ko'paytirish, chiziqli bog'liqlikning geometrik ma'nosi, bazis va koordinatalar, kesmani berilgan nisbatda bo'lish.

## 1.1. Vektor tushunchasi

:::tarif
Yo'nalgan kesma — **vektor**: $\overrightarrow{AB}$ yoki $\mathbf a$ ($A$ — boshi, $B$ — oxiri). Uzunligi $|\mathbf a|$ — **modul**. Uzunligi va yo'nalishi bir xil vektorlar **teng** (erkin vektorlar parallel ko'chirishda o'zgarmaydi).
:::

- **Nol vektor** $\mathbf 0$: boshi va oxiri ustma-ust;
- **birlik vektor** (ort): $|\mathbf a| = 1$; $\mathbf a^0 = \mathbf a / |\mathbf a|$;
- **qarama-qarshi** vektor $-\mathbf a$;
- **kollinear** — bitta yoki parallel to'g'ri chiziqlarda: $\mathbf a \parallel \mathbf b$;
- **komplanar** — bitta yoki parallel tekisliklarda.

Fizikada vektor kattaliklar: kuch, tezlik, tezlanish, impuls, maydon kuchlanganligi.

## 1.2. Chiziqli amallar

**Qo'shish:** uchburchak qoidasi ($\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$) yoki parallelogramm qoidasi (umumiy boshdan qo'yilgan vektorlarga qurilgan parallelogramm diagonali). Bir nechta vektor — ko'pburchak qoidasi.

**Ayirish:** $\mathbf a - \mathbf b = \mathbf a + (-\mathbf b)$ — parallelogrammning ikkinchi diagonali.

**Songa ko'paytirish:** $\lambda\mathbf a$ ning uzunligi $|\lambda||\mathbf a|$; $\lambda > 0$ — yo'nalish bir xil, $\lambda < 0$ — teskari.

:::xossa
$\mathbf a + \mathbf b = \mathbf b + \mathbf a$; $(\mathbf a + \mathbf b) + \mathbf c = \mathbf a + (\mathbf b + \mathbf c)$; $\mathbf a + \mathbf 0 = \mathbf a$; $\mathbf a + (-\mathbf a) = \mathbf 0$; $\lambda(\mu\mathbf a) = (\lambda\mu)\mathbf a$; $(\lambda + \mu)\mathbf a = \lambda\mathbf a + \mu\mathbf a$; $\lambda(\mathbf a + \mathbf b) = \lambda\mathbf a + \lambda\mathbf b$; $1\cdot\mathbf a = \mathbf a$.
:::

Demak geometrik vektorlar chiziqli fazo tashkil etadi ($V_2$, $V_3$) — 1-semestrdagi barcha natijalar ularga tatbiq etiladi.

:::misol
Uchburchak $ABC$ da $M$ — $BC$ ning o'rtasi. $\overrightarrow{AM} = \frac12(\overrightarrow{AB} + \overrightarrow{AC})$ — mediana vektori.
:::

## 1.3. Chiziqli bog'liqlikning geometrik ma'nosi

:::teorema
1. $\mathbf a \ne \mathbf 0$ va $\mathbf b$ kollinear $\iff \mathbf b = \lambda\mathbf a$ (bog'liq).
2. Uch vektor komplanar $\iff$ chiziqli bog'liq.
3. Fazoda istalgan to'rtta vektor chiziqli bog'liq.
:::

Natija: $\dim V_2 = 2$, $\dim V_3 = 3$. Tekislikda istalgan ikki nokollinear, fazoda istalgan uchta nokomplanar vektor — **bazis**.

## 1.4. Dekart bazisi va koordinatalar

$\mathbf i, \mathbf j, \mathbf k$ — o'zaro perpendikulyar birlik vektorlar:
$$\mathbf a = a_x\mathbf i + a_y\mathbf j + a_z\mathbf k = (a_x;\ a_y;\ a_z).$$

:::xossa
- $\overrightarrow{AB} = (x_2 - x_1;\ y_2 - y_1;\ z_2 - z_1)$ — **oxiridan boshi ayiriladi**;
- $\mathbf a \pm \mathbf b = (a_x \pm b_x;\ a_y \pm b_y;\ a_z \pm b_z)$, $\ \lambda\mathbf a = (\lambda a_x;\ \lambda a_y;\ \lambda a_z)$;
- kollinearlik: $\dfrac{a_x}{b_x} = \dfrac{a_y}{b_y} = \dfrac{a_z}{b_z}$;
- uzunlik: $|\mathbf a| = \sqrt{a_x^2 + a_y^2 + a_z^2}$.
:::

:::misol
$\mathbf a = (1;\ -1;\ 1)$, $\mathbf b = (-2;\ -1;\ 1)$: $-\mathbf a - 2\mathbf b = (-1 + 4;\ 1 + 2;\ -1 - 2) = (3;\ 3;\ -3)$.
:::

:::savol
$A(1;\ 2)$, $B(4;\ 6)$. $\overrightarrow{AB}$ = ?
- $(5;\ 8)$
+ $(3;\ 4)$
- $(-3;\ -4)$
- $(4;\ 3)$
:::

:::savol
$\mathbf a = (2;\ -4;\ 6)$ va $\mathbf b = (-1;\ m;\ -3)$ qaysi $m$ da kollinear?
+ $m = 2$
- $m = -2$
- $m = 4$
- hech qachon
> $\frac{2}{-1} = \frac{-4}{m} = \frac{6}{-3} = -2$.
:::

## 1.5. Kesmani berilgan nisbatda bo'lish

$M$ nuqta $AB$ ni $AM : MB = \lambda$ nisbatda bo'lsa ($\overrightarrow{AM} = \lambda\overrightarrow{MB}$):
$$x_M = \frac{x_1 + \lambda x_2}{1 + \lambda},\quad y_M = \frac{y_1 + \lambda y_2}{1 + \lambda},\quad z_M = \frac{z_1 + \lambda z_2}{1 + \lambda}.$$

- O'rta nuqta ($\lambda = 1$): koordinatalar o'rta arifmetigi.
- Uchburchak og'irlik markazi: $G = \frac13(A + B + C)$.

:::misol
Parallelogramm uchlari $A(1;\ 2)$, $B(5;\ 3)$, $C(6;\ 7)$. $\overrightarrow{AD} = \overrightarrow{BC} = (1;\ 4)$, demak $D(2;\ 6)$.
:::

:::misol
$A(1;\ 3)$, $B(7;\ -3)$ kesmani $\lambda = 2$ nisbatda bo'luvchi nuqta: $M\left(\frac{1 + 14}{3};\ \frac{3 - 6}{3}\right) = (5;\ -1)$.
:::

:::tarix
Vektor tushunchasini U. Gamilton (1843) va G. Grassman kiritgan; zamonaviy vektor hisobi J. Gibbs va O. Xevisayd (1880-yillar) nomlari bilan bog'liq.
:::
