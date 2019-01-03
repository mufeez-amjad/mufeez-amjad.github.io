import React, { Component } from 'react';

import './Experience.css'

class Experience extends Component {
 render() {
    return (
        <div className="experience">
            <h2>Work Experience</h2>   

            <div className="job">

                <div className="heading">
                    <h3><a href="https://watonomous.ca/#/" target="blank" className="strike">WATOnomous</a></h3>
                    <h4>Web Infrastructure Developer</h4>
                </div>
                <h5>Sept 2018 - Dec 2018</h5>
                <ul>
                    <li>Developed a <b>Django</b>-based applicant administration interface</li>
                    <li>Built a <b>RESTful API</b> to screen, schedule interviews, and accept applicants</li>
                </ul>

            </div>      
            
            <div className="job">

                <div className="heading">
                    <h3><a href="https://www.liberal.ca/" target="blank" className="strike">Liberal Party of Canada</a></h3>
                    <h4>Web Developer & Designer</h4>
                </div>
                <h5>Oct 2017 - June 2018</h5>
                <ul>
                    <li>Developed a website using <b>HTML, CSS, and JS</b> for events and initiatives</li>
                    <li>Achieved <b>1.5x visitor conversion rate</b></li>
                    <li>Ran marketing campaigns with a <b>110% increase in engagement</b></li>
                </ul>

            </div>

            <div className="job">
                <div className="heading">
                    <h3>Mufeez Amjad Designs</h3>
                    <h4>Freelance Graphic/Web Designer</h4>
                </div>
                <h5>Apr 2015 - June 2018</h5>
                <ul>
                    <li>Over <b>200 clients</b> for websites, UI/UX, branding, products, etc</li>
                    <li>Generated $18k in revenue, experiencing <b>65% year on year growth</b></li>
                    <li>Published 4 approved Snapchat geofilters with over <b>1.6 million views</b></li>
                </ul>
            </div>

        </div>
    );
  }
}


export default Experience;