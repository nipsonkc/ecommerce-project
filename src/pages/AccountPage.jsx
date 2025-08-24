import { useAuth } from '../context/AuthContext'

/** Simple account overview (protected). */
export default function AccountPage() {
    const { user } = useAuth()
    return (
        <div className="container" style={{ paddingTop: 16 }}>
            <h1>Your Account</h1>
            <div className="card">
                <div className="content">
                    <div className="grid" style={{ gridTemplateColumns: '1fr auto' }}>
                        <div>Name</div><div>{user?.name}</div>
                        <div>Email</div><div>{user?.email}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
