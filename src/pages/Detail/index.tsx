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
import {
  fetchAllComment,
  fetchAllCommentByProduct,
} from '../../features/comment'
import LoadingBar from 'react-top-loading-bar'

const DetailShoe = () => {
  const dispatch = useDispatch<AppDispatch>()
  const shoe = useSelector((state: IStateProduct) => state.product.product)
  const shoes = useSelector((state: IStateProduct) => state.product.products)
  const commnets = useSelector((state: IStateCmt) => state.comment.comments)
  const Loading = useSelector((state: IStateProduct) => state.product.loading)
  const category = useSelector((state: IStateProduct) => state.product.category)
  const { id } = useParams()
  useEffect(() => {
    dispatch(fetchProductById(id!))
    dispatch(fetchAllCommentByProduct(id!))
  }, [dispatch])
  console.log(shoe)

  if (Loading === 'pending') {
    return (
      <div className="flex justify-center items-center mt-36">
        <LoadingProduct></LoadingProduct>
      </div>
    )
  }

  return (
    <>
      <div className="lg:flex justify-center mt-20 lg:mx-[200px] mx-4 gap-20">
        <Slide shoe={shoe}></Slide>
        <InfoShoe shoe={shoe} category={category}></InfoShoe>
      </div>
      <div className="mt-10 px-10">
        <SlideAlso shoes={shoes}></SlideAlso>
      </div>
      <LoadingBar color="black" progress={Loading === 'fullfiled' ? 0 : 100} />
    </>
  )
}

export default DetailShoe
