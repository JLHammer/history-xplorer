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

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: calc(
      ${({ theme }) => theme.spacing.xl} + ${({ theme }) => theme.spacing.l}
    );
  }
`;

const NavUl = styled.ul`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidths.content};
  margin-inline: auto;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light.surface};
  gap: 0.5rem;

  body.dark-mode & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

const NavLi = styled.li``;

const NavBarLink = styled(NavLink)`
  display: inline-block;
  padding: 0 ${({ theme }) => theme.spacing.s};
  font-size: ${({ theme }) => theme.fontSizes.l};
  color: ${({ theme }) => theme.colors.light.heading};
  text-decoration: none;
  text-transform: uppercase;
  transition: transform 0.15s ease;

  &.active {
    color: ${({ theme }) => theme.colors.light.accent};
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
  }

  body.dark-mode & {
    color: ${({ theme }) => theme.colors.dark.heading};
  }

  body.dark-mode &.active {
    color: ${({ theme }) => theme.colors.dark.accent};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    &.active {
      transform: translateY(-4px);
    }
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
