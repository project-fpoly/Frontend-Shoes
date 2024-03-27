import { Card, Col, Space, Typography } from "antd";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperNavButtons } from "./SwiperNavButton";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";

const Benefits = () => {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Typography className="home_title">Member Benefits</Typography>

            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={30}
                slidesPerView="auto"
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
            >
                <div style={{ float: 'right' }} className="flex items-center">
                    <p className="font-bold text-slate-600 mr-2">Shop</p>
                    <SwiperNavButtons />
                </div>

                <SwiperSlide className="" style={{ width: '410px' }}>
                    <Col span={8}>
                        <div className="mb-5">
                            <div style={{ width: 430, position: 'relative' }}>
                                <img
                                    alt="example"
                                    src={'../../../membership1.jpg'}
                                    style={{ width: '100%', height: '100%' }}
                                />
                                <Typography
                                    style={{
                                        position: 'absolute',
                                        bottom: 150,
                                        left: 40,
                                        color: 'white',
                                        fontSize: 17,
                                        fontWeight: 500
                                    }}
                                >
                                    Member Product
                                </Typography>
                                <Typography
                                    className="text-2xl"
                                    style={{
                                        position: 'absolute',
                                        bottom: 115,
                                        left: 40,
                                        color: 'white',
                                        fontWeight: 500
                                    }}
                                >
                                    Your Exclusive Access
                                </Typography>
                                <Link style={{
                                    position: 'absolute',
                                    bottom: 50,
                                    left: 40,
                                    padding: '11px 15px',
                                    fontSize: 17
                                }}
                                    to={'/'}
                                    className="text-black bg-white font-medium text-medium leading-4 rounded-full"
                                >
                                    Shop
                                </Link>
                            </div>
                        </div>
                    </Col>
                </SwiperSlide>
                <SwiperSlide className="" style={{ width: '410px' }}>
                    <Col span={8}>
                        <div className="mb-5">
                            <div style={{ width: 430, position: 'relative' }}>
                                <img
                                    alt="example"
                                    src={'../../../membership2.jpg'}
                                    style={{ width: '100%', height: '100%' }}
                                />
                                <Typography
                                    style={{
                                        position: 'absolute',
                                        bottom: 150,
                                        left: 40,
                                        color: 'white',
                                        fontSize: 17,
                                        fontWeight: 500
                                    }}
                                >
                                    Nike By You
                                </Typography>
                                <Typography
                                    className="text-2xl"
                                    style={{
                                        position: 'absolute',
                                        bottom: 115,
                                        left: 40,
                                        color: 'white',
                                        fontWeight: 500
                                    }}
                                >
                                    Your Customisation Service
                                </Typography>
                                <Link style={{
                                    position: 'absolute',
                                    bottom: 50,
                                    left: 40,
                                    padding: '11px 15px',
                                    fontSize: 17
                                }}
                                    to={'/'}
                                    className="text-black bg-white font-medium text-medium leading-4 rounded-full"
                                >
                                    Customise
                                </Link>
                            </div>
                        </div>
                    </Col>
                </SwiperSlide>
                <SwiperSlide className="" style={{ width: '410px' }}>
                    <Col span={8}>
                        <div className="mb-5">
                            <div style={{ width: 430, position: 'relative' }}>
                                <img
                                    alt="example"
                                    src={'../../../membership3.jpg'}
                                    style={{ width: '100%', height: '100%' }}
                                />
                                <Typography
                                    style={{
                                        position: 'absolute',
                                        bottom: 150,
                                        left: 40,
                                        color: 'white',
                                        fontSize: 17,
                                        fontWeight: 500
                                    }}
                                >
                                    Member Rewards
                                </Typography>
                                <Typography
                                    className="text-2xl"
                                    style={{
                                        position: 'absolute',
                                        bottom: 115,
                                        left: 40,
                                        color: 'white',
                                        fontWeight: 500
                                    }}
                                >
                                    How We Say Thank You
                                </Typography>
                                <Link style={{
                                    position: 'absolute',
                                    bottom: 50,
                                    left: 40,
                                    padding: '11px 15px',
                                    fontSize: 17
                                }}
                                    to={'/'}
                                    className="text-black bg-white font-medium text-medium leading-4 rounded-full"
                                >
                                    Celebrate
                                </Link>
                            </div>
                        </div>
                    </Col>
                </SwiperSlide>
                <SwiperSlide className="" style={{ width: '410px' }}>
                    <Col span={8}>
                        <div className="mb-5">
                            <div style={{ width: 430, position: 'relative' }}>
                                <img
                                    alt="example"
                                    src={'../../../membership4.jpg'}
                                    style={{ width: '100%', height: '100%' }}
                                />
                                <Typography
                                    style={{
                                        position: 'absolute',
                                        bottom: 150,
                                        left: 40,
                                        color: 'white',
                                        fontSize: 17,
                                        fontWeight: 500
                                    }}
                                >
                                    Member Days
                                </Typography>
                                <Typography
                                    className="text-2xl"
                                    style={{
                                        position: 'absolute',
                                        bottom: 115,
                                        left: 40,
                                        color: 'white',
                                        fontWeight: 500
                                    }}
                                >
                                    A Celebration of You
                                </Typography>
                                <Link style={{
                                    position: 'absolute',
                                    bottom: 50,
                                    left: 40,
                                    padding: '11px 15px',
                                    fontSize: 17
                                }}
                                    to={'/'}
                                    className="text-black bg-white font-medium text-medium leading-4 rounded-full"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </Col>
                </SwiperSlide>
                <SwiperSlide className="" style={{ width: '410px' }}>
                    <Col span={8}>
                        <div className="mb-5">
                            <div style={{ width: 430, position: 'relative' }}>
                                <img
                                    alt="example"
                                    src={'../../../membership5.jpg'}
                                    style={{ width: '100%', height: '100%' }}
                                />
                                <Typography
                                    style={{
                                        position: 'absolute',
                                        bottom: 150,
                                        left: 40,
                                        color: 'white',
                                        fontSize: 17,
                                        fontWeight: 500
                                    }}
                                >
                                    Sport & Wellness Apps
                                </Typography>
                                <Typography
                                    className="text-2xl"
                                    style={{
                                        position: 'absolute',
                                        bottom: 115,
                                        left: 40,
                                        color: 'white',
                                        fontWeight: 500
                                    }}
                                >
                                    Movement Where You Are
                                </Typography>
                                <Link style={{
                                    position: 'absolute',
                                    bottom: 50,
                                    left: 40,
                                    padding: '11px 15px',
                                    fontSize: 17
                                }}
                                    to={'/'}
                                    className="text-black bg-white font-medium text-medium leading-4 rounded-full"
                                >
                                    Move
                                </Link>
                            </div>
                        </div>
                    </Col>
                </SwiperSlide>
            </Swiper>
        </Space>
    )
}

export default Benefits;