import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format";

export default function TrendingSlider({ items }) {
    const [x, setX] = useState(0);
    const viewRef = useRef(null);
    const timer = useRef(null);

    const CARD_W = 220;
    const GAP = 16;
    const STEP = CARD_W + GAP;

    const max = Math.max(0, (items.length * STEP) - (viewRef.current?.offsetWidth || 0));

    // autoplay
    useEffect(() => {
        start(); return stop;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, max]);

    const start = () => {
        stop();
        timer.current = setInterval(() => {
            setX(v => (v + STEP > max ? 0 : v + STEP));
        }, 3000);
    };
    const stop = () => timer.current && clearInterval(timer.current);

    return (
        <div className="panel card" onMouseEnter={stop} onMouseLeave={start}>
            <div className="content">
                <h3 className="panel-title">Trending</h3>
                <div className="trend-wrap">
                    <button className="trend-arrow" onClick={() => setX(v => Math.max(0, v - STEP))} aria-label="prev">‹</button>
                    <div className="trend-viewport" ref={viewRef}>
                        <div className="trend-track" style={{ transform: `translateX(-${x}px)` }}>
                            {items.map(p => (
                                <Link key={p.id} to={`/product/${p.id}`} className="trend-card" title={p.title}>
                                    <div className="trend-thumb" style={{ backgroundImage: `url(${p.images?.[0]})` }} />
                                    <div style={{ marginTop: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                                    <div className="price">{formatPrice(p.price)}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <button className="trend-arrow" onClick={() => setX(v => Math.min(max, v + STEP))} aria-label="next">›</button>
                </div>
            </div>
        </div>
    );
}
