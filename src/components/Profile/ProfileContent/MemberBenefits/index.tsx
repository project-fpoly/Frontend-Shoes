import { Card, Space, Typography, notification } from 'antd'
import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from 'react-router-dom'

const MemberBenefits = () => {
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

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography className="home_title">Member benefits</Typography>
      <Carousel responsive={responsive}>
        <Card
          onDragStart={(event) => event.preventDefault()}
          hoverable
          style={{ width: 260 }}
          cover={
            <img
              alt="Product"
              src={'/src/assets/benefit1.jpg'}
              style={{ height: 250, width: 300 }}
              onClick={(e) => e.stopPropagation()}
            />
          }
        >
        </Card>
        <Card
          onDragStart={(event) => event.preventDefault()}
          hoverable
          style={{ width: 260 }}
          cover={
            <img
              alt="Product"
              src={'/src/assets/benefit2.jpg'}
              style={{ height: 250, width: 300 }}
              onClick={(e) => e.stopPropagation()}
            />
          }
        >
        </Card>
        <Card
          onDragStart={(event) => event.preventDefault()}
          hoverable
          style={{ width: 260 }}
          cover={
            <img
              alt="Product"
              src={'/src/assets/benefit3.jpg'}
              style={{ height: 250, width: 300 }}
              onClick={(e) => e.stopPropagation()}
            />
          }
        >
        </Card>
        <Card
          onDragStart={(event) => event.preventDefault()}
          hoverable
          style={{ width: 260 }}
          cover={
            <img
              alt="Product"
              src={'/src/assets/benefit4.jpg'}
              style={{ height: 250, width: 300 }}
              onClick={(e) => e.stopPropagation()}
            />
          }
        >
        </Card>
        <Card
          onDragStart={(event) => event.preventDefault()}
          hoverable
          style={{ width: 260 }}
          cover={
            <img
              alt="Product"
              src={'/src/assets/benefit5.jpg'}
              style={{ height: 250, width: 300 }}
              onClick={(e) => e.stopPropagation()}
            />
          }
        >
        </Card>
      </Carousel>
    </Space>
  )
}

export default MemberBenefits
