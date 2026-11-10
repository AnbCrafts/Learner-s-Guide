---
title: "Binary Search & Divide and Conquer"
category: "Data Structures & Algorithms"
difficulty: "Intermediate"
tags: ["arrays", "binary-search", "divide-and-conquer", "time-complexity"]
summary: "Master the binary search algorithm, handle edge cases like integer overflow, and explore search space reduction patterns."
estimatedMinutes: 15
order: 1
---

# Binary Search & Divide and Conquer

Binary search is an efficient search algorithm that finds the position of a target value within a **sorted array**. By dividing the search interval in half at each step, it achieves a logarithmic time complexity:

$$\mathcal{O}(\log n)$$

Compare this to linear search, which operates in $\mathcal{O}(n)$ time.

---

## 1. How It Works

1. Initialize two pointers: `low = 0` and `high = array.length - 1`.
2. Compute the midpoint:
   $$\text{mid} = \text{low} + \lfloor \frac{\text{high} - \text{low}}{2} \rfloor$$
3. If `array[mid] === target`, return `mid`.
4. If `array[mid] < target`, discard the left half by setting `low = mid + 1`.
5. If `array[mid] > target`, discard the right half by setting `high = mid - 1`.
6. Repeat until `low > high`. If not found, return `-1`.

> [!NOTE]
> Why use `low + Math.floor((high - low) / 2)` instead of `Math.floor((low + high) / 2)`?
> In languages like C++, Java, or Go with fixed 32-bit signed integers, `(low + high)` can exceed $2^{31} - 1$ and cause integer overflow!

---

## 2. Standard Implementation (JavaScript & Python)

### JavaScript Implementation

```javascript
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // Avoid integer overflow
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === target) {
      return mid; // Target found
    } else if (arr[mid] < target) {
      low = mid + 1; // Search right half
    } else {
      high = mid - 1; // Search left half
    }
  }

  return -1; // Target not found
}

// Example usage:
const nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log(binarySearch(nums, 23)); // Output: 5
console.log(binarySearch(nums, 50)); // Output: -1
```

### Python Implementation

```python
def binary_search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1

    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1
```

---

## 3. Complexity Analysis

| Metric | Complexity | Notes |
| :--- | :--- | :--- |
| **Best Case Time** | $\mathcal{O}(1)$ | Target is located exactly at the first midpoint. |
| **Average Case Time** | $\mathcal{O}(\log n)$ | Search space halved every step. |
| **Worst Case Time** | $\mathcal{O}(\log n)$ | Target at boundary or absent. |
| **Space Complexity** | $\mathcal{O}(1)$ | Iterative version requires only pointers. |

---

## 4. Key Patterns: Searching on Answer Space

Binary search is not just for searching array indices; it is widely used for **optimization problems** where the condition is monotonic:

```text
False, False, False, False, True, True, True, True
                            ^
                 Find the first True value!
```

Examples of problems using this pattern:
- Koko Eating Bananas (LeetCode 875)
- Capacity to Ship Packages within D Days (LeetCode 1011)
- Split Array Largest Sum (LeetCode 410)

> [!TIP]
> Whenever a problem asks for *"Find the minimum $X$ such that condition $C(X)$ holds"* and checking condition $C(X)$ is monotonic, think **Binary Search on Answer**!
