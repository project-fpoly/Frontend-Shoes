import { Button, Space, Typography } from "antd";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <Space direction="vertical" style={{ width: "100%"}}>
      <Typography className="home_title">Men</Typography>
      <img
        src="../../../bannermen.jpg"
        alt=""
        className="w-full"
        style={{ height: 600 }}
      />

        <Space direction="vertical" style={{width: '100%', textAlign: 'center'}}>
            <Typography className="mt-5" style={{ fontSize: 75, fontFamily: 'fantasy'}}>
                LEAVE YOURSELF IN THE DUST
            </Typography>

            <Typography className="mb-5 text-lg">Marathon speed to push beyond what you thought possible.</Typography>

            <Link to={''} className="text-white bg-black font-medium text-medium px-4 py-2 leading-4 rounded-full mt-5">
                Shop
            </Link>
        </Space>
    </Space>
  );
};

export default Banner;
