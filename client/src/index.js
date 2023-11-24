import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.js"; //homepage
import Citations from "./routes/Citations.js";
import AdminPanel from "./routes/AdminPanel.js";
import Favorites from "./routes/Favorites.js";
import { store } from "./store.js";
import Nav from "./components/Nav.js";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div>
      <Nav />
      {/* //Outlet is a placeholder for all the nested route components */}
      <Outlet />
    </div>
  );
}

const AppRouting = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route exact path="/" element={<App />} />
            <Route exact path="/citations" element={<Citations />} />
            <Route exact path="/admin-panel" element={<AdminPanel />} />
            <Route exact path="/favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

createRoot(document.getElementById("root")).render(<AppRouting />);
