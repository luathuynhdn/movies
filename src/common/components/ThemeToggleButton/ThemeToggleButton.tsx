import "./theme-toggle-button.scss";

import { useTheme } from "@providers/ThemeProvider";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="theme-toggle">
      <button
        className={theme === "light" ? "active" : ""}
        onClick={() => toggleTheme("light")}
      >
        🌞 Light
      </button>
      <button
        className={theme === "dark" ? "active" : ""}
        onClick={() => toggleTheme("dark")}
      >
        🌙 Dark
      </button>
    </div>
  );
};

export default ThemeToggleButton;
