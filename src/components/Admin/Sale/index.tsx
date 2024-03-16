import { Form, Input, Select, InputNumber, Button, Row, Col, Radio, DatePicker } from 'antd';
import { IProduct } from "../../../common/products";
import { fetchAllCategories } from "../../../features/category";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { IStateCategory } from "../../../common/redux/type";
import { DeleteOutlined, FileImageOutlined, StarFilled } from "@ant-design/icons";

const { Option } = Select;

const SaleForm: React.FC<IProduct & { onSubmit: (values: IProduct) => void; mode: string }> = ({
    product_id, SKU, name, description, categoryId, price, sale, discount, quantity, sold_count, rating, sizes, color,
    material, release_date, images, video, blog, warranty, tech_specs, stock_status, gender, isPublished, publishedDate, hits, onSubmit, mode,
}) => {
    const [form] = Form.useForm();
    const handleFormSubmitCreate = (values: IProduct) => {
        onSubmit(values);
        console.log(values);
    };
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchAllCategories({ page: 1, limit: 10, keyword: "" }));
    }, [dispatch]);
    const { categories } = useSelector(
        (state: IStateCategory) => state.category
    );
    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 1000 }}
            autoComplete="off"
            initialValues={{
                product_id, SKU, name, description, categoryId, price, sale, discount, quantity, sold_count, rating, sizes, color,
                material, release_date, images, video, blog, warranty, tech_specs, stock_status, isPublished, publishedDate, hits,
            }}
            onFinish={handleFormSubmitCreate}
        >
            <Row gutter={24} style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: '10px' }}>
                <Col span={12}>
                    {/* các trường khác cho cột thứ nhất */}

                    <Form.Item
                        label="Name product"
                        name="name"
                        rules={[{ required: true, message: "Please enter the product name" }]}
                    >
                        <Input placeholder="Enter product name" />
                    </Form.Item>
                    {/* các trường khác cho cột thứ nhất */}
                </Col>

                <Col span={12}>
                    {/* các trường khác cho cột thứ hai */}
                    <Form.Item
                        label="Sale"
                        name="sale"
                        rules={[{ required: true, message: "Please enter the sale" }]}
                    >
                        <Col>
                            <InputNumber placeholder="Enter sale" defaultValue={sale} />
                        </Col>
                    </Form.Item>

                    <Form.Item
                        label="discount"
                        name="discount"
                        rules={[{ required: true, message: "Please enter the discount" }]}
                    >
                        <Col>
                            <InputNumber placeholder="Enter discount" defaultValue={discount} />
                        </Col>
                    </Form.Item>

                    {mode === "create" && (

                        <>
                            <Form.Item
                                rules={[{ required: true, message: "Please enter the Release Date" }]}
                                label="Release Date" name="release_date" initialValue={publishedDate}>
                                <DatePicker format="DD-MM-YYYY" />
                            </Form.Item>
                            <Form.Item
                                rules={[{ required: true, message: "Please enter the Published Date" }]}
                                label="Published Date" name="publishedDate" initialValue={publishedDate}>
                                <DatePicker format="DD-MM-YYYY" />
                            </Form.Item>
                        </>
                    )}
                    {mode === "update" && (
                        <>
                            <Form.Item
                                label="release_date"
                                name="release_date"
                                rules={[{ required: true, message: "Please enter the product release_date" }]}
                            >
                                <Input placeholder="Enter product release_date" />
                            </Form.Item>

                            <Form.Item
                                label="Published Date"
                                name="publishedDate"
                                rules={[{ required: true, message: "Please enter the product publishedDate" }]}
                            >
                                <Input placeholder="Enter product publishedDate" />
                            </Form.Item>
                        </>
                    )}
                    {/* các trường khác cho cột thứ hai */}
                </Col>
            </Row>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter the product description" }]}
                style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: '10px', marginTop: '20px' }}
            >
                <Input.TextArea placeholder="Enter product description" />
            </Form.Item>

            {/* Các trường còn lại */}

            <Form.Item style={{ textAlign: "right" }} wrapperCol={{ offset: 8, span: 16 }}>
                <Button>Cancel</Button>
                <Button style={{ marginLeft: "5px" }} type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SaleForm;