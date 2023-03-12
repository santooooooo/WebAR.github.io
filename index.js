import * as THREE from "three";
import * as THREEx from "./node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";

function main() {
  const canvas = document.getElementById("canvas1");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });

  const arjs = new THREEx.LocationBased(scene, camera);
  const cam = new THREEx.WebcamRenderer(renderer);

  const geom = new THREE.BoxGeometry(20, 20, 20);
  const mtl = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const box = new THREE.Mesh(geom, mtl);

  const deviceOrientationControls = new THREEx.DeviceOrientationControls(
    camera
  );

  /**
   * スクリーンが垂直になるようにスマホを持っているときの、スクリーン裏面が向いている方角 (-180 〜 180) を計算する
   */
  function calcDeviceDirection(e) {
    const ry = ((e.gamma || 0) * Math.PI) / 180;
    const rx = ((e.beta || 0) * Math.PI) / 180;
    const rz = ((e.alpha || 0) * Math.PI) / 180;
    const cy = Math.cos(ry);
    const sy = Math.sin(ry);
    const cx = Math.cos(rx);
    const sx = Math.sin(rx);
    const cz = Math.cos(rz);
    const sz = Math.sin(rz);
    const x = -(sy * cz + cy * sx * sz);
    const y = -(sy * sz - cy * sx * cz);
    const z = -(cy * cx);

    const angle = Math.atan2(-x, y) * (180.0 / Math.PI);
    return angle;
  }

  window.addEventListener(
    "deviceorientation",
    (event) => {
      const deg = calcDeviceDirection(event);
      const rad = deg * (Math.PI / 180); // deg2rad (-π 〜 π)
      if (controls) controls.alphaOffset -= rad;
    },
    { once: true }
  );

  arjs.add(box, 139.38845690593965, 35.65749057639006);
  //arjs.add(box, 35.66322707826773, 139.38779162906647);

  //arjs.fakeGps(-0.72, 51.05);
  arjs.startGps();

  requestAnimationFrame(render);

  function render() {
    if (
      canvas.width != canvas.clientWidth ||
      canvas.height != canvas.clientHeight
    ) {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      const aspect = canvas.clientWidth / canvas.clientHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    }
    deviceOrientationControls.update();
    cam.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
}

main();
