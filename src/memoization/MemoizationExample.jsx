import React, { useMemo, useCallback, memo } from 'react';

// Expensive computation
const expensiveSort = (items) => {
    console.log('Sorting items...');
    return [...items].sort((a, b) => a - b);
};

// Memoized child component - prevents re-render if props unchanged
const SortedList = memo(({ items }) => {
    console.log('SortedList rendering');
    return (
        <ul>
            {items.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
    );
});

export default function MemoizationExample() {
    const [items, setItems] = React.useState([3, 1, 4, 1, 5, 9]);
    const [count, setCount] = React.useState(0);

    // useMemo: Cache expensive computation
    const sortedItems = useMemo(() => {
        return expensiveSort(items);
    }, [items]);

    // useCallback: Memoize callback to avoid recreating on every render
    const handleAddItem = useCallback(() => {
        setItems(prev => [...prev, Math.floor(Math.random() * 10)]);
    }, []);

    return (
        <div>
            <h2>Memoization Example</h2>
            <p>Count (click to re-render): {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <button onClick={handleAddItem}>Add Item</button>

            <h3>Sorted Items (only re-sorts when items array changes)</h3>
            <SortedList items={sortedItems} />
        </div>
    );
}
