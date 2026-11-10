/**
 * ============================================================================
 * TCS NQT FOUNDATION: LOGIC BUILDERS (C++)
 * ============================================================================
 * 
 * Rules for these problems:
 * 1. Focus purely on RAW LOGIC: Use basic loops, conditionals, math, and arrays.
 * 2. Try NOT to use high-level STL functions (e.g., don't use std::sort, std::to_string,
 *    or std::reverse) where the goal is to implement the underlying logic.
 * 3. Write your solution inside each function marked with "TODO".
 * 4. When ready, compile and run:
 *      g++ -std=c++17 logic_builders.cpp -o logic_builders
 *      ./logic_builders
 * 
 * Reviewed by Antigravity:
 * Lines with issues are commented out with "// INCORRECT / BUG" and followed
 * immediately by the corrected line with explanations.
 * ============================================================================
 */

#include <iostream>
#include <vector>
#include <string>
#include <climits>
#include <algorithm> // Added: Needed for std::reverse

using namespace std;

// ============================================================================
// PROBLEM 1: Palindrome Number (Pure Math - No Strings)
// ----------------------------------------------------------------------------
// Task: Return true if an integer `n` is a palindrome, false otherwise.
// Constraint: Do NOT convert the number to string. Handle negative numbers.
// Examples:
//   n = 121   -> true
//   n = -121  -> false
//   n = 10    -> false
// ============================================================================
bool isPalindromeNumber(long long n) {
    long long num = 0;
    long long originalNum = n;

    if(n < 0 || (n % 10 == 0 && n != 0)) return false;

    while(n != 0){
        int rem = n % 10;
        num = num * 10 + rem;
        n /= 10;
    }
    return num == originalNum;
}

bool isPalindrome2(long long n){
    // Edge case check: negative numbers and numbers ending in 0 (except 0 itself) cannot be palindromes
    if (n < 0 || (n % 10 == 0 && n != 0)) return false;

    long long revHalf = 0;
    // // BUG: 'n' is divided inside the loop, so comparing revHalf with ogNum at the end won't work
    // long long ogNum = n;

    // // INCORRECT LOOP: while(revHalf < n)
    // CORRECT: Reversing half of the number avoids overflow and cuts runtime in half
    while(n > revHalf){
        revHalf = revHalf * 10 + (n % 10);
        n /= 10;
    }

    // // INCORRECT: return revHalf == ogNum;
    // CORRECT: For even digits (e.g. 1221 -> n=12, revHalf=12) => n == revHalf
    //          For odd digits (e.g. 12321 -> n=12, revHalf=123) => n == revHalf/10
    return (n == revHalf || n == revHalf / 10);
}

// ============================================================================
// PROBLEM 2: Count Trailing Zeroes in N! (Factorial)
// ----------------------------------------------------------------------------
// Task: Given integer N, count how many trailing zeroes are in N!
// Note: Calculating N! directly will overflow even a 64-bit integer for N > 20.
// Hint: Every trailing zero is formed by a factor of 10 = 2 * 5. Count factors of 5.
// Examples:
//   N = 5   (5! = 120)       -> Output: 1
//   N = 25  (25! ends in...)  -> Output: 6
// ============================================================================
int countTrailingZeroesInFactorial(int n) {
    int tenCount = 0;

    // // BUG: `5 < n` terminates prematurely when n == 5.
    // // For N=5, (5 < 5) evaluates to false, returning 0 instead of 1.
    // // For N=25, it stops at n=5 and misses the final 5/5 = 1 count.
    // while(5<n){
    while (n >= 5) {
        tenCount += n / 5;
        n /= 5;
    }

    return tenCount;
}

// ============================================================================
// PROBLEM 3: Armstrong Number Check
// ----------------------------------------------------------------------------
// Task: An Armstrong number of order k is a number such that the sum of its
// digits raised to the power k equals the number itself.
// Example:
//   n = 153 -> 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153 (true)
//   n = 1634 -> 1^4 + 6^4 + 3^4 + 4^4 = 1 + 1296 + 81 + 256 = 1634 (true)
//   n = 123 -> false
// ============================================================================
bool isArmstrong(long long n) {
    if (n < 0) return false; // Negative numbers cannot be Armstrong

    long long ogNum = n;
    int order = 0;
    // // POTENTIAL OVERFLOW: 'int' could overflow if n > 2*10^9; use 'long long' to match 'n'
    // int tempNum = n;
    long long tempNum = n;
    long long sum = 0;
    while(tempNum > 0){
        tempNum /= 10;
        order += 1;
    }
    
    if(order == 1 || n == 0) return true;

    while(n != 0){
        int rem = n % 10;
        // // POTENTIAL OVERFLOW: For large order, int digitPow can overflow 32 bits
        // int digitPow = 1;
        long long digitPow = 1;
        for(int i = 0; i < order; i++){
            digitPow *= rem;
        }
        sum += digitPow;
        n /= 10;
    }

    return sum == ogNum;
}

