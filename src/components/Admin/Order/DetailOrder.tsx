import { Card, Image, Descriptions, Row, Col } from "antd";
import { IBill } from "../../../common/order";
import moment from "moment";
const DetailOrder = (order: IBill) => {
  console.log(order);
  const image = order.cartItems[0].images;
  //   const { products } = useSelector((state: IStateProduct) => state.product);
  //   console.log(products);
  //   const getProductName = (shoeId: string) => {
  //     const product = products.find((product) => product._id === shoeId);
  //     return product ? product.name : "N/A";
  //   };

  // Tạo một mảng chứa tên sản phẩm
  const productNames = order.cartItems.map((item) => item.product);
  const { fullname, address, email, phone } = order.shippingAddress;

  return (
    <Card title="Order Details" style={{ width: "100%" }}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Bill of Lading Code">
          {order._id}
        </Descriptions.Item>
        <Descriptions.Item label="Product Name">
          {productNames.map((name, index) => (
            <div key={index}>{name}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Images">
          <Row gutter={[16, 16]}>
            <Col span={6} key={image}>
              <Image width={100} src={image} />
            </Col>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item label="User Name">{order.user}</Descriptions.Item>
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
