# 1-mavzu. Kompleks sonlar va ularning trigonometrik shakli. Muavr formulasi

**Bu mavzuda:** kompleks sonning algebraik shakli, amallar, qo'shma son va modul, trigonometrik va ko'rsatkichli shakllar, Muavr formulasi, ildiz chiqarish.

## 1.1. Kompleks son tushunchasi

$x^2 + 1 = 0$ tenglama haqiqiy sonlar orasida yechimga ega emas. Shuning uchun yangi son — **mavhum birlik** $i$ kiritiladi:
$$i^2 = -1.$$

:::tarif
$z = x + iy$ ko'rinishidagi son ($x, y \in \mathbb R$) **kompleks son** deyiladi. $x = \operatorname{Re} z$ — haqiqiy qismi, $y = \operatorname{Im} z$ — mavhum qismi. Ikki kompleks son haqiqiy va mavhum qismlari mos ravishda teng bo'lgandagina teng.
:::

$y = 0$ bo'lsa, $z$ haqiqiy son; $x = 0$ bo'lsa — sof mavhum son. Demak, $\mathbb R \subset \mathbb C$.

Endi har qanday kvadrat tenglama yechiladi. Masalan, $x^2 - 2px + q = 0$ da $q - p^2 > 0$ bo'lsa:
$$x_{1,2} = p \pm i\sqrt{q - p^2}.$$

## 1.2. Algebraik shakldagi amallar

$z_1 = x_1 + iy_1$, $z_2 = x_2 + iy_2$ bo'lsin.

:::xossa
1. **Qo'shish/ayirish:** $z_1 \pm z_2 = (x_1 \pm x_2) + i(y_1 \pm y_2)$.
2. **Ko'paytirish** (qavslarni ochib, $i^2=-1$ ni hisobga olamiz): $z_1z_2 = (x_1x_2 - y_1y_2) + i(x_1y_2 + x_2y_1)$.
3. **Bo'lish** ($z_2 \ne 0$): $\dfrac{z_1}{z_2} = \dfrac{x_1x_2 + y_1y_2}{x_2^2 + y_2^2} + i\,\dfrac{x_2y_1 - x_1y_2}{x_2^2 + y_2^2}$.
:::

Qo'shish va ko'paytirish haqiqiy sonlardagi kabi kommutativ, assotsiativ va distributiv — $\mathbb C$ **maydon** tashkil etadi.

:::misol
$(1 + 2i)(3 + 4i) = 3 + 4i + 6i + 8i^2 = -5 + 10i$.

$\dfrac{1+2i}{3+4i} = \dfrac{(1+2i)(3-4i)}{(3+4i)(3-4i)} = \dfrac{11 + 2i}{25} = \dfrac{11}{25} + \dfrac{2}{25}i$.
:::

$i$ ning darajalari davriy: $i^1 = i,\ i^2 = -1,\ i^3 = -i,\ i^4 = 1$. Masalan, $i^{103} = i^{100}\cdot i^3 = -i$.

:::savol
$(2 - i)(1 + 3i)$ ko'paytma nimaga teng?
- $2 - 3i$
+ $5 + 5i$
- $-1 + 5i$
- $5 - 5i$
> $2 + 6i - i - 3i^2 = 2 + 5i + 3 = 5 + 5i$.
:::

## 1.3. Qo'shma son va modul

:::tarif
$\bar z = x - iy$ son $z = x + iy$ ga **qo'shma** deyiladi. $|z| = \sqrt{x^2 + y^2} = \sqrt{z\bar z}$ — $z$ ning **moduli**.
:::

:::xossa
$\overline{z_1 + z_2} = \bar z_1 + \bar z_2,\quad \overline{z_1z_2} = \bar z_1\bar z_2,\quad z + \bar z = 2x,\quad z\bar z = x^2 + y^2,$

$|z_1z_2| = |z_1||z_2|,\qquad |z_1 + z_2| \le |z_1| + |z_2|$ (uchburchak tengsizligi).
:::

Bo'lishning qulay usuli: surat va maxrajni **maxrajning qo'shmasiga** ko'paytirish — maxraj haqiqiy songa aylanadi.

## 1.4. Geometrik talqin. Trigonometrik shakl

$z = x + iy$ songa tekislikdagi $(x, y)$ nuqta (yoki radius-vektor) mos keladi. Modul — koordinata boshidan masofa; qo'shish — vektorlarni qo'shish; qo'shma son — $Ox$ o'qqa nisbatan simmetrik nuqta.

