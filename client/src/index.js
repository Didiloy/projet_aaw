import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./App.js"; //homepage
import Citations from "./routes/Citations.js";
import Login from "./routes/Login.js";
import Citation from "./components/Citation.js";
export const UserContext = React.createContext();

const AppRouting = () => {
  const [user, setUser] = useState("");
  return (
    <Router>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/citations" element={<Citations />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

createRoot(document.getElementById("root")).render(<AppRouting />);
