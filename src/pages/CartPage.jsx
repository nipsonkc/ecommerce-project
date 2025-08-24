import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'

/** Cart: list items, change qty, remove, summary with CTA to checkout. */
export default function CartPage() {
    const { items, remove, setQty, subtotal } = useCart()
    const shippingFee = 0

    return (
        <div className="container" style={{ paddingTop: 16 }}>
            <h1>Shopping Cart</h1>
            {items.length === 0 ? (
                <div className="notice">Your cart is empty. <Link to="/">Continue shopping</Link></div>
            ) : (
                <div className="grid cols-2">
                    <div className="card">
                        <table className="table">
                            <thead>
                                <tr><th>Item</th><th>Qty</th><th>Price</th><th></th></tr>
                            </thead>
                            <tbody>
                                {items.map(({ product, qty }) => (
                                    <tr key={product.id}>
                                        <td>
                                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                                <img src={product.images?.[0]} alt={product.title} style={{ width: 80, borderRadius: 8 }} />
                                                <div>
                                                    <div><Link to={`/product/${product.id}`}>{product.title}</Link></div>
                                                    <div className="muted">Shipped from: Nipson Music</div>
                                                    <div className="muted">Only {product.stock} left in stock — order soon.</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <select value={qty} onChange={e => setQty(product.id, Number(e.target.value))}>
                                                {Array.from({ length: 10 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                                            </select>
                                        </td>
                                        <td>{formatPrice(product.price * qty)}</td>
                                        <td><button className="btn danger" onClick={() => remove(product.id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card">
                        <div className="content">
                            <h3>Order Summary</h3>
                            <div className="grid" style={{ gridTemplateColumns: '1fr auto' }}>
                                <div>Items</div><div>{formatPrice(subtotal)}</div>
                                <div>Shipping</div><div>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</div>
                                <div><strong>Subtotal</strong></div><div><strong>{formatPrice(subtotal + shippingFee)}</strong></div>
                            </div>
                            <Link to="/checkout" className="btn primary block" style={{ marginTop: 12 }}>Proceed to Checkout</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
