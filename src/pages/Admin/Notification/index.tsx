import { Col, Row } from "antd";
import AllNotification from "../../../components/Admin/Notification/AllNotification";
import OneNotification from "../../../components/Admin/Notification/OneNotification";

const NotificationsAdmin = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <OneNotification/>
        </Col>

        <Col span={8}>
          <AllNotification/>
        </Col>
      </Row>
    </>
  );
};
export default NotificationsAdmin;
