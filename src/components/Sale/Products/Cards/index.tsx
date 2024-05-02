import { Space } from 'antd'
import { IProduct } from '../../../../common/products'
import { discountcurrency, formatCurrency } from '../../../../hooks/utils'
import style from './index.module.scss'
import { Link } from 'react-router-dom'

type Props = {
  shoes: IProduct[]
}

const Card = (props: Props) => {
  const { shoes } = props

  return (
    <div className={style.cardContainer}>
      {shoes.map((item, index) => {
        if (typeof item.sale === 'object' && item.sale !== null) {
          const { name, discount } = item.sale

          if (typeof discount === 'number') {
            return (
              <div key={index + 1} className="mb-10">
                <Link
                  className="flex flex-col gap-6"
                  to={`/detail/${item._id}`}
                  style={{ position: 'relative' }}
                >
                  <img
                    className={style.image}
                    src={item.images ? item.images[0] : ''}
                    width={'100%'}
                    alt="Product image"
                  />
                  <p style={{ fontWeight: 500 }}>{item.name}</p>

                  {name && <div style={{ color: 'gray' }}>{name}</div>}

                  <Space>
                    {item.sale && item.sale.discount ? (
                      <>
                        <h2 style={{ fontWeight: 700, marginRight: 10 }}>
                          {formatCurrency(
                            discountcurrency(item.price, item.sale.discount),
                          )}
                        </h2>
                        <h2 style={{ textDecoration: 'line-through' }}>
                          {formatCurrency(item.price)}
                        </h2>
                      </>
                    ) : (
                      <h2 style={{ fontWeight: 700, marginRight: 10 }}>
                        {formatCurrency(item.price)}
                      </h2>
                    )}
                  </Space>

                  {/* Hiển thị phần trăm giảm giá */}
                  {discount && (
                    <p
                      className="absolute right-2 top-2"
                      style={{ color: 'red', fontWeight: 500 }}
                    >
                      {discount}% off
                    </p>
                  )}
                </Link>
              </div>
            )
          }
        }
        return null
      })}
    </div>
  )
}

export default Card
