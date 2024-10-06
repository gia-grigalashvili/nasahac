import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // No need for .tsx, .js will resolve correctly
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Use the non-null assertion (remove the !) for JavaScript
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  );
} else {
  console.error("Root element not found");
}
