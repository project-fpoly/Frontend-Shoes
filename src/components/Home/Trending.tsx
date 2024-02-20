import { Space, Typography } from "antd";
import "./index.css";

const Trending = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography className="home_title">Trending</Typography>
      <img
        src="../../../giay.gif"
        alt=""
        className="w-full"
        style={{ height: 700 }}
      />
    </Space>
  );
};

export default Trending;
