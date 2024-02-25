import { useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import axios, {AxiosError} from "axios";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import { SiNike } from "react-icons/si";
import React from "react";


const Password = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const email = useSelector(state => state.auth.username) || params.get('email');
    const handleSubmit = async (values: {password: string}) => {
        try {
            const response = await axios.post('http://localhost:9000/api/auth/signin', {
                email,
                password: values.password
            });
            if (response && response.status === 200) {
                alert(response.data.accessToken);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('email', email);
                alert('Login successfully');
                //redirect to signup page
                navigate('/');
            }
        } catch (e: any) {
            e.response.data.message && alert(e.response.data.message);
            // navigate('/signup');
            console.log(e);
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
                        <h1 className="text-2xl font-normal sm:text-4xl">Enter password for email: {email}</h1>

                        <Form.Item
                            className="text-black font-bold"
                            name="password"
                            rules={[
                                {
                                    message: "Mandatory!",
                                    required: true,
                                    type: "password",
                                },
                            ]}
                        >
                            {/*<Input*/}
                            {/*    type="password" name="password"*/}
                            {/*    className="font-medium border h-10 hover:border-blue-500 focus:border-blue-500"*/}
                            {/*    style={{ borderColor: 'gray' }}*/}
                            {/*    placeholder="Password"*/}
                            {/*/>*/}
                            <Input.Password className="border border-black" size="large" placeholder="Password"/>


                        </Form.Item>
                        <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                            <span
                                tabIndex={0}
                                role="link"
                                aria-label="Sign up here"
                                className="text-sm font-medium leading-none text-gray-800"
                            >
                {" "}
                                <Link to="/forgotpassword">Forgot Password?</Link>
                                <div style={{marginTop: "5px", textDecorationLine: "none"}}>
                                    Don't have an account? <Link to="/signup">Sign up here</Link>
                                </div>
              </span>
                        </p>


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
                                // onMouseEnter={handleMouseEnter}
                                // onMouseLeave={handleMouseLeave}
                            >
                                Continue
                            </Button>
                        </div>

                    </Form>
                </section>

            </div>

        </div>


    );
}

export default Password;