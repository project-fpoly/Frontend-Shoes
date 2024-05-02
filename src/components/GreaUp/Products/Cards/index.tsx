import { IProduct } from '../../../../common/products'
import { formatCurrency } from '../../../../hooks/utils'
import style from './index.module.scss'
import { Link } from 'react-router-dom'
import { TbMoodEmptyFilled } from 'react-icons/tb'

type Props = {
  shoes: IProduct[]
}
// sale: {
//   _id: '662bcd37666dd926022188ab',
//     name: 'giảm giá nhân ngày 30/4 và 1/5',
//       discount: 23,
//         description: 'tất cả sản phẩm.',
//           expiration_date: '2024-04-29T17:00:00.000Z'
// },
const Card = (props: Props) => {
  const { shoes } = props

  return (
    <>
      {shoes.length === 0 ? (
        <div>
          <div className="w-full flex text-3xl   justify-center items-center mb-[500px]">
            Danh mục này hiện tại chưa có sản phẩm nào{' '}
          </div>
        </div>
      ) : (
        <>
          <div className={style.cardContainer}>
            {shoes?.map((item, index) => {
              return (
                <div key={index + 1} className="mb-0 relative">
                  <Link
                    className="flex flex-col gap-6"
                    to={`/detail/${item._id}`}
                  >
                    <img
                      className={style.image}
                      src={item.images ? item.images[0] : ''}
                      width={'100%'}
                      alt="BigCo Inc. logo"
                    />
                    <p>{item.name}</p>
                    <div className="flex gap-5">
                      <p className="text-xl">
                        {item?.sale ? formatCurrency(item?.priceSale) : ''}
                      </p>
                      {item.sale ? (
                        <h2 className="text-xl line-through">
                          {formatCurrency(item.price)}{' '}
                        </h2>
                      ) : (
                        <h2 className="text-xl">
                          {formatCurrency(item.price)}
                        </h2>
                      )}
                    </div>
                    <p className="text-xl absolute right-5 top-5 text-red-500">
                      {item.sale ? `${item?.sale?.discount} %`! : ''}
                    </p>
                  </Link>
                </div>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

export default Card
