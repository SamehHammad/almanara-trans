import { Button, Card, Row } from "react-bootstrap";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Styles
import "./skills.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// uuid
import { v4 as uuid } from "uuid";
// import images
import cars from "../assets/almanara/slider/cars.jpg";
import cov from "../assets/almanara/slider/cov.jpg";
import covv from "../assets/almanara/slider/covv.jpg";
import wnsh from "../assets/almanara/slider/wnsh.jpg";
import fakk from "../assets/almanara/slider/fakk.jpg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Popup from "../Popup/Popup";

export default function Skills() {
  const { mode } = useSelector((state) => state.darkMode);
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (e) => {
    setShowPopup(!showPopup);
  };
  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders")));
  }, []);
  const features = [
    {
      img: cars,
      title: "سيارات نقل عفش كل الأحجام ",
      slogan: "أطلب سياره نقل عفش 6 متر بدون عمال فقط بسعر 999 ج م ",
    },
    {
      img: cov,
      title: "تغليف الصيني",
      slogan:
        "يوجد لدينا باكنج (كراتين +بابلز) لتغليف الصيني سعر الكرتونه بالتغليف 50 ج م ",
    },
    {
      img: covv,
      title: "تغليف الأثاث",
      slogan: "عرض تغليف الأثاث (تغليف غرفه كامله) 500 ج م كرتون أو بابلز",
    },

    {
      img: wnsh,
      title: "ونش لرفع الأثاث بأمان وسرعه",
      slogan:
        "إطلب الان ونش لرفع جميع المنقولات بسهوله وأمان واستمتع العرض 899 ج م ",
    },
    {
      img: fakk,
      title: "الفك والتركيب",
      slogan:
        "فك وتركيب غرف النوم والسفره والنيش والبوفيه والستائر والنجف والاجهزه الكهربائيه ",
    },
  ];

  return (
    <>
      <Row className="col-12 py-5 mt-5 " name="skills">
        <div className="p-b-8 py-5 text-center offers">
          <p
            className=" mt-5 text-4xl font-bold inline border-b-4 border-yellow-400 "
            style={{ color: mode ? "white" : "black" }}
          >
            عروضنا
          </p>
        </div>{" "}
      </Row>
      <Row className="my-5 mx-5 card">
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay
          spaceBetween={15}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            767.98: {
              slidesPerView: 2,
            },
            991.98: {
              slidesPerView: 3,
            },
          }}
          // pagination={{ clickable: true }}
        >
          {features.map((feature, index) => (
            <SwiperSlide key={uuid()}>
              <Card data-aos="fade-left" className="h-300 overflow-hidden">
                <Card.Img
                  variant="top"
                  src={feature.img}
                  loading="lazy"
                  className="image-size"
                />
                <Card.Body>
                  <Card.Title className="fs-2">{feature.title}</Card.Title>
                  <Card.Text className="text-amber-600 card-text">
                    {feature.slogan}
                  </Card.Text>
                  <button
                    type="button"
                    className="book-btn focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => {
                      togglePopup();
                    }}
                  >
                    إحجز الان
                    <span className="orders-num">
                      {orders?.length ? orders?.length : 0}
                    </span>
                  </button>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Row>
      {showPopup ? <Popup closePopup={togglePopup} /> : null}
    </>
  );
}
