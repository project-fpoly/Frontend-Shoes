import { IProduct } from '../../../common/products'
import { Image } from 'antd'

interface Props {
  shoe: IProduct
}

const Slide = (props: Props) => {
  const { shoe } = props
  return (
    <>
      <div className="w-[300px] lg:w-[60%] ">
        <img src={shoe.images ? shoe.images[0] : ''} />
        <div className="mt-2 grid grid-cols-5 gap-4 ">
          {shoe.images?.map((image, index) => {
            return (
              <>
                <Image key={index + 1} width={100} src={image} />
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Slide
