export function setAutoList(input , setlocations) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "5cfa285475msh7ea3a84888c7ce5p1e1e97jsnf62bfbcd3100",
        "X-RapidAPI-Host": "google-maps28.p.rapidapi.com",
      },
    };
    fetch(
      `https://google-maps28.p.rapidapi.com/maps/api/place/textsearch/json?query=${input}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setlocations(response.results))
      .catch((err) => console.error(err));
  }