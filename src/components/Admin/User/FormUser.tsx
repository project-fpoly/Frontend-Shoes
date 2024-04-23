import {
  Button,
  Form,
  GetProp,
  Image,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd'
import { IUsers } from '../../../common/users'
import Input from 'antd/es/input/Input'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { UploadChangeParam } from 'antd/es/upload'
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
const FormUser: React.FC<
  IUsers & { onSubmit: (values: IUsers) => void; mode: string }
> = ({
  userName,
  password,
  deliveryAddress,
  email,
  role,
  onSubmit,
  phoneNumbers,
  avt,
  dateOfBirth,
  gender,
  mode,
}) => {
    const [form] = Form.useForm()
    const [fileList, setFileList] = useState<UploadFile[]>([])
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
    const handleFormSubmitCreate = (values: IUsers) => {
      const formData = new FormData()
      formData.append('userName', values.userName)
      formData.append('deliveryAddress', values.deliveryAddress)
      formData.append('gender', values.gender)
      formData.append('dateOfBirth', values.dateOfBirth)
      formData.append('phoneNumbers', values.phoneNumbers)
      if (values.avt?.file?.originFileObj) {
        formData.append('avt', values.avt.file.originFileObj)
      } else {
        formData.append('avt', avt)
      }

      if (mode === 'create') {
        formData.append('email', values.email)
        formData.append('role', values.role)
        formData.append('password', values.password || '')
      }

      const formDataObject: IUsers = Array.from(formData.entries()).reduce(
        (acc, [key, value]) => {
          acc[key] = value
          return acc
        },
        {} as IUsers,
      )
      onSubmit(formDataObject)
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
          userName,
          password,
          role,
          deliveryAddress,
          email,
          phoneNumbers,
          avt,
          dateOfBirth,
          gender,
        }}
        onFinish={handleFormSubmitCreate}
      >
        <Form.Item
          label={'userName'}
          name="userName"
          rules={[{ required: true, message: 'pls input Full Name' }]}
        >
          <Input defaultValue={userName} />
        </Form.Item>
        {mode === 'create' && (
          <>
            <Form.Item
              label={'email'}
              name="email"
              rules={[{ required: true, message: 'pls input Email' }]}
            >
              <Input defaultValue={email} />
            </Form.Item>

            <Form.Item
              label={'password'}
              name="password"
              rules={[{ required: true, message: 'pls input password' }]}
            >
              <Input defaultValue={password} />
            </Form.Item>

            <Form.Item
              label={'role'}
              name="role"
              rules={[{ required: true, message: 'pls input role' }]}
            >
              <Input defaultValue={role} />
            </Form.Item>
          </>
        )}
        <Form.Item
          label={'deliveryAddress'}
          name="deliveryAddress"
          rules={[{ required: true, message: 'pls input deliveryAddress' }]}
        >
          <Input defaultValue={deliveryAddress} />
        </Form.Item>
        <Form.Item
          label={'gender'}
          name="gender"
          rules={[{ required: true, message: 'pls input gender' }]}
        >
          <Input defaultValue={gender} />
        </Form.Item>
        <Form.Item
          label={'dateOfBirth'}
          name="dateOfBirth"
          rules={[{ required: true, message: 'pls input dateOfBirth' }]}
        >
          <Input defaultValue={dateOfBirth} />
        </Form.Item>
        <Form.Item
          label={'avt'}
          name="avt"
          rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện' }]}
        >
          {!showUploadButton ? (
            <div>
              <Image src={avt.url} alt="Avatar" />
              <Button onClick={handleRemoveImage}>Xóa ảnh</Button>
            </div>
          ) : (
            <>
              <Upload
                name="avt"
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemoveImage}
              >
                {showUploadButton && (fileList.length >= 1 ? null : uploadButton)}
              </Upload>
            </>
          )}
        </Form.Item>

        <Form.Item
          label={'phoneNumbers'}
          name="phoneNumbers"
          rules={[{ required: true, message: 'pls input phoneNumbers' }]}
        >
          <Input defaultValue={phoneNumbers} />
        </Form.Item>

        <Form.Item
          style={{ textAlign: 'right' }}
          wrapperCol={{ offset: 8, span: 16 }}
        >
          {/* <Button>cancel</Button> */}
          <Button style={{ marginLeft: '5px' }} type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    )
  }

export default FormUser
