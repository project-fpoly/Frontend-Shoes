import { useState } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { SiNike } from 'react-icons/si'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const [passwordHelp, setPasswordHelp] = useState<string | undefined>(
    undefined,
  )
  const [confirmPasswordHelp, setConfirmPasswordHelp] = useState<
    string | undefined
  >(undefined)
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      const data = { ...values }
      const response = await axios.post(
        'http://localhost:9000/api/auth/signup',
        data,
      )
      if (response && response.status === 200) {
        notification.success({
          message: 'Signup successfully'
        });
        localStorage.setItem('accessToken', response.data.accessToken)

        //redirect to signup page
        navigate(`/verify-email?email=${values?.email}`)
      }
    } catch (e: any) {
      notification.error({
        message: 'Signup failed',
        description: e.response?.data?.message || 'An error occurred',
      });
      console.log(e)
    }
    console.log('Received values:', values)
  }

  const validatePassword = (_: any, value: string) => {
    if (value.length < 6) {
      setPasswordHelp('Password must be at least 6 characters.')
      return Promise.reject('')
    }

    // if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
    //   setPasswordHelp(
    //     'Password must be at least 8 characters, include uppercase, lowercase, and a number.',
    //   )
    //   return Promise.reject('')
    // }

    setPasswordHelp(undefined)
    return Promise.resolve()
  }

  const validateConfirmPassword = (_: any, value: string) => {
    if (value.length < 6) {
      setConfirmPasswordHelp('Password must be at least 6 characters.')
      return Promise.reject('')
    }

    // if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
    //   setConfirmPasswordHelp(
    //     'Password must be at least 8 characters, include uppercase, lowercase, and a number.',
    //   )
    //   return Promise.reject('')
    // }

    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    const passwordValue = passwordInput ? passwordInput.value : '';
    if (value.trim() !== passwordValue.trim()) {
      setConfirmPasswordHelp('Confirm password does not match password.');
      return Promise.resolve({});
    }

    setConfirmPasswordHelp(undefined)
    return Promise.resolve()
  }

  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    // Giả sử bạn muốn đợi 2 giây trước khi chuyển trạng thái loading trở lại false
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center flex-col">
      <SiNike className="vertical-align: middle" size={50} />
      <section>
        <Form
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          name="registration_form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          style={{ margin: '32px 0' }} // Thêm khoảng cách trên và dưới cho toàn bộ form
        >
          <h1 className="text-2xl font-normal sm:text-3xl">
            Let's make you a Nike member.
          </h1>

          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: 'Please input your user name!',
              },
            ]}
          >
            <Input
              className="border border-black"
              size="large"
              placeholder="User name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              className="border border-black"
              size="large"
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { validator: validatePassword },
            ]}
            extra={
              passwordHelp && (
                <div style={{ color: 'blue' }}>{passwordHelp}</div>
              )
            }
          >
            <Input.Password
              id="password"
              className="border border-black"
              size="large"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please input your confirm password!',
              },
              { validator: validateConfirmPassword },
            ]}
            extra={
              confirmPasswordHelp && (
                <div style={{ color: 'blue' }}>{confirmPasswordHelp}</div>
              )
            }
          >
            <Input.Password
              className="border border-black"
              size="large"
              placeholder="Confirm password"
            />
          </Form.Item>

          {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                justifyContent: 'center',
                marginLeft: 'auto',
              }}
            >
              Create an account
            </Button>
          </div> */}


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
                justifyContent: 'center',
                marginLeft: 'auto',
              }}
              onClick={handleClick}
              loading={loading}
            >
              Create an account
            </Button>
          </div>

        </Form>
      </section>
    </div>
  )
}

export default SignupPage
