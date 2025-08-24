import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getUser, login as apiLogin, logout as apiLogout, register as apiRegister } from '../services/api'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

/** Provides user auth state + actions (mocked using localStorage). */
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => { setUser(getUser()) }, [])

    const login = async (creds) => {
        const u = await apiLogin(creds)
        setUser(u)
        return u
    }
    const register = async (data) => {
        const u = await apiRegister(data)
        setUser(u)
        return u
    }
    const logout = async () => {
        await apiLogout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
AuthProvider.propTypes = { children: PropTypes.node }
