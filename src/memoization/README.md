# Memoization

useMemo, useCallback, and React.memo with real use cases and pitfalls.

## Concepts

- **React.memo** - Prevents re-renders of child components
- **useMemo** - Caches computed values
- **useCallback** - Caches function references

## When to Use

- Expensive computations (sorting, filtering large datasets)
- Components with complex render logic
- Passing callbacks as props to memoized children

## Common Pitfalls

- Over-memoizing (adds overhead, not always beneficial)
- Forgetting to include dependencies in useCallback/useMemo
- Memoizing trivial computations

## Example

See `MemoizationExample.jsx` for practical implementations.
