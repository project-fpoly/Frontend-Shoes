import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { ISale } from "../../../common/sale";
import dayjs from "dayjs";

type FormSaleProps = {
  onSubmit: (values: ISale) => void;
};

const FormSale: React.FC<ISale & FormSaleProps> = ({
  onSubmit,
  name,
  quantity,
  discount,
  description,
  expiration_date,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onSubmit(values as ISale);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      initialValues={{
        name,
        quantity,
        discount,
        description,
        expiration_date,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label={"Campaign Name"}
        name="name"
        rules={[{ required: true, message: "Please input Campaign Name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"Quantity"}
        name="quantity"
        rules={[{ required: true, message: "Please input Quantity" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label={"Discount"}
        name="discount"
        rules={[{ required: true, message: "Please input Discount" }]}
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

export default FormSale;
