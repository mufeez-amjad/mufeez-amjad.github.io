import React, { Component } from 'react';
import './App.css';
import profile from './profile.jpg';
import Intro from './Components/Intro/Intro'
import Experience from './Components/Experience/Experience'
import Portfolio from './Components/Portfolio/Portfolio'

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
        
        <Intro />

        <div className="scrollable" style={{opacity: this.state.opacity}}>
          <h1>Hello world!</h1>
          
          <div className="profile">
            <img src={profile} alt="Profile"/>
            <p className="summary">I’m an incoming <em>Software Engineering</em> student at the University of Waterloo
                with experience in both <em>software development</em> and <em>graphic design</em>.</p>
          
            <br></br>
            <p>With my skillset, I love contributing to a project's design, in addition to its development.</p>
          </div>
          
          <div className="skills">
            <p style={{float: "left"}}>I have worked with:</p>
            <p style={{marginTop: "30px"}}>
              <span class="develop">  <em>Java</em> <em>Swift</em> <em>Python</em> <em>Node.js</em> <em>React.js</em> </span>
              <span class="design"><em>Adobe Creative Suite</em> <em>Sketch</em></span>
            </p>
          </div>
          
        <Experience />

        <Portfolio />
          

        </div>
      </div>
    );
  }
}

export default App;
