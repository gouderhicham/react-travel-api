import React, { useState } from "react";
import { useEffect } from "react";
import useDebounce from "@clave/use-debounce";
const Nav = ({ setcords }) => {
  const [input, setinput] = useState("");
  // usedebound to not span server with api calls
  const delayedValue = useDebounce(input, 100);
  // locations that gonna be rendred
  const [locations, setlocations] = useState([]);
  // function the gonna get all the locations that user typed
  async function getLocations(input) {
    if (input === "") return;
    let res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=40de237fa18940ff8eb30ef323a52d08`
    );
    let { features } = await res.json();
    setlocations(features);
  }
  // fire when user stop typing
  useEffect(() => {
    getLocations(delayedValue);
  }, [delayedValue]);
  return (
    <nav>
      <h1 className="logo">GOUDER GPS ✈️</h1>
      <section className="search-section">
        <p className="text">Search for any places</p>
        <div className="input">
          <input
            value={input}
            onChange={(e) => {
              // change the input value to the input field
              setinput(e.target.value);
            }}
            type="text"
          />
          <div className="suggestions">
            {locations.length > 0 &&
              locations.map((option) => (
                <div
                  key={Math.random()}
                  onClick={(e) => {
                    // change the input field to the suggested option clicked
                    setinput(e.target.textContent);
                    // change the options to null after clicking on one to hide the options field
                    setlocations([]);
                    setcords({
                      lat: option.properties.lat,
                      lng: option.properties.lon,
                    });
                    console.log(
                      `lat : ${option.properties.lat} , lng : ${option.properties.lon}`
                    );
                  }}
                >
                  {option.properties.address_line1} {option.properties.country}
                </div>
              ))}
          </div>
        </div>
      </section>
    </nav>
  );
};
export default Nav;
