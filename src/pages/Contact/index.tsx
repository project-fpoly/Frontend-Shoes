import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import './index.css'
import Title from 'antd/es/typography/Title';
import { EnvironmentOutlined, MessageOutlined, MobileOutlined } from '@ant-design/icons';

const Contact = () => {
<<<<<<< Updated upstream
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
                    <Typography className='font-bold text-4xl text-center'>Contact Us</Typography>
                    <Typography className='text-base mt-5 text-center'>“We're Here to Help! Reach out to us anytime and we'll happily answer your questions”</Typography>

                    <Space direction='vertical' className='px-10 py-5 mt-10 w-full h-96 bg-zinc-100 rounded-md'>
                        <Typography className='font-bold text-2xl mb-3 text-slate-500'>Send Message</Typography>

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
                className="mt-20 mb-5 grid grid-cols-3 text-center"
            >
                <Space direction="vertical">
                    <MobileOutlined className='text-4xl' />
                    <Title level={5}>Products & orders</Title>
                    <a href="">0342683960 (Viettel)</a>
                    <a href="">05:00 - 23-00</a>
                </Space>
                <Space direction="vertical">
                    <MessageOutlined className='text-4xl' />
                    <Title level={5}>Email</Title>
                    <a href="">ntl260303@gmail.com</a>
                    <a href="">05:00 - 23-00</a>
                    <a href="">7 days a week</a>
                </Space>
                <Space direction="vertical">
                    <EnvironmentOutlined className='text-4xl' />
                    <Title level={4}>Store locator</Title>
                    <a href="">FPT Polytechnic Building, <br />13 Trinh Van Bo Ward, <br />Xuan Phuong, Nam Tu Liem, Hanoi</a>
                </Space>
            </Space>
        </div>
    );
};

export default Contact;
=======
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
          <ChatsPage></ChatsPage>
          <Typography className="font-bold text-4xl text-center">
            Liên hệ chúng tôi
          </Typography>
          <Typography className="text-base mt-5 text-center">
            “Chúng tôi ở đây để giúp đỡ! Hãy liên hệ với chúng tôi bất cứ lúc nào và chúng tôi sẽ vui vẻ trả lời câu hỏi của bạn”
          </Typography>

          <Space
            direction="vertical"
            className="px-10 py-5 mt-10 w-full h-96 bg-zinc-100 rounded-md"
          >
            <Typography className="font-bold text-2xl mb-3 text-slate-500">
              Gửi tin nhắn
            </Typography>

            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
            >
              <Input size="large" placeholder="Tên của bạn" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
            >
              <Input size="large" placeholder="Email của bạn" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập tin nhắn của bạn!' },
              ]}
            >
              <Input size="large" placeholder="Tin nhắn của bạn..." />
            </Form.Item>

            <Button className="w-full bg-black text-white h-11 text-lg">
              Gửi
            </Button>
          </Space>
        </Col>
      </Row>

      <Space
        direction="vertical"
        className="mt-20 mb-5 grid grid-cols-3 text-center"
      >
        <Space direction="vertical">
          <MobileOutlined className="text-4xl" />
          <Title level={5}>Sản phẩm & đơn đặt hàng</Title>
          <a href="">0342683960 (Viettel)</a>
          <a href="">05:00 - 23-00</a>
        </Space>
        <Space direction="vertical">
          <MessageOutlined className="text-4xl" />
          <Title level={5}>Email</Title>
          <a href="">ntl260303@gmail.com</a>
          <a href="">05:00 - 23-00</a>
          <a href="">7 days a week</a>
        </Space>
        <Space direction="vertical">
          <EnvironmentOutlined className="text-4xl" />
          <Title level={4}>Định vị cửa hàng</Title>
          <a href="">
            Tòa nhà FPT Polytechnic , <br />
            13 Trịnh Văn Bô, <br />
            Xuân Phuơng, Nam Từ Liêm, Hà Nội
          </a>
        </Space>
      </Space>
    </div>
  )
}

export default Contact
>>>>>>> Stashed changes
