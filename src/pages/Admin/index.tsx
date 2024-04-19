import { Layout, Typography, Row, Col } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import BarCompopent from './DashboardofLam/BarCompopent'
import { DashboardOutlined } from '@ant-design/icons'
import AllCompopent from './DashboardofLam/AllCompopent'
import TopProduct from './DashboardofLam/TopProduct'
const { Content } = Layout
const { Title } = Typography

const AdminDashboard = () => {
  const list = useSelector((state: RootState) => state.chart.list)
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ padding: '50px' }}>
        <div
          style={{ background: '#fff', padding: '24px', borderRadius: '5px' }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col span={4}>
              <DashboardOutlined
                style={{ fontSize: '32px', color: '#1890ff' }}
              />
            </Col>
            <Col span={20}>
              <Title level={2} style={{ fontSize: '28px', color: '#1890ff' }}>
                Admin Dashboard
              </Title>
            </Col>
            <div
              style={{ borderTop: '1px solid #e8e8e8', margin: '20px 0' }}
            ></div>
            {list.map((item: any) => {
              if (item.type === 'bar') {
                return <BarCompopent id={item._id} />
              } else if (item.type === 'all') {
                return <Col span={24}>
                <AllCompopent id={item._id} />
                </Col>
              }else if (item.type === 'top') {
                return <Col span={12}>
                <TopProduct id={item._id}/>
                </Col>
              }
              return null
            })}
          </Row>
        </div>
      </Content>
    </Layout>
  )
}

export default AdminDashboard
