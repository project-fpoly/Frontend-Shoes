import React, { useState } from "react";
import {
  Input,
  Badge,
  Avatar,
  Space,
  Dropdown,
  Menu,
  Row,
  Col,
  Popover,
} from "antd";
import { BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";

const { Search } = Input;

const AdminHeader: React.FC = () => {
  const notifications = [
    { id: 1, content: "New message received" },
    { id: 2, content: "You have a task pending" },
  ];
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  const notificationContent = (
    <>
      {notifications.map((notification) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            marginBottom: "8px",
          }}
          key={notification.id}
        >
          <p>{notification.content}</p>
        </div>
      ))}
    </>
  );

  return (
    <Row
      className="items-center justify-between p-4 bg-white border-b"
      style={{ backgroundColor: "ghostwhite" }}
    >
      <Col span={12}>
        <Search
          placeholder="Search..."
          prefix={<SearchOutlined />}
          style={{ width: "100%" }}
        />
      </Col>
      <Col span={8} className="text-center"></Col>
      <Col span={4} className="text-right">
        <Row>
          <Col span={12} className="text-center">
            <Popover
              content={notificationContent}
              title="Notifications"
              trigger="hover"
              visible={visible}
              onVisibleChange={handleVisibleChange}
            >
              <Badge count={notifications.length} offset={[10, 0]}>
                <BellOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
              </Badge>
            </Popover>
          </Col>
          <Col span={12} className="text-center">
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space align="center" style={{ cursor: "pointer" }}>
                <Avatar size="small" icon={<UserOutlined />} />
                <span className="ml-2">Username</span>
              </Space>
            </Dropdown>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AdminHeader;
