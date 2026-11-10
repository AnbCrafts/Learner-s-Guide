/**
 * ============================================================================
 * TCS NQT: TWO POINTERS & SLIDING WINDOW PRACTICE (C++)
 * ============================================================================
 * 
 * Solutions & Line-by-Line Explanations provided.
 * 
 * How to compile & run:
 *      g++ -std=c++17 practice_problems.cpp -o practice_problems
 *      ./practice_problems
 * ============================================================================
 */

#include <iostream>
#include <vector>
#include <string>
#include <climits>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <deque>

using namespace std;

// ============================================================================
// PROBLEM 1 (Two Pointers - Opposite Ends): Pair with Target Sum
// ----------------------------------------------------------------------------
// Task: Given a 1-indexed SORTED array of integers `numbers` and an integer `target`,
// find two numbers such that they add up to `target`.
// Return their 1-based indices [index1, index2].
// ============================================================================
vector<int> twoSumSorted(const vector<int>& numbers, int target) {
    // // BUG IN PREVIOUS CODE: Variables `i` and `j` were never declared/initialized,
    // // and the logic simulated a nested loop rather than two pointers.
    // int size = numbers.size();
    // int start = 0;
    // int end = 1;
    // vector<int> indexes;
    // while(i!=j){ ... }

    // CORRECT LOGIC:
    // Because the array is already sorted, start with pointers at opposite ends.
    // If the sum is too small, advance `left` to get a larger value.
    // If the sum is too large, decrement `right` to get a smaller value.
    int left = 0;
    int right = (int)numbers.size() - 1;

    while (left < right) {
        long long currentSum = (long long)numbers[left] + numbers[right];
        if (currentSum == target) {
            return {left + 1, right + 1}; // Return 1-based indices
        } else if (currentSum < target) {
            left++;  // Need a larger sum
        } else {
            right--; // Need a smaller sum
        }
    }

    return {};
}

// ============================================================================
// PROBLEM 2 (Two Pointers - Dutch National Flag): Sort 0s, 1s, and 2s
// ----------------------------------------------------------------------------
// Task: Sort array containing 0s, 1s, and 2s in a SINGLE PASS (O(N)) in-place.
// ============================================================================
void sortColors(vector<int>& nums) {
    // // NOTE ON PREVIOUS CODE:
    // // Counting 0s, 1s, 2s and overwriting in a second loop works in O(N),
    // // but takes 2 passes. The Dutch National Flag does it in a SINGLE pass:
    // int zeros =0; int ones = 0; int twos = 0; ...

    // CORRECT DUTCH NATIONAL FLAG (Single Pass):
    // Invariants:
    //   [0 ... low-1]    = 0s
    //   [low ... mid-1]  = 1s
    //   [mid ... high]   = Unprocessed
    //   [high+1 ... n-1] = 2s
    int low = 0;
    int mid = 0;
    int high = (int)nums.size() - 1;

    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low], nums[mid]);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else { // nums[mid] == 2
            swap(nums[mid], nums[high]);
            high--;
            // Do NOT increment mid here! The swapped element from high must be inspected.
        }
    }
}

