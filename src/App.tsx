import React from 'react';
import styled from 'styled-components';

import photo from './photo.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFileAlt, faAt } from '@fortawesome/free-solid-svg-icons'


const PROJECTS = [
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
      github: "https://github.com/mufeez-amjad/auxilium",
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
      github: "https://github.com/MichaelxhJiang/stellar-tip",
  },
  {
    name: "Bubbly",
    image: "bubble_wall.png",
    winner: "Top 10",
    tools: ["Arduino", "React", "CAD"],
    description: "An interactive and programmable bubble wall.",
      github: "https://github.com/mufeez-amjad/bubbly",
  },
  {
    name: "Status",
    image: "status.png",
    tools: ["React Native", "Node.js", "Apollo", "GraphQL", "MongoDB"],
    description:
      "A social media app to improve the experience of making plans with friends.",
  },
  {
    name: "Nocturnal",
    image: "arduino.jpeg",
    tools: ["Flask", "C++", "Python"],
    description: "A hardware sleep tracker with an analytics dashboard.",
      github: "https://github.com/mufeez-amjad/Nocturnal",
  },
  {
    name: "FightVR",
    image: "fightvr.jpg",
    winner: "Best VR Hack",
    tools: ["C#", "Unity"],
    description:
      "An affordable VR solution using unconventional controllers.",
      github: "https://github.com/mufeez-amjad/FightVR",
  },
  {
    name: "Bubble Burst",
    image: "bubble_burst.png",
    downloads: "1k+ DLs",
    tools: ["Swift", "Firebase"],
    description: "A popular iOS arcade game inspired by Fruit Ninja.",
      github: "https://github.com/mufeez-amjad/BubbleBurst-iOS",
  },
  {
    name: "Pyro",
    image: "pyro.png",
    tools: ["React", "Node.js", "Express", "MongoDB"],
    description:
      "A playlist collaboration app to liven social occasions.",
      github: "https://github.com/Abs0luteHacks/pyro",
  },
];

function App() {
  return (
    <Container>
      <Contact href='mailto:mufeez.amjad@uwaterloo.ca'>
        Get in touch →
      </Contact>

      <div style={{ margin: '100px 0' }}>
        <Availability>
          <span>•</span><span>Seeking 2023 new grad opportunities!</span>
        </Availability>
        <Intro>
          <img src={photo} />
          <h1><span>Mufeez Amjad</span> • Software Engineer</h1>
          <h2>Graphic Designer and Hobbyist Photographer</h2>
          <div className="social-media">
            <a href='https://github.com/mufeez-amjad' target='blank'><FontAwesomeIcon icon={faGithub} className="icon" size="lg" /></a>
            <a href='https://twitter.com/mufeezamjad' target='blank'><FontAwesomeIcon icon={faTwitter} className="icon" size="lg" /></a>
            <a href='https://linkedin.com/in/mufeez-amjad' target='blank'><FontAwesomeIcon icon={faLinkedinIn} className="icon" size="lg" /></a>
            <a href='mailto:mufeez.amjad@uwaterloo.ca'><FontAwesomeIcon icon={faAt} className="icon" size="lg" /></a>
            <a href={process.env.PUBLIC_URL + '/MufeezAmjadResume.pdf'} target='blank'><FontAwesomeIcon icon={faFileAlt} className="icon" size="lg" /></a>
          </div>
        </Intro>

        <Content>
          <p>Hey there! I’m a 4A Software Engineering student at the University of Waterloo with a passion for building the infrastructure driving great products.</p>
          <p>I've completed <b className='cyan'>6 internships</b> throughout my undergrad degree, ranging from startups to large tech companies. You can read about my work on my <a href="./MufeezAmjadResume.pdf">resume</a>.</p>
          <p>In a past life I worked as a graphic designer, now I use those skills to beautify the UI & UX for my side projects. You can often find me automating my life, reading TechCrunch, browsing tech and crypto Twitter, or maybe playing Valorant!</p>
        </Content>
      </div>

      <Projects>
        <h1>Selected Projects</h1>
        
        <div>
          <Project>
            <video autoPlay muted loop>
              <source src="projects/pixelpal.mov" type="video/mp4" />
            </video>
            <div className="overlay">
              <h1>PixelPal</h1>
              <h2>2022</h2>
              <p>A tamagotchi-like companion in your menu bar with an accompanying calendar and todo list.</p>
              <div className="pills">
                {["Electron", "React", "Redux", "styled-components", "Google API", "Microsoft Graph", "TypeORM", "PostgreSQL"].map(pill => (
                  <em>{pill}</em>
                ))}
              </div>
            </div>
          </Project>

          <Project>
            <video autoPlay muted loop>
              <source src="projects/bubble_burst.mov" type="video/mp4" />
            </video>
            <div className="overlay">
              <h1>Bubble Burst</h1>
              <h2>2017</h2>
              <p>A popular iOS arcade game inspired by Fruit Ninja.</p>
              <div className="pills">
                {["Swift", "Firebase", "SceneKit", "StoreKit"].map(pill => (
                  <em>{pill}</em>
                ))}
              </div>
            </div>
          </Project>
        </div>


      </Projects>

      <Footer>
        <hr />
        <div>© 2022 Mufeez Amjad.</div>
      </Footer>

    </Container>
  );
}

