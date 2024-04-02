import { SearchOutlined } from '@ant-design/icons'
import { Card, Image, Descriptions, Row, Col, Table } from 'antd'
import moment from 'moment'
import Search from 'antd/es/input/Search'
import Title from 'antd/es/typography/Title'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchOneOrder } from '../../features/order/index'
import { IStateProduct } from '../../../common/redux/type'

type IProps = {
  showModal: () => void
  name: string
  onSubmitt: (value: string) => void
}
const GuestOrder = (props: IProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [value, setValue] = useState('a')
  const orders = useSelector((state: RootState) => state.order.orders)
  const { products } = useSelector((state: IStateProduct) => state.product)

  const getProductName = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId)
    return product ? product.name : 'N/A'
  }

  useEffect(() => {
    dispatch(fetchOneOrder(value))
  }, [value])
  const handleSearch = (value: string) => {
    setValue(value)
    // props.onSubmitt(value)
  }
  return (
    <div className="mt-[100px] w-[60%] mx-auto">
      <Title level={3}> Search for orders</Title>

      <Search
        placeholder="input search text"
        onSearch={handleSearch}
        enterButton={
          <>
            <SearchOutlined className=" text-white hover:text-white" />
          </>
        }
        size="large"
      />
      {orders?.trackingNumber === value ? (
        <Card title="Order" style={{ width: '100%' }} className="mt-10">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Tracking number">
              {orders.trackingNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Delivered">
              {orders.isDelivered}
            </Descriptions.Item>
            <Descriptions.Item label="Product Name">
              {orders.cartItems?.map((cartItem: any) => (
                <>
                  {' '}
                  {getProductName(cartItem.product)} - Size:
                  {' ' + cartItem.size} - Quantity:
                  {' ' + cartItem.quantity}
                </>
              ))}
            </Descriptions.Item>

            <Descriptions.Item label="Image" className=" text-center">
              {orders.cartItems?.map((cartItem: any) => (
                <img src={cartItem.images[0]} className="w-96 mx-auto" />
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Shipping Address">
              <Row gutter={16}>
                <Col span={12}>Name: {orders?.shippingAddress?.fullname}</Col>
                <Col span={12}>Email: {orders?.shippingAddress?.email}</Col>
                <Col span={12}>Address: {orders?.shippingAddress?.address}</Col>
                <Col span={12}>
                  Phone number: {orders?.shippingAddress?.phone}
                </Col>
              </Row>
            </Descriptions.Item>
            <Descriptions.Item label="Total">
              {orders.totalPrice}
            </Descriptions.Item>
            <Descriptions.Item label="Paid">
              {!orders.isPaid ? 'Chưa thanh toán' : 'Đã thanh toán'}
            </Descriptions.Item>

            <Descriptions.Item label="Order Creation Time">
              {moment(orders.createdAt).format('DD/MM/YYYY')}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ) : (
        <div className="mt-10 text-[#ccc]">
          Enter your tracking number to view your order...
        </div>
      )}
    </div>
  )
}

export default GuestOrder
