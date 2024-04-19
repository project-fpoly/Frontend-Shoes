/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Image, Descriptions, Row, Col, Table } from 'antd'
import { CartItem, IBill } from '../../../common/order'
import moment from 'moment'
import {} from '../../../common/redux/type'
import { IUsers } from '../../../common/users'
import { ColumnsType } from 'antd/es/table'

const DetailOrder = (order: IBill, products: any, users: IUsers) => {
  // const { users } = useSelector((state: IUsers) => state.user);
  const getProductName = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId)
    return product ? product.name : 'N/A'
  }
  console.log(order)
  const getUserName = (userId: string) => {
    const user = users.find((user: IUsers) => user._id === userId)
    return user ? user.userName : 'Khách'
  }
  console.log(order)
  const { cartItems } = order
  console.log(cartItems)
  const quantity = order.cartItems.map((item) => item.quantity)
  const { fullname, address, email, phone } = order.shippingAddress
  const columns: ColumnsType<CartItem> = [
    {
      title: 'Product Name',
      dataIndex: 'product',
      render: (product: string) => getProductName(product),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      align: 'center',
    },
    {
      title: 'Image',
      dataIndex: 'images',
      render: (images) => {
        return <img className="w-28 h-28 " src={images[0]} />
      },
      className: 'flex items-center gap-x-2  justify-center',
      align: 'center',
    },
  ]
  return (
    <>
      <Card title="Order Details" style={{ width: '100%' }}>
        <Table
          dataSource={cartItems}
          columns={columns}
          rowKey="_id"
          pagination={false}
        />

        <Descriptions column={1} bordered>
          <Descriptions.Item label="Tracking number">
            {order.trackingNumber}
          </Descriptions.Item>

          <Descriptions.Item label="User Name">
            {order.user ? getUserName(order.user) : 'Khách'}
          </Descriptions.Item>
          <Descriptions.Item label="Shipping Address">
            <Row gutter={16}>
              <Col span={12}>Name: {fullname}</Col>
              <Col span={12}>Email: {email}</Col>
              <Col span={12}>Address: {address}</Col>
              <Col span={12}>Phone number: {phone}</Col>
            </Row>
          </Descriptions.Item>
          <Descriptions.Item label="Total">
            {order.totalPrice}
          </Descriptions.Item>
          <Descriptions.Item label="Paid">
            {!order.isPaid ? 'Chưa thanh toán' : 'Đã thanh toán'}
          </Descriptions.Item>
          <Descriptions.Item label="Delivered">
            {order.isDelivered}
          </Descriptions.Item>
          <Descriptions.Item label="Voucher">
            {order.voucher ? order.voucher : 'không có mã giảm giá'}
          </Descriptions.Item>
          <Descriptions.Item label="Order Creation Time">
            {moment(order.createdAt).format('DD/MM/YYYY')}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  )
}

export default DetailOrder
