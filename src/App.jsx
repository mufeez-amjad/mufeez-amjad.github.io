import * as React from "react";
import "./App.css";
import profile from "./me.png";
import Intro from "./Components/Intro/Intro";
import Experience from "./Components/Experience/Experience";
import Portfolio from "./Components/Portfolio/Portfolio";
import Awards from "./Components/Awards/Awards";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

export default function App() {
  const scrollTo = React.createRef();

  React.useEffect(() => {
    ReactGA.initialize("UA-131240409-1");
    ReactGA.pageview("/home");
  }, []);

  const scrollToContent = React.useCallback(() => {
    scrollTo.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [scrollTo]);

  React.useEffect(() => {
    if (window.screen.width >= 600) {
      scrollToContent();
    }
  }, [scrollTo, scrollToContent])

  const { term, coop } = React.useMemo(() => {
    return calculateTerm();
  }, []);

  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="author" content="Mufeez Amjad" />
        <meta
          name="description"
          content="Mufeez Amjad — Software Engineer — Toronto, CA"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="Mufeez Amjad, Waterloo, Software Engineer, Designer, Toronto"
        />
      </Helmet>
      <Intro />

      <div className="scrollable">
        <button className="chevron" ref={scrollTo} onClick={() => scrollToContent()}>
          <FontAwesomeIcon color="#35a6de" icon={faChevronDown} size="2x" />
        </button>
        <div className="about">
          <h1>Hey there!</h1>

          <div className="profile">
            <img src={profile} alt="Profile" />
            <p className="summary">
              I’m {term} <em>Software Engineering</em> student at the University
              of Waterloo with a strong background in both{" "}
              <em>software development</em> and <em>graphic design</em>.
            </p>
          </div>

          <div
            style={{
              padding: "10px 0 0 0",
              marginLeft: "15px",
              marginRight: "15px",
            }}>
            <p style={{ textAlign: "center" }}>
              <b>
                Currently looking for{" "}
                <span style={{ color: "#35a6de" }}>{coop}</span> software
                internships!
              </b>
            </p>
          </div>

          <div className="skills">
            <p className="left">I have worked with:</p>
            <p className="list">
              <span className="languages">
                <em>Python</em> <em>C/C++</em> <em>Java</em> <em>JavaScript</em>{" "}
                <em>SQL</em> <em>Scala</em>{" "}
              </span>
              <span className="frameworks">
                <em>React</em> <em>Node.js</em> <em>Flask</em> <em>GraphQL</em>{" "}
                <em>Express</em>
              </span>
            </p>
          </div>
        </div>

        <Experience />

        <Awards />

        <Portfolio />
      </div>
    </div>
  );
}

const addMonths = (oldDate, nMonths) =>
  new Date(oldDate.setMonth(oldDate.getMonth() + nMonths));

const calculateTerm = () => {
  const today = new Date(); //"01/07/2019"
  var currentTerm = "an incoming";
  var coopTerm = "";
  //Fall: Sept 6
  //Winter: Jan 7
  //Spring: May 6
  var oneA = new Date("September 2, 2018");
  var oneB = new Date("January 7, 2019");
  var twoA = new Date("September 5, 2019"); //Fall -> Spring
  var twoB = new Date("May 4, 2020"); //Spring -> Winter
  var threeA = new Date("January 4, 2021"); //Winter -> Fall
  var threeB = new Date("September 9, 2021"); //Fall -> Spring
  var fourA = new Date("May 9, 2022"); //Spring -> Winter
  var fourB = new Date("January 9, 2023");
  var graduation = new Date("June 1, 2018");

  if (today < oneA) {
    currentTerm = "an incoming";
  } else if (today < oneB) {
    currentTerm = "a 1A";
  } else if (today < twoA) {
    currentTerm = "a 1B";
    coopTerm = "Summer 2019";
    if (today > addMonths(oneB, 4)) {
      coopTerm = "Winter 2020";
    }
  } else if (today < twoB) {
    currentTerm = "a 2A";
    coopTerm = "Winter 2020";
    if (today > addMonths(twoA, 2)) {
      coopTerm = "Fall 2020";
    }
  } else if (today < threeA) {
    currentTerm = "a 2B";
    coopTerm = "Fall 2020";
    if (today > addMonths(twoB, 2)) {
      coopTerm = "Summer 2021";
    }
  } else if (today < threeB) {
    currentTerm = "a 3A";
    coopTerm = "Summer 2021";
    if (today > addMonths(threeA, 2)) {
      coopTerm = "Winter 2022";
    }
  } else if (today < fourA) {
    currentTerm = "a 3B";
    coopTerm = "Winter 2022";
    if (today > addMonths(threeB, 2)) {
      coopTerm = "Fall 2022";
    }
  } else if (today < fourB) {
    currentTerm = "a 4A";
    coopTerm = "Fall 2022";
  } else if (today < graduation) {
    currentTerm = "a 4B";
  }

  return {
    term: currentTerm,
    coop: coopTerm,
  };
};
