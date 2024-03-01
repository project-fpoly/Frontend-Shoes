import { AlertOutlined, AppstoreOutlined, ContainerOutlined, OrderedListOutlined, ShoppingOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, List } from "antd";
import { differenceInMilliseconds, format, formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { IStateNotification } from "../../../common/redux/type";
import { useEffect } from "react";
import { fetchAllNotification } from "../../../features/notification";
import styles from "../../../App.module.scss";
import { useNavigate } from "react-router-dom";
const AllNotification=()=>{
  const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { notifications: notification } = useSelector(
      (state: IStateNotification) => state.notification
    );
    useEffect(() => {
      dispatch(fetchAllNotification());
    }, [dispatch]);
    const currentDateTime: Date = new Date();
    const handleItemClick = (item:string) => {
        navigate(`/admin/notification/${item}`);
      };
    return(
        <>
        <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
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
                onClick={() => handleItemClick(item._id)}
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
    )
}
export default AllNotification