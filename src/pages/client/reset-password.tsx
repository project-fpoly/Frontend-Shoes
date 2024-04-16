import { Button, Form, Input, notification } from 'antd';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SiNike } from 'react-icons/si';
import { useState } from 'react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [passwordHelp, setPasswordHelp] = useState<string | undefined>(undefined);
  const [confirmPasswordHelp, setConfirmPasswordHelp] = useState<string | undefined>(undefined);

  const validatePassword = (_: any, value: string) => {
    if (value.length < 8 || !/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
      setPasswordHelp('Password must be at least 8 characters, include uppercase, lowercase, and a number.');
      return Promise.reject('');
    }

    setPasswordHelp(undefined);
    return Promise.resolve();
  };

  const validateConfirmPassword = (_: any, value: string) => {
    if (value.trim() !== (document.getElementById('password') as HTMLInputElement)?.value?.trim()) {
      setConfirmPasswordHelp('Confirm password does not match password.');
      return Promise.reject('');
    }

    setConfirmPasswordHelp(undefined);
    return Promise.resolve();
  };

  const handleSubmit = async (values: any) => {
    const email = params.get('email');
    const token = params.get('token');

    if (email && token) {
      try {
        const response = await axios.post(
          'http://localhost:9000/api/auth/reset-password',
          {
            email,
            token,
            newPassword: values.password,
          },
        );

        if (response && response.status === 200) {
          response.data.message && notification.success({
            message: response.data.message,
          });
          navigate('/signin');
        } else {
          response.data.error && notification.error({
            message: 'Error',
            description: response.data.error,
          });
        }
      } catch (e: any) {
        console.log('err', e);
        notification.error({
          message: 'Error',
          description: e.response ? e.response.data.message : 'An error occurred.',
        });
      }
    } else {
      notification.error({
        message: 'Error',
        description: 'Missing email or token from URL!',
      });
    }
  };

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
              Enter your new password.
            </h1>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { validator: validatePassword },
              ]}
              extra={passwordHelp && <div style={{ color: 'blue' }}>{passwordHelp}</div>}
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
                { required: true, message: 'Please input your confirm password!' },
                { validator: validateConfirmPassword },
              ]}
              extra={confirmPasswordHelp && <div style={{ color: 'blue' }}>{confirmPasswordHelp}</div>}
            >
              <Input.Password
                className="border border-black"
                size="large"
                placeholder="Confirm password"
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
  );
};

export default ResetPassword;