// ============================================================================
// PROBLEM 4: Second Largest Element in Array (Single Pass - O(N))
// ----------------------------------------------------------------------------
// Task: Find the second largest distinct element in an array in O(N) time.
// Constraint: Do NOT sort the array. Do it in a single pass.
// Return -1 if no second largest distinct element exists.
// Examples:
//   arr = [12, 35, 1, 10, 34, 1] -> Output: 34
//   arr = [10, 10, 10]           -> Output: -1
// ============================================================================
int findSecondLargest(const vector<int>& arr) {
    // Single-pass O(N) approach maintaining largest and second largest
    int largest = -1;
    int secondLargest = -1;

    for (int num : arr) {
        if (num > largest) {
            secondLargest = largest;
            largest = num;
        } else if (num < largest && num > secondLargest) {
            secondLargest = num;
        }
    }

    return secondLargest;
}

// ============================================================================
// PROBLEM 5: Check if Array is Sorted and Rotated
// ----------------------------------------------------------------------------
// Task: Given an array, check if it was originally sorted in non-decreasing
// order and then rotated some number of positions (including 0 positions).
// Examples:
//   arr = [3, 4, 5, 1, 2] -> true  (originally [1, 2, 3, 4, 5] rotated by 3)
//   arr = [2, 1, 3, 4]    -> false
//   arr = [1, 2, 3]       -> true  (rotated by 0)
// ============================================================================
bool isSortedAndRotated(const vector<int>& arr) {
    // // BUG 1: sizeof(arr)/sizeof(arr[0]) on std::vector gives sizeof the vector object (~24 bytes), NOT element count!
    // // BUG 2: arr.is_sorted(...) is not a vector member method (it's std::is_sorted).
    // // BUG 3: isAsc || isDesc does NOT detect rotated arrays (e.g. [3,4,5,1,2] is neither asc nor desc).
    // int size = sizeof(arr)/sizeof(arr[0]);
    // bool isAsc = arr.is_sorted(arr.begin(),arr.end());
    // bool isDesc = arr.is_sorted(arr,arr+size,greater<int>());
    // return isAsc || isDesc;

    // CORRECT LOGIC:
    // In any sorted and rotated array, when traversing circularly (i to (i+1)%n),
    // there can be AT MOST ONE drop where arr[i] > arr[(i + 1) % n].
    int countDrops = 0;
    int n = arr.size();
    for (int i = 0; i < n; ++i) {
        if (arr[i] > arr[(i + 1) % n]) {
            countDrops++;
        }
    }
    return countDrops <= 1;
}

// ============================================================================
// PROBLEM 6: Move All Zeroes to End (In-Place O(1) Space)
// ----------------------------------------------------------------------------
// Task: Move all 0s in `arr` to the end while maintaining the relative order
// of non-zero elements.
// Constraint: Must modify `arr` in-place without creating a secondary array.
// Example:
//   arr = [0, 1, 0, 3, 12] -> becomes [1, 3, 12, 0, 0]
// ============================================================================
void moveZeroesToEnd(vector<int>& arr) {
    int insertPos = 0;

    // // BUG: Variable `v` was not declared; the parameter is `arr`.
    // for(int i=0;i<v.size(); i++){
    for (int i = 0; i < (int)arr.size(); i++) {
        if(arr[i] != 0){
            arr[insertPos++] = arr[i];
        }
    }

    while(insertPos < (int)arr.size()){
        arr[insertPos++] = 0;
    }
}

// ============================================================================
// PROBLEM 7: Decimal to Binary & Binary to Decimal (Pure Math)
// ----------------------------------------------------------------------------
// Part A: Convert decimal integer N to binary representation as a string.
// Part B: Convert binary string S back to a decimal integer.
// Examples:
//   decimalToBinary(13) -> "1101"
//   binaryToDecimal("1101") -> 13
// ============================================================================
string decimalToBinary(long long n) {
    // // EDGE CASE BUG: If n == 0, the while(n > 0) loop won't run, returning empty string "" instead of "0".
    if (n == 0) return "0";

    string binary = "";

    while(n > 0){
        if(n % 2 == 0){
            binary += "0";
        }else{
            binary += "1";
        }

        n /= 2;
    }

    reverse(binary.begin(), binary.end());
    return binary;
}

