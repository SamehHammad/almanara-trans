import { useCallback, useEffect, useState } from "react";
import Home from "./components/home/intro";
import Navbar from "./components/nav-bar/nav";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Footer from "./components/footer/footer";
import "./App.css";
import Aos from "aos";
import "aos/dist/aos.css";
import ContactMe from "./components/contact/ContactMe";
import { useSelector } from "react-redux";
import { loadFull } from "tsparticles";
import Particles from "react-particles";
import axios from "axios";

function App() {
  const { mode } = useSelector((state) => state.darkMode);
  const [view, setView] = useState(0);

  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);
  useEffect(() => {
    axios
      .get("https://api.countapi.xyz/update/sameh-portfolio/counter/?amount=1")
      .then(function(response) {
        setView(response.data.value);
      });
  }, []);

  const options = {
    particles: {
      number: {
        value: 20,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: mode ? ["#fff"] : ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"],
      },
      shape: {
        type: "star",
      },
      opacity: {
        value: 1,
      },
      size: {
        value: { min: 1, max: 7 },
      },
      links: {
        enable: false,
        distance: 150,
        color: "#808080",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: false,
        straight: false,
        outModes: "out",
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: false,
          mode: "grab",
        },
        onClick: {
          enable: false,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1,
          },
        },
        push: {
          quantity: 8,
        },
      },
    },
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <>
      <Particles options={options} init={particlesInit} />

      <div className={mode ? "m-dark" : "m-light"}>
        <Navbar />
        <Home />
        <Projects />
        <Skills />
        <ContactMe children={view} />
        <Footer />
      </div>
    </>
  );
}

export default App;
