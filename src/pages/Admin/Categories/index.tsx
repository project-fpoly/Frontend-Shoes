import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Table, Tooltip, Image, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchAllCategories, deleteCategory } from "../../../features/category";
import { ICategory } from "../../../common/category";
import { IStateCategory } from "../../../common/redux/type";

const CategoriesManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { categories, loading, totalDocs } = useSelector(
    (state: IStateCategory) => state.category
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const removeCategory = (record: ICategory) => {
    Modal.confirm({
      title: "Confirm Delete",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to delete this category?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        if (!record._id) return;
        record._id && dispatch(deleteCategory(record._id));
      },
      onCancel() {},
    });
  };

  const columns: ColumnsType<ICategory> = [
    {
      title: "No.",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
      align: "right",
    },
    {
      title: "Category Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      render: (imageUrl) => <Image src={imageUrl} width={50} />,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "ViewCount",
      dataIndex: "viewCount",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <Tooltip title={"edit"}>
            <Button type="link">
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title={"delete"}>
            <Button type="link" onClick={() => removeCategory(record)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      {loading === "pending" ? (
        <div className="flex justify-center items-center mt-16">
          <LoadingOutlined style={{ fontSize: 24 }} spin />
        </div>
      ) : (
        <Table
          style={{
            marginTop: "15px",
          }}
          columns={columns}
          dataSource={categories}
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
    </div>
  );
};

export default CategoriesManager;