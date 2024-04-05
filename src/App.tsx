import Router from './router'
import './App.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserByID } from './features/auth'
import { AppDispatch } from './redux/store'
import { useNavigate } from 'react-router-dom'
import { JwtPayload, jwtDecode } from 'jwt-decode'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.auth.user)
  const token = localStorage.getItem('accessToken')
  useEffect(() => {
    const checkToken = () => {
      if (token === undefined || token === null || token === '') {
        console.error('undefined')
      } else {
        try {
          const decoded: JwtPayload = jwtDecode(token)
          const diff = new Date().getTime() / 1000 - decoded!.exp!
          if (diff > 0) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('email')
            localStorage.removeItem('userID')
          }
        } catch (error) {
          console.log('Invalid token: ' + token)
          localStorage.removeItem('accessToken')
          localStorage.removeItem('email')
          localStorage.removeItem('userID')
        }
      }
    }
    checkToken()
    dispatch(getUserByID())
  }, [dispatch])

  return (
    <>
      <Router user={user}></Router>
    </>
  )
}

export default App
