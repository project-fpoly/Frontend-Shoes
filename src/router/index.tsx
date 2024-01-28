import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/Mainlayout";
import Home from "../pages/Home";
import GreaUp from "../pages/GreaUp";
import DetailShoe from "../pages/Detail";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/greaup" element={<GreaUp />} />
          <Route path="/detail/:id" element={<DetailShoe />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
