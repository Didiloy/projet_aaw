import React from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";

function isConnected() {
  return true;
}

const App = () => {
  return (
    <div>
      <Nav />
      <Hero isConnected={isConnected()} />
    </div>
  );
};

export default App;
