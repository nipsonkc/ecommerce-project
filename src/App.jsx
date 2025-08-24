import HeroSlider from "./components/HeroSlider";

export default function App() {
    return (
        <>
            <header className="header">
                <div className="container header-row">
                    <strong className="brand" style={{ color: "#e5e7eb" }}>Nipson Shop</strong>
                </div>
            </header>

            <main className="container" style={{ paddingTop: 16 }}>
                <HeroSlider />

                <section className="grid cols-3">
                    {[
                        "Electronics", "Home & Living", "Beauty & Health",
                        "Groceries & Food", "Sports & Outdoors", "Automobile & Tools",
                    ].map((name, i) => (
                        <div key={i} className="card panel">
                            <div className="content">
                                <h3 className="panel-title">{name}</h3>
                                <div className="panel-grid">
                                    {[1, 2, 3, 4].map(n => (
                                        <div key={n} className="panel-cell">
                                            <div className="panel-thumb" />
                                            <div className="muted">Item</div>
                                        </div>
                                    ))}
                                </div>
                                <a className="panel-link" href="#">Explore</a>
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            <footer className="footer">
                <div className="container">© {new Date().getFullYear()} Nipson Shop</div>
            </footer>
        </>
    );
}
