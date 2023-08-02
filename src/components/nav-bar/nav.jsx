import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-scroll";
import Button from "../button/Button";
import { changeMode } from "../slice/modeSlice";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";

import "./navbar.css";
import Popup from "../Skills/Popup";
import cars from "../assets/almanara/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.darkMode);
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = (e) => {
    setShowPopup(!showPopup);
  };

  const navbar = {
    link1: "الرئيسيه",
    link2: "خدماتنا",
    link3: "عروضنا ",
    link5: " إتصل بنا",
  };

  const [nav, setNave] = useState(false);
  const clickHndler = () => {
    setNave(!nav);
  };

  return (
    <div className="fixed w-full z-20">
      <nav
        className={
          mode
            ? "w-full h-[80px] flex justify-between items-center px-4 text-whith capitalize bg-[#413F3D]"
            : "w-full h-[80px] flex justify-between items-center px-4 text-whith capitalize bg-[#4c2da2] "
        }
      >
        <div className="n-left flex grow items-center gap-4">
          <div
            data-aos="zoom-in-right"
            className="logo font-bold text-2xl ml-4 text-rose-400 "
          >
            <h1>
              {/* AL<span>MANARA</span> */}
              {/* الـ<span>ـمنـاره</span> */}
            </h1>
            <img src={cars} alt="logo" className="nav-logo" />
          </div>
        </div>
        <div
          data-aos="zoom-in-left"
          className="n-right hidden md:flex grow text-xl items-center font-semibold	 "
        >
          <div className="n-list grow-4 ">
            <ul className="hidden md:flex gap-4  cursor-pointer 	zzz">
              <li className="">
                <div id="darkmode">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="checkboxx"
                    onClick={() => dispatch(changeMode())}
                  />
                  <label htmlFor="checkboxx" className="label">
                    <BsMoonStarsFill
                      color="white"
                      style={{ fontSize: "12px" }}
                    />
                    <BsFillSunFill
                      color="yellow"
                      style={{ fontSize: "12px" }}
                    />
                    <div className="ball"></div>
                  </label>
                </div>
              </li>

              <li className="">
                <Link to="home" smooth={true} duration={500}>
                  {navbar.link1}
                </Link>
              </li>

              <li className="">
                <Link to="Projects" smooth={true} duration={500}>
                  {navbar.link2}
                </Link>
              </li>
              <li className="">
                <Link to="skills" smooth={true} duration={500}>
                  {navbar.link3}
                </Link>
              </li>
              <li className="">
                <Link to="Contact" smooth={true} duration={500}>
                  {navbar.link5}
                </Link>
              </li>
              <li>
                {" "}
                <Button togglePopup={togglePopup} />
              </li>
            </ul>
          </div>
        </div>
        <div className="md:hidden z-20" onClick={clickHndler}>
          {!nav ? <FaBars /> : <FaTimes />}
        </div>
        {/* mobile menu */}

        <ul
          className={
            !nav
              ? "hidden "
              : " absolute z-10 bg-[#5031a9] bg-opacity-70 font-bold top-0 left-0 w-full  h-screen flex flex-col justify-center items-center cursor-pointer"
          }
        >
          <li className="mt-8">
            <div id="darkmode">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onClick={() => dispatch(changeMode())}
              />
              <label htmlFor="checkbox" className="label">
                <BsMoonStarsFill color="white" style={{ fontSize: "12px" }} />
                <BsFillSunFill color="yellow" style={{ fontSize: "12px" }} />
                <div className="ball"></div>
              </label>
            </div>
          </li>

          <li className=" py-5 text-2xl">
            <Link onClick={clickHndler} to="home" smooth={true} duration={500}>
              {navbar.link1}
            </Link>
          </li>
          <li className=" py-5 text-2xl">
            <Link
              onClick={clickHndler}
              to="Projects"
              smooth={true}
              duration={500}
            >
              {navbar.link2}
            </Link>
          </li>
          <li className=" py-5 text-2xl ">
            <Link
              onClick={clickHndler}
              to="skills"
              smooth={true}
              duration={500}
            >
              {navbar.link3}
            </Link>
          </li>
          <li className=" py-5 text-2xl mb-5 ">
            <Link
              onClick={clickHndler}
              to="Contact"
              smooth={true}
              duration={500}
            >
              {navbar.link5}
            </Link>
          </li>
          <li>
            <Button togglePopup={togglePopup} />
          </li>
        </ul>
      </nav>
      {showPopup ? <Popup closePopup={togglePopup} /> : null}
    </div>
  );
};

export default Navbar;
