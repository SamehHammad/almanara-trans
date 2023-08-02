import React from "react";
import { AiFillGithub, AiOutlineLinkedin } from "react-icons/ai";
import { useSelector } from "react-redux";
function Footer() {
  const { mode } = useSelector((state) => state.darkMode);
  return (
    <div name="footer" className="w-full justify-center p-4">
      <hr />
      <ul className="flex justify-center text-center text-4xl mt-3 ">
        <li>
          <a href="https://www.facebook.com/profile.php?id=100085973621488">
            <i className="fa-brands fa-facebook text-4xl mx-3 cursor-pointer  facebook-icon"></i>
          </a>
        </li>

        <p className="text-lg mt-1 ">Copyright &copy;ALmanarah Dev Team</p>
      </ul>
    </div>
  );
}

export default Footer;