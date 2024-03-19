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
import { AppDispatch } from '../../../redux/store';
import {
    createNewUser,
    deleteeUser,
    fetchAllUsers,
    updateUser,
} from '../../../features/user';
import { IStateUser } from '../../../common/redux/type';
import FormVoucher from "../../../components/Admin/Voucher/FormVoucher.tsx";

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
            title: 'Code',
            align: 'center',
        },
        {
            title: 'Quantity',
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
                    <Tooltip title="Delete">
                        <Button type="link" onClick={() => deleteUsesr(record)}>

                        </Button>
                    </Tooltip>
                            {/*{record.role !== 'admin' && (*/}

                            {/*)}*/}
                </div>
            ),
        },
    ];



    const searchUser = (value: string) => {
        setSearch(value);
    };

    return (
        <div>
            <HeaderTable showModal={() => setIsModalOpen(true)} onSubmitt={searchUser} name="User"/>
            <Table
                columns={columns}
                dataSource={user}
                bordered
                size="small"
                pagination={{
                    current: currentPage,
                    total: totalDocs,
                    showTotal: (total) => `${total} items`,
                    onChange: handlePageChange
                }}
            />

            <Modal
                title="Create new voucher"
                visible={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                maskClosable={false}
                destroyOnClose={true}
            >
                <FormVoucher mode="create" onSubmit={handleCreateUser}/>
            </Modal>

            {/*<Modal*/}
            {/*    title="Update voucher"*/}
            {/*    visible={isModalUpdateOpen}*/}
            {/*    onOk={() => setIsModalUpdateOpen(false)}*/}
            {/*    onCancel={() => setIsModalUpdateOpen(false)}*/}
            {/*    destroyOnClose={true}*/}
            {/*    footer={null}*/}
            {/*>*/}
            {/*    <FormVoucher mode="update" onSubmit={handleUpdateUser}/>*/}
            {/*</Modal>*/}

            <Modal
                title="Update voucher"
                visible={isModalUpdateOpen}
                onOk={() => setIsModalUpdateOpen(false)}
                onCancel={() => setIsModalUpdateOpen(false)}
                destroyOnClose={true}
                footer={null}
            >
                <FormVoucher mode="update" onSubmit={handleUpdateUser}/>
            </Modal>
        </div>
    );
};

export default VoucherManager;
