import React, { useEffect, useState } from 'react'
import styles from '../../../App.module.scss'
import {
  Input,
  Badge,
  Avatar,
  Space,
  Dropdown,
  Menu,
  Row,
  Col,
  Popover,
  List,
  message,
  Select,
  Drawer,
} from 'antd'
import {
  AlertOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  BellOutlined,
  ContainerOutlined,
  GiftOutlined,
  OrderedListOutlined,
  PartitionOutlined,
  ReconciliationOutlined,
  SearchOutlined,
  SendOutlined,
  ShopFilled,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SolutionOutlined,
  UserOutlined,
  WechatOutlined,
  WechatWorkOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { IStateNotification } from '../../../common/redux/type'
import {
  fetchAllNotification,
  updateNotificationById,
} from '../../../features/notification'
import { differenceInMilliseconds, format, formatDistanceToNow } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import { INotification } from '../../../common/notification'
import { getUserByID, setUser } from '../../../features/auth'
import user from '../../../features/user'
import io from 'socket.io-client'
import { HiMiniBars3CenterLeft } from 'react-icons/hi2'
const { Search } = Input

const AdminHeader: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState('left')
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  const navigate = useNavigate()
  const { Option } = Select
  const user = useSelector((state: any) => state.auth.user)
  const [visible, setVisible] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const { notifications: notification } = useSelector(
    (state: IStateNotification) => state.notification,
  )
  useEffect(() => {
    dispatch(fetchAllNotification(''))
  }, [dispatch])

  const handleItemClick = async (item: INotification) => {
    if (!item.isRead) {
      await dispatch(updateNotificationById(item._id))
      dispatch(fetchAllNotification(''))
    }
    navigate(`/admin/notification/${item._id}`)
  }
  const handleLogout = () => {
    localStorage.clear()
    dispatch(setUser(null))
    message.success('Logout successfully')
    navigate('/')
    const socket = io('http://localhost:9000', { transports: ['websocket'] })
    socket.emit('log_out', { userId: user._id })
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">Hồ sơ</Menu.Item>
      <Menu.Item key="settings">Cài đặt</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  )

  const currentDateTime: Date = new Date()
  const unreadNotificationsCount = notification.filter(
    (item) => !item.isRead,
  ).length
  const handleSelectChange = async (value: string) => {
    await dispatch(fetchAllNotification(value))
    setSelectedValue(value)
  }
  const notificationContent = (
    <>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Select
          defaultValue=""
          style={{
            width: 120,
            marginRight: 10,
            position: 'absolute',
            top: '10px',
            right: '40px',
          }}
          onChange={handleSelectChange} // Thêm sự kiện onChange và gọi hàm xử lý handleSelectChange
          value={selectedValue} // Gán giá trị được chọn từ state vào Select
        >
          <Option value="">Tất cả</Option>
          <Option value="user">user</Option>
          <Option value="order">order</Option>
          <Option value="promotion">promotion</Option>
          <Option value="product">product</Option>
          <Option value="category">category</Option>
        </Select>
        <List
          itemLayout="vertical"
          dataSource={notification}
          renderItem={(item) => {
            const timeDifference = differenceInMilliseconds(
              currentDateTime,
              new Date(item.createdAt),
            )
            const timeAgo = formatDistanceToNow(
              Number(currentDateTime.getTime()) - timeDifference,
              { addSuffix: true },
            )

            const iconMap: Record<string, JSX.Element> = {
              user: <UserOutlined />,
              admin: <AlertOutlined />,
              manager: <ContainerOutlined />,
              order: <OrderedListOutlined />,
              promotion: <AppstoreOutlined />,
              product: <ShoppingOutlined />,
              category: <SolutionOutlined />,
            }

            return (
              <List.Item
                className={`${styles.notificationItem} ${item.isRead ? styles.readItem : styles.unreadItem
                  }`}
                onClick={() => handleItemClick(item)}
              >
                <div style={{ marginBottom: '16px', padding: 5 }}>
                  <h3>{iconMap[item.type]}</h3>
                  <p>{item.message}</p>
                </div>
                <div>
                  <Badge status={item.isRead ? 'success' : 'error'} />
                  {timeAgo}{' '}
                  <i style={{ fontSize: '13px' }}>
                    {format(new Date(item.createdAt), ' HH:mm:ss dd-MM-yyyy')}
                  </i>
                </div>
              </List.Item>
            )
          }}
        />
      </div>
    </>
  )
  const handleVisibleChange = (isVisible: boolean) => {
    setVisible(isVisible)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (visible) {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [visible])

  return (
    <Row
      className="items-center justify-between p-4 bg-white border-b"
      style={{ backgroundColor: 'ghostwhite' }}
    >
      <Col span={4} className="text-center lg:hidden">
        <HiMiniBars3CenterLeft
          onClick={showDrawer}
          className="text-2xl mt-1 lg:hidden"
        />
      </Col>
      <Col span={12}>
        <Search
          placeholder="Search..."
          prefix={<SearchOutlined />}
          style={{ width: '100%' }}
        />
      </Col>
      <Col span={6} className="text-right">
        <Row>
          <Col span={12} className="text-center">
            <Popover
              content={notificationContent}
              title="Notifications"
              trigger="click"
              visible={visible}
              onVisibleChange={handleVisibleChange}
            >
              <Badge count={unreadNotificationsCount} offset={[10, 0]}>
                <BellOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
              </Badge>
            </Popover>
          </Col>
          <Col span={12} className="text-center">
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space align="center" style={{ cursor: 'pointer' }}>
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  src={user?.avt?.url}
                />
                <span className="ml-2">Hi, {user.userName}</span>
              </Space>
            </Dropdown>
          </Col>
        </Row>
      </Col>

      <Drawer
        title="Nike Shop"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-6 ml-3 justify-start">
            <Link onClick={onClose} to="/admin" className="text-[16px]">
              <BarChartOutlined className="mr-4" />
              Dashboard
            </Link>
            <Link onClick={onClose} to="users" className="text-[16px]">
              <UserOutlined className="mr-4" />
              User
            </Link>
            <Link onClick={onClose} to="orders" className="text-[16px]">
              <ReconciliationOutlined className="mr-4" />
              Order
            </Link>
            <Link onClick={onClose} to="product" className="text-[16px]">
              <ShopFilled className="mr-4" />
              Products
            </Link>
            <Link onClick={onClose} to="categories" className="text-[16px]">
              <PartitionOutlined className="mr-4" />
              Categories
            </Link>
            <Link onClick={onClose} to="sale" className="text-[16px]">
              <ShoppingCartOutlined className="mr-4" />
              Sale
            </Link>
            <Link onClick={onClose} to="comment" className="text-[16px]">
              <WechatOutlined className="mr-4" />
              Comments
            </Link>
            <Link onClick={onClose} to="voucher" className="text-[16px]">
              <GiftOutlined className="mr-4" />
              Voucher
            </Link>
            {/* <Link onClick={onClose} to="setting" className='text-[16px]'><SettingOutlined className='mr-4' />Setting</Link> */}
            <Link onClick={onClose} to="setting/sendNotification">
              <SendOutlined className="mr-4" />
              Send Notification
            </Link>
            <Link onClick={onClose} to="setting/chat">
              <WechatWorkOutlined className="mr-4" />
              Chat
            </Link>
          </div>
        </div>
      </Drawer>
    </Row>
  )
}

export default AdminHeader
