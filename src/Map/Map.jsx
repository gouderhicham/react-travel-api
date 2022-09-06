import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Container from "./Container";
import { getRating } from "../exports";
import L from "leaflet";
import hotel from "../images/hotel.png";
import hotelImg from "../images/hotel.jpg";
import restau from "../images/restaurant.png";
const Map = ({
  setloading,
  hotels,
  setpopups,
  popups,
  cards,
  restaurants,
  cords,
  cat,
  sethotels,
  setrestaurants,
  setcords,
}) => {
  function getIcon() {
    return L.icon({
      iconUrl: cat.type === "hotels" ? hotel : restau,
      iconSize: 45,
    });
  }
  const popUpRefs = useRef([]);
  let filteredHotels = (cat.type === "restaurants" ? restaurants : hotels)
    ?.filter((hotel) => {
      if (hotel.name === "" || hotel.latitude === undefined) {
      } else {
        return hotel;
      }
    })
    .filter((item) => item.rating >= cat.rating);
  useEffect(() => {
    setpopups(popUpRefs);
  }, [popups]);
  return (
    <>
      <MapContainer
        center={[cords.lat, cords.lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <Container
          setloading={setloading}
          setcords={setcords}
          sethotels={sethotels}
          setrestaurants={setrestaurants}
          cords={cords}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Container>
        {filteredHotels?.length > 0 &&
          filteredHotels?.map((hotel, i) => (
            <Marker
              eventHandlers={{
                click: () => {
                  console.log(
                    popups.current[i]._latlng.lat,
                    popups.current[i]._latlng.lng
                  );
                  cards.current[i].scrollIntoView({ behavior: "smooth" });
                },
              }}
              ref={(el) => (popUpRefs.current[i] = el)}
              icon={getIcon()}
              key={i}
              position={[hotel.latitude || 0, hotel.longitude || 0]}
            >
              <Popup className="headshot">
                <img
                  className="img"
                  src={
                    hotel?.photo?.images?.small.url
                      ? hotel?.photo?.images?.small.url
                      : hotelImg
                  }
                />
                <h3>{hotel.name}</h3>
                <div className="reviews">
                  {getRating(Number(hotel?.rating)).map((fe) => fe)}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </>
  );
};
export default Map;
