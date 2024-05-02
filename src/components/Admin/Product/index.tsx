import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Row,
  Col,
  Radio,
  DatePicker,
  Space,
  Upload,
  message,
} from 'antd'
import { IProduct } from '../../../common/products'
import { fetchAllCategories } from '../../../features/category'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IStateCategory, IStateSale } from '../../../common/redux/type'
import {
  DeleteOutlined,
  FileImageOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  StarFilled,
  UploadOutlined,
} from '@ant-design/icons'
import { fetchAllSales } from '../../../features/sale'
import axios, { AxiosResponse } from 'axios'
import NumericInput from './input'

const { Option } = Select
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}
const ProductForm: React.FC<
  IProduct & { onSubmit: (values: IProduct) => void; mode: string }
> = ({
  product_id,
  SKU,
  name,
  description,
  categoryId,
  price,
  sale,
  discount,
  quantity,
  sold_count,
  rating,
  sizes,
  color,
  material,
  release_date,
  images,
  video,
  blog,
  warranty,
  tech_specs,
  stock_status,
  gender,
  isPublished,
  publishedDate,
  hits,
  onSubmit,
  mode,
}) => {
  if (mode === 'create') {
  }
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [loadingFiles, setLoadingFiles] = useState<File[]>([])
  const [form] = Form.useForm()
  const handleUpload = async (file: File | Blob | string) => {
    const CLOUD_NAME = 'dxspp5ba5'
    const PRESET_NAME = 'upload'
    const FOLDER_NAME = 'Upload'
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData()
    formData.append('upload_preset', PRESET_NAME)
    formData.append('folder', FOLDER_NAME)
    formData.append('file', file as File)

    setLoadingFiles((prev: any) => [...prev, file])

    try {
      const response: AxiosResponse<any> = await axios.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const imageUrl: string = response.data.secure_url
      setUploadedImages((prevImages) => [...prevImages, imageUrl])
      message.success('Image uploaded successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
      message.error('Failed to upload image')
    }

    setLoadingFiles((prev) => prev.filter((f) => f !== file))
  }

  const handleFormSubmitCreate = (values: IProduct) => {
    if (mode === 'create') {
      onSubmit({ ...values, images: uploadedImages })
    } else {
      onSubmit(values)
    }
  }
  const categoryDispatch = useDispatch<AppDispatch>()
  const saleDispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    categoryDispatch(fetchAllCategories({ page: 1, limit: 1000, keyword: '' }))
  }, [categoryDispatch])

  const { categories } = useSelector((state: IStateCategory) => state.category)

  useEffect(() => {
    saleDispatch(fetchAllSales({ page: 1, limit: 10, keyword: '' }))
  }, [saleDispatch])

  const { sales } = useSelector((state: IStateSale) => state.sale) || {}

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 1000 }}
      autoComplete="off"
      initialValues={{
        product_id,
        SKU,
        name,
        description,
        categoryId,
        price,
        sale,
        discount,
        quantity,
        sold_count,
        rating,
        sizes,
        color,
        material,
        release_date,
        images,
        video,
        blog,
        warranty,
        tech_specs,
        stock_status,
        isPublished,
        publishedDate,
        hits,
        gender,
      }}
      onFinish={handleFormSubmitCreate}
    >
      <Row
        gutter={24}
        style={{
          border: '1px solid #d9d9d9',
          borderRadius: 4,
          padding: '10px',
        }}
      >
        <Col span={12}>
          {/* các trường khác cho cột thứ nhất */}
          <Form.Item
            label="Product ID"
            name="product_id"
            rules={[{ required: true, message: 'Please enter the product ID' }]}
          >
            <Input
              showCount
              maxLength={20}
              placeholder="Enter product ID"
              value={product_id}
            />
          </Form.Item>

          <Form.Item
            label="Name product"
            name="name"
            rules={[
              { required: true, message: 'Please enter the product name' },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={50}
              style={{ height: 50, resize: 'none' }}
              placeholder="Enter product name"
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select
              placeholder="Select a category"
              value={
                typeof categoryId === 'string' ? categoryId : categoryId?.name
              }
            >
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
            rules={[{ required: true, message: 'Please select a color' }]}
          >
            <Select placeholder="Select a color" value={color}>
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
              <Option value="yellow">Yellow</Option>
              <Option value="black">Black</Option>
              <Option value="white">White</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Material"
            name="material"
            rules={[{ required: true, message: 'Please select a material' }]}
          >
            <Select placeholder="Select a material" value="material">
              <Option value="Leather">Leather</Option>
              <Option value="Fabric">Fabric</Option>
              <Option value="Rubber">Rubber</Option>
              <Option value="Plastic">Plastic</Option>
              <Option value="Velvet">Velvet</Option>
              <Option value="EVA">EVA</Option>
              <Option value="Mesh">Mesh</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Tech specs"
            name="tech_specs"
            rules={[{ required: true, message: 'Please enter Tech specs' }]}
          >
            <Input.TextArea
              showCount
              maxLength={100}
              style={{ height: 80, resize: 'none' }}
              placeholder="Đặc tả kỹ thuật"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea
              showCount
              maxLength={500}
              style={{ height: 220, resize: 'none' }}
              placeholder="Enter product description"
            />
          </Form.Item>

          {/* các trường khác cho cột thứ nhất */}
        </Col>

        <Col span={12}>
          {/* các trường khác cho cột thứ hai */}
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <NumericInput
              placeholder="Price"
              min={100000}
              max={20000000}
              step={1000}
              value={form.getFieldValue('price')}
              onChange={(value) => {
                const parsedPrice = parseFloat(value) // Chuyển đổi thành số
                form.setFieldsValue({ price: parsedPrice })
              }}
            />
          </Form.Item>

          <Form.Item label="Sales" name="sale">
            <Select placeholder="Select a sale" value={sale}>
              {/* Thêm option rỗng */}
              <Select.Option value={null}>None</Select.Option>
              {/* Lặp qua danh sách sales */}
              {sales.map((sale) => (
                <Select.Option key={sale._id} value={sale._id}>
                  {sale.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {mode === 'create' && (
            <>
              <Form.Item
                rules={[
                  { required: true, message: 'Please enter the Release Date' },
                ]}
                label="Release Date"
                name="release_date"
              >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please enter the Published Date',
                  },
                ]}
                label="Published Date"
                name="publishedDate"
              >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
            </>
          )}
          {mode === 'update' && (
            <>
              <Form.Item
                label="release_date"
                name="release_date"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the product release_date',
                  },
                ]}
              >
                <Input placeholder="Enter product release_date" />
              </Form.Item>

              <Form.Item
                label="Published Date"
                name="publishedDate"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the product publishedDate',
                  },
                ]}
              >
                <Input placeholder="Enter product publishedDate" />
              </Form.Item>
            </>
          )}
          <Form.Item
            label="Stock Status"
            name="stock_status"
            rules={[
              { required: true, message: 'Please select a stock status' },
            ]}
          >
            <Select placeholder="Select a Stock Status" value="stock_status">
              <Option value="In stock">Có sẵn</Option>
              <Option value="Out of stock ">Không Có sẵn</Option>
              <Option value="Pre-order">Đặt trước</Option>
              <Option value="Backorder">Đặt hàng sau</Option>
              <Option value="Discontinued">Ngừng sản xuất</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please pick gender!' }]}
          >
            <Radio.Group value={gender}>
              <Radio.Button value="nam">Nam</Radio.Button>
              <Radio.Button value="nữ">Nữ</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="sizes"
            style={{
              maxHeight: 180,
              overflow: 'auto',
              height: '120px',
              position: 'relative',
            }}
            rules={[
              { required: true, message: 'Please add at least one size' },
            ]}
          >
            <Form.List name="sizes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    const size = sizes && sizes[name]

                    return (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          rules={[{ required: true, message: 'Missing name' }]}
                        >
                          <NumericInput
                            value={size?.name || ''}
                            onChange={(value) =>
                              form.setFieldsValue({
                                [`sizes[${name}].name`]: value,
                              })
                            }
                            placeholder="Input size name"
                            min={36}
                            max={42}
                            step={1}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'quantity']}
                          rules={[
                            { required: true, message: 'Missing quantity' },
                          ]}
                        >
                          <NumericInput
                            placeholder="Quantity"
                            min={1} // Changed min value to 0
                            max={200}
                            step={1}
                            value={size?.quantity ? String(size.quantity) : ''} // Convert number to string before assigning
                            onChange={(value) =>
                              form.setFieldsValue({
                                [`sizes[${name}].quantity`]: value,
                              })
                            }
                          />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    )
                  })}
                  <Form.Item
                    style={{
                      position: 'sticky',
                      bottom: 0,
                      zIndex: 1,
                      backgroundColor: 'white',
                    }}
                  >
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Size
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          {mode === 'create' && (
            <>
              <Form.Item
                name="images"
                rules={[{ required: true, message: 'Please upload images!' }]}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ maxHeight: 180, overflow: 'auto', height: '180px' }}
              >
                <Upload
                  name="logo"
                  customRequest={({ file }) => handleUpload(file)}
                  listType="picture"
                  showUploadList={true}
                >
                  <Button icon={<UploadOutlined />}>
                    Click to upload Images
                  </Button>
                </Upload>
                {loadingFiles.map((file) => (
                  <div key={file.name}>{file.name} - Loading...</div>
                ))}
              </Form.Item>
            </>
          )}
          {mode === 'update' && (
            <>
              <Form.Item
                style={{
                  maxHeight: 180,
                  overflow: 'auto',
                  position: 'relative',
                }}
              >
                <Form.List name="images">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: 'flex', marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name]}
                            rules={[
                              { required: true, message: 'Missing image URL' },
                            ]}
                          >
                            <Input placeholder="Image URL" value={images} />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item
                        style={{
                          position: 'sticky',
                          bottom: 0,
                          zIndex: 1,
                          backgroundColor: 'white',
                        }}
                      >
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Image
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </>
          )}
          {/* các trường khác cho cột thứ hai */}
        </Col>
      </Row>
      <Form.Item
        label="videoUrl"
        name="video"
        rules={[{ required: true, message: 'Please enter the product video' }]}
      >
        <Input placeholder="Enter product video" />
      </Form.Item>
      {/* Các trường còn lại */}

      <Form.Item
        style={{ textAlign: 'right' }}
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button>Cancel</Button>
        <Button style={{ marginLeft: '5px' }} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ProductForm
