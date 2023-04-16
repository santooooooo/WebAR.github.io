// getting places from APIs
function loadPlaces(position) {
  const params = {
    radius: 300, // search places not farther than this value (in meters)
    clientId: "",
    clientSecret: "",
    version: "20300101", // foursquare versioning, required but unuseful for this demo
  };

  // Foursquare API (limit param: number of maximum places to fetch)
  const endpoint = `https://api.foursquare.com/v3/places/nearby?ll=${position.latitude}%2C${position.longitude}&limit=30`;

  return fetch(endpoint, {
    headers: {
      Authorization: "",
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
  {
    url: "./assets/pin/pin.glb",
    scale: "0.3 0.3 0.3",
    rotation: "0 180 0",
    info: "Magnemite, Lv. 5, HP 10/10",
  },
];

window.onload = () => {
  //const scene = document.querySelector("a-scene");
  const model = document.getElementById("pin");
  const text = document.getElementById("text");
  const distance = document.getElementById("distance");

  function success(pos) {
    var crd = pos.coords;
    const latitude = crd.latitude;
    const longitude = crd.longitude;
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    model.setAttribute("scale", models[3].scale);
    model.setAttribute("rotation", models[3].rotation);
    model.setAttribute("gltf-model", models[3].url);
    model.setAttribute("animation-mixer", "");

    text.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    text.addEventListener("gps-entity-place-update-position", (event) => {
      console.log("gps update position event occured!!");
      distance.textContent = event.detail.distance + "m";
      text.setAttribute("value", text.getAttribute("distanceMsg"));
    });
    text.addEventListener("gps-entity-place-added", (event) => {
      console.log("gps position added event occured!!");
      distance.textContent = event.detail.distance + "m";
      text.setAttribute("value", text.getAttribute("distanceMsg"));
    });

    //scene.appendChild(model);
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
