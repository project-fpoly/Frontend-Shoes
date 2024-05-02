import { Carousel, Space, Typography } from 'antd'
import './index.css'
import { Link } from 'react-router-dom'

const contentStyle: React.CSSProperties = {
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

const Banner = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Carousel autoplay autoplaySpeed={3000} style={{ width: '100%' }}>
        <div>
          <img
            className="rounded-lg img_banner w-full object-cover"
            src="../../../banner.jpg"
            alt="Banner 1"
            style={{ ...contentStyle }}
          />
        </div>
        <div>
          <img
            className="img_banner w-full rounded-lg object-cover"
            src="../../../banner2.jpg"
            alt="Banner 3"
            style={{ ...contentStyle, objectFit: 'cover' }}
          />
        </div>
        <div>
          <img
            className="img_banner w-full rounded-lg object-cover"
            src="../../../banner3.jpg"
            alt="Banner 3"
            style={{ ...contentStyle, objectFit: 'cover' }}
          />
        </div>
      </Carousel>

      <Space
        direction="vertical"
        style={{ width: '100%', textAlign: 'center' }}
      >
        <Typography
          className="mt-5"
          style={{ fontSize: 75, fontFamily: 'fantasy' }}
        >
          PHONG CÁCH
        </Typography>

        <Typography className="mb-5 text-lg">
        Có nghĩa là cho ánh đèn sân khấu. Air Units xếp chồng đôi biến hình bóng cổ điển thành biểu tượng hiện đại. Tuyên bố táo bạo ở Air Max 90 mới <br />
        LV8, được tạo kiểu bởi NewJeans.
        </Typography>

        <Space>
          <Link
            to={''}
            className="text-white bg-black font-medium text-medium px-4 py-2 leading-4 rounded-full mt-5"
          >
            Shop
          </Link>
          <Link
            to={''}
            className="text-white bg-black font-medium text-medium px-4 py-2 leading-4 rounded-full mt-5"
          >
            Tìm hiểu thêm
          </Link>
        </Space>
      </Space>
    </Space>
  )
}

export default Banner
