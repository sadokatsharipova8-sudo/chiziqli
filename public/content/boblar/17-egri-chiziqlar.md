# 17. Ikkinchi tartibli chiziqlar va ularni kanonik ko'rinishga keltirish

**Bu mavzuda:** aylana, ellips, giperbola, parabola — kanonik tenglamalar, fokuslar, ekssentrisitet, direktrisalar, asimptotalar; to'liq kvadrat ajratish va o'qlarni burish orqali umumiy tenglamani kanonik ko'rinishga keltirish; invariantlar.

## 17.1. Umumiy tenglama

Ikkinchi tartibli chiziqning umumiy tenglamasi:
$$a_{11}x^2 + 2a_{12}xy + a_{22}y^2 + 2a_{13}x + 2a_{23}y + a_{33} = 0.$$
Bosh qism $a_{11}x^2 + 2a_{12}xy + a_{22}y^2$ — 10-mavzudagi kvadratik forma.

## 17.2. Aylana

$$(x - a)^2 + (y - b)^2 = R^2$$
— markazi $(a;\ b)$, radiusi $R$. Umumiy tenglamada $a_{11} = a_{22}$, $a_{12} = 0$.

## 17.3. Ellips

:::tarif
Ikki $F_1$, $F_2$ nuqtagacha (fokuslargacha) masofalar yig'indisi o'zgarmas ($2a$) bo'lgan nuqtalar to'plami **ellips** deyiladi. Kanonik tenglama:
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1,\qquad b^2 = a^2 - c^2,$$
$a$ — katta, $b$ — kichik yarim o'q, $F_{1,2}(\pm c;\ 0)$ — fokuslar.
:::

:::xossa
- **Ekssentrisitet:** $e = \dfrac{c}{a} < 1$ ($e = 0$ — aylana; $e \to 1$ — ellips «yassilanadi»).
- **Fokal radiuslar:** $r_1 = a - ex$, $r_2 = a + ex$, $r_1 + r_2 = 2a$.
- **Direktrisalar:** $x = \pm\dfrac{a}{e}$; har bir nuqta uchun $\dfrac{r}{d} = e$.
- **Optik xossa:** bir fokusdan chiqqan nur ellipsdan qaytib, ikkinchi fokusdan o'tadi.
:::

Sayyoralar Quyosh atrofida ellips bo'ylab harakatlanadi (Kepler qonuni), Quyosh — fokuslardan birida.

:::misol
$25x^2 - 50x + 4y^2 + 16y - 59 = 0$. To'liq kvadratlar ajratamiz:
$$25(x - 1)^2 - 25 + 4(y + 2)^2 - 16 - 59 = 0 \Rightarrow 25(x - 1)^2 + 4(y + 2)^2 = 100,$$
$$\frac{(x - 1)^2}{4} + \frac{(y + 2)^2}{25} = 1.$$
Markazi $(1;\ -2)$ bo'lgan ellips; katta o'qi vertikal: $a = 5$, $b = 2$, $c = \sqrt{21}$, $e = \frac{\sqrt{21}}{5}$.
:::

## 17.4. Giperbola

:::tarif
Fokuslargacha masofalar ayirmasining moduli o'zgarmas ($2a$) bo'lgan nuqtalar to'plami **giperbola**:
$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1,\qquad b^2 = c^2 - a^2.$$
:::

:::xossa
- $e = \dfrac{c}{a} > 1$;
- **Asimptotalar:** $y = \pm\dfrac{b}{a}x$;
- Direktrisalar: $x = \pm\dfrac{a}{e}$;
- $a = b$ bo'lsa — **teng tomonli** giperbola ($x^2 - y^2 = a^2$ yoki $xy = k$);
- $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = -1$ — **qo'shma** giperbola.
:::

:::misol
$4x^2 - 9y^2 - 24x - 36y - 36 = 0$:
$$4(x - 3)^2 - 36 - 9(y + 2)^2 + 36 - 36 = 0 \Rightarrow \frac{(x - 3)^2}{9} - \frac{(y + 2)^2}{4} = 1.$$
Markaz $(3;\ -2)$, $a = 3$, $b = 2$, $c = \sqrt{13}$, $e = \frac{\sqrt{13}}{3}$. Asimptotalar: $y + 2 = \pm\frac23(x - 3)$.
:::

:::savol
$\frac{x^2}{16} - \frac{y^2}{9} = 1$ giperbolaning ekssentrisiteti nechaga teng?
- $\frac34$
+ $\frac54$
- $\frac53$
- $\frac{\sqrt7}{4}$
> $c = \sqrt{16 + 9} = 5$, $e = \frac{5}{4}$.
:::

## 17.5. Parabola

:::tarif
$F$ fokusdan va $d$ direktrisadan teng uzoqlikdagi nuqtalar to'plami **parabola**:
$$y^2 = 2px,\qquad F\left(\frac{p}{2};\ 0\right),\quad d:\ x = -\frac{p}{2}.$$
$p$ — **parametr**, $e = 1$.
:::

