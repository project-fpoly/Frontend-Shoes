import {
  AlertOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  OrderedListOutlined,
  ShoppingOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Badge, List, Select } from 'antd'
import { differenceInMilliseconds, format, formatDistanceToNow } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { IStateNotification } from '../../../common/redux/type'
import { useEffect, useState } from 'react'
import {
  fetchAllNotification,
  updateNotificationById,
} from '../../../features/notification'
import styles from '../../../App.module.scss'
import { useNavigate } from 'react-router-dom'
import { INotification } from '../../../common/notification'
const AllNotification = () => {
  const navigate = useNavigate()
  const { Option } = Select
  const dispatch = useDispatch<AppDispatch>()
  const [selectedValue, setSelectedValue] = useState('')
  const { notifications: notification } = useSelector(
    (state: IStateNotification) => state.notification,
  )
  const { user } = useSelector((state: any) => state.auth)
  useEffect(() => {
    dispatch(fetchAllNotification(''))
  }, [dispatch])
  const currentDateTime: Date = new Date()
  const handleItemClick = async (item: INotification) => {
    if (!item.isRead) {
      await dispatch(updateNotificationById(item._id))
      dispatch(fetchAllNotification(''))
    }
    navigate(`/admin/notification/${item._id}`)
  }
  const handleItemClickofMember = async (item: INotification) => {
    if (!item.isRead) {
      await dispatch(updateNotificationById(item._id))
      dispatch(fetchAllNotification(''))
    }
  }
  const handleSelectChange = async (value: string) => {
    await dispatch(fetchAllNotification(value))
    setSelectedValue(value)
  }
  return (
    <>
      <div style={{ maxHeight: '75vh', overflowY: 'auto' }}>
        {user?.role === 'admin' && (
          <Select
            defaultValue=""
            style={{
              width: 120,
              marginRight: 10,
              top: '0px',
              right: '0px',
            }}
            onChange={handleSelectChange}
            value={selectedValue}
          >
            <Option value="">Tất cả</Option>
            <Option value="user">user</Option>
            <Option value="order">order</Option>
            <Option value="promotion">promotion</Option>
            <Option value="product">product</Option>
            <Option value="category">category</Option>
          </Select>
        )}

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
                className={`${styles.notificationItem} ${
                  item.isRead ? styles.readItem : styles.unreadItem
                }`}
                onClick={() =>
                  user?.role === 'member'
                    ? handleItemClickofMember(item)
                    : handleItemClick(item)
                }
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
}
export default AllNotification
