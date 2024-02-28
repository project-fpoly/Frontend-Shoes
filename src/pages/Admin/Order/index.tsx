/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, DatePicker, Modal, Table, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { CartItem, IBill } from "../../../common/order";
import { AppDispatch, RootState } from "../../../redux/store";
import { ColumnsType } from "antd/es/table";
import HeaderTable from "../../../components/Admin/Layout/HeaderTable";
import { deleteOrder, fetchOrders, updateOrder } from "../../../features/order";
import FormOrder from "../../../components/Admin/Order/FormOrder";
import moment from "moment";
import { IStateProduct } from "../../../common/redux/type";
import { IUsers } from "../../../common/users";

const OrderManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [order, setOrder] = useState<IBill>();
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");
  const [Search, setSearch] = useState("");
  const orders = useSelector((state: RootState) => state.order.orders);
  const isLoading = useSelector((state: RootState) => state.order.isLoading);
  const pagination = useSelector((state: RootState) => state.order.pagination);
  const { products } = useSelector((state: IStateProduct) => state.product);
  const { users } = useSelector((state: IUsers) => state.user);
  useEffect(() => {
    dispatch(
      fetchOrders({
        page: currentPage,
        limit: pageSize,
        search: Search,
        start: dayStart,
        end: dayEnd,
      })
    );
  }, [dispatch, currentPage, pageSize, Search, dayStart, dayEnd]);

  const toggleModal = (orders: IBill) => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    setOrder(orders);
  };
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    const url = `?page=${page}`;
    navigate(url);

    dispatch(
      fetchOrders({
        page: page,
        limit: pageSize,
        search: Search,
        start: dayStart,
        end: dayEnd,
      })
    );
  };
  const handleUpdateOrder = async (updateOrderData: any) => {
    await dispatch(updateOrder({ id: order?._id as string, updateOrderData }));
    setIsModalUpdateOpen(false);
  };
  const deleteOneOrder = async (order: IBill) => {
    Modal.confirm({
      title: "Confirm Deletion",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete this order?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await dispatch(deleteOrder(order._id as string));
      },
      onCancel() {},
    });
  };
  const getProductName = (shoeId: string) => {
    const product = products.find((product) => product._id === shoeId);
    return product ? product.name : "N/A";
  };
  const getUserName = (userId: string) => {
    const user = users.find((user: IUsers) => user._id === userId);
    console.log(user);
    return user ? user.userName : "Khách";
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
            <div className="my-2">
              {getProductName(cartItem.product)} - {cartItem.quantity}
            </div>
          ))}
        </span>
      ),
      align: "center",
    },
    {
      title: "User",
      dataIndex: "user",
      render: (user) => <span>{getUserName(user)}</span>,
      align: "center",
    },
    {
      title: "Shipping address",
      dataIndex: "shippingAddress",
      render: (shippingAddress) => (
        <span>
          <>
            <div>
              <b>Full Name:</b> {shippingAddress.fullname}
            </div>
            <div>
              <b>Address:</b> {shippingAddress.address}
            </div>
            <div>
              <b>Email:</b> {shippingAddress.email}
            </div>
            <div>
              <b>Phone Number:</b>
              {shippingAddress.phone}
            </div>
          </>
        </span>
      ),
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
      title: "Create at",
      dataIndex: "createdAt",
      align: "center",
      render: (createdAt) => (
        <span>{moment(createdAt).format("DD/MM/YYYY")}</span>
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
          <Tooltip title={"delete"}>
            <Button type="link" onClick={() => deleteOneOrder(record)}>
              <DeleteOutlined className="text-red-600" />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
  const Value = {
    _id: order?._id || "",
    cartItems: order?.cartItems || [],
    shippingAddress: order?.shippingAddress || {
      email: "la@gmail.com",
      fullname: "Unknown",
      address: "gia lai",
      phone: 0,
    },
    user: order?.user || "la@gmail.com",
    totalPrice: order?.totalPrice || 0,
    isPaid: order?.isPaid || false,
    isDelivered: order?.isDelivered || "0000000000",
    createdAt: order?.createdAt || "2003",
    updatedAt: order?.updatedAt || "male",
  };
  const searchOrder = (value: string) => {
    setSearch(value);
  };
  return (
    <>
      <div>
        <div className="flex items-end">
          <HeaderTable
            showModal={() => setIsModalOpen(true)}
            onSubmitt={(value) => searchOrder(value)}
            name={"Orders"}
          />
          <DatePicker
            className="mx-2"
            onChange={(date, dateString) =>
              setDayStart(
                Array.isArray(dateString) ? dateString.join(",") : dateString
              )
            }
            placeholder="Start Date"
          />
          <DatePicker
            onChange={(date, dateString) =>
              setDayEnd(
                Array.isArray(dateString) ? dateString.join(",") : dateString
              )
            }
            placeholder="End Date"
          />
        </div>
        {isLoading ? (
          <>
            <div className="flex justify-center items-center mt-16">
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            </div>
          </>
        ) : (
          <>
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
          </>
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
          <FormOrder mode={"update"} onSubmit={handleUpdateOrder} {...Value} />
        </Modal>
      </div>
    </>
  );
};
export default OrderManager;
