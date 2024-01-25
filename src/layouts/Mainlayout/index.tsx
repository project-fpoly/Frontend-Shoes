import { Outlet } from "react-router-dom";
import NavBar from "../../components/Nav";
import Footer from "../../components/Footer";

function MainLayout() {
  return (
    <>
      <div className="bg-white ">
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
}

export default MainLayout;
