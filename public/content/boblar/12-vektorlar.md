# 12. Vektorlar. Vektorning o'qdagi proyeksiyasi va skalyar ko'paytma

**Bu mavzuda:** geometrik vektorlar va chiziqli amallar, kollinear va komplanar vektorlar, bazis va koordinatalar, yo'naltiruvchi kosinuslar, kesmani berilgan nisbatda bo'lish, o'qdagi proyeksiya, skalyar ko'paytma va uning tatbiqlari.

## 12.1. Vektor tushunchasi

:::tarif
Yo'nalgan kesma **vektor** deyiladi: $\overrightarrow{AB}$ yoki $\mathbf a$ ($A$ — boshi, $B$ — oxiri). Uning uzunligi $|\mathbf a|$ — **modul**. Uzunligi, yo'nalishi bir xil vektorlar **teng** (erkin vektorlar parallel ko'chirishda o'zgarmaydi).
:::

- $|\mathbf a| = 1$ — **birlik vektor** (ort); $\mathbf a^0 = \mathbf a / |\mathbf a|$;
- **kollinear** vektorlar — bitta to'g'ri chiziqda yoki parallel chiziqlarda yotadi: $\mathbf a \parallel \mathbf b$;
- **komplanar** vektorlar — bitta tekislikda yoki parallel tekisliklarda yotadi.

## 12.2. Chiziqli amallar

**Qo'shish** — uchburchak yoki parallelogramm qoidasi; **ayirish**: $\mathbf a - \mathbf b = \mathbf a + (-\mathbf b)$. **Songa ko'paytirish**: $\lambda\mathbf a$ ning uzunligi $|\lambda||\mathbf a|$, yo'nalishi $\lambda > 0$ da $\mathbf a$ bilan bir xil, $\lambda < 0$ da qarama-qarshi.

Bu amallar 8-mavzudagi barcha aksiomalarni qanoatlantiradi — geometrik vektorlar chiziqli fazo tashkil etadi.

:::teorema
1. $\mathbf a \ne \mathbf 0$ va $\mathbf b$ kollinear $\iff \mathbf b = \lambda\mathbf a$ (ya'ni ikki vektor chiziqli bog'liq).
2. Uch vektor komplanar $\iff$ ular chiziqli bog'liq.
3. Fazoda istalgan to'rt vektor chiziqli bog'liq; demak $\dim V_3 = 3$.
:::

## 12.3. Bazis va koordinatalar

Fazoda istalgan uchta nokomplanar vektor bazis tashkil etadi. **Dekart bazisi** $\mathbf i, \mathbf j, \mathbf k$ — o'zaro perpendikulyar birlik vektorlar:
$$\mathbf a = a_x\mathbf i + a_y\mathbf j + a_z\mathbf k = (a_x;\ a_y;\ a_z).$$

:::xossa
1. $A(x_1, y_1, z_1)$, $B(x_2, y_2, z_2)$ bo'lsa: $\overrightarrow{AB} = (x_2 - x_1;\ y_2 - y_1;\ z_2 - z_1)$.
2. $|\mathbf a| = \sqrt{a_x^2 + a_y^2 + a_z^2}$.
3. Amallar koordinatalar bo'yicha bajariladi: $\mathbf a \pm \mathbf b = (a_x \pm b_x;\ \dots)$, $\lambda\mathbf a = (\lambda a_x;\ \dots)$.
4. Kollinearlik sharti: $\dfrac{a_x}{b_x} = \dfrac{a_y}{b_y} = \dfrac{a_z}{b_z}$.
:::

## 12.4. Yo'naltiruvchi kosinuslar

$\alpha, \beta, \gamma$ — $\mathbf a$ ning $Ox, Oy, Oz$ o'qlar bilan hosil qilgan burchaklari:
$$\cos\alpha = \frac{a_x}{|\mathbf a|},\quad \cos\beta = \frac{a_y}{|\mathbf a|},\quad \cos\gamma = \frac{a_z}{|\mathbf a|},\qquad \cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1.$$
$\mathbf a^0 = (\cos\alpha;\ \cos\beta;\ \cos\gamma)$.

:::misol
$\mathbf a = (2;\ -1;\ 2)$: $|\mathbf a| = 3$, $\cos\alpha = \frac23$, $\cos\beta = -\frac13$, $\cos\gamma = \frac23$. Tekshirish: $\frac49 + \frac19 + \frac49 = 1$ ✓.
:::

## 12.5. Kesmani berilgan nisbatda bo'lish

$M$ nuqta $AB$ kesmani $\dfrac{AM}{MB} = \lambda$ nisbatda bo'lsa:
$$x_M = \frac{x_1 + \lambda x_2}{1 + \lambda},\quad y_M = \frac{y_1 + \lambda y_2}{1 + \lambda},\quad z_M = \frac{z_1 + \lambda z_2}{1 + \lambda}.$$
Xususan, o'rta nuqta ($\lambda = 1$): $M = \left(\frac{x_1 + x_2}{2};\ \frac{y_1 + y_2}{2};\ \frac{z_1 + z_2}{2}\right)$. Uchburchak og'irlik markazi: uchlar koordinatalarining o'rta arifmetigi.

