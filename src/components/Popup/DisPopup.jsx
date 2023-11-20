import { AiFillCloseCircle } from "react-icons/ai";
import logo from "../assets/almanara/logo.png";
import "./popup.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DisPopup = ({ closePopup }) => {
  const printRef = useRef();
  const { mode } = useSelector((state) => state.darkMode);
  const form = useRef();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [firstDr, setFirstDr] = useState();
  const [secondDr, setSecondDr] = useState();
  const [dishCov, setDishCov] = useState();
  const [roomsCov, setRoomsCov] = useState();
  const [winshUp, setWinshUp] = useState(false);
  const [winshDown, setWinshDown] = useState(false);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [mobile, setMobile] = useState();
  const [details, setDetails] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orders, setOrders] = useState([]);
  const [localorders, setLocalOrders] = useState([]);
  const navigate = useNavigate();

  const clearInputs = () => {
    setName("");
    setFirstDr("");
    setSecondDr("");
    setDishCov("");
    setRoomsCov("");
    setFromLocation("");
    setToLocation("");
    setWinshUp(false);
    setWinshDown(false);
    setMobile("");
  };
  const closeThePopup = () => {
    navigate("/");
    closePopup();
  };
  const formatDate = (date) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  const confirmBook = async () => {
    const newOrder = {
      name,
      fromLocation,
      toLocation,
      firstDr,
      secondDr,
      dishCov,
      roomsCov,
      winshUp,
      winshDown,
      mobile,
      totalPrice,
      startDate: formatDate(startDate), // Format the date before saving to localStorage
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    handleDownloadImage();
    Swal.fire("تم تأكيد الأوردر بنجاح");

    closeThePopup();
  };
  const roundN100 = (num) => {
    return Math.round(num / 50) * 50;
  };
  const handleValue = (e) => {
    if (name) {
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
    } else {
      Swal.fire({
        icon: "error",
        title: "أوووبس",
        text: "فشل تسجيل الاوردر ",
        footer: "",
      });
    }
  };
  const deleteOrders = () => {
    localStorage.removeItem("orders");
    Swal.fire("تم حذف الأوردر بنجاح");
    closeThePopup();
  };
  const updateOrders = () => {
    setLocalOrders([]);
    setDetails(false);
    setName(localorders[0].name);
    setMobile(localorders[0].mobile);
    setFirstDr(localorders[0].firstDr);
    setSecondDr(localorders[0].secondDr);
    setFromLocation(localorders[0].fromLocation);
    setToLocation(localorders[0].toLocation);
    setDishCov(localorders[0].dishCov);
    setRoomsCov(localorders[0].roomsCov);
    setWinshUp(localorders[0].winshUp);
    setWinshDown(localorders[0].winshDown);
  };
  useEffect(() => {
    const getData = localStorage.getItem("orders");
    setLocalOrders(JSON.parse(getData));
  }, []);
  const test = (e) => {
    e.preventDefault();
    calcPrice();
    setDetails(true);
    handleValue();
  };

  const calcPrice = () => {
    const totalDr = Number(firstDr) + Number(secondDr);
    setTotalPrice(
      2000 +
        (totalDr > 5 ? (totalDr - 5) * 200 : 0) +
        (Number(dishCov) > 0 ? Number(dishCov) * 250 : 0) +
        (winshUp ? 1200 : 0) +
        (winshDown ? 1200 : 0) +
        (Number(roomsCov) > 0 ? Number(roomsCov) * 500 : 0)
    );
  };
  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = `order-${name}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  if (localorders?.length > 0) {
    return (
      <div dir="rtl" className="popup">
        <div dir="rtl" className="popup_inner text-center">
          <AiFillCloseCircle
            onClick={closeThePopup}
            className="close-btn-popup"
          />
          <div
            name="Contact"
            dir="rtl"
            className="text-white max-w-[1000px] mx-auto  flex flex-col"
            data-aos-anchor-placement="fade-right"
          >
            <div dir="rtl" className="h-screen flex flex-col ">
              <div dir="rtl" className=" pt-0 ">
                <div dir="rtl" className="text-center flex justify-center">
                  <img src={logo} alt="almanara" width={80} />
                  <p
                    dir="rtl"
                    className="text-2xl font-bold inline border-b-4 border-yellow-400 text-center popup-header  "
                    style={{ color: "black" }}
                  >
                    تفاصيل اللأوردر
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#255266",
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  <h1 className="mnarah">شركة المناره لنقل الأثاث </h1>
                  <div className="doooor">
                    <p className="dd nn">
                      الإســم : <span>{localorders[0].name}</span>
                    </p>
                    <p className="nn dd">
                    الخصم : <span>15%</span>
                  </p>
                  </div>
                  <div className="doooor">
                    <p className="nn dd">
                      رقم الموبايل : <span>{localorders[0].mobile}</span>
                    </p>
                    <p className="dd nn">
                      اليوم : <span>{localorders[0].startDate}</span>
                    </p>
                  </div>
                  <div className="doooor">
                    <p className="nn dd">
                      مــن منطقة :{" "}
                      <span>
                        {localorders[0].fromLocation
                          ? localorders[0].fromLocation
                          : "القاهره"}
                      </span>
                    </p>

                    <p className="nn dd">
                      إلــي منطقة:
                      <span>
                        {localorders[0].toLocation
                          ? localorders[0].toLocation
                          : "القاهره"}
                      </span>
                    </p>
                  </div>
                  <div className="doooor">
                    <p className="nn dd">
                      من الدور :{" "}
                      <span>
                        {localorders[0].firstDr ? localorders[0].firstDr : 0}
                      </span>
                    </p>
                    <p className="nn dd">
                      إلي الدور :{" "}
                      <span>
                        {localorders[0].secondDr ? localorders[0].secondDr : 0}
                      </span>
                    </p>
                  </div>
                  <div className="doooor">
                    <p className="nn dd">
                      عدد غرف النجارة :{" "}
                      <span>
                        {localorders[0].dishCov ? localorders[0].dishCov : 0}
                      </span>
                    </p>
                    <p className="nn dd">
                      عدد التكييفات :
                      <span>
                        {localorders[0].roomsCov ? localorders[0].roomsCov : 0}
                      </span>
                    </p>
                  </div>
                  <div className="doooor">
                    <p className="nn dd">
                      التنزيل بالونش :{" "}
                      <span>{localorders[0].winshDown ? "نعم" : "لا"}</span>
                    </p>
                    <p className="nn dd">
                      التطليع بالونش :{" "}
                      <span>{localorders[0].winshUp ? "نعم" : "لا"}</span>
                    </p>
                  </div>
                  
                  <div className="whatsapp text-right mr-2 mt-3">
                    <ul >
                      <hr style={{width:"70%"}}></hr>
                      <h1 style={{ color: "#fff" }} className="text-success mt-1">
                        يمكنك التواصل مع المناره علي الواتس اب علي هذه الأرقام
                            </h1>
                            <div className="doooor">

                      <li className="nn">
                        <a className="text-success"
                          href="https://wa.me/01102226225"
                          style={{ color: "#77dd77" }}
                        >
                          <i
                            className="fa-brands fa-whatsapp text-4xl mx-1 cursor-pointer  whats-icon text-success"
                            style={{ color: "#77dd77" }}
                          ></i>
                          01102226225
                        </a>
                      </li>
                      <li className="nn">
                        <a className="text-success"
                          href="https://wa.me/01112967597"
                          style={{ color: "#77dd77" }}
                        >
                          <i
                            className="fa-brands fa-whatsapp text-4xl mx-1 cursor-pointer  whats-icon text-success"
                            style={{ color: "#77dd77" }}
                          ></i>
                          01112967597
                        </a>
                      </li>
                            </div>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="nn" style={{ color: "black" }}>
                إجمالي الحساب بعد الخصم :{" "}
                <span>
                  {roundN100(
                    localorders[0].totalPrice > 2500
                      ? (localorders[0].totalPrice * 85) / 100
                      : (localorders[0].totalPrice * 93) / 100
                  )}{" "}
                  جنيه
                </span>
              </p>
              <p className="nn" style={{ color: "black" }}>
                بدلا من :{" "}
                <span className="discount">
                  {roundN100(
                    localorders[0].totalPrice < 2500
                      ? localorders[0].totalPrice +
                          (localorders[0].totalPrice * 7) / 100
                      : localorders[0].totalPrice
                  )}
                  جنيه
                </span>
              </p>
              <div className="order-btns">
                <button
                  type="button"
                  class="delete-btn focus:outline-none text-white bg-red-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-green-700 dark:focus:ring-red-800"
                  onClick={deleteOrders}
                >
                  حذف الأوردر
                </button>{" "}
                <button
                  type="button"
                  class="update-btn focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={updateOrders}
                >
                  تعديل الأوردر
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    if (!details) {
      return (
        <div dir="rtl" className="popup">
          <div dir="rtl" className="popup_inner text-center">
            <AiFillCloseCircle
              onClick={closeThePopup}
              dir="rtl"
              className="close-btn-popup"
            />
            <div
              name="Contact"
              dir="rtl"
              className="text-white max-w-[1000px] mx-auto  flex flex-col"
              data-aos-anchor-placement="fade-right"
            >
              <div dir="rtl" className="h-screen flex flex-col ">
                <div dir="rtl" className=" pt-0 ">
                  <div dir="rtl" className=" flex justify-center">
                    <img src={logo} alt="almanara" width={100} />
                    <p
                      dir="rtl"
                      className=" border-b-4 border-yellow-400 text-left popup-headerr  "
                      style={{ color: "black", display: "block" }}
                    >
                      إحجز الان واستمتع بخصم 15% من الإثنين إالي الخميس
                    </p>
                  </div>
                </div>
                <div dir="rtl" className="w-full md:w-96 md:max-w-full mx-auto">
                  <div
                    dir="rtl"
                    className="p-2 border border-gray-300 sm:rounded-md"
                    style={{
                      backgroundColor: mode ? "#BDBBB8" : "#252E42",
                      color: mode ? "black" : "white",
                    }}
                  >
                    <form ref={form} onSubmit={test}>
                      <div className="doooor">
                        <label dir="rtl" className="  ">
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="user_name"
                            type="text"
                            dir="rtl"
                            className="
              h-8
              px-5
              dd
               
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
                        <label dir="rtl" className="  ">
                          <input
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            name="mobile"
                            type="number"
                            dir="rtl"
                            className="
              h-8
              px-5
              dd
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
              "
                            placeholder="رقم الموبايل"
                          />
                        </label>
                      </div>
                      <label>يوم النقل : </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        name="dateTime"
                      />
                      <div dir="rtl" className="doooor">
                        <label dir="rtl" className=" ">
                          <input
                            onChange={(e) => setFromLocation(e.target.value)}
                            value={fromLocation}
                            name="fromLocation"
                            type="text"
                            dir="rtl"
                            className="
                      h-8
                      px-5
                
                dd
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
              "
                            placeholder="من منطقة؟"
                            required
                          />
                        </label>
                        <label dir="rtl" className=" ">
                          <input
                            onChange={(e) => setToLocation(e.target.value)}
                            value={toLocation}
                            name="toLocation"
                            type="text"
                            dir="rtl"
                            className="
                      h-8
                      px-5
                
                dd
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
              "
                            placeholder="إلي منطقة"
                            required
                          />
                        </label>
                      </div>
                      <div dir="rtl" className="doooor">
                        <label dir="rtl" className=" ">
                          <input
                            onChange={(e) => setFirstDr(e.target.value)}
                            value={firstDr}
                            name="firstDr"
                            type="number"
                            dir="rtl"
                            className="
                      h-8
                      px-5
                
                dd
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
              "
                            placeholder="من الدور؟"
                            required
                          />
                        </label>
                        <label dir="rtl" className=" ">
                          <input
                            onChange={(e) => setSecondDr(e.target.value)}
                            value={secondDr}
                            name="secondDr"
                            type="number"
                            dir="rtl"
                            className="
                      h-8
                      px-5
                
                dd
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
              "
                            placeholder="إلي الدور؟"
                            required
                          />
                        </label>
                      </div>
                      <label dir="rtl" className=" ">
                        كم غرفه تريد فكها وتركيبها ؟
                        <input
                          onChange={(e) => setDishCov(e.target.value)}
                          value={dishCov}
                          name="dishCov"
                          type="number"
                          dir="rtl"
                          className="
                      h-8
                      px-5
                
                ddd
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                w-full
              "
                          placeholder=" عدد الغرف  "
                        />
                      </label>
                      <label dir="rtl" className=" ">
                        كم تكييف تريد فكه وتركيبه؟
                        <input
                          onChange={(e) => setRoomsCov(e.target.value)}
                          value={roomsCov}
                          name="roomsCov"
                          type="number"
                          dir="rtl"
                          className="
                      h-8
                      px-5
                
                ddd
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                w-full
              "
                          placeholder="عدد التكييفات"
                        />
                      </label>

                      <div dir="rtl" className="doooor">
                        <label dir="rtl" className=" ">
                          <span>التنزيل بالونش</span>
                          <input
                            onChange={(e) => setWinshDown(!winshDown)}
                            value={winshDown ? "نعم" : "لا"}
                            name="winshDown"
                            type="checkbox"
                            dir="rtl"
                            className="winsh "
                          />
                        </label>
                        <label dir="rtl" className=" ">
                          <span>التطليع بالونش</span>
                          <input
                            onChange={(e) => setWinshUp(!winshUp)}
                            value={winshUp ? "نعم" : "لا"}
                            name="winshUp"
                            type="checkbox"
                            dir="rtl"
                            className="winsh"
                          />
                        </label>
                      </div>

                      <div dir="rtl" className="  order-btns">
                        <button
                          type="submit"
                          dir="rtl"
                          className="
                h-8
                px-10
                text-indigo-100
                bg-green-700
                rounded-lg
                transition-colors
                duration-150
                focus:shadow-outline
                hover:bg-indigo-800
              "
                        >
                          حجز
                        </button>
                        {name ||
                        startDate ||
                        firstDr ||
                        secondDr ||
                        dishCov ||
                        roomsCov ||
                        fromLocation ||
                        toLocation ||
                        winshUp ||
                        winshDown ? (
                          <button
                            type="submit"
                            dir="rtl"
                            className="
                        focus:outline-none text-white bg-red-700 hover:bg-red-800
                         focus:ring-4 focus:ring-red-300 font-medium rounded-lg 
                         text-sm px-10 py-2.5 ml-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 
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
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div dir="rtl" className="popup">
          <div dir="rtl" className="popup_inner text-center">
            <AiFillCloseCircle
              onClick={closeThePopup}
              dir="rtl"
              className="close-btn-popup"
            />
            <div
              name="Contact"
              dir="rtl"
              className="text-white max-w-[1000px] mx-auto  flex flex-col"
              data-aos-anchor-placement="fade-right"
            >
              <div dir="rtl" className="h-screen flex flex-col ">
                <div ref={printRef}>
                  <div className="reseat">
                    <div dir="rtl" className=" pt-0">
                      <div
                        dir="rtl"
                        className="text-center flex justify-center"
                      >
                        <img src={logo} alt="almanara" width={80} />
                        <p
                          dir="rtl"
                          className="text-2xl font-bold inline border-b-4 border-yellow-400 text-center popup-header  "
                          style={{ color: "black" }}
                        >
                          تفاصيل اللأوردر
                        </p>
                      </div>
                      <div
                        style={{
                          backgroundColor: "#255266",
                          width: "100%",
                          margin: "auto",
                        }}
                      >
                        <h1 className="mnarah">شركة المناره لنقل الأثاث </h1>
                        <div className="doooor">
                          <p className="dd nn">
                            الإســم : <span>{name}</span>
                          </p>
                          <p className="nn dd">
                          الخصم : <span>15%</span>
                        </p>
                        </div>
                        <div className="doooor">
                          <p className="nn dd">
                            رقم الموبايل : <span>{mobile}</span>
                          </p>
                          <p className="dd nn">
                            اليوم : <span>{formatDate(startDate)}</span>
                          </p>
                        </div>
                        <div className="doooor">
                          <p className="nn dd">
                            مــن منطقة :{" "}
                            <span>
                              {fromLocation ? fromLocation : "القاهره"}
                            </span>
                          </p>

                          <p className="nn dd">
                            إلــي منطقة:{" "}
                            <span>{toLocation ? toLocation : "القاهره"}</span>
                          </p>
                        </div>
                        <div className="doooor">
                          <p className="nn dd">
                            من الدور : <span>{firstDr ? firstDr : 0}</span>
                          </p>
                          <p className="nn dd">
                            إلي الدور : <span>{secondDr ? secondDr : 0}</span>
                          </p>
                        </div>
                        <div className="doooor">
                          <p className="nn dd">
                            عدد غرف النجارة :{" "}
                            <span>{dishCov ? dishCov : 0}</span>
                          </p>
                          <p className="nn dd">
                            عدد التكييفات :{" "}
                            <span>{roomsCov ? roomsCov : 0}</span>
                          </p>
                        </div>
                        <div className="doooor">
                          <p className="nn dd">
                            التنزيل بالونش :{" "}
                            <span>{winshDown ? "نعم" : "لا"}</span>
                          </p>
                          <p className="nn dd">
                            التطليع بالونش :{" "}
                            <span>{winshUp ? "نعم" : "لا"}</span>
                          </p>
                        </div>
                        
                        <div className="whatsapp text-right mr-2 mt-3">
                          <ul>
                            <hr style={{ width: "70%" }}></hr>
                            <h1
                              style={{ color: "#fff" }}
                              className="text-success mt-1"
                            >
                              يمكنك التواصل مع المناره علي الواتس اب علي هذه
                              الأرقام
                            </h1>
                            <div className="doooor">
                              <li className="nn">
                                <a
                                  className="text-success"
                                  href="https://wa.me/01102226225"
                                  style={{ color: "#77dd77" }}
                                >
                                  <i
                                    className="fa-brands fa-whatsapp text-4xl mx-1 cursor-pointer  whats-icon text-success"
                                    style={{ color: "#77dd77" }}
                                  ></i>
                                  01102226225
                                </a>
                              </li>
                              <li className="nn">
                                <a
                                  className="text-success"
                                  href="https://wa.me/01112967597"
                                  style={{ color: "#77dd77" }}
                                >
                                  <i
                                    className="fa-brands fa-whatsapp text-4xl mx-1 cursor-pointer  whats-icon text-success"
                                    style={{ color: "#77dd77" }}
                                  ></i>
                                  01112967597
                                </a>
                              </li>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <p className="nn" style={{ color: "black" }}>
                      إجمالي الحساب بعد الخصم :{" "}
                      <span>
                        {roundN100(
                          totalPrice > 2500
                            ? (totalPrice * 85) / 100
                            : (totalPrice * 93) / 100
                        )}{" "}
                        جنيه
                      </span>
                    </p>
                    <p className="nn" style={{ color: "black" }}>
                      بدلا من :{" "}
                      <span className="discount">
                        {roundN100(
                          totalPrice < 2500
                            ? totalPrice + (totalPrice * 7) / 100
                            : totalPrice
                        )}
                        جنيه
                      </span>
                    </p>
                  </div>
                </div>
                <div className="order-btns">
                  <button
                    type="button"
                    class="delete-btn focus:outline-none text-white bg-blue-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-red-800"
                    onClick={confirmBook}
                  >
                    تأكيد الحجز
                  </button>
                  <button
                    type="button"
                    class="update-btn focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={updateOrders}
                  >
                    تعديل الأوردر
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default DisPopup;
