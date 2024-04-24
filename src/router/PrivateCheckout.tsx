import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const PrivateCheckout = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const { cart } = useSelector((state: any) => state.cart.cartItems)
  const cartSession = JSON.parse(sessionStorage.getItem('cart'))
  console.log(cartSession)
  useEffect(() => {
    const checkToken = () => {
      console.log(cartSession)
      if (!cart && !cartSession) {
        console.log('b')
        navigate('/')
      }
    }

    checkToken()
  }, [navigate, cart, cartSession])
  return cart || cartSession ? children : null
}
