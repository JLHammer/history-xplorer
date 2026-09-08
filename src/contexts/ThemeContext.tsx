import { createContext, useEffect, useState } from "react";

export type ThemeContextProps = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export type ProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContextProps>({
  darkMode: false,
  toggleTheme: () => {},
});

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
