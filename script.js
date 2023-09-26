// getting places from APIs
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

window.addEventListener("load", () => {
  const model = document.getElementById("pin");

  function success(pos) {
    var crd = pos.coords;
    const latitude = crd.latitude;
    const longitude = crd.longitude;
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    model.setAttribute("scale", "15 15 15");
    // model.setAttribute("scale", models[3].scale);
    // model.setAttribute("rotation", models[3].rotation);
    // model.setAttribute("gltf-model", models[3].url);
    // model.setAttribute("animation-mixer", "");
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
});
