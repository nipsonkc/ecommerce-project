import PropTypes from 'prop-types'

/** Small +/- control for quantity. */
export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
    return (
        <div className="qty" role="group" aria-label="quantity selector">
            <button onClick={() => onChange(Math.max(min, value - 1))} aria-label="decrease">-</button>
            <span>{value}</span>
            <button onClick={() => onChange(Math.min(max, value + 1))} aria-label="increase">+</button>
        </div>
    )
}
QuantitySelector.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number
}
