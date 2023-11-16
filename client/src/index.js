import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.js"; //homepage
import Citations from "./routes/Citations.js";
import { store } from "./store.js";

const AppRouting = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/citations" element={<Citations />} />
        </Routes>
      </Router>
    </Provider>
  );
};

createRoot(document.getElementById("root")).render(<AppRouting />);
