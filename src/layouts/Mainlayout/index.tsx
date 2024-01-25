import { Outlet } from "react-router-dom";
import NavBar from "../../components/Nav";
import Footer from "../../components/Footer";

function MainLayout() {
  return (
    <>
      <div className="bg-white ">
        <NavBar></NavBar>
        <div className="min-h-[500px]">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default MainLayout;
