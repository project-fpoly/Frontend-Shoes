import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

interface AddressInputProps {
  onChange: (updatedAddresses: { address: string }[]) => void;
  value: { address: string }[];
}

const AddressInput: React.FC<AddressInputProps> = ({ onChange, value }) => {
  const MAX_ADDRESSES = 3;

  const handleAddAddress = () => {
    if (value.length < MAX_ADDRESSES) {
      onChange([...value, { address: "" }]);
    }
  };

  const handleAddressChange = (index: number, newValue: string) => {
    const updatedAddresses = [...value];
    updatedAddresses[index] = { address: newValue };
    onChange(updatedAddresses);
  };

  return (
    <Form>
      {value.map((addressObj, index) => (
        <Form.Item
          key={index}
          label={`Address ${index + 1}`}
          rules={[
            { required: true, message: "Please input address" },
          ]}
        >
          <Input
            value={addressObj.address}
            onChange={(e) => handleAddressChange(index, e.target.value)}
          />
        </Form.Item>
      ))}
      {value.length < MAX_ADDRESSES && (
        <Form.Item>
          <Button type="dashed" onClick={handleAddAddress} icon={<PlusOutlined />}>
            Add Address
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default AddressInput;
