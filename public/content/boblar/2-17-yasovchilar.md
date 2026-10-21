# 17-mavzu. Ikkinchi tartibli sirtlarning to'g'ri chiziqli yasovchilari

**Bu mavzuda:** chiziqli sirt tushunchasi, silindr va konusning yasovchilari, bir pallali giperboloid va giperbolik paraboloidning ikki oila yasovchilari, ularning xossalari, yasovchini topish usuli, muhandislikdagi tatbiqlar.

## 17.1. Chiziqli sirtlar

:::tarif
Sirtning har bir nuqtasidan unda butunlay yotuvchi to'g'ri chiziq o'tsa, sirt **chiziqli** (to'g'ri chiziqli) deyiladi; bu to'g'ri chiziqlar — **to'g'ri chiziqli yasovchilar**.
:::

Ikkinchi tartibli sirtlar orasida chiziqli sirtlar:
- **silindrlar** (yasovchilar parallel);
- **konus** (yasovchilar uchdan o'tadi);
- **bir pallali giperboloid** va **giperbolik paraboloid** — har bir nuqtadan **ikkita** yasovchi o'tadi!

Ellipsoid, ikki pallali giperboloid va elliptik paraboloid chiziqli sirt emas (ular «qavariq» — to'g'ri chiziq ular bilan ko'pi bilan 2 nuqtada kesishadi).

## 17.2. Bir pallali giperboloid

$$\frac{x^2}{a^2} - \frac{z^2}{c^2} = 1 - \frac{y^2}{b^2} \iff \left(\frac xa - \frac zc\right)\left(\frac xa + \frac zc\right) = \left(1 - \frac yb\right)\left(1 + \frac yb\right).$$

**1-oila** (har bir $k$ uchun):
$$\frac xa - \frac zc = k\left(1 - \frac yb\right),\qquad k\left(\frac xa + \frac zc\right) = 1 + \frac yb.$$

**2-oila:**
$$\frac xa - \frac zc = m\left(1 + \frac yb\right),\qquad m\left(\frac xa + \frac zc\right) = 1 - \frac yb.$$

Har bir tenglamalar juftligi — ikki tekislik kesishmasi, ya'ni to'g'ri chiziq. Ularni ko'paytirsak, giperboloid tenglamasi hosil bo'ladi — demak to'g'ri chiziq butunlay sirtda yotadi.

## 17.3. Giperbolik paraboloid

$$\frac{x^2}{p} - \frac{y^2}{q} = 2z \iff \left(\frac{x}{\sqrt p} - \frac{y}{\sqrt q}\right)\left(\frac{x}{\sqrt p} + \frac{y}{\sqrt q}\right) = 2z.$$

1-oila: $\frac{x}{\sqrt p} - \frac{y}{\sqrt q} = 2k$, $\ k\left(\frac{x}{\sqrt p} + \frac{y}{\sqrt q}\right) = z$; 2-oila — omillar o'rnini almashtirib.

:::misol
$z = xy$ (giperbolik paraboloid) — har bir nuqtadan ikki yasovchi: $x = x_0$, $z = x_0y$ va $y = y_0$, $z = xy_0$. Ular koordinata tekisliklariga parallel to'g'ri chiziqlar!
:::

## 17.4. Yasovchini nuqta orqali topish

Yasovchi $M_0$ dan $\mathbf s = (l;\ m;\ n)$ yo'nalishda: $x = x_0 + lt$, … ni sirt tenglamasiga qo'yamiz; tenglik **barcha $t$ da** bajarilishi uchun $t$ va $t^2$ oldidagi koeffitsiyentlar nolga teng bo'lishi kerak.

:::misol
$\dfrac{x^2}{9} + \dfrac{y^2}{1} - \dfrac{z^2}{25} = 1$, $M(3;\ 0;\ 0)$. $x = 3 + lt$, $y = mt$, $z = nt$:
$$\frac{(3 + lt)^2}{9} + m^2t^2 - \frac{n^2t^2}{25} = 1 \Rightarrow \frac{2l}{3}t + \left(\frac{l^2}{9} + m^2 - \frac{n^2}{25}\right)t^2 = 0.$$
$l = 0$, $m^2 = \frac{n^2}{25}$: $m = 1 \Rightarrow n = \pm5$. Ikki yasovchi: $\mathbf s_1 = (0;\ 1;\ 5)$, $\mathbf s_2 = (0;\ 1;\ -5)$.
:::

## 17.5. Yasovchilar xossalari

:::xossa
1. Bir oilaning ikki turli yasovchisi kesishmaydi (ayqash).
2. Turli oilalarning ikki yasovchisi kesishadi (yoki parallel).
3. Sirtning har bir nuqtasidan har bir oiladan bittadan yasovchi o'tadi.
4. Bir oiladagi istalgan uchta yasovchi bitta tekislikka parallel emas (giperboloid) yoki bitta tekislikka parallel (giperbolik paraboloid).
:::

:::savol
Qaysi sirt to'g'ri chiziqli yasovchilarga ega?
- Ellipsoid
+ Bir pallali giperboloid
- Ikki pallali giperboloid
- Elliptik paraboloid
:::

## 17.6. Muhandislikda

- **Shuxov minoralari:** V. G. Shuxov (1853–1939) giperboloid konstruksiyalarni patentlagan (1896). Egri sirt **to'g'ri** po'lat balkalardan yig'iladi — arzon, yengil va shamolga chidamli. Shabolovka teleminorasi (Moskva, 1922).
- **Sovitish minoralari** (AES, IES) — bir pallali giperboloid shaklida.
- **Giperbolik paraboloid tomlar** («egar» tomlar) — to'g'ri yog'och to'sinlardan quriladi; Kanton minorasi, ko'plab sport inshootlari.
- Tishli g'ildiraklarda **giperboloid uzatmalar** — ayqash vallar orasida aylanishni uzatadi.

:::savol
Shuxov minoralari qaysi xossaga asoslangan?
- Sirt qavariq
+ Egri sirt to'g'ri chiziqlardan iborat
- Sirt yopiq
- Sirt simmetrik emas
:::

:::tarix
Bir pallali giperboloid yasovchilarini K. Ren (1669) kashf etgan; ikki oila haqidagi to'liq nazariyani G. Monj (XVIII asr) bergan.
:::
