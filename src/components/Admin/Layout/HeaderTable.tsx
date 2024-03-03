import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";

type IProps = {
  showModal: () => void;
  name: string;
  onSubmitt: (value: string) => void;
};

const HeaderTable = (props: IProps) => {
  const handleSearch = (value: string) => {
    props.onSubmitt(value);
  };

  return (
    <Space direction="vertical">
      <Title level={3}>{props.name} Manager</Title>
      <Space direction="horizontal">
        <Search
          style={{ width: "30vw" }}
          placeholder={`Search ${props.name}`}
          onSearch={handleSearch}
          enterButton={<SearchOutlined />}
        />
        <Button icon={<PlusOutlined />} onClick={props.showModal}>
          New
        </Button>
      </Space>
    </Space>
  );
};

export default HeaderTable;
