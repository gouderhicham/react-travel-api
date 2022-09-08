import React, { useEffect, useRef } from "react";
import hotelImg from "../images/hotel.jpg"
import { getRating } from "../exports";
import Loader from "./Loader";
const InfoSection = ({
  loading,
  hotels,
  setcards,
  restaurants,
  popups,
  cat,
  setcat,
}) => {
  // select hotels ot restaueants based on cat type and filter the empty ones and sort them on higher rating
  let filteredSection = (cat.type === "restaurants" ? restaurants : hotels)
    ?.filter((item) => {
      if (item.name === "" || item.latitude === undefined) {
      } else {
        return item;
      }
    })
    .filter((item) => item.rating >= cat.rating);
  // the cards that display on the info section
  const cardsRefs = useRef([]);
  // reset cards each time the popups on map change
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
            // if selected option is not choose category , run code below
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
          {hotels === undefined && restaurants === undefined && (
            <p>
              i run out of api calls try clone this repo and add new travel
              advisor key :){" "}
            </p>
          )}
          {filteredSection?.map((item, i) => (
            <div
              onClick={() => {
                //filteredSection and popups are at the same amount so when click on card[i] a popup[i] will open
                popups.current[i].openPopup();
              }}
              className={`card`}
              ref={(el) => (cardsRefs.current[i] = el)}
              key={Math.random()}
            >
              <img
                src={item?.photo?.images?.large.url || hotelImg}
                width={"100%"}
                alt="fwef"
              />
              <h2>{item.name}</h2>
              <p>Price : {item.price ? item.price : "not mentioned"}</p>
              {cat.type === "restaurants" && (
                <>
                  <p>Location: {item.address}</p>
                  <p>Open: {item.open_now_text}</p>
                  <p>Phone: {item.phone}</p>
                  <p>Restaurant website: {item.website}</p>
                  <div style={{display :"flex" , flexDirection : "row" , flexWrap : "wrap"}} className="foods">
                    Food:
                    {item.cuisine.map((food, i) => (
                      <p 
                        style={{
                          padding: "0.3rem 0.6rem",
                          margin: "0.5rem 0.5rem 0 0",
                          backgroundColor: "#C1C1C1",
                          borderRadius: "10px",
                          width: "fit-content"
                        }}
                        key={i}
                      >
                        {food.name}
                      </p>
                    ))}
                  </div>
                </>
              )}
              <p>ranking : {item.ranking}</p>
              <p>rating:{getRating(Number(item.rating)).map((fe) => fe)}</p>
              {item?.location_string && cat.type === "hotels" && (
                <p>Location: {item.location_string}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
export default InfoSection;
