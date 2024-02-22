import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import {  IUsers } from "../../../common/users";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {  createNewUser, fetchAllUsers } from "../../../features/user";
import { IStateUser } from "../../../common/redux/type";
import { format } from "date-fns";
import HeaderTable from "../../../components/Admin/Layout/HeaderTable";
import FormUser from "../../../components/Admin/User/FormUser";
const UserManager: React.FC = () => {
  const dispact = useDispatch<AppDispatch>();
  const { users: user, loading } = useSelector(
    (state: IStateUser) => state.user
  );

  useEffect(() => {
    dispact(fetchAllUsers());
  }, []);
  const handleCreateUser = (newUser: IUsers) => {
    dispact(createNewUser(newUser));
    setIsModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const toggleModal = (user: IUsers) => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    console.log(user);
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
  return (
    <div>
      <HeaderTable showModal={() => setIsModalOpen(true)} name={"User"} />
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
          pagination={false}
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
        <FormUser onSubmit={handleCreateUser} {...defaultValue} />
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
  );
};
export default UserManager;
