import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./App.js";
import "./styles.css";

const AppRouting = () =>(
  <Router>
    <Routes>
      <Route exact path="/" element={<App/>} />
    </Routes>
  </Router>
);

createRoot(document.getElementById("root")).render(<AppRouting/>);
