import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import NavAdmin from '../../components/Admin/Layout/NavAdmin'
import AdminHeader from '../../components/Admin/Layout/HeaderAdmin'

const { Sider, Content } = Layout

function AdminLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={255} theme="light" className="hidden lg:flex">
        <div style={{ background: '#fff' }}>
          <NavAdmin />
        </div>
      </Sider>

      <Layout>
        <AdminHeader />
        <Content style={{ padding: '24px' }}>
          <div
            style={{
              minHeight: '500px',
              backgroundColor: '#fff',
              padding: 24,
              borderRadius: '10px',
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
