import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import "./Project.css";

class Project extends Component {
  constructor() {
    super();

    var types = {
      "language": "#FE4B4B",
      "frontend": "#36A2F3",
      "backend": "#40BD61",
      "fullstack": "#3DA9BB",
      "db": "#B957AD"
    };

    this.state = {
      colors: {
        "React Native": types["frontend"],
        "Flask": types["fullstack"],
        "Node.js": types["backend"],
        "Apollo": types["backend"],
        "GraphQL": types["db"],
        "C++": types["language"],
        "Python": types["language"],
        "MongoDB": types["db"],
        "C#": types["language"],
        "Swift": types["language"],
        "Firebase": types["db"],
        "Express": types["backend"],
        "React": types["frontend"]
      }
    }
  }

  render() {
    return (
      <div className="project">
        <img src={this.props.image} />
        <div className="content">
          <div className="heading">
            <h1>{this.props.name}</h1>
            {this.props.github ? <FontAwesomeIcon icon={faGithub} className="link" /> : null}
          </div>
          <div className="languages">
            {this.props.tools.map((language) => (
              <em style={{ background: this.state.colors[language] }}>{language}</em>
            ))}
          </div>
          <div className="description">{this.props.description}</div>
        </div>
      </div>
    );
  }
}

export default Project;
