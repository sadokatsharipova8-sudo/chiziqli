# 10-mavzu. Chiziqli qism fazo. Qism fazolarning yig'indisi va kesishmasi

**Bu mavzuda:** qism fazo ta'rifi va kriteriysi, misollar, chiziqli qobiq, qism fazo o'lchami, qism fazolar yig'indisi va kesishmasi, Grassman formulasi, to'g'ri yig'indi.

## 10.1. Qism fazo

:::tarif
$V$ fazoning bo'sh bo'lmagan $L$ qism to'plami qo'shish va songa ko'paytirishga nisbatan yopiq bo'lsa — **chiziqli qism fazo**:
$$\mathbf x, \mathbf y \in L\ \Rightarrow\ \alpha\mathbf x + \beta\mathbf y \in L.$$
:::

Qism fazo o'zi ham chiziqli fazo (aksiomalar $V$ dan «meros» qoladi). Har bir qism fazo $\mathbf 0$ ni o'z ichiga oladi.

:::misol
- $\{\mathbf 0\}$ va $V$ ning o'zi — trivial qism fazolar.
- $\mathbb R^3$ da koordinata boshidan o'tuvchi to'g'ri chiziqlar va tekisliklar.
- $AX = O$ bir jinsli sistemaning yechimlari — $\mathbb R^n$ ning qism fazosi (8-mavzu).
- Simmetrik matritsalar — $M_{n\times n}$ ning qism fazosi.
:::

:::diqqat
$x + y + z = 1$ tekislik qism fazo **emas**: u $\mathbf 0$ dan o'tmaydi. $AX = B$ ($B \ne O$) yechimlari ham qism fazo emas.
:::

:::savol
Qaysi to'plam $\mathbb R^3$ ning qism fazosi?
- $x + y + z = 1$ tekislik
+ $x + y + z = 0$ tekislik
- Birlik sfera
- Birinchi oktant
:::

## 10.2. Chiziqli qobiq

:::tarif
$$L(\mathbf a_1, \dots, \mathbf a_k) = \{\lambda_1\mathbf a_1 + \dots + \lambda_k\mathbf a_k\}$$
— vektorlarning **chiziqli qobig'i**. Bu — ularni o'z ichiga olgan eng kichik qism fazo.
:::

:::teorema
$\dim L(\mathbf a_1, \dots, \mathbf a_k) = r(\mathbf a_1, \dots, \mathbf a_k)$, bazisi — maksimal chiziqli erkli qism sistema.
:::

:::misol
$L\big((1, 2, 3), (2, 1, 0), (4, 5, 6)\big)$: rang 2, chunki $(4, 5, 6) = 2(1, 2, 3) + (2, 1, 0)$. Bu — $\mathbb R^3$ dagi tekislik, bazisi $(1, 2, 3), (2, 1, 0)$.
:::

:::xossa
$L \subset V$ qism fazo bo'lsa, $\dim L \le \dim V$, tenglik faqat $L = V$ da. $L$ ning har qanday bazisini $V$ ning bazisigacha to'ldirish mumkin.
:::

## 10.3. Yig'indi va kesishma

:::tarif
- $L_1 \cap L_2$ — **kesishma**;
- $L_1 + L_2 = \{\mathbf x_1 + \mathbf x_2 : \mathbf x_1 \in L_1, \mathbf x_2 \in L_2\}$ — **yig'indi**.
:::

Ikkalasi ham qism fazo. Birlashma $L_1 \cup L_2$ esa umuman qism fazo emas (ikki to'g'ri chiziq birlashmasi yopiq emas).

$L_1 = L(\mathbf a_1, \dots, \mathbf a_k)$, $L_2 = L(\mathbf b_1, \dots, \mathbf b_m)$ bo'lsa:
$$L_1 + L_2 = L(\mathbf a_1, \dots, \mathbf a_k, \mathbf b_1, \dots, \mathbf b_m).$$

## 10.4. Grassman formulasi

:::teorema
$$\dim(L_1 + L_2) = \dim L_1 + \dim L_2 - \dim(L_1 \cap L_2).$$
:::

:::misol
$\mathbb R^3$ da ikki turli tekislik (boshdan o'tuvchi): $2 + 2 - \dim(L_1\cap L_2) = 3$ $\Rightarrow$ kesishma 1-o'lchamli — to'g'ri chiziq.
:::

:::misol Hisoblash
$\mathbb R^4$ da $L_1 = L(\mathbf a_1, \mathbf a_2)$, $L_2 = L(\mathbf b_1, \mathbf b_2)$, $\mathbf a_1 = (1, 0, 1, 0)$, $\mathbf a_2 = (0, 1, 0, 1)$, $\mathbf b_1 = (1, 1, 0, 0)$, $\mathbf b_2 = (0, 0, 1, 1)$.

To'rtala vektordan matritsa: $\mathbf a_1 + \mathbf a_2 = \mathbf b_1 + \mathbf b_2 = (1, 1, 1, 1)$, rang 3. Demak $\dim(L_1 + L_2) = 3$, $\dim(L_1\cap L_2) = 2 + 2 - 3 = 1$; kesishma bazisi — $(1, 1, 1, 1)$.
:::

:::savol
$\mathbb R^4$ da $\dim L_1 = 3$, $\dim L_2 = 2$, $L_1 + L_2 = \mathbb R^4$. $\dim(L_1\cap L_2)$ = ?
- 0
+ 1
- 2
- 5
:::

## 10.5. To'g'ri yig'indi

:::tarif
$L_1 \cap L_2 = \{\mathbf 0\}$ bo'lsa, yig'indi **to'g'ri yig'indi** deyiladi: $L_1 \oplus L_2$.
:::

:::teorema
$L = L_1 \oplus L_2$ $\iff$ $L$ ning har bir vektori **yagona** usulda $\mathbf x_1 + \mathbf x_2$ ($\mathbf x_i \in L_i$) ko'rinishda yoziladi. Bunda $\dim L = \dim L_1 + \dim L_2$.
:::

:::misol
$M_{n\times n} = \{\text{simmetrik}\} \oplus \{\text{kososimmetrik}\}$: $A = \frac12(A + A^T) + \frac12(A - A^T)$. O'lchamlar: $\frac{n(n+1)}{2} + \frac{n(n-1)}{2} = n^2$ ✓.
:::

:::tarix
H. Grassman (1809–1877) «Kengayish haqidagi ta'limot» (1844) asarida $n$-o'lchamli fazolar va qism fazolar g'oyasini birinchi bo'lib bayon etgan.
:::
