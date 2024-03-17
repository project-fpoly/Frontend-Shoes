import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const PrivateRoute = ({ children, user }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user && user.role !== 'admin') {
      console.error('you is not admin')
      navigate('/')
    }
  }, [user])

  return user ? children : null
}
