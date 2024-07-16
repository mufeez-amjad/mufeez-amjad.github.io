import * as React from "react";
import styled, { keyframes } from "styled-components";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import Tooltip from "./Tooltip";
import { Highlights } from "./Highlights";
import { usePrevious } from "./usePrevious";
import { PostsRouter } from "./posts/router";
import { PageHeader } from "./components/PageHeader";

export default function RoutedApp() {
  return (
    <AppContainer>
      <Routes>
        <Route
          path={'/'}
          element={
            <>
              <Container>
                <Header />
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
      </Routes>
    </AppContainer>
  )
}

const routes = [
  { path: "/", displayName: "Mufeez Amjad", routeName: "About" },
  { path: "/blog", displayName: "Blog" },
  { path: "/photos", displayName: "Photos" },
];

const Header = () => {
  const [activeRect, setActiveRect] = React.useState({ left: 0, width: 0 });
  const [isActive, setIsActive] = React.useState(true);
  const navRef = React.useRef<HTMLDivElement>(null);
  const [key, setKey] = React.useState(0);

  const updateActiveRect = (event?: any) => {
    if (!navRef.current) {
      return;
    }

    const navRect = navRef.current.getBoundingClientRect();
    let link;
    if (event && event.target && event.target instanceof Element) {
      link = event.target.closest('a');
    }
    link = link || navRef.current.querySelector('.active');
    if (link) {
      const { left, width } = link.getBoundingClientRect();
      setActiveRect({
        left: left - navRect.left,
        width: width
      });
      setIsActive(link.classList.contains('active'));
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateActiveRect);
    return () => window.removeEventListener('resize', updateActiveRect);
  }, []);

  const location = useLocation();
  const previousLocation = usePrevious(location);

  React.useEffect(() => {
    if (previousLocation?.pathname !== location.pathname) {
      setKey(prev => prev + 1);
      updateActiveRect();
    }
  }, [previousLocation, location]);

  return (
    <PageHeader
      heading={
        <Routes>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={<>{route.displayName}</>} />
          ))}
        </Routes>
      }
      subheading={
        <HeaderRoutes
          ref={navRef}
          onMouseLeave={() => {
            updateActiveRect();
            setIsActive(true);
          }}>
          <AnimatedUnderline
            style={{
              left: activeRect.left,
              width: activeRect.width,
            }}
            $isActive={isActive}
          />
          {routes.map(route => (
            <StyledNavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) => isActive ? 'active' : ''}
              onMouseEnter={updateActiveRect}
            >
              {route.routeName ?? route.displayName}
            </StyledNavLink>
          ))}
        </HeaderRoutes>
      }
    />
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
          Previously, I worked at Cockroach Labs on <Tooltip text="RocksDB inspired KV store written in Go">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
              <ExternalLink href="https://github.com/cockroachdb/pebble" target="_blank">Pebble</ExternalLink>
              <InfoIcon />
            </span>
          </Tooltip> and at Meta on <Tooltip text="Meta's incremental build system written in Rust">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
              <ExternalLink href="https://github.com/facebook/buck2" target="_blank">Buck2</ExternalLink>
              <InfoIcon />
            </span>
          </Tooltip>.
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
`;

const HeaderRoutes = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #bababa;
  font-family: 'Red Hat Display';

  &.active {
    color: black;
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

const moveUnderline = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const AnimatedUnderline = styled.div<{ $isActive: boolean }>`
  position: absolute;
  bottom: -2px;
  height: 1px;
  background-color: ${props => props.$isActive ? '#000' : '#bababa'};
  transition: all 0.3s ease-in-out;
  transform-origin: left;
  animation: ${moveUnderline} 0.3s ease-in-out forwards;
`;

const InfoIcon = () => (
  <svg fill="#36454f5e" width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.696-3.534c.63 0 1.332-.288 2.196-1.458l.911-1.22a.334.334 0 0 0-.074-.472.38.38 0 0 0-.505.06l-1.475 1.679a.241.241 0 0 1-.279.061.211.211 0 0 1-.12-.244l1.858-7.446a.499.499 0 0 0-.575-.613l-3.35.613a.35.35 0 0 0-.276.258l-.086.334a.25.25 0 0 0 .243.312h1.73l-1.476 5.922c-.054.234-.144.63-.144.918 0 .666.396 1.296 1.422 1.296zm1.83-10.536c.702 0 1.242-.414 1.386-1.044.036-.144.054-.306.054-.414 0-.504-.396-.972-1.134-.972-.702 0-1.242.414-1.386 1.044a1.868 1.868 0 0 0-.054.414c0 .504.396.972 1.134.972z" />
  </svg>
);