import { CATEGORIES } from '../data/categories'
import { PRODUCTS } from '../data/products'

export async function getCategories() {
    return CATEGORIES
}
export function getCategoryById(id) {
    return CATEGORIES.find(c => c.id === id)
}
export async function getProducts({ categoryId, subcategoryId } = {}) {
    let list = [...PRODUCTS]
    if (categoryId) list = list.filter(p => p.categoryId === categoryId)
    if (subcategoryId) list = list.filter(p => p.subcategoryId === subcategoryId)
    return list
}
export async function getProductById(id) {
    return PRODUCTS.find(p => p.id === id)
}
