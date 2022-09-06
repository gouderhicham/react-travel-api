import React, { useEffect, useRef } from "react";
import hotelImg from "./images/hotel.jpg";
import { getRating } from "./exports";
import Loader from "./components/Loader";
const InfoSection = ({
  loading,
  hotels,
  sethotels,
  setcards,
  restaurants,
  popups,
  cat,
  setcat,
}) => {
  let filteredHotels = (
    cat.type === "restaurants" ? restaurants : hotels
  )?.filter((hotel) => {
    if (hotel.name === "" || hotel.latitude === undefined) {
    } else {
      return hotel;
    }
  }).filter(item => item.rating >= cat.rating)
  const cardsRefs = useRef([]);
  useEffect(() => {
    setcards(cardsRefs);
  }, [popups]);
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
          <option value={0}>all</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <section className="section">
          {hotels === undefined && restaurants === undefined && <p>i run out of api calls</p>}
          {filteredHotels?.map((hotel, i) => (
            <div
              onClick={() => {
                popups.current[i].openPopup();
              }}
              className={`card ${hotel.latitude} ${hotel.longitude}`}
              ref={(el) => (cardsRefs.current[i] = el)}
              key={Math.random()}
            >
              <img
                src={hotel?.photo?.images?.large.url || hotelImg}
                width={"100%"}
                alt=""
              />
              <h2>{hotel.name}</h2>
              <p>Price : {hotel.price ? hotel.price : "not mentioned"}</p>
              {cat.type === "restaurants" && (
                <>
                  <p>Location: {hotel.address}</p>
                  <p>Open: {hotel.open_now_text}</p>
                  <p>Phone: {hotel.phone}</p>
                  <p>Restaurant website: {hotel.website}</p>
                  <div className="foods">
                    Food:
                    {hotel.cuisine.map((food, i) => (
                      <p key={i}>{food.name}</p>
                    ))}
                  </div>
                </>
              )}
              <p>ranking : {hotel.ranking}</p>
              <p>rating:{getRating(Number(hotel.rating)).map((fe) => fe)}</p>
              {hotel?.location_string && cat.type === "hotels" && (
                <p>Location: {hotel.location_string}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
export default InfoSection;
