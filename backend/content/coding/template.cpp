/**
 * TCS NQT C++ Quick Starter Template
 * 
 * Tips for TCS iON Compiler:
 * 1. Usually supports C++14/C++17 with GCC. <bits/stdc++.h> is supported.
 * 2. In TCS, inputs are often space-separated or comma-separated on a single line 
 *    WITHOUT specifying the size `N` first.
 * 3. Use `std::stringstream` to safely read entire lines of numbers.
 * 4. Use `long long` when values can exceed 2*10^9 (avoids 32-bit integer overflow).
 */

#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
#include <numeric>
#include <cmath>
#include <unordered_map>
#include <unordered_set>

using namespace std;

// Helper: Read a full line of space-separated integers
vector<long long> readSpaceSeparatedLine() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<long long> nums;
    long long val;
    while (ss >> val) {
        nums.push_back(val);
    }
    return nums;
}

// Helper: Read a full line of comma-separated integers (e.g., "10,20,30,40")
vector<long long> readCommaSeparatedLine() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    string token;
    vector<long long> nums;
    while (getline(ss, token, ',')) {
        if (!token.empty()) {
            nums.push_back(stoll(token));
        }
    }
    return nums;
}

void solve() {
    // Write your solution logic here
}

int main() {
    // Optimize I/O operations for performance
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    solve();

    return 0;
}
