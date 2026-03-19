# Virtual Lists

Rendering large datasets without performance degradation.

## Concept

Virtual scrolling (windowing) renders only visible items in the viewport, not the entire dataset.

## Key Metrics

- **Typical item height** - Fixed or calculated
- **Container height** - Determines visible items
- **Scroll position** - Calculates which items to render

## benefits

- Renders 10K+ items smoothly
- Constant memory usage
- Better scrolling performance

## Implementation Steps

1. Calculate item dimensions
2. Track scroll position
3. Determine visible range
4. Render only visible items with proper offset

## Example

See `VirtualList.jsx` for a working implementation that handles 10,000 items.
