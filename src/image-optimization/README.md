# Image Optimization

Lazy loading images with Intersection Observer API.

## Techniques

### Lazy Loading

- Load images only when visible
- Reduce initial page load
- Save bandwidth for off-screen images

### Intersection Observer API

- Native browser API
- Efficient visibility detection
- Works without scroll listeners

### Modern Formats

- WebP (better compression)
- AVIF (next generation)
- Fallback to JPEG/PNG

## Benefits

- Faster Core Web Vitals scores
- Reduced bandwidth usage
- Better mobile performance

## Implementation Steps

1. Set `data-src` attribute with actual path
2. Create IntersectionObserver
3. When visible, set `src` to load image
4. Remove observer to free memory

## Example

See `ImageOptimization.jsx` for working implementation.
