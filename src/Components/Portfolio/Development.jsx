import React, { Component } from "react";
import ReactGA from "react-ga";

import Project from "./Project/Project";

import greenbox from "./projects/GreenBox/greenbox.png";
import "./Development.css";

class Development extends Component {
  constructor() {
    super();

    this.state = {
      isShowing: false
    };
  }

  handleClick(target) {
    ReactGA.event({
      category: "Projects",
      action: "Clicked " + target
    });
  }

  render() {
    function importAll(r) {
      let images = {};
      r.keys().map((item, index) => {
        images[item.replace("./", "")] = r(item);
      });
      return images;
    }

    const images = importAll(
      require.context("./tech", false, /\.(png|jpe?g|svg)$/)
    );

    return (
      <div className="portfolio-items">
        <Project
          name="GreenBox"
          image={greenbox}
          languages={["React Native", "Node.js", "Apollo", "GraphQL", "MongoDB"]}
          description="A social media app to make linking up with friends easy."
        />
        <Project
          name="GreenBox"
          image={greenbox}
          languages={["hello", "world", "lmao"]}
        />
        <Project
          name="GreenBox"
          image={greenbox}
          languages={["hello", "world", "lmao"]}
        />
        <Project
          name="GreenBox"
          image={greenbox}
          languages={["hello", "world", "lmao"]}
        />
        <Project
          name="GreenBox"
          image={greenbox}
          languages={["hello", "world", "lmao"]}
        />
      </div>
    );
  }
}

export default Development;
