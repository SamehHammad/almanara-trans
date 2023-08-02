import React, { useEffect, useState } from "react";
import pdf from "../assets/Sameh Hammad_CV.pdf";

const Button = ({ togglePopup }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders")));
  }, []);
  return (
    <>
      <a
        className="border-4 px-4 py-3 mt-4 font-bold text-xl rounded-2xl hover:text-yellow hover:border-green-400  resume"
        onClick={togglePopup}
      >
        إحجز الآن
        <span>{orders?.length ? orders?.length : 0}</span>
      </a>
    </>
  );
};

export default Button;
