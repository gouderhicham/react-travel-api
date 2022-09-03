import React from "react";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import useDebounce from "@clave/use-debounce";
import { hotelsUrl, restaurantsUrl, options } from "../exports";
const Container = ({
  children,
  cords,
  setcords,
  sethotels,
  setrestaurants,
}) => {
  const delayedValue = useDebounce(cords, 500);
  const map = useMap();
  useEffect(() => {
    map.addEventListener("dragend", function () {
      setcords({
        lat: map.getCenter().lat,
        lng: map.getCenter().lng,
      });
    });
    map.flyTo([cords.lat, cords.lng], 14);
  }, [cords]);
  // TODO: fire when user stop typing
  useEffect(() => {
    // fetch(hotelsUrl(cords.lat, cords.lng), options)
    //   .then((res) => res.json())
    //   .then((res) => sethotels(res.data));
    // fetch(restaurantsUrl(cords.lat, cords.lng), options)
    //   .then((res) => res.json())
    //   .then((res) => setrestaurants(res.data));
  }, [delayedValue]);
  return <>{children}</>;
};
export default Container;
