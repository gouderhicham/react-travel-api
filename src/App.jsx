import React, { useState } from "react";
import Map from "./Map/Map";
import Nav from "./Nav/Nav";
import InfoSection from "./InfoSection";
import "./styles/styles.css";

function App() {
  const [cords, setcords] = useState({
    lat: 51.512,
    lng: -0.39,
  });
  const [hotels, sethotels] = useState([]);
  const [restaurants, setrestaurants] = useState([]);
  return (
    <div className="App">
      <Nav setcords={setcords} />
      <div className="hero-container">
        <InfoSection restaurants={restaurants} hotels={hotels} />
        <Map
          setcords={setcords}
          sethotels={sethotels}
          setrestaurants={setrestaurants}
          cords={cords}
        />
      </div>
    </div>
  );
}

export default App;
