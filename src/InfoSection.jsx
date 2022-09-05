import React, { useEffect, useRef } from "react";
import hotelImg from "./images/hotel.jpg";
import { getRating } from "./exports";
//TODO: style the info card just one for test and then seperate to a Card component and render multiple ones
//TODO: add <Hotels /> or <Restaurants /> based on filter
const InfoSection = ({
  setinfos,
  infos,
  hotels,
  setcards,
  restaurants,
  cat,
  setcat,
  popups,
}) => {
  let filteredInfos = infos?.filter((place) => {
    if (place?.name?.length > 0) {
      return place;
    }
  });
  const cardsRefs = useRef([]);
  useEffect(() => {
    setcards(cardsRefs);
    setinfos(filteredInfos);
    if (cat.type !== "hotels") {
      setinfos(restaurants);
    } else {
      setinfos(hotels);
    }
  }, [cat, hotels]);
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
        {filteredInfos?.map((place, i) => (
          <div
            onClick={() => {
              popups.current[i].openPopup();
            }}
            className={`card}`}
            ref={(el) => (cardsRefs.current[i] = el)}
            key={Math.random()}
          >
            <img
              src={place?.photo?.images?.large.url || place}
              width={"100%"}
              alt=""
            />
            <h2>{place.name}</h2>
            <p>Price : {place.price}</p>
            <p>ranking : {place.ranking}</p>
            <p>rating:{getRating(Number(place.rating)).map((fe) => fe)}</p>
            {place?.location_string && <p>Location: {place.location_string}</p>}
          </div>
        ))}
      </section>
    </div>
  );
};
export default InfoSection;
