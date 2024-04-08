import { Form, Input, Select, InputNumber, Button, Row, Col, Radio, DatePicker } from 'antd';
import { IProduct, ISale } from "../../../common/products";
import { fetchAllCategories } from "../../../features/category";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { IStateCategory, IStateSale } from "../../../common/redux/type";
import { DeleteOutlined, FileImageOutlined, StarFilled } from "@ant-design/icons";
import { fetchAllSales } from '../../../features/sale';


const { Option } = Select;

const ProductForm: React.FC<IProduct & { onSubmit: (values: IProduct) => void; mode: string }> = ({
    product_id, SKU, name, description, categoryId, price, sale, discount, quantity, sold_count, rating, sizes, color,
    material, release_date, images, video, blog, warranty, tech_specs, stock_status, gender, isPublished, publishedDate, hits, onSubmit, mode,
}) => {
    const [form] = Form.useForm();
    const handleFormSubmitCreate = (values: IProduct) => {
        onSubmit(values);
    };
    const categoryDispatch = useDispatch<AppDispatch>();
    const saleDispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        categoryDispatch(fetchAllCategories({ page: 1, limit: 10, keyword: '' }));
    }, [categoryDispatch]);

    const { categories } = useSelector((state: IStateCategory) => state.category);

    useEffect(() => {
        saleDispatch(fetchAllSales({ page: 1, limit: 10, keyword: '' }));
    }, [saleDispatch]);

    const { sales } = useSelector((state: IStateSale) => state.sale) || {};

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
                        label="Product ID"
                        name="product_id"
                        rules={[{ required: true, message: "Please enter the product ID" }]}
                    >
                        <Input placeholder="Enter product ID" />
                    </Form.Item>

                    <Form.Item
                        label="Name product"
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
                        label="Category"
                        name="categoryId"
                        rules={[{ required: true, message: "Please select a category" }]}
                    >
                        <Select placeholder="Select a category" defaultValue={typeof categoryId === 'string' ? categoryId : categoryId?.name}>
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

                    <Form.Item
                        label="videoUrl"
                        name="video"
                        rules={[{ required: true, message: "Please enter the product video" }]}
                    >
                        <Input placeholder="Enter product video" />
                    </Form.Item>

                    <Form.Item
                        label="ID blog"
                        name="blog"
                        rules={[{ required: true, message: "Please enter the product blog" }]}
                    >
                        <Input placeholder="Enter product blog" />
                    </Form.Item>

                    <Form.Item
                        label="Warranty"
                        name="warranty"
                        rules={[{ required: true, message: "Please enter the product warranty" }]}
                    >
                        <Input placeholder="Enter product warranty" />
                    </Form.Item>

                    <Form.Item
                        label="Material"
                        name="material"
                        rules={[{ required: true, message: "Please select a material" }]}
                    >
                        <Select placeholder="Select a material" defaultValue="material">
                            <Option value="leather">Leather</Option>
                            <Option value="fabric">Fabric</Option>
                            <Option value="rubber">Rubber</Option>
                            <Option value="plastic">Plastic</Option>
                            <Option value="velvet">Velvet</Option>
                            <Option value="EVA">EVA</Option>
                            <Option value="mesh">Mesh</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        label="Tech specs"
                        name="tech_specs"
                        rules={[{ required: true, message: "Please enter the product tech_specs" }]}
                    >
                        <Input placeholder="Enter product tech_specs" defaultValue={tech_specs} />
                    </Form.Item>

                    {/* các trường khác cho cột thứ nhất */}
                </Col>

                <Col span={12}>
                    {/* các trường khác cho cột thứ hai */}
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please enter the price" }]}
                    >
                        <Col>
                            <InputNumber placeholder="Enter price" defaultValue={price} />
                        </Col>
                    </Form.Item>

                    <Form.Item
                        label="quantity"
                        name="quantity"
                        rules={[{ required: true, message: "Please enter the quantity" }]}
                    >
                        <Col>
                            <InputNumber placeholder="Enter quantity" defaultValue={quantity} />
                        </Col>
                    </Form.Item>
                    <Form.Item
                        label="Sales"
                        name="sale"
                        rules={[{ required: true, message: "Please select a sale" }]}
                    >
                        <Select placeholder="Select a sale" defaultValue={sale}>
                            {sales.map((sale) => (
                                <Select.Option key={sale._id} value={sale._id}>
                                    {sale.name}
                                </Select.Option>
                            ))}
                        </Select>
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

                    <Form.Item
                        label="Hits"
                        name="hits"
                        rules={[{ required: true, message: "Please enter the hits" }]}
                    >
                        <Col>
                            <InputNumber placeholder="Enter hits" defaultValue={hits} />
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

                    <Form.Item
                        label="Stock Status"
                        name="stock_status"
                        rules={[{ required: true, message: "Please select a stock status" }]}
                    >
                        <Select placeholder="Select a Stock Status" defaultValue="stock_status">
                            <Option value="In stock">Có sẵn</Option>
                            <Option value="Out of stock ">Có sẵn</Option>
                            <Option value="Pre-order">Đặt trước</Option>
                            <Option value="Backorder">Đặt hàng sau</Option>
                            <Option value="Discontinued">Ngừng sản xuất</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="isPublished"
                        name="isPublished"
                        rules={[{ required: true, message: "Please enter the product isPublished" }]}
                    >
                        <Radio.Group>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="gender"
                        name="gender"
                        rules={[{ required: true, message: "Please enter the product gender" }]}
                    >
                        <Radio.Group defaultValue={gender}>
                            <Radio value={'nam'}>Nam</Radio>
                            <Radio value={'nữ'}>Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>

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

            <Form.List name="images" >
                {(fields, { add, remove }) => (
                    <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: '10px', marginTop: '20px' }}>
                        {fields.map((field, index) => (
                            <Form.Item
                                key={field.key}
                                label={`Image ${index + 1}`}
                                required={false}
                                style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: '20px', marginBlockEnd: '20px' }}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    noStyle
                                >
                                    <Input.TextArea placeholder="Enter image URL" defaultValue={images} />
                                </Form.Item>
                                {fields.length > 1 && (
                                    <Button
                                        type="text"
                                        onClick={() => remove(field.name)}
                                        style={{ marginLeft: 8 }}
                                    >
                                        <DeleteOutlined />
                                    </Button>
                                )}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '100%' }}
                            >
                                <FileImageOutlined />
                            </Button>
                        </Form.Item>
                    </div>
                )}
            </Form.List>

            <Form.List name="sizes">
                {(fields, { add, remove }) => (
                    <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: '10px', marginTop: '20px' }}>
                        {fields.map((field, index) => (
                            <Form.Item
                                key={field.key}
                                label={`Size ${index + 1}`}
                                required={false}
                                style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: '10px' }}

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
                                        <DeleteOutlined />
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
                    </div>
                )}
            </Form.List>

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