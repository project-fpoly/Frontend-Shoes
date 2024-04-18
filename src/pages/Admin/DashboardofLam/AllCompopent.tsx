import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Table } from 'antd'
import { getChart } from '../../../services/dashboard'

const AllCompopent = ({ id }: { id: string }) => {
  const [data, setData] = useState<any>({})

  useEffect(() => {
    getChart(id, '2003-03-26', '2024-03-26', 'day').then((resp) => {
      const data = resp.data[0]
      setData(data)
    })
  }, [id])
  const dataSource = Object.entries(data.data?.totalByStatus || {}).map(
    ([status, value]: any) => ({
      status,
      value,
    }),
  )
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Chờ xác nhận':
        return 'blue'
      case 'Chờ lấy hàng':
        return 'orange'
      case 'Đang giao hàng':
        return 'green'
      case 'Đã giao hàng':
        return 'purple'
      case 'Đã hủy':
        return 'red'
      default:
        return 'black'
    }
  }
  // Các cột của bảng
  const columns = [
    {
      title: 'Tổng số đơn hàng theo trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <span style={{ color: getStatusColor(text) }}>{text}</span>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'value',
      key: 'value',
    },
  ]
  return (
    <div>
      <Row gutter={24}>
        <Col span={6}>
          <Card
            title="Tổng số hóa đơn"
            headStyle={{
              backgroundColor: '#f0f2f5',
              color: 'blue',
              fontWeight: 'bold',
            }}
          >
            <p>{data.data?.totalAllBill}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Tổng doanh thu"
            headStyle={{
              backgroundColor: '#f0f2f5',
              color: 'blue',
              fontWeight: 'bold',
            }}
          >
            <p>
              {(data.data?.totalRevenue || 0).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </p>
          </Card>
        </Col>

        <Col span={6}>
          <Card
            title="Tổng số người dùng"
            headStyle={{
              backgroundColor: '#f0f2f5',
              color: 'blue',
              fontWeight: 'bold',
            }}
          >
            <p>{data.data?.totalUser}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Tổng số sản phẩm"
            headStyle={{
              backgroundColor: '#f0f2f5',
              color: 'blue',
              fontWeight: 'bold',
            }}
          >
            <p>{data.data?.totalProduct}</p>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Table
              dataSource={dataSource}
              size="small"
              columns={columns}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AllCompopent
