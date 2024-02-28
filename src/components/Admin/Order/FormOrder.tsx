import { Button, Form, Select } from "antd";
import Input from "antd/es/input/Input";
import { CartItem, IBill } from "../../../common/order";
import React from "react";

const FormOrder: React.FC<
  IBill & { onSubmit: (values: IBill) => void; mode: string }
> = ({
  isDelivered,
  totalPrice,
  mode,
  onSubmit,
  cartItems,
  isPaid,
  shippingAddress,
  user,
}) => {
  const [form] = Form.useForm();
  const handleFormSubmitCreate = (values: IBill) => {
    onSubmit(values);
    console.log(values);
  };
  const paid = isPaid ? "Chưa thanh toán" : "Đã thanh toán";
  const product = cartItems.map((item) => item.product);
  const quantity = cartItems.map((item: CartItem) => item.quantity).toString();
  const { address, phone, email, fullname } = shippingAddress;

  React.useEffect(() => {
    form.setFieldsValue({
      product,
      quantity,
      email,
      fullname,
      address,
      phone,
    });
  }, [form, product, quantity, email, fullname, address, phone]);

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
      {mode === "create" && (
        <>
          <Form.Item
            label={"totalPrice"}
            name="totalPrice"
            rules={[{ required: true, message: "Vui lòng nhập tổng giá" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"isDelivered"}
            name="isDelivered"
            rules={[
              { required: true, message: "Vui lòng nhập trạng thái giao hàng" },
            ]}
          >
            <Input />
          </Form.Item>
        </>
      )}
      <Form.Item
        label={"product"}
        name="product"
        rules={[{ required: true, message: "Vui lòng nhập sản phẩm" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"quantity"}
        name="quantity"
        rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"user"}
        name="user"
        rules={[{ required: true, message: "Vui lòng nhập người dùng" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"fullname"}
        name="fullname"
        rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"email"}
        name="email"
        rules={[{ required: true, message: "Vui lòng nhập email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"phone"}
        name="phone"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"address"}
        name="address"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"totalPrice"}
        name="totalPrice"
        rules={[{ required: true, message: "Vui lòng nhập tổng giá" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"isPaid"}
        name="isPaid"
        rules={[
          { required: true, message: "Vui lòng nhập trạng thái thanh toán" },
        ]}
      >
        <Input defaultValue={paid} />
      </Form.Item>
      <Form.Item
        label={"isDelivered"}
        name="isDelivered"
        rules={[{ required: true, message: "pls input role" }]}
      >
        <Select defaultValue={isDelivered}>
          <Select.Option value="Chờ lấy hàng">Chờ lấy hàng</Select.Option>
          <Select.Option value="Đang giao hàng">Đang giao hàng</Select.Option>
          <Select.Option value="Đã giao hàng">Đã giao hàng</Select.Option>
          <Select.Option value="Đã huỷ">Đã huỷ</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        style={{ textAlign: "right" }}
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button>cancel</Button>
        <Button style={{ marginLeft: "5px" }} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormOrder;
