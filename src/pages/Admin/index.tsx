<<<<<<< HEAD
import React from 'react';
import { Layout, Typography, Row, Col, Card, Button } from 'antd';
=======
import { Layout, Typography, Row, Col, Card, Button ,Avatar, Badge,List} from 'antd';
>>>>>>> f27476c9b7e5ae07f4fd026928174dfb3aab615c
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  DashboardOutlined,
  BarChartOutlined,
  PieChartOutlined,
  BellOutlined,
} from '@ant-design/icons';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  Tooltip,
  Legend,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Area,
  Label,
} from "recharts";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { INotification } from '../../common/notification';
import { AppDispatch } from '../../redux/store';
import { fetchAllNotification, updateNotificationById } from '../../features/notification';
import styles from "../../App.module.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

<<<<<<< HEAD
const AdminDashboard: React.FC = () => {
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
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia leo quis quam consequat, at varius magna hendrerit.
                  </Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Logout" extra={<LogoutOutlined />} style={{ height: '100%' }}>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia leo quis quam consequat, at varius magna hendrerit.
                  </Text>
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Settings" extra={<SettingOutlined />} style={{ height: '100%' }}>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia leo quis quam consequat, at varius magna hendrerit.
                  </Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                    title="Action"
                    extra={<Button type="primary">Action Button</Button>}
                    style={{ height: '100%' }}
                >
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia leo quis quam consequat, at varius magna hendrerit.
                  </Text>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
=======
const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const notifications=useSelector((state)=>state.notification.notifications)
  const data = [
    { name: "Jan", profit: 2400 },
    { name: "Feb", profit: 1398 },
    { name: "Mar", profit: 9800 },
    { name: "Apr", profit: 3908 },
    { name: "May", profit: 4800 },
    { name: "Jun", profit: 3800 },
    { name: "Jul", profit: 4300 },
    { name: "Aug", profit: 5300 },
    { name: "Sep", profit: 3490 },
    { name: "Oct", profit: 2780 },
    { name: "Nov", profit: 1890 },
    { name: "Dec", profit: 2390 },
  ];
  const data2 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  const handleItemClick = async  (item:INotification) => {
    if(!item.isRead){
      await  dispatch(updateNotificationById(item._id));
      dispatch(fetchAllNotification());
    }
      navigate(`/admin/notification/${item._id}`);
    };
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
          <Card  title="Sales Chart" extra={<BarChartOutlined />}>
            <BarChart width={400} height={300} data={data}>
              <Bar dataKey="profit" fill="#8884d8" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
            </BarChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Notifications"
            style={{width:"415px"}}
            extra={
              <Badge count={notifications.filter(
                (item:any) => !item.isRead
              ).length} offset={[10, 0]}>
                <BellOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
              </Badge>
            }
          >
            <List
            style={{ height: '300px',width:"385px" ,overflowY: 'auto' }}
              itemLayout="horizontal"
              dataSource={notifications}
              renderItem={(item:any) => (
                <List.Item
                className={`${styles.notificationItem} ${
                  item.isRead ? styles.readItem : styles.unreadItem
                }`}
                onClick={() => handleItemClick(item)}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<BellOutlined />} />}
                    title={
                      <Link to={`notification/${item._id}`}>{item.message}</Link>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="New Users" extra={<UserOutlined />}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={data2}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis>
                  <Label
                    value="uv"
                    position="insideTopLeft"
                    angle={-90}
                    offset={-10}
                  />
                </YAxis>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="User Statistics" extra={<PieChartOutlined />}>
            <PieChart width={400} height={300}>
              <Pie data={data} dataKey="profit" nameKey="name" fill="#8884d8">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Col>
      </Row>
        </div>
      </Content>
    </Layout>
>>>>>>> f27476c9b7e5ae07f4fd026928174dfb3aab615c
  );
};

export default AdminDashboard;
