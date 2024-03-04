import React from 'react'
import {
    Button,
    Cascader,
    Checkbox,
    CheckboxProps,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Row,
    Select,
    TreeSelect,
} from 'antd';
import { Link } from 'react-router-dom';
import "./style.css"
import { TbTruckDelivery } from 'react-icons/tb';

type Props = {}

const { RangePicker } = DatePicker;
const { Option } = Select;

// Checkbox
const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
};


const Guest_Checkout = (props: Props) => {
    return (
        <div className='mt-[100px] w-[60%] mx-auto'>
            <div className='grid grid-cols-2'>
                <div className="checkout_body col-span-1">
                    <div>
                        <h2 className='text-xl mb-4'>How would you like to get your order?</h2>
                        <Button block className='h-20 rounded-xl mb-12 border-black hover:!border-black hover:!text-black'>
                            <p className='flex items-center text-left text-xl px-3'>
                                <TbTruckDelivery style={{ fontSize: "32px", marginRight: "12px" }} />
                                Deliver It
                            </p>
                        </Button>
                        <div className='flex flex-col'>
                            <div>
                                <Button className='bg-white text-lg h-12 px-6 rounded-full hover:bg-[#d8d5d5] hover:!border-[#6b7280] hover:!text-black mb-2'>
                                    <Link to={''}>
                                        <p>Become a member</p>
                                    </Link>
                                </Button>
                            </div>
                            <div>
                                <Button className='bg-white text-lg h-12 px-6 rounded-full hover:bg-[#d8d5d5] hover:!border-[#6b7280] hover:!text-black'>
                                    <Link to={''}>
                                        <p>Login</p>
                                    </Link>
                                </Button>
                            </div>

                        </div>
                    </div>

                    {/* Name and Address */}
                    <div className='my-10'>
                        <Form variant="filled">
                            <div className=''>
                                <h2 className='text-2xl mb-4'>Enter your name and address:</h2>

                                <Form.Item
                                    name="firstName"
                                    rules={[{ required: true, message: 'Please enter your first name!' }]}
                                >
                                    <Input type='text' className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4  " size="large" placeholder="First Name" />
                                </Form.Item>


                                <Form.Item
                                    name="lastName"
                                    rules={[{ required: true, message: 'Please enter your last name!' }]}

                                >
                                    <Input className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4" size="large" placeholder="Last Name" />
                                </Form.Item>

                                <Form.Item
                                    name="addressLine1"
                                    rules={[{ required: true, message: 'Please enter your address details!' }]}

                                >
                                    <Input className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4" size="large" placeholder="Address Line 1" />
                                </Form.Item>

                                <Form.Item
                                    name="addressLine2"
                                // rules={[{ required: true, message: 'Please input your first name!' }]}

                                >
                                    <Input className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4" size="large" placeholder="Address Line 2" />
                                </Form.Item>

                                <Form.Item
                                    name="addressLine3"
                                // rules={[{ required: true, message: 'Please input your first name!' }]}

                                >
                                    <Input className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4" size="large" placeholder="Address Line 3" />
                                </Form.Item>

                                <Form.Item style={{ marginBottom: 0, }}>
                                    <Form.Item
                                        name="postalCode"
                                        // rules={[{ required: true }]}
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                    >
                                        <Input className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4" size="large" placeholder="Postal Code" />
                                    </Form.Item>
                                    <Form.Item
                                        name="city"
                                        rules={[{ required: true, message: 'Please enter City/Municipality!' }]}
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                    >
                                        <Input className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4" size="large" placeholder="City" />
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item
                                    name="province"
                                    rules={[{ required: true, message: 'Please enter a Province!' }]}
                                    className='hover:!border-black focus:!border-black'
                                >
                                    <Select
                                        className='w-full !h-[56px] rounded-lg !bg-white !border-[#ccc] hover:!border-black focus:!border-black'
                                        size='large'
                                        style={{ backgroundColor: 'transparent' }}
                                        placeholder="Provine/Municipality"

                                    >
                                        <Option value="Provine/Municipality">Provine/Municipality</Option>
                                        <Option value="Zhejiang">Zhejiang</Option>
                                        <Option value="Jiangsu">Jiangsu</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="VietNam"
                                // rules={[{ required: true, message: 'Please input your first name!' }]}

                                >
                                    <Input className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4" size="large" readOnly defaultValue="VietNam" placeholder="VietNam" />
                                </Form.Item>
                            </div>

                            {/* Contact information */}
                            <div className='mt-16'>
                                <h2 className='text-2xl mb-4'>What's your contact information?</h2>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please enter your Email!' }]}

                                >
                                    <Input type='email' className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4" size="large" placeholder="Email" />
                                </Form.Item>

                                <Form.Item
                                    name="phoneNumber"
                                    rules={[{ required: true, message: 'Please enter your phone number!' }]}

                                >
                                    <Input type='number' className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4" size="large" placeholder="Phone Number" />
                                </Form.Item>
                            </div>

                            <Checkbox onChange={onChange} className='my-12'>
                                I have read and consent to eShopWorld processing my information in accordance with the <a href="#" className='underline hover:underline text-[#757575] hover:text-[#ccc]'>Privacy Statement</a> and <a href="#" className='underline hover:underline text-[#757575] hover:text-[#ccc]'>Cookie Policy</a> . eShopWorld is a trusted Nike partner.
                            </Checkbox>

                            {/* <Form.Item name="fieldA" valuePropName="checked">
                                <Checkbox />
                            </Form.Item> */}

                            <Button type="primary" htmlType="submit" block className='bg-[#f5f5f5] text-[#757575] h-[60px]  border-[#f5f5f5] rounded-full mb-12 hover:!bg-black hover:text-white' >
                                <p className='text-lg'>Continue</p>
                            </Button>
                        </Form>
                    </div>

                </div>
                <div className="checkout_summary col-span-1 ml-20">
                    <h2 className='text-[22px]'>Order Summary</h2>
                    <div className='text-lg font-normal'>
                        <div className='flex justify-between items-center my-5'>
                            <div className='text-[#6b7280]'>Subtotal</div>
                            <div className='text-[#6b7280]'>3.000.000 <span>VND</span></div>
                        </div>
                        <div className='flex justify-between items-center my-5'>
                            <div className='text-[#6b7280]'>Delivery/Shipping</div>
                            <div className='text-[#6b7280]'>Free</div>
                        </div>
                        <hr />
                        <div className='flex justify-between items-center my-5'>
                            <div>Total</div>
                            <div>3.000.000 <span className='font-light'>VND</span></div>
                        </div>
                        <hr />
                    </div>
                    <div className='grid grid-cols-2 mt-10'>
                        <div className='col-span-1'>
                            <figure className='col-span-1'>
                                <Link to={'/'}>
                                    <img src="https://picsum.photos/200" alt="" />
                                </Link>
                            </figure>
                        </div>
                        <div className='col-span-1'>
                            <h2>Lorem ipsum dolor sit amet.</h2>
                            <p className='text-[#6b7280]'>Lorem, ipsum.</p>
                            <p className='text-[#6b7280]'>Lorem, ipsum.</p>
                            <p className='text-[#6b7280]'>3.000.000d</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Guest_Checkout