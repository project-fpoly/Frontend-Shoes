import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/Mainlayout";
import Home from "../pages/Home";
import Demo from "../pages/DEMO";
import SigninPage from "../pages/client/signin";
import SignupPage from "../pages/client/signup";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="demo" element={<Demo />} />
        </Route>

        <Route path="signin" element={<SigninPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
      </Routes>
    </>
  );
};

export default Router;
