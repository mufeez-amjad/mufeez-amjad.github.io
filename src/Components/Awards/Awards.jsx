import React, { Component } from "react";

import "./Awards.css";

class Experience extends Component {
  render() {
    return (
      <div className="awards">
        <h2>Awards & Achievements</h2>

        <div className="award">
          <h3>
            <a>
              Microsoft Insider2Campus 2019 Finalist
            </a>
          </h3>
          <h5>Jun 2019</h5>
          <p>
            Placed in the top 15 out of over 500 contestants on the basis of passion for collaborative problem solving,
            making a difference, and the potential to inspire.
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
