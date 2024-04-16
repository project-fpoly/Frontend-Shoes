import React, { useEffect } from 'react';
import {
    DeleteOutlined,
    EditOutlined,
    LoadingOutlined,
    ExclamationCircleOutlined,
    EyeOutlined,
    WarningFilled,
    SyncOutlined,
    CustomerServiceOutlined,
    UndoOutlined,

} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useState } from "react";
import { IProduct } from "../../../common/products";
import { ColumnsType } from "antd/es/table";
import { Button, Table, Tooltip, Image, Modal, Row, Col, Tag, FloatButton, Flex, message } from "antd";
import { removeProduct, createProduct, update, tryDelete, Restore, getProductsWithFilters } from "../../../features/product";
import HeaderTable from "../../../components/Admin/Layout/HeaderTable";
import { IStateProduct } from "../../../common/redux/type";
import ProductForm from '../../../components/Admin/Product';
import ProducModal from './ProducModal';
import Filter from './ProductFilter';
import { searchByKeyword } from '../../../services/productsQuery';
const ProductsManager: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [Search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(10)
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, totalProducts } = useSelector(
        (state: IStateProduct) => state.product
    );
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const handleRowClick = (product: IProduct) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };
    const closeModal = () => {
        setSelectedProduct(null);
        setModalVisible(false);

    };

    const handlePageSizeChange = (current: number, size: number) => {
        setPageSize(size); // Cập nhật pageSize mới
        // Kiểm tra nếu dữ liệu trên trang hiện tại đã vượt quá giới hạn của trang mới
        const newCurrentPage = Math.ceil((current * pageSize) / size);
        setCurrentPage(newCurrentPage); // Cập nhật trang hiện tại để đảm bảo không mất dữ liệu
    };

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page); // Cập nhật trang hiện tại
        // pageSize có thể không được truyền vào trong trường hợp sử dụng phân trang
        if (pageSize) {
            setPageSize(pageSize); // Cập nhật pageSize nếu có
        }
    };


    const [productsState, setProductsState] = useState<IProduct>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const handleCreateProduct = (newProduct: IProduct) => {
        dispatch(createProduct(newProduct));
        dispatch(getProductsWithFilters({ page: currentPage, pageSize: pageSize, searchKeyword: Search }));
        setIsModalOpen(false);
    };
    const toggleModal = (product: IProduct) => {
        if (!product.isDeleted) {
            setIsModalUpdateOpen(!isModalUpdateOpen);
            setProductsState(product);
        } else {
            message.warning("This product is marked as deleted and cannot be edited.");
        }
    };

    const handleUpdateProduct = (newProduct: IProduct) => {
        if (!productsState?.isDeleted) {
            dispatch(update({ id: productsState?._id as string, newProduct }));
            dispatch(getProductsWithFilters({ page: currentPage, pageSize: pageSize, searchKeyword: Search }));
            setIsModalUpdateOpen(false);
        } else {
            message.warning("This product is marked as deleted and cannot be edited.");
        }
    };
    const tryDeleteProduct = (record: IProduct) => {
        Modal.confirm({
            title: "Confirm Delete",
            icon: <ExclamationCircleOutlined />,
            content: "Do you want marking product for deletion?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                if (!record._id) return;
                record._id && dispatch(tryDelete(record._id));
            },
            onCancel() { },
        });
    };
    const restoreProduct = (record: IProduct) => {
        Modal.confirm({
            title: "Confirm Restor",
            icon: <ExclamationCircleOutlined />,
            content: "Do you want to restore this product?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                if (!record._id) return;
                record._id && dispatch(Restore(record._id));
            },
            onCancel() { },
        });
    };
    const deleteProduct = (record: IProduct) => {
        Modal.confirm({
            title: "Confirm Delete",
            icon: <ExclamationCircleOutlined />,
            content: "Do you want to delete this product?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                if (!record._id) return;
                if (record.isDeleted) {
                    Modal.confirm({
                        title: "Confirm Permanent Delete",
                        icon: <ExclamationCircleOutlined />,
                        content: "Do you want to permanently delete this product?",
                        okText: "Yes",
                        okType: "danger",
                        cancelText: "No",
                        onOk() {
                            if (record._id) {
                                dispatch(removeProduct(record._id));
                            }
                        },
                        onCancel() { },
                    });
                } else {
                    if (record._id) {
                        dispatch(removeProduct(record._id));
                    }
                }
            },
            onCancel() { },
        });
    };

    const isRowDisabled = (record: IProduct) => {
        return record.isDeleted === true;
    };
    const rowClassName = (record: IProduct) => {
        return isRowDisabled(record) ? 'table-row-disabled' : '';
    };

    const columns: ColumnsType<IProduct> = [
        {
            title: "No.",
            dataIndex: "index",
            render: (_, record, index) => (
                <span style={{ opacity: record.isDeleted ? 0.5 : 1, pointerEvents: record.isDeleted ? 'none' : 'auto' }}>{index + 1}</span>
            ),
            align: "right",
        },

        {
            title: "Product Name",
            dataIndex: "name",
            render: (text, record) => (
                <span style={{ opacity: record.isDeleted ? 0.5 : 1, textDecoration: record.isDeleted ? "line-through" : "none" }}>{text}</span>
            ),
        },
        {
            title: "Images",
            dataIndex: "images",
            className: "action-cell",
            align: "center",
            render: (images, record) => (
                <Image src={images[0]} width={50} className="action-cell" style={{ opacity: record.isDeleted ? 0.2 : 1 }} />
            ),
        },
        {
            title: "quantity",
            dataIndex: "quantity",
            render: (quantity, record) => {
                const textStyle = {
                    opacity: record.isDeleted ? 0.5 : 1,
                    textDecoration: record.isDeleted ? "line-through" : "none",
                    color: quantity <= 0 ? "red" : "inherit", 
                    fontWeight: quantity <= 0 ? "bold" : "normal", 
                };
        
                return (
                    <span style={textStyle}>{quantity}</span>
                );
            },
        },
        
        {
            title: "Price",
            dataIndex: "price",
            render: (price: number, record) => (
                <span style={{ opacity: record.isDeleted ? 0.5 : 1, textDecoration: record.isDeleted ? "line-through" : "none" }}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(price)}
                </span>
            ),
        },
        {
            title: "Is Deleted",
            key: "isDeleted",
            align: "center",
            fixed: 'right',
            render: (_, record) => (
                <div style={{ textAlign: "center", opacity: record.isDeleted ? 0.5 : 1, textDecoration: record.isDeleted ? "line-through" : "none" }}>
                    {record.isDeleted ?
                        <Tag icon={<SyncOutlined spin />} color="processing">
                            processing
                        </Tag> : ""
                    }
                </div>
            ),
        },

        {
            title: "Action",
            key: "action",
            align: "center",
            className: "action-cell",
            render: (_, record) => (
                <div style={{ textAlign: "center" }}>
                    <Tooltip title={"Views"}>
                        <Button type="link" disabled={record.isDeleted} onClick={() => handleRowClick(record)}>
                            <EyeOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title={"Edit"}>
                        <Button type="link" disabled={record.isDeleted} onClick={() => toggleModal(record)}>
                            <EditOutlined />
                        </Button>
                    </Tooltip>
                    {record.isDeleted ? (
                        <>
                            <Tooltip title={"Restore"}>
                                <Button type="link" onClick={() => restoreProduct(record)}>
                                    <UndoOutlined />
                                </Button>
                            </Tooltip>
                            <Tooltip title={"Delete Permanently"}>
                                <Button type="link" onClick={() => deleteProduct(record)}>
                                    <DeleteOutlined />
                                </Button>
                            </Tooltip>
                        </>
                    ) : (
                        <Tooltip title={"Make Delete"}>
                            <Button type="link" onClick={() => tryDeleteProduct(record)}>
                                <DeleteOutlined />
                            </Button>
                        </Tooltip>
                    )}
                </div>
            ),
        },

    ];

    const defaultValue: IProduct = {
        product_id: "",
        SKU: "SKU012",
        name: "Giày Nike cao cấp",
        description: "Mô tả của sản phẩm",
        categoryId: "",
        price: 100000,
        sale: "",
        discount: 0,
        quantity: 0,
        sold_count: 0,
        rating: 5,
        sizes: [
            { name: "36", quantity: 5 }
        ],
        color: "red" || "green" || "blue" || "yellow" || "black" || "white",
        material: "Mesh" || "EVA" || "Velvet" || "Plastic" || "Rubber" || "Fabric" || "Leather",
        release_date: "",
        images: [
        ],
        video: "https://res.cloudinary.com/dxspp5ba5/video/upload/v1708955796/dior-air-jordan-1-cinematic-sneaker-video_z63c37.mp4",
        blog: "61f2a4c8e9a82f001f9e4a1c",
        warranty: "1 year",
        tech_specs: "Giày đặc biệt",
        stock_status: "In stock",
        gender: "nam" || "nữ",
        isPublished: true,
        publishedDate: "",
        hits: 0,
        isDeleted: false
    };

    const Value = {
        product_id: productsState?.product_id ? productsState?.product_id : "",
        SKU: productsState?.SKU ? productsState?.SKU : "",
        name: productsState?.name ? productsState?.name : "",
        description: productsState?.description ? productsState?.description : "",
        categoryId: typeof productsState?.categoryId === 'object' && productsState?.categoryId?.name
            ? productsState?.categoryId._id
            : "",
        price: productsState?.price ? productsState?.price : 0,
        sale: typeof productsState?.sale === 'object' && productsState?.sale?._id ? productsState?.sale._id : "",
        discount: productsState?.discount ? productsState?.discount : 0,
        quantity: productsState?.quantity ? productsState?.quantity : 0,
        sold_count: productsState?.sold_count ? productsState?.sold_count : 0,
        rating: productsState?.rating ? productsState?.rating : 0,
        sizes: productsState?.sizes ? productsState?.sizes : [
        ],
        color: productsState?.color ? productsState?.color : "",
        material: productsState?.material ? productsState?.material : "",
        release_date: productsState?.release_date ? productsState?.release_date : "",
        images: productsState?.images ? productsState?.images : [
            "https://res.cloudinary.com/dxspp5ba5/image/upload/v1708917683/cld-sample-5.jpg",
            "https://res.cloudinary.com/dxspp5ba5/image/upload/v1708917683/cld-sample-5.jpg"
        ],
        video: productsState?.video ? productsState?.video : "https://res.cloudinary.com/dxspp5ba5/video/upload/v1708955796/dior-air-jordan-1-cinematic-sneaker-video_z63c37.mp4",
        blog: productsState?.blog ? productsState?.blog : "61f2a4c8e9a82f001f9e4a1c",
        warranty: productsState?.warranty ? productsState?.warranty : "1 year",
        tech_specs: productsState?.tech_specs ? productsState?.tech_specs : "",
        stock_status: productsState?.stock_status ? productsState?.stock_status : "",
        gender: productsState?.gender ? productsState?.gender : "nam" || "nữ",
        isPublished: productsState?.isPublished ? productsState?.isPublished : true,
        publishedDate: productsState?.publishedDate ? productsState?.publishedDate : "",
        hits: productsState?.hits ? productsState?.hits : 0,
        isDeleted: productsState?.isDeleted ? productsState?.isDeleted : false
    };

    const searchProduct = (value: string) => {
        setSearch(value);
    };


    return (
        <div>

            <Row gutter={10}>
                <Col span={13}>
                    <HeaderTable showModal={() => setIsModalOpen(true)} onSubmitt={searchProduct} name={"Product"} />
                </Col>
            </Row>
            <Filter page={currentPage} searchKeyword={Search} pageSize={pageSize} />
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
                        rowClassName={rowClassName}
                        size="small"
                        pagination={{
                            current: currentPage,
                            total: totalProducts,
                            pageSize: pageSize,
                            showTotal: (total) => `${total} items`,
                            onChange: handlePageChange, // Xử lý thay đổi trang
                            onShowSizeChange: handlePageSizeChange,
                            showSizeChanger: true,
                        }}
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
                        < ProductForm
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
                        <ProductForm mode={"update"} onSubmit={handleUpdateProduct} {...Value} />
                    </Modal>

                    <Modal
                        title={selectedProduct?.name}
                        open={modalVisible}
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

export default ProductsManager;