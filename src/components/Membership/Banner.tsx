import { Carousel, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

const contentStyle: React.CSSProperties = {
  lineHeight: '160px',
  textAlign: 'center',
  width: '100%',
}

const Banner = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ position: 'relative' }}>
        <img src="../../../membership.jpg" style={{ ...contentStyle }} />
        <Typography
          className="text-3xl font-bold"
          style={{
            position: 'absolute',
            bottom: '65%',
            left: '35%',
            padding: '10px',
            color: 'white',
            fontSize: 75,
            fontFamily: 'fantasy',
          }}
        >
          IT'S BETTER AS
        </Typography>
        <Typography
          className="text-3xl font-bold"
          style={{
            position: 'absolute',
            bottom: '50%',
            left: '40%',
            padding: '10px',
            color: 'white',
            fontSize: 75,
            fontFamily: 'fantasy',
          }}
        >
          A MEMBER
        </Typography>
        <Typography
          className="text-lg"
          style={{
            position: 'absolute',
            bottom: '35%',
            left: '35%',
            padding: '10px',
            color: 'white',
          }}
        >
          Di chuyển, mua sắm, tùy chỉnh và ăn mừng với Nike
        </Typography>
        <Link
          style={{
            position: 'absolute',
            bottom: '22%',
            left: '48%',
            padding: '11px 15px',
          }}
          to={'/'}
          className="text-black bg-white font-medium text-medium leading-4 rounded-full"
        >
          Let's go
        </Link>
      </div>
    </Space>
  )
}

export default Banner
