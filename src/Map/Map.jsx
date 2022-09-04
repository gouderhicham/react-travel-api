import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Container from "./Container";
//TODO: render marks on every restaurant hotels.map (t => <Marker>...)
const Map = ({
  hotels,
  restaurants,
  cords,
  sethotels,
  setrestaurants,
  setcords,
}) => {
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
        {hotels?.length > 0 &&
          hotels.map((hotel, i) => (
            <Marker
              key={i}
              position={[
                Number(hotel.latitude) || 0,
                Number(hotel.longitude) || 0,
              ]}
            >
              <Popup>{hotel.name}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </>
  );
};
export default Map;
