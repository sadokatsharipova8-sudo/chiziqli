# 6-mavzu. Qutb, silindrik va sferik koordinatalar sistemasi

**Bu mavzuda:** qutb koordinatalari va Dekart koordinatalari bilan bog'lanish, qutb tenglamalari, silindrik va sferik koordinatalar, qaysi masalada qaysi sistema qulay.

## 6.1. Qutb koordinatalari

:::tarif
Tekislikda $O$ — **qutb**, $Ox$ — **qutb o'qi**. $M$ nuqtaning qutb koordinatalari: $r = |OM| \ge 0$ — qutb radiusi, $\varphi$ — qutb burchagi ($0 \le \varphi < 2\pi$ yoki $-\pi < \varphi \le \pi$).
:::

$$x = r\cos\varphi,\quad y = r\sin\varphi;\qquad r = \sqrt{x^2 + y^2},\quad \operatorname{tg}\varphi = \frac yx.$$

:::diqqat
$\varphi$ ni topishda **chorakni** hisobga oling: $\operatorname{tg}\varphi$ bir xil bo'lgan ikki burchak $\pi$ ga farq qiladi.
:::

:::misol
$M(-1;\ \sqrt3)$: $r = 2$, II chorak, $\varphi = \frac{2\pi}{3}$. $M(-6;\ -8)$: $r = 10$, III chorak, $\varphi = \pi + \operatorname{arctg}\frac43$.
:::

:::savol
$M(1;\ 1)$ ning qutb burchagi?
+ $\dfrac\pi4$
- $\dfrac\pi2$
- $\dfrac{3\pi}{4}$
- $0$
:::

## 6.2. Qutb tenglamalari

| Tenglama | Chiziq |
|---|---|
| $r = a$ | markazi $O$ bo'lgan aylana |
| $\varphi = \varphi_0$ | nur |
| $r = 2a\cos\varphi$ | markazi $(a;\ 0)$, radiusi $a$ aylana |
| $r = a\varphi$ | Arximed spirali |
| $r = a(1 + \cos\varphi)$ | kardioida |
| $r = a\cos 2\varphi$ | to'rt yaproqli gul |
| $r = \dfrac{p}{1 - e\cos\varphi}$ | konus kesimi (10–11-mavzular) |

:::misol
$x^2 + y^2 = 2ax \Rightarrow r^2 = 2ar\cos\varphi \Rightarrow r = 2a\cos\varphi$.

$r = 4\sin\varphi \Rightarrow x^2 + y^2 = 4y \Rightarrow x^2 + (y - 2)^2 = 4$.
:::

Kompleks sonning trigonometrik shakli $z = r(\cos\varphi + i\sin\varphi)$ — aynan qutb koordinatalari (1-semestr 1-mavzu).

## 6.3. Silindrik koordinatalar

$(r, \varphi, z)$ — $Oxy$ dagi qutb koordinatalari va applikata:
$$x = r\cos\varphi,\qquad y = r\sin\varphi,\qquad z = z.$$

- $r = R$ — doiraviy silindr;
- $\varphi = \varphi_0$ — yarim tekislik;
- $z = c$ — gorizontal tekislik;
- $z = r$ — konus.

## 6.4. Sferik koordinatalar

$(\rho, \theta, \varphi)$: $\rho = |OM|$, $\theta$ — $Oz$ dan og'ish ($0 \le \theta \le \pi$), $\varphi$ — azimut:
$$x = \rho\sin\theta\cos\varphi,\quad y = \rho\sin\theta\sin\varphi,\quad z = \rho\cos\theta.$$

- $\rho = R$ — sfera;
- $\theta = \theta_0$ — konus;
- $\varphi = \varphi_0$ — yarim tekislik.

:::misol
$\rho = 2$, $\theta = \frac\pi2$, $\varphi = 0$: $M(2;\ 0;\ 0)$. $\ M(1;\ 1;\ \sqrt2)$: $\rho = 2$, $\cos\theta = \frac{\sqrt2}{2}$, $\theta = \frac\pi4$, $\varphi = \frac\pi4$.
:::

**Geografik koordinatalar:** kenglik $= 90^\circ - \theta$, uzunlik $= \varphi$. GPS aynan shu sistemada ishlaydi.

:::savol
Silindrik koordinatalarda $r = 3$ qanday sirt?
- Sfera
+ Doiraviy silindr
- Tekislik
- Konus
:::

## 6.5. Qaysi sistema qachon?

| Masala | Qulay sistema |
|---|---|
| ko'pburchaklar, to'g'ri chiziqlar | Dekart |
| aylana, spiral, markaziy kuch, radar | qutb |
| quvur, sim, o'q atrofidagi aylanish | silindrik |
| shar, sayyora, nurlanish, antenna | sferik |

Integral hisobda (2-kurs) mos sistema tanlash integralni keskin soddalashtiradi.

:::tarix
Qutb koordinatalarini I. Nyuton va Ya. Bernulli qo'llagan; sferik koordinatalar astronomiyada qadimdan (Ptolemey) ishlatilgan.
:::
