var controls = new THREE.TrackballControls(camera);

// 设置3种控制方式的速率
controls.rotateSpeed = 10.0; // 旋转
controls.zoomSpeed = 3.0; // 缩放
controls.panSpeed = 0.8; // 平移

// 控制照相机时带惯性
controls.staticMoving = false;
controls.dynamicDampingFactor = 0.3;

// change事件发生时重新渲染画面
controls.addEventListener('change', render);

function animate() {

  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  // 向浏览器请求调用animate
  requestAnimationFrame(animate);

  // 更新controls
  controls.update();
}

animate();
