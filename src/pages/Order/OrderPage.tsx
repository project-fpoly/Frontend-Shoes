/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Tabs, TabsProps } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderByUsers } from '../../features/order'
import { AppDispatch, RootState } from '../../redux/store'
import OrderItem from './OrderItem'

export default function OrderPage() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getOrderByUsers({}))
  }, [dispatch])

  const { orders } = useSelector((state: RootState) => state.order)
  console.log(orders)
  const dataGet = (data: string) =>
    orders?.filter((item: any) => item.isDelivered === data)
  const data1 = dataGet('Chờ xác nhận')
  const data2 = dataGet('Chờ lấy hàng')
  const data3 = dataGet('Đang giao hàng')
  const data4 = dataGet('Đã giao hàng')
  const data5 = dataGet('Đã hủy')

  const items: TabsProps['items'] = orders && [
    {
      key: '0',
      label: 'Chờ xác nhận',
      children: <OrderItem data={data1} />,
    },
    {
      key: 'Chờ lấy hàng',
      label: 'Chờ lấy hàng',
      children: <OrderItem data={data2} />,
    },
    {
      key: 'Đang giao hàng',
      label: 'Đang giao hàng',
      children: <OrderItem data={data3} />,
    },
    {
      key: 'Đã giao hàng',
      label: 'Đã giao hàng',
      children: <OrderItem data={data4} />,
    },
    {
      key: 'Đã hủy',
      label: 'Đã hủy',
      children: <OrderItem data={data5} />,
    },
  ]

  return (
    <div className="mt-20 px-10">
      <Tabs items={items} />
    </div>
  )
}
