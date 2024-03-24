import React, { useEffect, useState } from 'react'
import { Button, Modal, Table, Tooltip, Tag, Avatar } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { ColumnsType } from 'antd/es/table'
import { format, isAfter } from 'date-fns'
import HeaderTable from '../../../components/Admin/Layout/HeaderTable'
import FormUser from '../../../components/Admin/User/FormUser'
import { IUsers } from '../../../common/users'
import { AppDispatch } from '../../../redux/store'
import {
  createNewUser,
  deleteeUser,
  fetchAllUsers,
  updateUser,
} from '../../../features/user'
import { IStateVoucher } from '../../../common/redux/type'
import { fetchVoucher } from '../../../features/voucher'
import { IVoucher } from '../../../common/voucher'
import FormVoucher from '../../../components/Admin/Voucher/FormVoucher'

const VoucherManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [DetailVouche, setDetailVouche] = useState<IVoucher>()
  const { vouchers, loading } = useSelector(
    (state: IStateVoucher) => state.voucher,
  )
  const user = useSelector((state: any) => state.auth.user)

  useEffect(() => {
    dispatch(fetchVoucher())
  }, [dispatch])

  const handleCreateUser = (voucher: IVoucher) => {
    console.log(voucher)
  }

  const handleUpdateUser = (voucher: IVoucher) => {
    console.log(voucher)
  }

  const toggleModal = (voucher: IVoucher) => {
    setIsModalUpdateOpen(true)
    console.log(voucher)
    setDetailVouche(voucher)
  }

  const deleteVoucher = (user: IVoucher) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this voucher?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      // onOk() {
      //   dispatch(deleteeUser([user._id]))
      // },
      // onCancel() {},
    })
  }

  const columns: ColumnsType<IVoucher> = [
    {
      title: 'No.',
      dataIndex: 'index',
      render: (_, __, index) => index + 1,
      align: 'center',
    },
    {
      title: 'Code Name',
      dataIndex: 'Name',
      align: 'left',
    },
    {
      title: 'Reduced amount(VND)',
      dataIndex: 'reduced_amount',
      align: 'right',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'left',
    },
    {
      title: 'start  date',
      dataIndex: 'start_date',
      align: 'center',
      width:120,
      render: (date) => format(new Date(date), 'dd-MM-yyyy'),
    },
    {
      title: 'Expiration date',
      dataIndex: 'expiration_date',
      align: 'center',
      render: (expiration_date) => {
        const currentDate = new Date()
        const formattedDate = format(new Date(expiration_date), 'dd-MM-yyyy')

        if (isAfter(new Date(expiration_date), currentDate)) {
          return <span style={{ color: 'green' }}>{formattedDate}</span>
        } else {
          return <span style={{ color: 'red' }}>{formattedDate}</span>
        }
      },
    },
    {
      title: 'Create by',
      dataIndex: 'create_by',
      align: 'left',
      render: (create_by) => create_by.email,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <div style={{ textAlign: 'center' }}>
          {record.create_by?._id == user._id && (
            <Tooltip title="Edit">
              <Button type="link" onClick={() => toggleModal(record)}>
                <EditOutlined />
              </Button>
            </Tooltip>
          )}
          <Tooltip title="Delete">
            <Button type="link" onClick={() => deleteVoucher(record)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ]

  const defaultValue: IVoucher = {
    _id: DetailVouche?._id || '',
    Name: DetailVouche?.Name || '',
    Quantity: DetailVouche?.Quantity || 0,
    reduced_amount: DetailVouche?.reduced_amount || 0,
    price_order: DetailVouche?.price_order || 0,
    description: DetailVouche?.description || '',
    start_date:DetailVouche?.start_date || '2024-01-01',
    expiration_date: DetailVouche?.expiration_date || '2024-01-01',
  }
  const defaultInitValue: IVoucher = {
    _id: '',
    Name: '',
    Quantity: 0,
    reduced_amount: 0,
    price_order: 0,
    description: '',
    start_date:"2024-01-01",
    expiration_date: '2024-01-01',
  }
  const searchUser = (value: string) => {
    console.log(value)
  }

  return (
    <div>
      <HeaderTable
        showModal={() => setIsModalOpen(true)}
        onSubmitt={(value) => searchUser(value)}
        name="Voucher"
      />
      {loading === 'pending' ? (
        <div className="flex justify-center items-center mt-16">
          <LoadingOutlined style={{ fontSize: 24 }} spin />
        </div>
      ) : (
        <Table
          style={{ marginTop: '15px' }}
          columns={columns}
          dataSource={vouchers}
          bordered
          size="small"
        />
      )}

      <Modal
        title="Create New Voucher"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        maskClosable={false}
        destroyOnClose={true}
      >
        <FormVoucher onSubmit={handleCreateUser} {...defaultInitValue} />
      </Modal>
      <Modal
        title="Update Voucher"
        open={isModalUpdateOpen}
        onOk={() => setIsModalUpdateOpen(false)}
        onCancel={() => setIsModalUpdateOpen(false)}
        destroyOnClose={true}
        footer={null}
      >
        <FormVoucher onSubmit={handleUpdateUser} {...defaultValue} />
      </Modal>
    </div>
  )
}

export default VoucherManager


