import { Button, DatePicker, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { CartItem, IBill } from '../../common/order';

import { useDispatch, useSelector } from 'react-redux';
import { IStateProduct } from '../../common/redux/type';
import HeaderTableAdminOrder from '../../components/Admin/Layout/HeaderTableAdminOrder';
import { fetchOrders } from '../../features/order';
import { AppDispatch } from '../../redux/store';
import DetailOrder from '../../components/Admin/Order/DetailOrder';
import { IUsers } from '../../common/users';


interface Props {
    data: any

}

export default function OrderItem({ data }: Props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch<AppDispatch>();

    const [selectedOrder, setSelectedOrder] = useState<IBill | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [dayStart, setDayStart] = useState("");
    const [dayEnd, setDayEnd] = useState("");
    const [Search, setSearch] = useState("");
    const [_, setSelectedValue] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const { users } = useSelector((state: IUsers) => state.user);




    const { products } = useSelector((state: IStateProduct) => state.product);



    useEffect(() => {
        dispatch(
            fetchOrders({
                page: currentPage,
                limit: pageSize,
                search: Search,
                start: dayStart,
                end: dayEnd,
            })
        );
    }, [dispatch, currentPage, pageSize, Search, dayStart, dayEnd]);



    const handleRowClick = (order: IBill) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setModalVisible(false);
    };

    const getProductName = (shoeId: string) => {
        const product = products.find((product) => product._id === shoeId);
        return product ? product.name : "N/A";
    };


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        return newSelectedRowKeys;
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const searchOrder = (value: string) => {
        setSearch(value);
        setSelectedValue(value);
    };

    const columns: ColumnsType<IBill> = [
        {
            title: "No.",
            dataIndex: "index",
            render: (_, __, index) => index + 1,
            align: "center",
        },
        {
            title: "Items",
            dataIndex: "cartItems",
            render: (cartItems) => (
                <span key={cartItems._id}>
                    {cartItems.map((cartItem: CartItem, index: number) => (
                        <div className="my-2" key={index}>
                            {getProductName(cartItem.product)} - {cartItem.quantity}
                        </div>
                    ))}
                </span>
            ),
            align: "center",
        },

        {
            title: "Shipping address",
            dataIndex: "shippingAddress",
            render: (shippingAddress) => (
                <span>
                    <>
                        <div>
                            <b>Full Name:</b> {shippingAddress.fullname}
                        </div>
                        <div>
                            <b>Address:</b> {shippingAddress.address}
                        </div>
                        <div>
                            <b>Email:</b> {shippingAddress.email}
                        </div>
                        <div>
                            <b>Phone Number:</b>
                            {shippingAddress.phone}
                        </div>
                    </>
                </span>
            ),
        },
        {
            title: "Payment meothod",
            dataIndex: "payment_method",
            align: "center",
        },
        {
            title: "Total",
            dataIndex: "totalPrice",
            align: "center",
        },
        {
            title: "Is paid",
            dataIndex: "isPaid",
            align: "center",
            render: (isPaid) => (
                <span>{isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</span>
            ),
        },
        {
            title: "Create at",
            dataIndex: "createdAt",
            align: "center",
            render: (createdAt) => (
                <span>{moment(createdAt).format("DD/MM/YYYY")}</span>
            ),
        },

        {
            title: "Action",
            key: "action",
            align: "center",
            className: "action-cell",
            render: (_, record) => {

                const isCancel = record.isDelivered === "Chờ xác nhận"
                return (
                    <div style={{ textAlign: "center" }}>

                        <Button type="link" disabled={!isCancel}>
                            Hủy dơn
                        </Button>


                    </div>
                )
            },
        },
    ];
    return (
        <>
            <div className="flex items-end">
                <HeaderTableAdminOrder
                    showModal={() => { }}
                    onSubmitt={(value) => searchOrder(value)}
                    name={"Orders "}
                />
                <DatePicker
                    className="mx-2"
                    onChange={(_, dateString) =>
                        setDayStart(
                            Array.isArray(dateString) ? dateString.join(",") : dateString
                        )
                    }
                    placeholder="Start Date"
                />
                <DatePicker
                    onChange={(_, dateString) =>
                        setDayEnd(
                            Array.isArray(dateString) ? dateString.join(",") : dateString
                        )
                    }
                    placeholder="End Date"
                />

            </div>
            <Table
                style={{
                    marginTop: "15px",
                }}
                rowSelection={{
                    ...rowSelection,
                    getCheckboxProps: (record) => {

                        return {
                            disabled: record.isDelivered === "Đã giao hàng",
                        };
                    },
                }}

                columns={columns}
                dataSource={data}
                bordered
                size="small"
                onRow={(record) => ({
                    onClick: (event) => {
                        const target = event.target as Element;
                        const isAction =
                            target.classList.contains("action-cell") ||
                            target.closest(".action-cell");
                        if (!isAction) {
                            handleRowClick(record);
                        }
                    },
                })}
            />
            <Modal
                open={modalVisible}
                onCancel={closeModal}
                footer={null}
                destroyOnClose={true}
            >
                {
                    selectedOrder &&
                    DetailOrder(selectedOrder, products, users)}
            </Modal>
        </>
    )
}
