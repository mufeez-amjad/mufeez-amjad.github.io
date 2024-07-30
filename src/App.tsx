import styled, { keyframes } from "styled-components";
import { Routes, Route, NavLink } from "react-router-dom";
import Tooltip from "./Tooltip";
import { Highlights } from "./Highlights";
import { PostsRouter } from "./posts/router";
import { BlogPage } from "./posts/BlogPage";
import { MainHeader } from "./components/MainHeader";

export default function RoutedApp() {
  return (
    <AppContainer>
      <Routes>
        <Route
          path={'/'}
          element={
            <>
              <Container>
                <MainHeader />
                <Content />
              </Container>
            </>
          }
        />
        <Route
          path={'/posts/*'}
          element={
            <PostsRouter />
          }
        />
        <Route
          path={'/blog/*'}
          element={
            <BlogPage />
          }
        />
      </Routes>
    </AppContainer>
  )
}

const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<AboutContent />} />
      <Route path="/blog" element={<div>Blog</div>} />
      <Route path="/photos" element={<div>Photos</div>} />
    </Routes>
  )
}

const AboutContent = () => {
  return (
    <ContentContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
        <Paragraph>
          I'm an engineer based in NYC, currently working at <ExternalLink href="https://linear.app/homepage" target="_blank">Linear</ExternalLink>, where I joined as the first junior engineer in 2023.
        </Paragraph>
        <Paragraph>
          Previously, I've worked at:
          <ul>
            <li>
              Cockroach Labs on <Tooltip text="RocksDB inspired KV store written in Go">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  <ExternalLink href="https://github.com/cockroachdb/pebble" target="_blank">Pebble</ExternalLink>
                  <InfoIcon />
                </span>
              </Tooltip>, improving the performance of the storage engine
            </li>
            <li>
              Meta on <Tooltip text="Meta's incremental build system written in Rust">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  <ExternalLink href="https://github.com/facebook/buck2" target="_blank">Buck2</ExternalLink>
                  <InfoIcon />
                </span>
              </Tooltip>, improving build observability
            </li>
            <li>
              Splunk on the <Tooltip text="Programmatically coordinating releases across Splunk's production fleet">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  <ExternalLink href="https://www.splunk.com/" target="_blank">Release Train</ExternalLink>
                  <InfoIcon />
                </span>
              </Tooltip> team, improving the release process in a large Kubernetes cluster
            </li>
          </ul>
        </Paragraph>
        <Paragraph>
          My interests include high-performance computing, distributed systems, and databases.
        </Paragraph>
        <div style={{ display: 'flex', gap: 16, fontFamily: 'Red Hat Display', fontSize: 16, marginTop: 16 }}>
          <ExternalLink href="https://github.com/mufeez-amjad" target="_blank" $hideUnderline>
            GitHub
          </ExternalLink>
          <ExternalLink href="https://twitter.com/moofeez" target="_blank" $hideUnderline>
            Twitter
          </ExternalLink>
          <ExternalLink href="mailto:mufeez.amjad@outlook.com" $hideUnderline>
            Email
          </ExternalLink>
        </div>
      </div>
      <Highlights />
    </ContentContainer>
  );
}

const slideUp = keyframes`
  from {
    transform: translateY(5px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const blurIn = keyframes`
  from {
    filter: blur(4px);
    opacity: 0;
  }
  to {
    filter: blur(0);
    opacity: 1;
  }
`;

const ContentContainer = styled.div`
  margin-top: 12px;
  animation: ${slideUp} 0.5s ease-out, ${blurIn} 0.6s ease-out;
`;


const Paragraph = styled.div`
  font-family: 'Red Hat Display';
  font-size: 16px;
  line-height: 1.5;
  color: #333333;
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  height: calc(100% - 40px);
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0;
  box-sizing: border-box;

  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }

  @media (max-width: 1200px) {
    width: 100%;
    padding: 60px;
  }
`;

const ExternalLink = styled.a<{ $hideUnderline?: boolean }>`
  color: initial;
  position: relative;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    border-radius: 1px;
    bottom: 0;
    left: 0;
    background-color: currentColor;
    visibility: ${props => props.$hideUnderline ? 'hidden' : 'visible'};
    opacity: 0.25;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }

  &:hover::after {
    visibility: visible;
    opacity: 1;
  }
`;

const InfoIcon = () => (
  <svg fill="#36454f5e" width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.696-3.534c.63 0 1.332-.288 2.196-1.458l.911-1.22a.334.334 0 0 0-.074-.472.38.38 0 0 0-.505.06l-1.475 1.679a.241.241 0 0 1-.279.061.211.211 0 0 1-.12-.244l1.858-7.446a.499.499 0 0 0-.575-.613l-3.35.613a.35.35 0 0 0-.276.258l-.086.334a.25.25 0 0 0 .243.312h1.73l-1.476 5.922c-.054.234-.144.63-.144.918 0 .666.396 1.296 1.422 1.296zm1.83-10.536c.702 0 1.242-.414 1.386-1.044.036-.144.054-.306.054-.414 0-.504-.396-.972-1.134-.972-.702 0-1.242.414-1.386 1.044a1.868 1.868 0 0 0-.054.414c0 .504.396.972 1.134.972z" />
  </svg>
);