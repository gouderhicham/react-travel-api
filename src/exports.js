export const placesUrl = (input) =>
  `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=40de237fa18940ff8eb30ef323a52d08`;
export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": '8915023330msh4fdd2250dddeb53p152da1jsn5de766307462',
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};
export const restaurantsUrl = (BLat, BLng, TLat, TLng) =>
  `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=${BLat}&tr_latitude=${TLat}&bl_longitude=${BLng}&tr_longitude=${TLng}&limit=30&currency=USD&open_now=false&lunit=km&lang=en_US`;

export const hotelsUrl = (BLat, BLng, TLat, TLng) =>
  `https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary?bl_latitude=${BLat}&bl_longitude=${BLng}&tr_longitude=${TLng}&tr_latitude=${TLat}&limit=30&currency=USD`;