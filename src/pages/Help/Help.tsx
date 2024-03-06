import { EnvironmentOutlined, MessageOutlined, MobileOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography } from "antd";

const { Title } = Typography;

const Help = () => {

    return(
        <div className="px-20">
            <Space style={{display: "flex", justifyContent: "center"}}>
                <Typography style={{fontSize: '33px'}} className="home_title">GET HELP</Typography>
            </Space>

            <Form
                className="mx-auto mb-0 max-w-md space-y-4"
                name="form_item_path"
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item className="text-black font-bold">
                <Input
                    className="font-medium border h-12 focus:border-blue-500"
                    style={{ borderColor: 'gray', fontSize: '17px', borderRadius: '10px' }}
                    placeholder="What can we help you with?"
                    suffix={
                    <Button
                        className="rounded-full btn-primary-dark btn-md"
                        htmlType="submit"
                        style={{
                            border: 'none',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: 'auto',
                        }}
                    >
                        <SearchOutlined />
                    </Button>
                    }
                />
                </Form.Item>
            </Form>

            <Space direction="vertical" className="mt-20 mb-5">
                <Title level={3}>Quick assists</Title>
                <p style={{fontSize: '17px', fontWeight: 500}}>Answers to our most frequently asked questions are just one click away.</p>
            </Space>
            <hr />
            <Space direction="vertical" className="mt-10 mb-5" style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
                <Space direction="vertical">
                    <Title level={4}>Dispatch & delivery</Title>
                    <a href="">How do I get free delivery on Nike orders?</a>
                    <a href="">What are Nike's delivery options?</a>
                    <a href="">Can my Nike order be dispatched internationally?</a>
                </Space>
                <Space direction="vertical">
                    <Title level={4}>Returns</Title>
                    <a href="">How do I return my Nike order?</a>
                    <a href="">What is Nike's returns policy?</a>
                    <a href="">Where is my refund?</a>
                </Space>
                <Space direction="vertical">
                    <Title level={4}>Nike Membership</Title>
                    <a href="">What is Nike Membership?</a>
                    <a href="">How do I become a Nike Member?</a>
                    <a href="">How do I get the most out of NRC and NTC?</a>
                </Space>
            </Space>

            <Space direction="vertical" className="mt-20 mb-5">
                <Title level={3}>Contact us</Title>
            </Space>
            <hr />
            <Space direction="vertical" className="mt-10 mb-5" style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center'}}>
                <Space direction="vertical">
                    <MobileOutlined style={{fontSize: '40px'}}/>
                    <Title level={5}>Products & orders</Title>
                    <a href="">12280903 (Viettel)</a>
                    <a href="">12032487 (VTI)</a>
                    <a href="">05:00 - 23-00</a>
                    <a href="">7 days a week</a>
                </Space>
                <Space direction="vertical" style={{textAlign: 'center'}}>
                    <MessageOutlined style={{fontSize: '40px'}}/>
                    <Title level={5}>Products & orders</Title>
                    <a href="">Chat with us</a>
                    <a href="">24 hours a day</a>
                    <a href="">7 days a week</a>
                </Space>
                <Space direction="vertical" style={{textAlign: 'center'}}>
                    <EnvironmentOutlined style={{fontSize: '40px'}}/>
                    <Title level={4}>Store locator</Title>
                </Space>
            </Space>
        </div>
    )
}

export default Help;
