import React, { Component } from 'react';
import ReactGA from 'react-ga';

import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faDribbble } from '@fortawesome/free-brands-svg-icons'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import resume from './MufeezAmjadResume.pdf'


import './Intro.css'
class Intro extends Component {

    handleClick(target) {
        ReactGA.event({
            category: 'Navigation',
            action: target,
        });
    }

    render() {
        return (
            <div className="intro">
                <img src={logo} alt="logo" />
                <h1>Mufeez Amjad</h1>
                <h2>Software Engineer and Designer</h2>
                <div className="social-media">
                    <a onClick={() => { this.handleClick('Blog') }} href="http://mufeez.me/blog/"><FontAwesomeIcon icon={faRss} size="2x" /></a>
                    <a onClick={() => { this.handleClick('GitHub') }} href='https://github.com/mufeez-amjad' target='blank'><FontAwesomeIcon icon={faGithub} size="2x" /></a>
                    <a onClick={() => { this.handleClick('Dribbble') }} href='https://dribbble.com/mufeez-amjad' target='blank'><FontAwesomeIcon icon={faDribbble} size="2x" /></a>
                    <a onClick={() => { this.handleClick('LinkedIn') }} href='https://linkedin.com/in/mufeez-amjad' target='blank'><FontAwesomeIcon icon={faLinkedinIn} size="2x" /></a>
                    <a href='mailto:mufeez.amjad@uwaterloo.ca'><FontAwesomeIcon icon={faAt} size="2x" /></a>
                    <a onClick={() => { this.handleClick('Resume') }} href={resume} target='blank'><FontAwesomeIcon icon={faFileAlt} size="2x" /></a>
                </div>
            </div>
        );
    }
}

export default Intro;