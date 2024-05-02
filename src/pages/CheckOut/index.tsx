import React, { useEffect, useState, useRef } from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, Switch } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { TbTruckDelivery } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { IStateProduct } from '../../common/redux/type'
import { createOrder, getCartItems, deleteCart } from '../../features/cart'
import {
  getProvinces,
  getDistricts,
  getWards,
  getShippingOrders,
} from '../../features/address'

import { fetchAllProducts } from '../../features/product'
import { fetchVoucher, fetchOneVoucher } from '../../features/voucher'

import { IUsers } from '../../common/users'
import { createPaymentUrl } from '../../features/vnPay'
import type { InputRef } from 'antd'
const CheckOut = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const state = useSelector((state: any) => state.cart.cartItems)
  const order = useSelector((state: any) => state.cart.orderData)
  const provinces = useSelector((state: any) => state.address.province)
  const districts = useSelector((state: any) => state.address.district)
  const wards = useSelector((state: any) => state.address.ward)
  const shippingOrder = useSelector((state: any) => state.address.shipping)
  const data = useSelector((state: any) => state.voucher.vouchers)
  const voucher = useSelector((state: any) => state.voucher.voucher)
  const [province, setProvince] = useState(null)
  const [district, setDistrict] = useState(null)
  const [ward, setWard] = useState(null)
  const [voucherr, setVoucher] = useState('')
  const [voucherName, setVoucherName] = useState('')
  const cartSession = JSON.parse(sessionStorage.getItem('cart'))
  console.log(voucherName)
  const accessToken = localStorage.getItem('accessToken')
  let totalCart = 0
  cartSession?.cartItems.forEach((item: any) => {
    totalCart += item.price * item.quantity
  })
  state?.cart?.cartItems.forEach((item: any) => {
    totalCart += item.price * item.quantity
  })

  const totalPrice = district
    ? voucher?.data?.Code === voucherr
      ? shippingOrder?.service_fee + totalCart - voucher?.data?.reduced_amount
      : shippingOrder?.service_fee + totalCart
    : totalCart
  console.log(totalPrice)
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
  const items = state?.cart
    ? state.cart.cartItems.map((cartItem: any) => {
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
    dispatch(fetchVoucher())
    dispatch(fetchOneVoucher(voucherr))
  }, [province, district, ward, order, voucherr, voucherName])
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
        if (state.cart) {
          const { cartItems } = state?.cart
          const data = await dispatch(
            createOrder({
              cartItems,
              shippingAddress,
              payment_method,
              totalPrice,
              voucherName,
            }),
          )
          dispatch(deleteCart(state?.cart._id))

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
          const data = await dispatch(
            createOrder({
              cartItems,
              shippingAddress,
              payment_method,
              totalPrice,
              voucherName,
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
        if (payment_method === 'vnPay' && data) {
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
        navigate('../../order/guest')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const today = new Date()
  console.log(today)
  const formattedDate = today.toISOString()
  const validatePhone = (rule: any, value: any, callback: any) => {
    const phoneRegex = /^[0-9]{10,}$/
    if (value && !phoneRegex.test(value)) {
      callback('Please enter a valid phone number!')
    } else {
      callback()
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
  const handleChangeVoucher = (value: any, option: any) => {
    console.log(option)
    setVoucherName(value)
    setVoucher(option.data_voucher_code)
  }
  return (
    <div className="mt-[100px] w-[60%] mx-auto">
      <div className="grid grid-cols-2">
        <div className="checkout_body col-span-1">
          <div>
<<<<<<< Updated upstream
            <h2 className="text-xl mb-4">
              How would you like to get your order?
=======
            <h2 className="text-xl  mb-4">
              Bạn muốn nhận đơn hàng bằng cách nào?
>>>>>>> Stashed changes
            </h2>

            <Button
              block
              className="h-20 rounded-xl mb-12 border-black hover:!border-black hover:!text-black"
            >
              <p className="flex items-center text-left text-xl px-3">
                <TbTruckDelivery
                  style={{ fontSize: '32px', marginRight: '12px' }}
                />
                Giao hàng
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
                <h2 className="text-2xl mb-4">Thông tin giao hàng của bạn</h2>

                <Form.Item
                  name="firstName"
                  rules={[
                    { required: true, message: 'Please enter your last name!' },
                    {
<<<<<<< Updated upstream
                      min: 7,
                      message: 'First name must be at least 10 characters.',
=======
                      required: true,
                      message: 'Vui lòng nhập tên của bạn!',
                    },
                    {
                      min: 2,
                      message: 'Tên phải có ít nhất 2 ký tự.',
>>>>>>> Stashed changes
                    },
                  ]}
                >
                  <Input
                    name="firstName"
                    className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4"
                    size="large"
                    placeholder="Tên"
                  />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  rules={[
                    { required: true, message: 'Vui lòng nhập họ của bạn!' },
                    {
                      min: 2,
<<<<<<< Updated upstream
                      message: 'First name must be at least 4 characters.',
=======
                      message: 'Họ phải có ít nhất 2 ký tự.',
>>>>>>> Stashed changes
                    },
                  ]}
                >
                  <Input
                    name="lastName"
                    className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4"
                    size="large"
                    placeholder="Họ"
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
                      message: 'Vui lòng nhập số điện thoại của bạn!',
                    },
                    { validator: validatePhone },
                  ]}
                >
                  <Input
                    type="text"
                    className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4"
                    size="large"
                    placeholder="Số điện thoại"
                  />
                </Form.Item>

                <Form.Item
                  name="province"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn Tỉnh/ Thành phố!',
                    },
                  ]}
                >
                  <Select
                    className=""
                    size="large"
                    placeholder="Tỉnh/ Thành phố!"
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
                        message: 'Vui lòng chọn Quận/ Huyện',
                      },
                    ]}
                  >
                    <Select
                      className=""
                      size="large"
                      placeholder="Quận/ Huyện"
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
                        message: 'Vui lòng chọn Phường/ Xã!',
                      },
                    ]}
                  >
                    <Select
                      className=""
                      size="large"
                      onChange={hanlderChangeWard}
