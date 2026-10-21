# 5-mavzu. Tekislikda va fazoda Dekart koordinatalar sistemasini almashtirish

**Bu mavzuda:** affin va Dekart koordinatalar sistemasi, masofa va yuza, parallel ko'chirish, o'qlarni burish, umumiy almashtirish, fazoda koordinatalarni almashtirish.

## 5.1. Koordinatalar sistemasi

:::tarif
$O$ nuqta va $\mathbf e_1, \mathbf e_2, \mathbf e_3$ bazis — **affin koordinatalar sistemasi**: $\overrightarrow{OM} = x\mathbf e_1 + y\mathbf e_2 + z\mathbf e_3$. Bazis ortonormal bo'lsa — **to'g'ri burchakli Dekart** sistemasi.
:::

Dekart sistemasida:
$$|AB| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2},\qquad S_{\triangle} = \frac12\left|\begin{vmatrix} x_1 & y_1 & 1\\ x_2 & y_2 & 1\\ x_3 & y_3 & 1\end{vmatrix}\right|.$$

:::savol
$A(1;\ -2;\ 3)$ va $B(3;\ 0;\ 2)$ orasidagi masofa?
+ 3
- 9
- $\sqrt5$
- 5
:::

## 5.2. Parallel ko'chirish

Yangi boshi $O'(a;\ b)$, o'qlar yo'nalishi saqlanadi:
$$x = x' + a,\quad y = y' + b;\qquad x' = x - a,\quad y' = y - b.$$

:::misol
$x^2 + y^2 - 4x + 6y = 3 \Rightarrow (x - 2)^2 + (y + 3)^2 = 16$. $O'(2;\ -3)$ ga ko'chirsak: $x'^2 + y'^2 = 16$. **Ko'chirish birinchi darajali hadlarni yo'qotadi.**
:::

## 5.3. O'qlarni burish

O'qlar $\alpha$ burchakka burilsa:
$$\begin{cases} x = x'\cos\alpha - y'\sin\alpha\\ y = x'\sin\alpha + y'\cos\alpha\end{cases}\qquad \begin{cases} x' = x\cos\alpha + y\sin\alpha\\ y' = -x\sin\alpha + y\cos\alpha\end{cases}$$

Matritsa shaklida $X = TX'$, $T = \begin{pmatrix} \cos\alpha & -\sin\alpha\\ \sin\alpha & \cos\alpha\end{pmatrix}$ — **ortogonal**: $T^{-1} = T^T$, $\det T = 1$. Bu 1-semestr 9-mavzudagi o'tish matritsasining xususiy holi.

:::misol
$90^\circ$ burishda $M(3;\ 1)$: $x' = 1$, $y' = -3$.

$xy = 1$ ni $45^\circ$ ga buramiz: $xy = \frac{x'^2 - y'^2}{2}$, ya'ni $\frac{x'^2}{2} - \frac{y'^2}{2} = 1$ — teng tomonli giperbola. **Burish $xy$ hadni yo'qotadi.**
:::

:::savol
O'qlar $90^\circ$ ga burilganda $M(3;\ 1)$ ning yangi koordinatalari?
- $(-1;\ 3)$
+ $(1;\ -3)$
- $(3;\ -1)$
- $(-3;\ 1)$
:::

## 5.4. Umumiy almashtirish

$$x = x'\cos\alpha - y'\sin\alpha + a,\qquad y = x'\sin\alpha + y'\cos\alpha + b.$$

:::misol
Boshi $O'(-2;\ 2)$, burish $180^\circ$. $M(3;\ 4)$: ko'chirish $(5;\ 2)$, burish $M'(-5;\ -2)$.
:::

Bu almashtirishlar masofa va burchaklarni saqlaydi (**harakatlar**). Ikkinchi tartibli chiziqlarni kanonik ko'rinishga keltirish (14–15-mavzular) aynan shularga asoslanadi.

## 5.5. Fazoda koordinatalarni almashtirish

**Ko'chirish:** $x = x' + a$, $y = y' + b$, $z = z' + c$.

**Burish:** yangi o'qlarning birlik vektorlari $\mathbf i', \mathbf j', \mathbf k'$ ning eski bazisdagi koordinatalari — yo'naltiruvchi kosinuslar:
$$\begin{pmatrix} x\\ y\\ z\end{pmatrix} = \begin{pmatrix} \cos\alpha_1 & \cos\alpha_2 & \cos\alpha_3\\ \cos\beta_1 & \cos\beta_2 & \cos\beta_3\\ \cos\gamma_1 & \cos\gamma_2 & \cos\gamma_3\end{pmatrix}\begin{pmatrix} x'\\ y'\\ z'\end{pmatrix}.$$
Matritsa ortogonal: ustunlari ortonormal, $T^{-1} = T^T$, $\det T = \pm 1$ ($+1$ — o'ng sistema saqlanadi).

:::misol
$Oz$ atrofida $\alpha$ ga burish: $T = \begin{pmatrix} \cos\alpha & -\sin\alpha & 0\\ \sin\alpha & \cos\alpha & 0\\ 0 & 0 & 1\end{pmatrix}$.
:::

**Eyler burchaklari:** fazodagi har qanday burish uchta ketma-ket o'q atrofidagi burishlar bilan ifodalanadi — aviatsiya va robototexnikada (yaw, pitch, roll) qo'llaniladi.

:::tarix
Koordinatalar usulini R. Dekart (1637) va P. Ferma yaratgan; fazoda koordinatalarni almashtirish formulalarini L. Eyler (1748) bergan.
:::
