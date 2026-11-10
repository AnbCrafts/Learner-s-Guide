# Conceptual Guide: Two Pointers & Sliding Window

Both **Two Pointers** and **Sliding Window** are techniques designed to turn brute-force $O(N^2)$ nested-loop problems into linear $O(N)$ single-pass solutions.

---

## 1. Two-Pointer Technique

Used primarily when the array or string is **sorted**, or when we need to partition/rearrange elements in-place.

### Pattern A: Opposite Ends (Converging)
* **Pointers:** `left = 0`, `right = n - 1`
* **Movement:** Move inward based on comparison:
  ```cpp
  int left = 0, right = n - 1;
  while (left < right) {
      int current = arr[left] + arr[right];
      if (current == target) return {left, right};
      else if (current < target) left++;   // Need larger sum
      else right--;                       // Need smaller sum
  }
  ```
* **Classic Problems:** Two Sum in Sorted Array, Container With Most Water, Valid Palindrome.

### Pattern B: Dutch National Flag (3-Way Partition)
* **Pointers:** `low = 0`, `mid = 0`, `high = n - 1`
* **Invariant:** 
  * `[0 ... low-1]`: 0s
  * `[low ... mid-1]`: 1s
  * `[mid ... high]`: Unknown / Unprocessed
  * `[high+1 ... n-1]`: 2s
* **Classic Problem:** Sort Array of 0s, 1s, and 2s in-place without counting.

---

## 2. Sliding Window Technique

Used when dealing with **contiguous subarrays or substrings**.

### Pattern A: Fixed-Size Window (Size = $K$)
* **Mechanism:** 
  1. Calculate value for the first $K$ elements ($i = 0$ to $K - 1$).
  2. Slide the window one element at a time: **add the incoming element (`arr[i]`)** and **subtract the outgoing element (`arr[i - K]`)**.
* **Visual:**
  ```
  Window 1: [A  B  C] D  E    -> Sum = A + B + C
  Window 2:  A [B  C  D] E    -> Sum = Sum + D - A
  Window 3:  A  B [C  D  E]   -> Sum = Sum + E - B
  ```
* **Time Complexity:** $O(N)$ instead of $O(N \times K)$.

### Pattern B: Dynamic / Variable-Size Window
* **Mechanism:**
  * Expand the window by advancing `right` pointer.
  * When a condition is violated (or condition is met), shrink the window from the left by advancing `left` pointer.
* **Standard Template:**
  ```cpp
  int left = 0;
  for (int right = 0; right < n; ++right) {
      // 1. Add arr[right] to current window state
      ...
      // 2. Shrink window from left while invalid
      while (window_condition_invalid) {
          // Remove arr[left] from window state
          left++;
      }
      // 3. Update answer with window size (right - left + 1)
  }
  ```
* **Critical Trap in TCS NQT:** Dynamic sliding window for subarray sums **only works when all numbers are non-negative** ($arr[i] \ge 0$). If array contains negative numbers, expanding `right` does not monotonically increase the sum! For arrays with negative numbers, use **Prefix Sum + Hash Map**.

---

## 3. Practice Checklist

Open [`practice_problems.cpp`](file:///f:/TCS%20NQT%20PREP/coding/02_two_pointers_and_sliding_window/practice_problems.cpp) and solve:
- [ ] Problem 1: Pair with Target Sum (Sorted Array)
- [ ] Problem 2: Sort 0s, 1s, 2s (Dutch National Flag)
- [ ] Problem 3: Container With Most Water
- [ ] Problem 4: Maximum Sum Subarray of Size $K$
- [ ] Problem 5: First Negative Integer in Every Window of Size $K$
- [ ] Problem 6: Smallest Subarray with Sum $\ge S$
- [ ] Problem 7: Longest Substring Without Repeating Characters
- [ ] Problem 8: Subarray Sum Equals $K$ (Prefix Sum + Hash Map)
