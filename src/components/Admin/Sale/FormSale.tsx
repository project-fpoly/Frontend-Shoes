// // import React, { useEffect } from "react";
// // import { Form, Input, Button, DatePicker } from "antd";
// // import { ISale } from "../../../common/sale";
// // import dayjs from "dayjs";
// // // import { useDispatch, useSelector } from "react-redux";
// // import {useDispatch, useSelector} from "react-redux";
// // import { AppDispatch } from "../../../redux/store";
// // import { fetchAllSales } from "../../../features/sale";
// // import { IStateSale } from "../../../common/redux/type";

// // // type FormSaleProps = {
// // //   onSubmit: (values: ISale) => void; mode: string
// // // };

// // const FormSale: React.FC<
// //   ISale & { onSubmit: (values: ISale) => void; mode: string }
// // > = ({ name, onSubmit, discount, quantity, description, expiration_date, start_date, mode }) => {
// //   const [form] = Form.useForm();

// //   const handleFormSubmitCreate = (values: ISale) => {
// //     // onSubmit(values as ISale);
// //     onSubmit(values);
// //     console.log(values)
// //   };

// //   const dispatch = useDispatch<AppDispatch>();
// //   useEffect(() => {
// //     dispatch(fetchAllSales({ page: 1, limit: 10, keyword: "" }));
// //   }, [dispatch]);
// //   const { sales } = useSelector(
// //     (state: IStateSale) => state.sale
// //   );

// //   return (
// //     <Form
// //       form={form}
// //       name="basic"
// //       labelCol={{ span: 8 }}
// //       wrapperCol={{ span: 16 }}
// //       autoComplete="off"
// //       initialValues={{
// //         name,
// //         discount,
// //         quantity,
// //         description,
// //         expiration_date: dayjs(expiration_date, "YYYY-MM-DD"),
// //         start_date: dayjs(start_date, "YYYY-MM-DD"),
// //       }}
// //       onFinish={handleFormSubmitCreate}
// //     >
// //       <Form.Item
// //         label={"Campaign Name"}
// //         name="name"
// //         rules={[{ required: true, message: "Please input Campaign Name" }]}
// //       >
// //         <Input defaultValue={name} />
// //       </Form.Item>

// //       {mode === "create" && (
// //         <>
// //           <Form.Item
// //             label={"Discount"}
// //             name="discount"
// //             rules={[
// //               { required: true, message: "Please input Discount" }
// //             ]}
// //           >
// //             <Input defaultValue={discount} />
// //           </Form.Item>

// //           <Form.Item
// //             label={"Quantity"}
// //             name="quantity"
// //             rules={[
// //               { required: true, message: "Please input Quantity" }
// //             ]}
// //           >
// //             <Input defaultValue={quantity} />
// //           </Form.Item>

// //           <Form.Item
// //             label={"Description"}
// //             name="description"
// //             rules={[{ required: true, message: "Please input Description" }]}
// //           >
// //             <Input.TextArea defaultValue={description} />
// //           </Form.Item>

// //           {/* <Form.Item
// //               label={"Product"}
// //               name="product"
// //               rules={[{ required: true, message: "Please input Product" }]}
// //           >
// //             <Input defaultValue={product} />
// //           </Form.Item> */}

// //           <Form.Item
// //             label={"Expiration date"}
// //             rules={[{ required: true, message: "Please input Expiration date" }]}
// //           >
// //             <DatePicker defaultValue={dayjs(expiration_date, "YYYY-MM-DD")} />
// //           </Form.Item>

// //           <Form.Item
// //             label={"Start date"}
// //             rules={[{ required: true, message: "Please input Start date" }]}
// //           >
// //             <DatePicker defaultValue={dayjs(start_date, "YYYY-MM-DD")} />
// //           </Form.Item>
// //         </>
// //       )}
// //       {mode === "update" && (
// //         <>
// //           <Form.Item
// //             label={"Discount"}
// //             name="discount"
// //             rules={[
// //               { required: true, message: "Please input Discount" }
// //             ]}
// //           >
// //             <Input defaultValue={discount} />
// //           </Form.Item>

// //           <Form.Item
// //             label={"Quantity"}
// //             name="quantity"
// //             rules={[
// //               { required: true, message: "Please input Quantity" }
// //             ]}
// //           >
// //             <Input defaultValue={quantity} />
// //           </Form.Item>

// //           <Form.Item
// //             label={"Description"}
// //             name="description"
// //             rules={[{ required: true, message: "Please input Description" }]}
// //           >
// //             <Input.TextArea defaultValue={description} />
// //           </Form.Item>

// //           {/* <Form.Item
// //               label={"Product"}
// //               name="product"
// //               rules={[{ required: true, message: "Please input Product" }]}
// //           >
// //             <Input defaultValue={product} />
// //           </Form.Item> */}

