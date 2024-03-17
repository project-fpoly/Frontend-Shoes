import { useSwiper } from 'swiper/react'
import { GrPrevious } from 'react-icons/gr'
import { GrNext } from 'react-icons/gr'

export const SwiperNavButtons = () => {
  const swiper = useSwiper()

  return (
    <div className="swiper-nav-btns">
      <button onClick={() => swiper.slidePrev()}>
        <GrPrevious className="ml-3 text-2xl" />
      </button>
      <button onClick={() => swiper.slideNext()}>
        <GrNext className="ml-3 text-2xl" />
      </button>
    </div>
  )
}
