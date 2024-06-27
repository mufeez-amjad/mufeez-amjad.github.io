import * as React from "react";
import styled from "styled-components";
import { Routes, Route, NavLink } from "react-router-dom";


export default function RoutedApp() {
  return (
    <AppContainer>
      <Container>
        <Header />
      </Container>
    </AppContainer>
  )
}

const routes = [
  { path: "/", displayName: "Mufeez Amjad", routeName: "About" },
  { path: "/blog", displayName: "Blog" },
  { path: "/photos", displayName: "Photos" },
];

const Header = () => {
  return (
    <HeaderContainer>
      <Image src="photo.jpg" />
      <HeaderText>
        <Routes>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={<> {route.displayName} </>} />
          ))}
        </Routes>
      </HeaderText>
      <HeaderRoutes>
        {routes.map(route => (
          <StyledNavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {route.routeName ?? route.displayName}
          </StyledNavLink>
        ))}
      </HeaderRoutes>
    </HeaderContainer>
  )
}

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
  height: calc(100% - 40px); /* Adjust height to account for 20px padding top and bottom */
  width: 50%; /* Adjust width as needed */

  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align children to the left */
  /* border: 1px solid red; */
  padding: 20px 0; /* 20px vertical padding, no horizontal padding */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
`;

const HeaderText = styled.h1`
  font-size: 26px;
  font-family: 'Montserrat';
  font-weight: 400;
`;

const HeaderContainer = styled.div`
  padding-bottom: 32px;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const HeaderRoutes = styled.div`
  display: flex;
  gap: 18px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #bababa;
  font-family: 'Open Sans';

  &.active {
    color: black;
  }

  &:hover {
    text-decoration: underline;
  }
`;