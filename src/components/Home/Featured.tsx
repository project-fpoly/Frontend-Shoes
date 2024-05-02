import { Col, Row, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

const Featured = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
<<<<<<< Updated upstream
      <Typography className="home_title">Featured</Typography>
      <Row gutter={24}>
        <Col span={12}>
          <div style={{ position: 'relative' }}>
            <img
              src="../../../public/nam.jpg"
              style={{ height: '650px', width: '100%' }}
            />
            <Typography
              className="text-3xl font-bold"
              style={{
                position: 'absolute',
                bottom: 100,
                left: 30,
                padding: '10px',
                color: 'white',
              }}
            >
              Men's Shoes <br />
              Collection
            </Typography>
            <Link
              to={'/men'}
              style={{ position: 'absolute', bottom: 50, left: 40 }}
              className="bg-white font-medium text-lg px-5 py-3 leading-4 rounded-full"
            >
              Go
            </Link>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ position: 'relative' }}>
            <img
              src="../../../public/women.jpg"
              style={{ height: '650px', width: '100%' }}
            />
            <Typography
              className="text-3xl font-bold"
              style={{
                position: 'absolute',
                bottom: 100,
                left: 30,
                padding: '10px',
                color: 'white',
              }}
            >
              Women's Shoes <br />
              Collection
            </Typography>
            <Link
              to={'/women'}
              style={{ position: 'absolute', bottom: 50, left: 40 }}
              className="bg-white font-medium text-lg px-5 py-3 leading-4 rounded-full"
            >
              Go
            </Link>
          </div>
        </Col>
      </Row>
=======
      <Typography className="home_title">Đặc sắc</Typography>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div style={{ position: 'relative' }}>
          <img
            src="../../../public/nam.jpg"
            style={{ height: '650px', width: '100%' }}
            className="rounded-lg"
          />
          <Typography
            className="text-3xl font-bold"
            style={{
              position: 'absolute',
              bottom: 100,
              left: 30,
              padding: '10px',
              color: 'white',
            }}
          >
            Bộ sưu tập <br /> giày nam
          </Typography>
          <Link
            to={'/men'}
            style={{ position: 'absolute', bottom: 50, left: 40 }}
            className="bg-white font-medium text-lg px-5 py-3 leading-4 rounded-full"
          >
            Go
          </Link>
        </div>
        <div style={{ position: 'relative' }}>
          <img
            src="../../../public/women.jpg"
            style={{ height: '650px', width: '100%' }}
            className="rounded-lg"
          />
          <Typography
            className="text-3xl font-bold"
            style={{
              position: 'absolute',
              bottom: 100,
              left: 30,
              padding: '10px',
              color: 'white',
            }}
          >
            Bộ sưu tập <br />
            giày nữ
          </Typography>
          <Link
            to={'/women'}
            style={{ position: 'absolute', bottom: 50, left: 40 }}
            className="bg-white font-medium text-lg px-5 py-3 leading-4 rounded-full"
          >
            Go
          </Link>
        </div>
      </div>
>>>>>>> Stashed changes
    </Space>
  )
}

export default Featured
