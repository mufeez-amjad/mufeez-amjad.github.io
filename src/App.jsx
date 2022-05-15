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

import webring from './webring.svg'

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

      <div
        style={{
            position: 'fixed',
            bottom: 10,
            left: 0,
            backgroundColor: 'white',
            padding: 5,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center'
        }}
      >
        <a
          target="_blank"
          href="https://se-webring.xyz/"
        >
          <img 
            src={webring} 
            style={{
              width: 20,
              height: 'auto',
              display: 'block'
            }} 
          />
        </a>
        
      </div>

      <div className="scrollable">
        <button className="chevron" ref={scrollTo} onClick={() => scrollToContent()}>
          <FontAwesomeIcon color="#35a6de" icon={faChevronDown} size="2x" />
        </button>
        <div className="about">
          <h1>Hey there!</h1>

          <div className="profile">
            <div className="intro">
              <img src={profile} alt="Profile" />
              <p className="summary">
                I’m {term} <em>Software Engineering</em> student at the University
                of Waterloo with a passion for building the infrastructure driving great products.
              </p>
            </div>
            
            <p>
              You can often find me automating my life, reading TechCrunch, browsing tech and crypto Twitter, or maybe playing Valorant!
            </p>
          </div>

          <div>
            <p style={{ textAlign: "center" }}>
              <b>
                Currently looking for{" "}
                <span style={{ color: "#35a6de" }}>full-time</span> opportunities!
              </b>
            </p>
          </div>

          <div className="skills">
            <p className="left">I have worked with:</p>
            <p className="list">
              <span className="languages">
                <em>Python</em> <em>Golang</em> <em>C++</em> <em>JavaScript</em> <em>SQL</em>
              </span>
              <span className="technologies">
                <em>Kubernetes</em> <em>AWS</em> <em>React</em> <em>Flask</em> <em>GraphQL</em>{" "}
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
  const today = addMonths(new Date(), 2); // "01/07/2019"
  var currentTerm = "a 4A";

  var fourB = new Date("December 23, 2022");
  
  if (today > fourB) {
    currentTerm = "a 4B";
  }

  return {
    term: currentTerm,
  };
};
