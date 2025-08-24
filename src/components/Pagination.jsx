import PropTypes from 'prop-types'

/** Simple page buttons control (not wired in demo, included for extension). */
export default function Pagination({ page, total, perPage, onChange }) {
    const pages = Math.max(1, Math.ceil(total / perPage))
    if (pages <= 1) return null
    const btn = (p, label = String(p)) => (
        <button key={p} className={'btn ' + (p === page ? 'primary' : '')} onClick={() => onChange(p)}>{label}</button>
    )
    const items = []
    items.push(btn(Math.max(1, page - 1), 'Prev'))
    for (let i = 1; i <= pages; i++) items.push(btn(i))
    items.push(btn(Math.min(pages, page + 1), 'Next'))
    return <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>{items}</div>
}
Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}
