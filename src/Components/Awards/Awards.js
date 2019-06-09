import React, { Component } from "react";

import "./Awards.css";

class Experience extends Component {
  render() {
    return (
      <div className="awards">
        <h2>Awards & Achievements</h2>

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
              href="https://docs.microsoft.com/en-us/azure/"
              className="strike">
              Microsoft Top Contributor for Azure Docs
            </a>
          </h3>
          <h5>Nov 2018</h5>
          <p>
            Awarded for my contributions to the Microsoft Documentation for
            Azure during the Canadian Open Source Doc-a-thon.
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
              2nd Place - ECOO Programming Competition
            </a>
          </h3>
          <h5>Mar 2018</h5>
          <p>
            Placed second in Round 1 and top 20 out of 200+ teams at the Central
            Ontario Finals (April 2018).
          </p>
        </div>
      </div>
    );
  }
}

export default Experience;
