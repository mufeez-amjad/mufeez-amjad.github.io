import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import "./Project.css";

class Project extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="project">
        <img src={this.props.image} />
        <div className="content">
          <div className="heading">
            <h1>{this.props.name}</h1>
            <FontAwesomeIcon icon={faGithub} className="links" />
          </div>
          <div className="languages">
            {this.props.languages.map((language) => (
              <em>{language} </em>
            ))}
          </div>
          <div className="description">{this.props.description}</div>
        </div>
      </div>
    );
  }
}

export default Project;