**Optik xossa:** fokusdan chiqqan nurlar paraboladan qaytgach o'qqa parallel ketadi — projektor, antenna, quyosh konsentratorlari shu xossaga asoslangan.

:::xossa Ekssentrisitet bo'yicha
Ellips, giperbola va parabola — fokusgacha va direktrisagacha masofalar nisbati $e$ o'zgarmas bo'lgan chiziqlar: $e < 1$ — ellips, $e = 1$ — parabola, $e > 1$ — giperbola. Ular **konus kesimlari** deyiladi.
:::

:::savol
$y^2 = 12x$ parabolaning fokusi qayerda?
- $(0;\ 3)$
+ $(3;\ 0)$
- $(6;\ 0)$
- $(12;\ 0)$
> $2p = 12$, $p = 6$, $F\left(\frac p2;\ 0\right) = (3;\ 0)$.
:::

## 17.6. Umumiy tenglamani kanonik ko'rinishga keltirish

**Algoritm:**
1. $a_{12} \ne 0$ bo'lsa, $\begin{pmatrix} a_{11} & a_{12}\\ a_{12} & a_{22}\end{pmatrix}$ ning xos sonlari $\lambda_1, \lambda_2$ va ortonormal xos vektorlarini topamiz; o'qlarni xos vektorlar bo'yicha buramiz ($\operatorname{ctg}2\alpha = \dfrac{a_{11} - a_{22}}{2a_{12}}$). Bosh qism $\lambda_1x'^2 + \lambda_2y'^2$ ga aylanadi.
2. To'liq kvadratlar ajratib, parallel ko'chirish bajaramiz.

:::misol
$5x^2 + 4xy + 8y^2 - 36 = 0$. $\begin{vmatrix} 5 - \lambda & 2\\ 2 & 8 - \lambda\end{vmatrix} = \lambda^2 - 13\lambda + 36 = 0$, $\lambda_1 = 4$, $\lambda_2 = 9$.

Xos vektorlar: $\lambda_1 = 4$ uchun $(2;\ -1)$, $\lambda_2 = 9$ uchun $(1;\ 2)$. Yangi o'qlar bo'yicha:
$$4x'^2 + 9y'^2 = 36 \Rightarrow \frac{x'^2}{9} + \frac{y'^2}{4} = 1 \text{ — ellips}.$$
:::

:::misol
$3x^2 + 10xy + 3y^2 - 2x - 14y - 13 = 0$.

1) Markaz: $\begin{cases} 3x + 5y - 1 = 0\\ 5x + 3y - 7 = 0\end{cases}$, ya'ni $x_0 = 2$, $y_0 = -1$. Ko'chirgandan so'ng ozod had: $a_{13}x_0 + a_{23}y_0 + a_{33} = -2 + 7 - 13 = -8$.

2) $\begin{pmatrix} 3 & 5\\ 5 & 3\end{pmatrix}$ ning xos sonlari: $\lambda_1 = 8$, $\lambda_2 = -2$.

Natija: $8x'^2 - 2y'^2 - 8 = 0$, ya'ni $x'^2 - \dfrac{y'^2}{4} = 1$ — giperbola.
:::

## 17.7. Invariantlar va tasnif

O'qlarni burish va ko'chirishda quyidagilar o'zgarmaydi:
$$I_1 = a_{11} + a_{22},\qquad I_2 = \begin{vmatrix} a_{11} & a_{12}\\ a_{12} & a_{22}\end{vmatrix},\qquad I_3 = \begin{vmatrix} a_{11} & a_{12} & a_{13}\\ a_{12} & a_{22} & a_{23}\\ a_{13} & a_{23} & a_{33}\end{vmatrix}.$$

| $I_2$ | Tur | $I_3 \ne 0$ bo'lganda |
|---|---|---|
| $I_2 > 0$ | elliptik | ellips (haqiqiy yoki mavhum) |
| $I_2 < 0$ | giperbolik | giperbola |
| $I_2 = 0$ | parabolik | parabola |

$I_3 = 0$ bo'lsa chiziq **aynigan**: nuqta, ikki kesishuvchi, parallel yoki ustma-ust to'g'ri chiziqlar juftligi.

:::savol
$x^2 + 4xy + 4y^2 + x - 1 = 0$ qanday turdagi chiziq?
- Elliptik
- Giperbolik
+ Parabolik
- Aylana
> $I_2 = 1\cdot 4 - 2^2 = 0$.
:::

> 💡 [Laboratoriya → Egri chiziqlar](#/lab/egri) da $a$, $b$, $e$ ni o'zgartirib, chiziq qanday o'zgarishini kuzating.

:::tarix
Konus kesimlarini qadimgi yunon matematigi Apolloniy Pergskiy (mil. avv. III–II asr) sakkiz kitobda batafsil o'rgangan; «ellips», «giperbola», «parabola» nomlari ham undan. Ularning fizikadagi ahamiyatini I. Kepler va I. Nyuton ochib bergan.
:::
