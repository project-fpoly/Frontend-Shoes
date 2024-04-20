/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, DatePicker, Modal, Select, Table, Tag, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  RocketOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { CartItem, IBill } from '../../../common/order'
import { AppDispatch, RootState } from '../../../redux/store'
import { ColumnsType } from 'antd/es/table'
import {
  deleteOrder,
  fetchOrders,
  updateOrder,
  SearchOrder,
} from '../../../features/order'
import FormOrder from '../../../components/Admin/Order/FormOrder'
import moment from 'moment'
import { IStateProduct } from '../../../common/redux/type'
import { IUsers } from '../../../common/users'
import DetailOrder from '../../../components/Admin/Order/DetailOrder'
import FormUpdateMany from '../../../components/Admin/Order/FormUpdateMany'
import HeaderTableAdminOrder from '../../../components/Admin/Layout/HeaderTableAdminOrder'
const OrderManager = (data: any) => {
  const orders = data.data
  const pagination = data.pagi
  const key = data.tabKey
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [order, setOrder] = useState<IBill>()
  const [dayStart, setDayStart] = useState(null)
  const [dayEnd, setDayEnd] = useState(null)
  const [Search, setSearch] = useState(null)
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectedOrder, setSelectedOrder] = useState<IBill | null>(null)
  const [loading, setLoading] = useState(false)
  const { isLoading } = useSelector((state: RootState) => state.order)
  const { products } = useSelector((state: IStateProduct) => state.product)
  const { users } = useSelector((state: IUsers) => state.user)
  useEffect(() => {
    console.log(currentPage)
    dispatch(
      fetchOrders({
        page: currentPage,
        limit: 10,
        search: Search,
        start: dayStart,
        end: dayEnd,
        key: key,
      }),
    )
  }, [dispatch, currentPage, pageSize, Search, dayStart, dayEnd])
  const toggleModal = (orders: IBill) => {
    setIsModalUpdateOpen(!isModalUpdateOpen)
    setOrder(orders)
  }
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
    dispatch(
      fetchOrders({
        page: page,
        limit: pageSize,
        search: Search,
        start: dayStart,
        end: dayEnd,
        key: key,
      }),
    )
  }
  const handleUpdateOrder = async (updateOrderData: any) => {
    await dispatch(updateOrder({ id: order?._id as string, updateOrderData }))

    setIsModalUpdateOpen(false)
  }
  const deleteOneOrder = async (order: IBill) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this order?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',

      async onOk() {
        await dispatch(deleteOrder(order._id as string))
      },
      onCancel() {},
    })
  }
  const getProductName = (shoeId: string) => {
    const product = products.find((product) => product._id === shoeId)
    return product ? product.name : 'N/A'
  }
  const getUserName = (userId: string) => {
    const user = users.find((user: IUsers) => user._id === userId)
    return user ? user.userName : 'Khách'
  }
  const handleRowClick = (order: IBill) => {
    setSelectedOrder(order)
    setModalVisible(true)
  }
  const closeModal = () => {
    setSelectedOrder(null)
    setModalVisible(false)
  }
  const handleUpdateManyOrder: () => void = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  const getIsDelivered = (orderId: string) => {
    const order = orders.find((order: IBill) => order._id === orderId)
    return order ? order.isDelivered : ''
  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
    return newSelectedRowKeys
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const hasSelected = selectedRowKeys.length > 0
  const columns: ColumnsType<IBill> = [
    {
      title: 'No.',
      dataIndex: 'index',
      render: (_, __, index) => index + 1,
      align: 'center',
    },

    {
      title: 'Items',
      dataIndex: 'cartItems',
      render: (cartItems) => (
        <span key={cartItems._id}>
          {cartItems.map((cartItem: CartItem, index: number) => (
            <div className="my-2" key={index}>
              {getProductName(cartItem.product)} - {cartItem.quantity}
            </div>
          ))}
        </span>
      ),
      align: 'center',
    },
    {
      title: 'User',
      dataIndex: 'user',
      render: (user) => <span>{getUserName(user)}</span>,
      align: 'center',
    },
    {
      title: 'Shipping address',
      dataIndex: 'shippingAddress',
      render: (shippingAddress) => (
        <span>
          <>
            <div>
              <b>Full Name:</b> {shippingAddress.fullname}
            </div>
            <div>
              <b>Address:</b> {shippingAddress.address}
            </div>
            <div>
              <b>Email:</b> {shippingAddress.email}
            </div>
            <div>
              <b>Phone Number:</b>
              {shippingAddress.phone}
            </div>
          </>
        </span>
      ),
    },
    {
      title: 'Payment meothod',
      dataIndex: 'payment_method',
      align: 'center',
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      align: 'center',
    },
    {
      title: 'Is paid',
      dataIndex: 'isPaid',
      align: 'center',
      render: (isPaid) => (
        <span>{isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
      ),
    },
    {
      title: 'Create at',
      dataIndex: 'createdAt',
      align: 'center',
      render: (createdAt) => (
        <span>{moment(createdAt).format('DD/MM/YYYY')}</span>
      ),
    },
    {
      title: 'Is Delivered',
      dataIndex: 'isDelivered',
      align: 'center',
      className: 'action-cell',

      render: (isDelivered: string, item) => {
        return (
          <span>
            {
              <Select
                className="min-w-52 text-center border-none focus:ring-0 outline-none"
                onChange={(value) =>
                  dispatch(
                    updateOrder({
                      id: item?._id as string,
                      updateOrderData: {
                        isDelivered: value,
                      },
                    }),
                  )
                }
                value={isDelivered}
              >
                {isDelivered === 'Chờ xác nhận' && (
                  <>
                    <Select.Option className="action-cell" value="Chờ lấy hàng">
                      <Tag icon={<SyncOutlined spin />} color="purple">
                        Chờ lấy hàng
                      </Tag>
                    </Select.Option>
                    <Select.Option className="action-cell" value="Đã huỷ">
                      <Tag icon={<CloseCircleOutlined />} color="error">
                        Đã hủy
                      </Tag>
                    </Select.Option>
                  </>
                )}
                {isDelivered === 'Chờ lấy hàng' && (
                  <>
                    <Select.Option
                      className="action-cell"
                      value="Đang giao hàng"
                    >
                      <Tag icon={<CarOutlined />} color="processing">
                        Đang giao hàng
                      </Tag>
                    </Select.Option>
                    <Select.Option className="action-cell" value="Đã huỷ">
                      {' '}
                      <Tag icon={<CloseCircleOutlined />} color="error">
                        Đã hủy
                      </Tag>
                    </Select.Option>
                  </>
                )}
                {isDelivered === 'Đang giao hàng' && (
                  <>
                    <Select.Option className="action-cell" value="Đã giao hàng">
                      {' '}
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        Đã giao hàng
                      </Tag>
                    </Select.Option>
                    <Select.Option className="action-cell" value="Đã huỷ">
                      Đã huỷ
                    </Select.Option>
                  </>
                )}
                {isDelivered === 'Đã giao hàng' && (
                  <>
                    <Select.Option className="action-cell" value="Đã giao hàng">
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        Đã giao hàng
                      </Tag>
                    </Select.Option>
                  </>
                )}
                {isDelivered === 'Đã huỷ' && (
                  <>
                    <Select.Option className="action-cell" value="Đã huỷ">
                      {' '}
                      <Tag icon={<CloseCircleOutlined />} color="error">
                        Đã hủy
                      </Tag>
                    </Select.Option>
                  </>
                )}
              </Select>
            }
          </span>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      className: 'action-cell',
      render: (_, record) => {
        if (
          record.isDelivered !== 'Đã hủy' &&
          record.isDelivered !== 'Chờ xác nhận'
        ) {
          return null
        } else {
          return (
            <div style={{ textAlign: 'center' }}>
              <Tooltip title={'edit'}>
                <Button type="link" onClick={() => toggleModal(record)}>
                  <EditOutlined />
                </Button>
              </Tooltip>
              <Tooltip title={'delete'}>
                <Button type="link" onClick={() => deleteOneOrder(record)}>
                  <DeleteOutlined className="text-red-600" />
                </Button>
              </Tooltip>
            </div>
          )
        }
      },
    },
  ]
  const Value = {
    _id: order?._id || '',
    cartItems: order?.cartItems || [],
    shippingAddress: order?.shippingAddress || {
      email: 'la@gmail.com',
      fullname: 'Unknown',
      address: 'gia lai',
      phone: '0',
    },
    user: order?.user || 'la@gmail.com',
    totalPrice: order?.totalPrice || 0,
    isPaid: order?.isPaid || false,
    isDelivered: order?.isDelivered || '0000000000',
    voucher: order?.voucher || 'không có',
    trackingNumber: order?.trackingNumber || 'Abcxyz',
    createdAt: order?.createdAt || '2003',
    updatedAt: order?.updatedAt || 'male',
  }
  const searchOrder = (value: string) => {
    setSearch(value)
    setSelectedValue(value)
  }

  return (
    <>
      <div>
        <div className="flex items-end">
          <HeaderTableAdminOrder
            showModal={() => {}}
            onSubmitt={(value) => searchOrder(value)}
            name={'Orders '}
          />
          <DatePicker
            className="mx-2"
            onChange={(_, dateString) =>
              setDayStart(
                Array.isArray(dateString) ? dateString.join(',') : dateString,
              )
            }
            placeholder="Start Date"
          />
          <DatePicker
            onChange={(_, dateString) =>
              setDayEnd(
                Array.isArray(dateString) ? dateString.join(',') : dateString,
              )
            }
            placeholder="End Date"
          />
          <div className="flex itmes-center ml-2">
            <Button
              type="default"
              onClick={() => setIsModalOpen(true)}
              disabled={!hasSelected}
              loading={loading}
              className="flex items-center"
            >
              <RocketOutlined /> Update
            </Button>
            <span style={{ marginLeft: 8 }} className="flex items-center">
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
          </div>
        </div>
        {isLoading ? (
          <>
            <div className="flex justify-center items-center mt-16">
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            </div>
          </>
        ) : (
          <>
            <Table
              style={{
                marginTop: '15px',
              }}
              rowSelection={{
                ...rowSelection,
                getCheckboxProps: (record) => {
                  const selectedOrderId = rowSelection
                    .selectedRowKeys[0] as string
                  const selectOrder = getIsDelivered(selectedOrderId)
                  if (rowSelection.selectedRowKeys.length !== 0) {
                    return {
                      disabled:
                        record.isDelivered === 'Đã giao hàng' ||
                        record.isDelivered !== selectOrder ||
                        record.isDelivered === 'Đã hủy',
                    }
                  } else {
                    return {
                      disabled:
                        record.isDelivered === 'Đã giao hàng' ||
                        record.isDelivered === 'Đã hủy',
                    }
                  }
                },
              }}
              columns={columns}
              dataSource={orders}
              rowKey="_id"
              bordered
              size="small"
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: pagination?.totalPages * pageSize,
                onChange: handlePageChange,
              }}
              onRow={(record) => ({
                onClick: (event) => {
                  const target = event.target as Element
                  const isAction =
                    target.classList.contains('action-cell') ||
                    target.closest('.action-cell')
                  if (!isAction) {
                    handleRowClick(record)
                  }
                },
              })}
            />
          </>
        )}
        <Modal
          open={modalVisible}
          onCancel={closeModal}
          footer={null}
          destroyOnClose={true}
        >
          {!isModalUpdateOpen &&
            selectedOrder &&
            DetailOrder(selectedOrder, products, users)}
        </Modal>
        <Modal
          title={'Update many'}
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          maskClosable={false}
          destroyOnClose={true}
        >
          {/* <FormOrder onSubmit={hanldeUpdateManyOrder} {...Value} /> */}
          <FormUpdateMany
            onSubmit={handleUpdateManyOrder}
            selectedRowKeys={selectedRowKeys}
            setIsModalOpen={setIsModalOpen}
            onSelectChange={onSelectChange}
            orders={orders}
          />
        </Modal>
        <Modal
          title={'Update'}
          open={isModalUpdateOpen}
          onOk={() => setIsModalUpdateOpen(false)}
          onCancel={() => setIsModalUpdateOpen(false)}
          destroyOnClose={true}
          footer={null}
        >
          <FormOrder
            mode={'update'}
            onSubmit={handleUpdateOrder}
            {...Value}
            {...products}
          />
        </Modal>
      </div>
    </>
  )
}
export default OrderManager
