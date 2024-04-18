import { ConfigProvider, FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const AccoutDetails = () => {
  const user = useSelector((state: any) => state.auth.user)
  console.log(user);


  return (
    <>

      <ConfigProvider
        theme={{
          token: {
          },
        }}
      >
        <p className="text-3xl">Account Details</p>
        <Form
          className='flex flex-col items-start mt-10'
          name="basic"
          wrapperCol={{ span: 16 }}
          initialValues={user?.email}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="email"
          >
            <div className='flex flex-col gap-2'>
              <label className='mb-5 text-2xl' htmlFor="">Email</label>
              <Input defaultValue={user?.email} className='w-[400px] h-9 hover:border-black focus:border-black ' />
            </div>
          </Form.Item>
          <Form.Item<FieldType>
            name="password"
          >
            <div className='flex flex-col gap-2'>
              <label className='mb-5 text-2xl' htmlFor="">Password</label>
              <Input className='w-[400px] h-9 hover:border-black focus:border-black ' />
            </div>
          </Form.Item>

          <Form.Item >
            <button className='border-gray hover:border-black border p-1 rounded-lg' type="submit">
              Submit
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider >


    </>
  )

}

export default AccoutDetails