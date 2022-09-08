import React, { useState } from "react";
import Map from "./components/Map/Map";
import Nav from "./components/Nav/Nav";
import InfoSection from "./components/InfoSection";
import "./styles/styles.css";
function App() {
  // cards that gonna change after clicking on input suggests
  const [cords, setcords] = useState({
    lat: 51.512,
    lng: -0.39,
  });
  // hotels and restaurants 
  const [hotels, sethotels] = useState([]);
  const [restaurants, setrestaurants] = useState([]);
  // categories => type : restaurants or hotels / rating => [0,5] 
  const [cat, setcat] = useState({
    type: "hotels",
    rating: 3,
  });
  // cards divs
  const [cards, setcards] = useState(null);
  // map popups (markers)
  const [popups, setpopups] = useState(null);
  // loading value
  const [loading, setloading] = useState(true);
  return (
    <div className="App">
      <Nav setcords={setcords} />
      <div className="hero-container">
        <InfoSection
          setcards={setcards}
          cat={cat}
          setcat={setcat}
          restaurants={restaurants}
          hotels={hotels}
          popups={popups}
          sethotels={sethotels}
          loading= {loading}
        />
        <Map
        setloading={setloading}
          setpopups={setpopups}
          popups={popups}
          cards={cards}
          cat={cat}
          setcat={setcat}
          hotels={hotels}
          restaurants={restaurants}
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