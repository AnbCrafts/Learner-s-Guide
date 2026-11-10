# TCS NQT: Numerical Ability (Core Maths) Type-Wise Master Question Bank

This document breaks down **every single variation** asked in TCS NQT Numerical Ability.
For each variation: **Type Identification $\to$ Shortcut Formula $\to$ TCS Standard Question $\to$ Step-by-Step Solution & Trap**.

---

# SECTION 1: PERCENTAGES

---

### Type 1.1: Price - Consumption - Expenditure (Inverse Variation)
* **The Scenario:** Price of a commodity increases or decreases by $r\%$. By what percentage must consumption be reduced/increased to keep total expenditure constant?
* **Shortcut Formula:**
  $$\text{Reduction in Consumption \%} = \left(\frac{r}{100 + r}\right) \times 100\% \quad (\text{if price increases})$$
  $$\text{Increase in Consumption \%} = \left(\frac{r}{100 - r}\right) \times 100\% \quad (\text{if price decreases})$$
* **TCS Practice Question:**
  The price of sugar increases by $25\%$. By what percentage must a household reduce its consumption of sugar so that the expenditure on sugar remains unchanged?
* **Solution:**
  Here $r = 25$.
  $$\text{Reduction} = \frac{25}{100 + 25} \times 100 = \frac{25}{125} \times 100 = \frac{1}{5} \times 100 = \mathbf{20\%}$$
  *Trap to avoid:* Never say $25\%$ reduction! An increase from 100 to 125 means going back from 125 to 100 is a drop of 25 on a base of 125, which is $20\%$.

---

### Type 1.2: Successive Percentage Change (Net Effective %)
* **The Scenario:** A quantity changes by $a\%$ and then by $b\%$.
* **Shortcut Formula:**
  $$\text{Net Change \%} = a + b + \frac{a \times b}{100}$$
  *(Use positive sign for increase/profit and negative sign for decrease/discount).*
* **TCS Practice Question:**
  A person's salary was first increased by $20\%$ and subsequently decreased by $20\%$. What is the net percentage change in his salary?
* **Solution:**
  $a = +20, b = -20$.
  $$\text{Net Change} = 20 - 20 + \frac{(20)(-20)}{100} = 0 - \frac{400}{100} = \mathbf{-4\%} \quad (\text{i.e. } 4\% \text{ decrease})$$

---

### Type 1.3: Examination / Pass-Fail Marks
* **The Scenario:** Candidate A gets $x\%$ marks and fails by $m$ marks. Candidate B gets $y\%$ marks and gets $n$ marks more than the passing marks. Find maximum marks and pass percentage.
* **Shortcut Formula:**
  $$\text{Total Maximum Marks} = \frac{m + n}{y - x} \times 100$$
* **TCS Practice Question:**
  In an examination, Rahul scored $30\%$ and failed by 15 marks. Priya scored $40\%$ and obtained 35 marks more than the minimum passing marks. Find the passing percentage.
* **Solution:**
  Difference in percentage: $40\% - 30\% = 10\%$
  Difference in actual marks: $35 - (-15) = 50$ marks.
  $$10\% = 50 \implies \text{Total Marks } (100\%) = 500$$
  Passing marks = $30\% \text{ of } 500 + 15 = 150 + 15 = 165$.
  $$\text{Passing Percentage} = \frac{165}{500} \times 100 = \mathbf{33\%}$$

---

### Type 1.4: Population & Depreciation (Compounding Growth/Decay)
* **The Scenario:** Initial value $P$, changing at rate $r\%$ per year for $n$ years.
* **Shortcut Formula:**
  $$\text{Value after } n \text{ years} = P \left(1 \pm \frac{r}{100}\right)^n$$
  $$\text{Value } n \text{ years ago} = \frac{P}{\left(1 \pm \frac{r}{100}\right)^n}$$
* **TCS Practice Question:**
  The population of a city grows at $10\%$ per annum. If its present population is $133,100$, what was the population 3 years ago?
* **Solution:**
  $P = 133,100, r = 10, n = 3$.
  $$\text{Population 3 yrs ago} = \frac{133,100}{\left(1 + \frac{10}{100}\right)^3} = \frac{133,100}{(1.1)^3} = \frac{133,100}{1.331} = \mathbf{100,000}$$

---

### Type 1.5: Election & Voting Variations
* **The Scenario:** In an election between two candidates, $x\%$ of votes were invalid, and the winner got $y\%$ of the valid votes and won by a majority of $M$ votes.
* **TCS Practice Question:**
  In an election between two candidates, $10\%$ of voters did not cast their votes and $10\%$ of votes cast were declared invalid. The successful candidate got $54\%$ of the valid votes and won by a majority of 1620 votes. Find the total number of voters enrolled.
* **Solution:**
  Let enrolled voters = $V$.
  Voted = $0.90 \times V$.
  Valid votes = $0.90 \times (0.90 V) = 0.81 V$.
  Winner gets $54\%$ of valid votes $\implies$ Loser gets $46\%$ of valid votes.
  Difference (majority) = $54\% - 46\% = 8\%$ of valid votes.
  $$0.08 \times (0.81 V) = 1620$$
  $$0.0648 V = 1620 \implies V = \frac{1620}{0.0648} = \mathbf{25,000}$$

---

### Type 1.6: Two-Subject Overlap / Venn Diagram Percentages
* **The Scenario:** Given percentage passing/liking attribute A ($n(A)\%$), attribute B ($n(B)\%$), and both ($n(A \cap B)\%$). Find percentage of neither or only one.
* **Shortcut Formula:**
  $$n(A \cup B) = n(A) + n(B) - n(A \cap B)$$
  $$\text{Neither \%} = 100\% - n(A \cup B)$$
