import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductById } from '../../features/product'
import { AppDispatch } from '../../redux/store'
import InfoShoe from '../../components/Detail/InfoShoe'
import Slide from '../../components/Detail/Slide'
import { IStateCmt, IStateProduct } from '../../common/redux/type'
import LoadingProduct from '../../components/Loading/LoadingProduct'
import SlideAlso from '../../components/Detail/SlideAlso'
import { fetchAllCommentByProduct } from '../../features/comment'
import LoadingBar from 'react-top-loading-bar'
import { scrollToTop } from '../../hooks/utils'

const DetailShoe = () => {
  const dispatch = useDispatch<AppDispatch>()
  const shoe = useSelector((state: IStateProduct) => state.product.product)
  const shoes = useSelector((state: IStateProduct) => state.product.products)
  const Loading = useSelector((state: IStateProduct) => state.product.loading)
  const category = useSelector((state: IStateProduct) => state.product.category)
  const { id } = useParams()
  useEffect(() => {
    dispatch(fetchProductById(id!))
    dispatch(fetchAllCommentByProduct(id!))
    scrollToTop()
  }, [dispatch, id])
  if (Loading === 'as') {
    return (
      <div className="flex justify-center items-center mt-36">
        <LoadingProduct></LoadingProduct>
      </div>
    )
  }

  return (
    <>
      {shoe ?
        <>
          <div className="flex flex-col items-center lg:items-start lg:flex-row justify-center mt-0 lg:mt-20 lg:mx-[200px] mx-4 gap-5 lg:gap-20">
            <Slide shoe={shoe}></Slide>
            <InfoShoe shoe={shoe} category={category}></InfoShoe>
          </div>
          <div className="mt-10 px-10">
            <SlideAlso shoes={shoes}></SlideAlso>
          </div>
          <LoadingBar color="black" progress={Loading === 'fullfiled' ? 0 : 100} />

        </>
        :
        <>
          <div className=' grid place-items-center'>
            <div className='flex gap-5'>
              <p className='text-2xl '>404</p>
              <div className='border-r border-gray-500 border-solid'></div>
              <p className='text-2xl'>This page could not be found.</p>
            </div>
          </div>
        </>}
    </>
  )
}

export default DetailShoe
