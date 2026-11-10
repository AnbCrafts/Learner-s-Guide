/**
 * ============================================================================
 * TCS TWO-POINTER PRACTICE WORKBENCH (C++)
 * Target: TCS NQT / Digital / Prime
 * ============================================================================
 * 
 * Instructions:
 * 1. Read the problem statement in `two_pointer_practice_problems.md`.
 * 2. Implement your logic in the corresponding function below.
 * 3. Uncomment or run tests in main() to verify your code.
 * 4. Submit to AI for review: ask for code review, edge case verification,
 *    and complexity check!
 * 
 * Compile & Run:
 *   g++ -std=c++17 my_two_pointer_practice.cpp -o my_two_pointer_practice
 *   ./my_two_pointer_practice
 * ============================================================================
 */

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cctype>
#include <cassert>

using namespace std;

// ============================================================================
// TIER 1: ABSOLUTE FOUNDATIONS
// ============================================================================

/**
 * PROBLEM 1: Valid Palindrome (Alphanumeric only, case insensitive)
 * Time Target: O(N), Space Target: O(1)
 */
bool isPalindrome(string s) {
    int n = s.size();
    if(n==0 || n==1){
        return true;
    }

    int left = 0;
    int right = n-1;
    // approach 1

    while(left!=right){
        if(s[left]==s[right]){
            left++;
            right--;
        }
        else{
            return false;
        }
    }

   
    
    return true;
}

/**
 * PROBLEM 2: Remove Duplicates from Sorted Array
 * Modifies nums in-place and returns the number of unique elements `k`.
 * Time Target: O(N), Space Target: O(1)
 */
int removeDuplicates(vector<int>& nums) {
    // TODO: Write your solution here using fast & slow pointers.
    // int uniqueNums = 1;
    // int nextUnique = 0;

    // int left = 0;
    // int right = 1;
    // while (left!=nums.size()-1)
    // {
    //    if(nums[right]==nums[left]){
    //     left = right;
    //     right++;
    //    }
    //    else{
        
    //    }

    // }
    

    return 0;
}

/**
 * PROBLEM 3: Move Zeroes to End
 * Moves all 0s to the end while maintaining relative order of non-zero elements.
 * Time Target: O(N), Space Target: O(1)
 */
void moveZeroes(vector<int>& nums) {
    // TODO: Write your solution here using read & write pointers.
    
}

/**
 * PROBLEM 4: Squares of a Sorted Array
 * Returns a new array of squares sorted in non-decreasing order.
 * Time Target: O(N), Space Target: O(N)
 */
vector<int> sortedSquares(const vector<int>& nums) {
    // TODO: Write your solution here by comparing opposite ends and filling backwards.
    return {};
}

// ============================================================================
// TIER 2: SORTED ARRAY CONVERGENCE & PAIRS
// ============================================================================

/**
 * PROBLEM 5: Pair with Target Sum (Sorted Array)
 * Returns 1-based indices [index1, index2] such that nums[index1-1] + nums[index2-1] == target.
 * Time Target: O(N), Space Target: O(1)
 */
vector<int> twoSumSorted(const vector<int>& numbers, int target) {
    // TODO: Write your solution here using opposite ends two-pointers.
    return {};
}

/**
 * PROBLEM 6: Sort 0s, 1s, and 2s (Dutch National Flag)
 * Sorts nums containing only 0, 1, 2 in a single pass in-place.
 * Time Target: O(N), Space Target: O(1)
 */
void sortColors(vector<int>& nums) {
    // TODO: Write your solution here using low, mid, high pointers.
    int zeros =0;
    int ones = 0;
    int twos = 0;
    for (int i = 0; i < nums.size(); i++)
    {
        if(nums[i]==0){
            zeros++;
        }
        else if(nums[i]==1){
            ones++;
        }
        else{
            twos++;
        }
    }

    // 1

    for(int i =0; i<nums.size();i++){
        if(i<zeros){
            nums[i] = 0;
        }
        else if (zeros<=i && i<(zeros+ones)){
            nums[i] = 1;
        }
        else if((zeros+ones)<=i && i<(zeros+ones+twos)){
            nums[i] = 2;
        }

    }

    // 2
    // for(int i =0; i< nums.size();i++){
    //     nums[i+zeros-1] = 0;
    //     nums[i+zeros+ones-1] = 0;
    //     nums[i+zeros+ones+twos-1] = 0;

    //     zeros--;
    //     ones--;
    //     twos--;

    // }

    
    
    
    
}

/**
 * PROBLEM 7: Segregate Even and Odd Numbers
 * Rearranges array so all even numbers appear before odd numbers.
 * Time Target: O(N), Space Target: O(1)
 */
void segregateEvenOdd(vector<int>& arr) {
    // TODO: Write your solution here using converging two-pointers.
}

/**
 * PROBLEM 8: Merge Sorted Array In-Place
 * Merges nums2 into nums1 (nums1 has capacity m + n, initial elements m).
 * Time Target: O(m + n), Space Target: O(1)
 */
void mergeSortedArrays(vector<int>& nums1, int m, vector<int>& nums2, int n) {
    // TODO: Write your solution here by filling nums1 backwards from index (m + n - 1).
}

