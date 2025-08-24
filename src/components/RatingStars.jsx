import PropTypes from 'prop-types'

/** Simple star display: five characters colored. */
export default function RatingStars({ value = 0 }) {
    const stars = [1, 2, 3, 4, 5].map(i => (i <= value ? '★' : '☆'))
    return <div aria-label={`rating ${value} out of 5`} style={{ color: '#fbbf24' }}>{stars.join(' ')}</div>
}
RatingStars.propTypes = { value: PropTypes.number }
