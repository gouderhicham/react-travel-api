export const placesUrl = (input) =>
  `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=40de237fa18940ff8eb30ef323a52d08`;
export const hotelsUrl = (lat, lng) =>
  `https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=${lat}&longitude=${lng}&limit=12&currency=USD`;
export const restaurantsUrl = (lat, lng) =>
  `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${lng}&limit=12&currency=USD&distance=2&open_now=false&lunit=km`;
export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5cfa285475msh7ea3a84888c7ce5p1e1e97jsnf62bfbcd3100",
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};