import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./shared/context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>,
);
