import { useEffect, useState } from 'react'
import { getOrdersForUser } from '../services/api'
import { formatPrice } from '../utils/format'

/** Lists past orders for the (mock) logged-in user. */
export default function OrdersPage() {
    const [orders, setOrders] = useState([])

    useEffect(() => { (async () => setOrders(await getOrdersForUser()))() }, [])

    return (
        <div className="container" style={{ paddingTop: 16 }}>
            <h1>Your Orders</h1>
            <div className="grid">
                <div className="card">
                    <div className="content">
                        {orders.length === 0 ? (
                            <div className="notice">No orders yet.</div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Order</th><th>Placed</th><th>Total</th><th>Status</th><th>Items</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(o => (
                                        <tr key={o.id}>
                                            <td>{o.id}</td>
                                            <td>{new Date(o.placedAt).toLocaleString()}</td>
                                            <td>{formatPrice(o.financials.total)}</td>
                                            <td>{o.status}</td>
                                            <td>{o.items.map(i => i.product.title).join(', ')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
