---
title: "React State & Effect Lifecycle"
category: "Web Development"
difficulty: "Intermediate"
tags: ["react", "hooks", "useState", "useEffect", "lifecycle"]
summary: "Understand React component rendering lifecycles, state batching behavior, and how to safely synchronize effects without memory leaks."
estimatedMinutes: 12
order: 2
---

# React State & Effect Lifecycle

React components are declarative: you describe what the UI should look like for a given state, and React handles rendering and DOM reconciliation.

---

## 1. How `useState` and Batching Work

State updates in React 18+ are automatically **batched**, meaning multiple state updates triggered inside event handlers, promises, or `setTimeout` are grouped into a single re-render.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // ⚠️ These three calls do NOT increment count by 3!
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // count will only increment by 1 because all 3 calls reference the same stale `count`
  }

  function handleFunctionalClick() {
    // ✅ Functional update passes pending state:
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // count will properly increment by 3!
  }

  return <button onClick={handleFunctionalClick}>Count: {count}</button>;
}
```

> [!IMPORTANT]
> When your next state depends on the previous state value, always use the **functional updater form**: `setState(prev => prev + 1)`.

---

## 2. The `useEffect` Hook

`useEffect` allows you to synchronize a component with external systems (network requests, browser APIs, timers, subscriptions).

### Anatomy of an Effect

```jsx
useEffect(() => {
  // 1. Setup code: runs after render
  const subscription = api.subscribe(userId);

  // 2. Cleanup code: runs before the component unmounts OR before the effect re-runs
  return () => {
    subscription.unsubscribe();
  };
}, [userId]); // 3. Dependency array: effect re-runs only if userId changes
```

---

## 3. Dependency Array Rules

- **No dependency array (`useEffect(() => {})`)**: Runs after *every* render.
- **Empty dependency array (`useEffect(() => {}, [])`)**: Runs *once* after initial mount; cleanup runs on unmount.
- **With dependencies (`useEffect(() => {}, [a, b])`)**: Runs on mount and whenever `a` or `b` changes by referential equality (`Object.is`).

> [!WARNING]
> Omitting dependencies from the array while referencing them inside the effect causes **stale closure** bugs. Always include all reactive values used inside the effect.