// //           <Form.Item
// //             label={"Expiration date"}
// //             rules={[{ required: true, message: "Please input Expiration date" }]}
// //           >
// //             <DatePicker defaultValue={dayjs(expiration_date, "YYYY-MM-DD")} />
// //           </Form.Item>

// //           <Form.Item
// //             label={"Start date"}
// //             rules={[{ required: true, message: "Please input Start date" }]}
// //           >
// //             <DatePicker defaultValue={dayjs(start_date, "YYYY-MM-DD")} />
// //           </Form.Item>
// //         </>
// //       )}

// //       <Form.Item
// //         style={{ textAlign: 'right' }}
// //         wrapperCol={{ offset: 8, span: 16 }}
// //       >
// //         <Button>Cancel</Button>
// //         <Button style={{ marginLeft: '5px' }} type="primary" htmlType="submit">
// //           Save
// //         </Button>
// //       </Form.Item>
// //     </Form>
// //   );
// // };

// // export default FormSale;

// import React, { useEffect } from "react";
// import { Form, Input, Button, DatePicker } from "antd";
// import { ISale } from "../../../common/sale";
// import dayjs from "dayjs";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "../../../redux/store";
// import { fetchAllSales } from "../../../features/sale";
// import { IStateSale } from "../../../common/redux/type";

// // type FormSaleProps = {
// //   onSubmit: (values: ISale) => void; mode: string
// // };

// const FormSale: React.FC<
//   ISale & { onSubmit: (values: ISale) => void; mode: string }
// > = ({ name, onSubmit, discount, quantity, description, expiration_date, start_date, mode }) => {
//   const [form] = Form.useForm();

//   const handleFormSubmitCreate = (values: ISale) => {
//     // onSubmit(values as ISale);
//     onSubmit(values);
//     console.log(values)
//   };

//   const dispatch = useDispatch<AppDispatch>();
//   useEffect(() => {
//     dispatch(fetchAllSales({ page: 1, limit: 10, keyword: "" }));
//   }, [dispatch]);
//   const { sales } = useSelector(
//     (state: IStateSale) => state.sale
//   );

//   return (
//     <Form
//       form={form}
//       name="basic"
//       labelCol={{ span: 8 }}
//       wrapperCol={{ span: 16 }}
//       autoComplete="off"
//       initialValues={{
//         name,
//         discount,
//         quantity,
//         description,
//         expiration_date: dayjs(expiration_date, "YYYY-MM-DD"),
//         start_date: dayjs(start_date, "YYYY-MM-DD"),
//       }}
//       onFinish={handleFormSubmitCreate}
//     >
//       <Form.Item
//         label={"Campaign Name"}
//         name="name"
//         rules={[{ required: true, message: "Please input Campaign Name" }]}
//       >
//         <Input defaultValue={name} />
//       </Form.Item>

//       {mode === "create" && (
//         <>
//           <Form.Item
//             label={"Discount"}
//             name="discount"
//             rules={[
//               { required: true, message: "Please input Discount" }
//             ]}
//           >
//             <Input defaultValue={discount} />
//           </Form.Item>

//           <Form.Item
//             label={"Quantity"}
//             name="quantity"
//             rules={[
//               { required: true, message: "Please input Quantity" }
//             ]}
//           >
//             <Input defaultValue={quantity} />
//           </Form.Item>

//           <Form.Item
//             label={"Description"}
//             name="description"
//             rules={[{ required: true, message: "Please input Description" }]}
//           >
//             <Input.TextArea defaultValue={description} />
//           </Form.Item>



//           <Form.Item
//             label={"Expiration date"}
//             rules={[{ required: true, message: "Please input Expiration date" }]}
//           >
//             <DatePicker defaultValue={dayjs(expiration_date, "YYYY-MM-DD")} />
//           </Form.Item>

//           <Form.Item
//             label={"Start date"}
//             rules={[{ required: true, message: "Please input Start date" }]}
//           >
//             <DatePicker defaultValue={dayjs(start_date, "YYYY-MM-DD")} />
//           </Form.Item>
//         </>
//       )}
//       {mode === "update" && (
//         <>
//           <Form.Item
//             label={"Discount"}
//             name="discount"
//             rules={[
//               { required: true, message: "Please input Discount" }
//             ]}
//           >
//             <Input defaultValue={discount} />
//           </Form.Item>

//           <Form.Item
//             label={"Quantity"}
//             name="quantity"
//             rules={[
//               { required: true, message: "Please input Quantity" }
//             ]}
//           >
//             <Input defaultValue={quantity} />
//           </Form.Item>

//           <Form.Item
//             label={"Description"}
//             name="description"
//             rules={[{ required: true, message: "Please input Description" }]}
//           >
//             <Input.TextArea defaultValue={description} />
//           </Form.Item>



