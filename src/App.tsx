import { BrowserRouter, Route, Routes } from "react-router";

import "./styles/main.scss";

import Main from "@pages/main/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