* **TCS Practice Question:**
  In an office, $65\%$ of employees drink coffee, $55\%$ drink tea, and $40\%$ drink both. If 40 employees drink neither coffee nor tea, find the total number of employees in the office.
* **Solution:**
  $$\text{Drink at least one } = 65\% + 55\% - 40\% = 80\%$$
  $$\text{Drink neither} = 100\% - 80\% = 20\%$$
  $$20\% \text{ of Total} = 40 \implies \text{Total Employees} = \frac{40}{0.20} = \mathbf{200}$$

---

### Type 1.7: Successive Expenditure on Remaining Balance (Salary Breakdown)
* **The Scenario:** A person spends $a\%$ of income on head 1, $b\%$ of the *remaining* on head 2, and $c\%$ of the *subsequent balance* on head 3, finally saving ₹$S$.
* **Shortcut Formula:**
  $$\text{Savings } S = \text{Income } I \times \left(1 - \frac{a}{100}\right) \times \left(1 - \frac{b}{100}\right) \times \left(1 - \frac{c}{100}\right)$$
* **TCS Practice Question:**
  A man spends $20\%$ of his monthly salary on house rent, $30\%$ of the remaining on food, and $25\%$ of the balance on children's education. If he is left with ₹8,400 as savings, find his total monthly salary.
* **Solution:**
  Fraction remaining after rent = $1 - 0.20 = 0.80$
  Fraction remaining after food = $1 - 0.30 = 0.70$
  Fraction remaining after education = $1 - 0.25 = 0.75$
  $$\text{Net Remaining Fraction} = 0.80 \times 0.70 \times 0.75 = 0.42 \quad (42\%)$$
  $$42\% \text{ of Salary } = ₹8,400 \implies \text{Total Salary} = \frac{8,400}{0.42} = \mathbf{₹20,000}$$

---

# SECTION 2: PROFIT, LOSS & DISCOUNT

---

### Type 2.1: Equal Selling Price with Equal Gain% and Loss%
* **The Scenario:** Two articles are sold at the SAME selling price (SP). One at a gain of $x\%$, other at a loss of $x\%$.
* **Shortcut Rule:**
  There is **ALWAYS a net loss**.
  $$\text{Net Loss \%} = \frac{x^2}{100}\%$$
* **TCS Practice Question:**
  A trader sells two laptops for ₹24,000 each. On one he gains $20\%$ and on the other he loses $20\%$. What is his net gain or loss percent, and overall loss in rupees?
* **Solution:**
  1. Percentage loss:
     $$\text{Net Loss \%} = \frac{20^2}{100} = \frac{400}{100} = \mathbf{4\% \text{ Loss}}$$
  2. Total SP = $24,000 + 24,000 = ₹48,000$.
     Total SP is $96\%$ of total CP.
     $$\text{Total CP} = \frac{48,000}{0.96} = ₹50,000$$
     $$\text{Total Loss in ₹} = 50,000 - 48,000 = \mathbf{₹2,000}$$

---

### Type 2.2: Relation Between Cost Price (CP) and Marked Price (MP)
* **The Scenario:** A merchant gives a discount of $D\%$ on the Marked Price and still makes a profit of $P\%$.
* **Shortcut Ratio:**
  $$\frac{\text{MP}}{\text{CP}} = \frac{100 + P}{100 - D}$$
* **TCS Practice Question:**
  A shopkeeper allows a discount of $10\%$ on the marked price of a watch and still earns a profit of $26\%$. By what percentage is the marked price higher than the cost price?
* **Solution:**
  $$\frac{\text{MP}}{\text{CP}} = \frac{100 + 26}{100 - 10} = \frac{126}{90} = \frac{14}{10} = 1.4$$
  Marked Price is $40\%$ higher than CP $\implies \mathbf{40\%}$.

---

### Type 2.3: Dishonest Shopkeeper / Faulty Weights
* **The Scenario:** A merchant claims to sell at Cost Price but uses a false weight of $W_{\text{used}}$ instead of true weight $W_{\text{true}}$.
* **Shortcut Formula:**
  $$\text{Gain \%} = \left(\frac{\text{Error}}{\text{True Weight} - \text{Error}}\right) \times 100\% = \left(\frac{W_{\text{true}} - W_{\text{used}}}{W_{\text{used}}}\right) \times 100\%$$
* **TCS Practice Question:**
  A dishonest grocer sells rice at cost price but uses a faulty weight of 900 grams for a 1 kg weight. What is his percentage profit?
* **Solution:**
  Error = $1000 - 900 = 100\text{ g}$. True base paid by shopkeeper is $900\text{ g}$.
  $$\text{Profit \%} = \frac{100}{900} \times 100 = \frac{1}{9} \times 100 = \mathbf{11.11\%} \quad \left(11\frac{1}{9}\%\right)$$

---

### Type 2.4: Successive Discounts (Equivalent Single Discount)
* **The Scenario:** Successive discounts of $d_1\%$ and $d_2\%$.
* **Shortcut Formula:**
  $$\text{Equivalent Discount \%} = d_1 + d_2 - \frac{d_1 \times d_2}{100}$$
* **TCS Practice Question:**
  What single discount is equivalent to two successive discounts of $20\%$ and $15\%$?
* **Solution:**
  $$\text{Discount} = 20 + 15 - \frac{20 \times 15}{100} = 35 - 3 = \mathbf{32\%}$$

---

