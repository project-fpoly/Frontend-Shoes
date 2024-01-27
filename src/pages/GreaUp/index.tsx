import { useEffect, useState } from "react";
import ListProduct from "../../components/GreaUp/Products";
import Sidebar from "../../components/GreaUp/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../features/product";
import { AppDispatch } from "../../redux/store";
import { IStateProduct } from "../../common/redux/type";
import LoadingProduct from "../../components/Loading/LoadingProduct";

const GreaUp = () => {
  const dispact = useDispatch<AppDispatch>();

  const shoes = useSelector((state: IStateProduct) => state.product.products);
  const loading = useSelector((state: IStateProduct) => state.product.loading);

  useEffect(() => {
    dispact(fetchAllProducts());
  }, []);
  const [hideFilter, setHideFilter] = useState<boolean>(false);
  return (
    <>
      <div className="flex mt-32 mx-10">
        <div className="w-[auto]">
          <Sidebar hideFilter={hideFilter} />
        </div>

        {loading === "pending" ? (
          <>
            <div className="flex justify-center items-center">
              <LoadingProduct></LoadingProduct>
            </div>
          </>
        ) : (
          <>
            <div className="w-[100%] ">
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
