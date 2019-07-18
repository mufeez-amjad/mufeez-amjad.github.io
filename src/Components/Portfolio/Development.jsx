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
          name: "GreenBox",
          image: "greenbox.png",
          tools: [
            "React Native", "Node.js", "Apollo", "GraphQL", "MongoDB"
          ],
          description: "A social media app to make linking up with friends easy.",
          github: "github"
        },
        {
          name: "Nocturnal",
          image: "arduino.jpeg",
          tools: [
            "Flask", "C++", "Python"
          ],
          description: "A hardware sleep tracker with an analytics dashboard.",
          blog: "mufeez.me/blog/posts/se101project/"
        },
        {
          name: "FightVR",
          image: "fightvr.jpg",
          tools: [
            "C#"
          ],
          description: "An affordable VR solution using unconventional controllers.",
          github: "github",
          winner: true
        },
        {
          name: "Bubble Burst",
          image: "bubble_burst.png",
          tools: [
            "Swift", "Firebase"
          ],
          description: "A popular iOS arcade game inspired by Fruit Ninja.",
          github: "github",
        },
        {
          name: "Pyro",
          image: "pyro.png",
          tools: [
            "React", "Node.js", "Express", "MongoDB"
          ],
          description: "A playlist collaboration app to liven social occasions.",
          github: "github",
          winner: true
        }
      ]
    };
  }

  importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    this.setState({ images: images });
  }

  componentWillMount() {
    this.importAll(
      require.context("./projects", false, /\.(png|jpe?g|svg)$/)
    );
  }

  handleClick(target) {
    ReactGA.event({
      category: "Projects",
      action: "Clicked " + target
    });
  }

  render() {
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
          <div className="projects">
            {this.state.projects.map((project, index) => (
              <Project
                name={project.name}
                image={this.state.images[project.image]}
                tools={project.tools}
                description={project.description}
                types={this.state.types}
              />
            ))
            }
          </div>
        </div >
      );
    }
  }
}

export default Development;
