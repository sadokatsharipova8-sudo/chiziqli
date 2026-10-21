# 11-mavzu. Giperbola va parabolaning kanonik tenglamalari

**Bu mavzuda:** giperbolaning fokal ta'rifi, kanonik tenglamasi, shakli, asimptotalari, ekssentrisiteti, qo'shma va teng tomonli giperbola; parabolaning ta'rifi, kanonik tenglamasi, parametri, optik xossasi; konus kesimlarining yagona ta'rifi.

## 11.1. Giperbola

:::tarif
Fokuslargacha masofalar **ayirmasining moduli** o'zgarmas va $2a$ ga teng ($2a < 2c$) nuqtalar to'plami — **giperbola**:
$$\big||MF_1| - |MF_2|\big| = 2a.$$
:::

:::teorema
$F_{1,2}(\mp c;\ 0)$ bo'lsa:
$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1,\qquad b^2 = c^2 - a^2.$$
:::

**Shakli:** ikki tarmoq, $|x| \ge a$; uchlari $(\pm a;\ 0)$; $2a$ — haqiqiy o'q, $2b$ — mavhum o'q.

## 11.2. Asimptotalar va ekssentrisitet

:::xossa
- **Asimptotalar:** $y = \pm\dfrac ba x$ — tarmoqlar ularga cheksiz yaqinlashadi;
- $e = \dfrac ca > 1$; $e$ katta bo'lsa, tarmoqlar «ochiqroq»;
- direktrisalar $x = \pm\dfrac ae$, $\frac{r_i}{d_i} = e$;
- $a = b$ — **teng tomonli** giperbola: asimptotalar perpendikulyar, $e = \sqrt2$; $xy = k$ ham teng tomonli giperbola (o'qlar $45^\circ$ ga burilgan);
- $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = -1$ — **qo'shma** giperbola.
:::

Asimptotalarni chizish: tomonlari $2a$, $2b$ bo'lgan to'g'ri to'rtburchak diagonallari.

:::misol
$\dfrac{x^2}{16} - \dfrac{y^2}{9} = 1$: $c = 5$, fokuslar $(\pm5;\ 0)$, $e = \frac54$, asimptotalar $y = \pm\frac34x$.
:::

:::misol Markazi siljigan
$4x^2 - 9y^2 - 24x - 36y - 36 = 0 \Rightarrow \dfrac{(x - 3)^2}{9} - \dfrac{(y + 2)^2}{4} = 1$: markaz $(3;\ -2)$, $a = 3$, $b = 2$, $c = \sqrt{13}$, asimptotalar $y + 2 = \pm\frac23(x - 3)$.
:::

:::savol
Giperbola uchun $c^2$ = ?
- $a^2 - b^2$
+ $a^2 + b^2$
- $b^2 - a^2$
- $2ab$
:::

## 11.3. Parabola

:::tarif
Fokus $F$ dan va direktrisa $d$ dan teng uzoqlikdagi nuqtalar to'plami — **parabola**.
:::

:::teorema
$F\left(\frac p2;\ 0\right)$, $d$: $x = -\frac p2$ bo'lsa:
$$y^2 = 2px,$$
$p > 0$ — **parametr** (fokusdan direktrisagacha masofa), $e = 1$.
:::

- Uchi — $O$, o'qi — $Ox$; $x^2 = 2py$ — o'qi $Oy$ bo'lgan parabola;
- fokal radius: $r = x + \frac p2$;
- **optik xossa:** fokusdan chiqqan nurlar o'qqa parallel qaytadi (va aksincha).

:::misol
$y^2 = 12x$: $p = 6$, fokus $(3;\ 0)$, direktrisa $x = -3$. $\ x^2 = 4y$: fokus $(0;\ 1)$, direktrisa $y = -1$.

$y^2 - 2y - 8x + 9 = 0 \Rightarrow (y - 1)^2 = 8(x - 1)$: uchi $(1;\ 1)$, $p = 4$.
:::

:::savol
$y^2 = 8x$ direktrisasi?
- $x = 2$
+ $x = -2$
- $x = -4$
- $y = -2$
:::

## 11.4. Yagona ta'rif

:::teorema
Fokusgacha masofaning direktrisagacha masofaga nisbati o'zgarmas $e$ bo'lgan chiziq: $e < 1$ — ellips, $e = 1$ — parabola, $e > 1$ — giperbola. Qutb koordinatalarida (fokus — qutb):
$$r = \frac{p}{1 - e\cos\varphi}.$$
:::

## 11.5. Hayotda

- **Parabola:** otilgan jism trayektoriyasi (havo qarshiligisiz), sun'iy yo'ldosh antennasi, avtomobil faralari, quyosh konsentratorlari, osma ko'prik troslari (taxminan).
- **Giperbola:** kometalarning ochiq orbitalari ($e > 1$), LORAN va GPS navigatsiyasi (signallar kelish vaqti farqi — giperbola), sovitish minoralari kesimi, Boyl–Mariott qonuni $pV = \text{const}$.

:::tarix
Parabolaning optik xossasini Arximed bilgan; rivoyatga ko'ra u ko'zgular bilan dushman kemalarini yoqqan. Kepler «fokus» (lotincha — o'choq) atamasini kiritgan.
:::
