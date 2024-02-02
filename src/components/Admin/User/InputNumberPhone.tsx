import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

interface PhoneNumberInputProps {
  onChange: (updatedPhoneNumbers: string[]) => void;
  value: string[];
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ onChange, value }) => {
  const MAX_PHONE_NUMBERS = 3;

  const handleAddPhoneNumber = () => {
    if (value.length < MAX_PHONE_NUMBERS) {
      onChange([...value, ""]);
    }
  };

  const handlePhoneNumberChange = (index: number, newValue: string) => {
    const updatedPhoneNumbers = [...value];
    updatedPhoneNumbers[index] = newValue;
    onChange(updatedPhoneNumbers);
  };

  return (
    <Form>
      {value.map((phoneNumber, index) => (
        <Form.Item
          key={index}
          label={`Phone Number ${index + 1}`}
          rules={[
            { required: true, message: "Please input phone number" },
          ]}
        >
          <Input
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
          />
        </Form.Item>
      ))}
      {value.length < MAX_PHONE_NUMBERS && (
        <Form.Item>
          <Button type="dashed" onClick={handleAddPhoneNumber} icon={<PlusOutlined />}>
            Add Phone Number
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default PhoneNumberInput;
