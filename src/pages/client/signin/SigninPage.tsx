import { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import IUser, { LoginResponse } from "../../../types/user";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios, { AxiosResponse } from "axios";
import { Signin } from "../../../services/auth";
import ForgotPassword from "../forgotpassword/ForgotPassword";
import { SiNike } from "react-icons/si";


const SigninPage = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const navigate = useNavigate();
  // const onFinish = async (value: string) => {
  const onFinish = async (values: { email: string }) => {
    console.log(values);
    try {
      const response = await axios.post('http://localhost:4000/signup', { email: values.email });
      if (response) {
        //redirect to signup page
        navigate('/signup');
      }
      setIsVerified(true);
    } catch (error) {
      console.log(error);
    }
    if (isVerified == true) {
      const key = "loading";
      if (values) {
        try {
          const loading = await message.loading({
            content: "đang xử lý!",
            key,
            duration: 2,
          });
          if (loading) {
            const response: AxiosResponse<LoginResponse> = await signin(values);
            if (response) {
              const data: any = response;
              localStorage.setItem("accessToken", data.accessToken);
              localStorage.setItem("refreshToken", data.refreshToken);
              localStorage.setItem("user", JSON.stringify(data.user));
              message.success(data.message, 3);
              navigate("/");
            }
          }
        } catch (error: any) {
          message.error(error.response.data.message, 5);
        }
      }
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
            onFinish={onFinish}
            autoComplete="off"
          >
            <h1 className="text-2xl font-normal sm:text-4xl">Enter your email address to join or log in.</h1>

            <p className="text-sm mt-4 font-medium leading-none text-gray-500">
              Don't have account?{" "}
              <span
                tabIndex={0}
                role="link"
                aria-label="Sign up here"
                className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
              >
                {" "}
                <Link to="/signup">Sign up here</Link>
              </span>
            </p>



            <Form.Item
              className="text-black font-bold"
              name="email"
              rules={[
                {
                  message: "Mandatory!",
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input
                className="font-medium border h-10 hover:border-blue-500 focus:border-blue-500"
                style={{ borderColor: 'gray' }}
                placeholder="E-mail"
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
                variant="outlined"
              >
                Continue
              </Button>
            </div>
            {/* <div>
            <ForgotPassword />
          </div> */}
          </Form>
        </section>


      </div>
    </div>




  );
};

export default SigninPage;

