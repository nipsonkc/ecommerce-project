import { Link } from "react-router-dom";

/** Minimal hero: always renders a single image + CTA. */
export default function HeroSlider() {
    const slide = {
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop",
        title: "Power up your setup",
        to: "/category/electronics",
    };

    return (
        <div
            style={{
                position: "relative",
                height: 340,
                borderRadius: 16,
                overflow: "hidden",
                marginBottom: 16,
                background: "#0b111f",
            }}
            aria-label="homepage hero"
        >
            <img
                src={slide.img}
                alt={slide.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { e.currentTarget.remove(); }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,.35), rgba(11,17,31,.9))",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: 20,
                }}
            >
                <div>
                    <h2 style={{ margin: "0 0 8px", fontSize: 28 }}>{slide.title}</h2>
                    <Link className="btn primary" to={slide.to}>Shop Electronics</Link>
                </div>
            </div>
        </div>
    );
}
