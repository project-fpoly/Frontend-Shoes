import { Button, Space, Typography } from 'antd'
import './index.css'
import { Link } from 'react-router-dom'

const Trending = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography className="home_title">Xu hướng</Typography>
      <img
        src="../../../giay.gif"
        alt=""
        className="rounded-lg w-auto object-cover lg:w-full"
        style={{ height: 600 }}
      />

      <Space
        direction="vertical"
        style={{ width: '100%', textAlign: 'center' }}
      >
        <Typography
          className="mt-5"
          style={{ fontSize: 75, fontFamily: 'fantasy' }}
        >
          AIR JORDAN XXXVIII LOW
        </Typography>

        <Typography className="mb-5 text-lg">
        Hãy cho họ thấy cách bạn chơi bóng với Air Jordan XXXVIII Low mới nhất. Cựu sinh viên Blue' gật đầu với các biểu tượng của trường đại học <br /> lịch sử của vòng, với những mảng màu xanh lam trên hình bóng toàn màu đen của nó..
        </Typography>

        <Link
          to={''}
          className="text-white bg-black font-medium text-medium px-4 py-2 leading-4 rounded-full mt-5"
        >
          Shop
        </Link>
      </Space>
    </Space>
  )
}

export default Trending
