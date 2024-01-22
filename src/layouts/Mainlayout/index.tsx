import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <h2>Layout</h2>
      <Outlet></Outlet>
    </>
  );
}

export default MainLayout;
