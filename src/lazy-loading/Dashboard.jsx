import React from 'react';

export default function Dashboard() {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>📊 Dashboard</h2>
            <p>This component is lazily loaded when you click the Dashboard button.</p>
            <div style={{
                background: '#f0f4ff',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem'
            }}>
                <h3>Performance Benefit:</h3>
                <ul>
                    <li>Only loaded when needed</li>
                    <li>Reduces initial bundle size</li>
                    <li>Improves Time to Interactive (TTI)</li>
                </ul>
            </div>
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#e8f5e9', borderRadius: '8px' }}>
                <h4>Sample Metrics:</h4>
                <p>Active Users: 1,234</p>
                <p>Page Views: 5,678</p>
                <p>Conversion Rate: 3.2%</p>
            </div>
        </div>
    );
}
