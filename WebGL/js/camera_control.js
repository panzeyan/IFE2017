var controls = new THREE.TrackballControls(camera);

controls.rotateSpeed = 10.0;
controls.zoomSpeed = 3.0;
controls.panSpeed = 0.8;

controls.noZoom = false;
controls.noPan = false;

controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

// controls.keys = [65, 83, 68];

controls.addEventListener('change', render);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
}

animate();
