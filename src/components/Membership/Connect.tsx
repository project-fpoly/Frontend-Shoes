import { MobileOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import { SiNike } from 'react-icons/si'
import { Link } from 'react-router-dom'
const { Title, Paragraph } = Typography

const Connect = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography className="home_title">Connect Through Membership</Typography>

      <Space className="mt-20 grid grid-col items-center justify-center gap-14 md:grid-cols-2 lg:grid-cols-3">
        <Space direction="vertical">
          <Link to="">
            <Space direction="vertical" style={{ alignItems: 'center' }}>
              <img
                src="../../../logo.jpg"
                alt=""
                width={60}
                style={{
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                }}
              />
              <Typography
                className="mt-10"
                style={{ fontWeight: 500, fontSize: 20 }}
              >
                Nike App <br />
              </Typography>
              <Typography
                className="mt-5 mb-7"
                style={{ fontWeight: 500, fontSize: 16 }}
              >
                Keep up daily with the best of <br /> Nike, personalised for
                you. Explore
              </Typography>
              <Link
                to={''}
                style={{
                  fontWeight: 500,
                  fontSize: 15,
                  textDecoration: 'underline',
                }}
              >
                Explore
              </Link>
            </Space>
          </Link>
        </Space>
        <Space direction="vertical">
          <Link to="">
            <Space direction="vertical" style={{ alignItems: 'center' }}>
              <img
                src="../../../nrc.jpg"
                alt=""
                width={60}
                style={{
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                }}
              />
              <Typography
                className="mt-10"
                style={{ fontWeight: 500, fontSize: 20 }}
              >
                Nike Run Club <br />
              </Typography>
              <Typography
                className="mt-5 mb-7"
                style={{ fontWeight: 500, fontSize: 16 }}
              >
                Run with us in the <br /> Nike Run Club App.
              </Typography>
              <Link
                to={''}
                style={{
                  fontWeight: 500,
                  fontSize: 15,
                  textDecoration: 'underline',
                }}
              >
                Explore
              </Link>
            </Space>
          </Link>
        </Space>
        <Space direction="vertical">
          <Link to="">
            <Space direction="vertical" style={{ alignItems: 'center' }}>
              <img
                src="../../../ntc.jpg"
                alt=""
                width={60}
                style={{
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                }}
              />
              <Typography
                className="mt-10"
                style={{ fontWeight: 500, fontSize: 20 }}
              >
                Nike Trainning Club <br />
              </Typography>
              <Typography
                className="mt-5 mb-7"
                style={{ fontWeight: 500, fontSize: 16 }}
              >
                Move with the best in the <br /> Nike Trainning Club App.
              </Typography>
              <Link
                to={''}
                style={{
                  fontWeight: 500,
                  fontSize: 15,
                  textDecoration: 'underline',
                }}
              >
                Explore
              </Link>
            </Space>
          </Link>
        </Space>
      </Space>
    </Space>
  )
}

export default Connect
