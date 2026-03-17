import React, { useState, useRef, useCallback } from 'react';

/**
 * Debounce: Wait until action stops for X ms before firing
 * Use case: Search input, resize events
 */
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

/**
 * Throttle: Fire at most once every X ms
 * Use case: Scroll events, mouse move
 */
const throttle = (func, wait) => {
    let timeout;
    return (...args) => {
        if (!timeout) {
            func(...args);
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
        }
    };
};

export default function DebouncingThrottling() {
    const [searchTerm, setSearchTerm] = useState('');
    const [scrollY, setScrollY] = useState(0);
    const [searchResults, setSearchResults] = useState(0);

    // Debounced search - waits 500ms after user stops typing
    const debouncedSearch = useRef(
        debounce((term) => {
            if (term.length > 0) {
                console.log('Searching for:', term);
                // Simulate API call
                setSearchResults(Math.floor(Math.random() * 100));
            }
        }, 500)
    ).current;

    // Throttled scroll - fires at most once every 200ms
    const throttledScroll = useRef(
        throttle(() => {
            console.log('Scroll event:', window.scrollY);
            setScrollY(window.scrollY);
        }, 200)
    ).current;

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', throttledScroll);
        return () => window.removeEventListener('scroll', throttledScroll);
    }, [throttledScroll]);

    return (
        <div>
            <h2>Debouncing & Throttling</h2>

            <div style={{ marginBottom: '20px' }}>
                <h3>Debounce Example - Search Input</h3>
                <input
                    type="text"
                    placeholder="Type to search (debounced)..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ padding: '10px', width: '100%', fontSize: '16px' }}
                />
                <p>Results: {searchResults} (search fires 500ms after you stop typing)</p>
            </div>

            <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f0f0f0' }}>
                <h3>Throttle Example - Scroll Events</h3>
                <p>Scroll position (updates at most every 200ms): {scrollY}px</p>
                <p>Check console to see how often scroll events fire vs are processed</p>
            </div>

            <div style={{ height: '2000px', marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9' }}>
                <h3>Scroll down to see throttled scroll events</h3>
                <p>This is tall content. Scroll down and watch the scroll Y value update at throttled intervals.</p>
            </div>
        </div>
    );
}
