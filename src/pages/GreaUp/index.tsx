import { useEffect, useState } from 'react'
import ListProduct from '../../components/GreaUp/Products'
import Sidebar from '../../components/GreaUp/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import {
  featchProductByRelase,
  fetchAllProducts,
  fetchProductsByPriceLowOrHight,
} from '../../features/product'
import { AppDispatch } from '../../redux/store'
import { IStateProduct } from '../../common/redux/type'
import { Select } from 'antd'
import { GrTransaction } from 'react-icons/gr'
import clsx from 'clsx'
import LoadingSkelethon from '../../components/Loading/LoadingSkelethonProduct'
import LoadingBar from 'react-top-loading-bar'
import { scrollToTop } from '../../hooks/utils'

const GreaUp = () => {
  const dispact = useDispatch<AppDispatch>()
  const shoes = useSelector((state: IStateProduct) => state.product.products)
  const loading = useSelector((state: IStateProduct) => state.product.loading)
  useEffect(() => {
    scrollToTop()
    dispact(fetchAllProducts({ page: 1, pageSize: 100, searchKeyword: '' }))
    document.title = 'Greaup'
  }, [])

  const handleChange = (value: string) => {
    switch (value) {
      case 'Newest':
        dispact(featchProductByRelase('desc_release_date'))
        break
      case 'Oldest':
        dispact(featchProductByRelase('asc_release_date'))
        break
      case 'High-Low':
        dispact(fetchProductsByPriceLowOrHight('desc'))
        break
      case 'Low-High':
        dispact(fetchProductsByPriceLowOrHight('asc'))
        break
      default:
        break
    }
  }
  const [hideFilter, setHideFilter] = useState<boolean>(false)
  return (
    <>
      <span className={clsx('flex gap-5  justify-end mr-5 mb-5   z-20')}>
        <p
          onClick={() => setHideFilter(!hideFilter)}
          className="flex gap-2 cursor-pointer "
        >
          {hideFilter ? 'Ẩn lọc' : 'Hiện lọc'}
          <button style={{ backgroundColor: 'transparent' }}>
            <GrTransaction className="" size={20} />
          </button>
        </p>

        <button style={{ backgroundColor: 'transparent' }}>Sắp xếp theo :</button>
        <Select
          defaultValue="Lựa chọn"
          style={{ width: 150 }}
          onChange={handleChange}
          options={[
            {
              value: 'Newest',
              label: 'Mới nhất',
            },
            {
              value: 'Oldest',
              label: 'Cũ nhất',
            },
            {
              value: 'High-Low',
              label: 'Giá: Cao nhất',
            },
            {
              value: 'Low-High',
              label: 'Giá: Thấp nhất',
            },
          ]}
        />
      </span>
      <div className="flex  mx-10 justify-center">
        <div className="w-[auto] ">
          <Sidebar hideFilter={hideFilter} />
        </div>

        {loading === 'pending' ? (
          <>
            <div className="flex justify-center items-center mt-16">
              <LoadingSkelethon></LoadingSkelethon>
            </div>
          </>
        ) : (
          <>
            <div className="w-[100%]  ">
              <ListProduct
                shoes={shoes}
                hideFilter={hideFilter}
                setHideFilter={setHideFilter as any}
              ></ListProduct>
            </div>
          </>
        )}
      </div>
      <LoadingBar color="black" progress={loading === 'fullfiled' ? 0 : 100} />
    </>
  )
}

export default GreaUp