//           <Form.Item
//             label={"Expiration date"}
//             rules={[{ required: true, message: "Please input Expiration date" }]}
//           >
//             <DatePicker defaultValue={dayjs(expiration_date, "YYYY-MM-DD")} />
//           </Form.Item>

//           <Form.Item
//             label={"Start date"}
//             rules={[{ required: true, message: "Please input Start date" }]}
//           >
//             <DatePicker defaultValue={dayjs(start_date, "YYYY-MM-DD")} />
//           </Form.Item>
//         </>
//       )}

//       <Form.Item
//         style={{ textAlign: 'right' }}
//         wrapperCol={{ offset: 8, span: 16 }}
//       >
//         <Button>Cancel</Button>
//         <Button style={{ marginLeft: '5px' }} type="primary" htmlType="submit">
//           Save
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default FormSale;



import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { ISale } from "../../../common/sale";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchAllSales } from "../../../features/sale";
import { IStateSale } from "../../../common/redux/type";

// type FormSaleProps = {
//   onSubmit: (values: ISale) => void; mode: string
// };

const FormSale: React.FC<
  ISale & { onSubmit: (values: ISale) => void; mode: string }
> = ({ name, onSubmit, discount, quantity, description, expiration_date, start_date, mode }) => {
  const [form] = Form.useForm();

  const handleFormSubmitCreate = (values: ISale) => {
    // onSubmit(values as ISale);
    onSubmit(values);
    console.log(values)
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllSales({ page: 1, limit: 10, keyword: "" }));
  }, [dispatch]);
  const { sales } = useSelector(
    (state: IStateSale) => state.sale
  );

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
        quantity,
        description,
        expiration_date: dayjs(expiration_date, "YYYY-MM-DD"),
        start_date: dayjs(start_date, "YYYY-MM-DD"),
      }}
      onFinish={handleFormSubmitCreate}
    >
      <Form.Item
        label={"Campaign Name"}
        name="name"
        rules={[{ required: true, message: "Please input Campaign Name" }]}
      >
        <Input defaultValue={name} />
      </Form.Item>

      {mode === "create" && (
        <>
          <Form.Item
            label={"Discount"}
            name="discount"
            rules={[
              { required: true, message: "Please input Discount" }
            ]}
          >
            <Input defaultValue={discount} />
          </Form.Item>

          <Form.Item
            label={"Quantity"}
            name="quantity"
            rules={[
              { required: true, message: "Please input Quantity" }
            ]}
          >
            <Input defaultValue={quantity} />
          </Form.Item>

          <Form.Item
            label={"Description"}
            name="description"
            rules={[{ required: true, message: "Please input Description" }]}
          >
            <Input.TextArea defaultValue={description} />
          </Form.Item>

          {/* <Form.Item
              label={"Product"}
              name="product"
              rules={[{ required: true, message: "Please input Product" }]}
          >
            <Input defaultValue={product} />
          </Form.Item> */}

          <Form.Item
            label={"Expiration date"}
            rules={[{ required: true, message: "Please input Expiration date" }]}
          >
            <DatePicker defaultValue={dayjs(expiration_date, "YYYY-MM-DD")} />
          </Form.Item>

          <Form.Item
            label={"Start date"}
            rules={[{ required: true, message: "Please input Start date" }]}
          >
            <DatePicker defaultValue={dayjs(start_date, "YYYY-MM-DD")} />
          </Form.Item>
        </>
      )}
      {mode === "update" && (
        <>
          <Form.Item
            label={"Discount"}
            name="discount"
            rules={[
              { required: true, message: "Please input Discount" }
            ]}
          >
            <Input defaultValue={discount} />
          </Form.Item>

          <Form.Item
            label={"Quantity"}
            name="quantity"
            rules={[
              { required: true, message: "Please input Quantity" }
            ]}
          >
            <Input defaultValue={quantity} />
          </Form.Item>

          <Form.Item
            label={"Description"}
            name="description"
            rules={[{ required: true, message: "Please input Description" }]}
          >
            <Input.TextArea defaultValue={description} />
          </Form.Item>

          {/* <Form.Item
              label={"Product"}
              name="product"
              rules={[{ required: true, message: "Please input Product" }]}
          >
            <Input defaultValue={product} />
          </Form.Item> */}

          <Form.Item
            label={"Expiration date"}
            rules={[{ required: true, message: "Please input Expiration date" }]}
          >
            <DatePicker defaultValue={dayjs(expiration_date, "YYYY-MM-DD")} />
          </Form.Item>

          <Form.Item
            label={"Start date"}
            rules={[{ required: true, message: "Please input Start date" }]}
          >
            <DatePicker defaultValue={dayjs(start_date, "YYYY-MM-DD")} />
          </Form.Item>
        </>
      )}

      <Form.Item
        style={{ textAlign: 'right' }}
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button>Cancel</Button>
        <Button style={{ marginLeft: '5px' }} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormSale;


