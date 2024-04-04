import { Button, Modal, notification } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { GrFavorite } from 'react-icons/gr'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { Link, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'

import { FaQuestionCircle } from 'react-icons/fa'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import {
  getCartItems,
  removeFromCart,
  updateProductCart,
} from '../../features/cart'
import { CartItem } from '../../common/order'
import { IStateProduct } from '../../common/redux/type'
import { fetchAllProducts } from '../../features/product'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { toInteger } from 'lodash'
import { IProduct } from '../../common/products'
import usesessionStorage from '../../hooks'
import SlideAlso from '../../components/Detail/SlideAlso'
import { formatCurrency } from '../../hooks/utils'

const Cart = () => {
  const ref = useRef<any>({})
  const dispatch = useDispatch<AppDispatch>()
  const { cart } = useSelector((state: any) => state.cart.cartItems)
  const shoes = useSelector((state: IStateProduct) => state.product.products)
  const cartSession = JSON.parse(sessionStorage.getItem('cart'))
  const [forceRender, setForceRender] = useState(0)
  const [merge, setMerge] = usesessionStorage<{ cartItems: any }>('cart', {
    cartItems: [],
  })
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('accessToken')
  let totalPrice = 0
  cartSession?.cartItems.forEach((item: any) => {
    totalPrice += item.price * item.quantity
  })

  const { products } = useSelector((state: any) => state.product)
  const getProductName = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId)
    return product ? product.name : 'N/A'
  }
  const getProductSize = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId)
    return product ? product?.sizes : 'N/A'
  }

  const getCateName = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId)
    return product ? product.categoryId.name : 'N/A'
  }
  useEffect(() => {
    dispatch(getCartItems())
    dispatch(fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: '' }))
  }, [
    dispatch,
    cart?.cartItems?.length > 0,
    cartSession?.cartItems?.length > 0,
  ])

  const next = () => {
    ref.current.slickNext()
  }

  const previous = () => {
    ref.current.slickPrev()
  }
  const removeItemFromCart = (productId: string) => {
    dispatch(removeFromCart(productId))
    if (cart) {
      sessionStorage.removeItem('cart')
    }
  }
  const removeItemFromCartSession = (productId: string, size: string) => {
    const { cartItems } = cartSession
    if (cartItems) {
      const CartItems = cartItems
      const updatedCartItems = CartItems.filter(
        (item: CartItem) =>
          item.product.toString() !== productId || item.size !== size,
      )
      const updatedCartData = {
        cartItems: updatedCartItems,
      }

      sessionStorage.setItem('cart', JSON.stringify(updatedCartData))

      notification.success({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng' })
    }
    setForceRender(forceRender + 1) // Gọi setState để force render lại component
  }

  const handleSizeChange = (
    index: number,
    productId: string,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const size = event.target.value

    dispatch(
      updateProductCart({
        index,
        productId,
        size,
      }),
    )
    setForceRender(forceRender + 1) // Gọi setState để force render lại component
  }
  const handleQuantityChange = (
    index: number,
    productId: string,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const quantity = Number(event.target.value)
    dispatch(
      updateProductCart({
        index,
        productId,
        quantity,
        size: cart.cartItems[index].size,
      }),
    )
    setForceRender(forceRender + 1) // Gọi setState để force render lại component
  }
  const updateCartItem = (
    index: number,
    field: string,
    value: React.ChangeEvent<HTMLSelectElement> | number,
  ) => {
    const updatedCart = { ...cartSession }
    const updatedCartItem = { ...updatedCart.cartItems[index] }

    updatedCartItem[field] = field === 'size' ? value : +value

    updatedCart.cartItems[index] = updatedCartItem

    const mergedCartItems = { cartItems: [] as any }

    for (const shoes of updatedCart.cartItems) {
      const existingIndex = mergedCartItems.cartItems.findIndex(
        (item: any) =>
          item.product === shoes.product && item.size === shoes.size,
      )
      if (existingIndex !== -1) {
        mergedCartItems.cartItems[existingIndex].quantity += shoes.quantity
      } else {
        mergedCartItems.cartItems.push(shoes)
      }
    }
    setMerge(mergedCartItems)
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <>
      <div className="shopping-cart mx-4 lg:mt-[100px] lg:w-[1024px] xl:w-[1100px] lg:mx-auto">
        <div className="lg:flex lg:gap-6">
          <div className="shopping-cart-bag lg:w-[65%]">
            <h2 className="text-3xl font-semibold text-center lg:text-left lg:my-4">
              Bag
            </h2>
            <div className="text-center mb-12 lg:hidden">
              <p>
                <span className="text-[#707072] pr-2 mr-2 border-r-2 border-[#707072]">
                  {cart
                    ? cart?.cartItems.length
                    : cartSession?.cartItems.length}{' '}
                  items
                </span>
                {formatCurrency(cart ? cart?.totalPrice : totalPrice)}
              </p>
            </div>
            {cart
              ? cart?.cartItems?.map((cartItem: any, index: number) => {
                  const sizes = getProductSize(cartItem.product)
                  console.log(sizes)
                  return (
                    <div
                      key={`${cartItem.product}-${cartItem.size}`}
                      className="cart-item flex mb-8"
                    >
                      <figure className="w-[220px]">
                        <Link to={'/'}>
                          <img src={cartItem.images[0]} alt="" />
                        </Link>
                      </figure>
                      <div className="cart-item-content flex w-full ml-4">
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="">
                            <div className="flex justify-between">
                              <h2 className="font-semibold sm:text-xl text-sm">
                                {getProductName(cartItem.product)}
                              </h2>
                              <p className="text-sm font-semibold sm:text-xl">
                                {formatCurrency(
                                  cartItem.price * cartItem.quantity,
                                )}
                              </p>
                            </div>
                            <p className="text-sm sm:text-xl text-[#565656] my-2">
                              {getCateName(cartItem.product)}
                            </p>
                            <div className="flex text-[12px] text-[#6b7280] sm:text-lg">
                              <div>
                                <label htmlFor="">Size</label>
                                <select
                                  value={cartItem.size}
                                  name="size"
                                  id=""
                                  className="px-1 ml-1 text-[12px] text-[#6b7280] sm:text-lg"
                                  onChange={(
                                    event: React.ChangeEvent<HTMLSelectElement>,
                                  ) =>
                                    handleSizeChange(
                                      index,
                                      cartItem.product,
                                      event,
                                    )
                                  }
                                >
                                  {sizes && Array.isArray(sizes) ? (
                                    sizes.map((size: any, index: number) => (
                                      <option key={index} value={size.name}>
                                        {size.name}
                                      </option>
                                    ))
                                  ) : (
                                    <option value="">No sizes available</option>
                                  )}
                                </select>
                              </div>
                              <div className="ml-2">
                                <label htmlFor="">Quantity</label>
                                <select
                                  value={cartItem.quantity}
                                  name="quantity"
                                  id=""
                                  className="px-2 ml-1"
                                  onChange={(
                                    event: React.ChangeEvent<HTMLSelectElement>,
                                  ) =>
                                    handleQuantityChange(
                                      index,
                                      cartItem.product,
                                      event,
                                    )
                                  }
                                >
                                  {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                      {i + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="cart-item-content-action">
                            <ul className="flex">
                              <li>
                                <GrFavorite
                                  style={{
                                    fontSize: '24px',
                                    marginRight: '12px',
                                  }}
                                />
                              </li>
                              <li>
                                <RiDeleteBin6Line
                                  className="hover:cursor-pointer"
                                  onClick={() =>
                                    removeItemFromCart(cartItem.product)
                                  }
                                  style={{ fontSize: '24px' }}
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              : cartSession?.cartItems.map((item: any, index: any) => {
                  const sizes = getProductSize(item.product)
                  return (
                    <div
                      key={`${item.product}-${item.size}`}
                      className="cart-item flex mb-8"
                    >
                      <figure className="w-[220px]">
                        <Link to={'/'}>
                          <img src={item.images[0]} alt="" />
                        </Link>
                      </figure>
                      <div className="cart-item-content flex w-full ml-4">
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="">
                            <div className="flex justify-between">
                              <h2 className="font-semibold text-xl">
                                {getProductName(item.product)}
                              </h2>
                              <p className="text-xl font-semibold">
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                            </div>
                            <p className="text-lg text-[#565656]">
                              {getCateName(item.product)}
                            </p>
                            <div className="flex text-lg text-[#6b7280]">
                              <div>
                                <label htmlFor="">Size</label>
                                <select
                                  value={item.size}
                                  name="size"
                                  id=""
                                  className="px-2 ml-1"
                                  onChange={(e) =>
                                    updateCartItem(
                                      index,
                                      'size',
                                      e.target.value as any,
                                    )
                                  }
                                >
                                  {sizes && Array.isArray(sizes) ? (
                                    sizes.map((size: any, index: number) => (
                                      <option key={index} value={size.name}>
                                        {size.name}
                                      </option>
                                    ))
                                  ) : (
                                    <option value="">No sizes available</option>
                                  )}
                                </select>
                              </div>
                              <div className="ml-2">
                                <label htmlFor="">Quantity</label>
                                <select
                                  value={item.quantity}
                                  name="quantity"
                                  id=""
                                  className="px-2 ml-1"
                                  onChange={(e) =>
                                    updateCartItem(
                                      index,
                                      'quantity',
                                      e.target.value as any,
                                    )
                                  }
                                >
                                  {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                      {i + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="cart-item-content-action">
                            <ul className="flex">
                              <li>
                                <GrFavorite
                                  style={{
                                    fontSize: '24px',
                                    marginRight: '12px',
                                  }}
                                />
                              </li>
                              <li>
                                <RiDeleteBin6Line
                                  className="hover:cursor-pointer"
                                  onClick={() =>
                                    removeItemFromCartSession(
                                      item.product,
                                      item.size,
                                    )
                                  }
                                  style={{ fontSize: '24px' }}
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

            <hr />
          </div>
          <div className="shopping-cart-summary lg:w-[35%]">
            <h2 className="text-3xl font-semibold my-4">Summary</h2>
            <div>
              <div className="text-[18px] font-medium">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    Subtotal
                    <FaQuestionCircle className="ml-2" />
                  </div>
                  <div>
                    {formatCurrency(cart ? cart?.totalPrice : totalPrice)}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div>Estimated Delivery & Handling</div>
                  <div className="font-light">Free</div>
                </div>
                <div className="hidden lg:block">
                  <hr />
                </div>
                <div className="flex justify-between items-center my-4 lg:my-5">
                  <div>Total</div>
                  <div>
                    {formatCurrency(cart ? cart?.totalPrice : totalPrice)}
                  </div>
                </div>
                <div className="hidden lg:block">
                  <hr />
                </div>
              </div>
              <div className="mt-5 hidden lg:block">
                {cart || cartSession?.cartItems.length ? (
                  <>
                    <>
                      <Button
                        onClick={() => navigate('./checkout')}
                        style={{ background: 'rgb(17, 17, 17)' }}
                        block
                        className="h-[70px] rounded-[100px] text-xl text-white hover:!text-white hover:!border-white hover:!bg-stone-700"
                      >
                        <p> Checkout</p>
                      </Button>
                    </>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="favourites my-12 gay-4">
          <h2 className="text-3xl font-semibold">Favourites</h2>
          <div className="flex items-center lg:block">
            <p className="text-lg">Want to view your favourites?</p>
            {accessToken ? (
              <Link to={'/'} className="underline text-lg text-gray-500 mx-1">
                View favourites
              </Link>
            ) : (
              <>
                <Link to={'/'} className="underline text-lg text-gray-500 mx-1">
                  Join us
                </Link>{' '}
                or{' '}
                <Link to={'/'} className="underline text-lg text-gray-500 mx-1">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="fixed z-10 bottom-0 h-[120px] w-full bg-white px-4 leading-[120px] lg:hidden">
        <Button
          style={{ background: 'rgb(17, 17, 17)' }}
          block
          className="h-[70px] rounded-[100px] text-xl text-white hover:!text-white hover:!border-white hover:!bg-stone-700 my-auto"
        >
          <Link to={'./guest_checkout'}>
            <p>Guest Checkout</p>
          </Link>
        </Button>
      </div>

      <div className="favourites my-8 sm:px-4 lg:px-8">
        {/* <h2 className="text-3xl font-semibold mx-4">You Might Also Like</h2>
        <div className="flex flex-row-reverse mr-4 my-4 text-[#CACACB]">
          <div>
            <button
              className=" border rounded-full px-4 py-4 bg-[#f5f5f5]"
              onClick={next}
            >
              <SlArrowRight />
            </button>
          </div>
          <div>
            <button
              className="mr-3 border rounded-full px-4 py-4 bg-[#f5f5f5]"
              onClick={previous}
            >
              <SlArrowLeft />
            </button>
          </div>
        </div>
        <div className="">
          <Slider ref={ref} {...settings}>
            <div>
              <Link to={'1'}>
                <div>
                  <img src="https://picsum.photos/200" alt="" width="100%" />
                </div>

                <div>
                  <h2 className="font-semibold text-xl">Product 1</h2>
                  <p className="text-lg text-[#707072]">Lorem ipsum.</p>
                  <p className="text-xl font-semibold mt-2 lg:mt-4">
                    <span className="text-[#111111]">đ</span>3.000.000
                  </p>
                </div>
              </Link>
            </div>
            <div>
              <Link to={'2'}>
                <div className="overflow-hidden w-full">
                  <img src="https://picsum.photos/200" alt="" width="100%" />
                </div>
                <div>
                  <h2 className="font-semibold text-xl">Product 1</h2>
                  <p className="text-lg text-[#707072]">Lorem ipsum.</p>
                  <p className="text-xl font-semibold mt-2 lg:mt-4">
                    <span className="text-[#111111]">đ</span>3.000.000
                  </p>
                </div>
              </Link>
            </div>
            <div>
              <Link to={'3'}>
                <div className="overflow-hidden w-full">
                  <img src="https://picsum.photos/200" alt="" width="100%" />
                </div>
                <div>
                  <h2 className="font-semibold text-xl">Product 1</h2>
                  <p className="text-lg text-[#707072]">Lorem ipsum.</p>
                  <p className="text-xl font-semibold mt-2 lg:mt-4">
                    <span className="text-[#111111]">đ</span>3.000.000
                  </p>
                </div>
              </Link>
            </div>
            <div>
              <Link to={'4'}>
                <div>
                  <img src="https://picsum.photos/200" alt="" width="100%" />
                </div>

                <div>
                  <h2 className="font-semibold text-xl">Product 1</h2>
                  <p className="text-lg text-[#707072]">Lorem ipsum.</p>
                  <p className="text-xl font-semibold mt-2 lg:mt-4">
                    <span className="text-[#111111]">đ</span>3.000.000
                  </p>
                </div>
              </Link>
            </div>
            <div>
              <Link to={'5'}>
                <div className="overflow-hidden w-full">
                  <img src="https://picsum.photos/200" alt="" width="100%" />
                </div>
                <div>
                  <h2 className="font-semibold text-xl">Product 1</h2>
                  <p className="text-lg text-[#707072]">Lorem ipsum.</p>
                  <p className="text-xl font-semibold mt-2 lg:mt-4">
                    <span className="text-[#111111]">đ</span>3.000.000
                  </p>
                </div>
              </Link>
            </div>
            <div>
              <Link to={'6'}>
                <div className="overflow-hidden w-full">
                  <img src="https://picsum.photos/200" alt="" width="100%" />
                </div>
                <div>
                  <h2 className="font-semibold text-xl">Product 1</h2>
                  <p className="text-lg text-[#707072]">Lorem ipsum.</p>
                  <p className="text-xl font-semibold mt-2 lg:mt-4">
                    <span className="text-[#111111]">đ</span>3.000.000
                  </p>
                </div>
              </Link>
            </div>
          </Slider>
        </div> */}
        <SlideAlso shoes={shoes}></SlideAlso>
      </div>
    </>
  )
}

export default Cart
