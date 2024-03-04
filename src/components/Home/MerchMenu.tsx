import { Col, Row, Space, Typography } from "antd";

const { Title } = Typography;

const MerchMenu = () => {
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", marginTop: 80, padding: "0 300px 0 300px" }}
    >
      <Row
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        <Col>
          <Title level={4}>Icons</Title>
          <a href="" className="text-base font-medium text-slate-500 merchmenu">
            Air Force 1
          </a>
        </Col>
        <Col>
          <Title level={4}>Shoes</Title>
          <a href="" className="text-base font-medium text-slate-500 merchmenu">
            All Shoes
          </a>
        </Col>
        <Col>
          <Title level={4}>Clothing</Title>
          <a href="" className="text-base font-medium text-slate-500 merchmenu">
            All Clothing
          </a>
        </Col>
        <Col>
          <Title level={4}>Kids'</Title>
          <a href="" className="text-base font-medium text-slate-500 merchmenu">
            Infant & Toddler Shoes
          </a>
        </Col>
      </Row>
    </Space>
  );
};

export default MerchMenu;
