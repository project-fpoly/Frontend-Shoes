import React from 'react';
import {
    DeleteOutlined,
    EditOutlined,
    LoadingOutlined,
    ExclamationCircleOutlined,
    StarFilled,
    EyeFilled
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useEffect, useState } from "react";
import { IProduct } from "../../../common/products";
import { ColumnsType } from "antd/es/table";
import { Button, Table, Tooltip, Image, Modal, Descriptions, Row, Col } from "antd";
import { fetchAllProducts, removeProduct } from "../../../features/product";

import { IStateProduct } from "../../../common/redux/type";

const ProductsManager: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading } = useSelector(
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

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

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
                record._id && dispatch(removeProduct(record._id));
            },
            onCancel() { },
        });
    };
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
            render: (images) => <Image src={images[0]} width={50} className="action-cell" />,
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: 'Category',
            dataIndex: 'categoryId',
            render: category => category.name
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
            title: "Action",
            key: "action",
            align: "center",
            className: "action-cell",
            render: (_, record) => (
                <div style={{ textAlign: "center" }}>
                    <Tooltip title={"Edit"}>
                        <Button type="link" >
                            <EditOutlined />
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

    return (
        <div>
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
                        pagination={false}
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
                        title={selectedProduct?.name}
                        visible={modalVisible}
                        onCancel={closeModal}
                        footer={null}
                    >
                        {selectedProduct && (
                            <Descriptions title="Product Details" bordered column={1}>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Product Code</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.product_id}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>SKU</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.SKU}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Product Name</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.name}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Images</strong>
                                        </Col>
                                        <Col span={16}>
                                            <Row gutter={[16, 16]}>
                                                {selectedProduct.images &&
                                                    selectedProduct.images.map(img => (
                                                        <Col span={6} key={img}>
                                                            <Image width={100} src={img} />
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Video</strong>
                                        </Col>
                                        <Col span={16}>
                                            <video src={selectedProduct.video} controls style={{ width: "120", height: "65" }} />
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Description</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.description}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Price</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.price}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Sale</strong> %
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.sale} %
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Discount</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.discount}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Quantity</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.quantity}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Sold count</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.sold_count}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Rating</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.rating} <StarFilled></StarFilled>
                                        </Col>
                                    </Row>
                                </Descriptions.Item>



                                <Descriptions.Item >
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Sizes</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.sizes.map(size => (
                                                <div key={size.id}>
                                                    {size.name} - {size.quantity}
                                                </div>
                                            ))}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Color</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.color}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Material</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.material}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>release_date</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.release_date && new Date(selectedProduct.release_date).toLocaleDateString()}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Warranty</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.warranty}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Tech specs</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.tech_specs}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Stock status</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.stock_status}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>isPublished</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.isPublished ? "Yes" : "No"}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>PublishedDate</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.publishedDate && new Date(selectedProduct.publishedDate).toLocaleDateString()}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>Hit</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.hits} <EyeFilled />
                                        </Col>
                                    </Row>
                                </Descriptions.Item>



                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>updatedAt</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.updatedAt && new Date(selectedProduct.updatedAt).toLocaleString()}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>

                                <Descriptions.Item>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <strong>createdAt</strong>
                                        </Col>
                                        <Col span={16}>
                                            {selectedProduct.createdAt && new Date(selectedProduct.createdAt).toLocaleString()}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                            </Descriptions>
                        )}
                    </Modal>
                </>
            )}
        </div>
    );
};

export default ProductsManager;