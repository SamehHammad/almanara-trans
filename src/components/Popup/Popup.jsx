import { AiFillCloseCircle } from "react-icons/ai";
import logo from "../assets/almanara/logo.png";
import "./popup.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
const Popup = ({ closePopup }) => {
  const printRef = useRef();
  const { mode } = useSelector((state) => state.darkMode);
  const form = useRef();
  const [name, setName] = useState("");
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
  const navigate=useNavigate()
 
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
    navigate("/")
    closePopup()
  }
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
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    handleDownloadImage();
    Swal.fire("تم تأكيد الأوردر بنجاح");
    // try {
    //   const response = await axios.get("http://localhost:3003/orders");
    //   const orders = response.data;

    //   if (orders.some((order) => order.name === name)) {
    //     Swal.fire( "هذا الأوردر موجود من قبل");
    //   } else {
    //     await axios.post("http://localhost:3003/orders", {
    //       name,
    //       fromLocation,
    //       toLocation,
    //       firstDr,
    //       secondDr,
    //       dishCov,
    //       roomsCov,
    //       winshUp,
    //       winshDown,
    //       mobile,
    //       totalPrice,
    //     });
    //   }

    //   clearInputs();
    // } catch (error) {}
    closeThePopup();
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
      1700 +
        (totalDr > 5 ? (totalDr - 5) * 150 : 0) +
        (Number(dishCov) > 0 ? Number(dishCov) * 50 : 0) +
        (winshUp ? 1000 : 0) +
        (winshDown ? 1000 : 0) +
        (Number(roomsCov) > 0 ? Number(roomsCov) * 250 : 0)
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
      // try {
      //   const { fileUrl } = await upload.uploadFile(link, {
      //     onProgress: ({ progress }) =>
      //       console.log(`${Number(progress)}% complete`),
      //   });
      //   console.log(`File uploaded!\n${fileUrl}`);
      // } catch (e) {
      //   alert(`Error!\n${e.message}`);
      // }
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
              <div dir="rtl" className=" pt-0">
                <div dir="rtl" className="text-center flex justify-center">
                  <img src={logo} alt="almanara" width={100} />
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
                    width: "70%",
                    margin: "auto",
                  }}
                >
                  <p className="nn">
                    الإســم : <span>{localorders[0].name}</span>
                  </p>
                  <p className="nn">
                    رقم الموبايل : <span>{localorders[0].mobile}</span>
                  </p>
                  <p className="nn">
                    مــن :{" "}
                    <span>
                      {localorders[0].fromLocation
                        ? localorders[0].fromLocation
                        : "القاهره"}
                    </span>
                  </p>
                  <p className="nn">
                    إلــي :{" "}
                    <span>
                      {localorders[0].toLocation
                        ? localorders[0].toLocation
                        : "القاهره"}
                    </span>
                  </p>
                  <p className="nn">
                    من الدور :{" "}
                    <span>
                      {localorders[0].firstDr ? localorders[0].firstDr : 0}
                    </span>
                  </p>
                  <p className="nn">
                    إلي الدور :{" "}
                    <span>
                      {localorders[0].secondDr ? localorders[0].secondDr : 0}
                    </span>
                  </p>
                  <p className="nn">
                    عدد الكراتين :{" "}
                    <span>
                      {localorders[0].dishCov ? localorders[0].dishCov : 0}
                    </span>
                  </p>
                  <p className="nn">
                    عدد الغرف المراد تغليفها :{" "}
                    <span>
                      {localorders[0].roomsCov ? localorders[0].roomsCov : 0}
                    </span>
                  </p>
                  <p className="nn">
                    التطليع بالونش :{" "}
                    <span>{localorders[0].winshUp ? "نعم" : "لا"}</span>
                  </p>
                  <p className="nn">
                    التنزيل بالونش :{" "}
                    <span>{localorders[0].winshDown ? "نعم" : "لا"}</span>
                  </p>
                </div>
              </div>
              <p className="nn" style={{ color: "black", marginTop: "20px" }}>
                إجمالي الحساب : <span>{localorders[0].totalPrice} جنيه</span>
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
              className="text-white cotainer max-w-[1000px] mx-auto  flex flex-col"
              data-aos-anchor-placement="fade-right"
            >
              <div dir="rtl" className="h-screen flex flex-col ">
                <div dir="rtl" className=" pt-0 ">
                  <div dir="rtl" className=" flex justify-center">
                    <img src={logo} alt="almanara" width={100} />
                    <p
                      dir="rtl"
                      className="text-2xl font-bold inline border-b-4 border-yellow-400 text-left popup-header  "
                      style={{ color: "black" }}
                    >
                      إحجز أوردرك الآن
                    </p>
                  </div>
                </div>
                <div dir="rtl" className="w-full md:w-96 md:max-w-full mx-auto">
                  <div
                    dir="rtl"
                    className="p-6 border border-gray-300 sm:rounded-md"
                    style={{
                      backgroundColor: mode ? "#BDBBB8" : "#252E42",
                      color: mode ? "black" : "white",
                    }}
                  >
                    <form ref={form} onSubmit={test}>
                      <label dir="rtl" className=" mb-6 ">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          name="user_name"
                          type="text"
                          dir="rtl"
                          className="
              h-8
              px-5
                
                w-full
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
                      <label dir="rtl" className=" mb-6 ">
                        <input
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          name="mobile"
                          type="number"
                          dir="rtl"
                          className="
              h-8
              px-5
                
                w-full
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

                      <div dir="rtl" className="doooor">
                        <label dir="rtl" className=" mb-6">
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
                        <label dir="rtl" className=" mb-6">
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
                        <label dir="rtl" className=" mb-6">
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
                        <label dir="rtl" className=" mb-6">
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
                        كم غرفه تريد تغليفها؟
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
                          placeholder="تغليف الأثاث"
                        />
                      </label>
                      <label dir="rtl" className=" ">
                        كم كرتونه للصيني والزجاج ؟
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
                          placeholder=" تغليف الصيني "
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
                        <label dir="rtl" className=" mb-6">
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

                      <div dir="rtl" className="mb-6  order-btns">
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
              className="text-white cotainer max-w-[1000px] mx-auto  flex flex-col"
              data-aos-anchor-placement="fade-right"
            >
              <div dir="rtl" className="h-screen flex flex-col ">
                <div dir="rtl" className=" pt-0" ref={printRef}>
                  <div dir="rtl" className="text-center flex justify-center">
                    <img src={logo} alt="almanara" width={110} />
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
                      width: "70%",
                      margin: "auto",
                    }}
                  >
                    <p className="nn">
                      الإســم : <span>{name}</span>
                    </p>
                    <p className="nn">
                      رقم الموبايل : <span>{mobile}</span>
                    </p>
                    <p className="nn">
                      مــن :{" "}
                      <span>{fromLocation ? fromLocation : "القاهره"}</span>
                    </p>
                    <p className="nn">
                      إلــي : <span>{toLocation ? toLocation : "القاهره"}</span>
                    </p>
                    <p className="nn">
                      من الدور : <span>{firstDr ? firstDr : 0}</span>
                    </p>
                    <p className="nn">
                      إلي الدور : <span>{secondDr ? secondDr : 0}</span>
                    </p>
                    <p className="nn">
                      عدد الكراتين : <span>{dishCov ? dishCov : 0}</span>
                    </p>
                    <p className="nn">
                      عدد الغرف المراد تغليفها :{" "}
                      <span>{roomsCov ? roomsCov : 0}</span>
                    </p>
                    <p className="nn">
                      التطليع بالونش : <span>{winshUp ? "نعم" : "لا"}</span>
                    </p>
                    <p className="nn">
                      التنزيل بالونش : <span>{winshDown ? "نعم" : "لا"}</span>
                    </p>
                  </div>
                  <p className="nn" style={{ color: "black", margin: "20px" }}>
                    إجمالي الحساب : <span>{totalPrice} جنيه</span>
                  </p>
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

export default Popup;
