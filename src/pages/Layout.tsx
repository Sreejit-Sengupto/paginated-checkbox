import { Outlet } from "react-router-dom";
import TopBar from "../components/topbar";
import DiscountBanner from "../components/discount-banner";

const Layout = () => {
  return (
    <div className="flex flex-col h-[100dvh]">
      <TopBar />
      <DiscountBanner />
      <Outlet />
    </div>
  );
};

export default Layout;
