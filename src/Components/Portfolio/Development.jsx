import React, { Component } from "react";
import ReactGA from "react-ga";

import Project from "./Project/Project";

import "./Development.css";

class Development extends Component {
  constructor() {
    super();

    this.state = {
      projects: [
        {
          name: "Auxilium",
          image: "auxilium.jpg",
          winner: "4 Awards",
          tools: [
            "Node.js",
            "Python",
            "React",
            "Stellar Blockchain",
            "AWS",
            "MongoDB",
          ],
          description: "Registered micro-financing for low-income populations.",
          links: {
            github: "https://github.com/mufeez-amjad/auxilium",
          },
        },
        {
          name: "Stellar Tip",
          image: "stellar-tip.jpg",
          winner: "2 Awards",
          tools: [
            "Node.js",
            "Express",
            "jQuery",
            "Stellar Blockchain",
            "MongoDB",
          ],
          description:
            "A chrome extension for contributing to content creators.",
          links: {
            github: "https://github.com/MichaelxhJiang/stellar-tip",
          },
        },
        {
          name: "Bubbly",
          image: "bubbly.png",
          winner: "Top 10",
          tools: ["Arduino", "React", "CAD"],
          description: "An interactive and programmable bubble wall.",
          links: {
            github: "https://github.com/mufeez-amjad/bubbly",
          },
        },
        {
          name: "Status",
          image: "status.png",
          tools: ["React Native", "Node.js", "Apollo", "GraphQL", "MongoDB"],
          description:
            "A social media app to improve the experience of making plans with friends.",
          links: {
            github: "",
          },
        },
        {
          name: "Nocturnal",
          image: "arduino.jpeg",
          tools: ["Flask", "C++", "Python"],
          description: "A hardware sleep tracker with an analytics dashboard.",
          links: {
            // blog: "blog/posts/se101project/",
            github: "https://github.com/mufeez-amjad/Nocturnal",
          },
        },
        {
          name: "FightVR",
          image: "fightvr.jpg",
          winner: "Best VR Hack",
          tools: ["C#", "Unity"],
          description:
            "An affordable VR solution using unconventional controllers.",
          links: {
            github: "https://github.com/mufeez-amjad/FightVR",
          },
        },
        {
          name: "Bubble Burst",
          image: "bubble_burst.png",
          downloads: "1k+ DLs",
          tools: ["Swift", "Firebase"],
          description: "A popular iOS arcade game inspired by Fruit Ninja.",
          links: {
            github: "https://github.com/mufeez-amjad/BubbleBurst-iOS",
          },
        },
        {
          name: "Pyro",
          image: "pyro.png",
          tools: ["React", "Node.js", "Express", "MongoDB"],
          description:
            "A playlist collaboration app to liven social occasions.",
          links: {
            github: "https://github.com/Abs0luteHacks/pyro",
          },
        },
      ],
    };
  }

  importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
      return images[item.replace("./", "")] = r(item);
    });
    this.setState({ images: images });
  };

  componentWillMount() {
    this.importAll(require.context("./projects", false, /\.(png|jpe?g|svg)$/));
  }

  handleClick(target) {
    ReactGA.event({
      category: "Projects",
      action: "Clicked " + target,
    });
  }

  render() {
    var height = (this.state.projects.length / 2) * 370;
    if (this.state.images) {
      return (
        <div>
          {/* <div className="color-explanation">
            <div>
              <span style={{ color: this.state.types.language }}>■</span> Language
            </div>
            <div>
              <span style={{ color: this.state.types.language }}>■</span> Frontend
            </div>
          </div> */}
          <div className="projects" style={{ height: height }}>
            {this.state.projects.map(({image, ...project}, index) => (
              <Project
                key={index}
                image={this.state.images[image]}
                {...project}
                clickHandler={this.handleClick}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Development;
