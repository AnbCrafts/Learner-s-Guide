# TCS Two-Pointer Mastery Practice Sheet
Target Exam: **TCS NQT / TCS Digital / TCS Prime** | Language: **C++**

---

## 🧭 Mental Model: When to Use Two Pointers in TCS Exams?

Whenever you see an array or string problem, ask yourself:
1. **Is the array sorted** (or can it be sorted in $O(N \log N)$ without breaking requirements)?
   $\to$ Often solved using **Opposite Ends** pointers (`left = 0`, `right = n - 1`).
2. **Do we need in-place modification without extra memory ($O(1)$ auxiliary space)?**
   $\to$ Often solved using **Fast & Slow / Read & Write pointers** (both starting from index 0).
3. **Are there 3 categories or states to partition (e.g., 0s, 1s, 2s or negative, zero, positive)?**
   $\to$ Solved using **Dutch National Flag (3 pointers: `low`, `mid`, `high`)**.
4. **Is it a subarray/substring condition with non-negative values?**
   $\to$ Solved using **Sliding Window / Dynamic Two Pointers**.

---

## 📋 Problem Tracker

| # | Problem Name | TCS Tier | Technique / Pattern | Status | Checked by AI |
|---|:---|:---:|:---:|:---:|:---:|
| 1 | [Valid Palindrome](#problem-1-valid-palindrome) | NQT | Opposite Ends | `[ ]` | `[ ]` |
| 2 | [Remove Duplicates from Sorted Array](#problem-2-remove-duplicates-from-sorted-array) | NQT | Fast & Slow Pointers | `[ ]` | `[ ]` |
| 3 | [Move Zeroes to End](#problem-3-move-zeroes-to-end) | NQT | Read & Write Pointers | `[ ]` | `[ ]` |
| 4 | [Squares of a Sorted Array](#problem-4-squares-of-a-sorted-array) | NQT | Opposite Ends (Merge backwards) | `[ ]` | `[ ]` |
| 5 | [Pair with Target Sum (Two Sum II)](#problem-5-pair-with-target-sum-sorted-array) | NQT | Opposite Ends | `[ ]` | `[ ]` |
| 6 | [Sort 0s, 1s, and 2s (Dutch National Flag)](#problem-6-sort-0s-1s-and-2s) | NQT / Digital | 3-Way Partitioning | `[ ]` | `[ ]` |
| 7 | [Segregate Even and Odd Numbers](#problem-7-segregate-even-and-odd-numbers) | NQT | Converging Pointers | `[ ]` | `[ ]` |
| 8 | [Merge Two Sorted Arrays in $O(1)$ Space](#problem-8-merge-sorted-array-in-place) | NQT / Digital | Backward Pointers | `[ ]` | `[ ]` |
| 9 | [Pair with Given Difference](#problem-9-pair-with-given-difference) | NQT / Digital | Same Direction (Expanding Pair) | `[ ]` | `[ ]` |
| 10 | [Container With Most Water](#problem-10-container-with-most-water) | Digital | Greedy Converging Pointers | `[ ]` | `[ ]` |
| 11 | [3Sum (Triplets that sum to Zero)](#problem-11-3sum-triplet-sum-to-zero) | Digital | Sort + Converging with Deduplication | `[ ]` | `[ ]` |
| 12 | [Boats to Save People (Pairing with Weight Limit)](#problem-12-boats-to-save-people) | Digital / Prime | Greedy Two Pointers | `[ ]` | `[ ]` |
| 13 | [Subarray with Given Sum (Positive Numbers)](#problem-13-subarray-with-given-sum) | NQT / Digital | Dynamic Two Pointers | `[ ]` | `[ ]` |
| 14 | [Trapping Rain Water](#problem-14-trapping-rain-water) | Digital / Prime | Converging Pointers with Max Tracking | `[ ]` | `[ ]` |
| 15 | [Longest Palindromic Substring](#problem-15-longest-palindromic-substring) | Digital | Expand Around Center | `[ ]` | `[ ]` |

---

## 🚀 Tier 1: Absolute Foundations (In-Place Array & String)

### Problem 1: Valid Palindrome
* **TCS Frequency:** Very High (NQT Slot 1 standard)
* **Statement:** Given a string `s`, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
* **Example 1:**
  * Input: `s = "A man, a plan, a canal: Panama"`
  * Output: `true` (Explanation: `"amanaplanacanalpanama"` is a palindrome)
* **Example 2:**
  * Input: `s = "race a car"`
  * Output: `false`
* **Constraints:** $1 \le |s| \le 2 \times 10^5$, characters can be ASCII punctuation, spaces, and alphanumeric.
* **Target Complexity:** Time: $O(N)$, Auxiliary Space: $O(1)$.
* **Hint:** Keep two pointers at opposite ends (`0` and `n - 1`). Skip non-alphanumeric characters using `isalnum()`, and compare using `tolower()`.

---

### Problem 2: Remove Duplicates from Sorted Array
* **TCS Frequency:** Very High (NQT / Ninja)
* **Statement:** Given an integer array `nums` sorted in non-decreasing order, remove the duplicates **in-place** such that each unique element appears only once. Return the number of unique elements `k`. The first `k` elements of `nums` must hold the unique elements.
* **Example 1:**
  * Input: `nums = [1, 1, 2]`
  * Output: `k = 2`, `nums = [1, 2, _]`
* **Example 2:**
  * Input: `nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]`
  * Output: `k = 5`, `nums = [0, 1, 2, 3, 4, _, _, _, _, _]`
* **Constraints:** $1 \le nums.length \le 3 \times 10^4$, $-100 \le nums[i] \le 100$, array is sorted.
* **Target Complexity:** Time: $O(N)$, Auxiliary Space: $O(1)$.
* **Hint:** Use a slow pointer `i = 0` to hold the boundary of unique elements, and a fast pointer `j` to scan through the array.

---

### Problem 3: Move Zeroes to End
* **TCS Frequency:** High (NQT standard)
* **Statement:** Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements. You must do this **in-place** without making a copy of the array.
* **Example 1:**
  * Input: `nums = [0, 1, 0, 3, 12]`
  * Output: `nums = [1, 3, 12, 0, 0]`
* **Example 2:**
  * Input: `nums = [0]`
  * Output: `nums = [0]`
* **Constraints:** $1 \le nums.length \le 10^4$, $-2^{31} \le nums[i] \le 2^{31} - 1$.
* **Target Complexity:** Time: $O(N)$, Auxiliary Space: $O(1)$.
* **Hint:** Maintain a write pointer `lastNonZeroFoundAt = 0`. Whenever you see a non-zero element with read pointer `cur`, swap or assign and increment `lastNonZeroFoundAt`.

---

### Problem 4: Squares of a Sorted Array
* **TCS Frequency:** Medium-High (NQT / Digital)
* **Statement:** Given an integer array `nums` sorted in **non-decreasing** order, return an array of the **squares of each number** sorted in non-decreasing order.
* **Example 1:**
  * Input: `nums = [-4, -1, 0, 3, 10]`
  * Output: `[0, 1, 9, 16, 100]` (Squares are `[16, 1, 0, 9, 100]`, sorted is `[0, 1, 9, 16, 100]`)
* **Example 2:**
  * Input: `nums = [-7, -3, 2, 3, 11]`
  * Output: `[4, 9, 9, 49, 121]`
* **Constraints:** $1 \le nums.length \le 10^4$, $-10^4 \le nums[i] \le 10^4$.
* **Target Complexity:** Time: $O(N)$ (NOT $O(N \log N)$), Auxiliary Space: $O(N)$ for result vector.
* **Hint:** The largest squares will always be at either the extreme negative end or the extreme positive end. Compare `nums[left]^2` and `nums[right]^2`, and fill the result array from back to front (`index = n - 1` down to `0`).

---

## ⚡ Tier 2: Sorted Array Convergence & Pair Problems

### Problem 5: Pair with Target Sum (Sorted Array)
* **TCS Frequency:** Very High (Foundational NQT)
* **Statement:** Given a 1-indexed sorted array of integers `numbers` and an integer `target`, return the 1-based indices `[index1, index2]` of the two numbers such that `numbers[index1] + numbers[index2] == target`. You may not use the same element twice. Assume exactly one solution exists.
* **Example 1:**
  * Input: `numbers = [2, 7, 11, 15]`, `target = 9`
  * Output: `[1, 2]`
* **Example 2:**
  * Input: `numbers = [2, 3, 4]`, `target = 6`
  * Output: `[1, 3]`
* **Constraints:** $2 \le numbers.length \le 3 \times 10^4$, $-1000 \le numbers[i], target \le 1000$.
* **Target Complexity:** Time: $O(N)$, Auxiliary Space: $O(1)$.
* **Hint:** `left = 0`, `right = n - 1`. If `sum < target`, `left++`; if `sum > target`, `right--`.

---

### Problem 6: Sort 0s, 1s, and 2s
* **TCS Frequency:** Extremely High (TCS NQT & Digital favorite - Dutch National Flag)
* **Statement:** Given an array `nums` with $n$ objects colored red, white, or blue (represented by numbers `0`, `1`, and `2`), sort them **in-place** so that objects of the same color are adjacent, with colors in the order `0`, `1`, and `2`. Do this without using the library's sort function and in a **single pass**.
* **Example 1:**
  * Input: `nums = [2, 0, 2, 1, 1, 0]`
  * Output: `[0, 0, 1, 1, 2, 2]`
* **Constraints:** $1 \le nums.length \le 300$, $nums[i] \in \{0, 1, 2\}$.
* **Target Complexity:** Time: $O(N)$ single pass, Auxiliary Space: $O(1)$.
* **Hint:** Maintain 3 pointers: `low = 0`, `mid = 0`, `high = n - 1`.
  * If `nums[mid] == 0`: `swap(nums[low++], nums[mid++])`
  * If `nums[mid] == 1`: `mid++`
  * If `nums[mid] == 2`: `swap(nums[mid], nums[high--])` (Do NOT increment `mid` here!)

---

### Problem 7: Segregate Even and Odd Numbers
* **TCS Frequency:** High (NQT)
* **Statement:** Given an array of integers `arr`, rearrange the array such that all even numbers come before all odd numbers. The relative order within evens and odds does not strictly matter (or if maintaining relative order, compare the tradeoffs).
* **Example 1:**
  * Input: `arr = [12, 34, 45, 9, 8, 90, 3]`
  * Output: `[12, 34, 8, 90, 45, 9, 3]` (or any array where all evens precede all odds)
* **Constraints:** $1 \le n \le 10^5$, $0 \le arr[i] \le 10^6$.
* **Target Complexity:** Time: $O(N)$, Auxiliary Space: $O(1)$.
* **Hint:** `left = 0`, `right = n - 1`. Advance `left` while even, decrement `right` while odd; if `left < right`, swap them.

---

### Problem 8: Merge Sorted Array In-Place
* **TCS Frequency:** Very High (TCS NQT / Digital)
* **Statement:** You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively. `nums1` has a total length of $m + n$, where the last $n$ elements are `0` and should be ignored. Merge `nums2` into `nums1` as one sorted array **in-place**.
* **Example 1:**
  * Input: `nums1 = [1, 2, 3, 0, 0, 0]`, `m = 3`, `nums2 = [2, 5, 6]`, `n = 3`
  * Output: `nums1 = [1, 2, 2, 3, 5, 6]`
* **Constraints:** $nums1.length == m + n$, $0 \le m, n \le 200$.
* **Target Complexity:** Time: $O(m + n)$, Auxiliary Space: $O(1)$.
* **Hint:** Fill from the back! Use three pointers: `p1 = m - 1`, `p2 = n - 1`, and `p = m + n - 1`. Put the larger element at `nums1[p--]`.

---

### Problem 9: Pair with Given Difference
* **TCS Frequency:** High (TCS NQT / Digital)
* **Statement:** Given an unsorted array `arr` and a number `k` ($k \ge 0$), determine if there exists a pair of elements $(i, j)$ such that $i \ne j$ and $|arr[j] - arr[i]| = k$. Return `true` if such a pair exists, else `false`.
* **Example 1:**
  * Input: `arr = [5, 20, 3, 2, 50, 80]`, `k = 78`
  * Output: `true` (Explanation: $80 - 2 = 78$)
* **Example 2:**
  * Input: `arr = [1, 5, 3, 4, 2]`, `k = 0`
  * Output: `false` (No two distinct indices have the same value)
* **Constraints:** $1 \le n \le 10^5$, $0 \le k \le 10^5$.
* **Target Complexity:** Time: $O(N \log N)$ (sorting) + $O(N)$ (two pointers) = $O(N \log N)$, Auxiliary Space: $O(1)$.
* **Hint:** Sort first. Then use two pointers **both moving forward** (`i = 0`, `j = 1`). If `arr[j] - arr[i] == k`, return true. If difference $< k$, increment `j`. If difference $> k$, increment `i`. Watch out when `i == j`!

---

## 💎 Tier 3: TCS Digital Core (Medium Level)

### Problem 10: Container With Most Water
* **TCS Frequency:** Extremely High (TCS Digital signature problem)
* **Statement:** You are given an integer array `height` of length $n$. There are $n$ vertical lines drawn such that the two endpoints of the $i$-th line are $(i, 0)$ and $(i, height[i])$. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.
* **Example 1:**
  * Input: `height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`
  * Output: `49` (Explanation: lines at index 1 and 8, width = 7, min height = 7 $\implies 7 \times 7 = 49$)
* **Constraints:** $2 \le n \le 10^5$, $0 \le height[i] \le 10^4$.
* **Target Complexity:** Time: $O(N)$, Auxiliary Space: $O(1)$.
* **Hint:** `left = 0`, `right = n - 1`. Area is `(right - left) * min(height[left], height[right])`. Move the pointer pointing to the **shorter** height, because moving the taller one cannot possibly increase the area.

---

### Problem 11: 3Sum (Triplet Sum to Zero)
* **TCS Frequency:** Extremely High (TCS Digital standard)
* **Statement:** Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that $i \ne j$, $i \ne k$, and $j \ne k$, and $nums[i] + nums[j] + nums[k] == 0$. The solution set must not contain duplicate triplets.
* **Example 1:**
  * Input: `nums = [-1, 0, 1, 2, -1, -4]`
  * Output: `[[-1, -1, 2], [-1, 0, 1]]`
* **Example 2:**
  * Input: `nums = [0, 1, 1]`
  * Output: `[]`
* **Constraints:** $3 \le nums.length \le 3000$, $-10^5 \le nums[i] \le 10^5$.
* **Target Complexity:** Time: $O(N^2)$, Auxiliary Space: $O(1)$ (ignoring output storage).
* **Hint:** Sort the array first. Loop `i` from $0$ to $n - 3$. If `i > 0 && nums[i] == nums[i-1]`, continue (skip duplicate). Then run a 2-pointer search on `(left = i + 1, right = n - 1)` for target `-nums[i]`. When a match is found, skip duplicates for `left` and `right`.

---

### Problem 12: Boats to Save People
* **TCS Frequency:** High (TCS Digital / Prime Greedy + 2-pointer)
* **Statement:** You are given an array `people` where `people[i]` is the weight of the $i$-th person, and an integer `limit`. Each boat can carry at most two people at the same time, provided the sum of their weights is at most `limit`. Return the minimum number of boats to carry every given person.
* **Example 1:**
  * Input: `people = [1, 2]`, `limit = 3`
  * Output: `1`
* **Example 2:**
  * Input: `people = [3, 2, 2, 1]`, `limit = 3`
  * Output: `3` (Boats: `[1, 2]`, `[2]`, `[3]`)
* **Constraints:** $1 \le people.length \le 5 \times 10^4$, $1 \le people[i] \le limit \le 3 \times 10^4$.
* **Target Complexity:** Time: $O(N \log N)$, Auxiliary Space: $O(1)$.
* **Hint:** Sort the weights. Pair the heaviest person (`right`) with the lightest person (`left`) if `people[left] + people[right] <= limit`. If not, the heaviest person must take a boat alone (`right--`). Every iteration takes 1 boat.

---

### Problem 13: Subarray with Given Sum (Positive Numbers)
* **TCS Frequency:** Extremely High (TCS NQT & Digital)
* **Statement:** Given an array `arr` of **positive** integers and an integer `target`, find a continuous subarray that adds up to `target`. Return the 1-based start and end indices `[start, end]`. If no such subarray exists, return `{-1}`.
* **Example 1:**
  * Input: `arr = [1, 2, 3, 7, 5]`, `target = 12`
  * Output: `[2, 4]` (Elements: `2 + 3 + 7 = 12`)
* **Example 2:**
  * Input: `arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`, `target = 15`
  * Output: `[1, 5]` (Elements: `1 + 2 + 3 + 4 + 5 = 15`)
* **Constraints:** $1 \le n \le 10^5$, $1 \le arr[i] \le 10^4$, $1 \le target \le 10^9$.
* **Target Complexity:** Time: $O(N)$, Auxiliary Space: $O(1)$.
* **Hint:** Dynamic 2 pointers / sliding window. Expand `right` and add to `current_sum`. While `current_sum > target` and `left <= right`, subtract `arr[left++]`.

---

## 👑 Tier 4: TCS Digital & Prime Advanced Masters

### Problem 14: Trapping Rain Water
* **TCS Frequency:** Very High (TCS Digital / Prime benchmark)
* **Statement:** Given $n$ non-negative integers representing an elevation map where the width of each bar is $1$, compute how much water it can trap after raining.
* **Example 1:**
  * Input: `height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`
  * Output: `6`
* **Example 2:**
  * Input: `height = [4, 2, 0, 3, 2, 5]`
  * Output: `9`
* **Constraints:** $n == height.length$, $1 \le n \le 2 \times 10^4$, $0 \le height[i] \le 10^5$.
* **Target Complexity:** Time: $O(N)$, Auxiliary Space: $O(1)$.
* **Hint:** Two pointers `left = 0`, `right = n - 1` with `left_max = 0`, `right_max = 0`. At each step, if `height[left] <= height[right]`, the bottleneck is on the left: update `left_max` and add `left_max - height[left]` to total water, then `left++`. Otherwise do the symmetrical logic for `right`.

---

### Problem 15: Longest Palindromic Substring
* **TCS Frequency:** High (TCS Digital / Prime String Challenge)
* **Statement:** Given a string `s`, return the longest palindromic substring in `s`.
* **Example 1:**
  * Input: `s = "babad"`
  * Output: `"bab"` (or `"aba"`)
* **Example 2:**
  * Input: `s = "cbbd"`
  * Output: `"bb"`
* **Constraints:** $1 \le s.length \le 1000$, `s` consists of only digits and English letters.
* **Target Complexity:** Time: $O(N^2)$, Auxiliary Space: $O(1)$.
* **Hint:** Expand around center! For each index $i$, expand outwards for odd-length palindromes `(i, i)` and even-length palindromes `(i, i + 1)` using two pointers moving in opposite directions (`left--`, `right++`).

---

## 🛠️ How to Practice with AI Review
1. Open [`my_two_pointer_practice.cpp`](file:///D:/Anubhaw/HomePractice/DSA/coding/02_two_pointers_and_sliding_window/my_two_pointer_practice.cpp).
2. Write your implementation for a problem.
3. Test it locally using:
   ```bash
   g++ -std=c++17 my_two_pointer_practice.cpp -o my_two_pointer_practice
   ./my_two_pointer_practice.exe
   ```
4. Once you have solved one or a batch of problems, share your code or ping me:
   > *"I have implemented Problem 1, 2, and 3 in `my_two_pointer_practice.cpp`. Please review my solution for time/space complexity, edge cases, and TCS coding standards."*
5. I will review your logic line-by-line, test edge cases, and guide you to optimization!
