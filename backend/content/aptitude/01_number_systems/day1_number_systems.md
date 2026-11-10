# Day 1: Number Systems Mastery (7:00 AM – 7:45 AM)

Number systems form the foundation of TCS NQT Numerical Ability (both Ninja and Digital rounds). Questions frequently test divisibility rules, unit digits, and remainder theorem shortcuts.

---

## 1. Quick Concept Review (15 Mins)

### A. Divisibility Rules (Must Memorize)
* **Divisible by 3 / 9**: Sum of digits must be divisible by 3 or 9.
* **Divisible by 4**: Last two digits divisible by 4.
* **Divisible by 8**: Last three digits divisible by 8.
* **Divisible by 11**: Alternate sum difference:
  $$\text{Diff} = |(\text{Sum of odd place digits}) - (\text{Sum of even place digits})|$$
  $\text{Diff}$ must be 0 or a multiple of 11.
* **Divisible by 7 / 13**: Subtract twice the last digit from the rest (for 7), or group in sets of 3 digits from right and take alternating differences.

### B. Cyclicity of Unit Digits
The last digit of $X^n$ depends on the unit digit of $X$ and repeats in cycles of 4:

| Unit Digit of Base | Cycle Length | Pattern | Shortcut ($n \pmod 4$) |
| :---: | :---: | :---: | :---: |
| **0, 1, 5, 6** | 1 | Always ends in 0, 1, 5, 6 | No change |
| **4** | 2 | $4^1 = 4, 4^2 = 6$ | Odd $\to 4$, Even $\to 6$ |
| **9** | 2 | $9^1 = 9, 9^2 = 1$ | Odd $\to 9$, Even $\to 1$ |
| **2** | 4 | 2, 4, 8, 6 | Remainder of $n/4$ ($0 \to 6$) |
| **3** | 4 | 3, 9, 7, 1 | Remainder of $n/4$ ($0 \to 1$) |
| **7** | 4 | 7, 9, 3, 1 | Remainder of $n/4$ ($0 \to 1$) |
| **8** | 4 | 8, 4, 2, 6 | Remainder of $n/4$ ($0 \to 6$) |

### C. Remainder Theorem Basics
* If a number $N$ is divided by $d_1$ and gives remainder $r_1$, then $k \times N$ divided by $d_1$ gives $(k \times r_1) \pmod{d_1}$.
* $(a + b) \pmod n = (a \pmod n + b \pmod n) \pmod n$
* $(a \times b) \pmod n = (a \pmod n \times b \pmod n) \pmod n$

---

## 2. Practice Questions (30 Mins)

### Q1. Divisibility of 11
**Question**: If the number $784x39$ is completely divisible by 11, what is the value of the single digit $x$?  
> **Solution**:  
> Odd places (from right): $9 + x + 8 = 17 + x$  
> Even places (from right): $3 + 4 + 7 = 14$  
> Difference: $(17 + x) - 14 = 3 + x$  
> For divisibility by 11: $3 + x = 11 \implies \mathbf{x = 8}$.

---

### Q2. Unit Digit Calculation
**Question**: What is the unit digit of $3^{65} \times 6^{59} \times 7^{71}$?  
> **Solution**:  
> 1. Unit digit of $3^{65}$: $65 \pmod 4 = 1 \implies 3^1 = 3$.  
> 2. Unit digit of $6^{59}$: Base 6 always ends in $6$.  
> 3. Unit digit of $7^{71}$: $71 \pmod 4 = 3 \implies 7^3 = 343 \implies 3$.  
> 4. Product of unit digits: $3 \times 6 \times 3 = 54 \implies \mathbf{4}$.

---

### Q3. Remainder Theorem
**Question**: Find the remainder when $(67^{67} + 67)$ is divided by 68.  
> **Solution**:  
> $67 \equiv -1 \pmod{68}$  
> $(-1)^{67} + 67 = -1 + 67 = 66$  
> Remainder = $\mathbf{66}$.

---

### Q4. Counting Numbers
**Question**: How many natural numbers between 100 and 400 are divisible by both 4 and 6?  
> **Solution**:  
> Divisible by both 4 and 6 $\implies$ divisible by $\text{LCM}(4, 6) = 12$.  
> First number $> 100$ divisible by 12 is $108$ ($12 \times 9$).  
> Last number $< 400$ divisible by 12 is $396$ ($12 \times 33$).  
> Count = $33 - 9 + 1 = \mathbf{25}$.

---

## 3. Reflection Checklist for Day 1
- [ ] Memorized the 4-cyclicity table for unit digits.
- [ ] Confident with alternate-sum rule for divisibility by 11.
- [ ] Logged any missed question in `notes/error_tracker.md`.
