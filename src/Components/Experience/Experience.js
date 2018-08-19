import React, { Component } from 'react';

import './Experience.css'

class Experience extends Component {
 render() {
    return (
        <div className="experience">
            <h2>Work Experience</h2>         
            
            <div className="job">

                <div className="heading">
                    <h3><a href="liberal.ca" className="strike">Liberal Party of Canada</a></h3>
                    <h4>External Communications Liaison</h4>
                </div>
                <h5>Oct 2017 - June 2018</h5>
                <ul>
                    <li>Developed a website showcasing events and initiatives.</li>
                    <li>Ran marketing campaigns with a <b>~120% increase</b> in engagement.</li>
                    <li>Coordinated with the MP office to organize and plan events.</li>
                </ul>

            </div>

            <div className="job">
                <div className="heading">
                    <h3>Mufeez Amjad Designs</h3>
                    <h4>Freelance Graphic/Web Designer</h4>
                </div>
                <h5>Apr 2015 - June 2018</h5>
                <ul>
                    <li>Started during my grade 9 year whilst taking a graphics course.</li>
                    <li>Over <b>200 clients</b> for multiple design projects.</li>
                    <li>Worked on UI/UX design, web design, identity, and marketing.</li>
                </ul>
            </div>

        </div>
    );
  }
}


export default Experience;