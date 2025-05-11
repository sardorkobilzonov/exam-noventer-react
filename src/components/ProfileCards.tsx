import { CiCalendar, CiCoins1 } from "react-icons/ci";
import { TfiBlackboard } from "react-icons/tfi";

const ProfileCards = () => {
  return (
    <>
      <div className="flex items-center gap-[24px] mt-[24px]">
        <div className="w-[250px] h-[104px] rounded-[10px] relative flex items-center justify-center bg-white">
          <span className="absolute top-[10px] left-[10px] text-[#8A94AD] text-[18px]">
            <TfiBlackboard />
          </span>
          <div className="flex flex-col items-center">
            <p className="text-[10px]  text-[#90A0B7]">Vazifalar</p>
            <h3 className="text-[25px] text-[#323C47] font-bold">0</h3>
            <h2 className="text-[12px] text-[#323C47] font-medium tracking-[1%]">
              Group and individual
            </h2>
          </div>
        </div>
        <div className="w-[250px] h-[104px] rounded-[10px] relative flex items-center justify-center bg-white">
          <span className="absolute top-[10px] left-[10px] text-[#8A94AD] text-[18px]">
          <CiCoins1 />
          </span>
          <div className="flex flex-col items-center">
            <p className="text-[10px]  text-[#90A0B7]">Rasmiy oylik</p>
            <h3 className="text-[25px] text-[#323C47] font-bold">0</h3>
            <h2 className="text-[12px] text-[#323C47] font-medium tracking-[1%]">
              1 218 000 so'm
            </h2>
          </div>
        </div>
        <div className="w-[250px] h-[104px] rounded-[10px] relative flex items-center justify-center bg-white">
          <span className="absolute top-[10px] left-[10px] text-[#8A94AD] text-[18px]">
          <CiCalendar />
          </span>
          <div className="flex flex-col items-center">
            <p className="text-[10px]  text-[#90A0B7]">Norasmiy oylik</p>
            <h3 className="text-[25px] text-[#323C47] font-bold">0</h3>
            <h2 className="text-[12px] text-[#323C47] font-medium tracking-[1%]">
              1 218 000 so'm
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCards;