long long binaryToDecimal(const string& s) {
    int size = s.length();

    long long base = 1;
    long long sum = 0;
    
    for(int i = size - 1; i >= 0; --i){
        // // Debug logs commented out to keep test output clean
        // cout<<"i - "<<i<<endl;
        // cout<<"s[i] "<<s[i]<<endl;
        if(s[i] == '1'){
            sum += base;
            // cout<<"SUM - "<<sum<<endl;
        }

        base *= 2;
        // cout<<"base - "<<base<<endl;
    }
    return sum;
}

// ============================================================================
// PROBLEM 8: Missing Number in Range [1, N]
// ----------------------------------------------------------------------------
// Task: An array of size N-1 contains distinct numbers in range [1, N].
// Find the one missing number without sorting.
// Constraint: O(N) time and O(1) extra space.
// Example:
//   arr = [1, 2, 4, 6, 3, 7, 8], N = 8 -> Missing is 5
// ============================================================================
int findMissingNumber(const vector<int>& arr, int n) {
    // // CAUTION: For large n (e.g., n = 10^5), naturalSum can exceed 2*10^9 and overflow signed 32-bit int.
    // int arrSum = 0;
    // int naturalSum = 0;
    long long arrSum = 0;
    long long naturalSum = 0;

    for(int i = 1; i <= n; i++){
        naturalSum += i;
        if(i != n){
            arrSum += arr[i - 1];
        }
    }

    return (int)(naturalSum - arrSum);
}

// ============================================================================
// PROBLEM 9: Majority Element (> N/2 times)
// ----------------------------------------------------------------------------
// Task: Find the element that appears more than N/2 times in the array.
// Assume a majority element always exists.
// Constraint: Try to do it in O(N) time and O(1) space (Boyer-Moore Voting idea).
// Example:
//   arr = [2, 2, 1, 1, 1, 2, 2] -> Output: 2
// ============================================================================
int findMajorityElement(const vector<int>& arr) {
    int candidate = 0;
    int count = 0;

    // // BUG 1: 'nums' was used instead of the parameter 'arr'.
    // for(int num : nums){
    for(int num : arr){
        if(count == 0){
            candidate = num;
            count = 1;
        }else if (num == candidate){
            count++;
        }else{
            count--;
        }
    }

    int actualCount = 0;
    // // BUG 2: 'nums' was used instead of 'arr'.
    // for(int num : nums){
    for(int num : arr){
        if(num == candidate){
            actualCount++;
        }
    }

    // // BUG 3: 'nums.size()' used instead of 'arr.size()', and missing semicolon after return candidate.
    // if(actualCount>nums.size()/2){
    //     return candidate
    // }else{
    if(actualCount > (int)arr.size() / 2){
        return candidate;
    }else{
        return -1;
    }
}

// ============================================================================
// PROBLEM 10: Array Leaders
// ----------------------------------------------------------------------------
// Task: An element is a "Leader" if it is greater than or equal to all the
// elements to its right. The rightmost element is always a leader.
// Return all leaders (in the order they appear from left to right).
// Hint: Scanning from right to left makes this O(N)!
// Example:
//   arr = [16, 17, 4, 3, 5, 2] -> Leaders: [17, 5, 2]
// ============================================================================
vector<int> findLeaders(const vector<int>& arr) {
    if (arr.empty()) return {};

    vector<int> leaders;
    int size = arr.size();

    // // BUG 1: Pushing arr[size-1] before the loop and then again when i = size-1
    // // caused arr[size-1] to be added TWICE to the result.
    // int maxFromRight = arr[size-1];
    // leaders.push_back(arr[size-1]);
    // for(int i = size-1; i>=0; --i){
    //     if(arr[i]>=maxFromRight){
    //         leaders.push_back(arr[i]);
    //         maxFromRight = arr[i];
    //     }
    // }

    // CORRECT: Initialize maxFromRight with a sentinel value so the last element is picked once
    int maxFromRight = INT_MIN;
    for(int i = size - 1; i >= 0; --i){
        if(arr[i] >= maxFromRight){
            leaders.push_back(arr[i]);
            maxFromRight = arr[i];
        }
    }

    // // BUG 2: Traversing right-to-left produces leaders in reverse ([2, 5, 17]).
    // // We must reverse the list to restore original left-to-right order ([17, 5, 2]).
    reverse(leaders.begin(), leaders.end());

    return leaders;
}

