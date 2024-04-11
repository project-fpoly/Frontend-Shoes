import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { ISale } from '../../../common/sale';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store.ts';
import { fetchAllSales } from '../../../features/sale';
import { IStateSale } from '../../../common/redux/type.ts';
import { fetchAllProducts } from '../../../features/product/index.ts';
import { IProduct } from '../../../common/products.ts';

type FormSaleProps = {
  onSubmit: (values: ISale) => void;
};

const { Option } = Select;

const FormSale: React.FC<
  ISale & { onSubmit: (values: ISale) => void; mode: string }
> = ({
  name,
  description,
  discount,
  product,
  start_date,
  expiration_date,
  onSubmit,
  mode,
}) => {
    const [form] = Form.useForm();
    const { products } = useSelector((state: RootState) => state.product);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      dispatch(fetchAllSales({ page: 1, limit: 10, keyword: '' }));
      dispatch(fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: '' }));

      // Đặt lại các trường của form về giá trị mặc định khi mode chuyển sang 'create'
      if (mode === 'create') {
        form.resetFields();
      }
    }, [dispatch, form, mode]);

    const handleFormSubmitCreate = (values: ISale) => {
      onSubmit(values);
    };

    return (
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        initialValues={{
          name,
          discount,
          description,
          start_date: dayjs(start_date),
          expiration_date: dayjs(expiration_date),
          product: product || [], // Sử dụng product hoặc một mảng rỗng nếu product không tồn tại

        }}
        onFinish={handleFormSubmitCreate}
      >
        <Form.Item
          label={'Campaign Name'}
          name="name"
          rules={[{ required: true, message: 'Please input Campaign Name' }]}
        >
          <Input />
        </Form.Item>

        {mode === 'create' && (
          <>
            <Form.Item
              label={'Description'}
              name="description"
              rules={[{ required: true, message: 'Please input Description' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label={'Discount'}
              name="discount"
              rules={[{ required: true, message: 'Please input Discount' }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label={'Product'}
              name="product"
              rules={[{ required: true, message: 'Please input Product' }]}

            >
              <Select mode="multiple" placeholder="Please select products">
                {products.map((product: IProduct) => (
                  <Option key={product._id} value={product._id}>
                    {product.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>


            <Form.Item
              label={'Start date'}
              name="start_date"
              rules={[{ required: true, message: 'Please input Start date' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label={'Expiration date'}
              name="expiration_date"
              rules={[{ required: true, message: 'Please input Expiration date' }]}
            >
              <DatePicker />
            </Form.Item>
          </>
        )}
        {mode === 'update' && (
          <>
            <Form.Item
              label={'Description'}
              name="description"
              rules={[{ required: true, message: 'Please input Description' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label={'Discount'}
              name="discount"
              rules={[{ required: true, message: 'Please input Discount' }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label={'Product'}
              name="product"
              rules={[{ required: true, message: 'Please input Product' }]}
            >
              <Select mode="multiple" placeholder="Please select products" defaultValue={[]}>
                {products.map((product: any) => (
                  <Option key={product._id} value={product._id}>
                    {product.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={'Start date'}
              name="start_date"
              rules={[{ required: true, message: 'Please input Start date' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label={'Expiration date'}
              name="expiration_date"
              rules={[{ required: true, message: 'Please input Expiration date' }]}
            >
              <DatePicker />
            </Form.Item>
          </>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };

export default FormSale;
