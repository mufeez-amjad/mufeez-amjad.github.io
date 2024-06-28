import * as React from "react";
import styled, { keyframes } from "styled-components";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import Tooltip from "./Tooltip";

export default function RoutedApp() {
  return (
    <AppContainer>
      <Container>
        <Header />
        <Content />
      </Container>
    </AppContainer>
  )
}

const routes = [
  { path: "/", displayName: "Mufeez Amjad", routeName: "About" },
  { path: "/blog", displayName: "Blog" },
  { path: "/photos", displayName: "Photos" },
];

function usePrevious<T>(value: T) {
  const ref = React.useRef<T | undefined>();

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

const Header = () => {
  const [isHovering, setIsHovering] = React.useState(false);
  const [activeRect, setActiveRect] = React.useState({ top: 0, left: 0, width: 0, height: 0 });
  const navRef = React.useRef<HTMLDivElement>(null);
  const [key, setKey] = React.useState(0);

  const updateActiveRect = (event?: any) => {
    if (!navRef.current) {
      return;
    }

    const navRect = navRef.current.getBoundingClientRect(); // Get NavLinkContainer's rect
    let link;
    if (event && event.target && event.target instanceof Element) {
      link = event.target.closest('a');
    }
    link = link || navRef.current.querySelector('.active');
    if (link) {
      const { top, left, width, height } = link.getBoundingClientRect();
      // Adjust top and left to be relative to NavLinkContainer
      setActiveRect({
        top: top - navRect.top - 6, // Subtract padding to move up
        left: left - navRect.left - 8, // Subtract padding to move left
        width: width + 16, // Add double padding to increase width
        height: height + 12 // Add double padding to increase height
      });
      setIsHovering(true);
    }
  };

  const hideRectangle = () => setIsHovering(false);

  React.useEffect(() => {
    window.addEventListener('resize', updateActiveRect);
    return () => window.removeEventListener('resize', updateActiveRect);
  }, []);

  const location = useLocation();
  const previousLocation = usePrevious(location);

  React.useEffect(() => {
    if (previousLocation?.pathname !== location.pathname) {
      setKey(prev => prev + 1); // Increment key on location change
    }
  }, [previousLocation, location]);

  return (
    <HeaderContainer>
      <Image src="photo.jpg" />
      <HeaderText key={key}> {/* Add key here */}
        <Routes>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={<>{route.displayName}</>} />
          ))}
        </Routes>
      </HeaderText>
      <HeaderRoutes
        ref={navRef}
        onMouseLeave={hideRectangle}
      >
        <AnimatedRectangle
          style={{
            ...activeRect,
            opacity: isHovering ? 1 : 0,
            visibility: isHovering ? 'visible' : 'hidden',
          }}
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
    </HeaderContainer>
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
      <Paragraph>
        I am an engineer based in New York, currently working at <ExternalLink href="https://linear.app/homepage">Linear</ExternalLink>, where I joined as the first junior engineer in 2023.
      </Paragraph>
      <Paragraph>
        Previously, I worked at Cockroach Labs on <Tooltip text="RocksDB inspired KV store written in Go">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ExternalLink href="https://github.com/cockroachdb/pebble">Pebble</ExternalLink>
            <InfoIcon />
          </span>
        </Tooltip> and at Meta on <Tooltip text="Meta's incremental build system written in Rust">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ExternalLink href="https://github.com/facebook/buck2">Buck2</ExternalLink>
            <InfoIcon />
          </span>
        </Tooltip>.
      </Paragraph>
      <Paragraph>
        My interests include distributed systems, databases, and high-performance computing.
      </Paragraph>
    </ContentContainer >
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
  margin-top: 28px;
  animation: ${slideUp} 0.5s ease-out, ${blurIn} 0.6s ease-out;
`;


const Paragraph = styled.p`
  font-family: 'Open Sans';
  font-size: 16px;
  line-height: 1.5;
  color: #333333;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const blurInAndOut = keyframes`
  from {
    opacity: 0.5;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeaderText = styled.h1`
  font-size: 26px;
  font-family: 'Montserrat';
  font-weight: 400;
  opacity: 0;
  animation: ${blurInAndOut} 0.5s ease-in forwards;
`;

const HeaderContainer = styled.div`
  padding-bottom: 32px;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const HeaderRoutes = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #bababa;
  font-family: 'Open Sans';

  &.active {
    color: black;
  }
`;

const ExternalLink = styled.a`
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
    visibility: visible;
    opacity: 0.25;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }

  &:hover::after {
    visibility: visible;
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const AnimatedRectangle = styled.div`
  position: absolute;
  height: 100%;
  border-radius: 8px;
  background-color: rgba(184, 184, 184, 0.2);
  transition: all 0.1s ease-in-out;
  z-index: -1;
  animation: ${scaleIn} 0.5s ease-in-out forwards;
  transform-origin: center;
`;

const InfoIcon = () => (
  <svg fill="#36454f5e" width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.696-3.534c.63 0 1.332-.288 2.196-1.458l.911-1.22a.334.334 0 0 0-.074-.472.38.38 0 0 0-.505.06l-1.475 1.679a.241.241 0 0 1-.279.061.211.211 0 0 1-.12-.244l1.858-7.446a.499.499 0 0 0-.575-.613l-3.35.613a.35.35 0 0 0-.276.258l-.086.334a.25.25 0 0 0 .243.312h1.73l-1.476 5.922c-.054.234-.144.63-.144.918 0 .666.396 1.296 1.422 1.296zm1.83-10.536c.702 0 1.242-.414 1.386-1.044.036-.144.054-.306.054-.414 0-.504-.396-.972-1.134-.972-.702 0-1.242.414-1.386 1.044a1.868 1.868 0 0 0-.054.414c0 .504.396.972 1.134.972z" />
  </svg>
);