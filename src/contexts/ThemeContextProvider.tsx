import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import type { ReactNode } from "react";

export type ProviderProps = {
  children: ReactNode;
};

export const ThemeContextProvider = ({ children }: ProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
