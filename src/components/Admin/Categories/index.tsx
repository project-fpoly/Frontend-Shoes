import { Button, Form } from "antd";
import { IUsers } from "../../../common/users";
import Input from "antd/es/input/Input";


const FormCategory: React.FC<
  IUsers & { onSubmit: (values: IUsers) => void; mode: string }
> = ({
  userName,
  password,
  deliveryAddress,
  email,
  role,
  onSubmit,
  phoneNumbers,
  avt,
  dateOfBirth,
  gender,
  mode,
}) => {
  const [form] = Form.useForm();
  const handleFormSubmitCreate = (values: IUsers) => {
    onSubmit(values);
    console.log(values);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{
        userName,
        password,
        role,
        deliveryAddress,
        email,
        phoneNumbers,
        avt,
        dateOfBirth,
        gender,
      }}
      onFinish={handleFormSubmitCreate}
    >
      <Form.Item
        label={"userName"}
        name="userName"
        rules={[{ required: true, message: "pls input Full Name" }]}
      >
        <Input defaultValue={userName} />
      </Form.Item>
      {mode === "create" && (
        <>
          <Form.Item
            label={"email"}
            name="email"
            rules={[{ required: true, message: "pls input Email" }]}
          >
            <Input defaultValue={email} />
          </Form.Item>

          <Form.Item
            label={"password"}
            name="password"
            rules={[{ required: true, message: "pls input password" }]}
          >
            <Input defaultValue={password} />
          </Form.Item>

          <Form.Item
            label={"role"}
            name="role"
            rules={[{ required: true, message: "pls input role" }]}
          >
            <Input defaultValue={role} />
          </Form.Item>
        </>
      )}
      <Form.Item
        label={"deliveryAddress"}
        name="deliveryAddress"
        rules={[{ required: true, message: "pls input deliveryAddress" }]}
      >
        <Input defaultValue={deliveryAddress} />
      </Form.Item>
      <Form.Item
        label={"gender"}
        name="gender"
        rules={[{ required: true, message: "pls input gender" }]}
      >
        <Input defaultValue={gender} />
      </Form.Item>
      <Form.Item
        label={"dateOfBirth"}
        name="dateOfBirth"
        rules={[{ required: true, message: "pls input dateOfBirth" }]}
      >
        <Input defaultValue={dateOfBirth} />
      </Form.Item>
      <Form.Item
        label={"avt"}
        name="avt"
        rules={[{ required: true, message: "pls input avt" }]}
      >
        <Input defaultValue={avt} />
      </Form.Item>
      <Form.Item
        label={"phoneNumbers"}
        name="phoneNumbers"
        rules={[{ required: true, message: "pls input phoneNumbers" }]}
      >
        <Input defaultValue={phoneNumbers} />
      </Form.Item>

      <Form.Item
        style={{ textAlign: "right" }}
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button>cancel</Button>
        <Button style={{ marginLeft: "5px" }} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormCategory;
