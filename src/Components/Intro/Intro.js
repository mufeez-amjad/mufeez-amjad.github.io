import React, { Component } from 'react';

import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faDribbble } from '@fortawesome/free-brands-svg-icons'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'

import './Intro.css'
class Intro extends Component {
 render() {
    return (
        <div className="intro">
            <img src={logo} alt="logo" />
            <h1>Mufeez Amjad</h1>
            <h2>Developer and Designer</h2>
            <div className="social-media">
            <a href='https://github.com/mufeez-amjad' target='blank'><FontAwesomeIcon icon={faGithub} size="2x"/></a>
            <a href='https://dribbble.com/mufeez-amjad' target='blank'><FontAwesomeIcon icon={faDribbble} size="2x"/></a>
            <a href='https://linkedin.com/in/mufeezamjad' target='blank'><FontAwesomeIcon icon={faLinkedinIn} size="2x"/></a>
            <a href='' target='blank'><FontAwesomeIcon icon={faFileAlt} size="2x"/></a>
            </div>
        </div>
    );
  }
}


export default Intro;