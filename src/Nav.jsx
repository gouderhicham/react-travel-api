import React, { useState } from "react";
import { useEffect } from "react";
const Nav = () => {
  const [input, setinput] = useState("");
  const [filteredOptions, setfilteredOptions] = useState([]);
  const [locations, setlocations] = useState([]);
  async function getLocations(input) {
    if (input === "") return;
    let res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=40de237fa18940ff8eb30ef323a52d08`
    );
    let { features } = await res.json();
    setlocations(features);
  }
  useEffect(() => {
    getLocations(input);
    // console.log(locations[0].properties.address_line2);
  }, [input]);
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
                  onClick={(e) => {
                    // change the input field to the suggested option clicked
                    setinput(e.target.textContent);
                    // change the options to null after clicking on one to hide the options field
                    setlocations([]);
                  }}
                  key={option.name}
                >
                  {option.properties.address_line1}
                </div>
              ))}
          </div>
        </div>
      </section>
    </nav>
  );
};
export default Nav;
