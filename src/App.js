import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="intro">
          <img src={logo} alt="logo" />
          <h1>Mufeez Amjad</h1>
          <h2>Developer and Designer</h2>
          {/* add social media links here */}
        </div>
        <div className="scrollable">
          {/* TODO: add content here for scrolling down, two columns using flexbox */}
        </div>
      </div>
    );
  }
}

export default App;
