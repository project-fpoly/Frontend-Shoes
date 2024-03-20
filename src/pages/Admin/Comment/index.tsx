import { useEffect, useState } from 'react'
import { Modal, Table, Tag, Avatar, Rate } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { IStateCmt, IStateProduct } from '../../../common/redux/type'
import { fetchAllComment } from '../../../features/comment'
import { ColumnsType } from 'antd/es/table'
import { ICmt } from '../../../common/products'
import { format } from 'date-fns'
import HeaderTable from '../../../components/Admin/Layout/HeaderTable'
import { fetchAllProducts } from '../../../features/product'

const CommentManager = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [currentPage, setCurrentPage] = useState(1)
  const [Search, setSearch] = useState('')

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const {
    comments: comment,
    loading,
    totalDocs,
  } = useSelector((state: IStateCmt) => state.comment)
  const { products } = useSelector((state: IStateProduct) => state.product)
  useEffect(() => {
    dispatch(
      fetchAllComment({ page: currentPage, pageSize: 10, search: Search }),
    )
    dispatch(fetchAllProducts({ page: 0, pageSize: 0, searchKeyword: '' }))
  }, [dispatch, currentPage, Search])
  const getProductName = (shoeId: string) => {
    const product = products.find((product) => product._id === shoeId)
    return product ? product.name : 'N/A'
  }
  const [isModalOpen, setIsModalOpen] = useState(false)

  const columns: ColumnsType<ICmt> = [
    {
      title: 'No.',
      dataIndex: 'index',
      render: (_, __, index) => index + 1,
      align: 'right',
    },
    {
      title: 'Product Name',
      dataIndex: 'shoeId',
      render: (shoeId) => getProductName(shoeId),
    },
    {
      title: 'User',
      dataIndex: 'userId',
      render: (userId) => (
        <span>
          <Avatar src={userId.avt?.url} alt={userId.userName} />
          {userId.userName}
        </span>
      ),
    },
    {
      title: 'content',
      dataIndex: 'content',
    },
    {
      title: 'likes',
      dataIndex: 'likes',
      render: (likes) => likes.length,
      sorter: (a, b) => a.likes!.length - b.likes!.length,
    },
    {
      title: 'rating',
      dataIndex: 'rating',
      render: (rate) => {
        return <Rate disabled defaultValue={rate} />
      },
    },
    {
      title: 'parentId',
      align: 'center',
      dataIndex: 'parentId',
      render: (parentId) => {
        const correspondingComment = comment.find(
          (cmt) => cmt._id === parentId?._id,
        )

        return (
          <>
            <Tag color={parentId ? 'blue' : 'green'}>
              {parentId
                ? `Reply Comment: ${correspondingComment?.content || 'N/A'}`
                : 'Comment'}
            </Tag>
          </>
        )
      },
    },

    {
      title: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (updatedAt: string | null | undefined) =>
        updatedAt ? format(new Date(updatedAt), ' HH:mm:ss dd-MM-yyyy') : 'N/A',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      render: (createdAt: string | null | undefined) =>
        createdAt ? format(new Date(createdAt), ' HH:mm:ss dd-MM-yyyy') : 'N/A',
    },
    // {
    //   title: "action",
    //   key: "action",
    //   align: "center",
    //   render: (_, record) => (
    //     <Space>
    //       <Tooltip title={"edit"}>
    //         <Button type="link" onClick={() => toggleModal(record)}>
    //           <EditOutlined />
    //         </Button>
    //       </Tooltip>
    //       <Tooltip title={"delete"}>
    //         <Button type="link" onClick={() => deleteComment(record)}>
    //           <DeleteOutlined />
    //         </Button>
    //       </Tooltip>
    //     </Space>
    //   ),
    // },
  ]

  // const toggleModal = (record: ICmt) => {
  //   console.log(record);
  // };

  // const deleteComment = (record: ICmt) => {
  //   console.log(record);
  // };
  const searchCmt = (value: string) => {
    console.log(value)
    setSearch(value)
  }
  return (
    <>
      <HeaderTable
        showModal={() => setIsModalOpen(true)}
        onSubmitt={(value) => searchCmt(value)}
        name={'Comment'}
      />
      {loading === 'pending' ? (
        <div className="flex justify-center items-center mt-16">
          <LoadingOutlined style={{ fontSize: 24 }} spin />
        </div>
      ) : (
        <>
          <Table
            style={{ marginTop: '15px' }}
            columns={columns}
            dataSource={comment}
            bordered
            size="small"
            pagination={{
              current: currentPage,
              total: totalDocs,
              showTotal: (total) => ` ${total} items`,
              onChange: handlePageChange,
            }}
          />
        </>
      )}
      <Modal
        title="Create new comment"
        visible={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        maskClosable={false}
        destroyOnClose={true}
      >
        Create Comment
      </Modal>
    </>
  )
}

export default CommentManager
