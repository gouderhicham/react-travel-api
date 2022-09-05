import React, { useRef } from "react";
import hotelImg from "./images/hotel.jpg";
import { getRating } from "./exports";
//TODO: style the info card just one for test and then seperate to a Card component and render multiple ones
//TODO: add <Hotels /> or <Restaurants /> based on filter
const InfoSection = ({ hotels,setcards, restaurants, cat, setcat }) => {
  let filteredHotels = hotels?.filter((hotel) => {
    if (hotel.name !== "") {
      return hotel;
    }
  });
  const cardsRefs = useRef([]);
  setcards(cardsRefs)
  return (
    <div className="info-section">
      <h1>Food & Dinning Around you</h1>
      <p style={{ marginTop: "0.4rem" }}>Type</p>
      <div className="selections">
        <select
          onClick={(e) => {
            if (e.target.value === "choose category") return;
            setcat((item) => ({ ...item, type: e.target.value }));
          }}
          defaultValue={"choose category"}
          id="selectbox"
        >
          <option disabled value={"choose category"} hidden>
            choose category
          </option>
          <option value="restaurants">restaurants</option>
          <option value="hotels">hotels</option>
        </select>
        <select
          onClick={(e) => {
            if (e.target.value === "rating") return;
            setcat((item) => ({ ...item, rating: Number(e.target.value) }));
          }}
          defaultValue={"rating"}
          id="selectbox"
        >
          <option disabled value={"rating"} hidden>
            rating
          </option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <section className="section">
        {filteredHotels?.map((hotel , i) => (
          <div onClick={()=> {
            console.log(cardsRefs.current[i]);
          }}
                className = {`card ${hotel.latitude} ${hotel.longitude}`}
                ref={(el) => (cardsRefs.current[i] = el)} key={Math.random()}>
            <img
              src={hotel?.photo?.images?.large.url || hotelImg}
              width={"100%"}
              alt=""
            />
            <h2>{hotel.name}</h2>
            <p>Price : {hotel.price_level}</p>
            <p>ranking : {hotel.ranking}</p>
            <p>rating:{getRating(Number(hotel.rating)).map((fe) => fe)}</p>
            {hotel?.location_string && <p>Location: {hotel.location_string}</p>}
          </div>
        ))}
      </section>
    </div>
  );
};
export default InfoSection;
