import { ICategory } from '../../../common/category'
import { IProduct } from '../../../common/products'
import style from './index.module.scss'
import clsx from 'clsx'
import ModalCustom from '../../Modal'
import { useState } from 'react'
import { Image, notification, Button, ConfigProvider, Alert } from 'antd'
import Colspace from './Colspace'
import { Link } from 'react-router-dom'
import { CiHeart } from 'react-icons/ci'
import usesessionStorage from '../../../hooks'
import { addToCart } from '../../../features/cart'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import ModalCart from '../../Modal/modalCart'
type NotificationType = 'success' | 'info' | 'warning' | 'error'

interface Props {
  shoe: any
  category: ICategory
}
const InfoShoe = (props: Props) => {
  const { shoe, category } = props
  const [size, setSize] = useState('')
  const [activeButton, setActiveButton] = useState(null)
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpenCart, setIsModalOpenCart] = useState(false)

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

  ;<Alert message="Success Tips" type="success" showIcon />

  const [cart, setCart] = usesessionStorage<{ cartItems: IProduct[] }>('cart', {
    cartItems: [],
  })

  const { _id: product, sizes, color, images, price, ...shoeCart } = shoe

  const accessToken = localStorage.getItem('accessToken')

  const addToCartt = () => {
    if (!size) return openNotification('error')
    const cartItem = { product, size: size }
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
          price,
          quantity: 1,
        })
      }
    }

    ;<Alert
      message="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    />
  }
  const storedData = localStorage.getItem('cart')
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
            <p>{category.name}</p>
            <h3 className="my-10 text-xl">{shoe.price}</h3>
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
            <button className="w-[100%] py-4 border flex items-center justify-center border-[#CACACB] hover:border-black font-bold  rounded-full hover:bg-opacity-65 ">
              Favourite
              <p className="mt-1 px-3">
                <CiHeart />
              </p>
            </button>
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
                <Image width={70} src={shoe?.images!} />
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
          <ModalCart
            isModalOpenCart={isModalOpenCart}
            setIsModalOpenCart={setIsModalOpenCart}
          >
            <div></div>
            <div className="flex gap-5">
              {' '}
              <button>cc</button>
              <button>csadsac</button>
            </div>
          </ModalCart>
        </div>
      </ConfigProvider>
    </>
  )
}

export default InfoShoe
