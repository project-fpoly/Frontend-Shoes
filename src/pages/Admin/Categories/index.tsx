import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { Button, Table, Tooltip, Image, Modal } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import {
  fetchAllCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} from '../../../features/category'
import { ICategory } from '../../../common/category'
import { IStateCategory } from '../../../common/redux/type'
import FormCategory from '../../../components/Admin/Categories'
import HeaderTable from '../../../components/Admin/Layout/HeaderTable'
const CategoriesManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [categoriesState, setCategories] = useState<ICategory>()
  const [currentPage, setCurrentPage] = useState(1)
  const [Search, setSearch] = useState('')

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const { categories, loading, totalDocs } = useSelector(
    (state: IStateCategory) => state.category,
  )

  useEffect(() => {
    dispatch(
      fetchAllCategories({ page: currentPage, limit: 10, keyword: Search }),
    )
  }, [dispatch, currentPage, Search])
  const handleCreateCategory = (newCategory: ICategory) => {
    dispatch(createCategory(newCategory))
    setIsModalOpen(false)
  }
  const handleUpdateCategory = (newCategory: ICategory) => {
    dispatch(
      updateCategory({ id: categoriesState?._id as string, newCategory }),
    )
    setIsModalUpdateOpen(false)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const toggleModal = (category: ICategory) => {
    setIsModalUpdateOpen(!isModalUpdateOpen)
    setCategories(category)
  }

  const defaultValue = {
    _id: '',
    name: 'Tên danh mục',
    description: 'Mô tả của danh mục',
    imageUrl:
      'ahihi',
    status: 'active',
    viewCount: 123,
  }
  const Value = {
    name: categoriesState?.name ? categoriesState?.name : 'Tên danh mục',
    description: categoriesState?.description ? categoriesState?.description : 'Mô tả của danh mục',
    imageUrl:
      categoriesState?.imageUrl ||
      'ahihi',
    status: categoriesState?.status || 'active',
    viewCount: categoriesState?.viewCount || 123,
  }

  const removeCategory = (record: ICategory) => {
    Modal.confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you want to delete this category?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        if (!record._id) return
        record._id && dispatch(deleteCategory(record._id))
      },
      onCancel() {},
    })
  }

  const columns: ColumnsType<ICategory> = [
    {
      title: 'No.',
      dataIndex: 'index',
      render: (_, __, index) => index + 1,
      align: 'right',
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      render: (imageUrlData) => (
        <Image src={imageUrlData?.url} width={50} /> // Truy cập vào thuộc tính 'url'
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'ViewCount',
      dataIndex: 'viewCount',
    },
    {
      title: ' Products',
      dataIndex: 'products',
      key: 'product',
      render: (products) => (
        <div>{products.length}</div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip title={'edit'}>
            <Button type="link">
              <EditOutlined onClick={() => toggleModal(record)} />
            </Button>
          </Tooltip>
          <Tooltip title={'delete'}>
            <Button type="link" onClick={() => removeCategory(record)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ]
  const searchCategory = (value: string) => {
    setSearch(value)
    // Gọi hàm searchCategory với giá trị tìm kiếm
    console.log(value)
  }
  return (
    <div>
      <HeaderTable
        showModal={() => setIsModalOpen(true)}
        onSubmitt={searchCategory}
        name={'Category'}
      />
      {loading === 'pending' ? (
        <div className="flex justify-center items-center mt-16">
          <LoadingOutlined style={{ fontSize: 24 }} spin />
        </div>
      ) : (
        <Table
          style={{
            marginTop: '15px',
          }}
          columns={columns}
          dataSource={categories}
          bordered
          size="small"
          pagination={{
            current: currentPage,
            total: totalDocs,
            showTotal: (total) => ` ${total} items`,
            onChange: handlePageChange,
          }}
        />
      )}
      <Modal
        title={'Create new Category'}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        maskClosable={false}
        destroyOnClose={true}
      >
        <FormCategory
          mode={'create'}
          onSubmit={handleCreateCategory}
          {...defaultValue}
        />
      </Modal>
      <Modal
        title={'Update Category'}
        open={isModalUpdateOpen}
        onOk={() => setIsModalUpdateOpen(false)}
        onCancel={() => setIsModalUpdateOpen(false)}
        destroyOnClose={true}
        footer={null}
      >
        <FormCategory
          mode={'update'}
          onSubmit={handleUpdateCategory}
          {...Value}
        />
      </Modal>
    </div>
  )
}

export default CategoriesManager
