import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import style from "./index.module.scss";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Gender", "sub1", "", [getItem("Option 5", "5")]),

  getItem("Shop by price", "sub2", "", [
    getItem("Option 25", "25"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),

  getItem("Sale & offers", "sub4", "", [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),

  getItem("Size", "Size", "", [getItem("Option h", "sad")]),
  getItem("Colour", "Colour", "", [getItem("Option 7", "17")]),
  getItem("Brand", "Brand", "", [getItem("Option 1b1", "s11")]),
  getItem("Icon", "Icon", "", [getItem("Option 12312", "121")]),
  getItem("Technology", "Technology", "", [getItem("Option 13", "13")]),
  getItem("Shoe Height", "Shoe Height", "", [getItem("Option 14", "14")]),
  getItem("Material", "Material", "", [getItem("Option 15", "15")]),
  getItem("Benefits", "Benefits", "", [getItem("Option 16", "16")]),
];

interface Props {
  hideFilter: boolean;
}
const Sidebar = (props: Props) => {
  const { hideFilter } = props;
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <>
      <div className={hideFilter ? "" : "hidden"}>
        <h1>Name </h1>
        <Menu
          className={style.sideBar}
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </div>
    </>
  );
};

export default Sidebar;
