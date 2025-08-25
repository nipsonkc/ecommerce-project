import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Band({ title, items }) {
    const [x, setX] = useState(0);
    const viewRef = useRef(null);
    const timer = useRef(null);
    const CARD_W = 180, GAP = 16, STEP = CARD_W + GAP;

    const max = Math.max(0, items.length * STEP - (viewRef.current?.offsetWidth || 0));

    useEffect(() => { start(); return stop; }, [max, items.length]);
    const start = () => { stop(); timer.current = setInterval(() => setX(v => (v + STEP > max ? 0 : v + STEP)), 3500); };
    const stop = () => timer.current && clearInterval(timer.current);

    return (
        <section className="band card" onMouseEnter={stop} onMouseLeave={start}>
            <div className="content">
                <h3 className="band-title">{title}</h3>
                <div className="trend-wrap">
                    <button className="trend-arrow" onClick={() => setX(v => Math.max(0, v - STEP))}>‹</button>
                    <div className="trend-viewport" ref={viewRef}>
                        <div className="trend-track" style={{ transform: `translateX(-${x}px)` }}>
                            {items.map((p, i) => (
                                <Link key={i} to={p.to || "#"} className="trend-card" title={p.name}>
                                    <div className="trend-thumb" style={{ backgroundImage: `url(${p.img})` }} />
                                    <div style={{ marginTop: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <button className="trend-arrow" onClick={() => setX(v => Math.min(max, v + STEP))}>›</button>
                </div>
            </div>
        </section>
    );
}