export default App;

const Project = styled.div`
  width: 338px;
  height: 530px;
  border-radius: 40px;

  &:not(:first-child) {
    margin-left: 24px;
  }

  video {
    width: 338px;
    height: 530px;
    position: absolute;
    object-fit: cover;
    z-index: -1;
    border-radius: 40px;
  }

  .overlay {
    width: 100%;
    height: 100%;
    border-radius: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    z-index: 1;
    position: relative;
    text-align: center;
    color: #dc0000;
    padding: 10px;

    visibility: hidden;
    opacity: 0;
    transition: all 0.3s linear;

    font-family: 'Open Sans';

    h1 {
      color: white;
      margin: 8px;
      font-size: 22px;
    }

    h2 {
      color: white;
      font-size: 16px;
      font-weight: 300;
    }

    p {
      margin: 30px 15px;
      color: white;
      font-size: 18px;
    }

    .pills {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      em {
        font-size: 0.8rem;
        font-weight: 300;
        text-align: right;
        font-style: normal;
        padding-right: 5px;
        padding: 2px 10px;
        margin: 3px;
        border-radius: 5px;
        color: white;
        background: #333333;     
      }
    }

    
  }

  &:hover {
    .overlay {
      visibility: visible;
      opacity: 1;
      transition: all 0.3s linear;
      background-color: #35a6dee0;
    }
  }  
`;

const Projects = styled.div`
  h1 {
    font-size: 24px;
    font-family: 'Open Sans';
    font-size: 600;

    margin-bottom: 32px;
  }
  
  margin-bottom: 32px;

  div {
    display: flex;
  }
`;

const Footer = styled.div`
  width: 100%;
  margin-top: auto;
  font-family: 'Open Sans';

  div {
    padding-bottom: 20px;
  }
`;

const Contact = styled.a`
  align-self: flex-end;
  font-size: 18px;
  font-weight: 600;
  color: #35a6de;
`;

const Content = styled.div`
  margin-top: 50px;

  color: #333333;
  opacity: 0.8;
`;

const Availability = styled.div`
  align-self: flex-start;
  margin-bottom: 30px;
  font-family: Montserrat;
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    font-size: 18px;

    &:first-child {
      animation: blinker 1.5s ease-in infinite;
      margin-right: 12px;
      color: #35a6de;
      font-size: 30px;
    }

    &:not(:first-child) {
      font-weight: 700;
    }
  }

  @keyframes blinker {  
    50% { opacity: 0; }
  }
`;

const Intro = styled.div`
  display: inline-flex;
  flex-direction: column;

  img {
    width: 200px;
    height: 200px;
    border-radius: 100px;
    margin-bottom: 20px;
    pointer-events: none;
    user-select: none;
  }
  
  font-family: Montserrat;
  font-weight: 700;
  color: #333333;

  span {
    color: #35a6de;
  }

  h1 {
    font-size: 3em;
    margin: 0;
  }

  h2 {
    font-size: 2.2em;
    margin: 0;
  }
  
  .social-media {
    margin-top: 20px;

    a {
      font-size: 24px;
      padding: 10px;

      &:first-child {
        padding: 0 10px 0 0;
      }

      &:hover svg path {
        color: #35a6de;
        -webkit-transition: all .3s ease-out;
        -moz-transition: all .3s ease-out;
        -o-transition: all .3s ease-out;
        -ms-transition: all .3s ease-out;
        transition: all .3s ease-out;
      }
    }
  }
`;


const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 300px;

  hr {
    width: 100%;
    box-sizing: content-box;

    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 2px solid #333333;

    opacity: 0.15;
  }
`;
