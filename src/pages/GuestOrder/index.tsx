import { SearchOutlined } from '@ant-design/icons'
import { Card, Image, Descriptions, Row, Col, Table } from 'antd'
import moment from 'moment'
import Search from 'antd/es/input/Search'
import Title from 'antd/es/typography/Title'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchOneOrder } from '../../features/order/index'
import { IStateProduct } from '../../common/redux/type'

const GuestOrder = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [value, setValue] = useState<string>('')
  const orders = useSelector((state: RootState) => state.order.orders)
  const ord = useSelector((state: RootState) => state.order)
  console.log(ord)
  const { products } = useSelector((state: IStateProduct) => state.product)
  const getProductName = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId)
    return product ? product.name : 'N/A'
  }

  useEffect(() => {
    dispatch(fetchOneOrder(value as any))
  }, [value, orders?.length > 0])
  const handleSearch = (value: string) => {
    setValue(value)
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
      {orders?.length > 0 ? (
        orders.map((order: any) => (
          <Card title="Order" style={{ width: '100%' }} className="mt-10">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Tracking number">
                {order.trackingNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Delivered">
                {order.isDelivered}
              </Descriptions.Item>
              <Descriptions.Item label="Product">
                {order.cartItems?.map((cartItem: any) => (
                  <>
                    <div className="flex items-center">
                      <div>
                        {' '}
                        {getProductName(cartItem.product)} - Size:
                        {' ' + cartItem.size} - Quantity:
                        {' ' + cartItem.quantity}
                      </div>
                      <img src={cartItem.images[0]} className="w-64 mx-auto" />
                    </div>
                  </>
                ))}
              </Descriptions.Item>

              <Descriptions.Item label="Shipping Address">
                <Row gutter={16}>
                  <Col span={12}>Name: {order?.shippingAddress?.fullname}</Col>
                  <Col span={12}>Email: {order?.shippingAddress?.email}</Col>
                  <Col span={12}>
                    Address: {order?.shippingAddress?.address}
                  </Col>
                  <Col span={12}>
                    Phone number: {order?.shippingAddress?.phone}
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Total">
                {order.totalPrice}
              </Descriptions.Item>
              <Descriptions.Item label="Paid">
                {!order.isPaid ? 'Chưa thanh toán' : 'Đã thanh toán'}
              </Descriptions.Item>

              <Descriptions.Item label="Order Creation Time">
                {moment(order.createdAt).format('DD/MM/YYYY')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ))
      ) : (
        <div className="mt-10 text-[#ccc]">
          Enter your tracking number to view your order...
        </div>
      )}
    </div>
  )
}

export default GuestOrder
