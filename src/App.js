import vector from "./Vector.png";
import "./dark-theme.css";
import Avatar from "./Avatar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaAngular,
  FaTelegram,
  FaGithub,
} from "react-icons/fa";
import { DiJavascript1 } from "react-icons/di";
import { SiMui, SiMaildotru, SiTailwindcss } from "react-icons/si";
import { BsSunFill, BsFillMoonFill, BsChevronDown } from "react-icons/bs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState, useRef } from "react";
import { useKey } from "./useKey";
import { useLocalStorage } from "./useLocalStorage";

const telegram = "tg://resolve?domain=osoff";
const gmail = "mailto:anatolywebdev@gmail.com";
const github = "https://github.com/osoff";
const linkedin = "https://www.linkedin.com/in/anatoly-undefined-b6baa8286/";
export default function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  if (openMenu) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
  const homeref = useRef(null);
  const aboutref = useRef(null);
  const projref = useRef(null);
  const contref = useRef(null);
  const handleScroll = (tref) => {
    tref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [darkmode, setDarkmode] = useLocalStorage(false, "darkmode");
  darkmode === true
    ? (document.body.style.background =
        "linear-gradient(90deg, #1D1D21,#1e1f23, #1f1f24,#1e1f23, #1D1D21)")
    : (document.body.style.background =
        "linear-gradient(90deg, #eaecf9, #eff1fa, #eaecf9)");
  document.documentElement.style.background = darkmode ? "black" : "";
  return (
    <div>
      {openMenu && (
        <div
          className="overlay"
          style={{
            backgroundColor: darkmode
              ? "rgba(0, 0, 0, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
          }}
        >
          <MenuNav
            setOpenMenu={setOpenMenu}
            homeref={homeref}
            projref={projref}
            contref={contref}
            aboutref={aboutref}
            handleScroll={handleScroll}
          />
        </div>
      )}
      <div className={darkmode ? "bgimgdark" : "bgimg"}>
        <Heads
          handleScroll={handleScroll}
          homeref={homeref}
          projref={projref}
          contref={contref}
          openMenu={openMenu}
          aboutref={aboutref}
          darkmode={darkmode}
          windowSize={windowSize}
          setOpenMenu={setOpenMenu}
        />
        <MainPage
          darkmode={darkmode}
          windowSize={windowSize}
          homeref={homeref}
          aboutref={aboutref}
          handleScroll={handleScroll}
        />
      </div>
      <Info darkmode={darkmode} windowSize={windowSize} aboutref={aboutref} />
      <Projects darkmode={darkmode} projref={projref} />
      <Contacts darkmode={darkmode} contref={contref} />
      <Footer darkmode={darkmode} />
      <ThemeButton darkmode={darkmode} setDarkmode={setDarkmode} />
    </div>
  );
}
function MenuNav({
  setOpenMenu,
  homeref,
  handleScroll,
  aboutref,
  projref,
  contref,
}) {
  return (
    <ul>
      <li
        onClick={() => {
          setOpenMenu(false);
          handleScroll(homeref);
        }}
      >
        Home
      </li>
      <li
        onClick={() => {
          setOpenMenu(false);
          handleScroll(aboutref);
        }}
      >
        About Me
      </li>
      <li
        onClick={() => {
          setOpenMenu(false);
          handleScroll(projref);
        }}
      >
        Projects
      </li>
      <li
        onClick={() => {
          setOpenMenu(false);
          handleScroll(contref);
        }}
      >
        Contacts
      </li>
    </ul>
  );
}
function Heads({
  darkmode,
  windowSize,
  setOpenMenu,
  handleScroll,
  homeref,
  aboutref,
  openMenu,
  projref,
  contref,
}) {
  return (
    <div className={darkmode ? "darkheader" : "header"}>
      <nav>
        <Logo />
        <Menu
          openMenu={openMenu}
          darkmode={darkmode}
          windowSize={windowSize}
          setOpenMenu={setOpenMenu}
          handleScroll={handleScroll}
          homeref={homeref}
          projref={projref}
          contref={contref}
          aboutref={aboutref}
        />
      </nav>
    </div>
  );
}
function Logo() {
  return (
    <div className="logo">
      <p>Anatoly/dev</p>
    </div>
  );
}
function Menu({
  handleScroll,
  darkmode,
  windowSize,
  setOpenMenu,
  homeref,
  aboutref,
  openMenu,
  projref,
  contref,
}) {
  return (
    <div className={darkmode ? "menudark" : "menu"}>
      {windowSize.width > 643 ? (
        <MenuNav
          handleScroll={handleScroll}
          homeref={homeref}
          projref={projref}
          contref={contref}
          aboutref={aboutref}
          setOpenMenu={setOpenMenu}
        />
      ) : (
        // !openMenu ? (
        <>
          <input type="checkbox" id="checkbox" />
          <label
            htmlFor="checkbox"
            className="toggle"
            onClick={() => setOpenMenu((open) => !open)}
          >
            <div className="bars" id="bar1"></div>
            <div className="bars" id="bar2"></div>
            <div className="bars" id="bar3"></div>
          </label>
        </>
      )}
    </div>
  );
}
function MainPage({ darkmode, windowSize, homeref, handleScroll, aboutref }) {
  // console.log(windowSize);
  return (
    <div className="main">
      <div className="container">
        <div className="contentmain" ref={homeref}>
          {windowSize.width <= 900 && <Avatar />}
          <MainCont
            darkmode={darkmode}
            handleScroll={handleScroll}
            aboutref={aboutref}
          />
          {windowSize.width > 900 && <Avatar />}
        </div>
      </div>
    </div>
  );
}
function MainCont({ darkmode, handleScroll, aboutref }) {
  return (
    <div className="maincont">
      <p className="pereliv zagl">FRONT-END</p>
      <p className={darkmode ? "zagldark" : "zagl"}>DEVELOPER REACT</p>
      <p
        style={{
          marginTop: "50px",
          fontWeight: "300",
          fontSize: "50px",
          lineHeight: "75px",
          color: darkmode ? "white" : "black",
        }}
      >
        Anatoly Isupov <span style={{ marginLeft: "37px" }}>👋🏻</span>
      </p>
      <p style={{ color: darkmode ? "white" : "" }}>📍 Serbia | Novi Sad</p>
      <div style={{ marginTop: "70px" }} className="icns">
        <FaTelegram
          onClick={() => window.open(telegram)}
          className="icons"
          style={{ color: darkmode ? "white" : "" }}
        />
        <FaGithub
          onClick={() => window.open(github)}
          className="icons"
          style={{ color: darkmode ? "white" : "" }}
        />
      </div>

      <div className="dwn" onClick={() => handleScroll(aboutref)}>
        <p>More</p>
        <BsChevronDown style={{ color: darkmode ? "white" : "" }} />
      </div>
    </div>
  );
}

