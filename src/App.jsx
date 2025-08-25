import { Link } from "react-router-dom";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";

/* minimal homepage catalog (4 tiles each) */
const CARDS = [
    {
        id: "electronics",
        name: "Electronics",
        tiles: [
            { name: "Mobiles", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
            { name: "Laptops", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400" },
            { name: "Audio", img: "https://images.unsplash.com/photo-1518441902113-c1d3b2f1b7e1?w=400" },
            { name: "TV", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400" },
        ],
    },
    {
        id: "home-living",
        name: "Home & Living",
        tiles: [
            { name: "Furniture", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400" },
            { name: "Décor", img: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=400" },
            { name: "Kitchen", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400" },
            { name: "Bedding", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400" },
        ],
    },
    {
        id: "beauty-health",
        name: "Beauty & Health",
        tiles: [
            { name: "Skincare", img: "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=400" },
            { name: "Haircare", img: "https://images.unsplash.com/photo-1512207856538-1b1ba516c9b1?w=400" },
            { name: "Makeup", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400" },
            { name: "Wellness", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400" },
        ],
    },
    {
        id: "groceries-food",
        name: "Groceries & Food",
        tiles: [
            { name: "Fresh Produce", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400" },
            { name: "Bakery", img: "https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?w=400" },
            { name: "Grains & Spices", img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400" },
            { name: "Beverages", img: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400" },
        ],
    },
    {
        id: "sports-outdoors",
        name: "Sports & Outdoors",
        tiles: [
            { name: "Fitness", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400" },
            { name: "Sports", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400" },
            { name: "Outdoor", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400" },
            { name: "Bottles", img: "https://images.unsplash.com/photo-1446844805183-9f5af45f89d5?w=400" },
        ],
    },
    {
        id: "automobile-tools",
        name: "Automobile & Tools",
        tiles: [
            { name: "Car Acc.", img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400" },
            { name: "Bike Acc.", img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400" },
            { name: "Tools", img: "https://images.unsplash.com/photo-1515920305566-327f6b0037a7?w=400" },
            { name: "Kits", img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=400" },
        ],
    },
];

function CategoryCard({ card }) {
    return (
        <div className="card panel">
            <div className="content">
                <h3 className="panel-title">{card.name}</h3>
                <div className="panel-grid">
                    {card.tiles.map((t, i) => (
                        <Link key={i} to={`/category/${card.id}`} className="panel-cell">
                            <div
                                className="panel-thumb"
                                style={{ backgroundImage: `url(${t.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
                            />
                            <div className="muted">{t.name}</div>
                        </Link>
                    ))}
                </div>
                <Link to={`/category/${card.id}`} className="panel-link">Explore</Link>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <>
            <Header />
            <main className="container" style={{ paddingTop: 16 }}>
                <HeroSlider />

                <section className="grid cols-3">
                    {CARDS.map((c) => <CategoryCard key={c.id} card={c} />)}
                </section>
            </main>

            <footer className="footer">
                <div className="container">© {new Date().getFullYear()} Nipson Shop</div>
            </footer>
        </>
    );
}
