import { Col, Row, Space, Typography } from "antd";

const { Title } = Typography;

interface Shoe{
  category: string;
}
const icons: Shoe[]= [
  {
    category: "Air Force 1"
  },
  {
    category: "Huarache"
  },
  {
    category: 'Air Max 95'
  }
]
const shoes: Shoe[]= [
  {
    category: "All Shoes"
  },
  {
    category: "Custom Shoes"
  },
  {
    category: 'Running Shoes'
  }
]
const clothing: Shoe[]= [
  {
    category: "All Clothing"
  },
  {
    category: "Modest Wear"
  },
  {
    category: 'Shirt & Tops'
  }
]
const kid: Shoe[]= [
  {
    category: "Infant & Toddler"
  },
  {
    category: "Kid's Shoes"
  },
  {
    category: "Kid's Basketball Shoes"
  }
]

const categories = [
  { title: "Icons", data: icons },
  { title: "Shoes", data: shoes },
  { title: "Clothing", data: clothing },
  { title: "Kids'", data: kid }
];

const MerchMenu = () => {
  return (
    <div style={{ width: "70%", margin: "auto" }}>
    <Space direction="vertical" style={{ width: "100%", marginTop: 80, padding: "0 20px"}}>
      <Row gutter={[16, 16]} justify="space-between" align="top">
        {categories.map((category, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <Space direction="vertical">
              <Title level={4} style={{ marginBottom: '20px'}}>
                {category.title}
              </Title>
              {category.data.map((value, valueIndex) => (
                <div key={valueIndex}>
                  <a href="" className="text-base font-medium text-slate-500 merchmenu">
                    <p className="mb-3">{value.category}</p>
                  </a>
                </div>
              ))}
            </Space>
          </Col>
        ))}
      </Row>
    </Space>
  </div>
  );
};

export default MerchMenu;
