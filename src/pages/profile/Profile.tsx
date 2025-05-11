import { GoChevronLeft } from "react-icons/go";
import { useProfileQuery } from "../../redux/api/auth.api";
import BalanceCard from '../../assets/Balance card.png'

const Profile = () => {
  const { data } = useProfileQuery({});

  console.log(data);

  return (
    <>
      <div className="w-full ml-[42px] mt-[16px] relative">
        <div className="flex items-center gap-[24px]">
          <button className="w-[32px] h-[32px] border border-[#E6E8F0] rounded-[8px] flex items-center justify-center text-[#8A94AD]">
            <GoChevronLeft />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-[16px] font-medium text-[#005EEB] tracking-[1%] px-[32px] py-[10px]">
              Profile
            </h1>
            <div className="w-full h-[2px] bg-[#005EEB]" />
          </div>
        </div>

        <div className="mt-[25px]">
          <div className="w-[800px] h-[204px] profile-hero pt-[59px] rounded-[12px] relative overflow-hidden">
            <div className="flex items-center gap-[14px]">
              <div className="w-[86px] h-[86px] rounded-[32px] flex items-center justify-center bg-white ml-[55px]">
                {data?.avatar ? (
                  <img src={data.avatar} alt="avatar" />
                ) : (
                  <h1 className="text-[42px] font-semibold text-[#005EEB]">
                    {data?.full_name?.charAt(0) ?? "A"}
                  </h1>
                )}
              </div>

              <div className="flex flex-col text-white">
                <h3 className="text-[12px] tracking-[1%]">Xush kelibsiz!</h3>
                <h1 className="text-[36px] font-bold tracking-[1%]">{data?.full_name ?? "Sheroz Turdiyev"}</h1>
                <span className="flex items-center justify-center w-[52px] h-[20px] bg-white rounded-[4px] mt-[4px]">
                  <p className="text-[12px] text-[#334D6E]">{data?.role ?? "Rahbar"}</p>
                </span>
              </div>
            </div>
                  <div className="absolute right-[29px] top-[35px]">
                    <img src={BalanceCard} alt="" />
                  </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
