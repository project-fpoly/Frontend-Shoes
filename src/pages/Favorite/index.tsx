import {useEffect, useState} from "react";
import {IProduct} from "../../common/products.ts";
import {viewsFilterProducts} from "../../services/productsQuery.ts";
import {Card, Col, notification, Space, Typography} from "antd";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination} from "swiper/modules";
import {SwiperNavButtons} from "../../components/Home/SwiperNavButton.tsx";
import {Link} from "react-router-dom";
import Meta from "antd/es/card/Meta";

const Favorites = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const data = await viewsFilterProducts(10, 'desc_views')
                setProducts(data.data)
                setLoading(false)
            } catch (error) {
                console.error(error)
                notification.error({
                    message: 'Error',
                    description: 'Failed to fetch products.',
                })
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }}>

                <Typography className="home_title" style={{ paddingLeft: '50px' }}>
                    Find Your Next Favourites
                </Typography>
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

                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        products.map((item, index) => (
                            <SwiperSlide key={index} className="" style={{ width: '400px' }}>
                                <Col span={8}>
                                    <div className="mb-5">
                                        <Link to={`/detail/${item._id}`}>
                                            <Card
                                                hoverable
                                                style={{ width: 400 }}
                                                cover={
                                                    <img
                                                        alt="example"
                                                        src={item.images ? item.images[0] : ''}
                                                        style={{ maxWidth: '100%', height: '350px' }}
                                                    />
                                                }
                                            >
                                                <Meta title={item.name} description="Men's Shoe" />
                                                <Typography
                                                    style={{
                                                        margin: '10px 0 0 0',
                                                        fontSize: '16px',
                                                        fontWeight: '400',
                                                    }}
                                                >
                                                    {item.price}
                                                </Typography>
                                            </Card>
                                        </Link>
                                    </div>
                                </Col>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </Space>
        </>
    )
}

export default Favorites