/**
 * PROBLEM 9: Pair with Given Difference
 * Returns true if there exists a pair (i, j) with i != j such that |arr[j] - arr[i]| == k.
 * Time Target: O(N log N) sorting + O(N) two pointers, Space Target: O(1)
 */
bool findPairWithDifference(vector<int>& arr, int k) {
    // TODO: Write your solution here by sorting and moving two pointers in same direction.
    return false;
}

// ============================================================================
// TIER 3: TCS DIGITAL CORE
// ============================================================================

/**
 * PROBLEM 10: Container With Most Water
 * Finds two lines that together with x-axis contain maximum water.
 * Time Target: O(N), Space Target: O(1)
 */
int maxArea(const vector<int>& height) {
    // TODO: Write your solution here using converging pointers.
    return 0;
}

/**
 * PROBLEM 11: 3Sum (Triplet Sum to Zero)
 * Returns all unique triplets [nums[i], nums[j], nums[k]] summing to 0 without duplicates.
 * Time Target: O(N^2), Space Target: O(1) auxiliary
 */
vector<vector<int>> threeSum(vector<int>& nums) {
    // TODO: Write your solution here using sort + 2-pointer with duplicate skipping.
    return {};
}

/**
 * PROBLEM 12: Boats to Save People
 * Each boat carries at most 2 people if weight sum <= limit. Returns minimum boats.
 * Time Target: O(N log N), Space Target: O(1)
 */
int numRescueBoats(vector<int>& people, int limit) {
    // TODO: Write your solution here using greedy sort + two-pointers.
    return 0;
}

/**
 * PROBLEM 13: Subarray with Given Sum (Positive Numbers)
 * Returns 1-based indices [start, end] of contiguous subarray summing to target, or {-1}.
 * Time Target: O(N), Space Target: O(1)
 */
vector<int> subarraySumPositive(const vector<int>& arr, long long target) {
    // TODO: Write your solution here using dynamic sliding window / two-pointers.
    return {-1};
}

// ============================================================================
// TIER 4: TCS DIGITAL & PRIME ADVANCED
// ============================================================================

/**
 * PROBLEM 14: Trapping Rain Water
 * Returns total units of trapped rain water.
 * Time Target: O(N), Space Target: O(1)
 */
int trapRainWater(const vector<int>& height) {
    // TODO: Write your solution here using two pointers with left_max & right_max.
    return 0;
}

/**
 * PROBLEM 15: Longest Palindromic Substring
 * Returns the longest palindromic substring in s.
 * Time Target: O(N^2), Space Target: O(1)
 */
string longestPalindrome(string s) {
    // TODO: Write your solution here using expand around center (two pointers).
    return "";
}

// ============================================================================
// TEST HARNESS
// ============================================================================

void runTests() {
    cout << "========================================" << endl;
    cout << " TCS TWO-POINTER PRACTICE TEST RUNNER" << endl;
    cout << "========================================" << endl;

    // --- TEST 1: Valid Palindrome ---
    cout << "\n[Test 1] Valid Palindrome: ";
    string s1 = "ada";
    cout << (isPalindrome(s1) ? "PASSED (true)" : "NOT IMPLEMENTED / FAILED") << endl;

    // --- TEST 2: Remove Duplicates ---
    cout << "[Test 2] Remove Duplicates: ";
    vector<int> t2 = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
    int k2 = removeDuplicates(t2);
    cout << "Unique count = " << k2 << endl;

    // --- TEST 3: Move Zeroes ---
    cout << "[Test 3] Move Zeroes: ";
    vector<int> t3 = {0, 1, 0, 3, 12};
    moveZeroes(t3);
    cout << "Array = [ ";
    for (int x : t3) cout << x << " ";
    cout << "]" << endl;

    // --- TEST 4: Squares of Sorted Array ---
    cout << "[Test 4] Sorted Squares: ";
    vector<int> t4 = {-4, -1, 0, 3, 10};
    vector<int> res4 = sortedSquares(t4);
    cout << "Squares = [ ";
    for (int x : res4) cout << x << " ";
    cout << "]" << endl;

    // --- TEST 5: Two Sum II ---
    cout << "[Test 5] Two Sum Sorted: ";
    vector<int> t5 = {2, 7, 11, 15};
    vector<int> res5 = twoSumSorted(t5, 9);
    if (!res5.empty()) cout << "Indices: [" << res5[0] << ", " << res5[1] << "]" << endl;
    else cout << "NOT IMPLEMENTED / NONE" << endl;

    // --- TEST 6: Sort 0s, 1s, 2s ---
    cout << "[Test 6] Sort 0, 1, 2: ";
    vector<int> t6 = {2, 0, 2, 1, 1, 0};
    sortColors(t6);
    cout << "Array = [ ";
    for (int x : t6) cout << x << " ";
    cout << "]" << endl;

    // --- TEST 10: Container With Most Water ---
    cout << "[Test 10] Container With Most Water: ";
    vector<int> t10 = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    cout << "Max Water = " << maxArea(t10) << " (Expected: 49)" << endl;

    // --- TEST 14: Trapping Rain Water ---
    cout << "[Test 14] Trapping Rain Water: ";
    vector<int> t14 = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    cout << "Trapped Water = " << trapRainWater(t14) << " (Expected: 6)" << endl;

    cout << "\nReady for your solutions! Implement any problem and run tests.\n";
}

int main() {
    runTests();
    return 0;
}
