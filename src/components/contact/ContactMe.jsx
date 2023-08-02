import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "./contact.css";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import MyChatbot from "../Chatbot/MyChatbot";

const ContactMe = ({ children }) => {
  const { mode } = useSelector((state) => state.darkMode);

  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [massege, setMassege] = useState("");

  const handleValue = (e) => {
    if (email.includes("@") && name) {
      emailjs
        .sendForm(
          "service_yyz7c43",
          "template_chzwj99",
          form.current,
          "HI2yON0y98XYnchtZ"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      Swal.fire(
        "تم إستلام رسالتك بنجاح",
        "Thanke You <b style=color:red;> " +
          name +
          " </b>for contacting me and I will reply to you as soon as possible Inashalla",

        "success"
      );
      clearInputs();
    } else {
      Swal.fire({
        icon: "error",
        title: "أوووبس",
        text: "تأكد أنك قمت بإدخال اسمك وبريدك بشكل صحيح",
        footer: "",
      });
    }
  };
  const clearInputs = () => {
    setName("");
    setEmail("");
    setMassege("");
  };
  return (
    <div
      name="Contact"
      className="text-white cotainer max-w-[1000px] mx-auto p-4 flex flex-col"
      data-aos-anchor-placement="fade-right"
    >
      <div
        className="h-screen flex flex-col 
      items-center justify-center "
      >
        <div className="mb-3 pt-0">
          <div className="text-center">
            <p
              className="text-4xl font-bold inline border-b-4 border-yellow-400 text-center  "
              style={{ color: mode ? "white" : "black" }}
            >
            إتصل بنا
            </p>
            <p
              className="py-6 text-1xl"
              style={{ color: mode ? "white" : "black" }}
            >
إذا كانت لديك أي شكوي يمكنك كتابة ماتريد وإرساله إلينا وسوف نقوم بالرد عليك في أسرع وقت            </p>
            <p
              className=" text-1xl text-grey-700"
              style={{ color: mode ? "white" : "black" }}
            >
              Mobile Number : +2 01112967597
            </p>
          </div>
        </div>
        <div className="w-full md:w-96 md:max-w-full mx-auto">
          <div
            className="p-6 border border-gray-300 sm:rounded-md"
            style={{
              backgroundColor: mode ? "#BDBBB8" : "#252E42",
              color: mode ? "black" : "white",
            }}
          >
            <form ref={form}>
              <label className="block mb-6">
                <span className="text-white-700">إسمك</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="user_name"
                  type="text"
                  className="
          h-10
          px-5
            block
            w-full
            mt-1
            border-gray-300
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
              <label className="block mb-6">
                <span className="text-white-700">البريد الإكتروني</span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="user_email"
                  type="email"
                  className="
                  h-10
                  px-5
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
          "
                  placeholder="name@example.com"
                  required
                />
              </label>
              <label className="block mb-6">
                <span className="text-white-700">الشكوي</span>
                <textarea
                  onChange={(e) => setMassege(e.target.value)}
                  value={massege}
                  name="message"
                  className="
                  px-5
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                  rows="3"
                  placeholder="الشكوي"
                ></textarea>
              </label>
              <div className="mb-6  buttons">
                <button
                  type="submit"
                  className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
                  onClick={() => handleValue()}
                >
                 إرسال
                </button>
                {name || email || massege ? (
                  <button
                    type="submit"
                    className="
                    focus:outline-none text-white bg-red-700 hover:bg-red-800
                     focus:ring-4 focus:ring-red-300 font-medium rounded-lg 
                     text-sm px-5 py-2.5 ml-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 
                     dark:focus:ring-red-900"
                    onClick={() => clearInputs()}
                  >
                    مسح
                  </button>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>

      
        </div>
        {/* <MyChatbot /> */}
      </div>
    </div>
  );
};

export default ContactMe;
