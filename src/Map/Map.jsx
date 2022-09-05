import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Container from "./Container";
import { getRating } from "../exports";
import L from "leaflet";
import hotel from "../images/hotel.png";
import hotelImg from "../images/hotel.jpg";
const Map = ({
  hotels,
  setpopups,
  cards,
  infos,
  cords,
  sethotels,
  setrestaurants,
  setcords,
}) => {
  function getIcon() {
    return L.icon({
      iconUrl: hotel,
      iconSize: 35,
    });
  }
  const popUpRefs = useRef([]);

  useEffect(() => {
    setpopups(popUpRefs);
  }, [infos]);
  return (
    <>
      <MapContainer
        center={[cords.lat, cords.lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <Container
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
        {infos?.length > 0 &&
          infos?.map((place, i) => (
            <Marker
              eventHandlers={{
                click: () => {
                  cards.current[i].scrollIntoView({ behavior: "smooth" });
                },
              }}
              ref={(el) => {
                return (popUpRefs.current[i] = el);
              }}
              icon={getIcon()}
              key={i}
              position={[place?.latitude || 0, place?.longitude || 0]}
            >
              <Popup className="headshot">
                <img
                  className="img"
                  src={
                    place?.photo?.images?.small.url
                      ? place?.photo?.images?.small.url
                      : hotelImg
                  }
                />
                <h3>{place.name}</h3>
                <div className="reviews">
                  {getRating(Number(place?.rating)).map((fe) => fe)}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </>
  );
};
export default Map;
