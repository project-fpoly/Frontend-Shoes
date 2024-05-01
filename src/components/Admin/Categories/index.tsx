import React, { useState } from 'react'
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  Image,
  GetProp,
  UploadProps,
  InputNumber,
} from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/es/upload'
import { PlusOutlined } from '@ant-design/icons'
import { ICategory } from '../../../common/category'

const { Option } = Select
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const FormCategory: React.FC<
  ICategory & { onSubmit: (values: ICategory) => void; mode: string }
> = ({ name, description, onSubmit, imageUrl, status, viewCount, mode }) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [imageUrlState, setImageUrlState] = useState<{ url: string }>({
    url: imageUrl?.url || '',
  })
  const [showUploadButton, setShowUploadButton] = useState(mode === 'create')
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }
  }
  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const handleRemoveImage = () => {
    setFileList([])
    setShowUploadButton(true)
  }

  const handleFormSubmitCreate = (values: ICategory) => {
    const formData = new FormData()

    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('viewCount', String(values.viewCount)) // Convert viewCount to string

    if (values.imageUrl?.file?.originFileObj) {
      formData.append('imageUrl', values.imageUrl.file.originFileObj)
    } else if (
      typeof values.imageUrl === 'object' &&
      values.imageUrl !== null
    ) {
      formData.append('imageUrl', values.imageUrl) // Ensure imageUrl is of type File | Blob
    }

    formData.append('status', String(values.status))

    // Convert FormData to an object
    const formDataObject: Partial<ICategory> = Array.from(
      formData.entries(),
    ).reduce((acc, [key, value]) => {
      acc[key as keyof ICategory] = value // Cast key to keyof ICategory
      return acc
    }, {} as Partial<ICategory>)

    onSubmit(formDataObject as ICategory)
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{
        name,
        description,
        imageUrl,
        status,
        viewCount,
      }}
      onFinish={handleFormSubmitCreate}
    >
      <Form.Item
        label={'Name'}
        name="name"
        rules={[
          { required: true, message: 'Please input the name of the category' },
        ]}
      >
        <Input defaultValue={name} />
      </Form.Item>

      <Form.Item
        label={'Description'}
        name="description"
        rules={[{ required: false, message: 'Please input the description' }]}
      >
        <Input defaultValue={description} />
      </Form.Item>

      {mode === 'create' && (
        <>
          <Form.Item
            label={'imageUrl'}
            name="imageUrl"
            rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện' }]}
          >
            {!showUploadButton ? (
              <div>
                <Image src={imageUrl.url} alt="Avatar" />
                <Button onClick={handleRemoveImage}>Xóa ảnh</Button>
              </div>
            ) : (
              <>
                <Upload
                  name="imageUrl"
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-circle"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  onRemove={handleRemoveImage}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </>
            )}
          </Form.Item>
        </>
      )}
      {mode === 'update' && (
        <Form.Item
          label="Image URL"
          name="imageUrl"
          initialValue={imageUrlState.url}
          rules={[{ required: true, message: 'Please enter the image URL' }]}
        >
          <Input
            value={imageUrlState.url}
            onChange={(e) => {
              const newImageUrl = e.target.value
              setImageUrlState({ url: newImageUrl })
            }}
          />
        </Form.Item>
      )}

      <Form.Item
        label={'Status'}
        name="status"
        rules={[{ required: false, message: 'Please select the status' }]}
        initialValue="active"
      >
        <Select>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={'View Count'}
        name="viewCount"
        initialValue={viewCount}
        rules={[{ required: false, message: 'Please input the view count' }]}
      >
        <InputNumber />
      </Form.Item>

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

export default FormCategory
