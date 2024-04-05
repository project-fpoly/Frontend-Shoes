import { Space } from 'antd'
import { IProduct } from '../../../../common/products'
import { formatCurrency } from '../../../../hooks/utils'
import style from './index.module.scss'
import { Link } from 'react-router-dom'

type Props = {
  shoes: IProduct[]
}

const Card = (props: Props) => {
  const { shoes } = props

  return (
    <>
      <div className={style.cardContainer}>
        {shoes.map((item, index) => {
          const discountedPrice = item.sale && typeof item.sale === 'object' && item.sale.discount !== undefined
            ? item.price * (1 - item.sale.discount / 100)
            : item.price;

          return (
            <div key={index + 1} className="mb-28 ">
              <Link className="flex flex-col gap-6" to={`/detail/${item._id}`} style={{ position: 'relative' }}>
                <img
                  className={style.image}
                  src={item.images ? item.images[0] : ''}
                  width={'100%'}
                  alt="Product image"
                />
                <p style={{ fontWeight: 500 }}>{item.name}</p>

                {item.sale && typeof item.sale === 'object' && item.sale.name &&
                  <div style={{ color: 'gray' }}>
                    {item.sale.name}
                  </div>
                }
                <Space>
                  <h2 style={{ fontWeight: 700, marginRight: 10 }}>{formatCurrency(discountedPrice)}</h2>
                  <h2 style={{ textDecoration: 'line-through' }}>{formatCurrency(item.price)}</h2>
                </Space>
                {item.sale && typeof item.sale === 'object' && item.sale.discount !== undefined &&
                  <p style={{ color: 'green', fontWeight: 500 }}>{item.sale.discount}% off</p>
                }
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Card
