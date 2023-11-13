import React, { useState, useEffect, useContext } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { UserContext } from ".";

const App = () => {
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [isAdmin, setIsAdmin] = useState(false);
  const { user, setUser } = useContext(UserContext);
  function setUsername(u) {
    setUser(u);
  }

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
      <Hero isConnected={isAuthenticated} />
    </div>
  );
};
export default App;
