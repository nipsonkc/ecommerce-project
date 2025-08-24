/** Currency + misc format helpers live here to avoid duplication across components. */
export const formatPrice = (num) => {
    try {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    } catch {
        return `$${Number(num).toFixed(2)}`;
    }
}

export const slugify = (str = '') =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const range = (n) => Array.from({ length: n }, (_, i) => i);
