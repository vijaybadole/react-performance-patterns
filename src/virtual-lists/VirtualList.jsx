import React, { useState, useRef, useCallback } from 'react';

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 10;

export default function VirtualList({ items = Array.from({ length: 10000 }, (_, i) => i) }) {
    const containerRef = useRef(null);
    const [scrollTop, setScrollTop] = useState(0);

    // Calculate visible range
    const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    const endIndex = startIndex + VISIBLE_ITEMS;
    const visibleItems = items.slice(startIndex, endIndex);
    const offsetY = startIndex * ITEM_HEIGHT;

    const handleScroll = useCallback((e) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, []);

    return (
        <div className="virtual-list-container">
            <h2>Virtual List - 10,000 Items</h2>
            <div
                ref={containerRef}
                onScroll={handleScroll}
                style={{
                    height: VISIBLE_ITEMS * ITEM_HEIGHT,
                    overflow: 'auto',
                    border: '1px solid #ccc',
                }}
            >
                <div style={{ height: items.length * ITEM_HEIGHT, position: 'relative' }}>
                    <div style={{ transform: `translateY(${offsetY}px)` }}>
                        {visibleItems.map((item, idx) => (
                            <div
                                key={startIndex + idx}
                                style={{
                                    height: ITEM_HEIGHT,
                                    padding: '10px',
                                    borderBottom: '1px solid #eee',
                                    backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff',
                                }}
                            >
                                Item {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <p>Showing items {startIndex + 1}-{endIndex} of {items.length}</p>
        </div>
    );
}
