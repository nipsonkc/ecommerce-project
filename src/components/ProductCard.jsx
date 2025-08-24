import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import RatingStars from './RatingStars'
import { formatPrice } from '../utils/format'

/** Small product card used in lists. */
export default function ProductCard({ product }) {
    return (
        <div className="card">
            <Link to={`/product/${product.id}`}>
                <img src={product.images?.[0]} alt={product.title} />
            </Link>
            <div className="content">
                <Link to={`/product/${product.id}`}><h3 style={{ margin: '6px 0 8px' }}>{product.title}</h3></Link>
                <div className="muted">{product.brand}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                    <span className="price">{formatPrice(product.price)}</span>
                    <RatingStars value={product.rating} />
                </div>
            </div>
        </div>
    )
}
ProductCard.propTypes = { product: PropTypes.object.isRequired }
