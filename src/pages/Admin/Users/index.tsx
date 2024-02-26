import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Modal, Table, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { IUsers } from "../../../common/users";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  createNewUser,
  deleteeUser,
  fetchAllUsers,
  updateUser,
} from "../../../features/user";
import { IStateUser } from "../../../common/redux/type";
import { format } from "date-fns";
import HeaderTable from "../../../components/Admin/Layout/HeaderTable";
import FormUser from "../../../components/Admin/User/FormUser";
const UserManager: React.FC = () => {
  const dispact = useDispatch<AppDispatch>();
  const [userss, setUser] = useState<IUsers>();
  const [currentPage, setCurrentPage] = useState(1);
  const [Search, setSearch] = useState("");
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const {
    users: user,
    loading,
    totalDocs,
  } = useSelector((state: IStateUser) => state.user);

  useEffect(() => {
    dispact(fetchAllUsers({ page: currentPage, pageSize: 10, search: Search }));
  }, [dispact, currentPage, Search]);
  const handleCreateUser = (newUser: IUsers) => {
    dispact(createNewUser(newUser));
    setIsModalOpen(false);
  };
  const handleUpdateUser = (newUser: IUsers) => {
    dispact(updateUser({ newUser, id: userss?._id as string }));
    setIsModalUpdateOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const toggleModal = (user: IUsers) => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    setUser(user);
  };
  const deleteUsesr = (user: IUsers) => {
    Modal.confirm({
      title: "Confirm Deletion",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete this user?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispact(deleteeUser([user._id]));
      },
      onCancel() {},
    });
  };
  const columns: ColumnsType<IUsers> = [
    {
      title: "No.",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
      align: "right",
    },
    {
      title: "userName",
      dataIndex: "userName",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Email Verified",
      align:"center",
      dataIndex: "emailVerified",
      render: (emailVerified) => (
        emailVerified ? <Tag color="success">Đã xác thực</Tag> : <Tag color="warning">Chưa xác thực</Tag>
      ),
    },
    {
      title: "Phone Numbers",
      align: "left",
      dataIndex: "phoneNumbers",
      render: (text) => (
        text ? <span>{text}</span> : <Tag style={{ display: "flex", justifyContent: "center" }} color="warning">Chưa cập nhật</Tag>
      ),
    },
    {
      title: "role",
      dataIndex: "role",
    },
    {
      title: "lastActivity",
      dataIndex: "lastActivity",
      render: (lastActivity: string | null | undefined) =>
        lastActivity
          ? format(new Date(lastActivity), " HH:mm:ss dd-MM-yyyy")
          : "Chưa hoạt động",
    },
    {
      title: "action",
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
            <Button type="link" onClick={() => deleteUsesr(record)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
  const defaultValue = {
    _id: "",
    userName: "hahhaaa",
    password: "123123",
    deliveryAddress: "gia lai",
    email: "la@gmail.com",
    role: "member",
    phoneNumbers: "0000000000",
    avt: "hihia",
    dateOfBirth: "2003",
    gender: "male",
  };
  const Value = {
    _id: userss?._id || "",
    userName: userss?.userName || "hahhaaa",
    deliveryAddress: userss?.deliveryAddress || "gia lai",
    email: userss?.email || "la@gmail.com",
    role: userss?.role || "member",
    phoneNumbers: userss?.phoneNumbers || "0000000000",
    avt: userss?.avt || "hihia",
    dateOfBirth: userss?.dateOfBirth || "2003",
    gender: userss?.gender || "male",
  };
  const searchUser = (value: string) => {
    setSearch(value);
  };
  return (
    <div>
      <HeaderTable
        showModal={() => setIsModalOpen(true)}
        onSubmitt={(value) => searchUser(value)}
        name={"User"}
      />
      {loading === "pending" ? (
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
          dataSource={user}
          bordered
          size="small"
          pagination={{
            current: currentPage,
            total: totalDocs,
            showTotal: (total) => ` ${total} items`,
            onChange: handlePageChange,
          }}
        />
      )}

      <Modal
        title={"Create new user"}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        maskClosable={false}
        destroyOnClose={true}
      >
        <FormUser
          mode={"create"}
          onSubmit={handleCreateUser}
          {...defaultValue}
        />
      </Modal>
      <Modal
        title={"Update"}
        open={isModalUpdateOpen}
        onOk={() => setIsModalUpdateOpen(false)}
        onCancel={() => setIsModalUpdateOpen(false)}
        destroyOnClose={true}
        footer={null}
      >
        <FormUser mode={"update"} onSubmit={handleUpdateUser} {...Value} />
      </Modal>
    </div>
  );
};
export default UserManager;
