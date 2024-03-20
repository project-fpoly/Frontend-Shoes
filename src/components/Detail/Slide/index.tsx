import { IProduct } from '../../../common/products'
import { Image } from 'antd'

interface Props {
  shoe: IProduct
}

const Slide = (props: Props) => {
  const { shoe } = props
  return (
    <div className='lg:w-[60%] w-full'>
      <Image
        className="rounded-lg"
        // width={553}
        // height={668}
        // width='100%'
        preview={false}
        src={shoe.images ? shoe.images[0] : ''}
      />
    </div>
  )
}

export default Slide
