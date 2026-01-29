import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="container py-4"> 
    <Outlet />
  </div>
);

export { Layout };