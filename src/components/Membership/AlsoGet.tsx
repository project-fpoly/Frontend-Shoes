import { Space, Typography } from 'antd'

const AlsoGet = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography className="home_title">Xu hướng</Typography>
      <img src="../../../membership6.jpg" alt="" />
      <Typography
        style={{ fontSize: 20, textAlign: 'center', fontWeight: 500 }}
      >
        Trả lại không nhận được
      </Typography>
      <Typography
        className="mt-3"
        style={{ fontSize: 21, textAlign: 'center', fontWeight: 400 }}
      >
        Đơn hàng của thành viên có thể được trả lại trên Nike.com
      </Typography>
      <img className="mt-20" src="../../../membership-line.jpg" alt="" />
    </Space>
  )
}

export default AlsoGet
