import star from "./images/star.png";
import halfStar from "./images/rating.png";

// places autocomplete function by fetching places from geopify api based on input
export const placesUrl = (input) =>
  `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=40de237fa18940ff8eb30ef323a52d08`;

// options needed by rapid api 
export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6d5c04d078msha210675cc899075p13eaa4jsn42b4e50066fb",
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};
// fetch restaurants by bounds from travel advisor api 
export const restaurantsUrl = (BLat, BLng, TLat, TLng) =>
  `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=${BLat}&tr_latitude=${TLat}&bl_longitude=${BLng}&tr_longitude=${TLng}&limit=30&currency=USD&open_now=false&lunit=km&lang=en_US`;
// fetch hotels by bounds from travel advisor api 
export const hotelsUrl = (BLat, BLng, TLat, TLng) =>
  `https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary?bl_latitude=${BLat}&bl_longitude=${BLng}&tr_longitude=${TLng}&tr_latitude=${TLat}&limit=30&currency=USD`;

// display rating from number (ex: 4.2) to stars
export function getRating(rating) {
  let arr = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    arr.push(<img key={Math.random()} src={star}></img>);
  }
  if (rating % 1 !== 0) {
    arr.push(<img key={Math.random()} src={halfStar} />);
  }
  return arr;
}
