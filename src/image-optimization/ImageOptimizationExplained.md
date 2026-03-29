# Image Optimization: Lazy Loading with Intersection Observer API

## Why Lazy Loading Exists

When a browser parses HTML, it starts fetching every `<img src="...">` it encounters immediately — even images hundreds of pixels below the fold. On a page with 50 images, that's 50 concurrent network requests fired on load, most of them wasted bandwidth for content the user may never scroll to. Lazy loading defers those fetches until the image is actually about to enter the viewport.

---

## Native `loading="lazy"`

Before reaching for JavaScript, browsers now support `<img loading="lazy">` natively. It requires zero JS and handles the common case well. The trade-off is you cede control over the threshold distance — browsers typically start fetching ~500–1500px before the image enters the viewport. For fine-grained control, use the Intersection Observer API.

---

## How Intersection Observer Works

The browser exposes a callback-based API that fires when a target element crosses a threshold of visibility relative to a root element (usually the viewport). This replaces the old pattern of listening to `scroll` events and manually computing `getBoundingClientRect()` on every scroll tick, which ran on the main thread and tanked performance.

With Intersection Observer, the browser handles the geometry math off the main thread and calls your callback only when something actually changes — a far more efficient contract.

---

## Step-by-Step Flow

### 1. Set `data-src` instead of `src`

Write `<img data-src="/photo.jpg" alt="...">` with no `src`. The browser has nothing to fetch yet. A tiny placeholder (blank SVG data URI or low-quality image preview) is typically used in `src`.

### 2. Create the Observer

Instantiate `new IntersectionObserver(callback, options)`. The `options` object lets you set a `rootMargin` to expand the detection zone beyond the viewport. A common value is `"0px 0px 200px 0px"` — triggers loading 200px before the image enters view, giving the network time to fetch before the user sees it.

### 3. Register Targets

Query all lazy images and call `observer.observe(img)` on each. The browser tracks them all asynchronously — no scroll listener involved.

### 4. Callback Fires

When an image crosses the threshold, the callback receives an array of `IntersectionObserverEntry` objects. Check `entry.isIntersecting === true`, then set `img.src = img.dataset.src`.

### 5. Unobserve to Free Memory

After loading the image, call `observer.unobserve(entry.target)`. Without this, the observer keeps watching the element forever and the callback keeps firing on every scroll past it.

---

## Implementation

### HTML Markup

```html
<!-- Hero: eager, always loaded -->
<img src="/hero.webp" alt="Hero" fetchpriority="high">

<!-- Below fold: lazy -->
<img
  data-src="/photo.webp"
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
  class="lazy"
  alt="Photo"
>
```

### JavaScript

```js
const loadImage = (entry, observer) => {
  const img = entry.target;
  img.src = img.dataset.src;        // trigger fetch
  img.classList.add('loaded');
  observer.unobserve(img);          // free memory
};

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries
      .filter(e => e.isIntersecting)
      .forEach(e => loadImage(e, obs));
  },
  {
    rootMargin: "0px 0px 200px 0px", // 200px pre-load buffer
    threshold: 0
  }
);

document
  .querySelectorAll("img.lazy")
  .forEach(img => observer.observe(img));
```

### CSS Fade-in on Load

```css
img.lazy         { opacity: 0; transition: opacity .4s; }
img.lazy.loaded  { opacity: 1; }
```

---

## Modern Image Formats

WebP typically compresses 25–35% better than JPEG at equivalent quality. AVIF goes further — often 50% smaller than JPEG — but browser support is slightly narrower. Use the `<picture>` element to serve the best format with a fallback:

```html
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img data-src="photo.jpg" alt="..." class="lazy">
</picture>
```

With lazy loading, put `data-src` on the `<img>` and `data-srcset` on the `<source>` elements, then swap them all in the observer callback.

---

## Impact on Core Web Vitals

| Metric | Impact |
|---|---|
| **LCP** | Improves when the hero image is eagerly loaded and everything below is deferred. Regresses if you accidentally lazy-load the hero itself. |
| **TTFB contention** | Reducing initial requests frees up network bandwidth for critical resources. |
| **TBT / INP** | Replacing scroll listeners with Intersection Observer eliminates main-thread jank. |

> **Rule of thumb:** Eager-load the first one or two above-the-fold images. Lazy-load everything else.

---

## Key Options & Nuances

### `rootMargin: "0px 0px 200px 0px"`

Expands the detection zone 200px downward from the viewport bottom. This is your pre-fetch buffer — images load before they're visible, so the user never sees a blank slot. Tune this based on expected connection speed.

### `threshold: 0`

The callback fires as soon as even one pixel of the image enters the expanded zone. A threshold of `0.5` would wait until 50% of the image is visible — rarely what you want for lazy loading.

### Blank SVG placeholder vs `src=""`

An empty `src` can trigger a request to the page URL itself in some older browsers. The blank SVG data URI avoids that while keeping the image element valid:

```
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E
```

### `fetchpriority="high"` on the hero image

Signals to the browser's preload scanner that this resource is critical — directly boosting LCP. Works independently of lazy loading.