### Type 2.5: Cross-Rate Articles ("Bought $x$ for ₹$y$ and Sold $y$ for ₹$x$")
* **The Scenario:** Articles bought at rate of $x$ items for ₹$y$, and sold at rate of $y$ items for ₹$x$.
* **Shortcut Formula:**
  Make the number of articles equal by taking $\text{LCM}(x, y) = xy$:
  * Total CP of $xy$ articles = $y \times y = y^2$
  * Total SP of $xy$ articles = $x \times x = x^2$
  $$\text{Profit / Loss \%} = \left(\frac{x^2 - y^2}{y^2}\right) \times 100\%$$
  *(If positive, it is a profit; if negative, it is a loss).*
* **TCS Practice Question:**
  A vendor buys 6 lemons for ₹5 and sells 5 lemons for ₹6. What is his overall profit or loss percentage?
* **Solution:**
  Here $x = 6, y = 5$.
  * Let total lemons bought and sold = $\text{LCM}(6, 5) = 30$.
  * $\text{CP of 30 lemons} = \frac{5}{6} \times 30 = ₹25$
  * $\text{SP of 30 lemons} = \frac{6}{5} \times 30 = ₹36$
  $$\text{Profit \%} = \frac{36 - 25}{25} \times 100 = \frac{11}{25} \times 100 = \mathbf{44\% \text{ Profit}}$$

---

### Type 2.6: Chain / Successive Reselling Transactions (A $\to$ B $\to$ C)
* **The Scenario:** A sells an article to B at a profit/loss of $P_1\%$, and B sells it to C at a profit/loss of $P_2\%$.
* **Shortcut Formula:**
  $$\text{Price paid by C } (SP_B) = \text{CP of A} \times \left(1 \pm \frac{P_1}{100}\right) \times \left(1 \pm \frac{P_2}{100}\right)$$
  $$\text{Profit / Loss of B in ₹} = \text{Price paid by C} - \text{Price paid by B}$$
* **TCS Practice Question:**
  A sells a mobile phone to B at a profit of $20\%$. B subsequently sells it to C at a loss of $10\%$. If C pays ₹21,600 for the mobile phone:
  1. What did A pay for it?
  2. What was B's profit or loss in rupees?
