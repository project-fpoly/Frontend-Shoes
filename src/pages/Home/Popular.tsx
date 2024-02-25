import {  Card, Col, Space, Typography } from "antd";
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperNavButtons } from "../../components/Home/SwiperNavButton";
import { A11y, Navigation,Pagination } from "swiper/modules";
import Meta from "antd/es/card/Meta";
import 'swiper/css';
import 'swiper/css/pagination';
import "./index.css"


const Trending = () => {
    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }}>
                    <Typography className="home_title">
                        Popular Right Now
                    </Typography>

                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={30}
                    slidesPerView="auto"
                    navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                >
                    <div style={{float: 'right'}} className="flex items-center mt-5">
                        <a href="" className="font-bold text-slate-600 mr-2">
                            Shop
                        </a>
                        <SwiperNavButtons/>
                    </div>
                    
                    <SwiperSlide className="" style={{width: '400px'}}>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 400 }}
                            cover={<img alt="example" src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_441,c_limit/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoes-WrLlWX.png" />}
                        >
                            <Meta title="Nike Air Force 1 '07" description="Men's Shoes" />
                            <Typography style={{
                                margin: '10px 0 0 0',
                                fontSize: '16px',
                                fontWeight: '400'
                            }}>
                                1,000,000 đ
                            </Typography>
                        </Card>
                    </Col>
                    </SwiperSlide>
                    <SwiperSlide className="" style={{width: '400px'}}>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 400 }}
                            cover={<img alt="example" src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_441,c_limit/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoes-WrLlWX.png" />}
                        >
                            <Meta title="Nike Air Force 1 '07" description="Men's Shoes" />
                            <Typography style={{
                                margin: '10px 0 0 0',
                                fontSize: '16px',
                                fontWeight: '400'
                            }}>
                                1,000,000 đ
                            </Typography>
                        </Card>
                    </Col>
                    </SwiperSlide>
                    <SwiperSlide className="" style={{width: '400px'}}>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 400 }}
                            cover={<img alt="example" src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_441,c_limit/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoes-WrLlWX.png" />}
                        >
                            <Meta title="Nike Air Force 1 '07" description="Men's Shoes" />
                            <Typography style={{
                                margin: '10px 0 0 0',
                                fontSize: '16px',
                                fontWeight: '400'
                            }}>
                                1,000,000 đ
                            </Typography>
                        </Card>
                    </Col>
                    </SwiperSlide>
                    <SwiperSlide className="" style={{width: '400px'}}>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 400 }}
                            cover={<img alt="example" src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_441,c_limit/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoes-WrLlWX.png" />}
                        >
                            <Meta title="Nike Air Force 1 '07" description="Men's Shoes" />
                            <Typography style={{
                                margin: '10px 0 0 0',
                                fontSize: '16px',
                                fontWeight: '400'
                            }}>
                                1,000,000 đ
                            </Typography>
                        </Card>
                    </Col>
                    </SwiperSlide>
                    <SwiperSlide className="" style={{width: '400px'}}>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 400 }}
                            cover={<img alt="example" src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_441,c_limit/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoes-WrLlWX.png" />}
                        >
                            <Meta title="Nike Air Force 1 '07" description="Men's Shoes" />
                            <Typography style={{
                                margin: '10px 0 0 0',
                                fontSize: '16px',
                                fontWeight: '400'
                            }}>
                                1,000,000 đ
                            </Typography>
                        </Card>
                    </Col>
                    </SwiperSlide>
                    <SwiperSlide className="" style={{width: '400px'}}>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 400 }}
                            cover={<img alt="example" src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_441,c_limit/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoes-WrLlWX.png" />}
                        >
                            <Meta title="Nike Air Force 1 '07" description="Men's Shoes" />
                            <Typography style={{
                                margin: '10px 0 0 0',
                                fontSize: '16px',
                                fontWeight: '400'
                            }}>
                                1,000,000 đ
                            </Typography>
                        </Card>
                    </Col>
                    </SwiperSlide>
        </Swiper>

            </Space>
        </>
    )
}

export default Trending;