import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { getChart } from '../../../services/dashboard'
import Title from 'antd/es/typography/Title'
import '../../../App.module.scss'
const TopProduct = ({ id }: { id: string }) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getChart(id, '2003-03-26', '2024-03-26', 'day').then((resp) => {
      const chartData = resp.data[0]
      const top5product = chartData.data.top5product

      const sortedData = top5product.sort(
        (a: any, b: any) => b.sold_count - a.sold_count,
      )
      setData(sortedData)
    })
  }, [id])

  const columns = [
    {
      title: 'No.',
      dataIndex: 'index',
      key: 'index',
      render: (text: any, record: any, index: number) => index + 1,
      width: 50,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Price',
    //   dataIndex: 'price',
    //   key: 'price',
    //   width: 100,
    // },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
    },
    {
      title: 'Sold Count',
      dataIndex: 'sold_count',
      key: 'sold_count',
      width: 100,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string[]) => (
        <img
          src={image[0]}
          alt="Product"
          style={{ maxWidth: '70px', maxHeight: '70px' }}
        />
      ),
      width: 100,
    },
  ]

  return (
    <>
      <Title level={3}>Top 5 sản phẩm bán chạy</Title>
      <Table
        style={{ fontSize: '10px' }}
        dataSource={data}
        size="small"
        columns={columns}
        pagination={false}
      />
    </>
  )
}

export default TopProduct
