import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SiNike } from 'react-icons/si'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        'http://localhost:9000/api/auth/forgot-password',
        {
          email: values?.email,
        },
      )
      if (response && response.status === 200) {
        response.data.message && alert(response.data.message)
        navigate('/signin')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center flex items-center justify-center">
          <SiNike className="vertical-align: middle" size={50} />
        </div>
        <section>
          <Form
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            name="form_item_path"
            layout="vertical"
            onFinish={(e) => handleSubmit(e)}
            autoComplete="off"
          >
            <h1 className="text-2xl font-normal sm:text-4xl">
              Email your email address.
            </h1>
            <Form.Item
              className="text-black font-bold"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input a valid email!',
                  type: 'email',
                },
              ]}
            >
              <Input
                className="border border-black"
                size="large"
                placeholder="Email"
              />
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                className="rounded-full btn-primary-dark btn-md"
                htmlType="submit"
                style={{
                  color: 'white',
                  backgroundColor: 'black',
                  borderColor: 'black',
                  padding: '24px',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', // Để căn giữa theo chiều ngang
                  marginLeft: 'auto', // Để nút sang bên phải
                }}
              >
                Continue
              </Button>
            </div>
          </Form>
        </section>
      </div>
    </div>
  )
}

export default ForgotPassword
