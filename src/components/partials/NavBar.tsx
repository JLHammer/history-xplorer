import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavBarStyled = styled.nav`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.s};
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.light.surface};

  body.dark-mode & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
  }
`;

const NavUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light.surface};
  gap: 0.5rem;
  body.dark-mode & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
  }
`;

const NavLi = styled.li``;

const NavBarLink = styled(NavLink)`
  display: inline-block;
  padding: 0 ${({ theme }) => theme.spacing.s};
  size: ${({ theme }) => theme.fontSizes.l};
  color: ${({ theme }) => theme.colors.light.body};
  text-decoration: none;
  text-transform: uppercase;
  transition: transform 0.15s ease;

  &.active {
    color: ${({ theme }) => theme.colors.light.heading};
    text-decoration: underline;
  }

  body.dark-mode & {
    color: ${({ theme }) => theme.colors.dark.body};
  }

  body.dark-mode &.active {
    color: ${({ theme }) => theme.colors.dark.heading};
  }
`;

const navLinks = [
  { to: "/by-date", label: "By Date" },
  { to: "/", label: "Today" },
  { to: "/since", label: "Since" },
];

export const NavBar = () => (
  <NavBarStyled>
    <NavUl>
      {navLinks.map(({ to, label }) => (
        <NavLi key={to}>
          <NavBarLink to={to} end={to === "/"}>
            {label}
          </NavBarLink>
        </NavLi>
      ))}
    </NavUl>
  </NavBarStyled>
);
