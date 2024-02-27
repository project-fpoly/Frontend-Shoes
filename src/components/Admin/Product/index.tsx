import { Form, Input, Select, InputNumber, Button, Row, Col } from 'antd';
import { IProduct } from "../../../common/products";
import { fetchAllCategories } from "../../../features/category";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { IStateCategory } from "../../../common/redux/type";
import { StarFilled } from "@ant-design/icons";
const { Option } = Select;

const ProductForm: React.FC<IProduct & { onSubmit: (values: IProduct) => void; mode: string }> = ({
    product_id, SKU, name, description, categoryId, price, sale, discount, quantity, sold_count, rating, sizes, color,
    material, release_date, images, video, blog, warranty, tech_specs, stock_status, isPublished, publishedDate, hits, onSubmit, mode,
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
    console.log(categories);

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
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        label="Product ID"
                        name="product_id"
                        rules={[{ required: true, message: "Please enter the product ID" }]}
                    >
                        <Input placeholder="Enter product ID" />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter the product name" }]}
                    >
                        <Input placeholder="Enter product name" />
                    </Form.Item>

                    <Form.Item
                        label="SKU"
                        name="SKU"
                        rules={[{ required: true, message: "Please enter the SKU" }]}
                    >
                        <Input placeholder="Enter SKU" />
                    </Form.Item>


                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please enter the product description" }]}
                    >
                        <Input.TextArea placeholder="Enter product description" />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="categoryId"
                        rules={[{ required: true, message: "Please select a category" }]}
                    >
                        <Select placeholder="Select a category">
                            {categories.map((category) => (
                                <Option key={category._id} value={category._id}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Color"
                        name="color"
                        rules={[{ required: true, message: "Please select a color" }]}
                    >
                        <Select placeholder="Select a color" defaultValue="red">
                            <Option value="red">Red</Option>
                            <Option value="green">Green</Option>
                            <Option value="blue">Blue</Option>
                            <Option value="yellow">Yellow</Option>
                            <Option value="black">Black</Option>
                            <Option value="white">White</Option>
                        </Select>
                    </Form.Item>

                    {/* các trường khác cho cột thứ nhất */}
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please enter the price" }]}
                    >
                        <Col>
                            <InputNumber placeholder="Enter price" />
                        </Col>
                    </Form.Item>

                    <Form.Item
                        label="quantity"
                        name="quantity"
                        rules={[{ required: true, message: "Please enter the quantity" }]}
                    >
                        <Col>
                            <InputNumber placeholder="Enter quantity" />
                        </Col>
                    </Form.Item>

                    <Form.Item
                        label="Sale"
                        name="sale"
                        rules={[{ required: true, message: "Please enter the sale" }]}
                    >
                        <Col>
                            <InputNumber placeholder="Enter sale" />
                        </Col>
                    </Form.Item>

                    <Form.Item
                        label="discount"
                        name="discount"
                        rules={[{ required: true, message: "Please enter the discount" }]}
                    >
                        <Col>
                            <InputNumber placeholder="Enter discount" />
                        </Col>
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: "Please enter the rating" }]}
                    >
                        <Select placeholder="Select rating" defaultValue={5}>
                            <Select.Option value={1}>1 <StarFilled /></Select.Option>
                            <Select.Option value={2}>2 <StarFilled /></Select.Option>
                            <Select.Option value={3}>3 <StarFilled /></Select.Option>
                            <Select.Option value={4}>4 <StarFilled /></Select.Option>
                            <Select.Option value={5}>5 <StarFilled /></Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.List name="sizes">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        key={field.key}
                                        label={`Size ${index + 1}`}
                                        required={false}
                                    >
                                        <Form.Item
                                            name={[field.name, 'name']}
                                            fieldKey={[field.fieldKey!, 'name']}
                                            validateTrigger={["onChange", "onBlur"]}
                                            noStyle
                                        >
                                            <Input placeholder="Enter size name" />
                                        </Form.Item>
                                        <Form.Item
                                            name={[field.name, 'quantity']}
                                            fieldKey={[field.fieldKey!, 'quantity']}
                                            validateTrigger={["onChange", "onBlur"]}
                                            noStyle
                                        >
                                            <InputNumber placeholder="Enter size quantity" />
                                        </Form.Item>
                                        {fields.length > 1 && (
                                            <Button
                                                type="text"
                                                onClick={() => remove(field.name)}
                                                style={{ marginLeft: 8 }}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: "100%" }}
                                    >
                                        Add Size
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item
                        label="material"
                        name="material"
                        rules={[{ required: true, message: "Please enter the product material" }]}
                    >
                        <Input placeholder="Enter product material" />
                    </Form.Item>

                    {/* <Form.Item
                        label="Ngày phát hành"
                        name="release_date"
                        rules={[{ required: true, message: "Vui lòng chọn ngày phát hành" }]}
                    >
                        <DatePicker format="DD-MM-YYYY" />
                    </Form.Item> */}



                    {/* các trường khác cho cột thứ hai */}



                </Col>
            </Row>
            {mode === "update" && (<></>
            //mode
            )}
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

export default ProductForm;