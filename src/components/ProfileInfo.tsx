import { LuSquareUser } from "react-icons/lu";
import { useGetCompanyQuery } from "../redux/api/company.api";
import { useProfileQuery } from "../redux/api/auth.api";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  const { data: user } = useProfileQuery({});
  const { data } = useGetCompanyQuery({});
  console.log(data);

  return (
    <>
      <section className="max-w-[800px]  mt-[24px] p-[20px] rounded-[10px] bg-white">
        <div>
          <h2 className="text-[12px] font-semibold text-[#192A3E] flex items-center gap-[4px]">
            <LuSquareUser className="text-[#8A94AD]" /> Ma'lumotlar
          </h2>
          <div className="flex gap-[50px]">
            <ul className="flex gap-[10px] mt-[10px] flex-col">
              <li>
                <h3 className="text-[12px] font-semibold text-[#192A3E]">
                  Telefon raqam: +998939542111
                </h3>
              </li>
              <li>
                <h3 className="text-[12px] font-semibold text-[#192A3E]">
                  Email: {user?.email}
                </h3>
              </li>
              <li>
                <h3 className="text-[12px] font-semibold text-[#192A3E]">
                  Birthday: {user?.birth_date}{" "}
                </h3>
              </li>
              <li>
                <h3 className="text-[12px] font-semibold text-[#192A3E]">
                  Gender: {user?.gender === "male" ? "Erkak" : "Ayol"}
                </h3>
              </li>
            </ul>
            <ul className="flex gap-[10px] mt-[10px] flex-col">
              <li>
                <h3 className="text-[12px] font-semibold text-[#192A3E]">
                  {" "}
                  Kompaniya nomi: {data?.name}
                </h3>
              </li>
              <li>
                <h3 className="text-[12px] font-semibold text-[#192A3E]">
                  {" "}
                  INN: {data?.stir}
                </h3>
              </li>
              <li>
                <h3 className="text-[12px] font-semibold text-[#192A3E]">
                  Ro'yxatdan o'tgan sana: {data?.created_at}
                </h3>
              </li>
              <li>
                <h3 className="text-[12px] font-semibold text-[#192A3E]">
                  Lizensiya:{" "}
                  <Link to={`${data?.license_file}`}>Yuklab olish</Link>
                </h3>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileInfo;
