/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { Button, Form, Input, Select } from "antd";
import { updateManyOrders } from "../../../features/order";
import React from "react";
import { AppDispatch } from "../../../redux/store";

const FormUpdateMany = ({
  selectedRowKeys,
  setIsModalOpen,
}: {
  selectedRowKeys: any;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const handleFormSubmit = (formValues: any) => {
    console.log(formValues);
    dispatch(updateManyOrders(formValues));
    console.log(selectedRowKeys);
    setIsModalOpen(false);
  };
  const isPaid = false;
  const isDelivered = "Chờ xác nhận";
  const ids = selectedRowKeys;
  React.useEffect(() => {
    form.setFieldsValue({
      ids,
      isPaid,
      isDelivered,
    });
  }, [form, ids, isPaid, isDelivered]);

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      onFinish={handleFormSubmit}
    >
      <Form.Item
        label="Ids"
        name="ids"
        rules={[
          { required: true, message: "Vui lòng nhập trạng thái thanh toán" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Is Paid"
        name="isPaid"
        rules={[
          { required: true, message: "Vui lòng nhập trạng thái thanh toán" },
        ]}
      >
        <Select placeholder="is Paid">
          <Select.Option value={false}>Chưa thanh toán</Select.Option>
          <Select.Option value={true}>Đã thanh toán</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Is Delivered"
        name="isDelivered"
        rules={[
          { required: true, message: "Vui lòng nhập trạng thái thanh toán" },
        ]}
      >
        <Select placeholder="is Delevered">
          <Select.Option value="Chờ xác nhận">Chờ xác nhận</Select.Option>
          <Select.Option value="Chờ lấy hàng">Chờ lấy hàng</Select.Option>
          <Select.Option value="Đang giao hàng">Đang giao hàng</Select.Option>
          <Select.Option value="Đã giao hàng">Đã giao hàng</Select.Option>
          <Select.Option value="Đã huỷ">Đã huỷ</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button className="hover:bg-red-600 hover:!text-white">Cancel</Button>
        <Button
          style={{ marginLeft: "5px" }}
          type="default"
          className="hover:bg-blue-600 hover:!text-white"
          htmlType="submit"
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormUpdateMany;
