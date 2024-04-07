import React, { useEffect, useState } from 'react'
import { Form, Input, Button, List, Row, Col, Card } from 'antd'
import FormSend from '../../../components/Admin/Setting/sendNotiCompopent'
import { INotification, ISendNoti } from '../../../common/notification'
import Title from 'antd/es/typography/Title'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { getSendNotifications, sendNotification } from '../../../features/notification'
import FormListNotification from '../../../components/Admin/Setting/formListNotification'

const SendNotification = () => {
  const dispatch = useDispatch<AppDispatch>()
  const data: INotification[] = useSelector(
    (state: RootState) => state.notification.listSend,
  )
  const defaultValue = {
    message: '',
    type: 'admin',
    recipientType: 'member',
  }

  const submit = (value: ISendNoti) => {
    console.log(value)
    dispatch(sendNotification(value))
  }
  useEffect(() => {
    dispatch(getSendNotifications())
  }, [])
  return (
    <Row gutter={20}>
    <Col span={14}>
      <Card style={{height:"500px",background: "#f5f5f5" }}>
        <Title level={3}>Send Notification</Title>
        <FormSend onSubmit={submit} {...defaultValue} />
      </Card>
    </Col>
    <Col span={10}>
      <Card style={{height:"500px",background: "#f5f5f5" }}>
        <div>
          <Title level={3}>List Sent Notifications</Title>
          <FormListNotification data={data} />
        </div>
      </Card>
    </Col>
  </Row>
  )
}

export default SendNotification
