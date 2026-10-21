# 10-mavzu. Tekislikda ikkinchi tartibli chiziqlar. Ellips va uning kanonik tenglamasi

**Bu mavzuda:** ikkinchi tartibli chiziq tushunchasi, aylana, ellipsning fokal ta'rifi, kanonik tenglamani keltirib chiqarish, shakli, ekssentrisitet, fokal radiuslar, direktrisalar, optik xossa, parametrik tenglama.

## 10.1. Ikkinchi tartibli chiziqlar

:::tarif
Dekart koordinatalarida ikkinchi darajali tenglama bilan beriladigan chiziq — **ikkinchi tartibli chiziq**:
$$a_{11}x^2 + 2a_{12}xy + a_{22}y^2 + 2a_{13}x + 2a_{23}y + a_{33} = 0.$$
:::

Ular — doiraviy konusni tekislik bilan kesishda hosil bo'ladigan **konus kesimlari**: aylana, ellips, giperbola, parabola (va aynigan hollar).

## 10.2. Aylana

$$(x - a)^2 + (y - b)^2 = R^2$$
— markazi $(a;\ b)$, radiusi $R$. Umumiy tenglamada $a_{11} = a_{22}$, $a_{12} = 0$.

:::savol
$x^2 + y^2 + 6x - 2y = 6$ aylana markazi?
- $(3;\ -1)$
+ $(-3;\ 1)$
- $(6;\ -2)$
- $(-6;\ 2)$
> $(x + 3)^2 + (y - 1)^2 = 16$.
:::

## 10.3. Ellips: ta'rif va kanonik tenglama

:::tarif
Ikki nuqtagacha (**fokuslar** $F_1$, $F_2$) masofalar yig'indisi o'zgarmas va $2a$ ga teng ($2a > |F_1F_2| = 2c$) nuqtalar to'plami — **ellips**.
:::

$F_{1,2}(\mp c;\ 0)$ deb, $\sqrt{(x + c)^2 + y^2} + \sqrt{(x - c)^2 + y^2} = 2a$ ni ikki marta kvadratga ko'tarib soddalashtiramiz:

:::teorema
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1,\qquad b^2 = a^2 - c^2.$$
:::

## 10.4. Shakli

- Simmetriya o'qlari — koordinata o'qlari, markazi — $O$;
- uchlari $(\pm a;\ 0)$, $(0;\ \pm b)$; $a$ — katta, $b$ — kichik yarim o'q;
- ellips $|x| \le a$, $|y| \le b$ to'g'ri to'rtburchak ichida;
- $a = b$ — aylana.

**Parametrik tenglama:** $x = a\cos t$, $y = b\sin t$, $0 \le t < 2\pi$.

**Siqish ma'nosi:** ellips — $x^2 + y^2 = a^2$ aylanani $Oy$ bo'ylab $\frac ba$ marta siqish natijasi.

## 10.5. Ekssentrisitet, fokal radiuslar, direktrisalar

:::xossa
- **Ekssentrisitet:** $e = \dfrac ca$, $0 \le e < 1$; $e = 0$ — aylana, $e \to 1$ — «yassi» ellips;
- **fokal radiuslar:** $r_1 = a + ex$, $r_2 = a - ex$ ($r_1 + r_2 = 2a$);
- **direktrisalar:** $x = \pm\dfrac ae$; har bir nuqta uchun $\dfrac{r_i}{d_i} = e$;
- **optik xossa:** bir fokusdan chiqqan nur ellipsdan qaytib, ikkinchi fokusdan o'tadi.
:::

:::misol
$\dfrac{x^2}{25} + \dfrac{y^2}{16} = 1$: $a = 5$, $b = 4$, $c = 3$, fokuslar $(\pm3;\ 0)$, $e = \frac35$, direktrisalar $x = \pm\frac{25}{3}$.
:::

:::misol Markazi siljigan ellips
$25x^2 - 50x + 4y^2 + 16y - 59 = 0 \Rightarrow 25(x - 1)^2 + 4(y + 2)^2 = 100$:
$$\frac{(x - 1)^2}{4} + \frac{(y + 2)^2}{25} = 1.$$
Markaz $(1;\ -2)$, katta o'q **vertikal**: $a = 5$, $b = 2$, $c = \sqrt{21}$.
:::

:::savol
$\frac{x^2}{16} + \frac{y^2}{9} = 1$ ning katta yarim o'qi?
- 16
+ 4
- 3
- 5
:::

## 10.6. Ellips hayotda

- **Kepler 1-qonuni:** sayyoralar Quyosh atrofida ellips bo'ylab aylanadi, Quyosh — fokuslardan birida. Yer orbitasi $e \approx 0{,}017$ — deyarli aylana; Galley kometasi $e \approx 0{,}97$.
- **Litotripsiya:** buyrak toshini maydalashda zarba to'lqini ellipsoid ko'zguning bir fokusida hosil qilinib, toshga (ikkinchi fokusga) yo'naltiriladi.
- **Shivirlovchi galereyalar:** ellips shaklidagi zalda bir fokusdagi shivir ikkinchi fokusda aniq eshitiladi.

> 💡 [Laboratoriya → Egri chiziqlar](#/lab/egri) da $a$, $b$, $e$ ni o'zgartirib ellipsni kuzating.

:::tarix
Ellips, giperbola va parabola nomlarini Apolloniy Pergskiy (mil. avv. III asr) bergan.
:::
