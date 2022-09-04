import { useMap } from "react-leaflet";
import React, { useEffect, useState } from "react";
import useDebounce from "@clave/use-debounce";
import { hotelsUrl, restaurantsUrl, options } from "../exports";
const Container = ({
  children,
  cords,
  setcords,
  sethotels,
  setrestaurants,
}) => {
  const [boundCords, setboundCords] = useState({
    bLat: 51.512,
    bLng: -0.39,
    tLat: 51.552,
    tLng: -0.41,
  });
  const delayedValue = useDebounce(cords, 1000);
  const delayedValue2 = useDebounce(boundCords, 4200);
  const map = useMap();
  map.addEventListener("dragend", function () {
    setboundCords({
      bLat: map.getBounds()._southWest.lat,
      bLng: map.getBounds()._southWest.lng,
      tLat: map.getBounds()._northEast.lat,
      tLng: map.getBounds()._northEast.lng,
    });
    setcords({
      lat: map.getCenter().lat,
      lng: map.getCenter().lng,
    });
  });
  const fetchData = () => {
    fetch(
      hotelsUrl(
        boundCords.bLat,
        boundCords.bLng,
        boundCords.tLat,
        boundCords.tLng
      ),
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        sethotels(res.data);
      });
    fetch(
      restaurantsUrl(
        boundCords.bLat,
        boundCords.bLng,
        boundCords.tLat,
        boundCords.tLng
      ),
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setrestaurants(res.data);
      });
  };
  useEffect(() => {
    setboundCords({
      bLat: map.getBounds()._southWest.lat,
      bLng: map.getBounds()._southWest.lng,
      tLat: map.getBounds()._northEast.lat,
      tLng: map.getBounds()._northEast.lng,
    });
    map.flyTo([cords.lat, cords.lng]);
  }, [cords]);
  // TODO: fix fetching happen twice 
  useEffect(() => {
    fetchData()
  }, [delayedValue,delayedValue2]);

  return <>{children}</>;
};
export default Container;
