import React, { Component } from "react";

import "./Awards.css";

class Experience extends Component {
  render() {
    return (
      <div className="awards">
        <h2>Awards & Achievements</h2>

        <div className="award">
          <h3>
            <a
              target="blank"
              href="https://devpost.com/mufeez-amjad"
              className="strike">
              Hackathon Awards
            </a>
          </h3>
          <h5>2018 - Present</h5>
          <p>
            PennApps XX (4), HackNYU 2020 (2), Redbull AdrenaLAN, HackThe6ix
          </p>
        </div>

        <div className="award">
          <h3>
            <a target="blank" href="" className="strike">
              Waterloo Engineering Competition
            </a>
          </h3>
          <h5>Nov 2018</h5>
          <p>
            Placed third at the annual competition for building a genetic AI for{" "}
            <i>Tron</i>.
          </p>
        </div>

        <div className="award">
          <h3>
            <a
              target="blank"
              href="https://www.pickering.ca/en/city-hall/civicawards.aspx"
              className="strike">
              City of Pickering Civic Award
            </a>
          </h3>
          <h5>June 2018</h5>
          <p>
            Awarded to a Pickering resident who has exemplified outstanding
            service and achievements.
          </p>
        </div>

        <div className="award">
          <h3>
            <a target="blank" href="http://ecoocs.org/" className="strike">
              Provincial Semi-Finalist - ECOOCS
            </a>
          </h3>
          <h5>Mar 2018</h5>
          <p>
            Placed 2nd in Round 1 and top 20 out of 200+ teams at the Central
            Ontario Finals (April 2018).
          </p>
        </div>
      </div>
    );
  }
}

export default Experience;
