import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/Mainlayout";
import Home from "../pages/Home";

import GreaUp from "../pages/GreaUp";
import DetailShoe from "../pages/Detail";
import SizeGuide from "../pages/SizeGuide";
import SigninPage from "../pages/client/signin";
import SignupPage from "../pages/client/signup";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/greaup" element={<GreaUp />} />
          <Route path="/detail/:id" element={<DetailShoe />} />
          <Route path="/sizeguide" element={<SizeGuide />} />
        </Route>

        <Route path="signin" element={<SigninPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
      </Routes>
    </>
  );
};

export default Router;
