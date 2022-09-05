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
  const [cat, setcat] = useState({
    type: "hotels",
    rating: 3,
  });
  const [cards, setcards] = useState(null);
  const [popups, setpopups] = useState(null);
  const [infos, setinfos] = useState([]);
  return (
    <div className="App">
      <Nav setcords={setcords} />
      <div className="hero-container">
        <InfoSection
          setcards={setcards}
          popups={popups}
          cat={cat}
          setcat={setcat}
          restaurants={restaurants}
          hotels={hotels}
          setinfos={setinfos}
          infos={infos}
        />
        <Map
          setinfos={setinfos}
          infos={infos}
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
