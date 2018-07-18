import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
import profile from './profile.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

import Tabs from './Tabs/Tabs.js';

class App extends Component {

  constructor(){
    super();
    this.state = {
      opacity: 0,
      active: 'aTab',
    };
    this.scrollEvent = this.scrollEvent.bind(this);
}

  scrollEvent() {
    this.setState({
      opacity: this.state.opacity + 1,
    });
  }

  render() {
    const content = {
      aTab: 'Tab A',
      bTab: 'Tab B',
    };
    return (
      <div className="app" onScroll={this.scrollEvent}>
        
        <div className="intro">
          <img src={logo} alt="logo" />
          <h1>Mufeez Amjad</h1>
          <h2>Developer and Designer</h2>
          <div className="social-media">
            <a href='https://github.com/mufeez-amjad' target='blank'><FontAwesomeIcon id="github" icon={faGithub} size="2x"/></a>
            <a href='https://linkedin.com/in/mufeezamjad' target='blank'><FontAwesomeIcon icon={faLinkedin} size="2x"/></a>
            <a href='' target='blank'><FontAwesomeIcon icon={faFilePdf} size="2x"/></a>
          </div>
        </div>

        <div className="scrollable" style={{opacity: this.state.opacity}}>
          <h1>Hello world!</h1>
          
          <div className="profile">
            <img src={profile} alt="Profile"/>
            <p className="summary">I’m an incoming <em>Software Engineering</em> student at the University of Waterloo
                with experience in both <em>software development</em> and <em>graphic design</em>.</p>
          
            <br></br>
            <p>With my skillset, I love contributing to a project's design, in addition to it's development.</p>
          </div>
          
          <div className="skills">
            <p style={{float: "left"}}>I have worked with:</p>
            <p style={{marginTop: "30px"}}>
              <span class="develop">  <em>Java</em> <em>Swift</em> <em>Python</em> <em>Node.js</em> <em>React.js</em> </span>
              <span class="design"><em>Adobe Creative Suite</em> <em>Sketch</em></span>
            </p>

            {/* <p style={{float: "left", marginTop: "0px"}}>I have worked on:</p>
            <p style={{margin: "17px 60px 0 0"}}>
              <span class="develop"> <em>Frontend Web</em> <em>Backend Web</em></span>
              <span class="both"> <em>Mobile Apps </em><em>Games</em> </span>
              <span class="design"> <em>UI/UX Designs</em> <em>Animation</em> <em>Web Design</em></span>
            </p> */}
          </div>
          <div className="experience">
            <h2>Work Experience</h2>         
            
            <div className="job">
              <h3>Mufeez Amjad Designs</h3>
              {/* top right bottom left  */}
              <h5>Apr 2015 - June 2018</h5>
              <div className="details"> 
                <h4>Freelance Graphic Designer</h4>
                <ul>
                  <li>Started during my grade 9 year whilst taking a graphics course</li>
                  <li>Over 200 clients for multiple design projects</li>
                  <li>Worked on UI/UX design, web design, identity, and marketing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="portfolio">
            <h2>Portfolio</h2>         
            <Tabs
              active={this.state.active}
              onChange={active => this.setState({active})}
            >
              <div key="aTab">Development</div>
              <div key="bTab">Design</div>
            </Tabs>
            <p>{content[this.state.active]}</p>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