:::misol
Parallelogrammning uchta uchi $A(1;\ 2)$, $B(5;\ 3)$, $C(6;\ 7)$. $D$ ni topamiz. Diagonallar o'rtada kesishadi: $AC$ ning o'rtasi $(3{,}5;\ 4{,}5)$ $= BD$ ning o'rtasi. Demak $D = (2\cdot 3{,}5 - 5;\ 2\cdot 4{,}5 - 3) = (2;\ 6)$.
:::

## 12.6. O'qdagi proyeksiya

:::tarif
$\mathbf a$ vektorning $l$ o'qdagi **proyeksiyasi** — vektor boshi va oxiri proyeksiyalari orasidagi kesmaning ishorali uzunligi:
$$\text{pr}_l\,\mathbf a = |\mathbf a|\cos\varphi,$$
$\varphi$ — vektor va o'q orasidagi burchak.
:::

:::xossa
$\text{pr}_l(\mathbf a + \mathbf b) = \text{pr}_l\mathbf a + \text{pr}_l\mathbf b$, $\quad\text{pr}_l(\lambda\mathbf a) = \lambda\,\text{pr}_l\mathbf a$. Koordinatalar — Dekart o'qlaridagi proyeksiyalar.
:::

## 12.7. Skalyar ko'paytma

:::tarif
$$\mathbf a\cdot\mathbf b = |\mathbf a||\mathbf b|\cos\varphi = |\mathbf a|\,\text{pr}_{\mathbf a}\mathbf b.$$
:::

:::xossa
1. $\mathbf a\cdot\mathbf b = \mathbf b\cdot\mathbf a$; $\ (\lambda\mathbf a)\cdot\mathbf b = \lambda(\mathbf a\cdot\mathbf b)$; $\ \mathbf a\cdot(\mathbf b + \mathbf c) = \mathbf a\cdot\mathbf b + \mathbf a\cdot\mathbf c$.
2. $\mathbf a\cdot\mathbf a = |\mathbf a|^2$.
3. $\mathbf a \perp \mathbf b \iff \mathbf a\cdot\mathbf b = 0$.
4. Koordinatalarda: $\mathbf a\cdot\mathbf b = a_xb_x + a_yb_y + a_zb_z$.
:::

Demak geometrik vektorlar fazosi — 9-mavzudagi Yevklid fazosining muhim namunasi.

**Tatbiqlar:**
- burchak: $\cos\varphi = \dfrac{\mathbf a\cdot\mathbf b}{|\mathbf a||\mathbf b|}$;
- proyeksiya: $\text{pr}_{\mathbf b}\mathbf a = \dfrac{\mathbf a\cdot\mathbf b}{|\mathbf b|}$;
- **ish**: $\mathbf F$ kuch jismni $\mathbf s$ ga ko'chirganda $A = \mathbf F\cdot\mathbf s$.

:::misol
Uchburchak uchlari $A(2;\ 3;\ 2)$, $B(-2;\ -1;\ 1)$, $C(1;\ 1;\ 1)$. $C$ burchak kosinusi:
$\overrightarrow{CA} = (1;\ 2;\ 1)$, $\overrightarrow{CB} = (-3;\ -2;\ 0)$,
$$\cos C = \frac{-3 - 4 + 0}{\sqrt6\cdot\sqrt{13}} = -\frac{7}{\sqrt{78}}$$
— burchak o'tmas.
:::

:::misol
$\mathbf F = (3;\ -2;\ 1)$ kuch moddiy nuqtani $M_1(1;\ 0;\ 2)$ dan $M_2(3;\ 1;\ 5)$ ga ko'chirdi. $\mathbf s = (2;\ 1;\ 3)$, ish $A = 6 - 2 + 3 = 7$.
:::

> 💡 [Laboratoriya → 3D vektorlar](#/lab/fazo) da vektorlarni aylantirib, skalyar ko'paytma ishorasining burchakka bog'liqligini kuzating.

:::savol
$\mathbf a = (1;\ 2;\ -2)$ ning $\mathbf b = (2;\ 1;\ 2)$ dagi proyeksiyasi nimaga teng?
+ $0$
- $\frac{8}{3}$
- $1$
- $-\frac{2}{3}$
> $\mathbf a\cdot\mathbf b = 2 + 2 - 4 = 0$ — vektorlar perpendikulyar.
:::

:::savol
$|\mathbf a| = 3$, $|\mathbf b| = 4$, $\varphi = 60^\circ$. $(\mathbf a + \mathbf b)^2$ nimaga teng?
- 25
+ 37
- 49
- 13
> $9 + 2\cdot 6 + 16 = 37$.
:::

:::tarix
Vektor tushunchasini U. Gamilton (1843, kvaternionlar) va G. Grassman kiritgan; zamonaviy vektor hisobini J. Gibbs va O. Xevisayd (1880-yillar) shakllantirgan.
:::
