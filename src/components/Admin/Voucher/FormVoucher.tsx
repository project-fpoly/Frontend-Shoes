// import React, { useState } from 'react';
// import { Button, Form, Input } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import { IVoucher } from '../../../common/voucher';
//
// const FormVoucher: React.FC<{ onSubmit: (values: IVoucher) => void; mode: 'create' | 'update' }> = ({ onSubmit, mode }) => {
//     const [form] = Form.useForm();
//     const [showUploadButton, setShowUploadButton] = useState<boolean>(mode === 'create');
//
//     const handleFormSubmit = (values: IVoucher) => {
//         onSubmit(values);
//     };
//
//     const uploadButton = (
//         <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//         </div>
//     );
//
//     const handleRemoveImage = () => {
//         setShowUploadButton(true);
//     };
//
//     return (
//         <Form
//             form={form}
//             name="basic"
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 16 }}
//             style={{ maxWidth: 600 }}
//             autoComplete="off"
//             initialValues={{
//                 codeName: '',
//                 quantity: '',
//                 reduced_amount: '',
//                 description: '',
//                 expiration_date: '',
//                 create_date: '',
//                 create_by: '',
//             }}
//             onFinish={handleFormSubmit}
//         >
//             <Form.Item
//                 label="Code Name"
//                 name="codeName"
//                 rules={[{ required: true, message: 'Please input Code Name' }]}
//             >
//                 <Input />
//             </Form.Item>
//
//             {/* Add other form items based on your requirements */}
//             {mode === 'create' && (
//                 <>
//                     <Form.Item
//                         label="Reduced amount"
//                         name="code"
//                         rules={[{ required: true, message: 'Please input Code' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//
//                     <Form.Item
//                         label="Quantity"
//                         name="quantity"
//                         rules={[{ required: true, message: 'Please input Quantity' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         label="Price order"
//                         name="quantity"
//                         rules={[{ required: true, message: 'Please input Quantity' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//
//                     <Form.Item
//                         label="Expiration date"
//                         name="quantity"
//                         rules={[{ required: true, message: 'Please input Quantity' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//
//
//                     {/* Add other form items as needed */}
//                 </>
//             )}
//
//             <Form.Item
//                 label="Description"
//                 name="description"
//                 rules={[{ required: true, message: 'Please input Description' }]}
//             >
//                 <Input.TextArea />
//             </Form.Item>
//
//
//
//
//
//             <Form.Item
//                 style={{ textAlign: 'right' }}
//                 wrapperCol={{ offset: 8, span: 16 }}
//             >
//                 <Button onClick={() => form.resetFields()}>Cancel</Button>
//                 <Button style={{ marginLeft: 5 }} type="primary" htmlType="submit">
//                     Save
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// };
//
// export default FormVoucher;


import React, { useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IVoucher } from '../../../common/voucher';

const FormVoucher: React.FC<{ onSubmit: (values: IVoucher) => void; mode: 'create' | 'update' }> = ({ onSubmit, mode }) => {
    const [form] = Form.useForm();

    const handleFormSubmit = (values: IVoucher) => {
        onSubmit(values);
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
                codeName: '',
                code: '',
                quantity: 0,
                reduced_amount: 0,
                description: '',
                expiration_date: '',
                create_date: '',
                create_by: '',
            }}
            onFinish={handleFormSubmit}
        >
            <Form.Item
                label="Code Name"
                name="codeName"
                rules={[{ required: true, message: 'Please input Code Name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Reduced Amount"
                name="reduced_amount"
                rules={[{ required: true, message: 'Please input Reduced Amount' }]}
            >
                <InputNumber min={0} />
            </Form.Item>

            <Form.Item
                label="Price order"
                name="codeName"
                rules={[{ required: true, message: 'Please input Code Name' }]}
            >
                <Input />
            </Form.Item>



            <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: 'Please input Quantity' }]}
            >
                <InputNumber min={0} />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input Description' }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Expiration date"
                name="codeName"
                rules={[{ required: true, message: 'Please input Code Name' }]}
            >
                <Input />
            </Form.Item>

            {/* Add other form items based on your requirements */}
            {/* For example: */}
            {/* <Form.Item
                label="Expiration Date"
                name="expiration_date"
                rules={[{ required: true, message: 'Please input Expiration Date' }]}
            >
                <DatePicker />
            </Form.Item> */}

            <Form.Item
                style={{ textAlign: 'right' }}
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Button onClick={() => form.resetFields()}>Cancel</Button>
                <Button style={{ marginLeft: 5, background: 'black', color: 'white' }} type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormVoucher;

