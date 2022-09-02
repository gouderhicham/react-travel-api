import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Container from "./Container";

const Map = () => {
  return (
    <>
      <MapContainer
        whenReady={() => {}}
        center={[51.512, -0.39]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <Container>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.501, -0.39]}>
            <Popup>
              A pretty CSS3 popup as. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Container>
      </MapContainer>
    </>
  );
};

export default Map;
