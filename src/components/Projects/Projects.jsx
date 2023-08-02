import "./projects.css";
import home from "../assets/almanara/home-move.png";
import moving from "../assets/almanara/moving.png";
import eng from "../assets/almanara/electric.png";
import covering from "../assets/almanara/covering.jpg";
import cars from "../assets/almanara/logo.png";
import winsh from "../assets/almanara/wnsh.jpg";

//hover
import {} from "react-icons/fa";
import { useSelector } from "react-redux";
const Projects = () => {
  const { mode } = useSelector((state) => state.darkMode);

  const data = [
    {
      name: "انقل عفشك سهوله وأمان ",

      img: `${home}`,
      lang: [
        "من النهارده متشيلش هم النقل مع شركة المناره هتنقل من غير تعب وبأقل الاسعار",
      ],
    },
    {
      name: "سيارات كبيره ومهيئه للأثاث",

      img: `${cars}`,
      lang: [ " سياره 6 متر بـ 999 ج م","سياره 4 متر بـ850 ج م",],
    },
    {
      name: "عماله مدربه",

      img: `${moving}`,
      lang: [
        "عندنا في شركة المناره عماله مدربه خبره أكثر من 5 سنوات في نقل العفش والتعامل مع المنقولات الحساسه والقابله للكسر",
      ],
    },
    {
      name: "فنيين محترفيين",

      img: `${eng}`,
      lang: [
        "موجود لدينا أيضا كهربائيين لفك وتركيب النجف والسخانات وشاشات التليفزيون",
        "لدينا فنيين محترفيين في فك وتركيب النجاره والتكييفات ",
      ],
    },
    {
      name: "تغليف وحمايه المنقولات",

      img: `${covering}`,
      lang: [
        "يوجد لدينا تغليف للصيني والأخشاب الحساسه والأنتريهات والركن وجميع المنقولات الحساسه للخدوش والكسر",
      ],
    },
    {
      name: "أوناش لتسهيل عملية النقل ",
      img: `${winsh}`,
      lang: [
        "يوجد لدينا أوناش هيدروليكيه وأوناش كهرباء للأدوار المرتفعه وجميع الأوناش امنه تماما في عملية النقل وعماله مدربه للتعامل مع الأوناش والأماكن المرتفعه",
      ],
    },
  ];

  return (
    <>
      <div
        data-aos="fade-up"
        name="Projects"
        className="w-full md:h-screen text-white capitalize "
      >
        <div className="cotainer max-w[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
          <div className="p-b-8  text-center">
            <p
              className="text-4xl font-bold inline border-b-4 border-yellow-400 "
              style={{ color: mode ? "white" : "black" }}
            >
              خدماتنا
            </p>
            <p
              className="py-6 text-2xl"
              style={{ color: mode ? "white" : "black" }}
            >
              ماذا نقدم لعملائنا؟
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.map((x) => (
              <div
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className="card-item shadow-lg group container rounded-md flex
              justify-center items-center mx-auto object-cover"
                style={{
                  backgroundImage: `url(${x.img})`,
                  backgroundSize: "cover",
                  height: "300px",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* hover */}
                <div className="opacity-0 group-hover:opacity-80 justify-center bg-violet-200 w-full p-5 m-1 rounded-2xl">
                  <span className="text-2xl font-bold text-violet-800  tracing-wider  text-right">
                    {x.name}
                  </span>

                  <div className="flex flex-wrap gap-4 text-violet-800 font-bold  text-center ">
                    {x.lang.map((a) => (
                      <>
                        <p
                          className="py-6 text-2xl  text-center text-amber-600"
                        >
                          {a}
                        </p>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
