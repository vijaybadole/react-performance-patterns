export default function HomePage() {
    return (
        <div className="page-container home">
            <h1>🚀 React Performance Patterns</h1>
            <p className="subtitle">
                A collection of production-grade React performance techniques used in large-scale e-commerce applications.
            </p>

            <div className="patterns-grid">
                <div className="pattern-card">
                    <h3>📊 Web Vitals Monitor</h3>
                    <p>Track LCP, CLS, and other Core Web Vitals metrics in real-time.</p>
                </div>

                <div className="pattern-card">
                    <h3>⏱️ Debouncing & Throttling</h3>
                    <p>Optimize event handlers and API calls with debouncing and throttling techniques.</p>
                </div>

                <div className="pattern-card">
                    <h3>🔄 Memoization</h3>
                    <p>Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.</p>
                </div>

                <div className="pattern-card">
                    <h3>⚡ Lazy Loading</h3>
                    <p>Load components on-demand using React.lazy and code splitting.</p>
                </div>

                <div className="pattern-card">
                    <h3>🖼️ Image Optimization</h3>
                    <p>Optimize images with modern formats, lazy loading, and responsive techniques.</p>
                </div>

                <div className="pattern-card">
                    <h3>📜 Virtual Lists</h3>
                    <p>Render large lists efficiently using virtualization techniques.</p>
                </div>
            </div>
        </div>
    );
}
