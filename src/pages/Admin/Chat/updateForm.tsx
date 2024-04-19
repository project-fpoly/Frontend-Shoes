import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;

const UpdateSettingsForm = ({ initialValues, onSubmit }: any) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        setLoading(true);
        onSubmit(values)
            .then(() => {
                form.resetFields();
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: '400px', margin: '0 auto' }}
        >
            <Form.Item
                label="OpenAI Endpoint"
                name="openAiEndpoint"
                rules={[{ required: true, message: 'Please input OpenAI Endpoint!' }]}
            >
                <TextArea showCount rows={4} placeholder="Enter OpenAI Endpoint" />
            </Form.Item>

            <Form.Item
                label="ChatGPT Key"
                name="chatGPTKey"
                rules={[{ required: true, message: 'Please input ChatGPT Key!' }]}
            >
                <Input showCount placeholder="Enter ChatGPT Key" />
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                    Unlock
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateSettingsForm;
