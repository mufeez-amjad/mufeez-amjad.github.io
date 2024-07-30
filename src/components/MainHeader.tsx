import React from "react";
import { PageHeader } from "./PageHeader";
import { useLocation, Routes, Route, NavLink } from "react-router-dom";
import { usePrevious } from "../usePrevious";
import styled, { keyframes } from "styled-components";

const routes = [
    { path: "/", displayName: "Mufeez Amjad", routeName: "About" },
    { path: "/blog", displayName: "Blog" },
    // { path: "/photos", displayName: "Photos" },
];

export const MainHeader = () => {
    const [activeRect, setActiveRect] = React.useState({ left: 0, width: 0 });
    const [isActive, setIsActive] = React.useState(true);
    const navRef = React.useRef<HTMLDivElement>(null);

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
