import { HiArrowNarrowRight } from "react-icons/hi";
import introDarkImg from "../assets/almanara/manara.png";
import introLightImg from "../assets/almanara/intro-car.jpg";
import { Link } from "react-scroll";
import Typewriter from "typewriter-effect";
import { useSelector } from "react-redux";
import "./intro.css";

const Intro = () => {
  const { mode } = useSelector((state) => state.darkMode);

  const intro = {
    jobTitle: "عماله مدربه وأسعار إقتصاديه وفنيين فك وتركيب ",
  };
  return (
    <div name="home" className="flex w-full intro-all">
      <div className=" flex-1 intro-img">
        <div className="md:block w-100 mt-32  ">
          <img
            data-aos="fade-left"
            className="rounded-3xl lg:w-[100%] "
            src={mode ? introDarkImg : introLightImg}
            alt="intro"
          />
        </div>
      </div>

      <div className=" flex-1 intro-text">
        <div
          className="intro
        flex flex-col justify-center h-screen capitalize max-w[1000px] mx-auto px-8 lg:justify-center lg:items-center"
        >
          <h5
            data-aos="fade-right"
            className=" font-bold text-xl mt-5 sm:text-l  "
          >
            <span className="underlined underline-clip">خليك في المضمون</span>
          </h5>
          <h4
            data-aos="fade-right"
            className=" font-bold text-4xl sm:text-6xl name "
          >
            <span
              className="underlined underline-clip name"
              style={{ color: mode ? "#FACC15" : "#E01E5B" }}
            >
              وانقل عفشك مع شركة المناره
            </span>
          </h4>

          <h3 className="  sm:text-2xl my-4 w-[18rem] jop-title">
            <Typewriter
              className=""
              options={{
                strings: [`${intro.jobTitle}`],
                autoStart: true,
                loop: true,
              }}
            />
          </h3>
          <div className="view-work" data-aos="fade-left">
            <button className="group text-xl border-4 px-1 mx-6 py-2 my-2 flex items-center rounded-2xl font-bold capitalize hover:border-yellow-400 ">
              <Link to="Projects" smooth={true} duration={500}>
                شاهد المزيد
              </Link>
              <span className=" group-hover:rotate-90 decoration-1000 group-hover:text-yellow-400">
                <HiArrowNarrowRight className="ml-2 " />
              </span>
            </button>
            <ul>
              <li>
                <a
                  href="https://wa.me/01112967597"
                  style={{ color: mode ? "#FACC15" : "#E01E5B" }}
                >
                  <i
                    className="fa-brands fa-whatsapp text-4xl mx-1 cursor-pointer  whats-icon text-success"
                    style={{ color: mode ? "#FACC15" : "#E01E5B" }}
                  ></i>
                  01112967597
                </a>
              </li>{" "}
              <li>
                <a
                  href="https://wa.me/01102226225"
                  style={{ color: mode ? "#FACC15" : "#E01E5B" }}
                >
                  <i
                    className="fa-brands fa-whatsapp text-4xl mx-1 cursor-pointer  whats-icon text-success"
                    style={{ color: mode ? "#FACC15" : "#E01E5B" }}
                  ></i>
                  01102226225
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
