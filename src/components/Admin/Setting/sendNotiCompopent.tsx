import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import { ISendNoti } from '../../../common/notification'

const { TextArea } = Input
const { Option } = Select

type FormVoucherProps = {
  onSubmit: (values: ISendNoti) => void
}

const FormSend: React.FC<ISendNoti & FormVoucherProps> = ({
  onSubmit,
  message,
  type,
  recipientType,
}) => {
  const [form] = Form.useForm()

  const onFinish = (values: ISendNoti) => {
    onSubmit(values)
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      onFinish={onFinish}
      initialValues={{
        message,
        type,
        recipientType,
      }}
    >
      <Form.Item
        label={'Lời nhắn'}
        name="message"
        rules={[{ required: true, message: 'Please input message' }]}
      >
        <TextArea rows={4} placeholder='Hãy nhập gì đó vào đây...' />
      </Form.Item>
      <Form.Item
        label={'Loại thông báo'}
        name="type"
        rules={[{ required: true, message: 'Please select type' }]}
      >
        <Select>
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
          <Option value="manager">Manager</Option>
          <Option value="order">Order</Option>
          <Option value="promotion">Promotion</Option>
          <Option value="product">Product</Option>
          <Option value="category">Category</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label={'Loại người nhận'}
        name="recipientType"
        rules={[{ required: true, message: 'Please select recipientType' }]}
      >
        <Select>
          <Option value="member">Member</Option>
          <Option value="manager">Manager</Option>
          <Option value="admin">Admin</Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormSend
