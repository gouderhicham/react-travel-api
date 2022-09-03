import React from "react";
import location from "../images/location.png";
const Suggest = ({ option, setinput, setlocations, setcords }) => {
  return (
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
      }}
    >
      <img src={location} />
      {option.properties.address_line1}{" "}{option.properties.country}
    </div>
  );
};

export default Suggest;
