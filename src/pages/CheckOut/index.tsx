import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Radio, Select } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { TbTruckDelivery } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { IStateProduct } from '../../common/redux/type'
import { createOrder, getCartItems } from '../../features/cart'
import {
  getProvinces,
  getDistricts,
  getWards,
  getShippingOrders,
} from '../../features/address'

import { fetchAllProducts } from '../../features/product'

import { IUsers } from '../../common/users'
import { createPaymentUrl } from '../../features/vnPay'

const CheckOut = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { cart } = useSelector((state: any) => state.cart.cartItems)
  const order = useSelector((state: any) => state.cart.orderData)
  const provinces = useSelector((state: any) => state.address.province)
  const districts = useSelector((state: any) => state.address.district)
  const wards = useSelector((state: any) => state.address.ward)
  const shippingOrder = useSelector((state: any) => state.address.shipping)
  const [province, setProvince] = useState(null)
  const [district, setDistrict] = useState(null)
  const [ward, setWard] = useState(null)
  const cartSession = JSON.parse(sessionStorage.getItem('cart'))
  const accessToken = localStorage.getItem('accessToken')
  let totalCart = 0
  cartSession?.cartItems.forEach((item: any) => {
    totalCart += item.price * item.quantity
  })
  cart?.cartItems.forEach((item: any) => {
    totalCart += item.price * item.quantity
  })
  const totalPrice = district
    ? shippingOrder?.service_fee + totalCart
    : totalCart
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
  const hanlderChangeProvince = (value: any, option: any) => {
    setProvince(option.data_province_id)
  }
  const hanlderChangeDistrict = (value: any, option: any) => {
    setDistrict(option.data_district_id)
  }
  const hanlderChangeWard = (value: any, option: any) => {
    setWard(option.data_ward_id)
  }
  const items = cart
    ? cart.cartItems.map((cartItem: any) => {
        return {
          name: getProductName(cartItem.product),
          quantity: cartItem.quantity,
          height: 200,
          weight: 1000,
          length: 200,
          width: 200,
        }
      })
    : cartSession?.cartItems.map((cartItem: any) => {
        return {
          name: getProductName(cartItem.product),
          quantity: cartItem.quantity,
          height: 200,
          weight: 1000,
          length: 200,
          width: 200,
        }
      })
  useEffect(() => {
    dispatch(getCartItems())
    dispatch(fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: '' }))
    dispatch(getProvinces('a'))
    dispatch(getDistricts(province))
    dispatch(getWards(district))
    dispatch(
      getShippingOrders({
        service_type_id: 2,
        from_district_id: 1915,
        to_district_id: district,
        to_ward_code: ward,
        height: 20,
        length: 30,
        weight: 3000,
        width: 40,
        insurance_value: 0,
        coupon: null,
        items: items,
      }),
    )
  }, [province, district, ward, order?.cartItems.length > 0])
  const [form] = Form.useForm()
  const handleFormSubmit = async (formValues: {
    firstName: string
    lastName: string
    fullname: string
    email: string
    phone: string
    address: string
    province: string
    district: string
    ward: string
    payment_method: string
  }) => {
    const request = {
      shippingAddress: {
        fullname: formValues.firstName + ' ' + formValues.lastName,
        address:
          formValues.address +
          ' ' +
          formValues.ward +
          ' ' +
          formValues.district +
          ' ' +
          formValues.province,
        email: formValues.email,
        phone: formValues.phone,
      },
      payment_method: formValues.payment_method,
    }
    const { shippingAddress, payment_method } = request
    let redirectUrl = '' as any

    try {
      if (accessToken) {
        if (cart) {
          const { cartItems } = cart
           const data = await dispatch(
            createOrder({
              cartItems,
              shippingAddress,
              payment_method,
              totalPrice,
            }),
          )
          sessionStorage.removeItem('cart')
          if (payment_method === 'vnPay' && data) {
            redirectUrl = await dispatch(
              createPaymentUrl({  
                amount: totalPrice,
                bankCode: 'VNBANK',
                language: 'vn',
                orderId: data?.payload.trackingNumber,

              }),
            )
          }
        } else if (cartSession && cartSession.cartItems) {
          const { cartItems } = cartSession
          const data =  await dispatch(
            createOrder({
              cartItems,
              shippingAddress,
              payment_method,
              totalPrice,
            }),
          )
          sessionStorage.removeItem('cart')
          if (payment_method === 'vnPay' && data) {
         
            redirectUrl = await dispatch(
              createPaymentUrl({
                amount: totalPrice,
                bankCode: 'VNBANK',
                language: 'vn',
                orderId: data?.payload.trackingNumber,
              }),
            )
          }
        }

        if (redirectUrl) {
          window.open(redirectUrl.payload, '_blank')
        }

        navigate('../../order')
      } else {
        const { cartItems } = cartSession
        const data = await dispatch(
          createOrder({
            cartItems,
            shippingAddress,
            payment_method,
            totalPrice,
          }),
        )
       
        sessionStorage.removeItem('cart')
        if (payment_method === 'vnPay'&& data) {
          console.log(totalPrice)
          console.log(data)
          redirectUrl = await dispatch(
            createPaymentUrl({
              amount: totalPrice,
              bankCode: 'VNBANK',
              language: 'vn',
              orderId: data.payload?.trackingNumber,
            }),
          )
          if (redirectUrl) {
            window.open(redirectUrl.payload, '_blank')
          }
        }
        // navigate('../../order/guest')
      }
    } catch (error) {
      console.error('Error:', error)
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
                  name="firstName"
                  rules={[
                    { required: true, message: 'Please enter your last name!' },
                  ]}
                >
                  <Input
                    name="firstName"
                    className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4"
                    size="large"
                    placeholder="First name"
                  />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  rules={[
                    { required: true, message: 'Please enter your last name!' },
                  ]}
                >
                  <Input
                    name="lastName"
                    className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4"
                    size="large"
                    placeholder="Last name"
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

                <Form.Item
                  name="province"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your Province/Municipality!',
                    },
                  ]}
                >
                  <Select
                    className=""
                    size="large"
                    placeholder="Province/Municipality"
                    onChange={hanlderChangeProvince}
                  >
                    {provinces &&
                      provinces?.map((province: any) => (
                        <Select.Option
                          key={province.ProvinceID}
                          value={province.ProvinceName}
                          data_province_id={province.ProvinceID}
                        >
                          {province.ProvinceName}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                {province && (
                  <Form.Item
                    name="district"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your District!',
                      },
                    ]}
                  >
                    <Select
                      className=""
                      size="large"
                      placeholder="District"
                      onChange={hanlderChangeDistrict}
                    >
                      {districts &&
                        districts?.map((district: any) => (
                          <Select.Option
                            key={district.DistrictID}
                            value={district.DistrictName}
                            data_district_id={district.DistrictID}
                          >
                            {district.DistrictName}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                )}
                {district && (
                  <Form.Item
                    name="ward"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Ward!',
                      },
                    ]}
                  >
                    <Select
                      className=""
                      size="large"
                      onChange={hanlderChangeWard}
                      placeholder="Ward"
                    >
                      {wards &&
                        wards.map((ward: any) => (
                          <Select.Option
                            key={ward.WardCode}
                            value={ward.WardName}
                            data_ward_id={ward.WardCode}
                          >
                            {ward.WardName}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                )}
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
                    placeholder="detailed address, house number or easy-to-find place"
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="payment_method"
                rules={[
                  { required: true, message: 'Please select payment method!' },
                ]}
                initialValue="Thanh toán tiền mặt"
              >
                <Radio.Group>
                  <Radio value="Thanh toán tiền mặt">Cash on delivery</Radio>
                  <Radio value="vnPay">VNPAY</Radio>
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
                {totalCart} <span>đ</span>
              </div>
            </div>
            <div className="flex justify-between items-center my-5">
              <div className="text-[#6b7280]">Delivery/Shipping</div>
              <div className="text-[#6b7280]">
                { district ? shippingOrder?.service_fee + 'đ' : 'Free'}
              </div>
            </div>
            <hr />
            <div className="flex justify-between items-center my-5">
              <div>Total</div>
              <div>
                {totalPrice}
                <span className="font-light">đ</span>
              </div>
            </div>
            <hr />
          </div>
          <div className="grid grid-cols-2 mt-10 gap-y-2 gap-x-2">
            {cart || cartSession ? (
              <>
                {cart?.cartItems.map((cartItem: any, index: number) => (
                  <>
                    <div key={index} className="col-span-1">
                      <figure className="col-span-1">
                        <Link to={'/'}>
                          <img src={cartItem.images[0]} alt="" />
                        </Link>
                      </figure>
                    </div>
                    <div className="col-span-1">
                      <h2 className="text-xl">{getProductName(cartItem.product)}</h2>
                      <p className="text-[#6b7280]">{getCateName(cartItem.product)}</p>
                      <p className="text-[#6b7280]">{cartItem.size}</p>
                      <p className="text-[#6b7280]">{cartItem.quantity}</p>
                      <p className="text-[#6b7280]">{cartItem.price}</p>
                    </div>
                  </>
                ))}
                {cartSession?.cartItems.map((item: any, index: number) => (
                  <>
                    <div key={index} className="col-span-1">
                      <figure className="col-span-1">
                        <Link to={'/'}>
                          <img src={item.images[0]} alt="" />
                        </Link>
                      </figure>
                    </div>
                    <div className="col-span-1">
                      <h2 className="text-xl">{getProductName(item.product)}</h2>
                      <p className="text-[#6b7280]">{getCateName(item.product)}</p>
                      <p className="text-[#6b7280]">{item.size}</p>
                      <p className="text-[#6b7280]">{item.quantity}</p>
                      <p className="text-[#6b7280]">{item.price * item.quantity}</p>
                    </div>
                  </>
                ))}
                 </>
              ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
