import { useEffect, useState } from "react";
import ListProduct from "../../components/GreaUp/Products";
import Sidebar from "../../components/GreaUp/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../features/product";
import { AppDispatch } from "../../redux/store";
import { IStateProduct } from "../../common/redux/type";

import { GrTransaction } from "react-icons/gr";
import { Dropdown, Space } from "antd";
import clsx from "clsx";
import LoadingSkelethon from "../../components/Loading/LoadingSkelethonProduct";
const GreaUp = () => {
  const dispact = useDispatch<AppDispatch>();

  const shoes = useSelector((state: IStateProduct) => state.product.products);
  const loading = useSelector((state: IStateProduct) => state.product.loading);

  useEffect(() => {
    dispact(fetchAllProducts());
    document.title = "Greaup";
  }, []);

  const [hideFilter, setHideFilter] = useState<boolean>(false);
  return (
    <>
      <span className={clsx("flex gap-5 mt-5  justify-end mr-5 mb-5 pt-12")}>
        <p
          onClick={() => setHideFilter(!hideFilter)}
          className="flex gap-2 cursor-pointer "
        >
          {hideFilter ? "Hide fillter" : "Show filter"}
          <button>
            <GrTransaction className="mt-1" size={20} />
          </button>
        </p>
        <Dropdown className="cursor-pointer" trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>Sort by</Space>
          </a>
        </Dropdown>
      </span>
      <div className="flex  mx-10 justify-center items-center">
        <div className="w-[auto] ">
          <Sidebar hideFilter={hideFilter} />
        </div>

        {loading === "pending" ? (
          <>
            <div className="flex justify-center items-center mt-16">
              <LoadingSkelethon></LoadingSkelethon>
            </div>
          </>
        ) : (
          <>
            <div className="w-[100%]  ">
              <ListProduct
                shoes={shoes}
                hideFilter={hideFilter}
                setHideFilter={setHideFilter as any}
              ></ListProduct>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GreaUp;