<<<<<<< Updated upstream
                      placeholder="Ward"
=======
                      placeholder="Phường/ Xã"
>>>>>>> Stashed changes
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
                      message: 'Vui lòng nhập địa chỉ chi tiết!',
                    },
                    {
                      min: 4,
                      message: 'Địa chỉ chi tiết phải có ít nhất 4 ký tự.',
                    },
                  ]}
                >
                  <Input
                    className="border border-[#ccc] bg-white hover:bg-white hover:border-black focus:border-black p-4"
                    size="large"
                    placeholder="Địa chỉ chi tiết, số nhà hoặc địa điểm dễ tìm..."
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
                  <Radio value="Thanh toán tiền mặt">Thanh toán tiền mặt</Radio>
                  <Radio value="vnPay">Ví VNPAY</Radio>
                </Radio.Group>
              </Form.Item>
              {state?.cart?.cartItems.length > 0 ||
                cartSession?.cartItems.length > 0 ? (
                <Button
                  type="default"
                  htmlType="submit"
                  block
                  className="bg-[#f5f5f5] text-[#757575] h-[60px]  border-[#f5f5f5] rounded-full mb-12 hover:!bg-black hover:!text-white hover:!border-black"
                >
                  <p className="text-lg ">Thanh toán</p>
                </Button>
              ) : null}
            </Form>
          </div>
        </div>
        <div className="checkout_summary col-span-1 ml-20">
          <h2 className="text-[22px]">Tóm tắt đặt hàng</h2>
          <div className="text-lg font-normal">
            <div className="flex justify-between items-center my-5">
<<<<<<< Updated upstream
              <div className="text-[#6b7280]">Subtotal</div>
              <div className="text-[#6b7280]">
                {totalCart} <span>đ</span>
              </div>
=======
              <div className="text-[#6b7280]">Tổng phụ</div>
              <div className="text-[#6b7280]">{formatCurrency(totalCart)}</div>
>>>>>>> Stashed changes
            </div>
            <div className="flex justify-between items-center my-5">
              <div className="text-[#6b7280]">Giao hàng/Vận chuyển</div>
              <div className="text-[#6b7280]">
<<<<<<< Updated upstream
                {district ? shippingOrder?.service_fee + 'đ' : 'Free'}
              </div>
            </div>
            <hr />
            <div className="flex justify-between items-center my-5">
              <div className="text-[#6b7280]">Voucher</div>
=======
                {district ? formatCurrency(shippingOrder?.service_fee) : 'Miễn phí'}
              </div>
            </div>
            <hr />
            <div className="flex justify-between gap-20 items-center my-5">
              <div className="text-[#6b7280]">Mã giảm giá</div>
>>>>>>> Stashed changes
              <div>
                {data.length > 0 ? (
                  <Form className="pt-[26px]">
                    <Form.Item name="Code">
                      <Select
                        defaultValue="hãy chọn mã giảm giá"
                        onChange={handleChangeVoucher}
                      >
                        {data?.map((voucher: any, index: number) => (
                          <Select.Option
                            key={index}
                            value={voucher.Name}
                            data_voucher_code={voucher.Code}
                            disabled={
                              !(
                                voucher.start_date < formattedDate &&
                                formattedDate < voucher.expiration_date
                              ) ||
                              totalPrice < voucher.price_order ||
                              voucher.Quantity <= 0
                            }
                          >
                            {voucher.Name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form>
                ) : (
                  <p className="text-[#6b7280] text-xs">
                    Hãy trở thành thành viên để nhận được những ưu đãi hấp dẫn
                  </p>
                )}
              </div>
            </div>
            <hr />
            <div className="flex justify-between items-center my-5">
<<<<<<< Updated upstream
              <div>Total</div>
              <div>
                {totalPrice}
                <span className="font-light">đ</span>
              </div>
=======
              <div>Tổng cộng</div>
              <div>{formatCurrency(totalPrice)}</div>
>>>>>>> Stashed changes
            </div>
            <hr />
          </div>
          <div className="grid grid-cols-2 mt-10 gap-y-2 gap-x-2">
            {state?.cart?.cartItems.length > 0 ||
              cartSession?.cartItems.length > 0 ? (
              <>
                {state?.cart?.cartItems.map((cartItem: any, index: number) => (
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
                      <h2 className="text-xl">
                        {getProductName(item.product)}
                      </h2>
                      <p className="text-[#6b7280]">
<<<<<<< Updated upstream
                        {getCateName(item.product)}
                      </p>
                      <p className="text-[#6b7280]">{item.size}</p>
                      <p className="text-[#6b7280]">{item.quantity}</p>
                      <p className="text-[#6b7280]">
                        {item.price * item.quantity}
=======
                        Danh mục: {getCateName(item.product)}
                      </p>
                      <p className="text-[#6b7280]">Kích cỡ: {item.size}</p>
                      <p className="text-[#6b7280]">Màu sắc: {item.color}</p>
                      <p className="text-[#6b7280]">
                        Số lượng: {item.quantity}
                      </p>
                      <p className="text-[#6b7280]">
                        Giá: {formatCurrency(item.price * item.quantity)}
>>>>>>> Stashed changes
                      </p>
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