:::tarif
$\varphi = \arg z$ — $Ox$ o'qning musbat yo'nalishidan radius-vektorgacha bo'lgan burchak (**argument**). $r = |z|$ bo'lsa,
$$z = r(\cos\varphi + i\sin\varphi),\qquad \cos\varphi = \frac{x}{r},\ \sin\varphi = \frac{y}{r}.$$
Bu — **trigonometrik shakl**. Eyler formulasi $e^{i\varphi} = \cos\varphi + i\sin\varphi$ yordamida **ko'rsatkichli shakl**: $z = re^{i\varphi}$.
:::

:::teorema Ko'paytirish va bo'lish
$z_1z_2 = r_1r_2\big(\cos(\varphi_1 + \varphi_2) + i\sin(\varphi_1 + \varphi_2)\big)$ — modullar ko'paytiriladi, argumentlar qo'shiladi.

$\dfrac{z_1}{z_2} = \dfrac{r_1}{r_2}\big(\cos(\varphi_1 - \varphi_2) + i\sin(\varphi_1 - \varphi_2)\big)$ — modullar bo'linadi, argumentlar ayiriladi.
:::

:::misol
$z = 1 - i$: $r = \sqrt 2$, $\varphi = -\frac{\pi}{4}$, ya'ni $1 - i = \sqrt2\left(\cos\left(-\frac\pi4\right) + i\sin\left(-\frac\pi4\right)\right) = \sqrt2 e^{-i\pi/4}$.
:::

:::savol
$z = -2i$ sonining argumenti (asosiy qiymati) nimaga teng?
- $\dfrac{\pi}{2}$
+ $-\dfrac{\pi}{2}$
- $\pi$
- $0$
> Nuqta $(0; -2)$ — mavhum o'qning manfiy qismida.
:::

## 1.5. Muavr formulasi

:::teorema Muavr formulasi
Istalgan butun $n$ uchun
$$z^n = r^n(\cos n\varphi + i\sin n\varphi).$$
:::

:::misol
$(1 - i)^8 = (\sqrt2)^8\left(\cos(-2\pi) + i\sin(-2\pi)\right) = 16$.

$(1 + i)^6 = (\sqrt 2)^6\left(\cos\frac{6\pi}{4} + i\sin\frac{6\pi}{4}\right) = 8(0 - i) = -8i$.
:::

## 1.6. Ildiz chiqarish

:::teorema
Nolga teng bo'lmagan $z = r(\cos\varphi + i\sin\varphi)$ son $n$ ta har xil $n$-darajali ildizga ega:
$$z_k = \sqrt[n]{r}\left(\cos\frac{\varphi + 2\pi k}{n} + i\sin\frac{\varphi + 2\pi k}{n}\right),\qquad k = 0, 1, \dots, n-1.$$
:::

Geometrik ma'nosi: barcha ildizlar radiusi $\sqrt[n]{r}$ bo'lgan aylanada yotadi va uni $n$ ta teng bo'lakka bo'ladi (muntazam $n$-burchak uchlari).

:::misol
$\sqrt[3]{1}$: $z_k = \cos\frac{2\pi k}{3} + i\sin\frac{2\pi k}{3}$, ya'ni $1,\ -\frac12 + \frac{\sqrt3}{2}i,\ -\frac12 - \frac{\sqrt3}{2}i$.
:::

:::savol
$z^4 = 16$ tenglama nechta kompleks ildizga ega?
- 1
- 2
+ 4
- 16
:::

## 1.7. Ko'phadlar haqida

:::teorema Bezu teoremasi
$P(z)$ ko'phadni $z - \alpha$ ga bo'lishdagi qoldiq $P(\alpha)$ ga teng. Xususan, $P(\alpha) = 0$ bo'lsa, $P(z)$ ko'phad $z - \alpha$ ga qoldiqsiz bo'linadi.
:::

:::teorema Algebraning asosiy teoremasi
$n \ge 1$ darajali har qanday ko'phad kamida bitta kompleks ildizga ega. Demak, $n$-darajali ko'phad karraliklari bilan hisoblanganda roppa-rosa $n$ ta ildizga ega.
:::

Haqiqiy koeffitsiyentli ko'phadning kompleks ildizlari qo'shma juft bo'lib keladi: $\alpha$ ildiz bo'lsa, $\bar\alpha$ ham ildiz. Shuning uchun toq darajali haqiqiy ko'phad albatta haqiqiy ildizga ega.

Ko'phadni $z - \alpha$ ga bo'lish **Gorner sxemasi** bilan bajariladi. Masalan, $2x^5 + 3x^4 - x^2 + x - 5$ ni $x - 2$ ga bo'lganda qoldiq $P(2) = 105$.

:::tarix
Kompleks sonlar XVI asrda Kardano va Bombelli tomonidan kub tenglamalarni yechishda paydo bo'lgan. $i$ belgisini L. Eyler (1777), geometrik talqinni K. Vessel va K. F. Gauss kiritgan. Muavr formulasi ingliz matematigi A. de Muavr (1667–1754) nomi bilan ataladi.
:::
