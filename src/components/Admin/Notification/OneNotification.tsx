import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { IStateNotification } from '../../../common/redux/type'
import { fetchNotificationById } from '../../../features/notification'
import { Descriptions } from 'antd'
import { format } from 'date-fns'

const OneNotification = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { notification } = useSelector(
    (state: IStateNotification) => state.notification
  )

  useEffect(() => {
    if (id) {
      dispatch(fetchNotificationById(id))
    }
  }, [dispatch, id])

  // Check if notification object is defined before accessing its properties
  if (!notification || !notification.message) {
    return <div>Loading...</div> // or handle loading state accordingly
  }

  return (
    <>
      <Descriptions
        title="Notification Details"
        bordered
        column={{ xs: 1, sm: 2, md: 3 }}
      >
        <Descriptions.Item label="Message" span={3}>
          {notification.message}
        </Descriptions.Item>
        <Descriptions.Item label="Loại thông báo" span={3}>
          {notification.type}
        </Descriptions.Item>
        <Descriptions.Item label="Đối tượng nhận thông báo" span={3}>
          {notification.recipientType}
        </Descriptions.Item>
        <Descriptions.Item label="Tạo lúc" span={3}>
          {notification.createdAt &&
            format(new Date(notification.createdAt), 'HH:mm:ss dd-MM-yyyy')}
        </Descriptions.Item>
      </Descriptions>
    </>
  )
}

export default OneNotification
