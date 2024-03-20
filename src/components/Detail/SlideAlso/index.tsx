import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Navigation, Pagination } from 'swiper/modules'
import { IProduct } from '../../../common/products'
import { Link } from 'react-router-dom'
import style from './index.module.scss'
import { formatCurrency } from '../../../hooks/utils'
interface Props {
  shoes: IProduct[]
}
const SlideAlso = ({ shoes }: Props) => {
  return (
    <>
      <h1 className="my-5 text-4xl font-medium">You Might Also Like</h1>
      <Swiper
        breakpoints={{
          576: {
            // width: 576,
            slidesPerView: 2,
          },
          1024: {
            // width: 768,
            slidesPerView: 3,
          },
        }}
        spaceBetween={28}
        pagination={false}
        modules={[FreeMode, Pagination, Navigation]}
        className={style.swiper}
        navigation={true}
      >
        {shoes.map((shoe, index) => {
          return (
            <SwiperSlide className="mb-10 flex flex-col" key={index + 1}>
              <Link to={`/detail/${shoe._id}`}>
                <img
                  className="rounded-lg"
                  src={'/src/assets/air-jordan-1-low-se-shoes-ZbxSRp.jpg'}
                  alt="BigCo Inc. logo"
                />
                <h2 className="font-bold">{shoe.name}</h2>
                <p>{formatCurrency(shoe.price)}</p>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
export default SlideAlso
