import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* Add as many as you like — safe unsplash crops */
const SLIDES = [
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop", title: "Power up your setup", to: "/category/electronics" },
  { img: "https://images.unsplash.com/photo-1512446816042-444d641267d4?w=1600&auto=format&fit=crop", title: "Smart home deals", to: "/category/electronics" },
  { img: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=1600&auto=format&fit=crop", title: "Upgrade your home", to: "/category/home-living" },
  { img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&auto=format&fit=crop", title: "Cozy furniture picks", to: "/category/home-living" },
  { img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1600&auto=format&fit=crop", title: "Beauty & self‑care", to: "/category/beauty-health" },
  { img: "https://images.unsplash.com/photo-1512207856538-1b1ba516c9b1?w=1600&auto=format&fit=crop", title: "Haircare essentials", to: "/category/beauty-health" },
  { img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop", title: "Fresh groceries today", to: "/category/groceries-food" },
  { img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&auto=format&fit=crop", title: "Fitness & outdoors", to: "/category/sports-outdoors" },
  { img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&auto=format&fit=crop", title: "Music instruments", to: "/category/music" },
  { img: "https://images.unsplash.com/photo-1515920305566-327f6b0037a7?w=1600&auto=format&fit=crop", title: "Tools & hardware", to: "/category/automobile-tools" },
];

const INTERVAL_MS = 7000; // slower transition (7s)

export default function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const tRef = useRef(null);

  // (optional) preload next image for zero flicker
  useEffect(() => {
    const next = new Image();
    next.src = SLIDES[(idx + 1) % SLIDES.length].img;
  }, [idx]);

  useEffect(() => {
    start(); return stop;
  }, []);

  const start = () => {
    stop();
    tRef.current = setInterval(
      () => setIdx((v) => (v + 1) % SLIDES.length),
      INTERVAL_MS
    );
  };
  const stop = () => tRef.current && clearInterval(tRef.current);

  return (
    <div className="hero" onMouseEnter={stop} onMouseLeave={start}>
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`hero-slide ${i === idx ? "on" : ""}`}
          style={{ backgroundImage: `url(${s.img})` }}
          aria-hidden={i !== idx}
        >
          {i === idx && (
            <div className="hero-overlay">
              <h2 className="hero-title">{s.title}</h2>
              <Link className="btn primary" to={s.to}>Shop now</Link>
            </div>
          )}
        </div>
      ))}

      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={i === idx ? "on" : ""}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
