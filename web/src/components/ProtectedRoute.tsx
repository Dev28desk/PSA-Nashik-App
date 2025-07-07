


import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { currentUser, loading } = useAuth()

  if (loading) return <div className="loading">Loading authentication...</div>
  return currentUser ? children : <Navigate to="/login" replace />
}


