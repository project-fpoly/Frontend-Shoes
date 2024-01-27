import { GrTransaction } from "react-icons/gr";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { IProduct } from "../../../common/products";
import Card from "./Cards";
interface Props {
  shoes: IProduct[];
  hideFilter: boolean;
  setHideFilter: any;
}

const ListProduct = (props: Props) => {
  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  const { shoes, hideFilter, setHideFilter } = props;

  return (
    <>
      <span className="flex gap-5 top-[8rem] absolute right-5">
        <p
          onClick={() => setHideFilter(!hideFilter)}
          className="flex gap-2 cursor-pointer "
        >
          {hideFilter ? "Hide fillter" : "Show filter"}
          <button>
            <GrTransaction className="mt-1" size={20} />
          </button>
        </p>
        <Dropdown
          className="cursor-pointer"
          menu={{ items }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>Sort by</Space>
          </a>
        </Dropdown>
      </span>
      <div>
        <Card shoes={shoes} />
      </div>
    </>
  );
};

export default ListProduct;
