import { Card, Col, Space, Typography, notification } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SwiperNavButtons } from './SwiperNavButton'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import Meta from 'antd/es/card/Meta'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'
import './index.css'
import { viewsFilterProducts } from '../../services/productsQuery'
import { IProduct } from '../../common/products'
import { Link } from 'react-router-dom'

const Sport = () => {
  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography className="home_title">Thể thao</Typography>

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

          <SwiperSlide className="" style={{ width: '450px' }}>
            <Col span={8}>
              <div className="mb-5">
                <Card
                  hoverable
                  style={{ width: 450 }}
                  cover={
                    <img
                      alt="example"
                      src={'../../../basketballshoes.jpg'}
                      style={{ maxWidth: '100%', height: '400px' }}
                    />
                  }
                >
                  <Meta
                    className="mb-5"
                    title={'Nike Basketball'}
                    description="Styles made for your game."
                  />
                  <Typography
                    style={{
                      padding: '20px 0 0 0',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    <Link style={{ color: 'black' }} to={''}>
                      <u>Shop</u>
                    </Link>
                  </Typography>
                </Card>
              </div>
            </Col>
          </SwiperSlide>

          <SwiperSlide className="" style={{ width: '450px' }}>
            <Col span={8}>
              <div className="mb-5">
                <Card
                  hoverable
                  style={{ width: 450 }}
                  cover={
                    <img
                      alt="example"
                      src={'../../../golfshoes.jpg'}
                      style={{ maxWidth: '100%', height: '400px' }}
                    />
                  }
                >
                  <Meta
                    className="mb-5"
                    title={'Nike Golf'}
                    description="Conquer any course in style."
                  />
                  <Typography
                    style={{
                      padding: '20px 0 0 0',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    <Link style={{ color: 'black' }} to={''}>
                      <u>Shop</u>
                    </Link>
                  </Typography>
                </Card>
              </div>
            </Col>
          </SwiperSlide>

          <SwiperSlide className="" style={{ width: '450px' }}>
            <Col span={8}>
              <div className="mb-5">
                <Card
                  hoverable
                  style={{ width: 450 }}
                  cover={
                    <img
                      alt="example"
                      src={'../../../trailshoes.jpg'}
                      style={{ maxWidth: '100%', height: '400px' }}
                    />
                  }
                >
                  <Meta
                    className="mb-5"
                    title={'Nike Trail'}
                    description="Gear that leads to wild places."
                  />
                  <Typography
                    style={{
                      padding: '20px 0 0 0',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    <Link style={{ color: 'black' }} to={''}>
                      <u>Shop</u>
                    </Link>
                  </Typography>
                </Card>
              </div>
            </Col>
          </SwiperSlide>

          <SwiperSlide className="" style={{ width: '450px' }}>
            <Col span={8}>
              <div className="mb-5">
                <Card
                  hoverable
                  style={{ width: 450 }}
                  cover={
                    <img
                      alt="example"
                      src={'../../../tennisshoes.jpg'}
                      style={{ maxWidth: '100%', height: '400px' }}
                    />
                  }
                >
                  <Meta
                    className="mb-5"
                    title={'Nike Tennis'}
                    description="Serve up in style."
                  />
                  <Typography
                    style={{
                      padding: '20px 0 0 0',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    <Link style={{ color: 'black' }} to={''}>
                      <u>Shop</u>
                    </Link>
                  </Typography>
                </Card>
              </div>
            </Col>
          </SwiperSlide>

          <SwiperSlide className="" style={{ width: '450px' }}>
            <Col span={8}>
              <div className="mb-5">
                <Card
                  hoverable
                  style={{ width: 450 }}
                  cover={
                    <img
                      alt="example"
                      src={'../../../footballshoes.jpg'}
                      style={{ maxWidth: '100%', height: '400px' }}
                    />
                  }
                >
                  <Meta
                    className="mb-5"
                    title={'Nike Football'}
                    description="Bring mad style to the pitch with the latest gear."
                  />
                  <Typography
                    style={{
                      padding: '20px 0 0 0',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    <Link style={{ color: 'black' }} to={''}>
                      <u>Shop</u>
                    </Link>
                  </Typography>
                </Card>
              </div>
            </Col>
          </SwiperSlide>
        </Swiper>
      </Space>
    </>
  )
}

export default Sport
