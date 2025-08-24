import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/** Mock login: stores a user object in localStorage via AuthContext. */
export default function LoginPage() {
    const [email, setEmail] = useState('demo@example.com')
    const [password, setPassword] = useState('password')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const nav = useNavigate()
    const { state } = useLocation()

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await login({ email, password })
            const to = state?.from?.pathname || '/'
            nav(to, { replace: true })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container" style={{ paddingTop: 16, maxWidth: 560 }}>
            <h1>Login</h1>
            <form className="card" onSubmit={submit}>
                <div className="content">
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button className="btn primary block" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
                    <div className="muted" style={{ marginTop: 8 }}>No account? <Link to="/register">Create one</Link></div>
                </div>
            </form>
        </div>
    )
}
