var renderer, scene, camera, bus, stat, controls;
var id;

init();
animate();

function init() {
  
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('mainCanvas'),
    // 增强渲染
    antialias: true,
    precision: 'highp'
  });
  renderer.setClearColor(0x000000);
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
  camera.position.set(0, 100, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  // 车身（长方体）
  // 加载贴图
  var textureLoader = new THREE.TextureLoader();
  var cubeMaterials = [];
  var picList = ['front.png', 'back.png', 'top.png', 'bottom.png', 'right.png', 'left.png'];
  var i;
  for (i = 0; i < picList.length; i++) {
    cubeMaterials.push(new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: textureLoader.load('texture/' + picList[i], render),
      overdraw: true
    }));
  }

  var carBody = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 1),
    new THREE.MultiMaterial(cubeMaterials)
  );
  carBody.castShadow = true;
  scene.add(carBody);

  // 轮子（圆环面）*4
  var geometry = new THREE.TorusGeometry(0.2, 0.07, 12, 18);
  var material = new THREE.MeshPhongMaterial({
    color: 0x222222
  });
  var wheel1 = new THREE.Mesh(geometry, material);
  wheel1.position.set(0.65, -0.5, 0.5);
  var wheel2 = new THREE.Mesh(geometry, material);
  wheel2.position.set(0.65, -0.5, -0.5);
  var wheel3 = new THREE.Mesh(geometry, material);
  wheel3.position.set(-0.85, -0.5, 0.5);
  var wheel4 = new THREE.Mesh(geometry, material);
  wheel4.position.set(-0.85, -0.5, -0.5);

  wheel1.castShadow = true;
  wheel1.receiveShadow = true;
  wheel2.castShadow = true;
  wheel2.receiveShadow = true;
  wheel3.castShadow = true;
  wheel3.receiveShadow = true;
  wheel4.castShadow = true;
  wheel4.receiveShadow = true;

  scene.add(wheel1);
  scene.add(wheel2);
  scene.add(wheel3);
  scene.add(wheel4);

  // 组装车身和车轮
  bus = new THREE.Object3D(0, 0, 0);
  bus.add(carBody, wheel1, wheel2, wheel3, wheel4);
  scene.add(bus);

  // 地板平面
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 10, 10),
    new THREE.MeshLambertMaterial({
      color: 0x999999
    }));
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.77;
  plane.receiveShadow = true;
  scene.add(plane);

  // 光源
  var ambientLight = new THREE.AmbientLight(0x888888);
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0x989898);
  directionalLight.position.set(-2, 6, 4); // 平行光方向

  // 平行光阴影设置
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  scene.add(directionalLight);


  // 设定stat
  stat = new Stats();
  stat.domElement.style.position = 'absolute';
  stat.domElement.style.right = '0px';
  stat.domElement.style.top = '0px';
  document.body.appendChild(stat.domElement);


  // 设定照相机控制方式
  controls = new THREE.TrackballControls(camera);

  // 设置3种控制方式的速率
  controls.rotateSpeed = 10.0; // 旋转
  controls.zoomSpeed = 3.0; // 缩放
  controls.panSpeed = 0.8; // 平移

  // 控制照相机时带惯性
  controls.staticMoving = false;
  controls.dynamicDampingFactor = 0.3;

  // change事件发生时重新渲染画面
  controls.addEventListener('change', render);

  id = requestAnimationFrame(animate);
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  stat.begin();

  // 更新controls
  controls.update();

  // turnLeft(bus);
  turnRight(bus);
  // go(bus);
  back(bus);

  render();

  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  // 向浏览器请求调用animate
  id = requestAnimationFrame(animate);

  stat.end();
}


// bus运动
function turnLeft(car) {
  car.rotation.y = car.rotation.y + 0.01;
}

function turnRight(car) {
  car.rotation.y = car.rotation.y - 0.01;
}

function go(car) {

  // 前进方向
  var angleY = car.rotation.y;

  car.position.x += Math.cos(angleY) * 0.1;
  car.position.z -= Math.sin(angleY) * 0.1;
}

function back(car) {
  // 前进方向
  var angleY = car.rotation.y;

  car.position.x -= Math.cos(angleY) * 0.1;
  car.position.z += Math.sin(angleY) * 0.1;
}
