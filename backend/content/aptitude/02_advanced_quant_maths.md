# TCS Digital: Advanced Quantitative Ability Master Bank

This document covers the **Advanced Quantitative Ability** topics required to clear the **TCS Digital / Prime cutoffs**.
Format: **Variation Name $\to$ Shortcut Formula $\to$ TCS Standard Problem $\to$ Step-by-Step Solution**.

---

# SECTION 1: PERMUTATIONS & COMBINATIONS

---

### Type 1.1: Word Arrangements with Vowels Together
* **Concept:** Treat all vowels as a single "mega-letter" (box method).
* **TCS Practice Question:**
  In how many different ways can the letters of the word **`LEADING`** be arranged such that the vowels always appear together?
* **Solution:**
  Word: `L E A D I N G` (Total 7 letters).
  Vowels: `E, A, I` (3 vowels).
  Consonants: `L, D, N, G` (4 consonants).
  1. Treat `(E, A, I)` as 1 unit.
     Total units to arrange = 4 consonants + 1 vowel unit = 5 units $\implies 5!$ ways.
  2. The 3 vowels inside the unit can rearrange among themselves in $3!$ ways.
  $$\text{Total ways} = 5! \times 3! = 120 \times 6 = \mathbf{720}$$

---

### Type 1.2: Word Arrangements with Vowels NEVER Together
* **Concept:** $\text{Total Arrangements without restriction} - \text{Arrangements with vowels together}$.
* **TCS Practice Question:**
  In how many ways can the letters of the word **`EXTRA`** be arranged so that the vowels never come together?
* **Solution:**
  `EXTRA`: 5 letters (E, X, T, R, A), 2 vowels (E, A), 3 consonants.
  1. Total arrangements = $5! = 120$.
  2. Vowels together: Treat `(E, A)` as 1 unit $\implies 4! \times 2! = 24 \times 2 = 48$.
  $$\text{Vowels never together} = 120 - 48 = \mathbf{72}$$

---

### Type 1.3: Committee / Team Selection with At Least Condition
* **TCS Practice Question:**
  A committee of 5 persons is to be formed from 6 men and 4 women. In how many ways can this be done if the committee must contain **at least 2 women**?
* **Solution:**
  Possible cases for (Women, Men):
  * Case 1: 2 Women and 3 Men $\to \binom{4}{2} \times \binom{6}{3} = 6 \times 20 = 120$
  * Case 2: 3 Women and 2 Men $\to \binom{4}{3} \times \binom{6}{2} = 4 \times 15 = 60$
  * Case 3: 4 Women and 1 Man $\to \binom{4}{4} \times \binom{6}{1} = 1 \times 6 = 6$
  $$\text{Total ways} = 120 + 60 + 6 = \mathbf{186}$$

---

### Type 1.4: Digit Formations (With Constraints & No Repetition)
* **TCS Practice Question:**
  How many 4-digit numbers greater than 5000 can be formed using the digits $0, 2, 4, 5, 7, 9$ without repetition?
* **Solution:**
  4-digit number: $\underline{D_1}\; \underline{D_2}\; \underline{D_3}\; \underline{D_4}$.
  Available digits: $\{0, 2, 4, 5, 7, 9\}$ (6 digits).
  * To be $> 5000$, thousand's digit ($D_1$) must be $5, 7,$ or $9$ (3 choices).
  * For $D_2$: Any of remaining 5 digits (5 choices).
  * For $D_3$: Any of remaining 4 digits (4 choices).
  * For $D_4$: Any of remaining 3 digits (3 choices).
  $$\text{Total Numbers} = 3 \times 5 \times 4 \times 3 = \mathbf{180}$$

---

### Type 1.5: Circular Permutations
* **Formula:**
  * Arranging $n$ distinct people in a circle = $(n - 1)!$
  * Arranging $n$ beads/flowers (clockwise and anticlockwise identical) = $\frac{(n - 1)!}{2}$
* **TCS Practice Question:**
  In how many ways can 6 people be seated around a circular table such that two particular persons never sit next to each other?
* **Solution:**
  1. Total circular seating = $(6 - 1)! = 5! = 120$.
  2. Sitting together: Tie the 2 persons together as 1 unit. Total units = $5$.
     Circular arrangements of 5 units = $(5 - 1)! = 4! = 24$.
     The 2 persons can swap in $2! = 2$ ways $\implies 24 \times 2 = 48$.
  $$\text{Never sit together} = 120 - 48 = \mathbf{72}$$

---

# SECTION 2: PROBABILITY

---

### Type 2.1: Selection from Bag Without Replacement
* **TCS Practice Question:**
  A box contains 5 red, 4 blue, and 3 green balls. Two balls are drawn at random one after another without replacement. What is the probability that both balls are red?
* **Solution:**
  Total balls = $5 + 4 + 3 = 12$.
  $$P(\text{1st Red}) = \frac{5}{12}$$
  After drawing one red ball, 4 red balls and 11 total balls remain:
  $$P(\text{2nd Red}) = \frac{4}{11}$$
  $$P(\text{Both Red}) = \frac{5}{12} \times \frac{4}{11} = \frac{5}{33}$$

---

### Type 2.2: "At Least One" Rule
* **Shortcut:**
  $$P(\text{At least one success}) = 1 - P(\text{Zero successes})$$
