import React from 'react';
import {
    DeleteOutlined,
    EditOutlined,
    LoadingOutlined,
    ExclamationCircleOutlined,
    EyeOutlined,
    WarningFilled,
    SyncOutlined,

} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useState } from "react";
import { IProduct } from "../../../common/products";
import { ColumnsType } from "antd/es/table";
import { Button, Table, Tooltip, Image, Modal, Row, Col, Tag } from "antd";
import { removeProduct, createProduct, update, tryDelete, tryRestore } from "../../../features/product";
import HeaderTable from "../../../components/Admin/Layout/HeaderTable";
import { IStateProduct } from "../../../common/redux/type";
import ProductForm from '../../../components/Admin/Product';
import ProducModal from './ProducModal';
import Filter from './ProductFilter';
const ProductsManager: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [Search, setSearch] = useState("");
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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const [productsState, setProductsState] = useState<IProduct>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const handleCreateProduct = (newProduct: IProduct) => {
        dispatch(createProduct(newProduct));
        setIsModalOpen(false);
    };
    const handleUpdateProduct = (newProduct: IProduct) => {
        dispatch(update({ id: productsState?._id as string, newProduct }));
        setIsModalUpdateOpen(false);
    };
    const toggleModal = (product: IProduct) => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
        setProductsState(product);
    };

    const tryDeleteProduct = (record: IProduct) => {
        Modal.confirm({
            title: "Confirm Delete",
            icon: <ExclamationCircleOutlined />,
            content: "Do you want to delete this product?",
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
    const isRowDisabled = (record: IProduct) => {
        return record.isDeleted === true;
    };
    const rowClassName = (record: IProduct) => {
        return isRowDisabled(record) ? 'table-row-disabled' : '';
    };
    const rowStyle = (record: IProduct) => {
        if (isRowDisabled(record)) {
            return {
                style: {
                    opacity: 0.5
                }
            };
        }

        return {};
    }

    const columns: ColumnsType<IProduct> = [
        {
            title: "No.",
            dataIndex: "index",
            render: (_, __, index) => index + 1,
            align: "right",
        },
        {
            title: "Product Name",
            dataIndex: "name",
        },
        {
            title: "Images",
            dataIndex: "images",
            className: "action-cell",
            align: "center",
            render: (images) => <Image src={images[0]} width={50} className="action-cell" />,
        },
        {
            title: "quantity",
            dataIndex: "quantity",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Sale",
            dataIndex: "sale",
        },
        {
            title: "Is Deleted",
            key: "isDeleted",
            align: "center",
            render: (_, record) => (
                <div style={{ textAlign: "center" }}>
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
                        <Button type="link" >
                            <EyeOutlined onClick={() => handleRowClick(record)} />
                        </Button>
                    </Tooltip>
                    <Tooltip title={"Edit"}>
                        <Button type="link" >
                            <EditOutlined onClick={() => toggleModal(record)} />
                        </Button>
                    </Tooltip>
                    <Tooltip title={"Delete"}>
                        <Button type="link" >
                            <DeleteOutlined onClick={() => tryDeleteProduct(record)} />
                        </Button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const defaultValue: IProduct = {

        product_id: "Mã số sản phẩm",
        SKU: "SKU012",
        name: "Giày Nike cap cấp",
        description: "Mô tả của sản phẩm",
        categoryId: "65899c32bb48834579fde67e",
        price: 999999,
        sale: "",
        discount: 10,
        quantity: 20,
        sold_count: 0,
        rating: 5,
        sizes: [

        ],
        color: "red" || "green" || "blue" || "yellow" || "black" || "white",
        material: "leather" || "fabric" || "rubber" || "plastic" || "velvet" || "EVA" || "mesh",
        release_date: "",
        images: [
        ],
        video: "https://res.cloudinary.com/dxspp5ba5/video/upload/v1708955796/dior-air-jordan-1-cinematic-sneaker-video_z63c37.mp4",
        blog: "61f2a4c8e9a82f001f9e4a1c",
        warranty: "1 year",
        tech_specs: "Đặc tả kỹ thuật của sản phẩm",
        stock_status: "In stock" || "Out of stock" || "Pre-order" || "Backorder" || "Discontinued",
        gender: "nam" || "nữ",
        isPublished: true,
        publishedDate: "",
        hits: 112,
        isDeleted: false
    };
    const Value = {
        product_id: productsState?.product_id ? productsState?.product_id : "Mã số sản phẩm",
        SKU: productsState?.SKU ? productsState?.SKU : "Mã tồn kho của sản phẩm",
        name: productsState?.name ? productsState?.name : "Tên của sản phẩm",
        description: productsState?.description ? productsState?.description : "Mô tả của sản phẩm",
        categoryId: productsState?.categoryId ? productsState?.categoryId : "ID danh mục của sản phẩm",
        price: productsState?.price ? productsState?.price : 0,
        sale: productsState?.sale ? productsState?.sale : '',
        discount: productsState?.discount ? productsState?.discount : 0,
        quantity: productsState?.quantity ? productsState?.quantity : 0,
        sold_count: productsState?.sold_count ? productsState?.sold_count : 0,
        rating: productsState?.rating ? productsState?.rating : 0,
        sizes: productsState?.sizes ? productsState?.sizes : [
            {
                name: "39",
                quantity: 10
            }
        ],
        color: productsState?.color ? productsState?.color : "red" || "green" || "blue" || "yellow" || "black" || "white",
        material: productsState?.material ? productsState?.material : "leather" || "fabric" || "rubber" || "plastic" || "velvet" || "EVA" || "mesh",
        release_date: productsState?.release_date ? productsState?.release_date : "2021-02-28",
        images: productsState?.images ? productsState?.images : [
            "https://res.cloudinary.com/dxspp5ba5/image/upload/v1708917683/cld-sample-5.jpg",
            "https://res.cloudinary.com/dxspp5ba5/image/upload/v1708917683/cld-sample-5.jpg"
        ],
        video: productsState?.video ? productsState?.video : "https://res.cloudinary.com/dxspp5ba5/video/upload/v1708955796/dior-air-jordan-1-cinematic-sneaker-video_z63c37.mp4",
        blog: productsState?.blog ? productsState?.blog : "61f2a4c8e9a82f001f9e4a1c",
        warranty: productsState?.warranty ? productsState?.warranty : "1 year",
        tech_specs: productsState?.tech_specs ? productsState?.tech_specs : "",
        stock_status: productsState?.stock_status ? productsState?.stock_status : "In stock" || "Out of stock" || "Pre-order" || "Backorder" || "Discontinued",
        gender: productsState?.gender ? productsState?.gender : "nam" || "nữ",
        isPublished: productsState?.isPublished ? productsState?.isPublished : true,
        publishedDate: productsState?.publishedDate ? productsState?.publishedDate : "2021-02-28",
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
                <Col span={12}>
                    <Filter
                        page={currentPage} searchKeyword={Search} />
                </Col>
            </Row>
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
                            showTotal: (total) => ` ${total} items`,
                            onChange: handlePageChange,
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