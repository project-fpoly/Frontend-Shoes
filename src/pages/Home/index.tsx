import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "../../features/product";
import { AppDispatch } from "../../redux/store";
import Popular from "../../components/Home/Popular";
import Banner from "../../components/Home/Banner";
// import "./index.css"
import Featured from "../../components/Home/Featured";
import Trending from "../../components/Home/Trending";
import MerchMenu from "../../components/Home/MerchMenu";

const Home = () => {
  // dispact một action
  const dispact = useDispatch<AppDispatch>();
  useEffect(() => {
    dispact(fetchAllProducts());
  }, []);

  /// chọc vào kho lấy db
  // const products = useSelector(
  //   (state: IStateProduct) => state.product.products
  // );
  // const loading = useSelector((state: IStateProduct) => state.product.loading);

  return (

    <div className="px-10">

      <div className="flex justify-center mt-20 mb-1 items-center flex-col">
        <h2>Move, Shop, Customise & Celebrate With Us.</h2>
        <p>
          No matter what you feel like doing today, It’s better as a Member.
        </p>
        <a href="">Join us</a>
      </div>

      <Banner />
      <Featured />
      <Trending />
      <Popular />
      <MerchMenu />

    </div>
  );
};
export default Home;