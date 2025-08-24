import { useLocation, Link } from 'react-router-dom'
import { formatPrice } from '../utils/format'

/** Shows key order info after successful checkout. */
export default function OrderConfirmationPage() {
    const { state } = useLocation()
    const order = state?.order

    if (!order) return (
        <div className="container" style={{ paddingTop: 16 }}>
            <div className="notice">No order data found.</div>
            <Link to="/orders" className="btn">Go to Orders</Link>
        </div>
    )

    return (
        <div className="container" style={{ paddingTop: 16 }}>
            <h1>Order placed, thanks!</h1>
            <p className="muted">Confirmation sent to your email.</p>
            <div className="card">
                <div className="content">
                    <div className="grid" style={{ gridTemplateColumns: '1fr auto' }}>
                        <div>Order ID</div><div>{order.id}</div>
                        <div>Shipping to</div><div>{order.address.name}, {order.address.street}, {order.address.city}, {order.address.state}</div>
                        <div>Estimated delivery</div><div>{order.shipping.eta || 'Sunday, Aug 3'}</div>
                        <div>Total</div><div>{formatPrice(order.financials.total)}</div>
                    </div>
                    <Link to="/orders" className="btn primary" style={{ marginTop: 12 }}>View your order</Link>
                </div>
            </div>
        </div>
    )
}
