import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import { useDispatch } from "react-redux";
import { changeUsername } from "./store";
import useClient from "./services/api";

const App = () => {
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const client = useClient();

  const handleUpdateUsername = (newUsername) => {
    dispatch(changeUsername(newUsername));
  };

  async function isConnected() {
    client.get("is-authenticated").then((data) => {
      //Il faut set les autre state avec isAuthenticated pck react redessine les composant
      if (data.isAuthenticated) {
        handleUpdateUsername(data.user.username);
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
      <Hero isConnected={isAuthenticated} />
    </div>
  );
};

export default App;
