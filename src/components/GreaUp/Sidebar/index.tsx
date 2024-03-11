import React from "react";
import { ConfigProvider, MenuProps } from "antd";
import { Menu } from "antd";
import style from "./index.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { featchProductByGender, featchProductByPrice } from "../../../features/product";
import { genderFilterProducts } from "../../../services/productsQuery";
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
  getItem("Gender", "gender", "", [
    getItem("Men", "Men"),
    getItem("Women", "Women"),
  ]),

  getItem("Shop by price", "sub2", "", [
    getItem("Under 5,000,000", "Under"),
    getItem("Over 5,000,000đ", "Over"),
  ]),

  getItem("Sale & offers", "offers", "", [getItem("Sale", "9")]),

  getItem("Size", "sub4", "", [getItem("Option h", "sad")]),
  getItem("Colour", "sub58", "", [getItem("Option ss7", "a7")]),
  getItem("Brand", "sub6", "", [getItem("Option 1b1", "s11")]),
  getItem("Icon", "sub7", "", [getItem("Option 12312", "121")]),
  getItem("Technology", "sub8", "", [getItem("Option 13", "13")]),
  getItem("Shoe Height", "sub9", "", [getItem("Option 14", "14")]),
  getItem("Material", "sub10", "", [getItem("Option 15", "15")]),
  getItem("Benefits", "sub11", "", [getItem("Option 16", "16")]),
  getItem("Benefits", "sub12", "", [getItem("Option 17", "17")]),
  getItem("Benefits", "sub13", "", [getItem("Option 18", "18")]),
  getItem("Benefits", "sub14", "", [getItem("Option 19", "19")]),
  getItem("Benefits", "sub15", "", [getItem("Option 20", "20")]),
  getItem("Benefits", "sub16", "", [getItem("Option 21", "21")]),
  getItem("Benefits", "sub17", "", [getItem("Option 22", "22")]),
];

interface Props {
  hideFilter: boolean;
}
const Sidebar = (props: Props) => {
  const dispact = useDispatch<AppDispatch>();
  // const shoes = useSelector((state: IStateProduct) => state.product.products);
  const { hideFilter } = props;
  const onClick: MenuProps["onClick"] = (e) => {
    console.log(e.key)
    switch (e.key) {
       case "Men":
        dispact(featchProductByGender('nam'));
        break;
         case "Women":
        dispact(featchProductByGender('nữ'));
        break;
      case "Under":
        dispact(featchProductByPrice({ minPrice: 0, maxPrice: 500000 }));
        break;
      case "Over":
        dispact(
          featchProductByPrice({ minPrice: 500000, maxPrice: 999999999999999 })
        );
        break;
      default:
        break;
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            dangerItemActiveBg: "#fff2f0",
          },
        },
      }}
    >
      <>
        <div className={hideFilter ? "" : "hidden"}>
          <h1>Name </h1>
          <Menu
            className={style.sideBar}
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={[
              "sub1",
              "sub2",
              "sub3",
              "sub4",
              "sub5",
              "sub6",
              "sub7",
              "sub8",
              "sub9",
              "sub10",
              "sub11",
              "sub12",
              "sub13",
              "sub14",
              "sub15",
              "sub16",
              "sub17",
            ]}
            mode="inline"
            items={items}
          />
        </div>
      </>
    </ConfigProvider>
  );
};

export default Sidebar;