* **Solution:**
  1. Let CP for A = ₹$x$.
     $$\text{Price paid by C} = x \times \left(1 + \frac{20}{100}\right) \times \left(1 - \frac{10}{100}\right)$$
     $$21,600 = x \times 1.20 \times 0.90 = 1.08 x$$
     $$x = \frac{21,600}{1.08} = \mathbf{₹20,000 \quad (\text{CP for A})}$$
  2. Price paid by B (CP for B) = $20,000 \times 1.20 = ₹24,000$.
     Price B sold it for to C = ₹21,600.
     $$\text{B's Loss in ₹} = 24,000 - 21,600 = \mathbf{₹2,400 \text{ Loss}}$$

---

### Type 2.7: CP of $x$ Articles = SP of $y$ Articles
* **The Scenario:** The cost price of $x$ items is stated to be equal to the selling price of $y$ items ($x \times CP = y \times SP$).
* **Shortcut Formula:**
  $$\frac{SP}{CP} = \frac{x}{y} \implies \text{Gain \%} = \left(\frac{x - y}{y}\right) \times 100\%$$
* **TCS Practice Question:**
  The cost price of 16 pens is equal to the selling price of 12 pens. Find the gain percentage.
* **Solution:**
  $$16 \times CP = 12 \times SP \implies \frac{SP}{CP} = \frac{16}{12} = \frac{4}{3}$$
  Here base CP is 3 units, SP is 4 units $\implies$ Profit = $4 - 3 = 1$ unit.
  $$\text{Gain \%} = \frac{1}{3} \times 100 = \mathbf{33.33\%} \quad \left(33\frac{1}{3}\%\right)$$

---

### Type 2.8: Promotional Freebies ("Buy $X$ Get $Y$ Free")
* **The Scenario:** A store offers "Buy $X$ items, Get $Y$ items free". The customer takes home $(X + Y)$ items while paying for only $X$ items.
* **Shortcut Formula:**
  $$\text{Discount \%} = \left(\frac{\text{Free Items}}{\text{Total Items Taken}}\right) \times 100\% = \left(\frac{Y}{X + Y}\right) \times 100\%$$
* **TCS Practice Question:**
  A retail outlet offers a promotional scheme: "Buy 4 shirts, Get 1 Free". In addition to this scheme, an extra flat discount of $10\%$ is applied on the total bill. What is the net effective discount percentage?
* **Solution:**
  1. Discount from Free Scheme:
     $$\text{Scheme Discount } d_1 = \frac{1}{4 + 1} \times 100 = \frac{1}{5} \times 100 = 20\%$$
  2. Combined with extra $10\%$ discount ($d_2 = 10\%$):
     $$\text{Net Discount} = d_1 + d_2 - \frac{d_1 \times d_2}{100} = 20 + 10 - \frac{20 \times 10}{100} = 30 - 2 = \mathbf{28\%}$$

---

# SECTION 3: TIME AND WORK & PIPES-CISTERNS

---

### Type 3.1: Individual Times Given $\to$ Combined Time
* **Formula:**
  If A does work in $A$ days and B in $B$ days:
  $$\text{Time together} = \frac{A \times B}{A + B}$$
  *Best method for $\ge 3$ people:* **LCM Method** (Take LCM of days as total units of work, find 1-day work units/efficiency).
* **TCS Practice Question:**
  A can complete a piece of work in 12 days and B in 18 days. In how many days will they complete the work working together?
* **Solution:**
  $\text{LCM}(12, 18) = 36$ units (Total Work).
  * A's efficiency = $36 / 12 = 3$ units/day.
  * B's efficiency = $36 / 18 = 2$ units/day.
  Combined efficiency = $3 + 2 = 5$ units/day.
  $$\text{Days} = \frac{36}{5} = \mathbf{7.2 \text{ days}} \quad \left(7\frac{1}{5} \text{ days}\right)$$

---

### Type 3.2: Worker Leaves Midway
* **The Scenario:** A and B start work together, but one leaves after $d$ days, or leaves $k$ days *before completion*.
* **TCS Practice Question:**
  A can do a task in 20 days and B in 30 days. They start working together, but A leaves 5 days before the task is completed. In how many total days was the task completed?
* **Solution (Golden Shortcut):**
  If someone leaves $k$ days **before completion**, imagine forcing them to work those extra $k$ days and **add** their work to the total!
  $\text{Total Work} = \text{LCM}(20, 30) = 60$ units.
  * A's efficiency = $60 / 20 = 3$ units/day.
  * B's efficiency = $60 / 30 = 2$ units/day.
  If A stayed the last 5 days, A would have done: $5 \times 3 = 15$ extra units.
  New Total Work = $60 + 15 = 75$ units.
  Both worked for the entire duration:
  $$\text{Total Days} = \frac{75}{3 + 2} = \frac{75}{5} = \mathbf{15 \text{ days}}$$

---

### Type 3.3: Working on Alternate Days
* **The Scenario:** A and B work on alternate days, starting with A.
* **TCS Practice Question:**
  A can do a work in 10 days and B in 15 days. If they work on alternate days with A starting on the first day, in how many days will the work finish?
* **Solution:**
  Total Work = $\text{LCM}(10, 15) = 30$ units.
  * Day 1 (A): 3 units.
  * Day 2 (B): 2 units.
  1 cycle (2 days) = $3 + 2 = 5$ units.
  Number of 2-day cycles to reach 30 units = $30 / 5 = 6$ full cycles.
  $$\text{Total Days} = 6 \text{ cycles} \times 2 \text{ days/cycle} = \mathbf{12 \text{ days}}$$

---

### Type 3.4: Men-Women-Days Equivalence ($M_1 D_1 H_1 / W_1$)
* **Shortcut Formula:**
  $$\frac{M_1 \times D_1 \times H_1}{W_1} = \frac{M_2 \times D_2 \times H_2}{W_2}$$
* **TCS Practice Question:**
  12 men can complete a project in 18 days working 8 hours a day. How many days will 16 men take to complete double the work working 9 hours a day?
* **Solution:**
  $$\frac{12 \times 18 \times 8}{1} = \frac{16 \times D_2 \times 9}{2}$$
  $$1728 = 72 \times D_2 \implies D_2 = \frac{1728}{72} = \mathbf{24 \text{ days}}$$

---

### Type 3.5: Pipes with an Emptying Leak
* **TCS Practice Question:**
  A pipe can fill a cistern in 8 hours. Due to a leak in the bottom, it takes 10 hours to fill the cistern. When the cistern is full, in how many hours will the leak empty it?
* **Solution:**
  $\text{LCM}(8, 10) = 40$ units capacity.
  * Inlet rate = $+40 / 8 = +5$ units/hr.
  * Net rate with leak = $+40 / 10 = +4$ units/hr.
  Leak rate = Net rate - Inlet rate = $4 - 5 = -1$ unit/hr.
  $$\text{Time to empty} = \frac{40}{1} = \mathbf{40 \text{ hours}}$$

---

### Type 3.6: Efficiency Comparison (A is $k$ times as efficient as B)
* **The Scenario:** A is $k$ times as efficient as B and completes work in $D$ days less than B.
* **Shortcut Relationship:**
  $$\text{Efficiency Ratio } E_A : E_B = k : 1 \implies \text{Time Ratio } T_A : T_B = 1 : k$$
  $$\text{Difference in Ratio Units } (k - 1) = D \implies 1 \text{ unit} = \frac{D}{k - 1}$$
* **TCS Practice Question:**
  A is 3 times as efficient as B and is therefore able to complete a piece of work in 40 days less than B. In how many days can they complete the work working together?
* **Solution:**
  * Ratio of times: $T_A : T_B = 1 : 3$.
  * Difference in time = $3 - 1 = 2$ units $\implies 2 \text{ units} = 40 \text{ days} \implies 1 \text{ unit} = 20 \text{ days}$.
  * $T_A = 20$ days, $T_B = 60$ days.
  * Total Work = $\text{LCM}(20, 60) = 60$ units.
  * Efficiency: A = 3 units/day, B = 1 unit/day. Combined = 4 units/day.
  $$\text{Time together} = \frac{60}{4} = \mathbf{15 \text{ days}}$$

---

### Type 3.7: Wages Distribution Based on Work Done
* **The Scenario:** Multiple workers undertake a contract for ₹$W$. How is money divided when their efficiencies or working days differ?
* **Golden Rule:**
  $$\text{Wages are divided in the ratio of TOTAL WORK UNITS completed by each person.}$$
* **TCS Practice Question:**
  A can do a piece of work in 10 days, and B in 15 days. With the help of C, they complete the work in 4 days. If the total payment for the work is ₹9,000, what is C's share?
* **Solution:**
  Let Total Work = $\text{LCM}(10, 15, 4) = 60$ units.
  * A's 1-day efficiency = $60 / 10 = 6$ units/day. In 4 days, A does $6 \times 4 = 24$ units.
  * B's 1-day efficiency = $60 / 15 = 4$ units/day. In 4 days, B does $4 \times 4 = 16$ units.
  * Units completed by A and B together = $24 + 16 = 40$ units.
  * Units completed by C in 4 days = $60 - 40 = 20$ units.
  $$\text{Ratio of work done } A : B : C = 24 : 16 : 20 = 6 : 4 : 5$$
  $$\text{C's Share} = \frac{20}{60} \times 9,000 = \frac{1}{3} \times 9,000 = \mathbf{₹3,000}$$

---

### Type 3.8: Men "OR" Women / Boys Equivalence
* **The Scenario:** $m$ men OR $w$ women complete work in $D$ days. Find days taken by $m_2$ men AND $w_2$ women.
* **Shortcut Formula:**
  $$\text{Days} = \frac{D}{\left(\frac{m_2}{m} + \frac{w_2}{w}\right)}$$
* **TCS Practice Question:**
  4 men or 6 women can complete a work in 25 days. In how many days will 6 men and 11 women complete the same work?
* **Solution:**
  * Method 1 (Direct Formula):
    $$\text{Days} = \frac{25}{\frac{6}{4} + \frac{11}{6}} = \frac{25}{\frac{18 + 22}{12}} = \frac{25}{\frac{40}{12}} = \frac{25 \times 12}{40} = \frac{300}{40} = \mathbf{7.5 \text{ days}} \quad \left(7\frac{1}{2} \text{ days}\right)$$
  * Method 2 (Conversion):
    $4M = 6W \implies 1M = 1.5W$.
    $6M + 11W = (6 \times 1.5W) + 11W = 9W + 11W = 20W$.
    $$M_1 D_1 = M_2 D_2 \implies 6 \times 25 = 20 \times D_2 \implies D_2 = \frac{150}{20} = \mathbf{7.5 \text{ days}}$$

---

# SECTION 4: SPEED, TIME AND DISTANCE

---

### Type 4.1: Average Speed for Equal Distance
* **Shortcut Formula:**
  If a journey covers equal distance at speed $x$ km/h and return journey at speed $y$ km/h:
  $$\text{Average Speed} = \frac{2xy}{x + y}$$
* **TCS Practice Question:**
  A car travels from city A to city B at 60 km/h and returns from B to A at 40 km/h. What is the average speed of the car for the entire journey?
* **Solution:**
  $$\text{Avg Speed} = \frac{2 \times 60 \times 40}{60 + 40} = \frac{4800}{100} = \mathbf{48 \text{ km/h}}$$
  *Trap to avoid:* Never take arithmetic mean $\frac{60 + 40}{2} = 50$!

---

### Type 4.2: Trains Passing Moving Object / Platform
* **Key Principles:**
  * Distance when passing a pole/man = Length of Train ($L$).
  * Distance when passing a platform/bridge = Length of Train + Length of Platform ($L_T + L_P$).
  * Opposite direction relative speed = $S_1 + S_2$.
  * Same direction relative speed = $|S_1 - S_2|$.
  * Conversion: $1 \text{ km/h} = \frac{5}{18} \text{ m/s}$.
* **TCS Practice Question:**
  A train 180 meters long is running at 72 km/h. How many seconds will it take to pass a platform 120 meters long?
* **Solution:**
  Speed in m/s = $72 \times \frac{5}{18} = 20 \text{ m/s}$.
  Total Distance = $180 + 120 = 300\text{ m}$.
  $$\text{Time} = \frac{\text{Distance}}{\text{Speed}} = \frac{300}{20} = \mathbf{15 \text{ seconds}}$$

---

### Type 4.3: Boats and Streams (Upstream vs Downstream)
* **Formulas:**
  Let speed of boat in still water = $u$, speed of stream = $v$.
  * Downstream Speed ($D$) = $u + v$
  * Upstream Speed ($U$) = $u - v$
  * $u = \frac{D + U}{2}, \quad v = \frac{D - U}{2}$
* **TCS Practice Question:**
  A boat travels 24 km downstream in 2 hours and 24 km upstream in 4 hours. What is the speed of the boat in still water and the speed of the current?
* **Solution:**
  $D = 24 / 2 = 12 \text{ km/h}$.
  $U = 24 / 4 = 6 \text{ km/h}$.
  $$\text{Boat Speed } u = \frac{12 + 6}{2} = \mathbf{9 \text{ km/h}}$$
  $$\text{Current Speed } v = \frac{12 - 6}{2} = \mathbf{3 \text{ km/h}}$$

---

### Type 4.4: Late and Early Departure Variation
* **The Scenario:** Walking at speed $S_1$ reaches $t_1$ minutes late. Walking at speed $S_2$ reaches $t_2$ minutes early.
* **Shortcut Formula:**
  $$\text{Distance} = \frac{S_1 \times S_2}{|S_1 - S_2|} \times \Delta t_{\text{hours}}$$
* **TCS Practice Question:**
  If a student walks at 4 km/h, he reaches school 10 minutes late. If he walks at 5 km/h, he reaches 5 minutes early. Find the distance to his school.
* **Solution:**
  $S_1 = 4, S_2 = 5$.
  Time difference = 10 mins late to 5 mins early = $10 + 5 = 15 \text{ minutes} = \frac{15}{60} = \frac{1}{4} \text{ hr}$.
  $$\text{Distance} = \frac{4 \times 5}{|5 - 4|} \times \frac{1}{4} = \frac{20}{1} \times \frac{1}{4} = \mathbf{5 \text{ km}}$$

---

### Type 4.5: Meeting Point / Oppositely Moving Trains with Staggered Start Times
* **The Scenario:** Stations P and Q are $D$ km apart. Train 1 leaves P at time $t_1$ at speed $S_1$. Train 2 leaves Q at time $t_2$ at speed $S_2$ towards P. At what time will they meet?
* **Key Step:** Equalize start times by calculating how far Train 1 travels before Train 2 starts!
* **TCS Practice Question:**
  Station P and Q are 330 km apart. Train A leaves P at 8:00 AM heading towards Q at 60 km/h. Train B leaves Q at 9:00 AM heading towards P at 75 km/h. At what time will the two trains cross each other?
* **Solution:**
  1. From 8:00 AM to 9:00 AM (1 hour), Train A travels:
     $$\text{Distance} = 60 \text{ km/h} \times 1 \text{ hr} = 60 \text{ km}$$
  2. Remaining distance between trains at 9:00 AM:
     $$330 - 60 = 270 \text{ km}$$
  3. Relative speed in opposite directions = $60 + 75 = 135 \text{ km/h}$.
     $$\text{Time to meet after 9:00 AM} = \frac{270}{135} = 2 \text{ hours}$$
  $$\text{Meeting Time} = 9:00 \text{ AM} + 2 \text{ hours} = \mathbf{11:00 \text{ AM}}$$

---

### Type 4.6: Ratio of Speeds After Crossing (Square Root Formula)
* **The Scenario:** Two trains start simultaneously from P and Q towards each other. After crossing, they take $T_A$ and $T_B$ hours respectively to reach destinations Q and P.
* **Golden Shortcut Formula:**
  $$\frac{\text{Speed of A}}{\text{Speed of B}} = \sqrt{\frac{T_B}{T_A}}$$
* **TCS Practice Question:**
  Two trains A and B start at the same time from Delhi and Mumbai towards each other. After crossing each other, they take 4 hours and 9 hours respectively to reach Mumbai and Delhi. If train A runs at 60 km/h, what is the speed of train B?
* **Solution:**
  Here $T_A = 4\text{ hours}, T_B = 9\text{ hours}, S_A = 60\text{ km/h}$.
  $$\frac{S_A}{S_B} = \sqrt{\frac{9}{4}} = \frac{3}{2}$$
  $$\frac{60}{S_B} = \frac{3}{2} \implies S_B = \frac{60 \times 2}{3} = \mathbf{40 \text{ km/h}}$$

---

### Type 4.7: Linear Races and Head Starts
* **The Scenario:** In a race of $D$ meters, Runner A beats Runner B by $x$ meters or $t$ seconds.
* **Shortcut Logic:**
  Runner B takes $t$ seconds to cover the remaining $x$ meters:
  $$\text{Speed of B} = \frac{x}{t}$$
  $$\text{Total time taken by B} = \frac{D}{\text{Speed of B}}$$
  $$\text{Total time taken by A} = \text{Total time of B} - t$$
* **TCS Practice Question:**
  In a 1000-meter race, runner A beats runner B by 100 meters or 10 seconds. Find the time taken by runner A to finish the race and the speed of runner A.
* **Solution:**
  1. Runner B covers 100 m in 10 seconds:
     $$\text{Speed of B} = \frac{100}{10} = 10 \text{ m/s}$$
  2. Time taken by B to run 1000 m:
     $$\text{Time}_B = \frac{1000}{10} = 100 \text{ seconds}$$
  3. Since A beats B by 10 seconds:
     $$\text{Time}_A = 100 - 10 = \mathbf{90 \text{ seconds}}$$
     $$\text{Speed of A} = \frac{1000}{90} = \mathbf{11.11 \text{ m/s}} \quad \left(40 \text{ km/h}\right)$$

---

# SECTION 5: RATIO, PROPORTION & MIXTURES

---

### Type 5.1: Removal and Replacement (Repeated Dilution)
* **Shortcut Formula:**
  If a vessel contains $C$ units of pure liquid, and $x$ units are drawn out and replaced with water $n$ times:
  $$\text{Remaining Pure Liquid} = C \left(1 - \frac{x}{C}\right)^n$$
* **TCS Practice Question:**
  A container contains 80 litres of pure milk. 8 litres are taken out and replaced with water. This process is repeated 2 more times (total 3 times). How much pure milk remains in the container?
* **Solution:**
  $C = 80, x = 8, n = 3$.
  $$\text{Milk left} = 80 \left(1 - \frac{8}{80}\right)^3 = 80 \left(1 - \frac{1}{10}\right)^3 = 80 \times (0.9)^3 = 80 \times 0.729 = \mathbf{58.32 \text{ litres}}$$

---

### Type 5.2: Coins in a Bag Ratio
* **TCS Practice Question:**
  A bag contains coins of ₹1, 50 paise, and 25 paise in the ratio $3 : 4 : 8$. If the total value of all coins is ₹210, find the number of 50-paise coins.
* **Solution:**
  Let number of coins be $3x, 4x, 8x$.
  Total value in ₹:
  $$(3x \times 1) + (4x \times 0.50) + (8x \times 0.25) = 210$$
  $$3x + 2x + 2x = 210 \implies 7x = 210 \implies x = 30$$
  $$\text{Number of 50-paise coins} = 4x = 4 \times 30 = \mathbf{120 \text{ coins}}$$

---

### Type 5.3: Rule of Alligation (Mixing Two Varieties for Target Price)
* **The Scenario:** Cheaper variety of price $c$ is mixed with dearer variety of price $d$ to produce a mixture of mean cost price $m$.
* **Shortcut Cross Rule:**
  $$\frac{\text{Quantity of Cheaper}}{\text{Quantity of Dearer}} = \frac{d - m}{m - c}$$
  *(Caution: All prices $c, d, m$ MUST be Cost Prices! If Selling Price of mixture is given with profit %, convert to CP first).*
* **TCS Practice Question:**
  In what ratio must a grocer mix tea at ₹60 per kg with tea at ₹75 per kg so that selling the mixture at ₹84 per kg yields a profit of $20\%$?
* **Solution:**
  1. Find Mean Cost Price ($m$):
     $$\text{SP} = ₹84, \quad \text{Profit} = 20\% \implies m = \frac{84}{1.20} = ₹70/\text{kg}$$
  2. Apply Alligation:
     $$\frac{\text{Quantity at ₹60}}{\text{Quantity at ₹75}} = \frac{75 - 70}{70 - 60} = \frac{5}{10} = \mathbf{1 : 2}$$

---

### Type 5.4: Age Ratio Problems (Cross-Multiplication Method)
* **The Scenario:** Present ages in ratio $a : b$. After (or before) $T$ years, the ratio becomes $c : d$.
* **TCS Practice Question:**
  The ratio of the present ages of A and B is $5 : 3$. Six years ago, the ratio of their ages was $3 : 1$. Find the present age of A.
* **Solution:**
  Let present ages be $5x$ and $3x$.
  $$\frac{5x - 6}{3x - 6} = \frac{3}{1}$$
  $$1(5x - 6) = 3(3x - 6) \implies 5x - 6 = 9x - 18$$
  $$4x = 12 \implies x = 3$$
  $$\text{Present Age of A} = 5x = 5 \times 3 = \mathbf{15 \text{ years}}$$

---

### Type 5.5: Mixing Equal Weights / Volumes of Multiple Alloys
* **The Scenario:** Vessel A has components in ratio $a : b$. Vessel B has components in ratio $c : d$. Equal volumes/weights are mixed into a third vessel.
* **Shortcut Method:**
  Equalize the total units in both ratios before adding components!
* **TCS Practice Question:**
  Two alloys A and B contain zinc and copper in the ratios $7 : 2$ and $5 : 4$ respectively. If equal weights of both alloys are melted together to form a third alloy C, what is the ratio of zinc to copper in alloy C?
* **Solution:**
  * Alloy A: Zinc : Copper = $7 : 2$ $\implies \text{Total} = 7 + 2 = 9$ units.
  * Alloy B: Zinc : Copper = $5 : 4$ $\implies \text{Total} = 5 + 4 = 9$ units.
  Since totals are already equal (9 units each):
  $$\text{Total Zinc in C} = 7 + 5 = 12$$
  $$\text{Total Copper in C} = 2 + 4 = 6$$
  $$\text{Ratio in Alloy C} = 12 : 6 = \mathbf{2 : 1}$$

---

### Type 5.6: Partnerships and Profit Sharing (Capital $\times$ Time)
* **The Scenario:** Partners invest different amounts for different periods.
* **Golden Formula:**
  $$\text{Ratio of Profits} = (C_1 \times T_1) : (C_2 \times T_2) : (C_3 \times T_3)$$
* **TCS Practice Question:**
  A and B enter into a partnership. A invests ₹50,000 and after 4 months withdraws ₹10,000. B invests ₹40,000 and after 6 months adds ₹20,000. At the end of one year, the total profit earned is ₹84,000. Find A's share of the profit.
* **Solution:**
  * A's total investment-months:
    $$(50,000 \times 4) + (40,000 \times 8) = 200,000 + 320,000 = 520,000$$
  * B's total investment-months:
    $$(40,000 \times 6) + (60,000 \times 6) = 240,000 + 360,000 = 600,000$$
  * Ratio of profit shares:
    $$A : B = 520,000 : 600,000 = 52 : 60 = 13 : 15$$
  * Total parts = $13 + 15 = 28$.
  $$\text{A's Share} = \frac{13}{28} \times 84,000 = 13 \times 3,000 = \mathbf{₹39,000}$$

---

# SECTION 6: SIMPLE & COMPOUND INTEREST

---

### Type 6.1: Difference Between CI and SI for 2 and 3 Years
* **Shortcut Formulas:**
  $$\text{Difference for 2 years } (D_2) = P \left(\frac{R}{100}\right)^2$$
  $$\text{Difference for 3 years } (D_3) = P \left(\frac{R}{100}\right)^2 \left(\frac{300 + R}{100}\right)$$
* **TCS Practice Question:**
  The difference between compound interest and simple interest on a certain sum of money for 2 years at $10\%$ per annum is ₹150. Find the principal sum.
* **Solution:**
  $$150 = P \left(\frac{10}{100}\right)^2 = P \left(\frac{1}{100}\right) \implies P = 150 \times 100 = \mathbf{₹15,000}$$

---

### Type 6.2: Sum Doubles / Triples in $N$ Years
* **Simple Interest Rule:**
  If a sum becomes $k$ times in $T$ years:
  $$R = \frac{(k - 1) \times 100}{T}$$
* **Compound Interest Rule (Rule of Multipliers):**
  If a sum becomes $k$ times in $T$ years under CI, it becomes $k^m$ times in $m \times T$ years.
* **TCS Practice Question:**
  A sum of money placed at compound interest doubles itself in 5 years. In how many years will it amount to 8 times itself?
* **Solution:**
  Here $k = 2, T = 5 \text{ years}$.
  We want it to become $8 = 2^3$ times.
  Here $m = 3$.
  $$\text{Time required} = m \times T = 3 \times 5 = \mathbf{15 \text{ years}}$$

---

### Type 6.3: Compounding Half-Yearly and Quarterly
* **The Scenario:** Interest compounded semi-annually or quarterly.
* **Adjustment Rules:**
  * Half-yearly: Rate becomes $\frac{R}{2}\%$, Time periods become $2n$.
  * Quarterly: Rate becomes $\frac{R}{4}\%$, Time periods become $4n$.
* **TCS Practice Question:**
  Find the compound interest on ₹16,000 for $1\frac{1}{2}$ years at $10\%$ per annum, compounded half-yearly.
* **Solution:**
  * Principal $P = ₹16,000$.
  * Rate per half-year $r = 10 / 2 = 5\%$.
  * Number of half-years $n = 1.5 \times 2 = 3$.
  $$\text{Amount} = 16,000 \times \left(1 + \frac{5}{100}\right)^3 = 16,000 \times \left(\frac{21}{20}\right)^3 = 16,000 \times \frac{9261}{8000} = 2 \times 9261 = ₹18,522$$
  $$\text{Compound Interest} = 18,522 - 16,000 = \mathbf{₹2,522}$$

---

### Type 6.4: CI Amounts for Consecutive Years (Finding Rate and Principal)
* **The Scenario:** A sum at CI amounts to ₹$A_1$ in $t$ years and to ₹$A_2$ in $(t + 1)$ years.
* **Shortcut Formula:**
  $$\text{Annual Rate } R = \left(\frac{A_2 - A_1}{A_1}\right) \times 100\%$$
* **TCS Practice Question:**
  A sum of money invested at compound interest amounts to ₹2,400 after 1 year and to ₹2,880 after 2 years. Find the rate of interest per annum and the initial principal sum.
* **Solution:**
  1. Rate of Interest:
     $$R = \frac{2,880 - 2,400}{2,400} \times 100 = \frac{480}{2,400} \times 100 = \mathbf{20\% \text{ p.a.}}$$
  2. Principal:
     $$A_1 = P \left(1 + \frac{20}{100}\right) \implies 2,400 = P \times 1.20 \implies P = \frac{2,400}{1.20} = \mathbf{₹2,000}$$

---

### Type 6.5: Equal Annual Installments under Compound Interest
* **The Scenario:** A borrowed principal ₹$P$ is repaid in $n$ equal annual installments of ₹$x$ each at $R\%$ p.a. compound interest.
* **Shortcut Formula (Present Value Equation):**
  $$P = \frac{x}{\left(1 + \frac{R}{100}\right)} + \frac{x}{\left(1 + \frac{R}{100}\right)^2} + \dots + \frac{x}{\left(1 + \frac{R}{100}\right)^n}$$
* **TCS Practice Question:**
  A sum of ₹21,000 is borrowed at $10\%$ compound interest per annum and is to be repaid in two equal annual installments. Find the value of each installment.
* **Solution:**
  Let installment = ₹$x$.
  $$21,000 = \frac{x}{1.10} + \frac{x}{(1.10)^2} = \frac{10x}{11} + \frac{100x}{121} = \frac{110x + 100x}{121} = \frac{210x}{121}$$
  $$21,000 = \frac{210x}{121} \implies 100 = \frac{x}{121} \implies x = 100 \times 121 = \mathbf{₹12,100}$$

---

# SECTION 7: AVERAGES & WEIGHTED MEANS

---

### Type 7.1: Change in Average by Inclusion / Exclusion / Replacement
* **Shortcut Formulas:**
  * **When a new member is added:**
    $$\text{Value of New Member} = \text{Old Average} \pm (\text{New Total Count} \times \text{Increase/Decrease})$$
  * **When a member is replaced:**
    $$\text{Value of New Member} = \text{Replaced Member's Value} \pm (\text{Total Count} \times \text{Increase/Decrease})$$
* **TCS Practice Question:**
  The average age of 24 students in a class is 15 years. If the teacher's age is included, the average age increases by 1 year. What is the teacher's age?
* **Solution:**
  * Old average = 15, New count = $24 + 1 = 25$, Change in average = $+1$.
  $$\text{Teacher's Age} = 15 + (25 \times 1) = 15 + 25 = \mathbf{40 \text{ years}}$$

---

### Type 7.2: Cricket Batsman's Average
* **The Scenario:** A batsman scores $R$ runs in his $n$-th inning, thereby increasing his overall average by $x$ runs.
* **Shortcut Formula:**
  $$\text{New Average} = R - (n - 1) \times x$$
  $$\text{Old Average} = R - n \times x$$
* **TCS Practice Question:**
  A batsman has a certain average of runs for 16 innings. In his 17th inning, he scores 85 runs, thereby increasing his average by 3 runs. What is his new average after the 17th inning?
* **Solution:**
  Here $R = 85, n = 17, x = 3$.
  $$\text{New Average} = 85 - (17 - 1) \times 3 = 85 - 48 = \mathbf{37 \text{ runs}}$$
  *(Old average before 17th inning was $37 - 3 = 34$ runs).*

---

### Type 7.3: Correcting Misread / Incorrect Observations
* **The Scenario:** Average of $N$ items was calculated as $A$. Later it was discovered that value $X$ was mistakenly recorded as $Y$.
* **Shortcut Formula:**
  $$\text{Correct Average} = \text{Old Average} + \frac{\text{Correct Value} - \text{Wrong Value}}{N}$$
* **TCS Practice Question:**
  The average marks of 50 students in an examination were 64. It was later discovered that the marks of two students were wrongly entered as 38 and 42 instead of 83 and 24 respectively. Find the correct average marks.
* **Solution:**
  * Sum of wrong marks = $38 + 42 = 80$.
  * Sum of correct marks = $83 + 24 = 107$.
  * Net difference = $107 - 80 = +27$.
  $$\text{Average Correction} = \frac{+27}{50} = +0.54$$
  $$\text{Correct Average} = 64 + 0.54 = \mathbf{64.54}$$
