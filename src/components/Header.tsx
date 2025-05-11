import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { BiSearch } from "react-icons/bi";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { PiDotsNineBold } from "react-icons/pi";
import { useProfileQuery } from "../redux/api/auth.api";

const Header = () => {
  const { data } = useProfileQuery({});

  return (
    <>
      <header className="px-[40px] py-[20px]  mx-auto w-full border-b border-[#E6E8F0]">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="" className="w-[30px] h-[30px]" />
            <h1 className="text-[25px] font-bold text-[#31374A] leading-[120%]">
              Noventer
            </h1>
          </Link>
          <form action="" className="relative w-[400px]">
            <input
              type="search"
              placeholder="Search"
              className="w-[400px] h-[34px] rounded-[100px] border border-[#CBD0DD] px-[16px]  outline-none indent-[14px]"
            />
            <button className="absolute left-[10px] top-[10px] text-[#8A94AD]">
              <BiSearch />
            </button>
          </form>
          <div className="flex items-center gap-4">
            <button className="text-[24px]">
              <IoSunnyOutline />
            </button>
            <button className="text-[24px]">
              <FaRegBell />
            </button>
            <button className="text-[24px]">
              <PiDotsNineBold />
            </button>
            <img
              src={data?.avatar}
              alt=""
              className="w-[40px] h-[40px] rounded-full"
            />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
