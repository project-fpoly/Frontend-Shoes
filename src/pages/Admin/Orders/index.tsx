/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { CartItem, IBill } from "../../../common/order";
import { AppDispatch, RootState } from "../../../redux/store";
import { ColumnsType } from "antd/es/table";
import { getAllOrders } from "../../../services/order";
import HeaderTable from "../../../components/Admin/Layout/HeaderTable";

const OrderListComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const orders = useSelector((state: RootState) => state.order.orders);
  const isLoading = useSelector((state: RootState) => state.order.isLoading);
  const pagination = useSelector((state: RootState) => state.order.pagination);

  useEffect(() => {
    dispatch(
      getAllOrders({ page: pagination.currentPage, limit: pagination.limit })
    );
  }, [dispatch, pagination.currentPage, pagination.limit]);
  useEffect(() => {
    dispatch(getAllOrders({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const toggleModal = (orders: IBill) => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    console.log(orders);
  };
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    const url = `?page=${page}`;
    navigate(url);

    dispatch(getAllOrders({ page: page, limit: pageSize }));
  };

  const columns: ColumnsType<IBill> = [
    {
      title: "No.",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Items",
      dataIndex: "cartItems",
      render: (cartItems) => (
        <span>
          {cartItems.map((cartItem: CartItem) => (
            <div>
              {cartItem.product} - {cartItem.quantity}
            </div>
          ))}
        </span>
      ),
      align: "center",
    },
    {
      title: "User",
      dataIndex: "user",
      align: "center",
    },
    {
      title: "Payment meothod",
      dataIndex: "payment_method",
      align: "center",
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      align: "center",
    },
    {
      title: "Is paid",
      dataIndex: "isPaid",
      align: "center",
      render: (isPaid) => (
        <span>{isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</span>
      ),
    },
    {
      title: "Is Delivered",
      dataIndex: "isDelivered",
      align: "center",
      render: (isDelivered: string) => {
        let tagColor = "";
        let tagContent = "";
        let tagIcon = null;
        switch (isDelivered) {
          case "Chờ xác nhận":
            tagColor = "default";
            tagContent = "Chờ xác nhận";
            tagIcon = <ClockCircleOutlined />;
            break;
          case "Chờ lấy hàng":
            // Xử lý khi isDelivered là "Đã hủy"
            tagColor = "purple";
            tagContent = "Chờ lấy hàng";
            tagIcon = <SyncOutlined spin />;
            break;
          case "Đang giao hàng":
            tagColor = "processing";
            tagContent = "Đang giao hàng";
            tagIcon = <CarOutlined />;
            break;
          case "Đã giao hàng":
            tagColor = "success";
            tagContent = "Đã giao hàng";
            tagIcon = <CheckCircleOutlined />;
            break;

          default:
            tagColor = "error";
            tagContent = "Đã hủy";
            tagIcon = <CloseCircleOutlined />;
            break;
        }

        return (
          <span>
            {
              <Tag icon={tagIcon} color={tagColor}>
                {tagContent}
              </Tag>
            }
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <Tooltip title={"edit"}>
            <Button type="link" onClick={() => toggleModal(record)}>
              <EditOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <>
      <div>
        <HeaderTable showModal={() => setIsModalOpen(true)} name={"Orders"} />
        {isLoading.toString() === "pending" ? (
          <>
            <div className="flex justify-center items-center mt-16">
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            </div>
          </>
        ) : (
          <Table
            style={{
              marginTop: "15px",
            }}
            columns={columns}
            dataSource={orders}
            bordered
            size="small"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: pagination.totalPages * pageSize,
              onChange: handlePageChange,
            }}
          />
        )}

        <Modal
          title={"Create new order"}
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          maskClosable={false}
          destroyOnClose={true}
        >
          {/* <FormUser onSubmit={handleCreateUser} {...defaultValue} /> */}
        </Modal>
        <Modal
          title={"Update"}
          open={isModalUpdateOpen}
          onOk={() => setIsModalUpdateOpen(false)}
          onCancel={() => setIsModalUpdateOpen(false)}
          destroyOnClose={true}
          footer={null}
        >
          Update
        </Modal>
      </div>
    </>
  );
};
export default OrderListComponent;
