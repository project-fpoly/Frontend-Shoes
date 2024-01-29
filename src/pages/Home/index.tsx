import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../features/product";
import { AppDispatch } from "../../redux/store";
import { IStateProduct } from "../../common/redux/type";
import style from "../Home/index.module.scss";
const Home = () => {
  // dispact một action
  const dispact = useDispatch<AppDispatch>();
  useEffect(() => {
    dispact(fetchAllProducts());
  }, []);

  /// chọc vào kho lấy db
  const products = useSelector(
    (state: IStateProduct) => state.product.products
  );
  const loading = useSelector((state: IStateProduct) => state.product.loading);

  return (
    <div className={style.container}>
      <div>home</div>
      <div>home</div>
      <div>home</div>
      <div>home</div>
      <div>home</div>
    </div>
  );
};
export default Home;
