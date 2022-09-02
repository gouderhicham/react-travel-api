import React, { useState } from "react";
import { useEffect } from "react";
const Nav = () => {
  const [input, setinput] = useState("");
  const [filteredOptions, setfilteredOptions] = useState([]);
  const [options, setoptions] = useState([
    { name: "hicham" },
    { name: "gouder" },
    { name: "haithem" },
    { name: "sara" },
    { name: "safa" },
    { name: "sabrin" },
  ]);
  const einstellung = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5cfa285475msh7ea3a84888c7ce5p1e1e97jsnf62bfbcd3100",
      "X-RapidAPI-Host": "google-maps-autocomplete-plus.p.rapidapi.com",
    },
  };

  useEffect(() => {
    console.log(input);
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
            {filteredOptions.map((option) => (
              <div
                onClick={(e) => {
                  // change the input field to the suggested option clicked
                  setinput(e.target.textContent);
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
// fetch(
//   `https://google-maps-autocomplete-plus.p.rapidapi.com/autocomplete?query=${input}&limit=10`,
//   einstellung
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
