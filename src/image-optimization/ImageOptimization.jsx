import React, { useEffect, useRef, useState } from 'react';

export default function ImageOptimization() {
    const [images, setImages] = useState([]);
    const observerRef = useRef(null);

    useEffect(() => {
        // Simulate lazy loading images with Intersection Observer
        const imageElements = document.querySelectorAll('[data-src]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');

                    // Load the image
                    img.src = src;
                    img.removeAttribute('data-src');

                    // Stop observing this image
                    observer.unobserve(img);
                    console.log('Image loaded:', src);
                }
            });
        }, { rootMargin: '50px' });

        imageElements.forEach((img) => observer.observe(img));
        observerRef.current = observer;

        return () => observer.disconnect();
    }, []);

    const sampleImages = [
        'https://via.placeholder.com/400x300?text=Image+1',
        'https://via.placeholder.com/400x300?text=Image+2',
        'https://via.placeholder.com/400x300?text=Image+3',
        'https://via.placeholder.com/400x300?text=Image+4',
    ];

    return (
        <div>
            <h2>Image Optimization - Lazy Loading</h2>
            <p>Scroll down to trigger lazy loading. Images only load when near viewport.</p>

            <div style={{ marginTop: '200px' }}>
                {sampleImages.map((url, idx) => (
                    <div
                        key={idx}
                        style={{
                            marginBottom: '300px',
                            padding: '20px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '8px',
                        }}
                    >
                        <p>Image {idx + 1}</p>
                        <img
                            data-src={url}
                            alt={`Lazy loaded image ${idx + 1}`}
                            style={{
                                width: '100%',
                                maxWidth: '400px',
                                backgroundColor: '#e0e0e0',
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
