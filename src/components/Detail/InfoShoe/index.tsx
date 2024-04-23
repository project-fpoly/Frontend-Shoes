import { ICategory } from '../../../common/category'
import { IProduct } from '../../../common/products'
import style from './index.module.scss'
import clsx from 'clsx'
import ModalCustom from '../../Modal'
import { useState } from 'react'
import { Image, notification, Button, ConfigProvider } from 'antd'
import Colspace from './Colspace'
import { Link, useNavigate } from 'react-router-dom'
import { CiHeart } from 'react-icons/ci'
import usesessionStorage from '../../../hooks'
import { addToCart } from '../../../features/cart'
import { addFavItems, getFavItems } from '../../../features/favourite'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { discountcurrency, formatCurrency } from '../../../hooks/utils'
import ModalCmt from '../../Modal/ModalCmt'
import { FaHeart } from 'react-icons/fa'

import { useEffect } from 'react'
type NotificationType = 'success' | 'info' | 'warning' | 'error'

interface Props {
  shoe: any
  category: ICategory
}
const InfoShoe = (props: Props) => {
  const { shoe, category } = props
  console.log(shoe)

  const state = useSelector((state: any) => state.fav.favItems.fav)
  console.log(state)
  const favs = useSelector((state: any) => state.fav.favItems.fav?.favItems)
  const [size, setSize] = useState('')
  const [activeButton, setActiveButton] = useState(null)
  const dispatch = useDispatch<AppDispatch>()
  const favItem = favs?.some((item: any) => item.product === shoe._id)
  const navigate = useNavigate()
  console.log(favItem)
  useEffect(() => {
    dispatch(getFavItems())
  }, [shoe, favItem])
  const handleClick = (index: any) => {
    setActiveButton(index === activeButton ? null : index)
  }
  const openNotification = (type: NotificationType) => {
    switch (type) {
      case 'error':
        notification[type]({
          message: 'Không thêm được sản phẩm',
          description: 'Bạn cần phải chọn size',
        })
        break
      default:
        'success'
        notification[type]({
          message: 'Thêm sản phẩm thành công',
          description: 'Sản phẩm đã được thêm vào giỏ hàng',
        })
        break
    }
  }
  const [cart, setCart] = usesessionStorage<{ cartItems: IProduct[] }>('cart', {
    cartItems: [],
  })

  const {
    _id: product,
    categoryId,
    sizes,
    color,
    images,
    price,
    ...shoeCart
  } = shoe
  const { sale } = shoeCart

  const priceFormat = sale?.discount
    ? discountcurrency(shoe.price, sale?.discount)
    : shoe.price

  const [fav, setFav] = usesessionStorage<{ favItems: IProduct[] }>('fav', {
    favItems: [],
  })
  const accessToken = localStorage.getItem('accessToken')

  const addToCartt = () => {
    if (!size) return openNotification('error')
    const cartItem = { product, size: size, price: priceFormat }
    if (accessToken) {
      dispatch(addToCart(cartItem as any))
    } else {
      const updatedCart = cart?.cartItems.map((item: any) => {
        if (item.product === shoe._id && item.size === size) {
          // If product with the same ID already exists, increase its quantity
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })

      // If the product was not found in the cart, add it with quantity 1
      if (
        !updatedCart?.find(
          (item) => item.product === product && item.size === size,
        )
      ) {
        updatedCart?.push({
          product,
          size: size,
          color,
          images,
          price: priceFormat,
          quantity: 1,
        })
      }

      openNotification('success')
      setCart({ cartItems: updatedCart })
    }
  }
  const addToFavv = () => {
    const favItem = { product }
    if (accessToken) {
      dispatch(addFavItems(favItem as any))
      console.log('a')
    } else {
      const updatedfav = fav?.favItems.map((item: any) => {
        if (item.product === shoe._id) {
        }
        return item
      })

      // If the product was not found in the cart, add it with quantity 1
      if (!updatedfav?.find((item) => item.product === product)) {
        updatedfav?.push({
          product,
          color,
          images,
          price,
        })
      }

      openNotification('success')
    }
  }
  const storedData = localStorage.getItem('fav')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              contentFontSize: 18,
              defaultHoverBorderColor: 'black',
              defaultHoverColor: 'black',
            },
          },
        }}
      >
        <div
          className={clsx('flex flex-col gap-6 w-[500px]', style.containerInfo)}
        >
          <div>
            <h2 className="text-black text-2xl">{shoe.name}</h2>
            <p>{categoryId?.name}</p>
            <span className="flex gap-5">
              <h3 className="my-10  text-xl ">
                {sale?.discount ? formatCurrency(priceFormat) : ''}
              </h3>

              {!sale?.discount ? (
                <h3 className="my-10  text-xl ">
                  {formatCurrency(shoe.price)}
                </h3>
              ) : (
                <h3 className="my-10 text-gray-600 text-xl line-through	">
                  {formatCurrency(shoe.price)}
                </h3>
              )}
              <h3 className="my-10  text-xl text-red-600 ">
                {sale?.discount! > 0 ? `${sale?.discount}% off` : ''}
              </h3>
            </span>
          </div>
          <span className="flex justify-between cursor-pointer text-xl text-gray-400">
            <p>Select size</p>
            <Link to={'/sizeguide'}>
              <p>Size guide</p>
            </Link>
          </span>
          <div className={style.sizes}>
            {shoe?.sizes?.map((item: any, index: number) => {
              return (
                <Button
                  disabled={item.quantity <= 0}
                  onClick={() => {
                    handleClick(index)
                    setSize(item.name)
                  }}
                  key={item.name}
                  className={clsx(
                    style.button,
                    index === activeButton ? 'border-black' : '',
                  )}
                >
                  {item.name}
                </Button>
              )
            })}
          </div>
          <div className="flex flex-col gap-5 justify-center items-center">
            <button
              onClick={() => addToCartt()}
              className="w-[100%] py-4 bg-black font-bold text-white rounded-full hover:bg-opacity-65 "
            >
              Add to Bag
            </button>
            {favItem && state?.user ? (
              <>
                <button
                  className={`w-[100%] py-4 border flex items-center justify-center border-[#CACACB] hover:border-black font-bold  rounded-full hover:bg-opacity-65 `}
                >
                  Favourite
                  <p className="mt-1 px-3">
                    <FaHeart />
                  </p>
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  accessToken ? addToFavv() : navigate('/signin')
                }
                className={`w-[100%] py-4 border flex items-center ${favItem && state?.user ? 'bg-pink-500' : ''} justify-center border-[#CACACB] hover:border-black font-bold  rounded-full hover:bg-opacity-65 `}
              >
                Favourite
                <p className="mt-1 px-3">
                  <CiHeart />
                </p>
              </button>
            )}
          </div>
          <p>{shoe.description}</p>
          <p
            className=" border-b-2 border-b-black w-[170px] font-bold text-lg cursor-pointer hover:opacity-70"
            onClick={() => showModal()}
          >
            View product detail
          </p>
          <Colspace shoe={shoe}></Colspace>

          <ModalCustom
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          >
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <Image width={70} src={shoe.images ? shoe.images[0] : ''} />
                <span>
                  <p>{shoe.name}</p>
                  <p>{shoe.price}</p>
                </span>
              </div>
              <h2 className="text-2xl ">{category?.name}</h2>
              <p>{shoe.description}</p>
              <p>
                <p className="font-bold text-xl mb-3">Benefits</p>
                {shoe.stock_status}
              </p>
            </div>
          </ModalCustom>
        </div>
      </ConfigProvider>
    </>
  )
}

export default InfoShoe
