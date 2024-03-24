// // import React, { useEffect, useState } from "react";
// // import { Button, Modal, Table, Tooltip, Tag, Avatar } from "antd";
// // import {
// //   DeleteOutlined,
// //   EditOutlined,
// //   ExclamationCircleOutlined,
// //   LoadingOutlined,
// //   UserOutlined,
// // } from "@ant-design/icons";
// // import { useDispatch, useSelector } from "react-redux";
// // import { ColumnsType } from "antd/es/table";
// // import { format, isAfter } from "date-fns";
// // import HeaderTable from "../../../components/Admin/Layout/HeaderTable";
// // import { AppDispatch } from "../../../redux/store";
// // import { ISale } from "../../../common/sale";
// // import { fetchAllSales } from "../../../features/sale";
// // import { IStateSale } from "../../../common/redux/type";
// //   import FormSale from "../../../components/Admin/Sale/FormSale";
// //
// // const SaleManager: React.FC = () => {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const [isModalOpen, setIsModalOpen] = useState(false)
// //   const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
// //   const [DetailSale, setDetailSale] = useState<ISale>();
// //   const [currentPage, setCurrentPage] = useState(1)
// //   const [Search, setSearch] = useState('')
// //   const { sales, loading } = useSelector(
// //       (state: IStateSale) => state.sale,
// //       )
// //
// //   const user=useSelector((state:any)=>state.auth.user)
// //
// //
// //   useEffect(() => {
// //     dispatch(fetchAllSales({ page: currentPage, limit: 10, keyword: Search }));
// //   }, [dispatch]);
// //
// //   const handleCreateSale = (sale: ISale) => {
// //     console.log(sale)
// //
// //   }
// //   const handleUpdateSale = (sale: ISale) => {
// //     console.log(sale);
// //   };
// //
// //   // const toggleModal = (sale: ISale) => {
// //   //   setIsModalUpdateOpen(true);
// //   //   console.log(sale);
// //   //   setDetailSale(sale);
// //   // };
// //   const toggleModal = (sale: ISale) => {
// //     setIsModalUpdateOpen(true);
// //     setDetailSale(sale);
// //   };
// //
// //
// //   const deleteSale = (sale: ISale) => {
// //     Modal.confirm({
// //       title: "Confirm Deletion",
// //       icon: <ExclamationCircleOutlined />,
// //       content: "Are you sure you want to delete this campaign?",
// //       okText: "Yes",
// //       okType: "danger",
// //       cancelText: "No",
// //       // onOk() {
// //       //   dispatch(deleteeUser([user._id]))
// //       // },
// //       // onCancel() {},
// //     });
// //   };
// //
// //   const columns: ColumnsType<ISale> = [
// //     {
// //       title: "No.",
// //       dataIndex: "index",
// //       render: (_, __, index) => index + 1,
// //       align: "center",
// //     },
// //     {
// //       title: "Campaign Name",
// //       dataIndex: "name",
// //     },
// //     {
// //       title: "Description",
// //       dataIndex: "description",
// //     },
// //     {
// //       title: "Discount",
// //       dataIndex: "discount",
// //     },
// //     {
// //       title: "Expiration date",
// //       dataIndex: "expiration_date",
// //       align: "center",
// //       render: (expiration_date) => {
// //         const currentDate = new Date();
// //         const formattedDate = format(new Date(expiration_date), "dd-MM-yyyy");
// //
// //         if (isAfter(new Date(expiration_date), currentDate)) {
// //           return <span style={{ color: "green" }}>{formattedDate}</span>;
// //         } else {
// //           return <span style={{ color: "red" }}>{formattedDate}</span>;
// //         }
// //       },
// //     },
// //     {
// //       title: "Create date",
// //       dataIndex: "createdAt",
// //       align: "center",
// //       render: (date) => format(new Date(date), "dd-MM-yyyy"),
// //     },
// //     {
// //       title: "Create by",
// //       dataIndex: "create_by",
// //       align: "left",
// //       render: (create_by) => create_by.email,
// //     },
// //     {
// //       title: "Product",
// //       dataIndex: "product",
// //     },
// //
// //     {
// //       title: 'Action',
// //       key: 'action',
// //       align: 'center',
// //       render: (_, record) => (
// //           <div style={{ textAlign: 'center' }}>
// //             {record.create_by?._id == user._id && (
// //                 <Tooltip title="Edit">
// //                   <Button type="link" onClick={() => toggleModal(record)}>
// //                     <EditOutlined />
// //                   </Button>
// //                 </Tooltip>
// //             )}
// //             <Tooltip title="Delete">
// //               <Button type="link" onClick={() => deleteSale(record)}>
// //                 <DeleteOutlined />
// //               </Button>
// //             </Tooltip>
// //           </div>
// //       ),
// //     },
// //   ];
// //
// //   const defaultValue: ISale = {
// //     _id: DetailSale?._id || '',
// //     name: DetailSale?.name || '',
// //     quantity: DetailSale?.quantity || 0,
// //     discount: DetailSale?.discount || 0,
// //     description: DetailSale?.description || '',
// //     expiration_date: DetailSale?.expiration_date || '2024-01-01',
// //   };
// //   const defaultInitValue: ISale = {
// //     _id: '',
// //     name: '',
// //     quantity: 0,
// //     discount: 0,
// //     description: '',
// //     expiration_date: '2024-01-01',
// //   };
// //   const searchSale = (value: string) => {
// //     console.log(value);
// //   };
// //
// //   return (
// //     <div>
// //       <HeaderTable
// //         showModal={() => setIsModalOpen(true)}
// //         onSubmitt={(value) => searchSale(value)}
// //         name="Sale"
// //       />
// //       {loading === "pending" ? (
// //         <div className="flex justify-center items-center mt-16">
// //           <LoadingOutlined style={{ fontSize: 24 }} spin />
// //         </div>
// //       ) : (
// //         <Table
// //           style={{ marginTop: "15px" }}
// //           columns={columns}
// //           dataSource={sales}
// //           bordered
// //           size="small"
// //         />
// //       )}
// //
// //       <Modal
// //         title="Create New Campaign"
// //         open={isModalOpen}
// //         onOk={() => setIsModalOpen(false)}
// //         onCancel={() => setIsModalOpen(false)}
// //         footer={null}
// //         maskClosable={false}
// //         destroyOnClose={true}
// //       >
// //         <FormSale onSubmit={handleCreateSale} {...defaultInitValue} />
// //       </Modal>
// //       <Modal
// //           title="Update Sale"
// //           open={isModalUpdateOpen}
// //           onOk={() => setIsModalUpdateOpen(false)}
// //           onCancel={() => setIsModalUpdateOpen(false)}
// //           destroyOnClose={true}
// //           footer={null}
// //       >
// //         <FormSale onSubmit={handleUpdateSale} {...defaultValue} />
// //       </Modal>
// //
// //     </div>
// //   );
// // };
// //
// // export default SaleManager
// //
// //
// //
//
//
// import React, { useEffect, useState } from "react";
// import { Button, Modal, Table, Tooltip } from "antd";
// import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { ColumnsType } from "antd/es/table";
// import { format, isAfter } from "date-fns";
// import HeaderTable from "../../../components/Admin/Layout/HeaderTable";
// import { AppDispatch } from "../../../redux/store";
// import { ISale } from "../../../common/sale";
// import { fetchAllSales } from "../../../features/sale";
// import { IStateSale } from "../../../common/redux/type";
// import FormSale from "../../../components/Admin/Sale/FormSale";
//
// const SaleManager: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
//   const [detailSale, setDetailSale] = useState<ISale>();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const { sales, loading } = useSelector((state: IStateSale) => state.sale) || {};
//   const user = useSelector((state: any) => state.auth.user);
//
//   useEffect(() => {
//     dispatch(fetchAllSales({ page: currentPage, limit: 10, keyword: search }));
//   }, [dispatch, currentPage, search]);
//
//   const handleCreateSale = (sale: ISale) => {
//     console.log(sale);
//   };
//
//   const handleUpdateSale = (sale: ISale) => {
//     console.log(sale);
//   };
//
//   const toggleModal = (sale: ISale) => {
//     setIsModalUpdateOpen(true);
//     setDetailSale(sale);
//   };
//
//   const deleteSale = (sale: ISale) => {
//     Modal.confirm({
//       title: "Confirm Deletion",
//       icon: <ExclamationCircleOutlined />,
//       content: "Are you sure you want to delete this campaign?",
//       okText: "Yes",
//       okType: "danger",
//       cancelText: "No",
//     });
//   };
//
//   const columns: ColumnsType<ISale> = [
//     {
//       title: "No.",
//       dataIndex: "index",
//       render: (_, __, index) => index + 1,
//       align: "center",
//     },
//     {
//       title: "Campaign Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//     },
//     {
//       title: "Discount",
//       dataIndex: "discount",
//     },
//     {
//       title: "Expiration date",
//       dataIndex: "expiration_date",
//       align: "center",
//       render: (expiration_date) => {
//         const formattedDate = format(new Date(expiration_date), "dd-MM-yyyy");
//         const isExpired = isAfter(new Date(expiration_date), new Date());
//         return <span style={{ color: isExpired ? "red" : "green" }}>{formattedDate}</span>;
//       },
//     },
//     {
//       title: "Create date",
//       dataIndex: "createdAt",
//       align: "center",
//       render: (date) => format(new Date(date), "dd-MM-yyyy"),
//     },
//     {
//       title: "Create by",
//       dataIndex: "create_by",
//       align: "left",
//       render: (create_by) => create_by?.email,
//     },
//     {
//       title: "Product",
//       dataIndex: "product",
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       align: 'center',
//       render: (_, record) => (
//           <div style={{ textAlign: 'center' }}>
//             {record.create_by?._id === user._id && (
//                 <Tooltip title="Edit">
//                   <Button type="link" onClick={() => toggleModal(record)}>
//                     <EditOutlined />
//                   </Button>
//                 </Tooltip>
//             )}
//             <Tooltip title="Delete">
//               <Button type="link" onClick={() => deleteSale(record)}>
//                 <DeleteOutlined />
//               </Button>
//             </Tooltip>
//           </div>
//       ),
//     },
//   ];
//
//   const defaultValues: ISale = {
//     _id: detailSale?._id || '',
//     name: detailSale?.name || '',
//     quantity: detailSale?.quantity || 0,
//     discount: detailSale?.discount || 0,
//     description: detailSale?.description || '',
//     expiration_date: detailSale?.expiration_date || '2024-01-01',
//   };
//
//   const searchSale = (value: string) => {
//     setSearch(value);
//   };
//
//   return (
//       <div>
//         <HeaderTable
//             showModal={() => setIsModalOpen(true)}
//             onSubmitt={searchSale}
//             name="Sale"
//         />
//         {loading === "pending" ? (
//             <div className="flex justify-center items-center mt-16">
//               <LoadingOutlined style={{ fontSize: 24 }} spin />
//             </div>
//         ) : (
//             <Table
//                 style={{ marginTop: "15px" }}
//                 columns={columns}
//                 dataSource={sales}
//                 bordered
//                 size="small"
//             />
//         )}
//
//         <Modal
//             title="Create New Campaign"
//             visible={isModalOpen}
//             onOk={() => setIsModalOpen(false)}
//             onCancel={() => setIsModalOpen(false)}
//             footer={null}
//             maskClosable={false}
//             destroyOnClose={true}
//         >
//           <FormSale onSubmit={handleCreateSale} {...defaultValues} />
//         </Modal>
//         <Modal
//             title="Update Sale"
//             visible={isModalUpdateOpen}
//             onOk={() => setIsModalUpdateOpen(false)}
//             onCancel={() => setIsModalUpdateOpen(false)}
//             footer={null}
//             destroyOnClose={true}
//         >
//           <FormSale onSubmit={handleUpdateSale} {...defaultValues} />
//         </Modal>
//       </div>
//   );
// };
//
// export default SaleManager;
//
//
import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import { format, isAfter } from "date-fns";
import HeaderTable from "../../../components/Admin/Layout/HeaderTable";
import { AppDispatch } from "../../../redux/store";
import { ISale } from "../../../common/sale";
import { fetchAllSales } from "../../../features/sale";
import { IStateSale } from "../../../common/redux/type";
import FormSale from "../../../components/Admin/Sale/FormSale";

const SaleManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [detailSale, setDetailSale] = useState<ISale>();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const { sales, loading } = useSelector((state: IStateSale) => state.sale) || {};
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    dispatch(fetchAllSales({ page: currentPage, limit: 10, keyword: search }));
  }, [dispatch, currentPage, search]);

  const handleCreateSale = (sale: ISale) => {
    console.log(sale);
  };

  const handleUpdateSale = (sale: ISale) => {
    console.log(sale);
  };

  const toggleModal = (sale: ISale) => {
    setIsModalUpdateOpen(true);
    setDetailSale(sale);
  };

  const deleteSale = (sale: ISale) => {
    Modal.confirm({
      title: "Confirm Deletion",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete this campaign?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
    });
  };

  const columns: ColumnsType<ISale> = [
    {
      title: "No.",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Campaign Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "Expiration date",
      dataIndex: "expiration_date",
      align: "center",
      render: (expiration_date) => {
        const formattedDate = format(new Date(expiration_date), "dd-MM-yyyy");
        const isExpired = isAfter(new Date(expiration_date), new Date());
        return <span style={{ color: isExpired ? "red" : "green" }}>{formattedDate}</span>;
      },
    },
    {
      title: "Create date",
      dataIndex: "createdAt",
      align: "center",
      render: (date) => format(new Date(date), "dd-MM-yyyy"),
    },
    {
      title: "Create by",
      dataIndex: "create_by",
      align: "left",
      render: (create_by) => create_by?.email,
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
          <div style={{ textAlign: 'center' }}>
            {record.create_by?._id === user._id && (
                <Tooltip title="Edit">
                  <Button type="link" onClick={() => toggleModal(record)}>
                    <EditOutlined />
                  </Button>
                </Tooltip>
            )}
            <Tooltip title="Delete">
              <Button type="link" onClick={() => deleteSale(record)}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </div>
      ),
    },
  ];

  const defaultValues: ISale = {
    _id: detailSale?._id || '',
    name: detailSale?.name || '',
    quantity: detailSale?.quantity || 0,
    discount: detailSale?.discount || 0,
    description: detailSale?.description || '',
    expiration_date: detailSale?.expiration_date || '2024-01-01',
  };

  const searchSale = (value: string) => {
    setSearch(value);
  };

  return (
      <div>
        <HeaderTable
            showModal={() => setIsModalOpen(true)}
            onSubmitt={searchSale}
            name="Sale"
        />
        {loading === "pending" ? (
            <div className="flex justify-center items-center mt-16">
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            </div>
        ) : (
            <Table
                style={{ marginTop: "15px" }}
                columns={columns}
                dataSource={sales}
                bordered
                size="small"
            />
        )}

        <Modal
            title="Create New Campaign"
            visible={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            maskClosable={false}
            destroyOnClose={true}
        >
          <FormSale onSubmit={handleCreateSale} {...defaultValues} />
        </Modal>
        <Modal
            title="Update Sale"
            visible={isModalUpdateOpen}
            onOk={() => setIsModalUpdateOpen(false)}
            onCancel={() => setIsModalUpdateOpen(false)}
            footer={null}
            destroyOnClose={true}
        >
          <FormSale onSubmit={handleUpdateSale} {...defaultValues} />
        </Modal>
      </div>
  );
};

export default SaleManager;
