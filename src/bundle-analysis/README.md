# Bundle Analysis

Webpack Bundle Analyzer setup to identify and reduce bundle size.

## Installation

```bash
npm install --save-dev webpack-bundle-analyzer
```

## Key Concepts

### Bundle Size Metrics

- **Parsed Size** - Uncompressed JavaScript size
- **Gzipped Size** - Compressed size (what users download)
- **Module Count** - Number of modules in bundle

### Common Issues

1. **Duplicate Dependencies** - Package installed multiple times
2. **Large Libraries** - moment.js, lodash without tree-shaking
3. **Unused Code** - Dead code not removed
4. **Missing Code Splitting** - All code in single bundle

## Optimization Strategies

### 1. Code Splitting

```javascript
// Vendor split
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
      },
    },
  },
}
```

### 2. Tree Shaking

- Use ES6 modules (import/export)
- Set `sideEffects: false` in package.json

### 3. Dynamic Imports

```javascript
const Component = lazy(() => import("./Component"));
```

### 4. Environment-specific Builds

- Remove dev tools from production
- Minify and compress

## Example

See `BundleConfig.js` for Webpack configuration.
