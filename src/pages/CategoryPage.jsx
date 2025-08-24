import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { getProducts, getCategoryById } from '../services/api'
import { CATALOG } from '../data/catalog'
import ProductCard from '../components/ProductCard'

export default function CategoryPage() {
    const { id } = useParams()
    const [params, setParams] = useSearchParams()
    const selectedSub = params.get('sub') || ''
    const [items, setItems] = useState([])
    const category = getCategoryById(id)

    const subs = useMemo(() => (CATALOG[id]?.subcats || []), [id])

    useEffect(() => {
        (async () => {
            const list = await getProducts({ categoryId: id, subcategoryId: selectedSub || undefined })
            setItems(list)
        })()
    }, [id, selectedSub])

    return (
        <div className="container" style={{ paddingTop: 16 }}>
            <div className="breadcrumbs">
                <Link to="/">Home</Link> › <span>{category?.name}</span>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                <button className={`tag ${!selectedSub ? 'active' : ''}`} onClick={() => { params.delete('sub'); setParams(params) }}>All</button>
                {subs.map(s => (
                    <button key={s.id}
                        className={`tag ${selectedSub === s.id ? 'active' : ''}`}
                        onClick={() => { params.set('sub', s.id); setParams(params) }}
                        title={s.name}>
                        <span style={{
                            display: 'inline-flex', width: 18, height: 18, borderRadius: 6, backgroundSize: 'cover',
                            backgroundImage: `url(${s.image})`, marginRight: 6
                        }} />
                        {s.name}
                    </button>
                ))}
            </div>

            <section className="grid cols-4">
                {items.map(p => <ProductCard key={p.id} product={p} />)}
            </section>
        </div>
    )
}
