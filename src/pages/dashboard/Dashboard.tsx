import { FiHome } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  

  return (
    <>
      <div className="flex">
        <aside className=" h-screen border-t border-r border-[#E6E8F0]">
         <div className="flex flex-col p-[16px]">
         <NavLink to="profile" className='flex items-center gap-2 pl-[27px] pr-[52px] py-[8px] text-nowrap'>
            <FiHome />
            Xodimlar ro'yxati
          </NavLink>
          <NavLink to="profile" className='flex items-center gap-2 pl-[27px] pr-[52px] py-[8px] text-nowrap'>
            <FiHome />
            Xodimlar davomati
          </NavLink>{" "}
          <NavLink to="profile" className='flex items-center gap-2 pl-[27px] pr-[52px] py-[8px] text-nowrap'>
            <FiHome />
            Mijozlar
          </NavLink>{" "}
          <NavLink to="profile" className='flex items-center gap-2 pl-[27px] pr-[52px] py-[8px] text-nowrap'>
            <FiHome />
            Oylik hisobot
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
