import Popular from "../../components/Home/Popular";
import Banner from "../../components/Home/Banner";
import Featured from "../../components/Home/Featured";
import Trending from "../../components/Home/Trending";
import MerchMenu from "../../components/Home/MerchMenu";

const Home = () => {

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