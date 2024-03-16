import { IProduct } from '../../../common/products'
import { Image } from 'antd'

interface Props {
  shoe: IProduct
}

const Slide = (props: Props) => {
  const { shoe } = props
  return (
    <>
      <Image
        className="rounded-lg"
        width={553}
        height={668}
        preview={false}
        src={shoe.images ? shoe.images[0] : ''}
      />
    </>
  )
}

export default Slide
