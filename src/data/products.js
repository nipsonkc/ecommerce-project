// Minimal product seed data for demo. In production, fetch these from your API.
export const PRODUCTS = [
    {
        id: 'gibson-les-paul',
        title: 'Gibson Les Paul Guitar',
        brand: 'Gibson',
        category: 'music',
        price: 313,
        rating: 5,
        stock: 4,
        images: [
            'https://images.unsplash.com/photo-1513105737059-ff0cf0580b16?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop'
        ],
        short: 'Premium tonewoods, mahogany body, and spruce top for a balanced tone.',
        description: `PREMIUM TONEWOODS: The Full-Size acoustic electric guitar is crafted with a Sitka spruce top, mahogany body,
    and purpleheart wood bridge, delivering a balanced and resonant tone with clear projection. The spruce top provides bright and clear sound,
    while the mahogany body adds warmth and depth.`
    },
    {
        id: 'fender-strat',
        title: 'Fender Squier Debut Series Stratocaster',
        brand: 'Fender',
        category: 'music',
        price: 250,
        rating: 5,
        stock: 12,
        images: [
            'https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=1200&auto=format&fit=crop'
        ],
        short: 'Classic Strat tones and playability for all levels.',
        description: 'A lightweight, comfortable body with three single-coil pickups for versatile tones.'
    },
    {
        id: 'flying-v',
        title: 'Flying-V Guitar',
        brand: 'Dreammaker',
        category: 'music',
        price: 230,
        rating: 5,
        stock: 7,
        images: [
            'https://images.unsplash.com/photo-1454923634634-bd1614719a7b?q=80&w=1200&auto=format&fit=crop'
        ],
        short: 'Iconic shape with modern hardware for high-gain styles.',
        description: 'Built for speed and sustain, perfect for metal and hard rock.'
    },
    {
        id: 'sports-dumbbells',
        title: 'Adjustable Dumbbells (Pair)',
        brand: 'ProFit',
        category: 'sports-outdoors',
        price: 199,
        rating: 4,
        stock: 20,
        images: [
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop'
        ],
        short: 'Space-saving adjustable dumbbells up to 50 lbs each.',
        description: 'Quick-change mechanism with secure lock — switch weights in seconds.'
    }
];
