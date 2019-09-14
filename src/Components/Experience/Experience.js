import React, { Component } from 'react';

import './Experience.css'

class Experience extends Component {
    render() {
        return (
            <div className="experience">
                <h2>Work Experience</h2>

                <div className="job">

                    <div className="heading">
                        <h3><a href="https://kitchenmate.com" target="blank" className="strike">KitchenMate</a></h3>
                        <h4>Software Engineer Intern</h4>
                    </div>
                    <h5>May 2019 - Aug 2019</h5>
                    <ul>
                        <li>Implemented costing algorithms, led several product launches, made performance enhancements, and worked on IoT hardware.</li>
                    </ul>


                </div>

                <div className="job">

                    <div className="heading">
                        <h3><a href="https://watonomous.ca/#/" target="blank" className="strike">WATonomous</a></h3>
                        <h4>Web Infrastructure Developer</h4>
                    </div>
                    <h5>Sept 2018 - Dec 2018</h5>
                    <ul>
                        <li>Created an applicant administration interface for screening, scheduling, and accepting applicants.</li>
                    </ul>

                </div>

                <div className="job">

                    <div className="heading">
                        <h3><a className="strike">Major Political Party</a></h3>
                        <h4>Web Developer & Designer</h4>
                    </div>
                    <h5>Oct 2017 - June 2018</h5>
                    <ul>
                        <li>Developed a website and ran marketing campaigns.</li>
                    </ul>

                </div>

                <div className="job">
                    <div className="heading">
                        <h3><a className="strike">Mufeez Amjad Designs</a></h3>
                        <h4>Freelance Graphic/Web Designer</h4>
                    </div>
                    <h5>Apr 2015 - June 2018</h5>
                    <ul>
                        <li>Generated over $18000 in revenue through web design, UI/UX, branding, etc projects.</li>
                    </ul>
                </div>

            </div>
        );
    }
}


export default Experience;