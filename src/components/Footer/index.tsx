import {
  TwitterOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { IoLocationOutline } from "react-icons/io5";
import { Avatar } from "antd";
import clsx from "clsx";
import style from "./index.module.scss";
const Footer = () => {
  return (
    <div className="bg-black ">
      <div
        className={clsx(
          "py-16 flex justify-around cursor-pointer",
          style.footer
        )}
      >
        <div className={clsx("flex gap-32 flex-row", style.infoFooter)}>
          <div className="text-base flex flex-col gap-3 text-white">
            <p>FIND A STORE</p>
            <p>BECOME A MEMBER</p>
            <p>Send Us Feedback</p>
          </div>
          <div>
            <p className="text-base text-white">GET HELP</p>
            <p className="text-gray-400 hover:text-white">Order Status</p>
            <p className="text-gray-400 hover:text-white">Delivery</p>
            <p className="text-gray-400 hover:text-white">Returns</p>
            <p className="text-gray-400 hover:text-white">Payment Options</p>
            <p className="text-gray-400 hover:text-white">Contact Us</p>
          </div>
          <div>
            <p className="text-base text-white">About nike</p>
            <p className="text-gray-400 hover:text-white">News</p>
            <p className="text-gray-400 hover:text-white">Careers</p>
            <p className="text-gray-400 hover:text-white">Investors</p>
            <p className="text-gray-400 hover:text-white">Sustainability</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Avatar
            className="bg-gray-400 hover:bg-white"
            icon={
              <TwitterOutlined className="text-black hover:text-gray-400 cursor-pointer" />
            }
          />{" "}
          <Avatar
            className="bg-gray-400 hover:bg-white"
            icon={
              <FacebookOutlined className="text-black hover:text-gray-400 cursor-pointer" />
            }
          />{" "}
          <Avatar
            className="bg-gray-400 hover:bg-white"
            icon={
              <YoutubeOutlined className="text-black hover:text-gray-400 cursor-pointer" />
            }
          />{" "}
          <Avatar
            className="bg-gray-400 hover:bg-white"
            icon={
              <InstagramOutlined className="text-black hover:text-gray-400 cursor-pointer  " />
            }
          />
        </div>
      </div>

      <div className={clsx("flex justify-around py-6", style.detailFooter)}>
        <span className="text-sm">
          <span className=" flex gap-3 ">
            <p className="mt-1 text-white">
              <IoLocationOutline />
            </p>
            <p className="text-white">Vietnam</p>
            <p className="text-gray-400">
              © 2023 Nike, Inc. All Rights Reserved
            </p>
          </span>
        </span>
        <span
          className={clsx(
            "text-sm text-gray-400 flex gap-6",
            style.aboutDtFooter
          )}
        >
          <p>Guides</p>
          <p>Terms of Sale</p>
          <p>Terms of Use</p>
          <p>Nike Privacy Policy</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
