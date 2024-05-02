/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Tabs, TabsProps } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { fetchOrders } from '../../../features/order'
import { useState } from 'react'
import OrderManager from './index'
export default function OrderTab() {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedKey, setSelectedKey] = useState('0')
  const { orders, pagination, params } = useSelector(
    (state: RootState) => state.order,
  )
  const a = useSelector((state: RootState) => state.notification)
  console.log(a)
  const handleTabChange = (key: string) => {
    console.log('Tab được chọn:', key)
    setSelectedKey(key)
  }
  console.log(selectedKey)
  useEffect(() => {
    dispatch(
      fetchOrders({
        page: params.page,
        limit: params.search ? pagination.totalOrders : params.limit,
        key: selectedKey,
      }),
    )
  }, [dispatch])
  const dataGet = (data: any) =>
    orders?.filter((item: any) => item.isDelivered === data)
  const data1 = dataGet('Chờ xác nhận')
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

  const items: TabsProps['items'] = orders && [
    {
      key: '0',
      label: 'Tất cả trạng thái',
      children: (
        <OrderManager data={orders} pagi={pagination} tabKey={selectedKey} />
      ),
    },
    {
      key: 'Chờ xác nhận',
      label: 'Chờ xác nhận',

      children: (
        <OrderManager
          data={params.search ? orders : data1}
          pagi={data1Pagination}
          tabKey={selectedKey}
        />
      ),
    },
    {
      key: 'Chờ lấy hàng',
      label: 'Chờ lấy hàng',

      children: (
        <OrderManager
          data={params.search ? orders : data2}
          pagi={data2Pagination}
          tabKey={selectedKey}
        />
      ),
    },
    {
      key: 'Đang giao hàng',
      label: 'Đang giao hàng',

      children: (
        <OrderManager
          data={params.search ? orders : data3}
          pagi={data3Pagination}
          tabKey={selectedKey}
        />
      ),
    },
    {
      key: 'Đã giao hàng',
      label: 'Đã giao hàng',

      children: (
        <OrderManager
          data={params.search ? orders : data4}
          pagi={data4Pagination}
          tabKey={selectedKey}
        />
      ),
    },
    {
      key: 'Đã hủy',
      label: 'Đã hủy',

      children: (
        <OrderManager
          data={params.search ? orders : data5}
          pagination={data5Pagination}
          tabKey={selectedKey}
        />
      ),
    },
  ]

  return (
    <div className="mt-20 px-10">
      <Tabs items={items} onChange={handleTabChange} />
    </div>
  )
}
