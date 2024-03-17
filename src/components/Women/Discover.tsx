import { Card, Col, Space, Typography, notification } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SwiperNavButtons } from './SwiperNavButton'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import Meta from 'antd/es/card/Meta'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'
import { viewsFilterProducts } from '../../services/productsQuery'
import { IProduct } from '../../common/products'
import { Link } from 'react-router-dom'

const Discover = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await viewsFilterProducts(10, 'desc_views')
        setProducts(data.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        notification.error({
          message: 'Error',
          description: 'Failed to fetch products.',
        })
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography className="home_title">Discover</Typography>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={30}
          slidesPerView="auto"
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          <div style={{ float: 'right' }} className="flex items-center">
            <SwiperNavButtons />
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            products.map((item, index) => (
              <SwiperSlide key={index} className="" style={{ width: '450px' }}>
                <Col span={8}>
                  <div className="mb-5">
                    <Link to={`/detail/${item._id}`}>
                      <Card
                        hoverable
                        style={{ width: 450 }}
                        cover={
                          <img
                            alt="example"
                            src={item.images ? item.images[0] : ''}
                            style={{ maxWidth: '100%', height: '270px' }}
                          />
                        }
                      >
                        <Meta title={item.name} />
                      </Card>
                    </Link>
                  </div>
                </Col>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </Space>
    </>
  )
}

export default Discover
