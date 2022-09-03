import React, { useState } from "react";
import { useEffect } from "react";
import useDebounce from "@clave/use-debounce";
import Suggest from "./Suggest";
import { placesUrl } from "../exports";
const Nav = ({ setcords }) => {
  const [input, setinput] = useState("");
  // usedebound to not span server with api calls
  const delayedValue = useDebounce(input, 300);
  // locations that gonna be rendred
  const [locations, setlocations] = useState([]);
  // function the gonna get all the locations that user typed
  async function getLocations(input) {
    if (input === "") return;
    let res = await fetch(placesUrl(input));
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
            placeholder="🔍︎"
            value={input}
            onChange={(e) => {
              // change the input value to the input field
              setinput(e.target.value);
            }}
            type="text"
          />
          <div className="suggestions">
            {locations?.length > 0 &&
              locations.map((option, i) => (
                <Suggest
                  key={i}
                  setinput={setinput}
                  setcords={setcords}
                  setlocations={setlocations}
                  option={option}
                />
              ))}
          </div>
        </div>
      </section>
    </nav>
  );
};
export default Nav;
