import { Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth";
import Login from "./login/Login";
import Profile from "./profile/Profile";
import Layout from "./layout/Layout";
import Dashboard from "./dashboard/Dashboard";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default MainRouter;
