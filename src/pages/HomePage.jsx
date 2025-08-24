import { useEffect, useState } from 'react'
import { getCategories, getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

/** Home: category shortcuts + trending products. */
export default function HomePage() {
    const [cats, setCats] = useState([])
    const [trending, setTrending] = useState([])

    useEffect(() => {
        (async () => {
            const c = await getCategories()
            setCats(c)
            const t = await getProducts({})
            setTrending(t.slice(0, 6))
        })()
    }, [])

    return (
        <div className="container" style={{ paddingTop: 16 }}>
            <section className="grid cols-4">
                {cats.slice(0, 8).map(c => (
                    <Link key={c.id} to={`/category/${c.id}`} className="card" style={{ padding: 16 }}>
                        <h3 style={{ margin: 0 }}>{c.name}</h3>
                        <p className="muted">Explore</p>
                    </Link>
                ))}
            </section>

            <h2 style={{ marginTop: 24 }}>Trending</h2>
            <section className="grid cols-4">
                {trending.map(p => <ProductCard key={p.id} product={p} />)}
            </section>
        </div>
    )
}
