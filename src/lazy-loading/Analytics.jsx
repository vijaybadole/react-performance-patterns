import React from 'react';

export default function Analytics() {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>📈 Analytics</h2>
            <p>This component is lazily loaded when you click the Analytics button.</p>
            <div style={{
                background: '#f0f4ff',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem'
            }}>
                <h3>Performance Benefit:</h3>
                <ul>
                    <li>Suspense boundary handles loading state</li>
                    <li>Better user experience with fallback UI</li>
                    <li>Optimized for slower connections</li>
                </ul>
            </div>
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#f3e5f5', borderRadius: '8px' }}>
                <h4>Analytics Data:</h4>
                <p>🔍 Total Visits: 12,456</p>
                <p>⏱️ Avg Session Duration: 5m 32s</p>
                <p>📱 Mobile Traffic: 65%</p>
                <p>🌍 Top Countries: US, UK, Canada</p>
            </div>
        </div>
    );
}
