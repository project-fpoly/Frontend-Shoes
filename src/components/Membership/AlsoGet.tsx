import { Space, Typography } from "antd";

const AlsoGet = () => {
<<<<<<< Updated upstream
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Typography className="home_title">Trending</Typography>
            <img src="../../../membership6.jpg" alt="" />
            <Typography style={{ fontSize: 20, textAlign: 'center', fontWeight: 500 }}>Receiptless Returns</Typography>
            <Typography className="mt-3" style={{ fontSize: 21, textAlign: 'center', fontWeight: 400 }}>
                Member orders can be returned on Nike.com <br />or through the Nike App.
            </Typography>
            <img className="mt-20" src="../../../membership-line.jpg" alt="" />

        </Space>
    )
=======
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography className="home_title">Khám phá</Typography>
      <img src="../../../membership6.jpg" alt="" />
      <Typography
        style={{ fontSize: 20, textAlign: 'center', fontWeight: 500 }}
      >
        Trả lại khi không nhận được hàng
      </Typography>
      <Typography
        className="mt-3"
        style={{ fontSize: 21, textAlign: 'center', fontWeight: 400 }}
      >
        Đơn đặt hàng của thành viên có thể được trả lại trên Nike.com <br />
        hoặc thông qua Ứng dụng Nike.
      </Typography>
      <img className="mt-20" src="../../../membership-line.jpg" alt="" />
    </Space>
  )
>>>>>>> Stashed changes
}

export default AlsoGet;