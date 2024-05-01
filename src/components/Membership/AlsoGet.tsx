import { Space, Typography } from 'antd'

const AlsoGet = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography className="home_title">Trending</Typography>
      <img src="../../../membership6.jpg" alt="" />
      <Typography
        style={{ fontSize: 20, textAlign: 'center', fontWeight: 500 }}
      >
        Receiptless Returns
      </Typography>
      <Typography
        className="mt-3"
        style={{ fontSize: 21, textAlign: 'center', fontWeight: 400 }}
      >
        Member orders can be returned on Nike.com <br />
        or through the Nike App.
      </Typography>
      <img className="mt-20" src="../../../membership-line.jpg" alt="" />
    </Space>
  )
}

export default AlsoGet
