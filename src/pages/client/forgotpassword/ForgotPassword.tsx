import { Button, Modal, FormItemProps, Form, Input, message } from 'antd';
import { createContext, useContext, useState } from 'react'
import IUser from '../../../types/user';
import { useNavigate } from 'react-router-dom';
import { ForgotPass } from '../../../services/auth';
const MyFormItemContext = createContext<(string | number)[]>([]);

function toArr(str: string | number | (string | number)[]): (string | number)[] {
    return Array.isArray(str) ? str : [str];
}
const MyFormItem = ({ name, ...props }: FormItemProps) => {
    const prefixPath = useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};
const ForgotPassword = () => {
    const [isVerified] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    const showModalForgot = () => {
        setIsModalOpen(true);
    };

    const handleOkForgot = () => {
        setIsModalOpen(false);
    };

    const handleCancelForgot = () => {
        setIsModalOpen(false);
    };
    const onFinish = async (value: IUser) => {
        if (isVerified == true) {
            const key = 'loading'
            if (value) {
                try {
                    const loading = await message.loading({ content: 'loading!', key, duration: 2 })
                    if (loading) {
                        const response = await ForgotPass(value);
                        if (response) {
                            message.success('successfully forgotpassword', 3);
                            navigate('/')
                        }
                    }
                } catch (error) {
                    message.error('forgotpassword failed', 5);
                }
            }
        }
    };
    return (
        <>
            <p className='text-[14px]' onClick={showModalForgot}>
                Forgot password
            </p>
            <Modal footer={null} open={isModalOpen} onOk={handleOkForgot} onCancel={handleCancelForgot}>
                <Form className="mt-[30px] w-[400px] mx-auto" name="form_item_path" layout="vertical" onFinish={onFinish} autoComplete="off">
                    <h1 className="text-center mt-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Forgot Password
                    </h1>
                    <MyFormItem className='text-black font-bold'
                        name="email"
                        label="Email"
                        rules={[
                            {
                                message: 'vui lòng nhập email!',
                                required: true,
                                type: 'email'
                            },
                        ]}
                    >
                        <Input className='border font-mono border-indigo-600 h-10' placeholder="nhập email" />
                    </MyFormItem>

                    <Button
                        htmlType="submit"
                        className="w-full h-[52px] text-center py-3 rounded bg-[#4a71c4] text-white hover:bg-green-dark focus:outline-none my-1"
                    >
                        Forgot password
                    </Button>
                </Form>

            </Modal>
        </>
    )
}

export default ForgotPassword