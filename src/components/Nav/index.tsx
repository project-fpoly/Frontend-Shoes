import { useEffect } from "react";
import { SiJordan } from "react-icons/si";
import { Popover, Menu, Avatar, ConfigProvider, Badge } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { SiNike } from "react-icons/si";
import type { MenuProps } from "antd";

const NavBar = () => {
  const content = (
    <div>
      hrhrhr
      <p>login</p>
      <p>logout</p>
    </div>
  );
  const items: MenuProps["items"] = [
    {
      label: <h1 className="font-bold">New & Features</h1>,
      key: "mail",
    },
    {
      label: <h1 className="font-bold">Men</h1>,
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

        <div className="flex fixed bg-white w-full left-1/2  -translate-x-1/2  justify-evenly z-20">
          <div className="flex gap-[270px]">
            <SiNike className="hover:opacity-75" size={50} />

            <Menu
              className="flex w-[800px] pl-10 "
              mode="horizontal"
              //   onClick={onClick}
              //   selectedKeys={[current]}
              items={items}
            />

            <Badge count={5}>
              <ShoppingCartOutlined sizes={"large"} />
            </Badge>
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
