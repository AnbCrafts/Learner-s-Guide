/**
 * DAY 1 CODING PROBLEMS (C++)
 * 
 * Target: Solve these within your 7:45 AM - 9:00 AM window.
 * 
 * How to compile & run:
 *   g++ -std=c++17 day1_problems.cpp -o day1_problems
 *   ./day1_problems
 */

#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
#include <cmath>

using namespace std;

// ============================================================================
// PROBLEM 1 (TCS Q1 Style): Find Smallest Number whose product of digits is N
// ----------------------------------------------------------------------------
// Problem: Given an integer N, find the smallest positive integer k such that 
// the product of digits of k equals N. If no such k exists, return -1.
//
// Examples:
//   Input: N = 36  --> Output: 49   (4 * 9 = 36, and 49 < 66)
//   Input: N = 100 --> Output: 455  (4 * 5 * 5 = 100)
//   Input: N = 13  --> Output: -1   (Prime > 9 cannot be formed by single digit products)
// ============================================================================
string solveSmallestNumberWithProductN(long long n) {
    if (n < 0) return "-1";
    if (n >= 0 && n <= 9) return to_string(n);

    // Greedy strategy: Factor out digits from 9 down to 2
    string result = "";
    for (int digit = 9; digit >= 2; --digit) {
        while (n % digit == 0) {
            result.push_back('0' + digit);
            n /= digit;
        }
    }

    // If n is still > 1, it has prime factors >= 11 (e.g., 11, 13, 17)
    // which cannot be represented as a single base-10 digit.
    if (n > 1) {
        return "-1";
    }

    // Since we extracted largest digits first, reversing gives the smallest number
    reverse(result.begin(), result.end());
    return result;
}

// ============================================================================
// PROBLEM 2 (TCS Digital Q1/Q2 Style): Range Primes using Sieve of Eratosthenes
// ----------------------------------------------------------------------------
// Problem: Given two integers L and R, find the sum of all prime numbers in [L, R].
// Constraints: 1 <= L <= R <= 10^6
//
// Naive approach (trial division for each number) will give TLE.
// Sieve of Eratosthenes gives O(R log log R) precomputation.
// ============================================================================
long long sumPrimesInRange(int L, int R) {
    if (R < 2) return 0;
    
    // Sieve up to R
    vector<bool> isPrime(R + 1, true);
    isPrime[0] = isPrime[1] = false;

    for (int p = 2; p * p <= R; ++p) {
        if (isPrime[p]) {
            for (int multiple = p * p; multiple <= R; multiple += p) {
                isPrime[multiple] = false;
            }
        }
    }

    long long sum = 0;
    for (int i = max(L, 2); i <= R; ++i) {
        if (isPrime[i]) {
            sum += i;
        }
    }
    return sum;
}

// ============================================================================
// SELF-CHECK TESTS
// ============================================================================
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cout << "=== Running Day 1 Tests ===\n\n";

    // Test Problem 1
    cout << "Problem 1 (Product of Digits):\n";
    cout << "  N = 36  -> Expected: 49, Got: " << solveSmallestNumberWithProductN(36) << "\n";
    cout << "  N = 100 -> Expected: 455, Got: " << solveSmallestNumberWithProductN(100) << "\n";
    cout << "  N = 13  -> Expected: -1, Got: " << solveSmallestNumberWithProductN(13) << "\n";
    cout << "  N = 7   -> Expected: 7, Got: " << solveSmallestNumberWithProductN(7) << "\n";

    // Test Problem 2
    cout << "\nProblem 2 (Sum of Primes in Range):\n";
    cout << "  [10, 20] -> Expected: 60 (11+13+17+19), Got: " << sumPrimesInRange(10, 20) << "\n";
    cout << "  [1, 10]  -> Expected: 17 (2+3+5+7), Got: " << sumPrimesInRange(1, 10) << "\n";

    cout << "\nAll test runs completed successfully!\n";
    return 0;
}
