import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Container from "./Container";
import { getRating } from "../../exports";
import L from "leaflet";
import hotel from "../../images/hotel.png";
import hotelImg from "../../images/hotel.jpg"; // demo image that is going to be rendered if hotel has no image
import restau from "../../images/restaurant.png";
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
  // function that is going to change the marker image on map basend category type
  function getIcon() {
    return L.icon({
      iconUrl: cat.type === "hotels" ? hotel : restau,
      iconSize: 45,
    });
  }
  // popups that show on map
  const popUpRefs = useRef([]);
  let filteredSection = (cat.type === "restaurants" ? restaurants : hotels)
    ?.filter((item) => {
      if (item.name === "" || item.latitude === undefined) {
      } else {
        return item;
      }
    })
    .filter((item) => item.rating >= cat.rating);
  // useEffect => popups 
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
        {filteredSection?.length > 0 &&
          filteredSection?.map((item, i) => (
            <Marker
              eventHandlers={{
                click: () => {
                  cards.current[i].scrollIntoView({ behavior: "smooth" });
                },
              }}
              ref={(el) => (popUpRefs.current[i] = el)}
              icon={getIcon()}
              key={i}
              position={[item.latitude || 0, item.longitude || 0]}
            >
              <Popup className="headshot">
                <img
                  className="img"
                  src={
                    item?.photo?.images?.small.url
                      ? item?.photo?.images?.small.url
                      : hotelImg
                  }
                />
                <h3>{item.name}</h3>
                <div className="reviews">
                  {getRating(Number(item?.rating)).map((fe) => fe)}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </>
  );
};
export default Map;
