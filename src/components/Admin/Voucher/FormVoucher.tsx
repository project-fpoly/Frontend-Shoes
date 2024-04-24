import React, { useState } from 'react'
import { Form, Input, Button, DatePicker } from 'antd'
import { IVoucher } from '../../../common/voucher'
import dayjs from 'dayjs'

type FormVoucherProps = {
  onSubmit: (values: IVoucher) => void
}

const { RangePicker } = DatePicker

const FormVoucher: React.FC<IVoucher & FormVoucherProps> = ({
  onSubmit,
  Name,
  Quantity,
  reduced_amount,
  price_order,
  description,
  expiration_date,
  start_date,
  create_by,
  _id,
}) => {
  const [form] = Form.useForm()
  const [dateValues, setDateValues] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([expiration_date, start_date])
  const dateFormat = 'YYYY/MM/DD'

  const onFinish = (values: any) => {
    const { dateValues, ...restValues } = values
    const setValues = {
      ...restValues,
      start_date: dateValues[0]
        ? dayjs(dateValues[0]).format(dateFormat)
        : null,
      expiration_date: dateValues[1]
        ? dayjs(dateValues[1]).format(dateFormat)
        : null,
    }
    onSubmit(setValues as IVoucher)
  }
  const handleDateChange = (dates: any) => {
    setDateValues(dates)
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      initialValues={{
        _id,
        Name,
        Quantity,
        reduced_amount,
        price_order,
        description,
        dateValues,
      }}
      onFinish={onFinish}
    >
      {_id && (
        <>
        <Form.Item
        label={'_id'}
        name="_id"
        initialValue={_id}
        style={{display:"none"}}
      >
        <Input disabled />
      </Form.Item>
        <Form.Item
          label={'Create By'}
          name="create_by"
          initialValue={create_by?.email}
        >
          <Input disabled />
        </Form.Item>
        </>
      )}

      <Form.Item
        label={'Name'}
        name="Name"
        rules={[{ required: true, message: 'Please input Name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={'Quantity'}
        name="Quantity"
        rules={[{ required: true, message: 'Please input Quantity' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label={'Reduced amount'}
        name="reduced_amount"
        rules={[{ required: true, message: 'Please input Reduced amount' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label={'Price order'}
        name="price_order"
        rules={[{ required: true, message: 'Please input Price order' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label={'Description'}
        name="description"
        rules={[{ required: true, message: 'Please input Description' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item label={'Date'} name="dateValues">
        <RangePicker value={dateValues} onChange={handleDateChange} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormVoucher
