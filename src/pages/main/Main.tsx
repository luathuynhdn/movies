import "./styles/page.scss";

import { MovieTabs } from "./components/MovieTab";
import ThemeToggleButton from "@components/ThemeToggleButton/ThemeToggleButton";

const Main: React.FC = () => {
  return (
    <div>
      <div className="header-container">
        <h1>Movies</h1>
        <div>
          <ThemeToggleButton />
        </div>
      </div>
      <MovieTabs />
    </div>
  );
};

export default Main;
