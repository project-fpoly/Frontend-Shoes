// import { SiNike } from 'react-icons/si'
// import { Button, Form, Input } from 'antd'
// import axios from 'axios'
// import { useNavigate, useSearchParams } from 'react-router-dom'
//
// const VerifyEmail = () => {
//   const navigate = useNavigate()
//   const [params] = useSearchParams()
//   const onFinish = async (values: any) => {
//     if (!params.get('email')) {
//       alert('Missing email from URL')
//     } else {
//       try {
//         const response = await axios.post(
//           'http://localhost:9000/api/auth/verify-email',
//           {
//             email: params.get('email'),
//             emailVerificationToken: values?.code ?? '',
//           },
//         )
//         if (response && response.status === 200) {
//           alert(response.data?.message)
//           //redirect to home page
//           navigate('/signin')
//         }
//       } catch (error: any) {
//         error.response.data.error && alert(error.response.data.error)
//       }
//     }
//   }
//
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-lg text-center flex items-center justify-center">
//           <SiNike className="vertical-align: middle" size={50} />
//         </div>
//         <section>
//           <Form
//             className="mx-auto mb-0 mt-8 max-w-md space-y-4"
//             name="form_item_path"
//             layout="vertical"
//             onFinish={onFinish}
//             autoComplete="off"
//           >
//             <h1 className="text-2xl font-normal sm:text-4xl">
//               Enter verify code that sent to your email.
//             </h1>
//             <Form.Item
//               className="text-black font-bold"
//               name="code"
//               rules={[
//                 {
//                   message: 'Mandatory!',
//                   required: true,
//                 },
//               ]}
//             >
//               <Input
//                 className="font-medium border h-10 hover:border-blue-500 focus:border-blue-500"
//                 style={{ borderColor: 'gray' }}
//                 placeholder="Verify code"
//               />
//             </Form.Item>
//
//             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//               <Button
//                 className="rounded-full btn-primary-dark btn-md"
//                 htmlType="submit"
//                 style={{
//                   color: 'white',
//                   backgroundColor: 'black',
//                   borderColor: 'black',
//                   padding: '24px',
//                   fontSize: '18px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center', // Để căn giữa theo chiều ngang
//                   marginLeft: 'auto', // Để nút sang bên phải
//                 }}
//               >
//                 Verify
//               </Button>
//             </div>
//             {/* <div>
//               <ForgotPassword />
//             </div> */}
//           </Form>
//         </section>
//       </div>
//     </div>
//   )
// }
//
// export default VerifyEmail
import { SiNike } from 'react-icons/si'
import { Button, Form, Input, notification } from 'antd'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'

const VerifyEmail = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams()

    // const onFinish = async (values: any) => {
    //   if (!params.get('email')) {
    //     alert('Missing email from URL')
    //   } else {
    //     try {
    //       const response = await axios.post(
    //         'http://localhost:9000/api/auth/verify-email',
    //         {
    //           email: params.get('email'),
    //           emailVerificationToken: values?.code ?? '',
    //         },
    //       )
    //       if (response && response.status === 200) {
    //         alert(response.data?.message)
    //         //redirect to home page
    //         navigate('/signin')
    //       }
    //     } catch (error: any) {
    //       error.response.data.error && alert(error.response.data.error)
    //     }
    //   }
    // }

    const onFinish = async (values: any) => {
        if (!params.get('email')) {
            alert('Missing email from URL')
        } else {
            try {
                const response = await axios.post(
                    'http://localhost:9000/api/auth/verify-email',
                    {
                        email: params.get('email'),
                        emailVerificationToken: values?.code ?? '',
                    },
                )
                if (response && response.status === 200) {
                    notification.success({ // Hiển thị thông báo thành công
                        message: response.data?.message
                    });
                    navigate('/signin')
                }
            } catch (error: any) {
                notification.error({ // Hiển thị thông báo lỗi
                    message: error.response.data.error
                });
            }
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center flex items-center justify-center">
                    <SiNike className="vertical-align: middle" size={50} />
                </div>
                <section>
                    <Form
                        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
                        name="form_item_path"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <h1 className="text-2xl font-normal sm:text-4xl">
                            Enter verify code that sent to your email.
                        </h1>
                        <Form.Item
                            className="text-black font-bold"
                            name="code"
                            rules={[
                                {
                                    message: 'Mandatory!',
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                className="font-medium border h-10 hover:border-blue-500 focus:border-blue-500"
                                style={{ borderColor: 'gray' }}
                                placeholder="Verify code"
                            />
                        </Form.Item>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                className="rounded-full btn-primary-dark btn-md"
                                htmlType="submit"
                                style={{
                                    color: 'white',
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    padding: '24px',
                                    fontSize: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center', // Để căn giữa theo chiều ngang
                                    marginLeft: 'auto', // Để nút sang bên phải
                                }}
                            >
                                Verify
                            </Button>
                        </div>
                        {/* <div>
              <ForgotPassword />
            </div> */}
                    </Form>
                </section>
            </div>
        </div>
    )
}

export default VerifyEmail