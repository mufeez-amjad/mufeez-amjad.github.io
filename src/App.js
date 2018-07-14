import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
import profile from './profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  constructor(){
    super();
    this.state = {
      opacity: 0,
    };
    this.scrollEvent = this.scrollEvent.bind(this);
}

  scrollEvent() {
    this.setState({
      opacity: this.state.opacity + 1,
    });
  }

  render() {
    return (
      <div className="app" onScroll={this.scrollEvent}>
        
        <div className="intro">
          <img src={logo} alt="logo" />
          <h1>Mufeez Amjad</h1>
          <h2><span style={{color: "#68c248"}}>Developer</span> and <span style={{color: "#ff5252"}}>Designer</span></h2>
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
                with experience in both <em style={{color: "#68c248"}}>software development</em> and <em style={{color: "#ff5252"}}>graphic design</em>.</p>
          
            <br></br>

            <p>With my skillset, I love contributing to projects in their ideation phase in addition to the prototyping phase.</p>
            
            <div className="skills">
              <p style={{float: "left"}}>I have worked with:</p>
              <p style={{marginTop: "30px"}}>
                <span class="develop">  <em>Java</em> <em>Swift</em> <em>Python</em> <em>Node.js</em> <em>React.js</em> </span>
                <span class="design"><em>Adobe Creative Suite</em> <em>Sketch</em></span>
              </p>

              <p style={{float: "left"}}>I have worked on:</p>
              <p style={{marginTop: "31px", marginLeft: "20px"}}>
                <span class="develop"> <em>Frontend Web</em> <em>Backend Web</em></span>
                <span class="both"> <em>Mobile Apps </em><em>Games</em> </span>
                <span class="design"> <em>UI/UX Designs</em> <em>Animation</em> <em>Web Design</em></span>
              </p>
            </div>
          </div>         
        </div>
      </div>
    );
  }
}

export default App;
