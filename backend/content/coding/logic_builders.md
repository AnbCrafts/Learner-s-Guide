# TCS NQT: Logic Builders (Prerequisites to DSA)

Starting with raw logic building before DSA is one of the highest-ROI steps you can take. These 10 problems train your brain on:
1. **Digit isolation and number theory math** (used in 50% of TCS Question 1s).
2. **In-place array pointer manipulation** (avoiding extra space complexity).
3. **Loop invariants and boundary edge-cases** (preventing off-by-one errors and infinite loops).

---

## The 10 Essential Logic-Building Problems

| # | Problem Name | Core Concept Trained | Key Edge Cases to Consider |
| :-: | :--- | :--- | :--- |
| **1** | [Palindrome Number](file:///f:/TCS%20NQT%20PREP/coding/logic_builders.cpp#L28) | Modulo (`% 10`), integer division (`/ 10`), number reversal | Negative numbers (e.g. `-121`), trailing zeroes (e.g. `10`), overflow during reversal. |
| **2** | [Trailing Zeroes in Factorial](file:///f:/TCS%20NQT%20PREP/coding/logic_builders.cpp#L41) | Counting prime factor 5: $\lfloor N/5 \rfloor + \lfloor N/25 \rfloor + \dots$ | Never calculate $N!$ directly (will overflow for $N \ge 20$). |
| **3** | [Armstrong Number](file:///f:/TCS%20NQT%20PREP/coding/logic_builders.cpp#L54) | Two-pass digit processing: count digits $k$, then compute $\sum d^k$ | Single-digit numbers are always Armstrong ($k=1$). Large $N$ power overflow. |
| **4** | [Second Largest Element](file:///f:/TCS%20NQT%20PREP/coding/logic_builders.cpp#L68) | Tracking two state variables (`max1`, `max2`) in one pass | Array with all identical elements (e.g. `[10, 10, 10]` should return `-1`). |
| **5** | [Sorted & Rotated Array](file:///f:/TCS%20NQT%20PREP/coding/logic_builders.cpp#L82) | Counting drops where `arr[i] > arr[i+1]` including circular wrap-around | Count of drops must be $\le 1$. If count $> 1$, it's not sorted & rotated. |
| **6** | [Move Zeroes to End](file:///f:/TCS%20NQT%20PREP/coding/logic_builders.cpp#L95) | Two-pointer index placement: writer index and reader index | Array with no zeroes, array with all zeroes. Must preserve order of non-zeroes. |
| **7** | [Decimal $\leftrightarrow$ Binary](file:///f:/TCS%20NQT%20PREP/coding/logic_builders.cpp#L108) | Remainder by 2 and base-2 powers | $N = 0$, leading zeroes in binary string. |
| **8** | [Missing Number in Range](file:///f:/TCS%20NQT%20PREP/coding/logic_builders.cpp#L123) | Sum formula $\frac{N(N+1)}{2}$ or XOR cancellation property | Prevent integer overflow with `long long` for sum of large $N$. |
| **9** | [Majority Element (> N/2)](file:///f:/TCS%20NQT%20PREP/coding/logic_builders.cpp#L135) | Boyer-Moore Voting Algorithm: candidate & count cancellation | Array of size 1; negative numbers. |
| **10** | [Array Leaders](file:///f:/TCS%20NQT%20PREP/coding/logic_builders.cpp#L147) | Reverse traversal (Right-to-Left) with running maximum | Maintain original relative order from left to right in final answer. |

---

## How to Work on These:
1. Open [`logic_builders.cpp`](file:///f:/TCS%20NQT%20PREP/coding/logic_builders.cpp).
2. Choose a problem (or work sequentially from Problem 1 to 10).
3. Replace the `// TODO` block inside the function with your solution.
4. Compile and test in your terminal:
   ```bash
   cd "f:\TCS NQT PREP\coding"
   g++ -std=c++17 logic_builders.cpp -o logic_builders
   ./logic_builders.exe
   ```
5. Whenever you attempt one or two problems, ping me here! Paste your code or simply ask me to review your file. I will:
   - Check time and space complexity.
   - Run sneaky edge cases that TCS evaluation test runners use.
   - Suggest cleaner, idiomatic C++ improvements.
