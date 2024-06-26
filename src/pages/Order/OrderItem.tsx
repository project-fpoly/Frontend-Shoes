import { Button, DatePicker, Modal, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { CartItem, IBill } from '../../common/order'

import { useDispatch, useSelector } from 'react-redux'
import { IStateProduct } from '../../common/redux/type'
import HeaderTableUser from '../../components/Admin/Layout/HeaderTableUser'
import {
  fetchOrders,
  getOrderByUsers,
  updateIsDeliveredOrder,
} from '../../features/order'
import { AppDispatch } from '../../redux/store'
import DetailOrder from '../../components/Admin/Order/DetailOrder'
import { IUsers } from '../../common/users'
import { fetchAllUsers } from '../../features/user'
import { fetchAllProducts } from '../../features/product'
import {
  ExclamationCircleOutlined,
  SyncOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { formatCurrency } from '../../hooks/utils'

interface Props {
  data: any
  pagination: any
}

export default function OrderItem({ data, pagination }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const dispatch = useDispatch<AppDispatch>()

  const [selectedOrder, setSelectedOrder] = useState<IBill | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [dayStart, setDayStart] = useState(null)
  const [dayEnd, setDayEnd] = useState(null)
  const [Search, setSearch] = useState(null)
  const [_, setSelectedValue] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { users } = useSelector((state: IUsers) => state.user)
  const { products } = useSelector((state: IStateProduct) => state.product)
  const [item, setItem] = useState([])
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    // Mở hoặc tạo cơ sở dữ liệu IndexedDB
    const request = indexedDB.open('my_database', 1)

    // Xử lý sự kiện khi cơ sở dữ liệu được mở hoặc tạo mới thành công
    request.onsuccess = function (event: any) {
      const db = event.target.result

      // Tạo một giao dịch chỉ để đọc
      const transaction = db.transaction(['my_object_store'], 'readonly')
      const objectStore = transaction.objectStore('my_object_store')

      // Sử dụng phương thức getAll() để truy vấn tất cả dữ liệu
      const getAllRequest = objectStore.getAll()

      // Xử lý kết quả trả về
      getAllRequest.onsuccess = function (event: any) {
        const data = event.target.result
        setItem(data)
      }

      // Xử lý lỗi trong quá trình truy vấn
      getAllRequest.onerror = function (event: any) {
        console.error(
          'Lỗi khi truy vấn dữ liệu từ IndexedDB:',
          event.target.errorCode,
        )
      }
    }

    // Xử lý sự kiện khi có lỗi mở hoặc tạo cơ sở dữ liệu
    request.onerror = function (event: any) {
      console.error(
        'Lỗi khi mở hoặc tạo cơ sở dữ liệu: ',
        event.target.errorCode,
      )
    }
  }, [])
  useEffect(() => {
    dispatch(
      getOrderByUsers({
        page: currentPage,
        limit: pageSize,
        search: Search,
        start: dayStart,
        end: dayEnd,
      }),
    )
    dispatch(
      fetchAllUsers({ page: 1, pageSize: 10, search: '', isDelete: false }),
    )
    dispatch(fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: '' }))
  }, [dispatch, currentPage, pageSize, Search, dayStart, dayEnd])

  const handleRowClick = (order: IBill) => {
    setSelectedOrder(order)
    console.log(order)
    setModalVisible(true)
  }

  const closeModal = () => {
    setSelectedOrder(null)
    setModalVisible(false)
  }

  const getProductName = (shoeId: string) => {
    const product = products.find((product) => product._id === shoeId)
    return product ? product.name : 'N/A'
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
    return newSelectedRowKeys
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const searchOrder = (value: any) => {
    setSearch(value)
    setSelectedValue(value)
  }
  const handleCancelOrder = (order: IBill) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this order?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',

      async onOk() {
        const isDelivered = 'Đã hủy'
        await dispatch(updateIsDeliveredOrder({ id: order?._id, isDelivered }))
      },
      onCancel() {},
    })
  }
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
    dispatch(
      getOrderByUsers({
        page: page,
        limit: pageSize,
        search: Search,
        start: dayStart,
        end: dayEnd,
      }),
    )
  }
  const columns: ColumnsType<IBill> = [
    {
      title: 'No.',
      dataIndex: 'index',
      render: (_, __, index) => index + 1,
      align: 'center',
    },
    {
      title: 'Tracking order',
      dataIndex: 'trackingNumber',
      align: 'center',
      className: 'action-cell',
    },
    {
      title: 'Is Delivered',
      align: 'center',
      dataIndex: 'isDelivered',
      render: (isDelivered) => {
        return (
          <>
            {isDelivered === 'Chờ xác nhận' && (
              <Tag icon={<ExclamationCircleOutlined />} color="purple">
                Chờ xác nhận
              </Tag>
            )}
            {isDelivered === 'Chờ lấy hàng' && (
              <Tag icon={<SyncOutlined spin />} color="processing">
                Chờ lấy hàng
              </Tag>
            )}
            {isDelivered === 'Đang giao hàng' && (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Đang giao hàng
              </Tag>
            )}
            {isDelivered === 'Đã giao hàng' && (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Đã giao hàng
              </Tag>
            )}
            {isDelivered === 'Đã hủy' && (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Đã hủy
              </Tag>
            )}
          </>
        )
      },
      className: 'action-cell',
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
      title: 'Payment meothod',
      dataIndex: 'payment_method',
      align: 'center',
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      render: (totalPrice: any) => <span>{formatCurrency(totalPrice)}</span>,
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
      title: 'Action',
      key: 'action',
      align: 'center',
      className: 'action-cell',
      render: (_, record) => {
        const isCancel = record.isDelivered === 'Chờ xác nhận'
        if (record.isDelivered === 'Đã hủy') {
          return 'đơn hàng đã hủy'
        } else {
          return (
            <div style={{ textAlign: 'center' }}>
              <Button
                onClick={() => handleCancelOrder(record)}
                type="link"
                disabled={!isCancel}
                className={
                  record.isDelivered === 'Đã hủy'
                    ? 'hidden'
                    : 'block w-full mx-auto'
                }
              >
                Hủy dơn
              </Button>
            </div>
          )
        }
      },
    },
  ]
  return (
    <>
      <div className="flex items-end">
        <HeaderTableUser
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
      </div>
      <Table
        style={{
          marginTop: '15px',
        }}
        rowSelection={{
          ...rowSelection,
          getCheckboxProps: (record) => {
            return {
              disabled: record.isDelivered === 'Đã giao hàng',
            }
          },
        }}
        columns={columns}
        dataSource={accessToken ? data : item.map((order: any) => order.value)}
        bordered
        size="small"
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
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: pagination.totalPages * pageSize,
          onChange: handlePageChange,
        }}
      />
      <Modal
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        destroyOnClose={true}
      >
        {selectedOrder && DetailOrder(selectedOrder, products, users)}
      </Modal>
    </>
  )
}
