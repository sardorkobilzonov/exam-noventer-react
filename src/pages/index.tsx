import { Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth";
import Login from "./login/Login";
import Profile from "./profile/Profile";
import Layout from "./layout/Layout";
import Dashboard from "./dashboard/Dashboard";
import Employees from "./employees/Employees";
import Attendance from "./attendance/Attendance";
import Report from "./report/Report";
import Clients from "./clients/Clients";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />}>
              <Route path="profile" element={<Profile />} />
              <Route path="employees" element={<Employees />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="report" element={<Report />} />
              <Route path="clients" element={<Clients />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default MainRouter;
