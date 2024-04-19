import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  RollbackOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Modal, Table, Tag, Tooltip, notification } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { IUsers } from '../../../common/users'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import {
  createNewUser,
  deletee2User,
  deleteeUser,
  fetchAllUsers,
  restoreUser,
  updateUser,
} from '../../../features/user'
import { IStateUser } from '../../../common/redux/type'
import { format } from 'date-fns'
import HeaderTable from '../../../components/Admin/Layout/HeaderTable'
import FormUser from '../../../components/Admin/User/FormUser'
const UserManager: React.FC = () => {
  const dispact = useDispatch<AppDispatch>()
  const [userss, setUser] = useState<IUsers>()
  const [currentPage, setCurrentPage] = useState(1)
  const [size, setsize] = useState(10)
  const [Search, setSearch] = useState('')
  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page)
    setsize(size)
  }
  const {
    users: user,
    loading,
    totalDocs,
  } = useSelector((state: IStateUser) => state.user)
  useEffect(() => {
    dispact(
      fetchAllUsers({
        page: currentPage,
        pageSize: size,
        search: Search,
        isDelete: false,
      }),
    )
  }, [dispact, currentPage, Search, size])
  const handleCreateUser = (newUser: IUsers) => {
    dispact(createNewUser(newUser))
    setIsModalOpen(false)
  }
  const handleUpdateUser = (newUser: IUsers) => {
    dispact(updateUser({ newUser, id: userss?._id as string }))
    setIsModalUpdateOpen(false)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [UserRemove, setUserRemove] = useState(true)
  const toggleModal = (user: IUsers) => {
    setIsModalUpdateOpen(!isModalUpdateOpen)
    setUser(user)
    console.log(user)
  }
  const deleteUsesr = (user: IUsers) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        UserRemove
          ? dispact(deletee2User(user._id))
          : dispact(deleteeUser([user._id]))
      },
      onCancel() {},
    })
  }
  const restoreUser1 = (user: string) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to restore this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispact(restoreUser(user))
      },
      onCancel() {},
    })
  }
  const columns: ColumnsType<IUsers> = [
    {
      title: 'No.',
      dataIndex: 'index',
      render: (_, __, index) => index + 1,
      align: 'right',
    },
    {
      title: 'Avatar',
      dataIndex: 'avt',
      align: 'center',
      render: (record) =>
        record ? (
          <Avatar src={record.url} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        ),
    },
    {
      title: 'userName',
      dataIndex: 'userName',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Email Verified',
      align: 'center',
      dataIndex: 'emailVerified',
      render: (emailVerified) =>
        emailVerified ? (
          <Tag color="success">Đã xác thực</Tag>
        ) : (
          <Tag color="warning">Chưa xác thực</Tag>
        ),
    },
    {
      title: 'Phone Numbers',
      align: 'left',
      dataIndex: 'phoneNumbers',
      render: (text) =>
        text ? (
          <span>{text}</span>
        ) : (
          <Tag
            style={{ display: 'flex', justifyContent: 'center' }}
            color="warning"
          >
            Chưa cập nhật
          </Tag>
        ),
    },
    {
      title: 'role',
      dataIndex: 'role',
    },
    {
      title: 'isActive',
      dataIndex: 'isActive',
      render: (isActive) => (
        <span style={{ color: isActive ? 'green' : 'red' }}>
          {isActive ? 'On' : 'Off'}
        </span>
      ),
    },
    {
      title: 'lastActivity',
      dataIndex: 'lastActivity',
      render: (lastActivity: string | null | undefined) =>
        lastActivity
          ? format(new Date(lastActivity), ' HH:mm:ss dd-MM-yyyy')
          : 'Chưa hoạt động',
    },
    {
      title: 'action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <div style={{ textAlign: 'center' }}>
          {UserRemove? (
          <Tooltip title={'edit'}>
            <Button type="link" onClick={() => toggleModal(record)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          ):(
          <Tooltip title={'restore'}>
            <Button type="link" danger onClick={() => restoreUser1(record._id)}>
              <RollbackOutlined />
            </Button>
          </Tooltip>
          )}
          {record.role !== 'admin' && (
            <Tooltip title={'delete'}>
              <Button type="link" danger onClick={() => deleteUsesr(record)}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          )}
        </div>
      ),
    },
  ]
  const defaultValue = {
    _id: '',
    userName: 'hahhaaa',
    password: '123123',
    deliveryAddress: 'gia lai',
    email: 'la@gmail.com',
    role: 'member',
    phoneNumbers: '0000000000',
    avt: 'hihia',
    dateOfBirth: '2003',
    gender: 'male',
  }
  const Value = {
    _id: userss?._id || '',
    userName: userss?.userName || 'hahhaaa',
    deliveryAddress: userss?.deliveryAddress || 'gia lai',
    email: userss?.email || 'la@gmail.com',
    role: userss?.role || 'member',
    phoneNumbers: userss?.phoneNumbers || '0000000000',
    avt: userss?.avt || 'hihia',
    dateOfBirth: userss?.dateOfBirth || '2003',
    gender: userss?.gender || 'male',
  }
  const searchUser = (value: string) => {
    setSearch(value)
  }
  const userRemoveHandle = () => {
    setUserRemove(!UserRemove)
    dispact(
      fetchAllUsers({
        page: currentPage,
        pageSize: size,
        search: Search,
        isDelete: UserRemove,
      }),
    )
  }
  return (
    <div>
      <HeaderTable
        showModal={() => setIsModalOpen(true)}
        onSubmitt={(value) => searchUser(value)}
        name={'User'}
      />
       <Button
      style={{ float: 'inline-end' }}
      icon={UserRemove ? <DeleteOutlined /> : <UnorderedListOutlined />}
      onClick={userRemoveHandle}
    >
      {UserRemove ? 'Xóa người dùng' : 'Danh sách người dùng'}
    </Button>
      {/* {loading === "pending" ? (
        <>
          <div className="flex justify-center items-center mt-16">
            <LoadingOutlined style={{ fontSize: 24 }} spin />
          </div>
        </>
      ) : ( */}
      <Table
        style={{
          marginTop: '15px',
        }}
        columns={columns}
        dataSource={user}
        bordered
        size="small"
        pagination={{
          current: currentPage,
          total: totalDocs,
          showTotal: (total) => ` ${total} items`,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
      />
      {/* )} */}

      <Modal
        title={'Create new user'}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        maskClosable={false}
        destroyOnClose={true}
      >
        <FormUser
          mode={'create'}
          onSubmit={handleCreateUser}
          {...defaultValue}
        />
      </Modal>
      <Modal
        title={'Update'}
        open={isModalUpdateOpen}
        onOk={() => setIsModalUpdateOpen(false)}
        onCancel={() => setIsModalUpdateOpen(false)}
        destroyOnClose={true}
        footer={null}
      >
        <FormUser mode={'update'} onSubmit={handleUpdateUser} {...Value} />
      </Modal>
    </div>
  )
}
export default UserManager
