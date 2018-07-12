import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
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
            <img src={logo} alt="Profile"/>
            <p>I’m an incoming <em>Software Engineering</em> student at the University of Waterloo
                with experience in both <em>software development</em> and <em>graphic design</em>.</p>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