// ============================================================================
// TEST HARNESS: Run this to test your solutions
// ============================================================================
int main() {
    cout << "========================================\n";
    cout << "   TCS NQT LOGIC BUILDERS TEST HARNESS   \n";
    cout << "========================================\n\n";

    // P1 Test
    cout << "[P1] Palindrome Number:\n";
    cout << "  121   -> " << (isPalindromeNumber(121) ? "PASS" : "FAIL (Expected true)") << "\n";
    cout << "  -121  -> " << (!isPalindromeNumber(-121) ? "PASS" : "FAIL (Expected false)") << "\n";
    cout << "  10    -> " << (!isPalindromeNumber(10) ? "PASS" : "FAIL (Expected false)") << "\n";
    cout << "  (isPalindrome2) 1221 -> " << (isPalindrome2(1221) ? "PASS" : "FAIL") << "\n";
    cout << "  (isPalindrome2) 12321 -> " << (isPalindrome2(12321) ? "PASS" : "FAIL") << "\n\n";

    // P2 Test
    cout << "[P2] Trailing Zeroes in Factorial:\n";
    cout << "  5!    -> Got: " << countTrailingZeroesInFactorial(5) << " (Expected: 1)\n";
    cout << "  25!   -> Got: " << countTrailingZeroesInFactorial(25) << " (Expected: 6)\n\n";

    // P3 Test
    cout << "[P3] Armstrong Number:\n";
    cout << "  153   -> " << (isArmstrong(153) ? "PASS" : "FAIL (Expected true)") << "\n";
    cout << "  1634  -> " << (isArmstrong(1634) ? "PASS" : "FAIL (Expected true)") << "\n";
    cout << "  123   -> " << (!isArmstrong(123) ? "PASS" : "FAIL (Expected false)") << "\n\n";

    // P4 Test
    cout << "[P4] Second Largest Element:\n";
    cout << "  [12, 35, 1, 10, 34, 1] -> Got: " << findSecondLargest({12, 35, 1, 10, 34, 1}) << " (Expected: 34)\n";
    cout << "  [10, 10, 10]           -> Got: " << findSecondLargest({10, 10, 10}) << " (Expected: -1)\n\n";

    // P5 Test
    cout << "[P5] Check Sorted and Rotated:\n";
    cout << "  [3, 4, 5, 1, 2] -> " << (isSortedAndRotated({3, 4, 5, 1, 2}) ? "PASS" : "FAIL (Expected true)") << "\n";
    cout << "  [2, 1, 3, 4]    -> " << (!isSortedAndRotated({2, 1, 3, 4}) ? "PASS" : "FAIL (Expected false)") << "\n\n";

    // P6 Test
    cout << "[P6] Move Zeroes to End:\n";
    vector<int> zArr = {0, 1, 0, 3, 12};
    moveZeroesToEnd(zArr);
    cout << "  Result: [ ";
    for (int x : zArr) cout << x << " ";
    cout << "] (Expected: [ 1 3 12 0 0 ])\n\n";

    // P7 Test
    cout << "[P7] Base Conversions:\n";
    cout << "  Dec 13 to Bin -> Got: " << decimalToBinary(13) << " (Expected: 1101)\n";
    cout << "  Dec 0 to Bin  -> Got: " << decimalToBinary(0) << " (Expected: 0)\n";
    cout << "  Bin 1101 to Dec -> Got: " << binaryToDecimal("1101") << " (Expected: 13)\n\n";

    // P8 Test
    cout << "[P8] Missing Number:\n";
    cout << "  [1, 2, 4, 6, 3, 7, 8], N=8 -> Got: " << findMissingNumber({1, 2, 4, 6, 3, 7, 8}, 8) << " (Expected: 5)\n\n";

    // P9 Test
    cout << "[P9] Majority Element:\n";
    cout << "  [2, 2, 1, 1, 1, 2, 2] -> Got: " << findMajorityElement({2, 2, 1, 1, 1, 2, 2}) << " (Expected: 2)\n\n";

    // P10 Test
    cout << "[P10] Array Leaders:\n";
    vector<int> leaders = findLeaders({16, 17, 4, 3, 5, 2});
    cout << "  Result: [ ";
    for (int x : leaders) cout << x << " ";
    cout << "] (Expected: [ 17 5 2 ])\n\n";

    return 0;
}
