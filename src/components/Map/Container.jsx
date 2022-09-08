import { useMap } from "react-leaflet";
import React, { useEffect, useState } from "react";
import useDebounce from "@clave/use-debounce";
import { hotelsUrl, restaurantsUrl, options } from "../../exports";
const Container = ({
  children,
  setloading,
  cords,
  setcords,
  sethotels,
  setrestaurants,
}) => {
  // cordinates that's goona be used when fetching data
  const [boundCords, setboundCords] = useState({
    bLat: 51.512,
    bLng: -0.39,
    tLat: 51.552,
    tLng: -0.41,
  });
  // prevent overfetching by only changing delayed value to boundCordsafter stopping from change by 350 seconds
  const delayedValue = useDebounce(boundCords, 350);
  // the map => 
  const map = useMap();
  // even when user stop dragging
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
  // even when user zooms
  map.on("zoomend", () => {
    setboundCords({
      bLat: map.getBounds()._southWest.lat,
      bLng: map.getBounds()._southWest.lng,
      tLat: map.getBounds()._northEast.lat,
      tLng: map.getBounds()._northEast.lng,
    });
  });
  // function that is going to set data after changing cords
  const fetchData = () => {
    // change loading to true after executing this function
    setloading(true);
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
        if (res?.data?.length === 0) {
          console.log("empty data");
        } else {
          sethotels(res.data);
          // set loading to false after data is fetched
          setloading(false);
        }
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
        if (res?.data?.length === 0) {
          console.log("empty data");
        } else {
          setrestaurants(res.data);
          setloading(false);
        }
      })
      .catch((err) => console.error(err));
  };
  // useEffect => constanly changing __
  useEffect(() => {
    setboundCords({
      bLat: map.getBounds()._southWest.lat,
      bLng: map.getBounds()._southWest.lng,
      tLat: map.getBounds()._northEast.lat,
      tLng: map.getBounds()._northEast.lng,
    });
    map.flyTo([cords.lat, cords.lng]);
  }, [cords]);
  // useEffect => deleyed value 
  useEffect(() => {
    fetchData();
  }, [delayedValue]);
  // return children that are wrapped with it 
  return <>{children}</>;
};
export default Container;