import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/Mainlayout'
import Home from '../pages/Home'
import SigninPage from '../pages/client/signin'
import SignupPage from '../pages/client/signup'
import Cart from '../pages/Cart'
import Guest_Checkout from '../pages/Guest_Checkout'
import AdminLayout from '../layouts/AdminLayout'
import AdminDashboard from '../pages/Admin'
import UserManager from '../pages/Admin/Users'
import CommentManager from '../pages/Admin/Comment'
import CategoriesManager from '../pages/Admin/Categories'
import ProductsManager from '../pages/Admin/Products'
import OrderManager from '../pages/Admin/Order'
import NotificationsAdmin from '../pages/Admin/Notification'
import Help from '../pages/Help/index.tsx'
import Password from '../pages/client/password'
import GreaUp from '../pages/GreaUp'
import DetailShoe from '../pages/Detail'
import SizeGuide from '../pages/SizeGuide'
import ResetPassword from '../pages/client/reset-password.tsx'
import ForgotPassword from '../pages/client/forgotpassword/ForgotPassword.tsx'
import VerifyEmail from '../pages/client/verify-email'
import { PrivateRoute } from './privateRoutes'
import { useDispatch, useSelector } from 'react-redux'
import Women from '../pages/Women/index.tsx'
import Men from '../pages/Men/index.tsx'
import Delivery from '../components/Help/Delivery.tsx'
import Voucher from '../pages/Admin/Voucher'
import OrderPage from '../pages/Order/OrderPage.tsx'
import Favorites from '../pages/Favorite/index.tsx'
import CheckOut from '../pages/CheckOut/index.tsx'
import SaleManager from '../pages/Admin/Sale/index.tsx'
import Sale from '../pages/Sale/index.tsx'

import FeatureDashboard from '../pages/Admin/Dashboard/Dashboard.tsx'

import Membership from '../pages/Membership/index.tsx'
import NotFound from '../pages/NotFound/index.tsx'
import GuestOrder from '../pages/GuestOrder/index.tsx'
import ThankYou from '../pages/ThankYou/index.tsx'
import '../App.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect } from 'react'
import io from 'socket.io-client'
import { notification } from 'antd'
import { AppDispatch } from '../redux/store.ts'
import { fetchAllUsers } from '../features/user/index.tsx'
import { fetchAllNotification } from '../features/notification/index.tsx'
import Contact from '../pages/Contact/index.tsx'
import SendNotification from '../pages/Admin/Setting/sendNotification.tsx'
import { fetchOrders, getOrderByUsers } from '../features/order/index.tsx'
import Profile from '../pages/Profile/index.tsx'

const Router = (user: any) => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    const socket = io('http://localhost:9000', { transports: ['websocket'] })

    socket.on('connect', () => {
      if (localStorage.getItem('userID') == null) {
        return
      } else {
        socket.emit('check_active', { _id: localStorage.getItem('userID') })
      }
    })
    socket.on('new_user_login', () => { })
    socket.on('log_out', () => { })
    socket.on('update_user_status', () => {
      dispatch(fetchAllUsers({ page: 1, pageSize: 10, search: '' }))
    })
    if (user.user) {
      socket.on('realtimeBill', () => {
        dispatch(getOrderByUsers({}))
      })
    }

    if (user.user && user.user.role === 'admin') {
      socket.on('newNotification', (data) => {
        notification.success({ message: data.message })
        dispatch(fetchAllNotification(''))
        console.log('co thong bao', user)
      })
      socket.on('realtimeBillforAdmin', () => {
        dispatch(fetchOrders({}))
      })
    }

    return () => {
      socket.disconnect()
    }
  }, [dispatch, user])
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/greaup" element={<GreaUp />} />
          <Route path="/detail/:id" element={<DetailShoe />} />
          <Route path="/sizeguide" element={<SizeGuide />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/guest_checkout" element={<Guest_Checkout />} />
          <Route path="/help" element={<Help />} />
          <Route path="/help/a/free-shipping" element={<Delivery />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order/guest" element={<GuestOrder />} />
          <Route path="/order/thank-you" element={<ThankYou />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/cart/checkout" element={<CheckOut />} />
          <Route path="/dashboard" element={<FeatureDashboard />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute user={user.user}>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="/admin"
          element={
            <PrivateRoute user={user.user}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManager />} />
          <Route path="/admin/product" element={<ProductsManager />} />
          <Route path="/admin/categories" element={<CategoriesManager />} />
          <Route path="/admin/comment" element={<CommentManager />} />
          <Route path="/admin/orders" element={<OrderManager />} />
          <Route path="/admin/sale" element={<SaleManager />} />
          <Route path="/admin/dashboard" element={<FeatureDashboard />} />

          <Route
            path="/admin/notification/:id"
            element={<NotificationsAdmin />}
          />
          <Route path="/admin/voucher" element={<Voucher />} />
          <Route
            path="/admin/setting/sendNotification"
            element={<SendNotification />}
          />
        </Route>

        <Route path="signin" element={<SigninPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
        <Route path="password" element={<Password />}></Route>
        <Route path="reset-password" element={<ResetPassword />}></Route>
        <Route path="forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="verify-email" element={<VerifyEmail />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default Router
