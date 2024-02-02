import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"
import Search from "antd/es/input/Search"
import Title from "antd/es/typography/Title"
type IProps = {
    showModal: () => void;
    name:string
};

const HeaderTable=(props:IProps)=>{
    return(
        <Space direction="vertical">
        <Title level={3}>{props.name} Manager</Title>
        <Space direction="horizontal">
          <Search
            style={{ width: "30vw" }}
            placeholder={`Search ${props.name}`}
            enterButton={<SearchOutlined />}
          />
          <Button icon={<PlusOutlined />} onClick={props.showModal}>
            New
          </Button>
        </Space>
      </Space>
    )
}
export default HeaderTable