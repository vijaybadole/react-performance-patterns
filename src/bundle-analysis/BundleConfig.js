/**
 * Webpack Bundle Analysis Configuration
 *
 * Install: npm install --save-dev webpack-bundle-analyzer
 *
 * Usage:
 * In package.json scripts:
 * "analyze": "webpack-bundle-analyzer dist/stats.json"
 */

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "bundle-report.html",
    }),
  ],
};

/**
 * Key Metrics to Watch:
 *
 * 1. Parsed Size (actual JS code)
 * 2. Gzipped Size (most relevant for network)
 * 3. Duplicate Dependencies
 * 4. Unused Code
 */

/**
 * Optimization Strategies:
 *
 * 1. Code Splitting
 *    - Split vendors from app code
 *    - Split route-based chunks
 *
 * 2. Tree Shaking
 *    - Remove unused exports
 *    - Use ES6 modules
 *
 * 3. Dependency Analysis
 *    - Use lightweight alternatives
 *    - Remove unused libraries
 *
 * 4. Dynamic Imports
 *    - Lazy load components
 *    - Lazy load libraries (moment.js, lodash, etc.)
 */