function Info({ darkmode, windowSize, aboutref }) {
  return (
    <div
      className="container"
      style={{
        paddingTop: "100px",
        paddingBottom: "100px",
        color: darkmode ? "white" : "",
      }}
    >
      <div className="inf" ref={aboutref}>
        <img
          src={vector}
          alt="vector"
          style={{ width: "50%", height: "50%" }}
        />
        <div className="info">
          <p className="pereliv zagl">ABOUT ME</p>
          <p className="zagl" style={{ marginTop: "50px" }}>
            {"Hi, I'm a dedicated Front-end Developer".toUpperCase()}
          </p>
          {windowSize.width > 1074 && (
            <>
              <p className="skills" style={{ textAlign: "right" }}>
                I am a junior frontend developer and have html, css, angular,
                react, js skills. I am working hard on creating modern websites
                with a friendly user interface. I have experience writing web
                services that are optimized in their work using advanced
                technologies. I also like working in a team, thinking about
                problems, and most importantly about their solutions.
              </p>
              <div
                className="skills"
                style={{ textAlign: "right", alignItems: "center" }}
              >
                <span style={{ fontWeight: "300", fontSize: "30px" }}>
                  Tech stack |
                </span>
                <FaReact
                  className="ico"
                  style={{ color: darkmode ? "#00dcfe" : "" }}
                />
                <FaHtml5
                  className="ico"
                  style={{ color: darkmode ? "#fb480b" : "" }}
                />
                <FaCss3Alt
                  className="ico"
                  style={{ color: darkmode ? "#2196f3" : "" }}
                />
                <DiJavascript1
                  className="ico"
                  style={{ color: darkmode ? "#fbc238" : "" }}
                />
                <FaAngular
                  className="ico"
                  style={{ color: darkmode ? "#dd0032" : "" }}
                />
                <SiTailwindcss
                  className="ico"
                  style={{ color: darkmode ? "#027fff" : "" }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {windowSize.width <= 1074 && (
        <>
          <p className="skills" style={{ textAlign: "left" }}>
            I am a junior frontend developer and have html, css, angular, react,
            js skills. I am working hard on creating modern websites with a
            friendly user interface. I have experience writing web services that
            are optimized in their work using advanced technologies. I also like
            working in a team, thinking about problems, and most importantly
            about their.
          </p>
          <div className="skills" style={{ textAlign: "left" }}>
            <span style={{ fontWeight: "300", fontSize: "30px" }}>
              Tech stack |
            </span>
            <FaReact
              className="ico"
              style={{ color: darkmode ? "#00dcfe" : "" }}
            />
            <FaHtml5
              className="ico"
              style={{ color: darkmode ? "#fb480b" : "" }}
            />
            <FaCss3Alt
              className="ico"
              style={{ color: darkmode ? "#2196f3" : "" }}
            />
            <DiJavascript1
              className="ico"
              style={{ color: darkmode ? "#fbc238" : "" }}
            />
            <FaAngular
              className="ico"
              style={{ color: darkmode ? "#dd0032" : "" }}
            />
            <SiMui
              className="ico"
              style={{ color: darkmode ? "#027fff" : "" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const elements = [
  {
    id: 1,
    title: "SearchFilms",
    img: "./assets/images/film.png",
    text: "An application for finding movies with the addition of the viewed section. Implemented the addition of a rating.",
    src: "https://osoff.github.io/usepopcorn/",
  },
  {
    id: 2,
    title: "OsOff Shop",
    img: "./assets/images/shop.png",
    text: "Shop application with favorites, products list, card",
    src: "https://osoff.github.io/niketail/",
  },
  {
    id: 3,
    title: "Fast-Pizza",
    img: "./assets/images/pizza.png",
    text: "An application that uses advanced tools: redux, redux-toolkit, react-router-dom v6, tailwindCss",
    src: "https://osoff.github.io/fast-react-pizza/",
  },
];
function Projects({ darkmode, projref }) {
  return (
    <div
      ref={projref}
      className="projects"
      style={{
        color: darkmode ? "white" : "",
      }}
    >
      <div className="container">
        <p className="pereliv zagl pproj">PROJECTS</p>
      </div>
      <div style={{ margin: "100px 0px" }}>
        <Carousel
          swipeable={true}
          keyBoardControl={true}
          responsive={responsive}
        >
          {elements.map((e) => (
            <a href={e.src} target="_blank" rel="noreferrer">
              <ProjEl
                darkmode={darkmode}
                key={e.id}
                title={e.title}
                img={e.img}
                text={e.text}
              />
            </a>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
function ProjEl({ darkmode, title, img, text }) {
  return (
    <div className={darkmode ? "prjeldark" : "prjel"}>
      <h3 className="pereliv">{title}</h3>
      <img src={img} alt="altim" style={{ pointerEvents: "none" }} />
      <p style={{ color: darkmode ? "white" : "black" }}>{text}</p>
    </div>
  );
}
function Contacts({ darkmode, contref }) {
  return (
    <div
      className="container contacts"
      style={{ paddingBottom: "100px", color: darkmode ? "white" : "" }}
    >
      <div>
        <p className="zagl pereliv">CONTACTS</p>
        <p ref={contref} className="zagl cntcs" style={{ marginTop: "50px" }}>
          FOR ANY <span style={{ color: "#4a00ff" }}>PROJECTS INQUIERY</span>{" "}
          {"or for more information about what I do, please feel free to get in touch".toUpperCase()}
        </p>
        <div className="btns">
          <Button hr={gmail}>Email</Button>
          <Button hr={linkedin}>Linkedln</Button>
          <Button hr={telegram}>Telegram</Button>
        </div>
        <p style={{ fontWeight: "300", fontSize: "30px", marginTop: "50px" }}>
          I'm waiting for your message 😉
        </p>
      </div>
    </div>
  );
}
function Button({ children, hr }) {
  return (
    <button className="btn" onClick={() => window.open(hr)}>
      {children}
    </button>
  );
}
function Footer({ darkmode }) {
  return (
    <div className={darkmode ? "footerdark" : "footer"}>
      <div className="container">
        <div
          style={{
            paddingTop: "40px",
            paddingBottom: "40px",
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div>
            <p>Copyright © 2023. All rights are reserved</p>
          </div>
          <div className="fc">
            <FaGithub
              size={24}
              className="fel"
              onClick={() => window.open(github)}
            />
            <FaTelegram
              size={24}
              className="fel"
              onClick={() => window.open(telegram)}
            />
            <SiMaildotru
              size={24}
              className="fel"
              onClick={() => window.open(gmail)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
function ThemeButton({ darkmode, setDarkmode }) {
  useKey("KeyM", function () {
    setDarkmode((dark) => !dark);
  });

  return (
    <>
      <button
        data-tooltip-id="my-tooltip"
        data-tooltip-content="You can press M"
        className="Btn"
        style={{ backgroundColor: darkmode ? "#3330ff" : "" }}
        onClick={() => {
          setDarkmode((dark) => !dark);
        }}
      >
        {darkmode && <BsSunFill className="svgIcon" />}
        {!darkmode && <BsFillMoonFill className="svgIcon" />}
      </button>
      <Tooltip id="my-tooltip" place="left" variant="dark" />
    </>
  );
}
