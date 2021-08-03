import * as React from "react";
import Award from "./Award";

import "./Awards.css";

const awards = [
  {
    name: 'Stellar Community Fund',
    link: 'https://galactictalk.org/d/2327-stellar-tip-tipping-for-content-creators-and-developers',
    date: 'March 2020',
    details: 'Received ~100k+ USD for development of an open source project.'
  },
  {
    name: 'Hackathon Awards',
    link: 'https://devpost.com/mufeez-amjad',
    date: '2018 - Present',
    details: 'PennApps XX (4), HackNYU 2020 (2), Redbull AdrenaLAN, HackThe6ix'
  },
  {
    name: 'City of Pickering Civic Award',
    link: 'https://www.pickering.ca/en/city-hall/civicawards.asp',
    date: 'June 2018',
    details: 'Awarded to a Pickering resident who has exemplified outstanding service and achievements.'
  }
]

const Experience = () => {
    
  return (
      <div className="awards">
        <h2>Awards & Achievements</h2>
        {awards.map(award => <Award {...award} />)}
      </div>
    );
}

export default Experience;
