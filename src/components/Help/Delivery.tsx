import React from 'react'
import { Button, Form, Input, Space, Typography } from 'antd'
import {
  EnvironmentOutlined,
  MessageOutlined,
  MobileOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title, Paragraph } = Typography

const Delivery: React.FC = () => {
  return (
    <div className="px-20">
      <Space style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography style={{ fontSize: '33px' }} className="home_title">
          HỖ TRỢ
        </Typography>
      </Space>
      <Form.Item
        className="text-black font-bold"
        style={{ width: '30%', margin: '0 auto' }}
      >
        <Input
          className="font-medium border h-12 focus:border-blue-500"
          style={{
            borderColor: 'gray',
            fontSize: '17px',
            borderRadius: '10px',
          }}
          placeholder="Chúng tôi có thể giúp gì cho bạn?"
          suffix={
            <Button
              className="rounded-full btn-primary-dark btn-md"
              htmlType="submit"
              style={{
                border: 'none',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                marginTop: '10px',
              }}
            >
              <SearchOutlined />
            </Button>
          }
        />
      </Form.Item>

      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Space
          direction="vertical"
          style={{ flexBasis: '20%', borderRight: '3px solid #808080' }}
        >
          <h2
            className="main-article-headline headline-1 mb8-sm"
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '28px',
              marginBottom: '10px',
            }}
          >
            How Do I Get Free Delivery on Nike Orders?
          </h2>
          <Space
            direction="vertical"
            style={{ maxWidth: '45%', margin: '0 auto' }}
          >
            <Paragraph
              style={{
                width: '500px',
                textAlign: 'left',
                fontSize: '20px',
                lineHeight: '1.4',
                fontFamily: 'Arial, sans-serif',
                marginLeft: '50%',
              }}
            >
              Standard delivery is free—no promo code necessary—for orders that
              meet a minimum order total before any delivery charges or taxes
              have been applied, and after any discounts have been applied.
              Please refer to our delivery options for additional information.
            </Paragraph>
          </Space>
          <img
            src="https://static.nike.com/a/images/w_1920,c_limit/0bcae285-5832-40cc-93a4-ee6b0b4aac92/how-do-i-get-free-delivery-on-nike-orders-nike-help.jpg"
            alt="Nike delivery"
            style={{ display: 'block', margin: '0 auto', maxWidth: '45%' }}
          />
        </Space>

        <Space direction="vertical" style={{ flexBasis: '36%' }}>
          <Space
            direction="vertical"
            className="mt-10 mb-5"
            style={{ textAlign: 'center' }}
          >
            <Space direction="vertical">
              <MobileOutlined style={{ fontSize: '40px' }} />
              <Link to="">
                <h3>
                  <strong>Products & orders</strong> <br />
                  <strong>12280903 (Viettel)</strong> <br />
                  <strong> 12032487 (VTI)</strong>
                  <br />
                  05:00 - 23:00
                  <br />7 days a week
                </h3>
              </Link>
              <br />
            </Space>
            <Space direction="vertical" style={{ textAlign: 'center' }}>
              <MessageOutlined style={{ fontSize: '40px' }} />
              <Link to="">
                <h3>
                  <strong>Products & orders</strong>
                  <br />
                  Chat with us
                  <br />
                  24 hours a day
                  <br />7 days a week
                </h3>
              </Link>
              <br />
            </Space>
            <Space direction="vertical" style={{ textAlign: 'center' }}>
              <EnvironmentOutlined style={{ fontSize: '40px' }} />
              <Title level={4}>Store locator</Title>
            </Space>
          </Space>
        </Space>
      </Space>
    </div>
  )
}

export default Delivery
