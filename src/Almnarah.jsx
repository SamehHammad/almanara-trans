import { useCallback, useEffect, useState } from "react";
import Home from "./components/home/intro";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Footer from "./components/footer/footer";
import "./App.css";
import "aos/dist/aos.css";
import ContactMe from "./components/contact/ContactMe";
import { useSelector } from "react-redux";

function Almnarah() {
  const { mode } = useSelector((state) => state.darkMode);
  const [view, setView] = useState(0);

 
  return (
    <>

      <div className={mode ? "m-dark" : "m-light"}>
        <Home />
        <Projects />
        <Skills />
        <ContactMe children={view} />
        <Footer />
      </div>
    </>
  );
}

export default Almnarah;
