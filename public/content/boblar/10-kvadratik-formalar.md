# 10. Chiziqli, bichiziqli va kvadratik formalar

**Bu mavzuda:** chiziqli va bichiziqli formalar, kvadratik formaning matritsasi, kanonik ko'rinish (Lagranj usuli va ortogonal almashtirish), inersiya qonuni, musbat aniqlangan formalar va Silvestr mezoni.

## 10.1. Chiziqli va bichiziqli formalar

:::tarif
$V$ fazoda aniqlangan $f(\mathbf x)$ son funksiyasi $f(\alpha\mathbf x + \beta\mathbf y) = \alpha f(\mathbf x) + \beta f(\mathbf y)$ shartni qanoatlantirsa, **chiziqli forma** deyiladi. Bazisda: $f(\mathbf x) = a_1x_1 + \dots + a_nx_n$.
:::

:::tarif
Har bir argumenti bo'yicha chiziqli bo'lgan $B(\mathbf x, \mathbf y)$ funksiya **bichiziqli forma** deyiladi. Bazisda:
$$B(\mathbf x, \mathbf y) = \sum_{i,j} b_{ij}x_iy_j = X^TBY,\qquad b_{ij} = B(\mathbf e_i, \mathbf e_j).$$
$B(\mathbf x, \mathbf y) = B(\mathbf y, \mathbf x)$ bo'lsa — **simmetrik** bichiziqli forma.
:::

Masalan, Yevklid fazosidagi skalyar ko'paytma — simmetrik bichiziqli forma. Bazis almashtirilganda bichiziqli forma matritsasi $B' = T^TBT$ qoida bo'yicha o'zgaradi.

## 10.2. Kvadratik forma

:::tarif
Simmetrik bichiziqli formada $\mathbf y = \mathbf x$ deb olinsa, **kvadratik forma** hosil bo'ladi:
$$f(\mathbf x) = \sum_{i,j=1}^{n} a_{ij}x_ix_j = X^TAX,\qquad a_{ij} = a_{ji}.$$
$A$ — formaning **matritsasi** (simmetrik); $r(A)$ — formaning **rangi**.
:::

:::diqqat
$x_ix_j$ ($i \ne j$) oldidagi koeffitsiyent ikkiga bo'linib, $a_{ij}$ va $a_{ji}$ ga teng taqsimlanadi.
:::

:::misol
$f = 3x_1^2 - 2x_2^2 + 4x_1x_2 - 6x_2x_3 + x_3^2$ ning matritsasi:
$$A = \begin{pmatrix} 3 & 2 & 0\\ 2 & -2 & -3\\ 0 & -3 & 1\end{pmatrix}.$$
:::

:::savol
$f = x_1^2 + 6x_1x_2 - 5x_2^2$ formaning matritsasidagi $a_{12}$ element nechaga teng?
- 6
+ 3
- −5
- 1
:::

## 10.3. Kanonik ko'rinish. Lagranj usuli

:::tarif
Faqat kvadratlardan iborat ko'rinish $f = \lambda_1y_1^2 + \lambda_2y_2^2 + \dots + \lambda_ny_n^2$ **kanonik ko'rinish** deyiladi. Koeffitsiyentlari $+1, -1, 0$ bo'lsa — **normal ko'rinish**.
:::

:::teorema Lagranj
Har qanday kvadratik formani xosmas chiziqli almashtirish bilan kanonik ko'rinishga keltirish mumkin.
:::

**Lagranj usuli** — to'liq kvadratlarni ketma-ket ajratish. Agar formada birorta ham kvadrat bo'lmasa, avval $x_1 = t_1 + t_2$, $x_2 = t_1 - t_2$ almashtirish bajariladi.

:::misol
$f = 2x_1x_2 - 6x_2x_3 + 2x_3x_1$. Kvadratlar yo'q: $x_1 = t_1 + t_2$, $x_2 = t_1 - t_2$, $x_3 = t_3$:
$$f = 2t_1^2 - 2t_2^2 - 4t_1t_3 + 8t_2t_3.$$
To'liq kvadratlar ajratamiz:
$$f = 2(t_1 - t_3)^2 - 2t_3^2 - 2t_2^2 + 8t_2t_3 = 2(t_1 - t_3)^2 - 2(t_2 - 2t_3)^2 + 6t_3^2.$$
$y_1 = t_1 - t_3$, $y_2 = t_2 - 2t_3$, $y_3 = t_3$:
$$f = 2y_1^2 - 2y_2^2 + 6y_3^2.$$
:::

