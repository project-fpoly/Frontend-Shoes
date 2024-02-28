import { Image, Descriptions, Row, Col } from "antd";
import { IProduct } from "../../../common/products";
import {
    StarFilled,
    EyeFilled
} from "@ant-design/icons";
const ProducModal = (selectedProduct: IProduct) => {
    return (
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
                        <strong>Category</strong>
                    </Col>
                    <Col span={16}>
                        {typeof selectedProduct.categoryId === 'string' ? selectedProduct.categoryId : selectedProduct.categoryId?.name}
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
                        <strong>Discount</strong>%
                    </Col>
                    <Col span={16}>
                        {selectedProduct.discount}%
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
                        {selectedProduct.sizes && selectedProduct.sizes.map(size => (
                            <div key={size.id}>
                                size: {size.name} - quantity:{size.quantity}
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
                        <strong>blogID</strong>
                    </Col>
                    <Col span={16}>
                        {selectedProduct.blog}
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
    )
}

export default ProducModal