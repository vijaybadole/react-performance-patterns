import React, { Suspense, lazy } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
const Analytics = lazy(() => import('./Analytics'));

// Loading fallback component
const LoadingFallback = () => <div className="spinner">Loading...</div>;

export default function LazyRoute() {
    const [currentPage, setCurrentPage] = React.useState('dashboard');

    return (
        <div>
            <nav>
                <button onClick={() => setCurrentPage('dashboard')}>Dashboard</button>
                <button onClick={() => setCurrentPage('settings')}>Settings</button>
                <button onClick={() => setCurrentPage('analytics')}>Analytics</button>
            </nav>

            <Suspense fallback={<LoadingFallback />}>
                {currentPage === 'dashboard' && <Dashboard />}
                {currentPage === 'settings' && <Settings />}
                {currentPage === 'analytics' && <Analytics />}
            </Suspense>
        </div>
    );
}
