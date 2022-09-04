import React from "react";
import hotelImg from "./images/hotel.jpg";

//TODO: style the info card just one for test and then seperate to a Card component and render multiple ones
//TODO: add <Hotels /> or <Restaurants /> based on filter
const InfoSection = ({ hotels, restaurants }) => {
  return (
    <div className="info-section">
      <h1>Food & Dinning Around you</h1>
      <p style={{marginTop : "0.4rem"}}>Type</p>
      <div className="selections">
        <select defaultValue={"choose category"} id="selectbox">
          <option disabled value={"choose category"} hidden>
            choose category
          </option>
          <option value="1">restaurants</option>
          <option value="2">hotels</option>
        </select>
        <select defaultValue={"rating"} id="selectbox">
          <option disabled value={"rating"} hidden>
            rating
          </option>
          <option value="3"> 3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <section className="section">
        <div className="card">
          {hotels?.map((hotel) => (
            <h2 key={Math.random()} style={{ padding: "1rem" }}>
              {hotel.name}
            </h2>
          ))}
        </div>
      </section>
    </div>
  );
};
export default InfoSection;
