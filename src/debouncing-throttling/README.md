# Debouncing & Throttling

Optimizing event-heavy interactions like search and scroll.

## Debounce

**Definition**: Wait until action stops for X ms before firing

**Use Cases**:

- Search input (API call while user types)
- Window resize
- Text field auto-save
- Price range filters

**Example**:

```javascript
const debouncedSearch = debounce((term) => {
  // API call
}, 500);

input.addEventListener("change", () => debouncedSearch(value));
```

## Throttle

**Definition**: Fire at most once every X ms

**Use Cases**:

- Scroll events
- Mouse move tracking
- Window resize
- Button clicks (prevent double-submit)

**Example**:

```javascript
const throttledScroll = throttle(() => {
  // Handle scroll
}, 200);

window.addEventListener("scroll", throttledScroll);
```

## Key Differences

| Feature  | Debounce          | Throttle            |
| -------- | ----------------- | ------------------- |
| Timing   | Waits for pause   | Regular intervals   |
| Use Case | Input/text events | Scroll/mouse events |
| Firing   | Once after stop   | Multiple times      |

## Performance Impact

- **Debounce**: Reduces API calls dramatically
- **Throttle**: Smooth, consistent updates
- **Both**: Significantly reduce event handler calls

## Implementation Tools

- Lodash: `_.debounce()`, `_.throttle()`
- React Hook: `useCallback` with dependencies
- Custom hooks: See `DebouncingThrottling.jsx`

## Example

See `DebouncingThrottling.jsx` for working implementations.
