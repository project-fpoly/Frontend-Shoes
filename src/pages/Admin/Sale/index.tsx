import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Tooltip } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import { format, isAfter } from "date-fns";
import HeaderTable from "../../../components/Admin/Layout/HeaderTable";
import { AppDispatch } from "../../../redux/store";
import { ISale } from "../../../common/sale";
import { createSale, fetchAllSales, updateSales, removeSale } from "../../../features/sale";
import { IStateSale } from "../../../common/redux/type";
import FormSale from "../../../components/Admin/Sale/FormSale";

const SaleManager: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [saleState, setSale] = useState<ISale>();
    const [currentPage, setCurrentPage] = useState(1);
    const [Search, setSearch] = useState("");

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const { sales, loading, totalDocs } = useSelector(
        (state: IStateSale) => state.sale
    );

    useEffect(() => {
        dispatch(fetchAllSales({ page: currentPage, limit: 10, keyword: Search }));
    }, [dispatch, currentPage, Search]);

    const handleCreateSale = (newSale: ISale) => {

        dispatch(createSale(newSale));
        setIsModalOpen(false);
    };

    const handleUpdateSale = async (newSale: ISale) => {
        await dispatch(updateSales({ id: saleState?._id as string, newSale }));
        setIsModalUpdateOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const toggleModal = (category: ISale) => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
        setSale(category);
    };

    const removeSales = (sales: ISale) => {
        Modal.confirm({
            title: 'Confirm Deletion',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete this user?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                // dispatch(removeSale(sales._id));
                if (sales._id !== undefined) { // Kiểm tra xem _id có khác undefined không
                    dispatch(removeSale(sales._id)); // Thực hiện chỉ khi _id không phải là undefined
                }// Thay vì [sales._id]
            },

            onCancel() {
            },
        })
    }


    const columns: ColumnsType<ISale> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: 'Created By',
            dataIndex: 'create_by',
            key: 'create_by',
            render: (createBy) => (
                <>
                    <div>{createBy.email}</div>
                </>
            ),
        },
        {
            title: ' Products',
            dataIndex: 'product',
            key: 'product',
            render: (products) => (
                <div>{products.length}</div>
            ),
        },
        {
            title: "Start Date",
            dataIndex: "start_date",
            key: "start_date",
            render: (date: string) => format(new Date(date), "dd/MM/yyyy"),
        },
        {
            title: "Expiration Date",
            dataIndex: "expiration_date",
            key: "expiration_date",
            render: (date: string) => format(new Date(date), "dd/MM/yyyy"),
        },
        {
            title: "Actions",
            key: "actions",
            align: 'center',
            render: (_, record) => (
                <span style={{ textAlign: 'center' }}>
                    <Tooltip title={"Edit"}>
                        <Button
                            type="link"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => toggleModal(record)}
                        />
                    </Tooltip>

                    {record.role !== 'admin' && (
                        <Tooltip title={'Delete'}>
                            <Button type="link" onClick={() => removeSales(record)}>
                                <DeleteOutlined />
                            </Button>
                        </Tooltip>
                    )}
                </span>
            ),
        },
    ];

    const defaultValue: ISale = {
        _id: saleState?._id || "",
        name: saleState?.name || "",
        discount: saleState?.discount || 0,
        description: saleState?.description || "",
        expiration_date: saleState?.expiration_date || "2024-01-01",
        product: saleState?.product || "",
    };

    const searchSale = (value: string) => {
        console.log(value);
    };

    return (
        <div >
            <HeaderTable
                showModal={() => setIsModalOpen(true)}
                onSubmitt={(value) => searchSale(value)}
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
                title="Create New Campaign"
                visible={isModalOpen}
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
                title="Update Sale"
                open={isModalUpdateOpen}
                onOk={() => setIsModalUpdateOpen(false)}
                onCancel={() => setIsModalUpdateOpen(false)}
                maskClosable={false}
                destroyOnClose={true}
                footer={null}
            >
                <FormSale
                    mode={'create'}
                    onSubmit={handleUpdateSale} {...defaultValue} />
            </Modal>
        </div>
    );
};

export default SaleManager;