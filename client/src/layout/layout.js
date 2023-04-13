import { Outlet } from "react-router-dom";
import Header from "./header";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};
export default Layout;
