import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../features/product'
import { AppDispatch } from '../../redux/store'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { IStateProduct } from '../../common/redux/type'
const Demo = () => {
  const dispact = useDispatch<AppDispatch>()
  const shoes = useSelector((state: IStateProduct) => state.product.products)

  console.log(shoes)

  useEffect(() => {
    dispact(fetchAllProducts())
  }, [])

  return (
    <>
      <div>
        <InfiniteScroll
          pageStart={0}
          hasMore={false}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
        >
          {shoes}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default Demo
