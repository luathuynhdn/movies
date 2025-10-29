import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import { ThemeProvider } from "./common/providers/ThemeProvider.tsx";
import { NotificationProvider } from "@providers/NotificationProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </ThemeProvider>
);
