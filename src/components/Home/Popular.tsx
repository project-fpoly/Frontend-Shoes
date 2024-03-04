import { Card, Col, Space, Typography } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperNavButtons } from "./SwiperNavButton";
import { A11y, Navigation, Pagination } from "swiper/modules";
import Meta from "antd/es/card/Meta";
import "swiper/css";
import "swiper/css/pagination";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IStateProduct } from "../../common/redux/type";
import { useEffect } from "react";
import { fetchAllProducts } from "../../features/product";
import "./index.css";


const Popular = () => {

  // dispact một action
  const dispact = useDispatch<AppDispatch>();

  const products = useSelector(
    (state: IStateProduct) => state.product.products
  );
//   const loading = useSelector((state: IStateProduct) => state.product.loading);

  useEffect(() => {
    dispact(fetchAllProducts());
  }, []);
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography className="home_title">Popular Right Now</Typography>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={30}
          slidesPerView="auto"
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
        >
          <div style={{ float: "right" }} className="flex items-center">
            <a href="" className="font-bold text-slate-600 mr-2">
              Shop
            </a>
            <SwiperNavButtons />
          </div>

          {products.map((item, index) => {
            return (
              <SwiperSlide className="" style={{ width: "400px" }}>
                <Col span={8}>
                  <div key={index + 1} className="mb-5">
                    <Card
                      hoverable
                      style={{ width: 400 }}
                      cover={<img alt="example" src={item.image} />}
                    >
                      <Meta title={item.name} description="Men's Shoes" />
                      <Typography
                        style={{
                          margin: "10px 0 0 0",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      >
                        {item.price}
                      </Typography>
                    </Card>
                  </div>
                </Col>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Space>
    </>
  );
};

export default Popular;
