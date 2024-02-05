import { Button, Form } from "antd";
import { IUsers } from "../../../common/users";
import Input from "antd/es/input/Input";
import PhoneNumberInput from "./InputNumberPhone";
import { useState } from "react";
import AddressInput from "./InputAdress";

const FormUser: React.FC<IUsers & { onSubmit: (values: IUsers) => void }> = ({
  _id,
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
}) => {
  const [form] = Form.useForm();
  const [phone, setPhone] = useState([""]);
  const [Adress, setAdress] = useState([""]);
  const handleFormSubmitCreate = (values: IUsers) => {
    const formattedPhoneNumbers = phone.map((phoneNumber) => ({ phoneNumber }));
    const formattedAdress = Adress.map((address) => ({ address }));
    const updatedValues = { ...values, phoneNumbers: formattedPhoneNumbers,deliveryAddress:formattedAdress };
    onSubmit(updatedValues);
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
        _id,
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
      <Form.Item
        label={"deliveryAddress"}
        name="deliveryAddress"
        rules={[{ required: true, message: "pls input deliveryAddress" }]}
      >
        <AddressInput value={deliveryAddress} onChange={setAdress}/>
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
        <PhoneNumberInput value={phoneNumbers} onChange={setPhone} />
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
export default FormUser;
