import React, { useState } from 'react'
import { Form, Input, Button, Upload, Image } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// import { IUsers } from "../../../common/users";

type FormVoucherProps = {
  // onSubmit: (values: IUsers) => void;
  mode: string
}

const FormVoucher: React.FC<FormVoucherProps> = ({ mode }) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<any[]>([])
  const [showUploadButton, setShowUploadButton] = useState(mode === 'create')

  // const handlePreview = async (file: any) => {
  //     // if (!file.url && !file.preview) {
  //     //     file.preview = await getBase64(file.originFileObj);
  //     // }
  // };

  const handleChange = (info: any) => {
    setFileList(info.fileList)
  }

  const handleRemoveImage = () => {
    setFileList([])
    setShowUploadButton(true)
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
    >
      <Form.Item
        label={'userName'}
        name="userName"
        rules={[{ required: true, message: 'Please input Full Name' }]}
      >
        <Input />
      </Form.Item>
      {mode === 'create' && (
        <>
          <Form.Item
            label={'email'}
            name="email"
            rules={[{ required: true, message: 'Please input Email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={'password'}
            name="password"
            rules={[{ required: true, message: 'Please input password' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={'role'}
            name="role"
            rules={[{ required: true, message: 'Please input role' }]}
          >
            <Input />
          </Form.Item>
        </>
      )}
      <Form.Item
        label={'deliveryAddress'}
        name="deliveryAddress"
        rules={[{ required: true, message: 'Please input deliveryAddress' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={'gender'}
        name="gender"
        rules={[{ required: true, message: 'Please input gender' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={'dateOfBirth'}
        name="dateOfBirth"
        rules={[{ required: true, message: 'Please input dateOfBirth' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={'avt'}
        name="avt"
        rules={[{ required: true, message: 'Please select avatar' }]}
      >
        {!showUploadButton ? (
          <div>
            <Image src={fileList[0]?.thumbUrl} alt="Avatar" />
            <Button onClick={handleRemoveImage}>Remove Image</Button>
          </div>
        ) : (
          <>
            <Upload
              name="avt"
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </>
        )}
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormVoucher
