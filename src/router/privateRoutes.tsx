import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import IUser from '../types/user'

export const PrivateRoute = ({
  children,
  user,
}: {
  children: JSX.Element
  user: IUser
}) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('accessToken')
  useEffect(() => {
    const checkToken = () => {
      if (token === undefined || token === null || token === '') {
        navigate('/signin')
      } else {
        try {
          const decoded: JwtPayload = jwtDecode(token)
          const diff = new Date().getTime() / 1000 - decoded!.exp!
          if (diff > 0) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('email')
            localStorage.removeItem('userID')
            navigate('/signin')
          }
        } catch (error) {
          console.log('Invalid token: ' + token)
          localStorage.removeItem('accessToken')
          navigate('/signin')
        }
      }
    }

    if (user && user.role !== 'admin') {
      console.error('you is not admin')
      navigate('/')
    }
    checkToken()
  }, [user, token, navigate])

  return user ? children : null
}
