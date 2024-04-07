import { IProduct } from '../../../../common/products'
import { formatCurrency } from '../../../../hooks/utils'
import style from './index.module.scss'
import { Link } from 'react-router-dom'
import { TbMoodEmptyFilled } from "react-icons/tb";

type Props = {
  shoes: IProduct[]
}

const Card = (props: Props) => {
  const { shoes } = props
  return (
    <>

      {shoes.length === 0 ? (
        <div>
          <div className='w-full flex text-3xl   justify-center items-center mb-[500px]'>Danh mục này hiện tại chưa có sản phẩm nào </div>
        </div>
      ) : (
        <>
          <div className={style.cardContainer}>

            {shoes?.map((item, index) => {
              return (
                <div key={index + 1} className="mb-0">
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
      )}

    </>
  )
}

export default Card
