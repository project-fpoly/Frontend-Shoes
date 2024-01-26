import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/Mainlayout";
import Home from "../pages/Home";
import GreaUp from "../pages/GreaUp";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/gearup" element={<GreaUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
