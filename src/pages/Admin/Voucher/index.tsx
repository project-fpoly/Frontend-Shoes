import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Tooltip, Tag, Avatar } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import HeaderTable from '../../../components/Admin/Layout/HeaderTable';
import FormUser from '../../../components/Admin/User/FormUser';
import { IUsers } from '../../../common/users';
import { AppDispatch } from '../../../redux/store';
import {
    createNewUser,
    deleteeUser,
    fetchAllUsers,
    updateUser,
} from '../../../features/user';
import { IStateUser } from '../../../common/redux/type';

const VoucherManager: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [userss, setUser] = useState<IUsers>();
    const [currentPage, setCurrentPage] = useState(1);
    const [Search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const { users: user, loading, totalDocs } = useSelector((state: IStateUser) => state.user);

    useEffect(() => {
        dispatch(fetchAllUsers({ page: currentPage, pageSize: 10, search: Search }));
    }, [dispatch, currentPage, Search]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCreateUser = (newUser: IUsers) => {
        dispatch(createNewUser(newUser));
        setIsModalOpen(false);
    };

    const handleUpdateUser = (newUser: IUsers) => {
        dispatch(updateUser({ newUser, id: userss?._id as string }));
        setIsModalUpdateOpen(false);
    };

    const toggleModal = (user: IUsers) => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
        setUser(user);
        console.log(user);
    };

    const deleteUsesr = (user: IUsers) => {
        Modal.confirm({
            title: 'Confirm Deletion',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete this voucher?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                dispatch(deleteeUser([user._id]));
            },
            onCancel() {},
        });
    };

    const columns: ColumnsType<IUsers> = [
        {
            title: 'No.',
            dataIndex: 'index',
            render: (_, __, index) => index + 1,
            align: 'center',
        },

        {
            title: 'Code Name',
            align: 'center',

        },
        {
            title: 'Reduced amount',
            align: 'center',
        },
        {
            title: 'Description',
            align: 'center',
        },
        {
            title: 'Expiration date',
            align: 'center',
        },
        {
            title: 'Create date',
            align: 'center',
        },
        {
            title: 'Create by',
            align: 'center',
        },


        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <div style={{ textAlign: 'center' }}>
                    <Tooltip title="Edit">
                        <Button type="link" onClick={() => toggleModal(record)}>
                            <EditOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button type="link" onClick={() => deleteUsesr(record)}>
                            <DeleteOutlined />
                        </Button>
                    </Tooltip>
                    {record.role !== 'admin' && (
                        <Tooltip title="Delete">
                            <Button type="link" onClick={() => deleteUsesr(record)}>
                                <DeleteOutlined />
                            </Button>
                        </Tooltip>
                    )}
                </div>
            ),
        },
    ];

    const defaultValue: Partial<IUsers> = {
        userName: 'hahhaaa',
        password: '123123',
        deliveryAddress: 'gia lai',
        email: 'la@gmail.com',
        role: 'member',
        phoneNumbers: '0000000000',
        avt: 'hihia',
        dateOfBirth: '2003',
        gender: 'male',
    };

    const Value: Partial<IUsers> = {
        _id: userss?._id || '',
        userName: userss?.userName || 'hahhaaa',
        deliveryAddress: userss?.deliveryAddress || 'gia lai',
        email: userss?.email || 'la@gmail.com',
        role: userss?.role || 'member',
        phoneNumbers: userss?.phoneNumbers || '0000000000',
        avt: userss?.avt || 'hihia',
        dateOfBirth: userss?.dateOfBirth || '2003',
        gender: userss?.gender || 'male',
    };

    const searchUser = (value: string) => {
        setSearch(value);
    };

    return (
        <div>
            <HeaderTable showModal={() => setIsModalOpen(true)} onSubmitt={(value) => searchUser(value)} name="User" />
            {loading === 'pending' ? (
                <div className="flex justify-center items-center mt-16">
                    <LoadingOutlined style={{ fontSize: 24 }} spin />
                </div>
            ) : (
                <Table
                    style={{ marginTop: '15px' }}
                    columns={columns}
                    dataSource={user}
                    bordered
                    size="small"
                    pagination={{ current: currentPage, total: totalDocs, showTotal: (total) => ` ${total} items`, onChange: handlePageChange }}
                />
            )}

            <Modal
                title="Create new voucher"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                maskClosable={false}
                destroyOnClose={true}
            >
                <FormUser mode="create" onSubmit={handleCreateUser} {...defaultValue} />
            </Modal>
            <Modal
                title="Update"
                open={isModalUpdateOpen}
                onOk={() => setIsModalUpdateOpen(false)}
                onCancel={() => setIsModalUpdateOpen(false)}
                destroyOnClose={true}
                footer={null}
            >
                <FormUser mode="update" onSubmit={handleUpdateUser} {...Value} />
            </Modal>
        </div>
    );
};

export default VoucherManager;
