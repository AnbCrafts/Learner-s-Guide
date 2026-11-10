# TCS NQT: Reasoning Ability Master Question Bank

This document breaks down **every high-frequency reasoning pattern** tested in TCS NQT (both Ninja and Digital levels).

---

# SECTION 1: BLOOD RELATIONS

---

### Type 1.1: Pointing / Introducing a Person
* **Technique:** Start reading backwards from the possessive pronoun (*"my mother's only son"* $\to$ me).
* **TCS Practice Question:**
  Pointing to a photograph, a woman says: *"His father's only son's wife is my mother-in-law."* How is the woman's husband related to the man in the photograph?
* **Solution:**
  1. Break down: *"His father's only son"* $\to$ The man in the photograph himself!
  2. *"His [the man's] wife is my mother-in-law."*
  3. If the man's wife is the woman's mother-in-law, then the man is the woman's **father-in-law**.
  4. The woman's husband is the son of her father-in-law.
  $\implies$ The woman's husband is the **Son** of the man in the photograph.

---

### Type 1.2: Coded Blood Relations
* **Symbols:**
  * $A + B \implies A$ is father of $B$
  * $A - B \implies A$ is wife of $B$
  * $A \times B \implies A$ is brother of $B$
  * $A \div B \implies A$ is daughter of $B$
* **TCS Practice Question:**
  Which of the following expressions indicates that **$P$ is the sister-in-law of $T$**?
  A) $P - Q \times R + T$  
  B) $P \div Q + R \times T$  
  C) $P - Q \times T$  
  D) $P + Q \div T$
* **Solution:**
  In option (C):
  $P - Q \implies P$ is wife of $Q$ ($P$ is female, $Q$ is male).
  $Q \times T \implies Q$ is brother of $T$.
  $P$ is married to $Q$, who is the brother of $T$.
  $\implies P$ is the **sister-in-law** of $T$. (Answer: **C**)

---

# SECTION 2: SEATING ARRANGEMENTS

---

### Type 2.1: Circular Seating Facing Centre
* **Golden Rules:**
  * Facing **Inside/Centre**: Clockwise = Left, Counter-Clockwise = Right.
* **TCS Practice Question:**
  Six friends (A, B, C, D, E, F) sit in a circle facing the centre:
  1. B is between A and C.
  2. E is between D and F.
  3. D is to the immediate left of A.
  Who is sitting directly opposite to B?
* **Step-by-Step Deduction:**
  * Place A. D is to the immediate left of A (clockwise from A).
  * B is between A and C $\implies$ C is to the right of B, B is to the right of A.
  * We now have: `D - A - B - C`.
  * E is between D and F $\implies$ remaining positions are filled as: `C - F - E - D`.
  * Full circle (clockwise): `A -> D -> E -> F -> C -> B -> A`.
  * Across from B (3 positions away in 6-person circle) is **E**.

---

### Type 2.2: Linear Arrangement Facing North
* **Rules:** Facing North $\implies$ Left is your left, Right is your right.
* **TCS Practice Question:**
  Five people P, Q, R, S, T are sitting in a row facing North:
  1. Q is sitting at the extreme right end.
  2. P is sitting between S and Q.
  3. R is to the immediate left of S.
  Who is sitting at the extreme left end?
* **Solution:**
  * 5 positions: `_ _ _ _ _`
  * Q is at extreme right: `_ _ _ _ Q`
  * P is between S and Q: `_ _ S P Q`
  * R is to the immediate left of S: `_ R S P Q`
  * T must be at the first slot: `T R S P Q`
  $\implies$ **T** is at the extreme left end.

---

# SECTION 3: SYLLOGISMS

---

### Type 3.1: "Only a Few" & Standard Syllogisms
* **The Rules:**
  * *"Only a few A are B"* means:
    1. **Some A are B** (True)
    2. **Some A are NOT B** (True)
    3. *"All A being B is a possibility"* is **Always FALSE**.
* **TCS Practice Question:**
  **Statements:**
  1. Only a few Pens are Books.
  2. All Books are Pencils.
  **Conclusions:**
  I. Some Pens are Pencils.  
  II. All Pens being Books is a possibility.  
* **Analysis:**
  * From Statement 1 and 2: The portion of Pens that are Books are automatically Pencils $\implies$ Conclusion I **Follows**.
  * Statement 1 states *"Only a few Pens are Books"*, which strictly forbids all Pens from becoming Books $\implies$ Conclusion II **Does NOT follow**.
  $\implies$ **Only Conclusion I follows**.

---

# SECTION 4: DATA SUFFICIENCY

---

### Standard TCS Data Sufficiency Format:
* **Option A**: Statement (1) ALONE is sufficient.
* **Option B**: Statement (2) ALONE is sufficient.
* **Option C**: BOTH statements TOGETHER are necessary.
* **Option D**: NEITHER statement is sufficient.

* **TCS Practice Question:**
  **Question:** Is integer $x$ divisible by 6?
  * **Statement (1):** $x$ is divisible by 2.
  * **Statement (2):** $x$ is divisible by 3.
* **Analysis:**
  * Divisibility by 6 requires being divisible by **both** 2 and 3.
  * Statement (1) alone: $x=4$ is divisible by 2, but not 6. (Insufficient)
  * Statement (2) alone: $x=9$ is divisible by 3, but not 6. (Insufficient)
  * Combining (1) and (2): A number divisible by both coprime factors 2 and 3 is strictly divisible by $2 \times 3 = 6$.
  $\implies$ **Option C: Both statements together are necessary.**

---

# SECTION 5: DIRECTION SENSE & CODING-DECODING

---

### Type 5.1: Pythagoras Displacement
* **TCS Practice Question:**
  A man walks 30 meters North, turns right and walks 40 meters, then turns right again and walks 60 meters. How far and in which direction is he now from his starting point?
* **Solution:**
  * Vertical displacement = $30\text{ m (North)} - 60\text{ m (South)} = -30\text{ m (South)}$.
  * Horizontal displacement = $+40\text{ m (East)}$.
  * Net distance from origin:
    $$\text{Distance} = \sqrt{(-30)^2 + (40)^2} = \sqrt{900 + 1600} = \sqrt{2500} = \mathbf{50 \text{ meters}}$$
  * Direction: **South-East**.
