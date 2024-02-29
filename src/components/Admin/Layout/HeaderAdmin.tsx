import React, { useEffect, useState } from "react";
import styles from "../../../App.module.scss";
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
  List,
} from "antd";
import {
  AlertOutlined,
  AppstoreOutlined,
  BellOutlined,
  ContainerOutlined,
  OrderedListOutlined,
  SearchOutlined,
  ShoppingOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { IStateNotification } from "../../../common/redux/type";
import { fetchAllNotification } from "../../../features/notification";
import {
  differenceInMilliseconds,
  format,
  formatDistanceToNow,
} from "date-fns";

const { Search } = Input;

const AdminHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications: notification } = useSelector(
    (state: IStateNotification) => state.notification
  );
  useEffect(() => {
    dispatch(fetchAllNotification());
  }, [dispatch]);

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
  const currentDateTime: Date = new Date();
  const unreadNotificationsCount = notification.filter(
    (item) => !item.isRead
  ).length;
  const notificationContent = (
    <>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <List
          itemLayout="vertical"
          dataSource={notification}
          renderItem={(item) => {
            const timeDifference = differenceInMilliseconds(
              currentDateTime,
              new Date(item.createdAt)
            );
            const timeAgo = formatDistanceToNow(
              Number(currentDateTime.getTime()) - timeDifference,
              { addSuffix: true }
            );

            const iconMap: Record<string, JSX.Element> = {
              user: <UserOutlined />,
              admin: <AlertOutlined />,
              manager: <ContainerOutlined />,
              order: <OrderedListOutlined />,
              promotion: <AppstoreOutlined />,
              product: <ShoppingOutlined />,
              category: <SolutionOutlined />,
            };

            return (
              <List.Item
                className={`${styles.notificationItem} ${
                  item.isRead ? styles.readItem : styles.unreadItem
                }`}
              >
                <div style={{ marginBottom: "16px",padding:5 }}>
                  <h3>{iconMap[item.type]}</h3>
                  <p>{item.message}</p>
                </div>
                <div>
                  <Badge status={item.isRead ? "success" : "error"} />
                  {timeAgo}{" "}
                  <i style={{ fontSize: "13px" }}>
                    {format(new Date(item.createdAt), " HH:mm:ss dd-MM-yyyy")}
                  </i>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
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
              <Badge count={unreadNotificationsCount} offset={[10, 0]}>
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
