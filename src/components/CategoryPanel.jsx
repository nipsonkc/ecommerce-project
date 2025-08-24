import { Link } from "react-router-dom";
import { CATALOG } from "../data/catalog";

/** Panel with 2×2 image tiles of subcategories + "Link" CTA */
export default function CategoryPanel({ category }) {
    const subs = (CATALOG[category.id]?.subcats || []).slice(0, 4);
    return (
        <div className="panel card">
            <div className="content">
                <h3 className="panel-title">{category.name}</h3>
                <div className="panel-grid">
                    {subs.map((s) => (
                        <Link key={s.id}
                            to={`/category/${category.id}?sub=${s.id}`}
                            className="panel-cell"
                            title={s.name}>
                            <div className="panel-thumb"
                                style={{ backgroundImage: `url(${s.image})` }} />
                            <div className="muted">{s.name}</div>
                        </Link>
                    ))}
                </div>
                <Link to={`/category/${category.id}`} className="panel-link">Explore</Link>
            </div>
        </div>
    );
}
