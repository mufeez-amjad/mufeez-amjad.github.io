import React, { Component } from 'react';

import './Experience.css'

class Experience extends Component {
 render() {
    return (
        <div className="experience">
            <h2>Work Experience</h2>         
            
            <div className="job">
                <h3>Mufeez Amjad Designs</h3>
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
    );
  }
}


export default Experience;