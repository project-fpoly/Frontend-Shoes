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

  const { ordersUser, pagination, params } = useSelector(
    (state: RootState) => state.ordersUser,
  )
  const dataGet = (data: string) =>
    ordersUser?.filter((item: any) => item.isDelivered === data)

  const data1 = dataGet('Chờ xác nhận')
  console.log(data1)
  const data1Pagination = {
    limit: 10,
    totalOrder: data1.length,
    totalPages: Math.ceil(data1.length / 10),
  }
  const data2 = dataGet('Chờ lấy hàng')
  const data2Pagination = {
    limit: 10,
    totalOrder: data2.length,
    totalPages: Math.ceil(data2.length / 10),
  }
  const data3 = dataGet('Đang giao hàng')
  const data3Pagination = {
    limit: 10,
    totalOrder: data3.length,
    totalPages: Math.ceil(data3.length / 10),
  }
  const data4 = dataGet('Đã giao hàng')
  const data4Pagination = {
    limit: 10,
    totalOrder: data4.length,
    totalPages: Math.ceil(data4.length / 10),
  }
  const data5 = dataGet('Đã hủy')
  const data5Pagination = {
    limit: 10,
    totalOrder: data5.length,
    totalPages: Math.ceil(data5.length / 10),
  }

  const items: TabsProps['items'] = ordersUser && [
    {
      key: '0',
      label: 'Tất cả trạng thái',
      children: <OrderItem data={ordersUser} pagination={pagination} />,
    },
    {
      key: 'Chờ xác nhận',
      label: 'Chờ xác nhận',
      children: (
        <OrderItem
          data={params.search ? ordersUser : data1}
          pagination={data1Pagination}
        />
      ),
    },
    {
      key: 'Chờ lấy hàng',
      label: 'Chờ lấy hàng',
      children: (
        <OrderItem
          data={params.search ? ordersUser : data2}
          pagination={data2Pagination}
        />
      ),
    },
    {
      key: 'Đang giao hàng',
      label: 'Đang giao hàng',
      children: (
        <OrderItem
          data={params.search ? ordersUser : data3}
          pagination={data3Pagination}
        />
      ),
    },
    {
      key: 'Đã giao hàng',
      label: 'Đã giao hàng',
      children: (
        <OrderItem
          data={params.search ? ordersUser : data4}
          pagination={data4Pagination}
        />
      ),
    },
    {
      key: 'Đã hủy',
      label: 'Đã hủy',
      children: (
        <OrderItem
          data={params.search ? ordersUser : data5}
          pagination={data5Pagination}
        />
      ),
    },
  ]

  return (
    <div className="mt-20 px-10">
      <Tabs items={items} />
    </div>
  )
}
