import React, { Component } from 'react';
import './App.css';
import profile from './profile.jpg';
import Intro from './Components/Intro/Intro';
import Experience from './Components/Experience/Experience';
import Portfolio from './Components/Portfolio/Portfolio';
import Awards from './Components/Awards/Awards'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ReactGA from 'react-ga';
import {Helmet} from "react-helmet";

//TODO: add project modals
//TODO: reduce file size for images
//TODO: fix image size

//TODO: https://css-tricks.com/animate-a-container-on-mouse-over-using-perspective-and-transform/

class App extends Component {
  constructor() {
    super();
    this.state = {
      term: "an incoming",
      coop: ""
    };
    this.scrollTo = React.createRef();
  }

  initializeReactGA() {
    ReactGA.initialize('UA-131240409-1');
    ReactGA.pageview('/home');
  }

  componentWillMount() {
    this.calculateTerm();
    this.initializeReactGA();
  }

  componentDidMount() {
    if (window.screen.width >= 600) {
      this.scrollTo.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  }

  calculateTerm() {
    const today = new Date(); //"01/07/2019"
    var currentTerm = "an incoming";
    var coopTerm = "";
    //Fall: Sept 6
    //Winter: Jan 7
    //Spring: May 6
    var oneA = new Date('September 2, 2018');
    var oneB = new Date('January 7, 2019');      
    var twoA = new Date('September 5, 2019'); //Fall -> Spring
    var twoB = new Date('May 4, 2020'); //Spring -> Winter
    var threeA = new Date('January 4, 2021'); //Winter -> Fall
    var threeB = new Date('September 9, 2021'); //Fall -> Spring    
    var fourA = new Date('May 9, 2022'); //Spring -> Winter
    var fourB = new Date('January 9, 2023');
    var graduation = new Date('June 1, 2018');

    if (today < oneA){
      currentTerm = 'an incoming';
    }
    else if (today < oneB) {
      currentTerm = "a 1A";
    }
    else if (today < twoA) {
      currentTerm = "a 1B";
      coopTerm = "Summer 2019";
    }
    else if (today < twoB) {
      currentTerm = "a 2A";
      coopTerm = "Winter 2020";
    }
    else if (today < threeA) {
      currentTerm = "a 2B";
      coopTerm = "Fall 2020";
    }
    else if (today < threeB) {
      currentTerm = "a 3A";
      coopTerm = "Summer 2021";
    }
    else if (today < fourA) {
      currentTerm = "a 3B";
      coopTerm = "Winter 2022";
    }
    else if (today < fourB) {
      currentTerm = "a 4A";
      coopTerm = "Fall 2022";
    }
    else if (today < graduation) {
      currentTerm = "a 4B";
    }

    this.setState({
      term: currentTerm,
      coop: coopTerm
    });
  }

  render() {

    return (
      <div className="app">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="author" content="Mufeez Amjad"/>
                <meta name="description" content="Mufeez Amjad — Software Engineer — Toronto, CA"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>     
                <meta name="keywords" content="Mufeez Amjad, Waterloo, Software Engineer, Designer, Toronto" />
            </Helmet>
        <Intro />

        <div className="scrollable">
        
          <a className="chevron"> 
            <FontAwesomeIcon color="#35a6de" icon={faChevronDown} size="2x"/>
          </a>
         
          <h1 ref={this.scrollTo}>
            Hey there!
          </h1>

          <div className="profile">
            <img src={profile} alt="Profile" />
            <p className="summary">I’m {this.state.term} <em>Software Engineering</em> student at the University of Waterloo
                with experience in both <em>software development</em> and <em>graphic design</em>.
            </p>
          </div>
          
          <div className="blog">
            <p>To read about my experiences and projects, head over to my <a href="http://mufeez.me/blog/">blog</a>!</p>
            <p style={{marginTop: '-10px', marginBottom: '-5px'}}><b>Currently looking for {this.state.coop} software internships!</b></p>
          </div>

          <div className="skills">
            <p className="left">I have worked with:</p>
            <p className='list'>
              <span className="languages"><em>Python</em> <em>Java</em> <em>C/C++</em> <em>Swift</em> <em>JavaScript</em> <em>C#</em> </span>
              <span className="frameworks"><em>React.js</em> <em>Node.js</em> <em>Socket.IO</em> <em>Flask</em> <em>React Native</em> <em>MongoDB</em> <em>Firebase</em> <em>Git</em></span> 
              <span className="software"><em>Adobe Creative Suite</em> <em>Sketch</em></span> 
            </p>
          </div>

          <Experience />

          <Awards />

          <Portfolio />

        </div>

      </div>
    );
  }
}

export default App;
