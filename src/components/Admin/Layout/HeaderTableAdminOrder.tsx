import { SearchOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import Search from 'antd/es/input/Search'
import Title from 'antd/es/typography/Title'

type IProps = {
  showModal: () => void
  name: string
  onSubmitt: (value: string) => void
}

const HeaderTableAdminOrder = (props: IProps) => {
  const handleSearch = (value: string) => {
    props.onSubmitt(value)
  }

  return (
    <Space direction="vertical">
      <Title level={3}>{props.name} Manager</Title>
      <Space direction="horizontal">
        <Search
          style={{ width: '30vw' }}
          placeholder={`Search order for Tracking number, full name, email, address and phone number...`}
          onSearch={handleSearch}
          enterButton={
            <>
              <SearchOutlined className=" text-white hover:text-white" />
            </>
          }
        />
      </Space>
    </Space>
  )
}

export default HeaderTableAdminOrder
