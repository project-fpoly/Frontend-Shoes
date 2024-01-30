import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "../../features/product";
import { AppDispatch } from "../../redux/store";
import { Col, Row, Space, Typography } from "antd";
import Popular from "./Popular";
import Banner from "./Banner";
import "./index.css"

// import style from "../Home/index.module.scss";

const { Title } = Typography;

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
            <div style={{ position: 'relative' }}>
              <img
                src="../../../public/featured1.jpg"
                style={{ height: '650px', width: '100%' }}
              />
              <Typography className="text-2xl font-bold" style={{ position: 'absolute', bottom: 100, left: 30, padding: '10px', color: 'white'}}>
                Running Shoes <br />Collection
              </Typography>
              <a href=""
                style={{position: 'absolute', bottom: 50, left: 40}} 
                className="bg-white font-medium text-lg px-5 py-3 leading-4 rounded-full"
              >
                Go
              </a>
            </div>
          </Col>
          <Col span={12}>
          <div style={{ position: 'relative' }}>
              <img
                src="../../../public/featured3.jpg"
                style={{ height: '650px', width: '100%' }}
              />
              <Typography className="text-2xl font-bold" style={{ position: 'absolute', bottom: 100, left: 30, padding: '10px', color: 'white'}}>
                Nike Versair <br />For Wherever Your Fitness
              </Typography>
              <a href=""
                style={{position: 'absolute', bottom: 50, left: 40}} 
                className="bg-white font-medium text-lg px-5 py-3 leading-4 rounded-full"
              >
                Go
              </a>
            </div>
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

      <Space direction="vertical" style={{ width: '100%', marginTop: 80 }}>
        <Row gutter={16}>
          <Col span={4}>
            <Title level={4}>Icons</Title>
            <a href="" className="text-base font-medium text-slate-500">
              Air Force 1
            </a>
          </Col>
          <Col span={4}>
            <Title level={4}>Shoes</Title>
            <a href="" className="text-base font-medium text-slate-500">
              All Shoes
            </a>
          </Col>
          <Col span={4}>
            <Title level={4}>Clothing</Title>
            <a href="" className="text-base font-medium text-slate-500">
              All Clothing
            </a>
          </Col>
          <Col span={4}>
            <Title level={4}>Kids'</Title>
            <a href="" className="text-base font-medium text-slate-500">
              Infant & Toddler Shoes
            </a>
          </Col>
        </Row>
      </Space>


    </div>
  );
};
export default Home;