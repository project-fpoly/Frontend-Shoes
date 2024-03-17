import { Space, Typography } from 'antd'

const Banner = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <img
        src="../../../salebanner.jpg"
        alt=""
        className="w-full"
        style={{ height: 700 }}
      />
    </Space>
  )
}

export default Banner
