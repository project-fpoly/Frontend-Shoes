import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { removeFromFav, getFavItems } from '../../features/favourite'
import { AppDispatch } from '../../redux/store'
import { fetchAllProducts } from '../../features/product'
import { Link } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'
const Favourite = () => {
  const dispatch = useDispatch<AppDispatch>()

  const state = useSelector((state: any) => state.fav.favItems.fav)
  const favs = useSelector((state: any) => state.fav.favItems.fav?.favItems)
  const { products } = useSelector((state: any) => state.product)
  const getProductName = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId)
    return product ? product.name : 'N/A'
  }
  const getCateName = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId)
    return product ? product.categoryId.name : 'N/A'
  }
  const getDesName = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId)
    return product ? product.description : 'N/A'
  }
  console.log(state)
  useEffect(() => {
    dispatch(getFavItems())
    dispatch(fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: '' }))
  }, [state?.user])
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Team
          </h2>
          <p className=" text-gray-500 lg:mb-16 sm:text-2xl font-bold uppercase dark:text-gray-400">
            Your favorite products list
          </p>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {favs &&
            state?.user &&
            favs?.map((item: any, index: number) => (
              <div
                key={index}
                className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
              >
                <Link to={`/detail/${item.product}`} className="w-72 h-60">
                  <img
                    className="w-full h-full rounded-lg sm:rounded-none sm:rounded-l-lg pl-5"
                    src={item.images[0]}
                    alt="Bonnie Avatar"
                  />
                </Link>
                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <Link to={`/detail/${item.product}`}>
                      {getProductName(item.product)}
                    </Link>
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400">
                    {getCateName(item.product)}
                  </span>
                  <p className="mt-3 mb-4 font-light w-80 h-44 text-gray-500 dark:text-gray-400 overflow-ellipsis overflow-hidden">
                    {getDesName(item.product)}
                  </p>
                </div>
                <div
                  className="self-start pr-5 pt-5 cursor-pointer"
                  onClick={() => dispatch(removeFromFav(item.product))}
                >
                  <CloseOutlined className="text-white" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
export default Favourite
