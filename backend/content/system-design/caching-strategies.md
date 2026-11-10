---
title: "Caching Strategies & Invalidation"
category: "System Design"
difficulty: "Advanced"
tags: ["caching", "redis", "system-design", "performance", "scalability"]
summary: "Explore Cache-Aside, Write-Through, Write-Behind, cache eviction algorithms (LRU/LFU), and how to solve Cache Stampede / Thundering Herd."
estimatedMinutes: 18
order: 3
---

# Caching Strategies & Invalidation

There are only two hard things in Computer Science: cache invalidation and naming things.
— *Phil Karlton*

Caching sits between your compute layer (servers) and database to reduce response latency and relieve database read load.

---

## 1. Common Caching Patterns

### Cache-Aside (Lazy Loading)
The application code coordinates between the cache and storage.
1. Application queries Cache.
2. If **Cache Hit**: return cached value.
3. If **Cache Miss**: query Database, write result to Cache, return value.

```text
[Client] -> [App Server] --(1. Check Cache)--> [Redis Cache]
                 |                                    |
                 +--------(2. Miss? Query DB)---------> [Postgres DB]
                 |                                    |
                 +--------(3. Write back)------------> [Redis Cache]
```

### Write-Through
Data is written to the cache and the primary database **simultaneously** in a single operation.
- **Pros**: High data consistency; reads are always fast.
- **Cons**: Higher write latency because every write hits two stores.

### Write-Behind (Write-Back)
Data is written to the cache immediately; the cache asynchronously flushes changes to the database in batches.
- **Pros**: Blazing fast write throughput.
- **Cons**: Risk of data loss if the cache node crashes before flushing to the database.

---

## 2. Eviction Policies

When the cache reaches capacity, an eviction policy decides which entries to discard:

| Policy | Description | Best Suited For |
| :--- | :--- | :--- |
| **LRU** (Least Recently Used) | Discards items not accessed for the longest time | General web workloads, temporal locality |
| **LFU** (Least Frequently Used) | Discards items with the lowest hit frequency counter | Video streaming, popular static assets |
| **FIFO** (First In First Out) | Discards items strictly based on arrival time | Simple sliding window logs |

---

## 3. The Cache Stampede (Thundering Herd) Problem

When a hot key expires, hundreds of concurrent requests may experience a cache miss simultaneously and hammer the database with the exact same expensive query:

> [!WARNING]
> Cache Stampede can bring down your primary database during traffic spikes.

### Solutions:
1. **Mutex Lock**: Only the first worker acquires a lock to recompute the key; others wait or receive stale data.
2. **Probabilistic Early Expiration (XFetch)**: Keys are refreshed proactively in the background before they expire based on a probability formula.
