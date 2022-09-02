import React, { useState } from "react";
import Map from "./Map/Map";
import Nav from "./Nav";
import "./styles/styles.css";

function App() {
  const [cords, setcords] = useState({
    lat : 51.512,
    lng: -0.39  
  })
  return (
    <div className="App">
      <Nav setcords={setcords} />
      <Map cords ={cords} />
    </div>
  );
}

export default App;
