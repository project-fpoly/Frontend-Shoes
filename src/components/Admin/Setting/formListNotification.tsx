import React from 'react'
import { INotification } from '../../../common/notification'
import { List, Typography } from 'antd'
import styles from '../../../App.module.scss'
import { differenceInMilliseconds, format, formatDistanceToNow } from 'date-fns'

interface FormListNotificationProps {
  data: any[] // Thêm type Date cho createdAt
}

const { Text } = Typography

const FormListNotification: React.FC<FormListNotificationProps> = ({
  data,
}) => {
  const currentDateTime: Date = new Date()

  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      <List
        dataSource={data}
        renderItem={(item) => {
          const timeDifference = differenceInMilliseconds(
            currentDateTime,
            new Date(item.createdAt),
          )
          const timeAgo = formatDistanceToNow(
            Number(currentDateTime.getTime()) - timeDifference,
            { addSuffix: true },
          )
          return (
            <List.Item>
              <div>
                <Text strong>Email: {item.userId.email}</Text>
                <br />
                <Text strong>Người gửi: {item.userId.userName}</Text>
                <br />
                <Text type="secondary">
                  <b>Lời nhắn:</b>
                  {item.message}
                </Text>
              </div>
              {timeAgo}{' '}
              <i style={{ fontSize: '13px' }}>
                {format(new Date(item.createdAt), ' HH:mm:ss dd-MM-yyyy')}
              </i>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

export default FormListNotification
