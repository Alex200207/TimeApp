import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WeatherProvider } from "./contexts/WeatherContext.tsx";
import { reportWebVitals } from "./reportWebVitals.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </StrictMode>
);
reportWebVitals();
