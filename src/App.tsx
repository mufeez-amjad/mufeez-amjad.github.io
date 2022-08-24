import React from 'react';
import styled from 'styled-components';

import photo from './photo.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFileAlt, faAt } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <Container>

      <Contact href='mailto:mufeez.amjad@uwaterloo.ca'>
        Get in touch →
      </Contact>

      <div style={{ margin: '100px 0' }}>
        <Availability>
          <span>•</span><span>Seeking 2023 new grad roles!</span>
        </Availability>
        <Intro>
          <img src={photo} />
          <h1><span>Mufeez Amjad</span> • Software Engineer</h1>
          <h2>Designer and Hobbyist Photographer</h2>
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
          <p>I've completed <b className='cyan'>6 internships</b> throughout my undergrad, ranging from startups to large tech companies. You can read about my work and experiences on my <a href="./MufeezAmjadResume.pdf">resume</a>.</p>
          <p>You can often find me automating my life, reading TechCrunch, browsing tech and crypto Twitter, or maybe playing Valorant!</p>
        </Content>

      </div>

      <div style={{ width: '100%', marginTop: 'auto' }}>
        <hr />
        <div>© 2022 Mufeez Amjad.</div>
      </div>

    </Container>
  );
}

export default App;

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
