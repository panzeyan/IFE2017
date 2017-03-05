var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('mainCanvas'),
  // 增强渲染
  antialias: true,
  precision: 'highp'
});
renderer.setClearColor(0xaaaaaa);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 100);
camera.position.set(3, 3, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

// 车身（长方体）
var cube = new THREE.Mesh(new THREE.CubeGeometry(2, 1, 1),
  new THREE.MeshLambertMaterial({
    color: 0x00aaff
  })
);
scene.add(cube);

// 轮子（圆环面）*4
var geometry = new THREE.TorusGeometry(0.2, 0.07, 12, 18);
var material = new THREE.MeshLambertMaterial({
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
scene.add(wheel1);
scene.add(wheel2);
scene.add(wheel3);
scene.add(wheel4);


// 光源
// 代码来源：http://ife.baidu.com/note/detail/id/247
var ambientLight = new THREE.AmbientLight(0x666666);   // 添加环境光
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0x989898);  // 添加平行光
directionalLight.position.set(5, 6, 4);   // 设置平行光光源位置
scene.add(directionalLight);


renderer.render(scene, camera);