// ============================================================================
// PROBLEM 3 (Two Pointers - Greedy): Container With Most Water
// ----------------------------------------------------------------------------
// Task: Maximize min(height[left], height[right]) * (right - left)
// ============================================================================
int maxArea(const vector<int>& height) {
    // YOUR ORIGINAL CODE WAS 100% CORRECT! Clean and optimal.
    int maxWater = 0;
    int left = 0;
    int right = (int)height.size() - 1;

    while (left < right) {
        int width = right - left;
        int currentHeight = min(height[left], height[right]);
        int currentArea = width * currentHeight;

        maxWater = max(maxWater, currentArea);

        // Always move the shorter pointer inwards; moving the taller pointer
        // can never increase area because the width decreases and height is capped.
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}

// ============================================================================
// PROBLEM 4 (Fixed Sliding Window): Maximum Sum Subarray of Size K
// ----------------------------------------------------------------------------
// Concept:
// To find the max sum of any window of size K:
// 1. Calculate the sum of the first K elements.
// 2. Slide the window: subtract arr[i - k] (outgoing) and add arr[i] (incoming).
// Time: O(N), Space: O(1)
// ============================================================================
long long maximumSumSubarray(const vector<int>& arr, int k) {
    // int n = arr.size();
    // if (n < k || k <= 0) return 0;

    // // Step 1: Compute sum of first window of size K
    // long long windowSum = 0;
    // for (int i = 0; i < k; ++i) {
    //     windowSum += arr[i];
    // }

    // long long maxSum = windowSum;

    // // Step 2: Slide the window from index k to n - 1
    // for (int i = k; i < n; ++i) {
    //     windowSum += arr[i] - arr[i - k]; // Add incoming, drop outgoing
    //     maxSum = max(maxSum, windowSum);
    // }

    // return maxSum;

    int n = arr.size();
    if(n<k || k<=0) return 0;

    long long winSum = 0;
    for(int i =0; i<k; i++){
        winSum += arr[i];
    }

    long long maxSum = winSum;

    for(int i =k; i<n;i++){
        winSum = winSum + arr[i] - arr[i-k];
        maxSum = max(maxSum,winSum);
    }

    return maxSum;
}


// ============================================================================
// PROBLEM 5 (Fixed Sliding Window): First Negative Integer in Every Window of Size K
// ----------------------------------------------------------------------------
// Concept:
// Use a deque to store the INDICES of negative numbers.
// Why indices? So we can check if the front negative has fallen outside
// the current window (index <= i - k).
// Time: O(N), Space: O(K)
// ============================================================================
vector<long long> firstNegativeInWindow(const vector<long long>& arr, int k) {
    // vector<long long> result;
    // deque<int> dq; // Stores indices of negative numbers
    // int n = arr.size();

    // for (int i = 0; i < n; ++i) {
    //     // 1. If current element is negative, add its index to the back
    //     if (arr[i] < 0) {
    //         dq.push_back(i);
    //     }

    //     // 2. Remove indices that are out of the current window [i - k + 1, i]
    //     while (!dq.empty() && dq.front() <= i - k) {
    //         dq.pop_front();
    //     }

    //     // 3. Once the first window of size K is formed (i >= k - 1)
    //     if (i >= k - 1) {
    //         if (!dq.empty()) {
    //             result.push_back(arr[dq.front()]);
    //         } else {
    //             result.push_back(0); // No negative number in this window
    //         }
    //     }
    // }

    // return result;


    vector<long long> negatives;
    int n = arr.size();

    for(int i =0; i<k; i++){
        if(arr[i]<0){
            negatives.push_back(arr[i]);
        }
    }
}

// ============================================================================
// PROBLEM 6 (Variable Sliding Window): Smallest Subarray with Sum >= S
// ----------------------------------------------------------------------------
// Concept:
// All elements are positive.
// 1. Expand `right` to increase `currentSum`.
// 2. Once `currentSum >= target`, record the window length (right - left + 1)
//    and shrink the window from the `left` until currentSum < target.
// Time: O(N) because left and right each move at most N times. Space: O(1).
// ============================================================================
int minSubArrayLen(int target, const vector<int>& nums) {
    // int n = nums.size();
    // int minLen = INT_MAX;
    // long long currentSum = 0;
    // int left = 0;

    // for (int right = 0; right < n; ++right) {
    //     currentSum += nums[right]; // Expand window to the right

    //     // While window meets or exceeds target, shrink from left to find minimum
    //     while (currentSum >= target) {
    //         minLen = min(minLen, right - left + 1);
    //         currentSum -= nums[left];
    //         left++; // Shrink window from the left
    //     }
    // }

    // return (minLen == INT_MAX) ? 0 : minLen;

    int n = nums.size();
    int minLen = INT_MAX;
    long long currSum = 0;
    int left =0;

    for(int i =0; i<n;i++){
        currentSum = nums[i];
        while(currentSum>=target){
            minLen = min(minLen,i-left+1);
            currentSum -= nums[left];
            left++;
        }

    }

    if(minLen == INT_MAX){
        return 0;
    }else{
        return minLen;
    }
}

// ============================================================================
// PROBLEM 7 (Variable Sliding Window): Longest Substring Without Repeating Characters
// ----------------------------------------------------------------------------
// Concept:
// Track the last seen index of every character using a 256-element array.
// If character s[right] was seen inside the current window (lastSeen >= left),
// jump `left` directly to lastSeen + 1 to eliminate the duplicate!
// Time: O(N), Space: O(1) (256 ASCII characters).
// ============================================================================
int lengthOfLongestSubstring(const string& s) {
    vector<int> lastSeen(256, -1); // Maps ASCII char -> last index seen
    int maxLen = 0;
    int left = 0;
    int n = s.size();

    for (int right = 0; right < n; ++right) {
        unsigned char c = s[right];

        // If char was already seen inside current window, jump left past it
        if (lastSeen[c] >= left) {
            left = lastSeen[c] + 1;
        }

        lastSeen[c] = right; // Update last seen position
        maxLen = max(maxLen, right - left + 1);
    }

    return maxLen;
}

// ============================================================================
// PROBLEM 8 (Prefix Sum + Hash Map): Subarray Sum Equals K
// ----------------------------------------------------------------------------
// Concept:
// Why sliding window fails here: Array can contain NEGATIVE numbers.
// Adding a negative number DECREASES the sum, so window is not monotonic!
//
// Math:
//   sum(subarray[j...i]) = prefixSum[i] - prefixSum[j - 1] = k
//   => prefixSum[j - 1] = prefixSum[i] - k
//
// We maintain a frequency map of all prefix sums seen so far.
// Time: O(N), Space: O(N)
// ============================================================================
int subarraySum(const vector<int>& nums, int k) {
    unordered_map<long long, int> prefixFreq;
    prefixFreq[0] = 1; // Base case: prefix sum of 0 appears once before index 0

    long long currentSum = 0;
    int count = 0;

    for (int num : nums) {
        currentSum += num;
        long long needed = currentSum - k;

        // If (currentSum - k) has been seen before, each occurrence marks
        // a valid subarray ending at the current index whose sum equals k!
        if (prefixFreq.find(needed) != prefixFreq.end()) {
            count += prefixFreq[needed];
        }

        // Record frequency of current prefix sum
        prefixFreq[currentSum]++;
    }

    return count;
}

// ============================================================================
// TEST HARNESS: Run this to test all solutions
// ============================================================================
int main() {
    cout << "=======================================================\n";
    cout << "   TCS NQT: TWO POINTERS & SLIDING WINDOW TEST HARNESS \n";
    cout << "=======================================================\n\n";

    // P1 Test
    cout << "[P1] Pair with Target Sum (Sorted):\n";
    vector<int> p1Res = twoSumSorted({2, 7, 11, 15}, 9);
    cout << "  {2, 7, 11, 15}, target=9 -> Got: ";
    if (!p1Res.empty()) cout << "{" << p1Res[0] << ", " << p1Res[1] << "}";
    else cout << "{}";
    cout << " (Expected: {1, 2})\n\n";

    // P2 Test
    cout << "[P2] Sort 0s, 1s, 2s (Dutch National Flag):\n";
    vector<int> colors = {2, 0, 2, 1, 1, 0};
    sortColors(colors);
    cout << "  Result: [ ";
    for (int x : colors) cout << x << " ";
    cout << "] (Expected: [ 0 0 1 1 2 2 ])\n\n";

    // P3 Test
    cout << "[P3] Container With Most Water:\n";
    cout << "  {1, 8, 6, 2, 5, 4, 8, 3, 7} -> Got: " 
         << maxArea({1, 8, 6, 2, 5, 4, 8, 3, 7}) << " (Expected: 49)\n\n";

    // P4 Test
    cout << "[P4] Maximum Sum Subarray of Size K:\n";
    cout << "  {2, 1, 5, 1, 3, 2}, K=3 -> Got: " 
         << maximumSumSubarray({2, 1, 5, 1, 3, 2}, 3) << " (Expected: 9)\n\n";

    // P5 Test
    cout << "[P5] First Negative in Every Window of Size K:\n";
    vector<long long> p5Res = firstNegativeInWindow({-8, 2, 3, -6, 10}, 2);
    cout << "  Result: [ ";
    for (long long x : p5Res) cout << x << " ";
    cout << "] (Expected: [ -8 0 -6 -6 ])\n\n";

    // P6 Test
    cout << "[P6] Smallest Subarray with Sum >= S:\n";
    cout << "  target=7, nums={2, 3, 1, 2, 4, 3} -> Got: " 
         << minSubArrayLen(7, {2, 3, 1, 2, 4, 3}) << " (Expected: 2)\n\n";

    // P7 Test
    cout << "[P7] Longest Substring Without Repeating Characters:\n";
    cout << "  'abcabcbb' -> Got: " << lengthOfLongestSubstring("abcabcbb") << " (Expected: 3)\n";
    cout << "  'bbbbb'    -> Got: " << lengthOfLongestSubstring("bbbbb") << " (Expected: 1)\n";
    cout << "  'pwwkew'   -> Got: " << lengthOfLongestSubstring("pwwkew") << " (Expected: 3)\n\n";

    // P8 Test
    cout << "[P8] Subarray Sum Equals K (Prefix Sum + Map):\n";
    cout << "  {1, 1, 1}, k=2  -> Got: " << subarraySum({1, 1, 1}, 2) << " (Expected: 2)\n";
    cout << "  {1, -1, 0}, k=0 -> Got: " << subarraySum({1, -1, 0}, 0) << " (Expected: 3)\n\n";

    return 0;
}
