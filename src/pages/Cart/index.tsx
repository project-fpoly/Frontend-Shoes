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
  let totalCart = 0
  cartSession?.cartItems.forEach((item: any) => {
    totalCart += item.price * item.quantity
  })
  cart?.cartItems.forEach((item: any) => {
    totalCart += item.price * item.quantity
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
    dispatch(fetchAllProducts({ page: 1, pageSize: 100, searchKeyword: '' }))
  }, [dispatch])

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
      if (updatedCartData.cartItems.length === 0) {
        sessionStorage.removeItem('cart')
      }
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

  function getCustomQuantity(quantity: number) {
    return Math.min(quantity, 10)
  }

  return (
    <>
      <div className="shopping-cart mx-4 lg:mt-[100px] lg:w-[1024px] px-10 xl:w-[1100px] lg:mx-auto">
        {!cart && !cartSession ? (
          <>
            <div className="grid place-items-center">
              <p className="text-2xl">Giỏ hàng đang trống</p>
              <img
                className="img_banner h-auto w-[200px] rounded-lg "
                src="/src/assets/empty-cart.png"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="shopping-cart-bag lg:w-[65%]">
                <h2 className="text-3xl font-semibold  lg:text-left lg:my-4">
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
                    {formatCurrency(totalCart)}
                  </p>
                </div>
                {cart
                  ? cart?.cartItems?.map((cartItem: any, index: number) => {
                      const sizes = getProductSize(cartItem.product)
                      const renderOptions = (
                        sizeName: string,
                      ): JSX.Element[] => {
                        const selectedSize =
                          sizes &&
                          Array.isArray(sizes) &&
                          sizes.find((size: any) => size.name === sizeName)
                        const options: JSX.Element[] = []
                        if (selectedSize) {
                          const customQuantity = Math.min(
                            selectedSize.quantity,
                            10,
                          )
                          for (let i = 1; i <= customQuantity; i++) {
                            options.push(
                              <option key={`${sizeName}-${i}`} value={i}>
                                {i}
                              </option>,
                            )
                          }
                        }
                        return options
                      }
                      return (
                        <div
                          key={`${cartItem.product}-${cartItem.size}`}
                          className="cart-item flex mb-8"
                        >
                          <figure className="w-[220px]">
                            <Link to={`/detail/${cartItem.product}`}>
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
                                    <div className="flex text-lg text-[#6b7280]">
                                      <div>
                                        <label htmlFor="">Size</label>
                                        <select
                                          value={cartItem.size}
                                          name="size"
                                          id=""
                                          className="px-2 ml-1"
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
                                            sizes.map(
                                              (size: any, index: number) => (
                                                <option
                                                  disabled={size.quantity <= 0}
                                                  className={
                                                    size.quantity <= 0
                                                      ? 'text-[#ccc]'
                                                      : ''
                                                  }
                                                  key={index}
                                                  value={size.name}
                                                >
                                                  {size.name}
                                                </option>
                                              ),
                                            )
                                          ) : (
                                            <option value="">
                                              No sizes available
                                            </option>
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
                                          {renderOptions(cartItem.size)}
                                        </select>
                                      </div>
                                    </div>
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
                      const renderOptions = (
                        sizeName: string,
                      ): JSX.Element[] => {
                        const selectedSize =
                          sizes &&
                          Array.isArray(sizes) &&
                          sizes.find((size: any) => size.name === sizeName)
                        const options: JSX.Element[] = []
                        if (selectedSize) {
                          const customQuantity = Math.min(
                            selectedSize.quantity,
                            10,
                          )
                          for (let i = 1; i <= customQuantity; i++) {
                            options.push(
                              <option key={`${sizeName}-${i}`} value={i}>
                                {i}
                              </option>,
                            )
                          }
                        }
                        return options
                      }
                      return (
                        <div
                          key={`${item.product}-${item.size}`}
                          className="cart-item flex mb-8"
                        >
                          <figure className="w-[220px]">
                            <Link to={`/detail/${item.product}`}>
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
                                        sizes.map(
                                          (size: any, index: number) => (
                                            <option
                                              disabled={size.quantity <= 0}
                                              className={
                                                size.quantity <= 0
                                                  ? 'text-[#ccc]'
                                                  : ''
                                              }
                                              key={index}
                                              value={size.name}
                                            >
                                              {size.name}
                                            </option>
                                          ),
                                        )
                                      ) : (
                                        <option value="">
                                          No sizes available
                                        </option>
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
                                      {renderOptions(item.size)}
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
                      <div>{formatCurrency(totalCart)}</div>
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
                      <div>{formatCurrency(totalCart)}</div>
                    </div>
                    <div className="hidden lg:block">
                      <hr />
                    </div>
                  </div>
                  <div className="mt-5 ">
                    {cart || cartSession?.cartItems.length ? (
                      <>
                        <Button
                          onClick={() => navigate('./checkout')}
                          style={{ background: 'rgb(17, 17, 17)' }}
                          block
                          className="h-[70px] rounded-[100px] text-xl text-white hover:!text-white hover:!border-white hover:!bg-stone-700 mb-2"
                        >
                          <p> Checkout</p>
                        </Button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="favourites my-8 sm:px-4 lg:px-8">
        <SlideAlso shoes={shoes}></SlideAlso>
      </div>
    </>
  )
}

export default Cart
