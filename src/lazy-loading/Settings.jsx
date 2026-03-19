import React from 'react';

export default function Settings() {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>⚙️ Settings</h2>
            <p>This component is lazily loaded when you click the Settings button.</p>
            <div style={{
                background: '#f0f4ff',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem'
            }}>
                <h3>Performance Benefit:</h3>
                <ul>
                    <li>Code splitting with React.lazy()</li>
                    <li>Dynamic imports at runtime</li>
                    <li>Separate chunk for each lazy component</li>
                </ul>
            </div>
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff3e0', borderRadius: '8px' }}>
                <h4>Configuration Options:</h4>
                <form>
                    <label>
                        <input type="checkbox" defaultChecked /> Enable Notifications
                    </label>
                    <br />
                    <label style={{ marginTop: '0.5rem', display: 'block' }}>
                        <input type="checkbox" defaultChecked /> Dark Mode
                    </label>
                    <br />
                    <label style={{ marginTop: '0.5rem', display: 'block' }}>
                        <input type="checkbox" /> Analytics Tracking
                    </label>
                </form>
            </div>
        </div>
    );
}
