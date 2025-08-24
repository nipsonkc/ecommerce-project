import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

/** Basic "Home / Category / Product" trail. */
export default function Breadcrumbs({ items }) {
    return (
        <div className="breadcrumbs">
            {items.map((it, idx) => (
                <span key={idx}>
                    {it.to ? <Link to={it.to}>{it.label}</Link> : <span>{it.label}</span>}
                    {idx < items.length - 1 ? ' / ' : ''}
                </span>
            ))}
        </div>
    )
}
Breadcrumbs.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        to: PropTypes.string
    })).isRequired
}
