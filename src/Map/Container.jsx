import React from "react";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import useDebounce from "@clave/use-debounce";
import { hotelsUrl, restaurantsUrl, options } from "../exports";
const Container = ({ children, cords, sethotels, setrestaurants }) => {
  const delayedValue = useDebounce(cords, 100);
  const map = useMap();
  useEffect(() => {
    fetch(hotelsUrl(cords.lat, cords.lng), options)
      .then((res) => res.json())
      .then((res) => sethotels(res.data));
    fetch(restaurantsUrl(cords.lat, cords.lng), options)
      .then((res) => res.json())
      .then((res) => setrestaurants(res.data));
    map.flyTo([cords.lat, cords.lng], 14);
  }, [delayedValue]);
  return <>{children}</>;
};
export default Container;
