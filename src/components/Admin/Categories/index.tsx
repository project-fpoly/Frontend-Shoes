import { Button, Form, Input, Select } from "antd";
import { ICategory } from "../../../common/category";

const { Option } = Select;

const FormCategory: React.FC<ICategory & { onSubmit: (values: ICategory) => void; mode: string }> = ({
  name,
  description,
  onSubmit,
  imageUrl,
  status,
  viewCount,
  mode
}) => {
  const [form] = Form.useForm();

  const handleFormSubmitCreate = (values: ICategory) => {
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
        name,
        description,
        imageUrl,
        status,
        viewCount,
      }}
      onFinish={handleFormSubmitCreate}
    >
      <Form.Item
        label={"Name"}
        name="name"
        rules={[{ required: true, message: "Please input the name of the category" }]}
      >
        <Input defaultValue={name} />
      </Form.Item>
      {mode === "update" && (
        <>
          <Form.Item
            label={"Description"}
            name="description"
            rules={[{ required: false, message: "Please input the description" }]}
          >
            <Input defaultValue={description} />
          </Form.Item>

          <Form.Item
            label={"Image URL"}
            name="imageUrl"
            rules={[{ required: false, message: "Please input the image URL" }]}
          >
            <Input defaultValue={imageUrl} />
          </Form.Item>

          <Form.Item
            label={"Status"}
            name="status"
            rules={[{ required: false, message: "Please select the status" }]}
            initialValue="active" 
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={"View Count"}
            name="viewCount"
            rules={[{ required: false, message: "Please input the view count" }]}
          >
            <Input defaultValue={viewCount} />
          </Form.Item>
        </>
      )}
      <Form.Item style={{ textAlign: "right" }} wrapperCol={{ offset: 8, span: 16 }}>
        <Button>Cancel</Button>
        <Button style={{ marginLeft: "5px" }} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormCategory;