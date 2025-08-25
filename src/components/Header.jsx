import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <div className="container header-row">
                {/* Brand */}
                <Link
                    to="/"
                    className="brand"
                    style={{ color: "#e5e7eb", textDecoration: "none" }}
                >
                    <strong>Nipson Shop</strong>
                </Link>

                {/* Search — longer and centered */}
                <form
                    className="search"
                    style={{ flex: "1 1 auto", maxWidth: "750px", margin: "0 auto" }}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input placeholder="Search products…" />
                    <button type="submit">Search</button>
                </form>

                {/* Quick actions */}
                <div style={{ display: "flex", gap: 8 }}>
                    <Link to="/orders" className="btn">Your Orders</Link>
                    <Link to="/login" className="btn">Login</Link>
                    <Link to="/cart" className="btn success">Cart (0)</Link>
                </div>
            </div>

            {/* Top nav */}
            <nav className="container nav">
                {[
                    { id: "men", label: "Men" },
                    { id: "women", label: "Women" },
                    { id: "kids-baby", label: "Kids & Baby" },
                    { id: "electronics", label: "Electronics" },
                    { id: "home-living", label: "Home & Living" },
                    { id: "beauty-health", label: "Beauty & Health" },
                    { id: "groceries-food", label: "Groceries & Food" },
                    { id: "sports-outdoors", label: "Sports & Outdoors" },
                    { id: "automobile-tools", label: "Automobile & Tools" },
                    { id: "pet-supplies", label: "Pet Supplies" },
                ].map((c) => (
                    <Link key={c.id} to={`/category/${c.id}`}>
                        {c.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