## 10.4. Ortogonal almashtirish usuli

:::teorema
Har qanday haqiqiy kvadratik formani **ortogonal** almashtirish bilan kanonik ko'rinishga keltirish mumkin:
$$f = \lambda_1y_1^2 + \dots + \lambda_ny_n^2,$$
bunda $\lambda_i$ — $A$ matritsaning xos sonlari (11-mavzu), yangi o'qlar — ortonormallangan xos vektorlar.
:::

:::misol
$f = 5x^2 + 4xy + 8y^2$, $A = \begin{pmatrix} 5 & 2\\ 2 & 8\end{pmatrix}$. Xarakteristik tenglama: $\lambda^2 - 13\lambda + 36 = 0$, $\lambda_1 = 4$, $\lambda_2 = 9$. Kanonik ko'rinish: $f = 4x'^2 + 9y'^2$.
:::

Bu usul 17–18-mavzularda ikkinchi tartibli chiziq va sirtlarni kanonik ko'rinishga keltirishda ishlatiladi.

## 10.5. Inersiya qonuni

:::teorema Inersiya qonuni
Kvadratik formaning qaysi usulda kanonik ko'rinishga keltirilishidan qat'i nazar, musbat koeffitsiyentlar soni $p$ (musbat inersiya indeksi) va manfiy koeffitsiyentlar soni $q$ (manfiy inersiya indeksi) o'zgarmaydi. $p + q = r$ — forma rangi.
:::

Masalan, yuqoridagi $2y_1^2 - 2y_2^2 + 6y_3^2$ da $p = 2$, $q = 1$ — boshqa har qanday usulda ham shunday bo'ladi.

## 10.6. Musbat aniqlangan formalar. Silvestr mezoni

:::tarif
Har qanday $\mathbf x \ne \mathbf 0$ uchun $f(\mathbf x) > 0$ bo'lsa forma **musbat aniqlangan**, $f(\mathbf x) < 0$ bo'lsa — **manfiy aniqlangan**; har ikki ishorali qiymat qabul qilsa — **aniqlanmagan**.
:::

Burchak minorlari: $\Delta_1 = a_{11}$, $\ \Delta_2 = \begin{vmatrix} a_{11} & a_{12}\\ a_{21} & a_{22}\end{vmatrix}$, …, $\ \Delta_n = \det A$.

:::teorema Silvestr mezoni
1. Forma musbat aniqlangan $\iff$ barcha burchak minorlari musbat: $\Delta_1 > 0, \Delta_2 > 0, \dots, \Delta_n > 0$.
2. Forma manfiy aniqlangan $\iff$ ishoralar navbatlashadi: $\Delta_1 < 0, \Delta_2 > 0, \Delta_3 < 0, \dots$
:::

:::misol
$f = 2x_1^2 + 2x_2^2 + 2x_3^2 + 2x_1x_2 + 2x_2x_3$, $A = \begin{pmatrix} 2 & 1 & 0\\ 1 & 2 & 1\\ 0 & 1 & 2\end{pmatrix}$:
$\Delta_1 = 2 > 0$, $\Delta_2 = 3 > 0$, $\Delta_3 = 2\cdot 3 - 1\cdot 2 = 4 > 0$. Forma musbat aniqlangan.
:::

**Yakobi usuli:** barcha $\Delta_k \ne 0$ bo'lsa, forma $f = \dfrac{\Delta_1}{\Delta_0}y_1^2 + \dfrac{\Delta_2}{\Delta_1}y_2^2 + \dots + \dfrac{\Delta_n}{\Delta_{n-1}}y_n^2$ ($\Delta_0 = 1$) kanonik ko'rinishga keltiriladi.

:::savol
$f = -x^2 + 2xy - 3y^2$ qanday forma?
- Musbat aniqlangan
+ Manfiy aniqlangan
- Aniqlanmagan
- Aynigan
> $\Delta_1 = -1 < 0$, $\Delta_2 = 3 - 1 = 2 > 0$.
:::

:::savol
Kanonik ko'rinishi $3y_1^2 - y_2^2 + 0\cdot y_3^2$ bo'lgan forma rangi nechaga teng?
- 3
+ 2
- 1
- 0
:::

:::tarix
J. Silvestr (1814–1897) inersiya qonunini 1852-yilda isbotlagan va uni «inersiya qonuni» deb atagan. J. L. Lagranj (1736–1813) usulni mexanika masalalarida qo'llagan.
:::
