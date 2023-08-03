import { useRef, useState } from "react";
import "./popup.css";
import { AiFillCloseCircle } from "react-icons/ai";
import logo from "../assets/almanara/logo.png";
import { useAuth } from "../Context/AuthContext";
const LoginPopup = ({ closePopup }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loginPage, setLoginPage] = useState(true);
  const [error, setError] = useState("");
  const { login, signup } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      closePopup();
    } catch (error) {
      setError("Incorrect email or password");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await signup(emailRef.current.value, passwordRef.current.value);
      setLoginPage(!loginPage);
      localStorage.setItem("name", JSON.stringify(nameRef.current.value));
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  if (loginPage) {
    return (
      <div dir="rtl" className="loginPopup">
        <div dir="rtl" className="loginPopup_inner text-center">
          <AiFillCloseCircle
            onClick={closePopup}
            dir="rtl"
            className="close-btn-popup"
          />
          <div
            name="Contact"
            dir="rtl"
            className="text-white cotainer max-w-[1000px] mx-auto  flex flex-col"
            data-aos-anchor-placement="fade-right"
          >
            <div dir="rtl" className="h-screen flex flex-col ">
              <div dir="rtl" className=" pt-0 "></div>
              <form className="l-form">
                {error && (
                  <div
                    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span class="font-medium">{error}</span>
                  </div>
                )}
                <div dir="rtl" className=" flex justify-center mb-5">
                  <img src={logo} alt="almanara" width={100} />
                  <p
                    dir="rtl"
                    className="text-2xl font-bold inline border-b-4 border-yellow-400 text-left popup-header  "
                    style={{ color: "black" }}
                  >
                    تسجيل الدخول
                  </p>
                </div>
                <label dir="rtl" className=" mb-6 ">
                  <input
                    ref={emailRef}
                    name="email"
                    type="email"
                    dir="rtl"
                    className="
              h-10
              px-5
              l-input
                    border-red-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
                    placeholder="البريد الإلكتروني"
                  />
                </label>
                <label dir="rtl" className=" mb-6 ">
                  <input
                    ref={passwordRef}
                    name="password"
                    type="password"
                    dir="rtl"
                    className="
              h-10
              px-5
              l-input
                    border-red-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
                    placeholder="كلمةالسر"
                  />
                </label>
                <button
                  onClick={handleLogin}
                  type="button"
                  className="mt-10  focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  style={{ backgroundColor: "#F55839" }}
                >
                  تسجيل الدخول
                </button>
              </form>
              <a
                onClick={() => {
                  setLoginPage(!loginPage);
                }}
              >
                <p style={{ color: "blue", cursor: "pointer" }}>
                  إذا كنت جديد سجل أولا!
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div dir="rtl" className="loginPopup">
        <div dir="rtl" className="loginPopup_inner text-center">
          <AiFillCloseCircle
            onClick={closePopup}
            dir="rtl"
            className="close-btn-popup"
          />
          <div
            name="Contact"
            dir="rtl"
            className="text-white cotainer max-w-[1000px] mx-auto  flex flex-col"
            data-aos-anchor-placement="fade-right"
          >
            <div dir="rtl" className="h-screen flex flex-col ">
              <div dir="rtl" className=" pt-0 "></div>
              <form className="l-form">
                <h1 style={{ color: "red" }}>{error}</h1>

                <div dir="rtl" className=" flex justify-center mb-5">
                  <img src={logo} alt="almanara" width={100} />
                  <p
                    dir="rtl"
                    className="text-2xl font-bold inline border-b-4 border-yellow-400 text-left popup-header  "
                    style={{ color: "black" }}
                  >
                    التسجيل
                  </p>
                </div>
                <label dir="rtl" className=" mb-6 ">
                  <input
                    ref={nameRef}
                    name="user_name"
                    type="text"
                    dir="rtl"
                    className="
              h-10
              px-5
              l-input
                    border-red-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
                    placeholder="إسمك"
                  />
                </label>
                <label dir="rtl" className=" mb-6 ">
                  <input
                    ref={emailRef}
                    name="email"
                    type="email"
                    dir="rtl"
                    className="
              h-10
              px-5
              l-input
                    border-red-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
                    placeholder="البريد الإلكتروني"
                  />
                </label>
                <label dir="rtl" className=" mb-6 ">
                  <input
                    ref={passwordRef}
                    name="password"
                    type="password"
                    dir="rtl"
                    className="
              h-10
              px-5
              l-input
                    border-red-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
                    placeholder="كلمةالسر"
                  />
                </label>
                <button
                  onClick={handleSignUp}
                  type="button"
                  className="mt-10 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  style={{ backgroundColor:"#F55839" }}
                >
                  التسجيل
                </button>
              </form>

              <p
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  setLoginPage(!loginPage);
                }}
              >
                لديك حساب بالفعل؟
                <a></a>
                تسجيل الدخول
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default LoginPopup;
