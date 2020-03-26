import React from "react";
import "./App.css";
import IPsMap from "./components/IPsMap/IPsMap";

function App() {
  return (
    <div className="App">
      <h3>Find Wiki editors by IP!</h3>
      <IPsMap />
    </div>
  );
}

export default App;
