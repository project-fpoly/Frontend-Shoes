/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    LoadingOutlined,
    SyncOutlined
} from "@ant-design/icons";

import { Button, DatePicker, Select, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartItem, IBill } from "../../common/order";
import { IStateProduct } from "../../common/redux/type";
import HeaderTableAdminOrder from "../../components/Admin/Layout/HeaderTableAdminOrder";
import { fetchOrders } from "../../features/order";
import { AppDispatch, RootState } from "../../redux/store";


export default function OrderPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    const [dayStart, setDayStart] = useState("");
    const [dayEnd, setDayEnd] = useState("");
    const [Search, setSearch] = useState("");
    const [_, setSelectedValue] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const users = localStorage.getItem("userID");

    const orders = useSelector((state: RootState) => state.order.orders);
    const orderByUser = orders?.filter((item: any) => item.user === users)
    const isLoading = useSelector((state: RootState) => state.order.isLoading);
    const pagination = useSelector((state: RootState) => state.order.pagination);
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

    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
        const url = `?page=${page}`;
        navigate(url);

        dispatch(
            fetchOrders({
                page: page,
                limit: pageSize,
                search: Search,
                start: dayStart,
                end: dayEnd,
            })
        );
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
            title: (
                <span>
                    <Select
                        placeholder="is Delevered"
                        onChange={(value) => searchOrder(value)}
                    >
                        <Select.Option value="">Tất cả trạng thái</Select.Option>
                        <Select.Option value="Chờ xác nhận">Chờ xác nhận</Select.Option>
                        <Select.Option value="Chờ lấy hàng">Chờ lấy hàng</Select.Option>
                        <Select.Option value="Đang giao hàng">Đang giao hàng</Select.Option>
                        <Select.Option value="Đã giao hàng">Đã giao hàng</Select.Option>
                        <Select.Option value="Đã huỷ">Đã huỷ</Select.Option>
                    </Select>
                </span>
            ),
            dataIndex: "isDelivered",
            align: "center",
            render: (isDelivered: string) => {
                let tagColor = "";
                let tagContent = "";
                let tagIcon = null;
                switch (isDelivered) {
                    case "Chờ xác nhận":
                        tagColor = "default";
                        tagContent = "Chờ xác nhận";
                        tagIcon = <ClockCircleOutlined />;
                        break;
                    case "Chờ lấy hàng":
                        // Xử lý khi isDelivered là "Đã hủy"
                        tagColor = "purple";
                        tagContent = "Chờ lấy hàng";
                        tagIcon = <SyncOutlined spin />;
                        break;
                    case "Đang giao hàng":
                        tagColor = "processing";
                        tagContent = "Đang giao hàng";
                        tagIcon = <CarOutlined />;
                        break;
                    case "Đã giao hàng":
                        tagColor = "success";
                        tagContent = "Đã giao hàng";
                        tagIcon = <CheckCircleOutlined />;
                        break;

                    default:
                        tagColor = "error";
                        tagContent = "Đã hủy";
                        tagIcon = <CloseCircleOutlined />;
                        break;
                }

                return (
                    <span>
                        {
                            <Tag icon={tagIcon} color={tagColor}>
                                {tagContent}
                            </Tag>
                        }
                    </span>
                );
            },
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

    const searchOrder = (value: string) => {
        setSearch(value);
        setSelectedValue(value);
    };

    return (
        <>
            <div className="mt-10">
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
                {isLoading ? (
                    <>
                        <div className="flex justify-center items-center mt-16">
                            <LoadingOutlined style={{ fontSize: 24 }} spin />
                        </div>
                    </>
                ) : (
                    <>
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
                            dataSource={orderByUser}
                            rowKey="_id"
                            bordered
                            size="small"
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: pagination.totalPages * pageSize,
                                onChange: handlePageChange,
                            }}

                        />
                    </>
                )}



            </div>
        </>
    );
};

