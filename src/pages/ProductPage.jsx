import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/api'
import { formatPrice } from '../utils/format'
import RatingStars from '../components/RatingStars'
import Breadcrumbs from '../components/Breadcrumbs'
import { useCart } from '../context/CartContext'
import QuantitySelector from '../components/QuantitySelector'

/** Product detail: gallery, price, description, add-to-cart. */
export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [qty, setQty] = useState(1)
    const { add } = useCart()

    useEffect(() => { (async () => setProduct(await getProductById(id)))() }, [id])

    if (!product) return <div className="container" style={{ paddingTop: 16 }}>Loading...</div>

    return (
        <div className="container" style={{ paddingTop: 16 }}>
            <Breadcrumbs items={[
                { label: 'Home', to: '/' },
                { label: product.category, to: `/category/${product.category}` },
                { label: product.title }
            ]} />

            <div className="grid cols-2">
                <div className="card" style={{ padding: 12 }}>
                    <img src={product.images?.[0]} alt={product.title} />
                    <div className="muted" style={{ marginTop: 8 }}>Click to see full view</div>
                </div>

                <div className="card">
                    <div className="content">
                        <div className="tag">5.0</div>
                        <h1 style={{ margin: '8px 0 4px' }}>{product.title}</h1>
                        <div className="muted">{product.brand}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
                            <RatingStars value={product.rating} />
                            <span className="price">{formatPrice(product.price)}</span>
                        </div>
                        <p>{product.short}</p>
                        <div className="notice">
                            <strong>About this item</strong>
                            <p style={{ margin: '6px 0 0' }}>{product.description}</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                            <QuantitySelector value={qty} onChange={setQty} />
                            <button className="btn primary" onClick={() => add(product, qty)}>Add to Cart</button>
                            <button className="btn success" onClick={() => { add(product, qty); location.assign('/checkout') }}>Buy Now</button>
                        </div>
                        <div className="muted" style={{ marginTop: 8 }}>Only {product.stock} left in stock — order soon.</div>
                    </div>
                </div>
            </div>

            <h3 style={{ marginTop: 24 }}>Products related to this item</h3>
            {/* For brevity we just re-show this product */}
            <div className="grid cols-4">
                <div className="card" style={{ padding: 12 }}>
                    <img src={product.images?.[0]} alt={product.title} />
                    <div className="content">
                        <div className="price">{formatPrice(product.price)}</div>
                        <div className="muted">{product.title}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
