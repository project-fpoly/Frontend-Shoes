import { Button, Form, Select } from "antd";
import Input from "antd/es/input/Input";
import { CartItem, IBill } from "../../../common/order";

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
  const fullName = shippingAddress.fullname;
  const email = shippingAddress.email;
  const phone = shippingAddress.phone;
  const address = shippingAddress.address;
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
        onsubmit,
        user,
      }}
      onFinish={handleFormSubmitCreate}
    >
      {mode === "create" && (
        <>
          <Form.Item
            label={"totalPrice"}
            name="totalPrice"
            rules={[{ required: true, message: "pls input totalPrice" }]}
          >
            <Input defaultValue={totalPrice} />
          </Form.Item>

          <Form.Item
            label={"isDelivered"}
            name="isDelivered"
            rules={[{ required: true, message: "pls input role" }]}
          >
            <Input defaultValue={isDelivered} />
          </Form.Item>
        </>
      )}
      <Form.Item
        label={"product"}
        name="product"
        rules={[{ required: true, message: "pls input product" }]}
      >
        <Input defaultValue={product} />
      </Form.Item>
      <Form.Item
        label={"quantity"}
        name="quantity"
        rules={[{ required: true, message: "pls input quantity" }]}
      >
        <Input defaultValue={quantity} />
      </Form.Item>
      <Form.Item
        label={"user"}
        name="user"
        rules={[{ required: true, message: "pls input user" }]}
      >
        <Input defaultValue={user} />
      </Form.Item>
      <Form.Item
        label={"fullName"}
        name="fullName"
        rules={[{ required: true, message: "pls input fullName" }]}
      >
        <Input defaultValue={fullName} />
      </Form.Item>
      <Form.Item
        label={"email"}
        name="email"
        rules={[{ required: true, message: "pls input email" }]}
      >
        <Input defaultValue={email} />
      </Form.Item>
      <Form.Item
        label={"phone"}
        name="phone"
        rules={[{ required: true, message: "pls input phone" }]}
      >
        <Input defaultValue={phone} />
      </Form.Item>
      <Form.Item
        label={"address"}
        name="address"
        rules={[{ required: true, message: "pls input address" }]}
      >
        <Input defaultValue={address} />
      </Form.Item>
      <Form.Item
        label={"totalPrice"}
        name="totalPrice"
        rules={[{ required: true, message: "pls input totalPrice" }]}
      >
        <Input defaultValue={totalPrice} />
      </Form.Item>
      <Form.Item
        label={"isPaid"}
        name="isPaid"
        rules={[{ required: true, message: "pls input isPaid" }]}
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
