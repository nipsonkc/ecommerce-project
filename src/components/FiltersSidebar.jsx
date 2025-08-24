import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

/** Rating + price + brand filters. Notifies parent via onChange when state changes. */
export default function FiltersSidebar({ brands, onChange, initial }) {
    const [state, setState] = useState({
        rating: initial?.rating || '',
        min: initial?.min || '',
        max: initial?.max || '',
        brands: initial?.brands || []
    })

    useEffect(() => { onChange?.(state) }, [state]) // notify parent

    const toggleBrand = (b) => {
        setState(s => ({
            ...s,
            brands: s.brands.includes(b) ? s.brands.filter(x => x !== b) : [...s.brands, b]
        }))
    }

    return (
        <aside className="sidebar">
            <fieldset className="fieldset">
                <legend>Rating</legend>
                {[5, 4, 3, 2, 1].map(r => (
                    <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                            type="radio"
                            name="rating"
                            value={r}
                            checked={String(state.rating) === String(r)}
                            onChange={(e) => setState(s => ({ ...s, rating: Number(e.target.value) }))}
                        /> And up ({r}+)
                    </label>
                ))}
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                        type="radio"
                        name="rating"
                        value=""
                        checked={state.rating === ''}
                        onChange={() => setState(s => ({ ...s, rating: '' }))}
                    /> Any
                </label>
            </fieldset>

            <fieldset className="fieldset">
                <legend>Price</legend>
                <div className="form-grid">
                    <div className="input">
                        <label htmlFor="min">Min</label>
                        <input id="min" type="number" value={state.min} onChange={e => setState(s => ({ ...s, min: e.target.value }))} />
                    </div>
                    <div className="input">
                        <label htmlFor="max">Max</label>
                        <input id="max" type="number" value={state.max} onChange={e => setState(s => ({ ...s, max: e.target.value }))} />
                    </div>
                </div>
            </fieldset>

            <fieldset className="fieldset">
                <legend>Brand</legend>
                <div className="grid">
                    {brands.map(b => (
                        <label key={b} className="tag">
                            <input
                                type="checkbox"
                                checked={state.brands.includes(b)}
                                onChange={() => toggleBrand(b)}
                            /> {b}
                        </label>
                    ))}
                </div>
            </fieldset>
        </aside>
    )
}

FiltersSidebar.propTypes = {
    brands: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func,
    initial: PropTypes.object
}
