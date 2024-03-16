import React from 'react';
import {
    DeleteOutlined,
    EditOutlined,
    LoadingOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useState } from "react";
import { ISale } from "../../../common/products";
import { ColumnsType } from "antd/es/table";
import { Button, Table, Tooltip, Image, Modal } from "antd";
import { removeProduct, createProduct, update } from "../../../features/product";
import HeaderTable from "../../../components/Admin/Layout/HeaderTable";
import { IStateProduct } from "../../../common/redux/type";
import SaleForm from '../../../components/Admin/Sale';
import Filter from '../Products/ProductFilter';
import ProducModal from '../Products/ProducModal';
// import ProducModal from './ProducModal';
// import Filter from './ProductFilter';
const SaleManager: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [Search, setSearch] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, totalProducts } = useSelector(
        (state: IStateProduct) => state.product
    );

    const [selectedProduct, setSelectedProduct] = useState<ISale | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleRowClick = (product: ISale) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };
    const closeModal = () => {
        setSelectedProduct(null);
        setModalVisible(false);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const [productsState, setProductsState] = useState<ISale>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const handleCreateProduct = (newProduct: ISale) => {
        dispatch(createProduct(newProduct));
        setIsModalOpen(false);
    };
    const handleUpdateProduct = (newProduct: ISale) => {
        dispatch(update({ id: productsState?._id as string, newProduct }));
        setIsModalUpdateOpen(false);
    };
    const toggleModal = (product: ISale) => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
        setProductsState(product);
    };

    const deleteProduct = (record: ISale) => {
        Modal.confirm({
            title: "Confirm Delete",
            icon: <ExclamationCircleOutlined />,
            content: "Do you want to delete this product?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                if (!record._id) return;
                record._id && dispatch(removeProduct(record._id));
            },
            onCancel() { },
        });
    };
    const columns: ColumnsType<ISale> = [
        {
            title: "No.",
            dataIndex: "index",
            render: (_, __, index) => index + 1,
            align: "right",
        },
        {
            title: "Campaign Name",
            dataIndex: "name",
        },
        {
            title: "Product Name",
            dataIndex: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: 'Created Date',
            dataIndex: '',
        },
        {
            title: "Expiration Date",
            dataIndex: "",
        },
        {
            title: "Created By",
            dataIndex: "price",
        },
        {
            title: "Discout",
            dataIndex: "sale",
        },
        {
            title: "Action",
            key: "action",
            align: "center",
            className: "action-cell",
            render: (_, record) => (
                <div style={{ textAlign: "center" }}>
                    <Tooltip title={"Edit"}>
                        <Button type="link" >
                            <EditOutlined onClick={() => toggleModal(record)} />
                        </Button>
                    </Tooltip>
                    <Tooltip title={"Delete"}>
                        <Button type="link" >
                            <DeleteOutlined onClick={() => deleteProduct(record)} />
                        </Button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const defaultValue: ISale = {
        name: "Giày Nike cap cấp",
        description: "Mô tả chiến dịch",
        sale: 5,
        discount: 10,
        quantity: 0,
        create_date: "",
        expiration_date: "",
    };
    const Value = {
        name: productsState?.name || "Tên của sản phẩm",
        description: productsState?.description || "Mô tả của sản phẩm",
        sale: productsState?.sale || 0,
        discount: productsState?.discount || 0,
        quantity: productsState?.quantity || 0,
        create_date: productsState?.create_date || "",
        expiration_date: productsState?.expiration_date || "",
    };
    const searchProduct = (value: string) => {
        setSearch(value);
    };


    return (
        <div>
            <HeaderTable showModal={() => setIsModalOpen(true)} onSubmitt={searchProduct} name={"Product"} />
            <Filter page={currentPage} searchKeyword={Search} />
            {loading === "pending" ? (
                <div className="flex justify-center items-center mt-16">
                    <LoadingOutlined style={{ fontSize: 14 }} spin />
                </div>
            ) : (
                <>
                    <Table
                        style={{
                            marginTop: "15px",
                        }}
                        columns={columns}
                        dataSource={products}
                        bordered
                        size="small"
                        pagination={{
                            current: currentPage,
                            total: totalProducts,
                            showTotal: (total) => ` ${total} items`,
                            onChange: handlePageChange,
                        }}
                        onRow={(record) => ({
                            onClick: (event) => {
                                const target = event.target as Element;
                                const isAction = target.classList.contains("action-cell") || target.closest(".action-cell");
                                if (!isAction) {
                                    handleRowClick(record);
                                }
                            },
                        })}
                    />
                    <Modal
                        title={"Create new Product"}
                        open={isModalOpen}
                        onOk={() => setIsModalOpen(false)}
                        onCancel={() => setIsModalOpen(false)}
                        footer={null}
                        maskClosable={false}
                        destroyOnClose={true}
                    >
                        < SaleForm
                            mode="create"
                            onSubmit={handleCreateProduct}
                            {...defaultValue}
                        />
                    </Modal>

                    <Modal
                        title={"Update Product"}
                        open={isModalUpdateOpen}
                        onOk={() => setIsModalUpdateOpen(false)}
                        onCancel={() => setIsModalUpdateOpen(false)}
                        destroyOnClose={true}
                        footer={null}
                    >
                        <SaleForm mode={"update"} onSubmit={handleUpdateProduct} {...Value} />
                    </Modal>

                    <Modal
                        title={selectedProduct?.name}
                        visible={modalVisible}
                        onCancel={closeModal}
                        footer={null}
                    >
                        {selectedProduct && (
                            ProducModal(selectedProduct)
                        )
                        }
                    </Modal>

                </>
            )}
        </div>
    );
};

export default SaleManager;