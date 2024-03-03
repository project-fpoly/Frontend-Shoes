import { Layout, Typography, Row, Col, Card, Button } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ padding: '50px' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '5px' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col span={4}>
              <DashboardOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
            </Col>
            <Col span={20}>
              <Title level={2} style={{ fontSize: '28px', color: '#1890ff' }}>
                Admin Dashboard
              </Title>
            </Col>
          </Row>
          <div style={{ borderTop: '1px solid #e8e8e8', margin: '20px 0' }}></div>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="User Management" extra={<UserOutlined />} style={{ height: '100%' }}>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia leo quis quam consequat, at varius magna hendrerit.</Text>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Logout" extra={<LogoutOutlined />} style={{ height: '100%' }}>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia leo quis quam consequat, at varius magna hendrerit.</Text>
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Settings" extra={<SettingOutlined />} style={{ height: '100%' }}>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia leo quis quam consequat, at varius magna hendrerit.</Text>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Action" extra={<Button type="primary">Action Button</Button>} style={{ height: '100%' }}>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia leo quis quam consequat, at varius magna hendrerit.</Text>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AdminDashboard;