import Router from './router'
import './App.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserByID } from './features/auth'
import io from 'socket.io-client'
import { message, notification } from 'antd'
import { AppDispatch } from './redux/store'
import { fetchAllUsers } from './features/user'
import { fetchAllNotification } from './features/notification'

function App() {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getUserByID())
    const socket = io('http://localhost:9000', { transports: ['websocket'] })
    socket.on('connection', () => {
      console.log('Connected to Socket io')
    })
    socket.on('new_user_login', () => {})
    socket.on('log_out', () => {})
    socket.on('update_user_status', () => {
      dispatch(fetchAllUsers({ page: 1, pageSize: 10, search: '' }))
    })
    console.log("chua thong bao",user?.userName);
    
    if (user?.role == 'admin') {
      socket.on('newNotification', (data) => {
        notification.success({ message: data.message })
        dispatch(fetchAllNotification())
        console.log("co thong bao",user?.userName);
      })
    }
    console.log("vc");
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <>
      <Router></Router>
    </>
  )
}

export default App
