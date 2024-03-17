import { CiSearch } from 'react-icons/ci'
import style from './index.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Fragment, useState } from 'react'
import { searchProductsByKeyword } from '../../../../features/product'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../../redux/store'
import { IStateProduct } from '../../../../common/redux/type'
import { debounce } from 'lodash'
import { IProduct } from '../../../../common/products'
import { Link } from 'react-router-dom'
import { MdOutlineClear } from 'react-icons/md'
import LoadingProduct from '../../../Loading/LoadingProduct'
import LoadingDefault from '../../../Loading/LoadingDefault'

type Inputs = {
  resultSearch: string
  resultSearchRequired: string
}

const Search = ({ setIsModalOpen }: { setIsModalOpen: any }) => {
  const dispact = useDispatch<AppDispatch>()
  const [dataSearch, setData] = useState<IProduct[]>([])
  const shoes = useSelector((state: IStateProduct) => state.product.products)
  const Loading = useSelector((state: IStateProduct) => state.product.loading)
  const { register, handleSubmit, reset } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = ({ resultSearch }) => {
    searchProductsByKeyword(resultSearch)
  }

  const searchInput = (e: any) => {
    debonceSearch(e.target.value)
  }
  const debonceSearch = debounce((data) => {
    if (data !== '') {
      dispact(searchProductsByKeyword(data))
    }
  }, 600)

  return (
    <>
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('resultSearch')}
            onChange={(e) => {
              searchInput(e)
            }}
            className="w-[700px] p-2 px-12 outline-none bg-[#f5f5f5] hover:bg-[#e5e5e5] rounded-full z-10 "
            type="text"
          />
          <button
            type="submit"
            className="cursor-pointer absolute top-[5%] left-0 hover:bg-[#e5e5e5] rounded-full p-2 z-20 "
          >
            <CiSearch size={23} />
          </button>
          <button
            onClick={() => {
              reset()
              setData([])
            }}
            className="cursor-pointer absolute top-[5%] right-[7%] hover:opacity-75 rounded-full p-2 z-20 "
          >
            <MdOutlineClear size={22} />
          </button>
        </form>
      </div>
      <div className={style.resultSearch}>
        {Loading == 'pending' ? <LoadingDefault></LoadingDefault> : ''}
        {shoes && Loading == 'fulfilled' && (
          <div className="flex flex-col gap-2 mt-5">
            {shoes.map((data, index) => {
              return (
                <Fragment key={index + 1}>
                  <Link
                    onClick={() => {
                      setIsModalOpen(false)
                      reset()
                      setData([])
                    }}
                    to={`detail/${data._id}`}
                  >
                    <div className="flex justify-between hover:bg-[#f5f5f5] p-2 rounded-lg">
                      <span>
                        <h2 className="text-black">{data.name}</h2>
                        <p className="text-black">{data.price}</p>
                      </span>
                      {/* <Image preview={false} width={50} src={data.image} /> */}
                    </div>
                  </Link>
                </Fragment>
              )
            })}
          </div>
        )}
        {!dataSearch && <div>hehe</div>}
      </div>
    </>
  )
}

export default Search
