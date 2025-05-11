import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginPhoto from "../../assets/loginPhoto.png";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/auth.api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate()
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement; 
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    login(data).then((res) => {
      localStorage.setItem('access_token', res?.data?.data?.tokens?.access)
      navigate('/profile')
    });


    form.reset();
  };

  return (
    <>
      <main className="flex max-h-screen overflow-hidden">
        <aside className="min-w-[900px] h-screen">
          <img
            src={loginPhoto}
            alt=""
            className="w-[900px] h-full object-top object-cover"
          />
        </aside>
        <section className="flex items-center justify-center w-full bg-[#F5F7FA]">
          <div className="flex items-center justify-center flex-col gap-4">
            <img src={logo} alt="" className="w-[58px] h-[58px] " />
            <h1 className="text-[20px] font-bold text-[#222834] leading-[120%] tracking-[-3%]">
              NovEnter
            </h1>
            <p className="text-[#525B75] text-[16px] leading-[120%]">
              Crm tizim bilan biznesingizni rivojlantiring
            </p>
            <form action="" className="w-[332px] mt-[32px]" onSubmit={handleLogin}>
              <input
                type="text"
                name="phone_number"
                id="email"
                className="py-[11px] px-[16px] border-[#CBD0DD] border-[1px] rounded-[6px] w-full outline-0"
                placeholder="Telefon raqamingizni kiriting"
              />

              <div className="relative w-full h-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="py-[11px] px-[16px] border-[#CBD0DD] border-[1px] rounded-[6px] w-full mt-2 outline-0"
                  placeholder="Parolingizni kiriting"
                />
                <span
                  className="absolute top-6 right-3 cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <FaEye className="text-gray-500" />
                  ) : (
                    <FaEyeSlash className="text-gray-500" />
                  )}
                </span>
              </div>

              <button type="submit" className="w-full bg-[#3874FF] text-white py-[11px] rounded-[6px] mt-4">
                Tizimga kirish
              </button>
              <Link
                to="/register"
                className="w-full bg-transparent text-[#3874FF] py-[11px] rounded-[6px]  block text-center"
              >
                Ro'yxatdan o'tish
              </Link>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;