import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { SiNike } from 'react-icons/si';

const { Option } = Select;

const SignupPage = () => {
  const [passwordHelp, setPasswordHelp] = useState<string | undefined>(undefined);

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  const validatePassword = (_: any, value: string) => {
    if (value.length < 8) {
      setPasswordHelp('Password must be at least 8 characters, include uppercase, lowercase, and a number.');
      return Promise.reject('');
    }

    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
      setPasswordHelp('Password must be at least 8 characters, include uppercase, lowercase, and a number.');
      return Promise.reject('');
    }

    setPasswordHelp(undefined);
    return Promise.resolve();
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
          <h1 className="text-2xl font-normal sm:text-3xl">Let's make you a Nike member.</h1>

          <Form.Item
            name="coded"
            rules={[
              {
                required: true,
                message: 'Please input your coded!',
              },
            ]}
          >
            <Input className="border border-black" size="large" placeholder="Coded" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input className="border border-black" size="large" placeholder="E-mail" />
          </Form.Item>


          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
              style={{ width: '48%', marginBottom: 0 }}
            >
              <Input className="border border-black" size="large" placeholder="First Name" />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
              style={{ width: '48%' }}
            >
              <Input className="border border-black" size="large" placeholder="Last Name" />
            </Form.Item>
          </div>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { validator: validatePassword },
            ]}
            extra={passwordHelp && <div style={{ color: 'blue' }}>{passwordHelp}</div>}
          >
            <Input.Password className="border border-black" size="large" placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="purchasingPreference"
            rules={[
              { required: true, message: 'Please select your purchasing preference!' }
            ]}
          >
            <Select size="large" placeholder="Purchasing Preference">
              <Option value="online">Man</Option>
              <Option value="in-store">For women</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dob"
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker className="border border-black" size="large" placeholder="Date of Birth" />
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
                justifyContent: 'center',
                marginLeft: 'auto',
              }}
              variant="outlined"
            >
              Create an account
            </Button>
          </div>
        </Form>
      </section>
    </div >
  );
};

export default SignupPage;
