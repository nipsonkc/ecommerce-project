import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.svg'
import { CATEGORIES } from '../data/categories'

/** Top navigation bar with search and account/cart links. */
export default function Header() {
    const { count } = useCart()
    const { user, logout } = useAuth()
    const [q, setQ] = useState('')
    const navigate = useNavigate()

    const onSearch = (e) => {
        e.preventDefault()
        // demo search routes to music category; wire to your API later
        navigate(`/category/music?q=${encodeURIComponent(q)}`)
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-row">
                    <Link className="brand" to="/">
                        <img src={logo} alt="Logo" />
                        <span className="muted">Orders • Account • Search • Delivery</span>
                    </Link>

                    <form className="search" onSubmit={onSearch} aria-label="site search">
                        <input
                            placeholder="Search products..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            aria-label="search input"
                        />
                        <button type="submit">Search</button>
                    </form>

                    <div style={{ display: 'flex', gap: 8 }}>
                        <Link className="btn" to="/orders">Your Orders</Link>
                        {user ? (
                            <>
                                <Link className="btn" to="/account">{user.name}</Link>
                                <button className="btn danger" onClick={logout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link className="btn" to="/login">Login</Link>
                                <Link className="btn" to="/register">Create Account</Link>
                            </>
                        )}
                        <NavLink className="btn success" to="/cart">Cart ({count})</NavLink>
                    </div>
                </div>

                <nav className="nav">
                    {CATEGORIES.slice(0, 8).map(c => (
                        <NavLink key={c.id} to={`/category/${c.id}`} className={({ isActive }) => isActive ? 'active' : undefined}>
                            {c.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    )
}
