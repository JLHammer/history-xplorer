import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import toggleDark from "../../assets/toggle-dark.svg";
import toggleLight from "../../assets/toggle-light.svg";

const ThemeToggleIcon = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

export const ThemeToggleButton = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <ThemeToggleIcon src={darkMode ? toggleDark : toggleLight} alt="" />
    </button>
  );
};
