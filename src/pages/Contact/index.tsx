import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import './index.css'
import Title from 'antd/es/typography/Title';
import { EnvironmentOutlined, MessageOutlined, MobileOutlined } from '@ant-design/icons';

const Contact = () => {
    return (
        <div className="px-10 pt-10">
            <Row gutter={[80, 80]} style={{ alignItems: 'center' }}>
                <Col span={12}>
                    <iframe
                        id="googleMapsIframe"
                        src="https://www.google.com/maps/d/u/0/embed?mid=1SPClpNa59O62CU1ReC_hRLoYm5EP3zA"
                        width="100%"
                        height="500"
                    ></iframe>
                </Col>
                <Col span={12}>
                    <Typography className='contact-title'>Contact Us</Typography>
                    <Typography className='slogan'>“We're Here to Help! Reach out to us anytime and we'll happily answer your questions”</Typography>

                    <Space direction='vertical' className='px-7 py-3 mt-10' style={{ width: '100%', height: 350, background: '#EEE', borderRadius: 5 }}>
                        <Typography className='send-title mb-3'>Send Message</Typography>

                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input
                                size="large"
                                placeholder="Name"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                size="large"
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your message!' }]}
                        >
                            <Input
                                size="large"
                                placeholder="Type your message..."
                            />
                        </Form.Item>

                        <Button className='w-full bg-black text-white h-11 text-lg'>Send</Button>
                    </Space>
                </Col>
            </Row>

            <Space
                direction="vertical"
                className="mt-20 mb-5"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    textAlign: 'center',
                }}
            >
                <Space direction="vertical">
                    <MobileOutlined style={{ fontSize: '30px' }} />
                    <Title level={5}>Products & orders</Title>
                    <a href="">0342683960 (Viettel)</a>
                    <a href="">05:00 - 23-00</a>
                </Space>
                <Space direction="vertical">
                    <MessageOutlined style={{ fontSize: '30px' }} />
                    <Title level={5}>Email</Title>
                    <a href="">ntl260303@gmail.com</a>
                    <a href="">05:00 - 23-00</a>
                    <a href="">7 days a week</a>
                </Space>
                <Space direction="vertical">
                    <EnvironmentOutlined style={{ fontSize: '30px' }} />
                    <Title level={4}>Store locator</Title>
                    <a href="">FPT Polytechnic Building, <br />13 Trinh Van Bo Ward, <br />Xuan Phuong, Nam Tu Liem, Hanoi</a>
                </Space>
            </Space>
        </div>
    );
};

export default Contact;
