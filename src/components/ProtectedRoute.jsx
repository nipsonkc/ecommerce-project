import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../context/AuthContext'

/** Redirects to /login if no user. */
export default function ProtectedRoute({ children }) {
    const { user } = useAuth()
    const location = useLocation()
    if (!user) return <Navigate to="/login" replace state={{ from: location }} />
    return children
}
ProtectedRoute.propTypes = { children: PropTypes.node }
