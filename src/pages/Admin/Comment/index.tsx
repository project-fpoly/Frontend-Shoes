import { DeleteOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import HeaderTable from "../../../components/Admin/Layout/HeaderTable";
import { Button, Modal, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { IStateCmt } from "../../../common/redux/type";
import { fetchAllComment } from "../../../features/comment";
import { ColumnsType } from "antd/es/table";
import { ICmt } from "../../../common/products";

const CommentManager = () => {
    const dispact = useDispatch<AppDispatch>();
    const { comments: comment, loading } = useSelector(
      (state: IStateCmt) => state.comment
    );
    useEffect(() => {
        dispact(fetchAllComment());
      }, [dispact]);
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
        render: (userId) => userId.userName,
      },
      {
        title: "content",
        dataIndex: "content",
      },
      {
        title: "likes",
        dataIndex: "likes",
        render: (likes) => likes.length,
      },
      {
        title: "parentId",
        dataIndex: "parentId",
        render: (parentId) => (parentId ? 'Reply Comment' : 'Comment'),
      },
      {
        title: "action",
        key: "action",
        align: "center",
        render: () => (
          <div style={{ textAlign: "center" }}>
            <Tooltip title={"edit"}>
              <Button type="link" 
              // onClick={() => toggleModal(record)}
              >
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title={"delete"}>
              <Button type="link" 
              // onClick={() => deleteUsesr(record)}
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </div>
        ),
      },
    ];
    return (
      <>
          <HeaderTable showModal={() => setIsModalOpen(true)} name={"Category"} />
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
          dataSource={comment}
          bordered
          size="small"
          pagination={false}
        />
      )}
      <Modal
        title={"Create new comment"}
        open={isModalOpen}
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