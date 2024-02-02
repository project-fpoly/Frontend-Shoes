import { Button, Form } from "antd";
import { IUsers } from "../../../common/users";
import Input from "antd/es/input/Input";

const FormUser: React.FC<IUsers & { onSubmit: (values: IUsers) => void }&{setIsModalOpen:boolean}> = ({
    _id,
    userName,
    password,
    deliveryAddress,
    email,
    role,
    onSubmit,
    setIsModalOpen,
    phoneNumbers,
    avt,
    dateOfBirth,
    gender
}) => {
    const [form] = Form.useForm();
    const handleFormSubmitCreate = (values: IUsers) => {
        console.log(values);
        
        onSubmit(values);
    };

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            autoComplete="off"
            initialValues={{_id,userName, password, role, deliveryAddress, email,phoneNumbers,avt,dateOfBirth,gender}}
            onFinish={handleFormSubmitCreate}
        >
            <Form.Item
                label={"userName"}
                name="userName"
                rules={[
                    {required: true, message: "pls input Full Name"},
                ]}
            >
                <Input defaultValue={userName}/>
            </Form.Item>
            
            <Form.Item
                style={{textAlign: "right"}}
                wrapperCol={{offset: 8, span: 16}}
            >
                <Button onClick={() => setIsModalOpen(false)}>cancel</Button>
                <Button style={{marginLeft: "5px"}} type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};
export default FormUser