import { useEffect, useState } from "react";
import { Button, Modal, Table, Tag, Tooltip, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { IStateCmt } from "../../../common/redux/type";
import { fetchAllComment } from "../../../features/comment";
import { ColumnsType } from "antd/es/table";
import { ICmt } from "../../../common/products";
import { format } from "date-fns";
import HeaderTable from "../../../components/Admin/Layout/HeaderTable";

const CommentManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { comments: comment, loading } = useSelector(
    (state: IStateCmt) => state.comment
  );
  useEffect(() => {
    dispatch(fetchAllComment());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColumnsType<ICmt> = [
    {
      title: "No.",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
      align: "right",
    },
    {
      title: "shoeId",
      dataIndex: "shoeId",
    },
    {
      title: "userId",
      dataIndex: "userId",
      render: (userId) => userId.userName
    },
    {
      title: "content",
      dataIndex: "content",
    },
    {
      title: "likes",
      dataIndex: "likes",
      render: (likes) => likes.length,
      sorter: (a, b) => a.likes.length - b.likes.length,
    },
    {
      title: "parentId",
      align: "center",
      dataIndex: "parentId",
      render: (parentId) => (
        <Tag color={parentId ? "blue" : "green"}>
          {parentId ? "Reply Comment" : "Comment"}
        </Tag>
      ),
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      render: (updatedAt: string | null | undefined) =>
        updatedAt
          ? format(new Date(updatedAt), " HH:mm:ss dd-MM-yyyy")
          : "N/A",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      render: (createdAt: string | null | undefined) =>
        createdAt
          ? format(new Date(createdAt), " HH:mm:ss dd-MM-yyyy")
          : "N/A",
    },
    {
      title: "action",
      key: "action",
      align: "center",
      render: (_,record) => (
        <Space>
          <Tooltip title={"edit"}>
            <Button type="link" onClick={() => toggleModal(record)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title={"delete"}>
            <Button type="link" onClick={() => deleteComment(record)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const toggleModal = (record: ICmt) => {
    console.log(record);
  };

  const deleteComment = (record: ICmt) => {
    console.log(record);
  };
  const searchCmt=(value:string)=>{
    console.log(value);
    
  }
  return (
    <>
      <HeaderTable showModal={() => setIsModalOpen(true)} onSubmitt={(value)=>searchCmt(value)} name={"Comment"} />
      {loading === "pending" ? (
        <div className="flex justify-center items-center mt-16">
          <LoadingOutlined style={{ fontSize: 24 }} spin />
        </div>
      ) : (
        <Table
          style={{ marginTop: "15px" }}
          columns={columns}
          dataSource={comment}
          bordered
          size="small"
          pagination={false}
          onChange={(pagination, filters, sorter) => {
            console.log("Sorter:", sorter);
            console.log("pagination",pagination);
            console.log("filters",filters);
            
            
            // Thực hiện xử lý sắp xếp tại đây nếu cần
          }}
        />
      )}
      <Modal
        title="Create new comment"
        visible={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        maskClosable={false}
        destroyOnClose={true}
      >
        Create Comment
      </Modal>
    </>
  );
};

export default CommentManager;
