import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const LoadingProduct: React.FC = () => (
  <Spin
    indicator={
      <LoadingOutlined style={{ fontSize: 80, color: 'black' }} spin />
    }
  ></Spin>
)

export default LoadingProduct
