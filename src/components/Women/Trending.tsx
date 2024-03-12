import { Button, Space, Typography } from "antd";
import { Link } from "react-router-dom";

const Trending = () => {
  return (
    <Space direction="vertical" style={{ width: "100%"}}>
      <Typography className="home_title">Trending</Typography>
      <img
        src="../../../bannerwomen.jpg"
        alt=""
        className="w-full"
        style={{ height: 700 }}
      />

        <Space direction="vertical" style={{width: '100%', textAlign: 'center'}}>
            <Typography className="mt-5" style={{ fontSize: 75, fontFamily: 'fantasy'}}>
                NIKE V2K RUN
            </Typography>

            <Typography className="mb-5 text-lg">Add a twist to your style with a silhouette inspired by retro running designs.</Typography>

            <Link to={''} className="text-white bg-black font-medium text-medium px-4 py-2 leading-4 rounded-full mt-5">
                Shop
            </Link>
        </Space>
    </Space>
  );
};

export default Trending;
