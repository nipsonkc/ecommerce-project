import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { placeOrder } from '../services/api'
import { formatPrice } from '../utils/format'

/** Secure checkout: address, shipping, payment, totals. */
export default function CheckoutPage() {
    const { items, subtotal } = useCart()
    const nav = useNavigate()
    const [address, setAddress] = useState({
        name: 'Nipson K C',
        street: '491 Main St APT B1',
        city: 'West Haven',
        state: 'CT',
        zip: '06516-2112',
        country: 'United States'
    })
    const [shipping, setShipping] = useState({ label: 'Standard', fee: 30.98, eta: 'Aug 4–Aug 6' })
    const [payment, setPayment] = useState({ method: 'card', card: 'Visa 1243' })
    const [placing, setPlacing] = useState(false)

    useEffect(() => {
        if (items.length === 0) {
            // no items → redirect away to avoid broken state
            setTimeout(() => nav('/'), 0)
        }
    }, [items, nav])

    const tax = Math.round(subtotal * 0.032 * 100) / 100
    const total = Math.round((subtotal + shipping.fee + tax) * 100) / 100

    const submit = async () => {
        setPlacing(true)
        try {
            const order = await placeOrder({ items, address, shipping, payment })
            nav('/order-confirmation', { state: { order } })
        } finally {
            setPlacing(false)
        }
    }

    return (
        <div className="container" style={{ paddingTop: 16 }}>
            <h1>Secure Checkout</h1>
            <div className="grid cols-2">
                <div className="card">
                    <div className="content">
                        <h3>Delivery</h3>
                        <div className="form-grid">
                            <div className="input"><label>Name</label><input value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} /></div>
                            <div className="input"><label>Street</label><input className="full" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} /></div>
                            <div className="input"><label>City</label><input value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} /></div>
                            <div className="input"><label>State</label><input value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} /></div>
                            <div className="input"><label>ZIP</label><input value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })} /></div>
                            <div className="input full"><label>Country</label><input value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} /></div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="content">
                        <h3>Shipping</h3>
                        <label className="tag">
                            <input type="radio" name="ship" checked={shipping.label === 'Standard'} onChange={() => setShipping({ label: 'Standard', fee: 30.98, eta: 'Aug 4–Aug 6' })} />
                            Standard — {formatPrice(30.98)} — arrives {shipping.label === 'Standard' ? shipping.eta : 'Aug 4–Aug 6'}
                        </label>
                        <label className="tag" style={{ marginLeft: 8 }}>
                            <input type="radio" name="ship" checked={shipping.label === 'Free'} onChange={() => setShipping({ label: 'Free', fee: 0, eta: 'Aug 6–Aug 8' })} />
                            Saver — FREE — arrives Aug 6–Aug 8
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid cols-2" style={{ marginTop: 16 }}>
                <div className="card">
                    <div className="content">
                        <h3>Payment</h3>
                        <div className="grid">
                            <label className="tag">
                                <input type="radio" name="pay" checked={payment.method === 'card'} onChange={() => setPayment({ method: 'card', card: 'Visa 1243' })} />
                                Paying with Visa 1243
                            </label>
                            <label className="tag">
                                <input type="radio" name="pay" checked={payment.method === 'cod'} onChange={() => setPayment({ method: 'cod' })} />
                                Cash on Delivery
                            </label>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="content">
                        <h3>Order Summary</h3>
                        <div className="grid" style={{ gridTemplateColumns: '1fr auto' }}>
                            <div>Items</div><div>{formatPrice(subtotal)}</div>
                            <div>Shipping & handling</div><div>{shipping.fee === 0 ? 'FREE' : formatPrice(shipping.fee)}</div>
                            <div>Estimated tax</div><div>{formatPrice(tax)}</div>
                            <div><strong>Order total</strong></div><div><strong>{formatPrice(total)}</strong></div>
                        </div>
                        <button className="btn primary block" style={{ marginTop: 12 }} onClick={submit} disabled={placing}>
                            {placing ? 'Placing Order...' : 'Place your order'}
                        </button>
                        <div className="muted" style={{ marginTop: 8 }}>
                            By placing your order, you agree to our <a href="#">privacy notice</a> and <a href="#">conditions of use</a>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
