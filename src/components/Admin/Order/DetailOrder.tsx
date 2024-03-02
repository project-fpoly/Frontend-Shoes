/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Image, Descriptions, Row, Col } from "antd";
import { IBill } from "../../../common/order";
import moment from "moment";
import {} from "../../../common/redux/type";
import { IUsers } from "../../../common/users";

const DetailOrder = (order: IBill, products: any, users: IUsers) => {
  // const { users } = useSelector((state: IUsers) => state.user);
  const getProductName = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId);
    return product ? product.name : "N/A";
  };
  const getProductImage = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId);
    return product ? product.images[0] : "";
  };
  const getUserName = (userId: string) => {
    const user = users.find((user: IUsers) => user._id === userId);
    return user ? user.userName : "Khách";
  };
  const productImage = order.cartItems.map((item) =>
    getProductImage(item.product)
  );
  console.log(productImage.join(","));
  // Tạo một mảng chứa tên sản phẩm
  const productNames = order.cartItems.map((item) =>
    getProductName(item.product)
  );
  const quantity = order.cartItems.map((item) => item.quantity);
  const { fullname, address, email, phone } = order.shippingAddress;

  return (
    <Card title="Order Details" style={{ width: "100%" }}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Tracking number">
          {order.trackingNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Product Name">
          {productNames.map((name, index) => (
            <div key={index}>{name}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Quantity">{quantity}</Descriptions.Item>
        <Descriptions.Item label="Images">
          <Row gutter={[16, 16]}>
            <Col span={6} key={productImage.join(",")}>
              <Image
                src={productImage.join(",")}
                width={100}
                className="action-cell"
              />
            </Col>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item label="User Name">
          {order.user ? getUserName(order.user) : "Khách"}
        </Descriptions.Item>
        <Descriptions.Item label="Shipping Address">
          <Row gutter={16}>
            <Col span={12}>Name: {fullname}</Col>
            <Col span={12}>Email: {email}</Col>
            <Col span={12}>Address: {address}</Col>
            <Col span={12}>Phone number: {phone}</Col>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item label="Total">{order.totalPrice}</Descriptions.Item>
        <Descriptions.Item label="Paid">
          {!order.isPaid ? "Chưa thanh toán" : "Đã thanh toán"}
        </Descriptions.Item>
        <Descriptions.Item label="Delivered">
          {order.isDelivered}
        </Descriptions.Item>
        <Descriptions.Item label="Order Creation Time">
          {moment(order.createdAt).format("DD/MM/YYYY")}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default DetailOrder;
