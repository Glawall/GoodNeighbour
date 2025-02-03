import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import GoogleMapsProvider from "./components/GoogleMapsProvider";
import App from "./App.jsx";
import "./index.css";

const basePath = import.meta.env.VITE_BASE_PATH || "";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basePath={basePath}>
    <AuthProvider>
      <GoogleMapsProvider>
        <App />
      </GoogleMapsProvider>
    </AuthProvider>
  </BrowserRouter>
);
