import { Col, Row, Space, Typography } from "antd";

const Featured = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography className="home_title">Featured</Typography>
      <Row gutter={24}>
        <Col span={12}>
          <div style={{ position: "relative" }}>
            <img
              src="../../../public/featured1.jpg"
              style={{ height: "650px", width: "100%" }}
            />
            <Typography
              className="text-2xl font-bold"
              style={{
                position: "absolute",
                bottom: 100,
                left: 30,
                padding: "10px",
                color: "white",
              }}
            >
              Running Shoes <br />
              Collection
            </Typography>
            <a
              href=""
              style={{ position: "absolute", bottom: 50, left: 40 }}
              className="bg-white font-medium text-lg px-5 py-3 leading-4 rounded-full"
            >
              Go
            </a>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ position: "relative" }}>
            <img
              src="../../../public/featured3.jpg"
              style={{ height: "650px", width: "100%" }}
            />
            <Typography
              className="text-2xl font-bold"
              style={{
                position: "absolute",
                bottom: 100,
                left: 30,
                padding: "10px",
                color: "white",
              }}
            >
              Nike Versair <br />
              For Wherever Your Fitness
            </Typography>
            <a
              href=""
              style={{ position: "absolute", bottom: 50, left: 40 }}
              className="bg-white font-medium text-lg px-5 py-3 leading-4 rounded-full"
            >
              Go
            </a>
          </div>
        </Col>
      </Row>
    </Space>
  );
};

export default Featured;
