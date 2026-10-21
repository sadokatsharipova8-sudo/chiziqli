# 14. Koordinatalar sistemasi va uni almashtirish

**Bu mavzuda:** affin va Dekart koordinatalar sistemasi, ikki nuqta orasidagi masofa, koordinata o'qlarini parallel ko'chirish va burish, qutb, silindrik va sferik koordinatalar.

## 14.1. Affin va Dekart koordinatalar sistemasi

:::tarif
$O$ nuqta va $\mathbf e_1, \mathbf e_2, \mathbf e_3$ bazis birgalikda **affin koordinatalar sistemasi** deyiladi. $M$ nuqtaning koordinatalari — uning radius-vektori $\overrightarrow{OM}$ ning shu bazisdagi koordinatalari:
$$\overrightarrow{OM} = x\mathbf e_1 + y\mathbf e_2 + z\mathbf e_3.$$
Bazis ortonormal ($\mathbf i, \mathbf j, \mathbf k$) bo'lsa — **to'g'ri burchakli Dekart** koordinatalar sistemasi.
:::

Dekart sistemasida ikki nuqta orasidagi masofa:
$$d = |AB| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}.$$

Tekislikda uchburchak yuzi (uchlari bo'yicha):
$$S = \frac12\left|\begin{vmatrix} x_2 - x_1 & y_2 - y_1\\ x_3 - x_1 & y_3 - y_1\end{vmatrix}\right|.$$

:::savol
$A(1;\ -2;\ 3)$ va $B(3;\ 0;\ 2)$ nuqtalar orasidagi masofa nechaga teng?
+ 3
- 9
- $\sqrt5$
- 5
> $\sqrt{4 + 4 + 1} = 3$.
:::

## 14.2. Parallel ko'chirish

Yangi sistemaning boshi $O'(a;\ b)$, o'qlar yo'nalishi saqlanadi:
$$x = x' + a,\qquad y = y' + b\qquad (x' = x - a,\ y' = y - b).$$

Bu almashtirish ikkinchi tartibli chiziq tenglamasidagi birinchi darajali hadlarni yo'qotish uchun qo'llaniladi (to'liq kvadrat ajratish).

:::misol
$x^2 + y^2 - 4x + 6y = 3$: $(x - 2)^2 + (y + 3)^2 = 16$. $O'(2;\ -3)$ ga ko'chirsak, $x'^2 + y'^2 = 16$ — markazi $O'$ da, radiusi 4 bo'lgan aylana.
:::

## 14.3. O'qlarni burish

O'qlar $O$ atrofida $\alpha$ burchakka (soat strelkasiga qarshi) burilsa:
$$\begin{cases} x = x'\cos\alpha - y'\sin\alpha\\ y = x'\sin\alpha + y'\cos\alpha\end{cases}\qquad \begin{cases} x' = x\cos\alpha + y\sin\alpha\\ y' = -x\sin\alpha + y\cos\alpha\end{cases}$$

Burish matritsasi $T = \begin{pmatrix} \cos\alpha & -\sin\alpha\\ \sin\alpha & \cos\alpha\end{pmatrix}$ — **ortogonal**: $T^{-1} = T^T$, $\det T = 1$. Bu 8-mavzudagi $X = TX'$ formulaning xususiy holi.

Umumiy holda (ko'chirish + burish):
$$x = x'\cos\alpha - y'\sin\alpha + a,\qquad y = x'\sin\alpha + y'\cos\alpha + b.$$

:::misol
O'qlar $45^\circ$ ga burilsa: $x = \frac{x' - y'}{\sqrt2}$, $y = \frac{x' + y'}{\sqrt2}$. U holda $xy = 1$ giperbola: $\frac{x'^2 - y'^2}{2} = 1$, ya'ni $\frac{x'^2}{2} - \frac{y'^2}{2} = 1$ — teng tomonli giperbola.
:::

:::savol
O'qlar $90^\circ$ ga burilganda $M(3;\ 1)$ nuqtaning yangi koordinatalari qanday?
- $(-1;\ 3)$
+ $(1;\ -3)$
- $(3;\ -1)$
- $(-3;\ 1)$
> $x' = x\cos 90^\circ + y\sin 90^\circ = 1$, $y' = -x\sin 90^\circ + y\cos 90^\circ = -3$.
:::

## 14.4. Qutb koordinatalari

:::tarif
Tekislikda $O$ qutb va $Ox$ qutb o'qi berilgan. $M$ nuqtaning **qutb koordinatalari**: $r = |OM| \ge 0$ — qutb radiusi, $\varphi$ — qutb burchagi ($0 \le \varphi < 2\pi$ yoki $-\pi < \varphi \le \pi$).
:::

$$x = r\cos\varphi,\quad y = r\sin\varphi;\qquad r = \sqrt{x^2 + y^2},\quad \operatorname{tg}\varphi = \frac{y}{x}.$$

:::diqqat
$\varphi$ ni topishda nuqta qaysi chorakda yotishini hisobga oling: $\operatorname{tg}\varphi$ bir xil bo'lgan ikki burchak $\pi$ ga farq qiladi.
:::

:::misol
$M(-1;\ \sqrt3)$: $r = 2$, nuqta II chorakda, $\varphi = \frac{2\pi}{3}$.

Qutb koordinatalarda ba'zi chiziqlar sodda yoziladi: $r = a$ — aylana; $r = 2a\cos\varphi$ — markazi $(a;\ 0)$ dagi aylana; $r = a\varphi$ — Arximed spirali; $r = a(1 + \cos\varphi)$ — kardioida.
:::

Kompleks sonning trigonometrik shakli (1-mavzu) — aynan qutb koordinatalari: $z = r(\cos\varphi + i\sin\varphi)$.

## 14.5. Silindrik va sferik koordinatalar

**Silindrik koordinatalar** $(r, \varphi, z)$ — $xy$ tekislikdagi qutb koordinatalari va applikata:
$$x = r\cos\varphi,\quad y = r\sin\varphi,\quad z = z.$$
$r = R$ — doiraviy silindr.

**Sferik koordinatalar** $(\rho, \theta, \varphi)$: $\rho = |OM|$, $\theta$ — $Oz$ o'qdan og'ish burchagi ($0 \le \theta \le \pi$), $\varphi$ — uzunlik burchagi:
$$x = \rho\sin\theta\cos\varphi,\quad y = \rho\sin\theta\sin\varphi,\quad z = \rho\cos\theta.$$
$\rho = R$ — sfera. Geografik koordinatalar (kenglik, uzunlik) — sferik koordinatalarning bir ko'rinishi.

:::savol
Sferik koordinatalari $\rho = 2$, $\theta = \frac{\pi}{2}$, $\varphi = 0$ bo'lgan nuqtaning Dekart koordinatalari qanday?
+ $(2;\ 0;\ 0)$
- $(0;\ 0;\ 2)$
- $(0;\ 2;\ 0)$
- $(1;\ 1;\ 0)$
:::

:::tarix
Koordinatalar usulini R. Dekart (1637, «Geometriya») va P. Ferma bir-biridan mustaqil yaratgan. Qutb koordinatalarini I. Nyuton va Ya. Bernulli qo'llagan.
:::
