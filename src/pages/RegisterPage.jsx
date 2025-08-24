import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/** Mock registration: saves a user object (no server). */
export default function RegisterPage() {
    const [name, setName] = useState('Nipson')
    const [email, setEmail] = useState('demo@example.com')
    const [password, setPassword] = useState('password')
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const nav = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await register({ name, email, password })
            nav('/', { replace: true })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container" style={{ paddingTop: 16, maxWidth: 560 }}>
            <h1>Create Account</h1>
            <form className="card" onSubmit={submit}>
                <div className="content">
                    <div className="input">
                        <label htmlFor="name">Name</label>
                        <input id="name" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button className="btn primary block" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
                    <div className="muted" style={{ marginTop: 8 }}>Already have an account? <Link to="/login">Login</Link></div>
                </div>
            </form>
        </div>
    )
}