* **TCS Practice Question:**
  Three unbiased coins are tossed together. What is the probability of getting at least one head?
* **Solution:**
  Total outcomes = $2^3 = 8$.
  Zero heads (all tails, TTT) = 1 outcome.
  $$P(\text{Zero heads}) = \frac{1}{8}$$
  $$P(\text{At least one head}) = 1 - \frac{1}{8} = \mathbf{\frac{7}{8}}$$

---

### Type 2.3: Sum of Dice Faces
* **Shortcut Sum Frequencies for 2 Dice (Total 36 outcomes):**
  * Sum 2 or 12: 1 way
  * Sum 3 or 11: 2 ways
  * Sum 4 or 10: 3 ways
  * Sum 5 or 9: 4 ways
  * Sum 6 or 8: 5 ways
  * Sum 7: 6 ways (Peak)
* **TCS Practice Question:**
  Two standard six-faced dice are rolled simultaneously. What is the probability that the sum of the numbers is a prime number?
* **Solution:**
  Prime sums possible: 2, 3, 5, 7, 11.
  * Sum 2 $\to$ 1 way: (1, 1)
  * Sum 3 $\to$ 2 ways: (1, 2), (2, 1)
  * Sum 5 $\to$ 4 ways: (1, 4), (4, 1), (2, 3), (3, 2)
  * Sum 7 $\to$ 6 ways: (1, 6), (6, 1), (2, 5), (5, 2), (3, 4), (4, 3)
  * Sum 11 $\to$ 2 ways: (5, 6), (6, 5)
  Total favorable outcomes = $1 + 2 + 4 + 6 + 2 = 15$.
  $$P(\text{Prime Sum}) = \frac{15}{36} = \mathbf{\frac{5}{12}}$$

---

# SECTION 3: GEOMETRY & MENSURATION

---

### Type 3.1: Melting and Recasting (Volume Invariance)
* **Principle:** When a 3D solid is melted and reformed into another shape, **Volume remains constant**.
* **TCS Practice Question:**
  A metallic sphere of radius 6 cm is melted and recast into small spheres of radius 2 cm each. How many small spheres can be made?
* **Solution:**
  Number of spheres $N = \frac{\text{Volume of large sphere}}{\text{Volume of small sphere}} = \frac{\frac{4}{3}\pi R^3}{\frac{4}{3}\pi r^3} = \left(\frac{R}{r}\right)^3$.
  $$N = \left(\frac{6}{2}\right)^3 = 3^3 = \mathbf{27 \text{ spheres}}$$

---

### Type 3.2: Circle Inscribed in a Square & Square Inscribed in a Circle
* **Key Formulas:**
  * Circle inscribed in a square of side $a$: Radius $r = \frac{a}{2}$.
  * Square inscribed in a circle of radius $R$: Side $a = R\sqrt{2}$ (Diameter is diagonal of square).
* **TCS Practice Question:**
  Find the area of the largest circle that can be inscribed inside a square of side 14 cm.
* **Solution:**
  Radius of circle $r = 14 / 2 = 7\text{ cm}$.
  $$\text{Area} = \pi r^2 = \frac{22}{7} \times 7^2 = \mathbf{154 \text{ cm}^2}$$

---

# SECTION 4: PROGRESSIONS & ALGEBRA

---

### Type 4.1: Arithmetic Progression (AP)
* **Formulas:**
  $$T_n = a + (n - 1)d, \quad S_n = \frac{n}{2}[2a + (n - 1)d] = \frac{n}{2}(a + l)$$
* **TCS Practice Question:**
  Find the sum of all two-digit numbers which leave a remainder of 1 when divided by 4.
* **Solution:**
  First 2-digit number leaving rem 1 when divided by 4 is $13$ ($4 \times 3 + 1$).
  Last 2-digit number is $97$ ($4 \times 24 + 1$).
  Here $a = 13, d = 4, l = 97$.
  $$97 = 13 + (n - 1)4 \implies 84 = (n - 1)4 \implies n - 1 = 21 \implies n = 22$$
  $$S_{22} = \frac{22}{2}(13 + 97) = 11 \times 110 = \mathbf{1210}$$

---

### Type 4.2: Infinite Geometric Progression (GP)
* **Formula:** (Valid for $|r| < 1$)
  $$S_\infty = \frac{a}{1 - r}$$
* **TCS Practice Question:**
  A ball is dropped from a height of 100 meters. Each time it bounces back to $\frac{4}{5}$th of its previous height. Find the total vertical distance traveled by the ball before it comes to rest.
* **Solution:**
  Initial drop = $100\text{ m}$.
  Then for every bounce it goes up and down:
  $$\text{Total Distance} = 100 + 2 \times \left[100 \times \frac{4}{5} + 100 \times \left(\frac{4}{5}\right)^2 + \dots \right]$$
  Inside the bracket is infinite GP with $a = 80, r = \frac{4}{5}$:
  $$\text{Sum} = \frac{80}{1 - \frac{4}{5}} = \frac{80}{\frac{1}{5}} = 400$$
  $$\text{Total Distance} = 100 + 2 \times 400 = 100 + 800 = \mathbf{900 \text{ meters}}$$
