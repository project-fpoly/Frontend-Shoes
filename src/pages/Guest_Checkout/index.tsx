import React from 'react'
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Select,
    TreeSelect,
} from 'antd';
import { Link } from 'react-router-dom';

type Props = {}

const { RangePicker } = DatePicker;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const Guest_Checkout = (props: Props) => {
    return (
        <div className='mt-[100px] w-[60%] mx-auto'>
            <div className='grid grid-cols-2'>
                <div className="checkout_body col-span-1">
                    <div>
                        <h2 className='text-xl mb-4'>How would you like to get your order?</h2>
                        <div>
                            <Button className='bg-white h-20 border-black border-solid mb-12'>
                                <Link to={''}>
                                    <p className='text-left text-lg'>Deliver It</p>
                                </Link>
                            </Button>
                        </div>
                        <div className='flex flex-col'>
                            <div>
                                <Button className='bg-white text-lg h-12 px-6 rounded-full mb-2'>
                                    <Link to={''}>
                                        <p>Become a member</p>
                                    </Link>
                                </Button>
                            </div>
                            <div>
                                <Button className='bg-white text-lg h-12 px-6 rounded-full'>
                                    <Link to={''}>
                                        <p>Login</p>
                                    </Link>
                                </Button>
                            </div>

                        </div>
                    </div>

                    {/* Name and Address */}
                    <div className='my-10'>
                        <h2 className='text-xl mb-4'>Enter your name and address:</h2>
                        <Form {...formItemLayout} variant="filled" style={{ maxWidth: "100%" }}>
                            <Form.Item
                                name="firstName"
                                rules={[{ required: true, message: 'Please enter your first name!' }]}
                                style={{ width: '150%' }}
                            >
                                <Input type='text' className="border border-black p-4" size="large" placeholder="First Name" />
                            </Form.Item>

                            <Form.Item
                                name="lastName"
                                rules={[{ required: true, message: 'Please enter your last name!' }]}
                                style={{ width: '150%' }}
                            >
                                <Input className="border border-black p-4" size="large" placeholder="Last Name" />
                            </Form.Item>

                            <Form.Item
                                name="addressLine1"
                                rules={[{ required: true, message: 'Please enter your address details!' }]}
                                style={{ width: '150%' }}
                            >
                                <Input className="border border-black p-4" size="large" placeholder="Address Line 1" />
                            </Form.Item>

                            <Form.Item
                                name="addressLine2"
                                // rules={[{ required: true, message: 'Please input your first name!' }]}
                                style={{ width: '150%' }}
                            >
                                <Input className="border border-black p-4" size="large" placeholder="Address Line 2" />
                            </Form.Item>

                            <Form.Item
                                name="addressLine3"
                                // rules={[{ required: true, message: 'Please input your first name!' }]}
                                style={{ width: '150%' }}
                            >
                                <Input className="border border-black p-4" size="large" placeholder="Address Line 3" />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: 0, width: "150%" }}>
                                <Form.Item
                                    name="postalCode"
                                    rules={[{ required: true }]}
                                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                >
                                    <Input className="border border-black p-4" size="large" placeholder="Postal Code" />
                                </Form.Item>
                                <Form.Item
                                    name="city"
                                    rules={[{ required: true, message: 'Please enter City/Municipality!' }]}
                                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                >
                                    <Input className="border border-black p-4" size="large" placeholder="City" />
                                </Form.Item>
                            </Form.Item>

                            <Form.Item
                                name="province"
                                rules={[{ required: true, message: 'Please enter a Province!' }]}
                                style={{ width: '150%' }}
                            >
                                <Select className='rounded-lg' style={{ width: "100%", height: 56, border: "1px solid black" }} size='large' placeholder="Provine/Municipality" >
                                    <Option value="Provine/Municipality"></Option>
                                    <Option value="Zhejiang">Zhejiang</Option>
                                    <Option value="Jiangsu">Jiangsu</Option>
                                </Select>
                                {/* <Input className="border border-black p-4" size="large" placeholder="Provine/Municipality" /> */}
                            </Form.Item>

                            <Form.Item
                                name="vietNam"
                                // rules={[{ required: true, message: 'Please input your first name!' }]}
                                className=''
                                style={{ width: '150%' }}
                            >

                                <Select
                                    defaultValue="Việt Nam"
                                    className='rounded-lg'
                                    style={{ width: "100%", height: 56, border: "1px solid black" }}
                                    disabled
                                    size='large'
                                    options={[{ value: 'vietnam', label: 'Việt Nam' }]}
                                />
                            </Form.Item>
                        </Form>
                    </div>

                    {/* Contact information */}
                    <div className='my-10'>
                        <h2 className='text-xl mb-4'>What's your contact information?</h2>
                        <Form {...formItemLayout} variant="filled" style={{ maxWidth: "100%" }}>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please enter your Email!' }]}
                                style={{ width: '150%' }}
                            >
                                <Input type='email' className="border border-black p-4" size="large" placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Please enter your last name!' }]}
                                style={{ width: '150%' }}
                            >
                                <Input type='number' className="border border-black p-4" size="large" placeholder="Phone Number" />
                            </Form.Item>

                            <Button block className='bg-white h-20 border-black border-solid hover:border-black mb-12'>
                                <Link to={''}>
                                    <p className=''>Continue</p>
                                </Link>
                            </Button>


                        </Form>
                    </div>
                </div>
                <div className="checkout_summary col-span-1">
                    <h2 className='text-[22px]'>Order Summary</h2>
                </div>
            </div>
        </div >
    )
}

export default Guest_Checkout