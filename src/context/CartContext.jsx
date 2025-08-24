import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { addToCart, getCart, removeFromCart, updateQty } from '../services/api'

const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)

/** Global cart state with helpers. */
export default function CartProvider({ children }) {
    const [items, setItems] = useState([])

    useEffect(() => { (async () => setItems(await getCart()))() }, [])

    const add = async (product, qty = 1) => setItems(await addToCart(product, qty))
    const remove = async (productId) => setItems(await removeFromCart(productId))
    const setQty = async (productId, qty) => setItems(await updateQty(productId, qty))

    const count = items.reduce((sum, i) => sum + i.qty, 0)
    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

    return (
        <CartContext.Provider value={{ items, add, remove, setQty, count, subtotal }}>
            {children}
        </CartContext.Provider>
    )
}
CartProvider.propTypes = { children: PropTypes.node }
