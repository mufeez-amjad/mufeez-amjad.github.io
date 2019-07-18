import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'

import "./Project.css";

class Project extends Component {
  constructor() {
    super();
  }

  links = () => {
    return (
      <div className="links">
        {this.props.links.blog ? <a href={this.props.links.blog} target="_blank" onClick={() => this.props.clickHandler("Blog:" + this.props.name)}><FontAwesomeIcon icon={faRss} /></a> : null}
        {this.props.links.github ? <a href={this.props.links.github} target="_blank" onClick={() => this.props.clickHandler("Github:" + this.props.name)}><FontAwesomeIcon icon={faGithub} /></a> : null}
      </div>
    )
  }

  render() {
    return (
      <div className="project">
        <img src={this.props.image} />
        <div className="content">
          <div className="heading">
            <h1>{this.props.name}</h1>
            {this.links()}
          </div>
          <div className="description">{this.props.description}</div>
          <div className="languages">
            {this.props.tools.map((language, index) => (
              <em key={index}>{language}</em>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
