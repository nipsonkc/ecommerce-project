import { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import FiltersSidebar from '../components/FiltersSidebar'
import Breadcrumbs from '../components/Breadcrumbs'

function useQuery() {
    const { search } = useLocation()
    return useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search])
}

/** Category listing with filters + search query support. */
export default function CategoryPage() {
    const { id } = useParams()
    const q = useQuery()
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState({ rating: '', min: '', max: '', brands: [] })

    useEffect(() => {
        (async () => {
            const list = await getProducts({
                category: id,
                query: q.q || '',
                brands: filters.brands,
                priceMin: filters.min === '' ? undefined : Number(filters.min),
                priceMax: filters.max === '' ? undefined : Number(filters.max),
                rating: filters.rating || undefined
            })
            setProducts(list)
        })()
    }, [id, q.q, filters])

    const brands = Array.from(new Set(products.map(p => p.brand)))

    return (
        <div className="container" style={{ paddingTop: 16 }}>
            <Breadcrumbs items={[
                { label: 'Home', to: '/' },
                { label: id.replace(/-/g, ' ') }
            ]} />

            <div className="sidebar-layout">
                <FiltersSidebar brands={brands} onChange={setFilters} initial={filters} />

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <h2 style={{ margin: 0 }}>{id.replace(/-/g, ' ').toUpperCase()}</h2>
                        {q.q ? <div className="tag">Search: “{q.q}”</div> : null}
                    </div>
                    {products.length === 0 ? (
                        <div className="notice">No products found. Try clearing filters.</div>
                    ) : (
                        <div className="grid cols-3">
                            {products.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
