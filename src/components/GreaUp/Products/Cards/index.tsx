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
          return (
            <div key={index + 1} className="mb-28 ">
              <Link className="flex flex-col gap-6" to={`/detail/${item._id}`}>
                <img
                  className={style.image}
                  src={item.images ? item.images[0] : ''}
                  width={'100%'}
                  alt="BigCo Inc. logo"
                />
                <p>{item.name}</p>
                <h2>{formatCurrency(item.price)}</h2>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Card
