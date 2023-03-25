// getting places from APIs
function loadPlaces(position) {
  const params = {
    radius: 300, // search places not farther than this value (in meters)
    clientId: "",
    clientSecret: "",
    version: "20300101", // foursquare versioning, required but unuseful for this demo
  };

  // CORS Proxy to avoid CORS problems
  const corsProxy = "https://cors-anywhere.herokuapp.com/";

  // Foursquare API (limit param: number of maximum places to fetch)
  const endpoint = `https://api.foursquare.com/v3/places/nearby?ll=${position.latitude}%2C${position.longitude}&limit=30`;

  return fetch(endpoint, {
    headers: {
      Authorization: "fsq3RX8KFdAlBQGOmw+0TubrXo+faeO2gDNkGsX7KyMG0RQ=",
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json().then((resp) => {
        return resp.results;
      });
    })
    .catch((err) => {
      console.error("Error with places API", err);
    });
}

var models = [
  {
    url: "./assets/magnemite/scene.gltf",
    scale: "0.5 0.5 0.5",
    info: "Magnemite, Lv. 5, HP 10/10",
    rotation: "0 180 0",
  },
  {
    url: "./assets/articuno/scene.gltf",
    scale: "0.2 0.2 0.2",
    rotation: "0 180 0",
    info: "Articuno, Lv. 80, HP 100/100",
  },
  {
    url: "./assets/dragonite/scene.gltf",
    scale: "0.08 0.08 0.08",
    rotation: "0 180 0",
    info: "Dragonite, Lv. 99, HP 150/150",
  },
];

window.onload = () => {
  const scene = document.querySelector("a-scene");
  const model = document.createElement("a-entity");

  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    const latitude = crd.latitude;
    const longitude = crd.longitude;
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    model.setAttribute("scale", models[0].scale);
    model.setAttribute("rotation", models[0].rotation);
    model.setAttribute("gltf-model", models[0].rotation);
    model.setAttribute("animation-mixer", "");

    scene.appendChild(placeText);
  }

  function error(err) {
    console.error("Error in retrieving position", err);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // first get current user location
  return navigator.geolocation.getCurrentPosition(success, error, options);
};
