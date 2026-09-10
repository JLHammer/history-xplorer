import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LightBulbIcon } from "../icons/LightBulbIcon";

const ThemeToggleButtonStyled = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.s};
  left: ${({ theme }) => theme.spacing.s};
  display: inline-flex;
  padding: 0.25rem;
  font-size: 2.25rem;
  color: ${({ theme }) => theme.colors.light.body};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.light.heading};
  }

  body.dark-mode & {
    color: ${({ theme }) => theme.colors.dark.body};
  }

  body.dark-mode &:hover,
  body.dark-mode &:focus-visible {
    color: ${({ theme }) => theme.colors.dark.heading};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    left: auto;
    right: ${({ theme }) => theme.spacing.s};
  }
`;

export const ThemeToggleButton = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeToggleButtonStyled
      type="button"
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <LightBulbIcon />
    </ThemeToggleButtonStyled>
  );
};
