import { EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, Tooltip } from "antd";
import Search from "antd/es/input/Search";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { IUser } from "../../../common/users";
import LoadingSkelethon from "../../Loading/LoadingSkelethonProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchAllUsers } from "../../../features/user";
import { IStateUser } from "../../../common/redux/type";
import { format } from "date-fns";
const UserManager: React.FC = () => {
  const dispact = useDispatch<AppDispatch>();

  const user = useSelector((state: IStateUser) => state.user.users);
  const loading = useSelector((state: IStateUser) => state.user.loading);

  useEffect(() => {
    dispact(fetchAllUsers());
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const toggleModal = (user: IUser) => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    console.log(user);
  };
  const columns: ColumnsType<IUser> = [
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
  return (
    <div>
      <Space direction="vertical">
        <Title level={3}>User</Title>
        <Space direction="horizontal">
          <Search
            style={{ width: "30vw" }}
            placeholder={"Search user"}
            enterButton={<SearchOutlined />}
            // onSearch={doSearch}
            // value={searchText}
            // onChange={(e) => handleSearchChange(e.target.value)}
          />
          <Button icon={<PlusOutlined />} onClick={showModal}>
            New
          </Button>
        </Space>
      </Space>
      {loading === "pending" ? (
        <>
          <div className="flex justify-center items-center mt-16">
            <LoadingSkelethon></LoadingSkelethon>
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
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        destroyOnClose={true}
      >
        New
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
