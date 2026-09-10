import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import toggleDark from "../../assets/toggle-dark.svg";
import toggleLight from "../../assets/toggle-light.svg";

const ThemeToggleButtonStyled = styled.button`
  /* Main lays its children out in a column, so without this the button
     stretches to the full width the way every block of content below it does */
  align-self: flex-start;
  cursor: pointer;
`;

const ThemeToggleIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

export const ThemeToggleButton = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeToggleButtonStyled
      type="button"
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <ThemeToggleIcon src={darkMode ? toggleDark : toggleLight} alt="" />
    </ThemeToggleButtonStyled>
  );
};
