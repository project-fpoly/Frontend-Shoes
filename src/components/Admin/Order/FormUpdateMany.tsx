/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux'
import { Button, Form, Input, Select, Tag } from 'antd'
import { updateManyOrders } from '../../../features/order'
import React from 'react'
import { AppDispatch } from '../../../redux/store'
import {
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'

const FormUpdateMany = ({
  selectedRowKeys,
  setIsModalOpen,
  onSelectChange,
  orders,
}: {
  selectedRowKeys: any
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSelectChange: (newSelectedRowKeys: React.Key[]) => React.Key[]
  onSubmit: () => void
  orders: any
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const [form] = Form.useForm()
  const getIsDelivered = (orderId: string) => {
    const order = orders.find((order: any) => order._id === orderId)
    return order
      ? order.isDelivered
      : 'Chờ xác nhận' && 'Chờ lấy hàng' && 'Đang giao hàng' && 'Đã hủy'
  }
  const handleFormSubmit = (formValues: any) => {
    console.log(formValues)
    dispatch(updateManyOrders(formValues))
    onSelectChange([])
    setIsModalOpen(false)
  }
  const isPaid = false
  const isDelivered = getIsDelivered(selectedRowKeys[0])
  const ids = selectedRowKeys

  React.useEffect(() => {
    form.setFieldsValue({
      ids,
      isPaid,
      isDelivered,
    })
  }, [form, ids, isPaid, isDelivered])

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      onFinish={handleFormSubmit}
    >
      <Form.Item
        label="Ids"
        name="ids"
        rules={[
          { required: true, message: 'Vui lòng nhập trạng thái thanh toán' },
        ]}
        className="hidden"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Is Paid"
        name="isPaid"
        rules={[
          { required: true, message: 'Vui lòng nhập trạng thái thanh toán' },
        ]}
      >
        <Select placeholder="is Paid">
          <Select.Option value={false}>Chưa thanh toán</Select.Option>
          <Select.Option value={true}>Đã thanh toán</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Is Delivered"
        name="isDelivered"
        rules={[
          { required: true, message: 'Vui lòng nhập trạng thái thanh toán' },
        ]}
      >
        <Select placeholder="is Delevered">
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

export default FormUpdateMany
