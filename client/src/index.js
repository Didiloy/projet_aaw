import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./App.js"; //homepage
import Citations from "./routes/Citations.js";
import Login from "./routes/Login.js";

const AppRouting = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/citations" element={<App />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  </Router>
);

createRoot(document.getElementById("root")).render(<AppRouting />);
