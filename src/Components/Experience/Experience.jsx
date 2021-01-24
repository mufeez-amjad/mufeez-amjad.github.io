import React, { Component } from "react";

import "./Experience.css";

class Experience extends Component {
  render() {
    return (
      <div className="experience">
        <h2>Work Experience</h2>
        
        <div className="job">
          <div className="heading">
            <h3>
              <a href="https://tatari.tv" target="blank" className="strike">
                Tatari
              </a>
            </h3>
            <h4>Infrastructure Engineer Intern</h4>
          </div>
          <h5>Sep - Dec 2020 | San Francisco, CA (Remote)</h5>
          <ul>
            <li>
              Worked on building and maintaining ETL pipelines using AWS Redshift, Lambda, Kinesis.
            </li>
          </ul>
        </div>
        <div className="job">
          <div className="heading">
            <h3>
              <a href="https://tatari.tv" target="blank" className="strike">
                Tatari
              </a>
            </h3>
            <h4>Backend Engineer Intern</h4>
          </div>
          <h5>Jan - Apr 2020 | New York, NY</h5>
          <ul>
            <li>
              Developed end-to-end features for new booking platform and
              independently created a dashboard with surfaced KPIs
            </li>
          </ul>
        </div>

        <div className="job">
          <div className="heading">
            <h3>
              <a
                href="https://kitchenmate.com"
                target="blank"
                className="strike">
                KitchenMate
              </a>
            </h3>
            <h4>Software Engineer Intern</h4>
          </div>
          <h5>May - Aug 2019 | Toronto, ON</h5>
          <ul>
            <li>
              Implemented costing algorithms, led several product launches, made
              performance enhancements, and worked on IoT hardware.
            </li>
          </ul>
        </div>

        <div className="job">
          <div className="heading">
            <h3>
              <a
                href="https://watonomous.ca/#/"
                target="blank"
                className="strike">
                WATonomous
              </a>
            </h3>
            <h4>Web Infrastructure Developer</h4>
          </div>
          <h5>Sept - Dec 2018 | Waterloo, ON</h5>
          <ul>
            <li>
              Created an applicant administration interface for screening,
              scheduling, and accepting applicants.
            </li>
          </ul>
        </div>

        <div className="job">
          <div className="heading">
            <h3>
              <a className="strike">Mufeez Amjad Designs</a>
            </h3>
            <h4>Freelance Graphic/Web Designer</h4>
          </div>
          <h5>Apr 2015 - June 2018</h5>
          <ul>
            <li>
              Generated over $18000 in revenue through web design, UI/UX,
              branding, etc projects.
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Experience;
