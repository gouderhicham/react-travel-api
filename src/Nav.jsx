import React, { useState } from "react";
import { useEffect } from "react";
const Nav = () => {
  const [input, setinput] = useState("");
  const [filteredOptions, setfilteredOptions] = useState([]);
  const [locs, setlocs] = useState([]);
  const [options, setoptions] = useState([
    { name: "hicham" },
    { name: "gouder" },
    { name: "haithem" },
    { name: "sara" },
    { name: "safa" },
    { name: "sabrin" },
  ]);
  async function getLocations(input) {
    if (input === "") return;
    let res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=40de237fa18940ff8eb30ef323a52d08`
    );
    let { features } = await res.json();
    setlocs(features);
  }
  useEffect(() => {
    getLocations(input);
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
              // change the filtered loactions based on the input value as it's changing
              let filterdLocations = options.filter((name) => {
                if (
                  name.name.indexOf(e.target.value) !== -1 &&
                  e.target.value !== ""
                ) {
                  return { value: name.name };
                }
              });
              // change the filtered options state
              setfilteredOptions(filterdLocations);
            }}
            type="text"
          />
          <div className="suggestions">
            {filteredOptions.length > 0 &&
              filteredOptions.map((option) => (
                <div
                  onClick={(e) => {
                    // change the input field to the suggested option clicked
                    setinput(e.target.textContent);
                    // change the options to null after clicking on one to hide the options field
                    setfilteredOptions([]);
                  }}
                  key={option.name}
                >
                  {option.name}
                </div>
              ))}
          </div>
        </div>
      </section>
    </nav>
  );
};
export default Nav;
