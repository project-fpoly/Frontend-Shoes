import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Table, Button, Drawer } from 'antd'
import { getChart } from '../../../services/dashboard'
import { FallOutlined, RiseOutlined } from '@ant-design/icons'

const AllCompopent = ({ id }: { id: string }) => {
  const [data, setData] = useState<any>({})
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
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
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            title="Doanh thu trong ngày"
            headStyle={{
              backgroundColor: '#f0f2f5',
              color: 'blue',
              fontWeight: 'bold',
            }}
            extra={
              <Button type="link" onClick={showDrawer}>
                More
              </Button>
            }
          >
            <b>
              {(data.data?.billstoday || 0).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </b>
            {data.data?.percentageChange ? (
              data.data?.percentageChange > 0 ? (
                <span style={{ color: 'green' }}>
                  <RiseOutlined /> {data.data?.percentageChange}%
                </span>
              ) : (
                <span style={{ color: 'red' }}>
                  <FallOutlined /> {data.data?.percentageChange}%
                </span>
              )
            ) : (
              <p>-</p>
            )}
          </Card>
        </Col>

        <Col span={8}>
          <Card
            title="Tổng doanh thu"
            headStyle={{
              backgroundColor: '#f0f2f5',
              color: 'blue',
              fontWeight: 'bold',
            }}
          >
            <b>
              {(data.data?.totalRevenue || 0).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </b>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Doanh thu dự kiến"
            headStyle={{
              backgroundColor: '#f0f2f5',
              color: 'blue',
              fontWeight: 'bold',
            }}
          >
            <b>
              {(data.data?.expectedRevenueTotal || 0).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </b>
          </Card>
        </Col>
        
      </Row>
      <Drawer title="Basic Drawer" onClose={onClose} open={open} width={"40%"}>
      <Row gutter={[10,10]}>
      <Col span={8}>
          <Card
            title="Hóa đơn"
            headStyle={{
              backgroundColor: '#f0f2f5',
              color: 'blue',
              fontWeight: 'bold',
            }}
          >
            <p>{data.data?.totalAllBill}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Người dùng"
            headStyle={{
              backgroundColor: '#f0f2f5',
              color: 'blue',
              fontWeight: 'bold',
            }}
          >
            <p>{data.data?.totalUser}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Số sản phẩm"
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
      </Drawer>
    </div>
  )
}

export default AllCompopent
