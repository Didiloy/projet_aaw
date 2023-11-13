import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";

const App = () => {
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [username, setUsername] = useState("");
  let [isAdmin, setIsAdmin] = useState(false);

  async function isConnected() {
    await fetch("/api/is-authenticated")
      .then((res) => res.json())
      .then((data) => {
        //Il faut set les autre state avec isAuthenticated pck react redessine les composant
        if (data.isAuthenticated) {
          setUsername(data.user.username);
          setIsAdmin(data.user.isAdmin);
        }
        setIsAuthenticated(data.isAuthenticated);
      });
  }

  useEffect(() => {
    isConnected();
  }, []);

  return (
    <div>
      <Nav />
      <Hero isConnected={isAuthenticated} username={username} />
    </div>
  );
};

export default App;
