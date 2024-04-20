/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Select, Tag } from 'antd'
import Input from 'antd/es/input/Input'
import { IBill } from '../../../common/order'
import React from 'react'
import {
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'

const FormOrder: React.FC<
  IBill & { onSubmit: (values: IBill) => void; mode: string }
> = ({
  isDelivered,
  totalPrice,
  mode,
  onSubmit,
  isPaid,
  shippingAddress,
  user,
  trackingNumber,
}) => {
  const [form] = Form.useForm()
  const handleFormSubmitCreate = (values: any) => {
    const { fullname, address, email, phone } = values
    const shippingAddress = { fullname, address, email, phone }
    onSubmit({ ...values, shippingAddress })
  }

  const { address, phone, email, fullname } = shippingAddress
  React.useEffect(() => {
    form.setFieldsValue({
      email,
      fullname,
      address,
      phone,
      trackingNumber,
      isPaid,
    })
  }, [form, email, fullname, address, phone, isPaid, trackingNumber])

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{
        isPaid,
        isDelivered,
        totalPrice,
        mode,
        user,
      }}
      onFinish={handleFormSubmitCreate}
    >
      {mode === 'create' && (
        <>
          <Form.Item
            label={'totalPrice'}
            name="totalPrice"
            rules={[{ required: true, message: 'Vui lòng nhập tổng giá' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={'isDelivered'}
            name="isDelivered"
            rules={[
              { required: true, message: 'Vui lòng nhập trạng thái giao hàng' },
            ]}
          >
            <Input />
          </Form.Item>
        </>
      )}
      <Form.Item
        label="Tracking number"
        name="trackingNumber"
        rules={[{ required: true, message: 'Vui lòng nhập sản phẩm' }]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="User"
        name="user"
        rules={[{ required: true, message: 'Vui lòng nhập người dùng' }]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="Full Name"
        name="fullname"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Vui lòng nhập email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Total Price"
        name="totalPrice"
        rules={[{ required: true, message: 'Vui lòng nhập tổng giá' }]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="Is Paid"
        name="isPaid"
        rules={[
          { required: true, message: 'Vui lòng nhập trạng thái thanh toán' },
        ]}
      >
        <Select defaultValue={isPaid ? 'Chưa thanh toán' : 'Đã thanh toán'}>
          <Select.Option value={false}>Chưa thanh toán</Select.Option>
          <Select.Option value={true}>Đã thanh toán</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Is Delivered"
        name="isDelivered"
        rules={[
          { required: true, message: 'Vui lòng nhập trạng thái giao hàng' },
        ]}
      >
        <Select>
          {isDelivered === 'Chờ xác nhận' && (
            <>
              <Select.Option value="Chờ lấy hàng">
                <Tag icon={<SyncOutlined spin />} color="purple">
                  Chờ lấy hàng
                </Tag>
              </Select.Option>
              <Select.Option value="Đã huỷ">
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Đã hủy
                </Tag>
              </Select.Option>
            </>
          )}
          {isDelivered === 'Chờ lấy hàng' && (
            <>
              <Select.Option value="Đang giao hàng">
                <Tag icon={<CarOutlined />} color="processing">
                  Đang giao hàng
                </Tag>
              </Select.Option>
              <Select.Option value="Đã huỷ">
                {' '}
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Đã hủy
                </Tag>
              </Select.Option>
            </>
          )}
          {isDelivered === 'Đang giao hàng' && (
            <>
              <Select.Option value="Đã giao hàng">
                {' '}
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Đã giao hàng
                </Tag>
              </Select.Option>
              <Select.Option value="Đã huỷ">Đã huỷ</Select.Option>
            </>
          )}
          {isDelivered === 'Đã giao hàng' && (
            <>
              <Select.Option value="Đã giao hàng">
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Đã giao hàng
                </Tag>
              </Select.Option>
            </>
          )}
          {isDelivered === 'Đã huỷ' && (
            <>
              <Select.Option value="Đã huỷ">
                {' '}
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Đã hủy
                </Tag>
              </Select.Option>
            </>
          )}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button className="hover:bg-red-600 hover:!text-white">Cancel</Button>
        <Button
          style={{ marginLeft: '5px' }}
          type="default"
          className="hover:bg-blue-600 hover:!text-white"
          htmlType="submit"
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormOrder
