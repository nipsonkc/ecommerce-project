import { Link } from 'react-router-dom'

/** Fallback for non-existent routes. */
export default function NotFoundPage() {
    return (
        <div className="container" style={{ paddingTop: 16 }}>
            <h1>404</h1>
            <p className="muted">This page does not exist.</p>
            <Link className="btn" to="/">Back to home</Link>
        </div>
    )
}
