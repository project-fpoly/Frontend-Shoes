import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "../../features/product";
import { AppDispatch } from "../../redux/store";
import { Col, Row, Space, Typography } from "antd";
import Popular from "./Popular";
import Banner from "./Banner";
import "./index.css"
// import style from "../Home/index.module.scss";

const Home = () => {
  // dispact một action
  const dispact = useDispatch<AppDispatch>();
  useEffect(() => {
    dispact(fetchAllProducts());
  }, []);

  /// chọc vào kho lấy db
  // const products = useSelector(
  //   (state: IStateProduct) => state.product.products
  // );
  // const loading = useSelector((state: IStateProduct) => state.product.loading);

  return (

    <div className="px-10">

      <Banner />

      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography className="home_title">
          Featured
        </Typography>
        <Row gutter={24}>
          <Col span={12}>
            <img
              src="../../../public/featured1.jpg"
              style={{ height: '650px', width: '100%' }}
            />
          </Col>
          <Col span={12}>
            <img
              src="../../../public/featured3.jpg"
              style={{ height: '650px', width: '100%' }}
            />
          </Col>
        </Row>
      </Space>

      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography className="home_title">
            Trending
        </Typography>
        <img src="../../../giay.gif" alt="" className="w-full" style={{height: 700}}/>
      </Space>

      <Popular />

    </div>
  );
};
export default Home;