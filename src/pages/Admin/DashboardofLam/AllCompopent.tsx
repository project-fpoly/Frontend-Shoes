import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'antd'
import { getChart } from '../../../services/dashboard'

const AllCompopent = ({ id }: { id: string }) => {
  const [data, setData] = useState<any>({})

  useEffect(() => {
    getChart(id, '2003-03-26', '2024-03-26',"day").then((resp) => {
      const data = resp.data[0]
      setData(data)
    })
  }, [id])

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Tổng số hóa đơn">
            <p>{data.data?.totalAllBill}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Tổng doanh thu">
            <p>
              {(data.data?.totalRevenue || 0).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </p>
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Tổng số người dùng">
            <p>{data.data?.totalUser}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Tổng số sản phẩm">
            <p>{data.data?.totalProduct}</p>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        {Object.entries(data.data?.totalByStatus || {}).map(
          ([status, value]: any) => (
            <Col span={6} key={status}>
              <Card title={`Tổng số đơn hàng ${status}`}>
                <p>{value.toString()}</p>
              </Card>
            </Col>
          ),
        )}
      </Row>
    </div>
  )
}

export default AllCompopent
