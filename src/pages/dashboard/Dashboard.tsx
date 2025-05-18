import { FiHome } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 pl-[27px] pr-[52px] py-[8px] text-nowrap ${
      isActive ? "text-[#3874FF]" : "text-black"
    }`;

  return (
    <>
      <div className="flex">
        <aside className="h-screen border-t border-r border-[#E6E8F0]">
          <div className="flex flex-col p-[16px]">
            <NavLink to="employees" className={linkClass}>
              <FiHome />
              Xodimlar ro'yxati
            </NavLink>
            <NavLink to="smena" className={linkClass}>
              <FiHome />
              Smenalar
            </NavLink>
            <NavLink to="clients" className={linkClass}>
              <FiHome />
              Mijozlar
            </NavLink>

          </div>
        </aside>
        <main className="bg-[#F5F7FA] w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
