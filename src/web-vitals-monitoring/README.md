# Web Vitals Monitoring

Measuring LCP, CLS, and FID using the web-vitals library.

## Core Web Vitals

### LCP (Largest Contentful Paint)

- Time until largest element renders
- Target: < 2.5 seconds

### FID (First Input Delay)

- Time from user input to page response
- Target: < 100 milliseconds

### CLS (Cumulative Layout Shift)

- Visual stability score (0 = no shift, 1 = maximum shift)
- Target: < 0.1

## Implementation Options

1. **web-vitals library** - Recommended for production
2. **PerformanceObserver API** - Native browser API
3. **Analytics services** - Segment, Vercel, etc.

## Installation

```bash
npm install web-vitals
```

## Example

See `WebVitalsMonitor.jsx` for monitoring implementation.
