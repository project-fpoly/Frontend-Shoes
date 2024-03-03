import { SiJordan } from "react-icons/si";
import { Popover, Avatar, ConfigProvider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SiNike } from "react-icons/si";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import MenuNav from "./Menu";
import NavRight from "./NavRight";

const NavBar = () => {
  const content = (
    <div>
      {/* <p>login</p> */}
      <Link to="/signin">
        <h1 className="font-bold">Login</h1>
      </Link>
      <p>logout</p>
    </div>
  );

  const [showNav, setShowNav] = useState<boolean>(false);
  const [position, setPosition] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setPosition(true);
      } else {
        setPosition(false);
      }
    };
    const handleScrollTop = (e: any) => {
      if (e.deltaY === 100) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };
    window.addEventListener("wheel", handleScrollTop);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScrollTop);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              horizontalItemSelectedColor: "black",
            },
          },
        }}
      >
        <div className="flex justify-between px-16 py-4 bg-[#f5f5f5]">
          <Link to={"/"}>
            <SiJordan size={28} className="hover:opacity-70" />
          </Link>
          <div className="flex gap-3 cursor-pointer ">
            <Popover
              className="hover:opacity-70"
              content={content}
              title="Title"
            >
              Find a store
            </Popover>
            <span>|</span>
            <Popover
              className="hover:opacity-70"
              content={content}
              title="Help"
            >
              Help
            </Popover>
            <span>|</span>
            <Popover
              className="flex gap-2 hover:opacity-70"
              content={content}
              title="Account"
            >
              Hi, Thanh
              <Avatar size={30} icon={<UserOutlined />} />
            </Popover>
          </div>
        </div>

        <div
          className={clsx(
            "flex fixed bg-white w-full justify-evenly z-50",
            showNav ? "hidden" : "",
            position ? "top-0" : ""
          )}
        >
          <div className="flex justify-evenly py-2 mx-24 gap-[200px]">
            <Link to={"/"}>
              <SiNike className="hover:opacity-75" size={50} />
            </Link>
            <MenuNav></MenuNav>
            <NavRight></NavRight>
          </div>
        </div>

        {/* <div className="flex justify-center mt-20 items-center flex-col bg-[#f5f5f5]">
          <h2>Move, Shop, Customise & Celebrate With Us.</h2>
          <p>
            No matter what you feel like doing today, It’s better as a Member.
          </p>
          <a href="">Join us</a>
        </div> */}
      </ConfigProvider>
    </>
  );
};

export default NavBar;
