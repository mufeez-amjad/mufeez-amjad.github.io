import React, { Component } from 'react';

import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

import './Intro.css'
class Intro extends Component {
 render() {
    return (
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
    );
  }
}


export default Intro;