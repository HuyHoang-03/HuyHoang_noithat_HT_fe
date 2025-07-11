import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/admin/HeaderAdmin";

const Dashboard = () => {
  return (
    <div>
      <HeaderAdmin />
      <div className="mx-5 mt-4">
      <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
