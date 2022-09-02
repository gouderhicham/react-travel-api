import React from "react";
import { useMap } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
const Container = ({ children }) => {
  const map = useMap();
  const search = new GeoSearchControl({
    provider: new OpenStreetMapProvider(),
  });
  map.addControl(search);
  return <>{children}</>;
};
export default Container;