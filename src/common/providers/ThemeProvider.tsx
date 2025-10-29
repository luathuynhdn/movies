import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeMode;
  toggleTheme: (theme?: ThemeMode) => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const DEFAULT_THEME: ThemeMode = "dark";

const initTheme = (localStorage.getItem("theme") as ThemeMode) || DEFAULT_THEME;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<ThemeMode>(initTheme);

  const applyTheme = (mode: ThemeMode) => {
    const body = document.body;
    body.classList.remove("light", "dark");
    body.classList.add(mode);
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem("theme", mode);
    applyTheme(mode);
  };

  const toggleTheme = (t?: ThemeMode) => {
    const newTheme = t ? t : theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
