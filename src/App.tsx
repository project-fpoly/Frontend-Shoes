import Router from './router'
import './App.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserByID } from './features/auth'
import { AppDispatch } from './redux/store'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: any) => state.auth.user)
  useEffect(() => {
    dispatch(getUserByID())
  }, [dispatch])

  return (
    <>
      <Router user={user}></Router>
    </>
  )
}

export default App
