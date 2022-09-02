import React from "react";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
const Container = ({ children , cords }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([cords.lat , cords.lng] , 14)
  }, [cords]);
  return <>{children}</>;
};
export default Container;
