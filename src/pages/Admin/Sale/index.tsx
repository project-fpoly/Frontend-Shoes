import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import { format, isAfter } from "date-fns";
import HeaderTable from "../../../components/Admin/Layout/HeaderTable";
import { AppDispatch } from "../../../redux/store";
import { ISale } from "../../../common/sale";
import { createSale, fetchAllSales, removeSale, updateSales } from "../../../features/sale";
import { IStateSale } from "../../../common/redux/type";
import FormSale from "../../../components/Admin/Sale/FormSale";

const SaleManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [detailSale, setDetailSale] = useState<ISale>();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const { sales, loading, totalDocs } = useSelector(
    (state: IStateSale) => state.sale
  ) || {};
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    dispatch(fetchAllSales({ page: currentPage, limit: 10, keyword: search }));
  }, [dispatch, currentPage, search]);

  const handleCreateSale = (newSale: ISale) => {
    dispatch(createSale(newSale))
    setIsModalOpen(false)
    console.log(newSale);
  };

  const handleUpdateSale = (newSale: ISale) => {
    dispatch(
      updateSales({ id: detailSale?._id as string, newSale })
    )
    setIsModalUpdateOpen(false)
    console.log(newSale);
  };

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const toggleModal = (sale: ISale) => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    setDetailSale(sale);
    console.log(sale)
  };

  const deleteSale = (record: ISale) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this Campaign?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        // call api delete
        if (!record._id) return
        record._id && dispatch(removeSale(record._id))
      },
      onCancel() { },
    });
  };

  const columns: ColumnsType<ISale> = [
    {
      title: "No.",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Campaign Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "Expiration date",
      dataIndex: "expiration_date",
      align: "center",
      render: (expiration_date) => {
        console.log(!!expiration_date)
        if (expiration_date) {
          const formattedDate = format(new Date(expiration_date), "dd-MM-yyyy");
          const isExpired = isAfter(new Date(expiration_date), new Date());
          return <span style={{ color: isExpired ? "red" : "green" }}>{formattedDate}</span>;
        }
        return '';
      },
    },
    {
      title: "Create date",
      dataIndex: "createdAt",
      align: "center",
      render: (date) => date ? format(new Date(date), "dd-MM-yyyy") : '',
    },
    {
      title: "Create by",
      dataIndex: "create_by",
      align: "left",
      render: (create_by) => create_by?.email,
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <div style={{ textAlign: 'center' }}>
          {/*{record.create_by?._id === user._id && (*/}
          {/*    <Tooltip title="Edit">*/}
          {/*      <Button type="link" onClick={() => toggleModal(record)}>*/}
          {/*        <EditOutlined />*/}
          {/*      </Button>*/}
          {/*    </Tooltip>*/}
          {/*)}*/}

          <Tooltip title={'Delete'}>
            <Button type="link" >
              <DeleteOutlined onClick={() => deleteSale(record)} />
            </Button>
          </Tooltip>

          <Tooltip title={'Edit'}>
            <Button type="link">
              <EditOutlined onClick={() => toggleModal(record)} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const Value: ISale = {
    _id: detailSale?._id || '',
    name: detailSale?.name || '',
    description: detailSale?.description || '',
    discount: detailSale?.discount || 0,
    quantity: detailSale?.quantity || 0,
    expiration_date: detailSale?.expiration_date,
    start_date: detailSale?.start_date,
  };

  const defaultValue: ISale = {
    _id: "",
    name: "",
    description: "",
    discount: 0,
    quantity: 0,
    expiration_date: new Date().getTime(),
    start_date: new Date().getTime()
  };

  const searchSale = (value: string) => {
    setSearch(value);
  }

  return (
    <div>
      <HeaderTable
        showModal={() => setIsModalOpen(true)}
        onSubmitt={searchSale}
        name="Sale"
      />
      {loading === "pending" ? (
        <div className="flex justify-center items-center mt-16">
          <LoadingOutlined style={{ fontSize: 24 }} spin />
        </div>
      ) : (
        <Table
          style={{ marginTop: "15px" }}
          columns={columns}
          dataSource={sales}
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
        title={"Create new Sale"}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        maskClosable={false}
        destroyOnClose={true}
      >
        <FormSale
          mode={'create'}
          onSubmit={handleCreateSale} {...defaultValue} />
      </Modal>

      <Modal
        title={"Update Sale"}
        open={isModalUpdateOpen}
        onOk={() => setIsModalUpdateOpen(false)}
        onCancel={() => setIsModalUpdateOpen(false)}
        destroyOnClose={true}
        footer={null}
      >
        <FormSale
          mode={'update'}
          onSubmit={handleUpdateSale} {...Value} />
      </Modal>
    </div>
  );
};
export default SaleManager;
