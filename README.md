# React Performance Patterns

A collection of production-grade React performance techniques used in 
large-scale e-commerce applications.

## Patterns Covered

- **Lazy Loading** — Route-based and component-based code splitting with React.lazy and Suspense
- **Memoization** — useMemo, useCallback, and React.memo with real use cases and pitfalls
- **Virtual Lists** — Rendering large datasets without performance degradation
- **Web Vitals Monitoring** — Measuring LCP, CLS, and FID using the web-vitals library
- **Image Optimization** — Lazy loading images with Intersection Observer API
- **Bundle Analysis** — Webpack Bundle Analyzer setup to identify and reduce bundle size
- **Debouncing & Throttling** — Optimizing event-heavy interactions like search and scroll

## Why This Exists

These patterns come from real work on a Fortune 50 e-commerce platform 
where a 40% reduction in page load time was achieved through systematic 
application of these techniques.

## Tech Stack

React 18 · JavaScript (ES6+) · Webpack · Web Vitals · Intersection Observer API

## Getting Started

npm install
npm start
