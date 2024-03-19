import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, Radio } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { TbTruckDelivery } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { IStateProduct } from '../../common/redux/type'
import { createOrder, getCartItems } from '../../features/cart'
import { fetchAllProducts } from '../../features/product'
import { IUsers } from '../../common/users'

const CheckOut = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { cart } = useSelector((state: any) => state.cart.cartItems)
  const cartSession = JSON.parse(sessionStorage.getItem('cart'))
  const accessToken = localStorage.getItem('accessToken')

  let totalPrice = 0

  cartSession?.cartItems.forEach((item: any) => {
    totalPrice += item.price * item.quantity
  })

  const { products } = useSelector((state: IStateProduct) => state.product)
  const { user } = useSelector((state: IUsers) => state.auth)
  const getProductName = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId)
    return product ? product.name : 'N/A'
  }
  const getCateName = (shoeId: string) => {
    const product = products.find((product: any) => product._id === shoeId)
    return product ? product.categoryId.name : 'N/A'
  }

  useEffect(() => {
    dispatch(getCartItems())
    dispatch(fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: '' }))
  }, [])
  const [form] = Form.useForm()
  const handleFormSubmit = (formValues: {
    fullname: string
    email: string
    phone: string
    address: string
  }) => {
    const request = {
      shippingAddress: {
        fullname: formValues.fullname,
        address: formValues.address,
        email: formValues.email,
        phone: formValues.phone,
      },
      payment_method: formValues.payment_method,
    }
    const { shippingAddress, payment_method } = request
    if (accessToken) {
      if (cart) {
        const { cartItems } = cart
        dispatch(createOrder({ cartItems, shippingAddress, payment_method }))
        sessionStorage.removeItem('cart')
        navigate('../../order')
      } else {
        const { cartItems } = cartSession
        dispatch(createOrder({ cartItems, shippingAddress, payment_method }))
        sessionStorage.removeItem('cart')
        navigate('../../order')
      }
    } else {
      const { cartItems } = cartSession

      dispatch(
        createOrder({ cartItems, shippingAddress, payment_method, totalPrice }),
      )
      sessionStorage.removeItem('cart')
      navigate('../../order')
    }
  }
  const fullname = user?.userName
  const address = user?.deliveryAddress
  const email = user?.email
  const phone = user?.phoneNumbers

  React.useEffect(() => {
    form.setFieldsValue({
      fullname,
      address,
      email,
      phone,
    })
  }, [form, fullname])
  return (
    <div className="mt-[100px] w-[60%] mx-auto">
      <div className="grid grid-cols-2">
        <div className="checkout_body col-span-1">
          <div>
            <h2 className="text-xl mb-4">
              How would you like to get your order?
            </h2>

            <Button
              block
              className="h-20 rounded-xl mb-12 border-black hover:!border-black hover:!text-black"
            >
              <p className="flex items-center text-left text-xl px-3">
                <TbTruckDelivery
                  style={{ fontSize: '32px', marginRight: '12px' }}
                />
                Deliver It
              </p>
            </Button>
          </div>

          {/* Name and Address */}
          <div className="my-10">
            <Form
              form={form}
              name="basic"
              variant="filled"
              autoComplete="off"
              onFinish={handleFormSubmit}
            >
              <div className="">
                <h2 className="text-2xl mb-4">Your delivery information</h2>

                <Form.Item
                  name="fullname"
                  rules={[
                    { required: true, message: 'Please enter your last name!' },
                  ]}
                >
                  <Input
                    name="fullname"
                    className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4"
                    size="large"
                    placeholder="Fullname"
                  />
                </Form.Item>

                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your address details!',
                    },
                  ]}
                >
                  <Input
                    className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4"
                    size="large"
                    placeholder="Address Line 1"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your Email!' },
                  ]}
                >
                  <Input
                    type="email"
                    className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4"
                    size="large"
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your phone number!',
                    },
                  ]}
                >
                  <Input
                    type="text"
                    className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4"
                    size="large"
                    placeholder="Phone Number"
                  />
                </Form.Item>
              </div>

              {/* <Checkbox onChange={onChange} className="my-12">
                I have read and consent to eShopWorld processing my information
                in accordance with the{" "}
                <a
                  href="#"
                  className="underline hover:underline text-[#757575] hover:text-[#ccc]"
                >
                  Privacy Statement
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="underline hover:underline text-[#757575] hover:text-[#ccc]"
                >
                  Cookie Policy
                </a>{" "}
                . eShopWorld is a trusted Nike partner.
              </Checkbox> */}

              {/* <Form.Item name="fieldA" valuePropName="checked">
                                <Checkbox />
                            </Form.Item> */}
              <Form.Item
                name="payment_method"
                rules={[
                  { required: true, message: 'Please select payment method!' },
                ]}
                initialValue="Thanh toán tiền mặt"
              >
                <Radio.Group defaultValue="Thanh toán tiền mặt">
                  <Radio value="Thanh toán tiền mặt">Cash on delivery</Radio>
                  <Radio value="vnpay">VNPAY</Radio>
                </Radio.Group>
              </Form.Item>
              <Button
                type="default"
                htmlType="submit"
                block
                className="bg-[#f5f5f5] text-[#757575] h-[60px]  border-[#f5f5f5] rounded-full mb-12 hover:!bg-black hover:!text-white hover:!border-black"
              >
                <p className="text-lg ">Check out</p>
              </Button>
            </Form>
          </div>
        </div>
        <div className="checkout_summary col-span-1 ml-20">
          <h2 className="text-[22px]">Order Summary</h2>
          <div className="text-lg font-normal">
            <div className="flex justify-between items-center my-5">
              <div className="text-[#6b7280]">Subtotal</div>
              <div className="text-[#6b7280]">
                {cart ? cart?.totalPrice : totalPrice} <span>VND</span>
              </div>
            </div>
            <div className="flex justify-between items-center my-5">
              <div className="text-[#6b7280]">Delivery/Shipping</div>
              <div className="text-[#6b7280]">Free</div>
            </div>
            <hr />
            <div className="flex justify-between items-center my-5">
              <div>Total</div>
              <div>
                {cart ? cart?.totalPrice : totalPrice}{' '}
                <span className="font-light">VND</span>
              </div>
            </div>
            <hr />
          </div>
          <div className="grid grid-cols-2 mt-10 gap-y-2 gap-x-2">
            {cart
              ? cart?.cartItems.map((cartItem: any, index: number) => (
                  <>
                    <div key={index} className="col-span-1">
                      <figure className="col-span-1">
                        <Link to={'/'}>
                          <img src={cartItem.images[0]} alt="" />
                        </Link>
                      </figure>
                    </div>
                    <div className="col-span-1">
                      <h2 className="text-xl">
                        {getProductName(cartItem.product)}
                      </h2>
                      <p className="text-[#6b7280]">
                        {getCateName(cartItem.product)}
                      </p>
                      <p className="text-[#6b7280]">{cartItem.size}</p>
                      <p className="text-[#6b7280]">{cartItem.quantity}</p>
                      <p className="text-[#6b7280]">{cartItem.price}</p>
                    </div>
                  </>
                ))
              : cartSession?.cartItems.map((item: any, index: number) => (
                  <>
                    <div key={index} className="col-span-1">
                      <figure className="col-span-1">
                        <Link to={'/'}>
                          <img src={item.images[0]} alt="" />
                        </Link>
                      </figure>
                    </div>
                    <div className="col-span-1">
                      <h2 className="text-xl">
                        {getProductName(item.product)}
                      </h2>
                      <p className="text-[#6b7280]">
                        {getCateName(item.product)}
                      </p>
                      <p className="text-[#6b7280]">{item.size}</p>
                      <p className="text-[#6b7280]">{item.quantity}</p>
                      <p className="text-[#6b7280]">
                        {item.price * item.quantity}
                      </p>
                    </div>
                  </>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
