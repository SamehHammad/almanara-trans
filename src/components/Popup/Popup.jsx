import React from "react";
import DisPopup from "./DisPopup";
// import NoDiscountPopup from "./NoDiscountPopup";

const Popup = ({ closePopup }) => {
  return (
    <div>
      <DisPopup closePopup={closePopup} />
      {/* <NoDiscountPopup closePopup={closePopup} /> */}
    </div>
  );
};

export default Popup;
