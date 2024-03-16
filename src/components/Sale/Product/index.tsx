import React, { useEffect, useState } from 'react';
import { Card, Space, Typography, notification, Row, Col } from 'antd';
import { saleFilterProducts } from '../../../services/productsQuery';
import { IProduct } from '../../../common/products';
import { Link } from 'react-router-dom';
import Sale from './sale';
import FlashSale from './flashsale';

const { Meta } = Card;

const Product = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await saleFilterProducts(10, "desc_sale");
        setProducts(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        notification.error({
          message: "Error",
          description: "Failed to fetch products.",
        });
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography.Title level={2} className="home_title">
        Are On Sale
      </Typography.Title>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          products.map((item, index) => (
            <Col key={index} className="gutter-row mb-5" span={6}>
              <Link to={`/detail/${item._id}`}>
                <Card
                  hoverable
                  style={{ width: '100%', border: '1px solid #DDDDDD', position: 'relative' }}
                  cover={
                  <img alt="Product" src={item.images ? item.images[0] : ""} style={{ height: 330 }} />}
                >
                  <Sale/>
                  <FlashSale/>
                  <Meta style={{height: '50px'}}
                    title={<div 
                        style={{
                            whiteSpace: 'normal', /* Cho phép text xuống dòng */
                            maxHeight: '3em',
                        }}
                        >{item.name}</div>}
                  />
                    <Typography
                          style={{
                            margin: "10px 0 0 0",
                            fontSize: "15px",
                            fontWeight: "400",
                            color: 'gray',
                            textDecoration: 'line-through'
                          }}
                        >
                          {item.price} đ
                    </Typography>
                    <Typography
                          style={{
                            fontSize: "17px",
                            fontWeight: "600",
                            color: 'red',
                          }}
                        >
                          {item.price} đ
                    </Typography>
                </Card>
              </Link>
            </Col>
          ))
        )}
      </Row>
    </Space>
  );
};

export default Product;
