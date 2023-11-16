import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { useSelector, useDispatch } from "react-redux";
import { changeUsername } from "./store";

const App = () => {
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username);

  const handleUpdateUsername = (newUsername) => {
    dispatch(changeUsername(newUsername));
  };

  async function isConnected() {
    await fetch("/api/is-authenticated")
      .then((res) => res.json())
      .then((data) => {
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
      <Nav />
      <Hero isConnected={isAuthenticated} />
    </div>
  );
};

export default App;
