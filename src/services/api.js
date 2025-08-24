/**
 * Mock API layer. In a real app, replace these with fetch/axios calls.
 * Uses localStorage for a persistent demo experience.
 */
import { PRODUCTS } from '../data/products'
import { CATEGORIES } from '../data/categories'

const LS = {
    CART: 'ec_cart',
    USER: 'ec_user',
    ORDERS: 'ec_orders'
}

export const getCategories = async () => CATEGORIES

export const getProducts = async ({ category, query, brands, priceMin, priceMax, rating } = {}) => {
    let list = [...PRODUCTS]
    if (category) list = list.filter(p => p.category === category)
    if (query) list = list.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    if (brands?.length) list = list.filter(p => brands.includes(p.brand))
    if (rating) list = list.filter(p => p.rating >= Number(rating))
    if (priceMin != null) list = list.filter(p => p.price >= Number(priceMin))
    if (priceMax != null) list = list.filter(p => p.price <= Number(priceMax))
    return list
}

export const getProductById = async (id) => PRODUCTS.find(p => p.id === id)

// --- CART (localStorage) ---
const readCart = () => JSON.parse(localStorage.getItem(LS.CART) || '[]')
const writeCart = (items) => localStorage.setItem(LS.CART, JSON.stringify(items))

export const getCart = async () => readCart()
export const addToCart = async (product, qty = 1) => {
    const cart = readCart()
    const existing = cart.find(i => i.product.id === product.id)
    if (existing) existing.qty += qty
    else cart.push({ product, qty })
    writeCart(cart)
    return cart
}
export const updateQty = async (productId, qty) => {
    const cart = readCart().map(i => i.product.id === productId ? { ...i, qty } : i)
    writeCart(cart)
    return cart
}
export const removeFromCart = async (productId) => {
    const cart = readCart().filter(i => i.product.id !== productId)
    writeCart(cart)
    return cart
}
export const clearCart = async () => writeCart([])

// --- AUTH (mock; do NOT use in production) ---
export const getUser = () => JSON.parse(localStorage.getItem(LS.USER) || 'null')
export const login = async ({ email, password }) => {
    // In production, verify against backend and set httpOnly cookie/JWT
    const user = { id: 'u1', name: email.split('@')[0], email }
    localStorage.setItem(LS.USER, JSON.stringify(user))
    return user
}
export const register = async ({ name, email, password }) => {
    const user = { id: 'u1', name, email }
    localStorage.setItem(LS.USER, JSON.stringify(user))
    return user
}
export const logout = async () => localStorage.removeItem(LS.USER)

// --- ORDERS ---
const readOrders = () => JSON.parse(localStorage.getItem(LS.ORDERS) || '[]')
const writeOrders = (orders) => localStorage.setItem(LS.ORDERS, JSON.stringify(orders))

export const placeOrder = async ({ items, address, shipping, payment }) => {
    const orderId = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
    const shippingFee = shipping?.fee ?? 0
    const tax = Math.round(total * 0.032 * 100) / 100 // mock 3.2% tax
    const grand = Math.round((total + shippingFee + tax) * 100) / 100

    const order = {
        id: orderId,
        items,
        address,
        shipping,
        payment: { brand: 'VISA', last4: '1243', ...payment },
        financials: { items: total, shipping: shippingFee, tax, total: grand },
        status: 'Processing',
        placedAt: new Date().toISOString()
    }
    const all = readOrders()
    all.unshift(order)
    writeOrders(all)
    await clearCart()
    return order
}

export const getOrdersForUser = async () => readOrders()
