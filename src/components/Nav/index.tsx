import { SiJordan } from "react-icons/si";
import { Popover, Menu, Avatar, ConfigProvider, Badge } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { SiNike } from "react-icons/si";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

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
  const items: MenuProps["items"] = [
    {
      label: (
        <Link to="/">
          <h1 className="font-bold">New & Features</h1>
        </Link>
      ),
      key: "mail",
    },
    {
      label: (
        <Link to="/demo">
          <h1 className="font-bold">Men</h1>
        </Link>
      ),
      key: "app",
    },
    {
      label: <h1 className="font-bold">Women</h1>,
      key: "SubMenu",
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:3",
            },
            {
              label: "Option 4",
              key: "setting:4",
            },
          ],
        },
      ],
    },
    {
      label: <h1 className="font-bold">Kids</h1>,
      key: "Kids",
    },
    {
      label: <h1 className="font-bold">Sale</h1>,
      key: "Sale",
    },
    {
      label: <h1 className="font-bold">Customise</h1>,
      key: "Customise",
    },
    {
      label: <h1 className="font-bold">SNKRS</h1>,
      key: "SNKRS",
    },
  ];

  const [showNav, setShowNav] = useState<boolean>(false);
  const [position, setPosition] = useState<boolean>(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setPosition(true);
      } else {
        setPosition(false);
      }

      // window.scrollY > 100 ? setShowNav(true) : setShowNav(false);
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
  }, []);

  console.log(position);

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
        <div className="flex justify-between px-16 py-5">
          <SiJordan size={28} className="hover:opacity-70" />
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
            "flex fixed bg-white w-full justify-evenly z-20",
            showNav ? "hidden" : "",
            position ? "top-0" : ""
          )}
        >
          <div className="flex gap-[270px]">
            <SiNike className="hover:opacity-75" size={50} />

            <Menu
              className="flex w-[800px] pl-10 "
              mode="horizontal"
              items={items}
            />

            <ShoppingCartOutlined sizes={"small"} />
          </div>
        </div>

        <div className="flex justify-center mt-20 items-center flex-col">
          <h2>Move, Shop, Customise & Celebrate With Us.</h2>
          <p>
            No matter what you feel like doing today, It’s better as a Member.
          </p>
          <a href="">Join us</a>
        </div>
      </ConfigProvider>
    </>
  );
};

export default NavBar;
