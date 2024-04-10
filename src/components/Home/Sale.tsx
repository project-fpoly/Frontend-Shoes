import { Card, Space, Typography, notification } from 'antd'
import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { IProduct } from '../../common/products'
import { saleFilterProducts } from '../../services/productsQuery'
import './index.css'
import { Link } from 'react-router-dom'

const Sale = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await saleFilterProducts(10, 'desc_sale')
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
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography className="home_title">Are On Sale</Typography>

      <Carousel responsive={responsive}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          products.map((item, index) => (
            <Link key={index + 1} to={`/detail/${item._id}`}>
              <Card
                onDragStart={(event) => event.preventDefault()}
                key={index}
                hoverable
                style={{ width: 260 }}
                cover={
                  <img
                    alt="Product"
                    src={item.images ? item.images[0] : ''}
                    style={{ height: 250 }}
                    onClick={(e) => e.stopPropagation()}
                  />
                }
              >
                <Card.Meta title={item.name} />
              </Card>
            </Link>
          ))
        )}
      </Carousel>
    </Space>
  )
}

export default Sale
