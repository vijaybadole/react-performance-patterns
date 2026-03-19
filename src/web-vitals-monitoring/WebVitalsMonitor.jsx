import React, { useEffect } from 'react';

// Example: Simple Web Vitals monitoring
// In production, use: npm install web-vitals

export default function WebVitalsMonitor() {
    useEffect(() => {
        // Simulate monitoring LCP, CLS, FID
        const handlePerformanceMetrics = () => {
            // LCP (Largest Contentful Paint)
            if ('PerformanceObserver' in window) {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
                    sendMetric('LCP', lastEntry.renderTime || lastEntry.loadTime);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

                // CLS (Cumulative Layout Shift)
                const clsObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            console.log('CLS:', entry.value);
                            sendMetric('CLS', entry.value);
                        }
                    }
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            }
        };

        handlePerformanceMetrics();
    }, []);

    const sendMetric = (metric, value) => {
        console.log(`Sending metric: ${metric} = ${value}`);
        // In production: POST to analytics service
        // fetch('/api/metrics', { 
        //   method: 'POST', 
        //   body: JSON.stringify({ metric, value }) 
        // });
    };

    return (
        <div>
            <h2>Web Vitals Monitor</h2>
            <p>Check console for LCP, CLS, and other Web Vitals metrics.</p>
            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <h3>Sample Content for LCP Measurement</h3>
                <p>This content affects Largest Contentful Paint (LCP)</p>
            </div>
        </div>
    );
}
