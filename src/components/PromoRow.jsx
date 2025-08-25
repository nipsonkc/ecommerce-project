import { Link } from "react-router-dom";

const PROMOS = [
    {
        title: "Discover pre‑loved designer jewelry",
        tiles: [
            { name: "Cartier", img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400" },
            { name: "Van Cleef", img: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400" },
            { name: "Hermès", img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400" },
            { name: "Chanel", img: "https://images.unsplash.com/photo-1556229174-5b9d4d0a3d21?w=400" },
        ],
        to: "/category/women",
    },
    {
        title: "Save 15% on designer handbags",
        tiles: [
            { name: "Louis Vuitton", img: "https://images.unsplash.com/photo-1593032457861-ec3b6a2f9a2f?w=400" },
            { name: "Hermès", img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400" },
            { name: "Dior", img: "https://images.unsplash.com/photo-1600180758890-6b94519a8b1c?w=400" },
            { name: "Saint Laurent", img: "https://images.unsplash.com/photo-1556306535-abccbcd2c6e2?w=400" },
        ],
        to: "/category/women",
    },
    {
        title: "Trending: Fall Beauty",
        tiles: [
            { name: "Velvet skin", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400" },
            { name: "Healthy hair", img: "https://images.unsplash.com/photo-1512207856538-1b1ba516c9b1?w=400" },
            { name: "Glow kit", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400" },
            { name: "Makeup minis", img: "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=400" },
        ],
        to: "/category/beauty-health",
    },
    {
        title: "Sign in for the best experience",
        cta: { label: "Sign in securely", to: "/login" },
    },
];

export default function PromoRow() {
    return (
        <div className="promo-row">
            {PROMOS.map((p, i) => (
                <div key={i} className="promo-card card">
                    <div className="content">
                        <h3 className="promo-title">{p.title}</h3>

                        {p.tiles ? (
                            <div className="promo-grid">
                                {p.tiles.map((t, j) => (
                                    <Link key={j} to={p.to} className="promo-item" title={t.name}>
                                        <img src={t.img} alt={t.name} />
                                        <div className="muted">{t.name}</div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <Link className="btn primary" to={p.cta.to} style={{ marginTop: 10 }}>
                                {p.cta.label}
                            </Link>
                        )}

                        {p.tiles && (
                            <Link to={p.to} className="panel-link" style={{ marginTop: 10, display: "inline-block" }}>
                                Shop more
                            </Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
