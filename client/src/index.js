import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./App.js"; //homepage

const AppRouting = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/citations" element={<App />} />
      <Route exact path="/login" element={<App />} />
    </Routes>
  </Router>
);

createRoot(document.getElementById("root")).render(<AppRouting />);
