import { GrTransaction } from 'react-icons/gr'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import { IProduct } from '../../../common/products'
import Card from './Cards'
interface Props {
  shoes: IProduct[]
  hideFilter: boolean
  setHideFilter: any
}

const ListProduct = (props: Props) => {
  const { shoes } = props

  return (
    <>
      <div className="">
        <Card shoes={shoes} />
      </div>
    </>
  )
}

export default ListProduct
