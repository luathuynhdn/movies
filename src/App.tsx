import { HashRouter, Route, Routes } from "react-router";

import "./styles/main.scss";

import Main from "@pages/main/Main";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<Main />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
