var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('mainCanvas'),
  // 增强渲染
  antialias: true,
  precision: 'highp'
});
renderer.setClearColor(0xaaaaaa);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 100);
camera.position.set(-3, 2, 3);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

// 车身（长方体）
var cube = new THREE.Mesh(new THREE.CubeGeometry(2, 1, 1),
  new THREE.MeshPhongMaterial({
    color: 0x00aaff
  })
);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

// 轮子（圆环面）*4
var geometry = new THREE.TorusGeometry(0.2, 0.07, 12, 18);
var material = new THREE.MeshPhongMaterial({
  color: 0x00aaff
});
var wheel1 = new THREE.Mesh(geometry, material);
wheel1.position.set(0.5, -0.5, 0.5);
var wheel2 = new THREE.Mesh(geometry, material);
wheel2.position.set(0.5, -0.5, -0.5);
var wheel3 = new THREE.Mesh(geometry, material);
wheel3.position.set(-0.5, -0.5, 0.5);
var wheel4 = new THREE.Mesh(geometry, material);
wheel4.position.set(-0.5, -0.5, -0.5);

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

// 地板平面
var plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 10, 10),
  new THREE.MeshLambertMaterial({
    color: 0x66cc66
  }));
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.77;
plane.receiveShadow = true;
scene.add(plane);

// 光源
var ambientLight = new THREE.AmbientLight(0x888888);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0x989898);
directionalLight.position.set(5, 6, 4); // 平行光方向

// 平行光阴影设置
directionalLight.castShadow = true;
directionalLight.shadowMapWidth = 1024;
directionalLight.shadowMapHeight = 1024;
directionalLight.shadowDarkness = 1;

scene.add(directionalLight);


renderer.render(scene, camera);
