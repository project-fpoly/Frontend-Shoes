import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { IVoucher } from "../../../common/voucher";
import dayjs from "dayjs";

type FormVoucherProps = {
  onSubmit: (values: IVoucher) => void;
};

const FormVoucher: React.FC<IVoucher & FormVoucherProps> = ({
  onSubmit,
  Name,
  Quantity,
  reduced_amount,
  price_order,
  description,
  expiration_date,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onSubmit(values as IVoucher);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      initialValues={{
        Name,
        Quantity,
        reduced_amount,
        price_order,
        description,
        expiration_date,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label={"Name"}
        name="Name"
        rules={[{ required: true, message: "Please input Name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"Quantity"}
        name="Quantity"
        rules={[{ required: true, message: "Please input Quantity" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label={"Reduced amount"}
        name="reduced_amount"
        rules={[{ required: true, message: "Please input Reduced amount" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label={"Price order"}
        name="price_order"
        rules={[{ required: true, message: "Please input Price order" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label={"Description"}
        name="description"
        rules={[{ required: true, message: "Please input Description" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label={"Expiration date"}
        rules={[{ required: true, message: "Please input Expiration date" }]}
      >
        <DatePicker defaultValue={dayjs(expiration_date, "YYYY-MM-DD")} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormVoucher;
