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
          const discountedPrice = item.discount !== undefined ? item.price * (1 - item.discount / 100) : item.price;

          return (
            <div key={index + 1} className="mb-28 ">
              <Link className="flex flex-col gap-6" to={`/detail/${item._id}`} style={{ position: 'relative' }}>
                <img
                  className={style.image}
                  src={item.images ? item.images[0] : ''}
                  width={'100%'}
                  alt="BigCo Inc. logo"
                />
                <p>{item.name}</p>
                <h2 style={{ textDecoration: 'line-through', fontWeight: 500 }}>{formatCurrency(item.price)}</h2>
                <h2 style={{ fontSize: 20, color: 'red', fontWeight: 500 }}>{formatCurrency(discountedPrice)}</h2>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    color: '#000',
                    fontSize: 18,
                    fontWeight: 600,
                    background: '#DDD',
                    padding: 4,
                    borderRadius: '5px 0 5px 10px'
                  }}
                >
                  - {item.discount} %
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Card
