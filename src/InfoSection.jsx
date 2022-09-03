import React from "react";
import hotelImg from "./images/hotel.jpg";
const InfoSection = ({hotels , restaurants}) => {
  return (
    <div className="info-section">
      <h1>Food & Dinning Around you</h1>
      <section  className="section">
        <div className="card">
          {hotels?.map(hotel => <h2 key={Math.random()} style={{padding : "1rem"}}>{hotel.name}</h2>)}
        </div>
      </section>
    </div>
  );
};

export default InfoSection;
