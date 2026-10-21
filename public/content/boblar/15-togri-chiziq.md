# 15. Tekislikda to'g'ri chiziq

**Bu mavzuda:** to'g'ri chiziq tenglamasining turli ko'rinishlari, ikki to'g'ri chiziq orasidagi burchak, parallellik va perpendikulyarlik shartlari, nuqtadan to'g'ri chiziqqacha masofa.

## 15.1. To'g'ri chiziq tenglamalari

:::teorema
Dekart koordinatalarida har qanday to'g'ri chiziq birinchi darajali tenglama bilan beriladi va aksincha:
$$Ax + By + C = 0,\qquad A^2 + B^2 \ne 0\quad(\textbf{umumiy tenglama}).$$
$\mathbf n = (A;\ B)$ — to'g'ri chiziqqa perpendikulyar **normal vektor**.
:::

**Asosiy ko'rinishlar:**

| Tenglama | Ko'rinishi | Berilganlar |
|---|---|---|
| Burchak koeffitsiyentli | $y = kx + b$ | $k = \operatorname{tg}\alpha$, $b$ — $Oy$ dan kesgan kesma |
| Nuqta va burchak koeffitsiyent | $y - y_0 = k(x - x_0)$ | $M_0(x_0;\ y_0)$, $k$ |
| Nuqta va normal | $A(x - x_0) + B(y - y_0) = 0$ | $M_0$, $\mathbf n = (A;\ B)$ |
| Kanonik | $\dfrac{x - x_0}{l} = \dfrac{y - y_0}{m}$ | $M_0$, yo'naltiruvchi $\mathbf s = (l;\ m)$ |
| Parametrik | $x = x_0 + lt,\ y = y_0 + mt$ | $M_0$, $\mathbf s$ |
| Ikki nuqta orqali | $\dfrac{x - x_1}{x_2 - x_1} = \dfrac{y - y_1}{y_2 - y_1}$ | $M_1$, $M_2$ |
| Kesmalarda | $\dfrac{x}{a} + \dfrac{y}{b} = 1$ | o'qlardan kesgan kesmalar $a, b$ |
| Normal | $x\cos\alpha + y\sin\alpha - p = 0$ | $p$ — boshdan masofa |

Umumiy tenglamani **normal ko'rinishga** keltirish uchun uni $\mu = \pm\dfrac{1}{\sqrt{A^2 + B^2}}$ ga ko'paytiramiz ($\mu$ ishorasi $C$ ishorasiga qarama-qarshi).

:::misol
$A(1;\ 2)$ va $B(3;\ 6)$ orqali: $\dfrac{x - 1}{2} = \dfrac{y - 2}{4}$, ya'ni $2x - y = 0$, $y = 2x$.

$3x - 4y + 12 = 0$ ni kesmalarda: $\dfrac{x}{-4} + \dfrac{y}{3} = 1$.
:::

## 15.2. Ikki to'g'ri chiziq orasidagi burchak

$y = k_1x + b_1$ va $y = k_2x + b_2$ uchun:
$$\operatorname{tg}\varphi = \left|\frac{k_2 - k_1}{1 + k_1k_2}\right|.$$
Umumiy tenglamalar uchun — normal vektorlar orasidagi burchak:
$$\cos\varphi = \frac{|A_1A_2 + B_1B_2|}{\sqrt{A_1^2 + B_1^2}\sqrt{A_2^2 + B_2^2}}.$$

:::xossa
- **Parallellik:** $k_1 = k_2$ yoki $\dfrac{A_1}{A_2} = \dfrac{B_1}{B_2}$;
- **Perpendikulyarlik:** $k_1k_2 = -1$ yoki $A_1A_2 + B_1B_2 = 0$;
- **Ustma-ust tushish:** $\dfrac{A_1}{A_2} = \dfrac{B_1}{B_2} = \dfrac{C_1}{C_2}$.
:::

:::savol
$y = 3x - 1$ ga perpendikulyar to'g'ri chiziqning burchak koeffitsiyenti qanday?
- $3$
- $-3$
+ $-\frac13$
- $\frac13$
:::

## 15.3. Nuqtadan to'g'ri chiziqqacha masofa

:::teorema
$M_0(x_0;\ y_0)$ nuqtadan $Ax + By + C = 0$ to'g'ri chiziqqacha masofa:
$$d = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}.$$
:::

$Ax_0 + By_0 + C$ ning ishorasi nuqta to'g'ri chiziqning qaysi tomonida yotishini ko'rsatadi.

:::misol
$M(1;\ 2)$ dan $3x + 4y + 4 = 0$ gacha: $d = \dfrac{|3 + 8 + 4|}{5} = 3$.

Parallel to'g'ri chiziqlar $Ax + By + C_1 = 0$ va $Ax + By + C_2 = 0$ orasidagi masofa: $d = \dfrac{|C_1 - C_2|}{\sqrt{A^2 + B^2}}$.
:::

## 15.4. Uchburchak masalalari

:::misol
Uchburchak uchlari $A(0;\ 0)$, $B(4;\ 2)$, $C(1;\ 3)$. $C$ uchdan tushirilgan balandlik asosini topamiz.

$AB$: yo'naltiruvchi vektor $(4;\ 2) \parallel (2;\ 1)$, tenglama $x - 2y = 0$.

Balandlik $CD \perp AB$, normal vektori $(2;\ 1)$: $2(x - 1) + (y - 3) = 0$, ya'ni $2x + y - 5 = 0$.

Kesishish nuqtasi: $x = 2y$ ni qo'yamiz, $4y + y = 5$, $y = 1$, $x = 2$. Demak $D(2;\ 1)$.

Balandlik uzunligi: $|CD| = \sqrt{1 + 4} = \sqrt5$. Masofa formulasi bilan tekshiramiz: $d = \frac{|1 - 6|}{\sqrt5} = \sqrt5$ ✓.

Uchburchak yuzi: $S = \frac12|AB|\cdot|CD| = \frac12\cdot 2\sqrt5\cdot\sqrt5 = 5$.
:::

:::misol
Uchlari $A(0;\ 0)$, $B(3;\ 4)$, $C(4;\ -2)$ bo'lgan uchburchakda $C$ dan $AB$ ga tushirilgan balandlik asosi.

$AB$: $4x - 3y = 0$. $CD$: $3(x - 4) + 4(y + 2) = 0$, ya'ni $3x + 4y - 4 = 0$.

$y = \frac43x$ ni qo'yamiz: $3x + \frac{16}{3}x = 4$, $\frac{25}{3}x = 4$, $x = \frac{12}{25}$, $y = \frac{16}{25}$. Demak $D\left(\frac{12}{25};\ \frac{16}{25}\right)$.
:::

> 💡 [Mashqlar → «Tekislikda to'g'ri chiziq»](#/mashq/togri-chiziq) bo'limida masofa, burchak va tenglama tuzish masalalarini yeching.

:::savol
$O(0;\ 0)$ nuqtadan $5x - 12y + 26 = 0$ gacha masofa nechaga teng?
- 26
+ 2
- $\frac{26}{17}$
- 13
> $\frac{26}{13} = 2$.
:::

:::savol
$2x - y + 3 = 0$ va $4x - 2y - 1 = 0$ to'g'ri chiziqlar qanday joylashgan?
+ Parallel
- Perpendikulyar
- Ustma-ust
- $45^\circ$ burchak ostida kesishadi
:::

:::tarix
To'g'ri chiziqning umumiy tenglamasini birinchi bo'lib L. Eyler (1748) tizimli qo'llagan. Normal tenglama O. Gesse (1861) nomi bilan ham ataladi.
:::
