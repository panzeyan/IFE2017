var renderer, scene, camera;
var cube, busMaterial,
wheel1, wheel2, wheel3, wheel4,
geometry, material,
plane;
var ambientLight, directionalLight;

var loader = new THREE.CubeTextureLoader();
// loader.setPath('./picture/');
var textureCube = loader.load([
  // 'front.png', 'back.png',
  // 'top.png', 'bottom.png',
  // 'right.png', 'left.png',

  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIbSURBVHhe7ZtBbuMwEARz9BP8/nxlP5PzfiArSM110ohaHCMBiEkV6jIWSVAFw0AOeXl5fcNZfcagzxj0GYM+Y9BnDPqMQZ8x6DMGfcagzxj0GYM+YxAAAJryB6YhVgFiFSBWAWIVIFYBYhUgVgFiFSBWAWIVIFaB5rH0B/Bn9KxO21gKc47WVegZSz2u0OppGsZSicH7Z/TpQHvm6BZLDXaU5yu0Ykc7J2gVS2+/oyrnaN2O9l/RM5Z6XKHVvzCW3ntHMa7Q6t8cSyXm0J65XsQSOiVCLKFTIsQSOiVCLKFTIg1jbajEFVo9V2qjT6wNvTqxZtCr76jHOVq3o/1XtIq1obffUZWv0Iod7ZygW6wNNRgoz0CfDrRnjoaxNlTiCq2epmesDfU4R+sqtI11cL/f1eYDt9tNj4s0j6U845dLw1Nfq43msbYv0VHniPV/1OMirWIdIZ5DR0SIJXREhFhCR0R6xjp+oWbQBmLNoA3EmkEbiDWDNhBrBm2YjAUAAF2xfzDHoM8Y9BmDPmPQZwz6jEGfMegzBn3GoM8Y9BmDPmPQZwz63M91sYuu4LrYRVdwXeyiKzh4//u8jj0u+cAuuoIDu3NJxx6XfGAXXcGB3bmkY49LPrCLruDA7lzSscclH9hFV3Bgdy75M9hFV3Bd7KIruC520UX8NuxcDPqMQZ8x6DMGfcagzxj0GYM+Y9BnDPqMZ76+/QO8bhBBr/DWcwAAAABJRU5ErkJggg==',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALZSURBVHhe7ZBBbtxADAT9tDwtb/Hr/AuHh6aCFNG0hNVmAS4LdWlImJ6ej4/Pr/WszGsj89rIvDYyr43MayPz2si8NjKvjcxrI/PayLw2MlffAUx2MlffAUx2MlffAUx2MleT73FoWIDJTuZqooZBaFiAyU7maqKGQWhYgMlO5mqihkFoWIDJTuZqooZBaFiAyU7maqKGQWhYgMlO5mqihkFoWIDJTuZqooZBaFiAyU7maqKGQWhYgMlO5mqihkFoWIDJTuZqooZBaFiAyU7maqKGQWhYgMlO5mqihkFoWIDJTuZqooZBaFiAyU7maqKGQWhYgMlO5mqihkFoWIDJTuZqooZBaFiAyU7maqKGQWhYgMlO5mqihkFoWIDJTuZqooZBaFiAyU7maqKGQWhYgMlO5mqihkFoWIDJTuZqooZBaFiAyU7maqKGQWhYgMlO5mqihkFoWIDJTuZqooZBaFiAyU7maqKGQWhYgMlO5mqihkFoWIDJTuZqooZBaFiAyU7maqKGQWhYgMlO5mqihkFoWIDJTuZqooZBaFiAyU7maqKGQWhYgMlO5uo7gMlO5uo7gMlO5uo7gMlO5rWReW1kXhuZ10bmtZF5bWReG5nXRua1kXltZF4bmddG5rWReW1kXhuZ10bmtZF5bWReG5nXRua18Qfw93gfAmeN9yFw1njP8P2vf8FZ403sgwT2G84ab2IfJLDfcNZ4E/sggf2Gs8ab2AcJ7DecNd7EPkhgv+Gs8Sb2QQL7DWeNN7EPEthvOOuqrwLXOG9iHySw33DWVV8FrnHexD5IYL/hrKu+ClzjvIl9kMB+w1lXPfj1+394gGucN7EP0oGzrnqAVU/yANc470PgrKseYNWTPMA1zvsQOOuqB1j1JA9wjfP+AP6+1wOsepIHuMZdMt/rq8A17pL5Xl8FrnGXzPf6KnCNu2ReG5nXRua1kXltZF4bmddG5tX5+fUHGuGEMMhMYpEAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABkCAIAAACzY5qXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQaSURBVHhe7dKxDZAxDAVhNmcXpmMMXDw3J6Uw+jGKcqevcWEXUX78+PVb0v/EWdIyzpKWcZa0jLOkZZwlLeMsaRlnScs4S1rGWdIyzpKWcZa0jLOkZZwlLeMsaRlnScs4S1rGWdIyzpKWcZa0jLOkZZwlLeMsaRlnScs4S//Oh+Hy1Tjr5MNw+R0fhstX46yTD8Pld3wYLl+Ns04+DJff0f3827Jf4fLVOOuky3eYl/0Kl9/R5UXmZb/C5atx1kmX7zAv+xUuv6PLi8zLfoXLV+Osky7fYV72K1x+R5cXmZf9CpevxlknXb7DvOxXuPyOLi8yL/sVLl+Ns066fId52a9w+R1dXmRe9itcvhpnnXT5DvOyX+HyO7q8yLzsV7h8Nc466fId5mW/wuV3dHmRedmvcPlqnHXS5TvMy36Fy+/o8iLzsl/h8tU466TLd5iX/QqX39HlReZlv8Llq3HWSZfvMC/7FS6/o8uLzMt+hctX46yTLt9hXvYrXH5HlxeZl/0Kl6/GWSddvsO87Fe4/I4uLzIv+xUuX42zTrp8h3nZr3D5HV1eZF72K1y+GmeddPkO87Jf4fI7urzIvOxXuHw1zjrp8h3mZb/C5Xd0eZF52a9w+WqcddLlO8zLfoXL7+jyIvOyX+Hy1TjrpMt3mJf9Cpff0eVF5mW/wuWrcdZJl+8wL/sVLr+jy4vMy36Fy1fjrJMu32Fe9itcfkeXF5mX/QqXr8ZZJ12+w7zsV7j8ji4vMi/7FS5fjbNOunyHedmvcPkdXV5kXvYrXL4aZ510+Q7zsl/h8ju6vMi87Fe4fDXOOunyHeZlv8Lld3R5kXnZr3D5apx10uU7zMt+hcvv6PIi87Jf4fLVOOuky3eYl/0Kl9/R5UXmZb/C5atx1kmX7zAv+xUuv6PLi8zLfoXLV+Osky7fYV72K1x+R5cXmZf9CpevxlknXb7DvOxXuPyOLi8yL/sVLl+Ns066fId52a9w+R1dXmRe9itcvhpnnXT5DvOyX+HyO7q8yLzsV7h8Nc466fId5mW/wuV3dHmRedmvcPlqnHXS5TvMy36Fy+/o8iLzsl/h8tU466TLd5iX/QqX39HlReZlv8Llq3HWSZfvMC/7FS6/o8uLzMt+hctX46yTLt9hXvYrXH5HlxeZl/0Kl6/GWSddvsO87Fe4/I4uLzIv+xUuX42zTrp8h3nZr3D5HR+Gy1fjrJMPw+V3fBguX42zTj4Ml9/xYbh8Nc46+TBc1uM4S1rGWdIyzpKWcZa0jLOkZZwlLeMsaRlnScs4S1rGWdIyzpKWcZa0jLOkZZwlLeMsaRlnScs4S1rGWdIyzpKWcZa0jLOkZZwlLeMsaRlnScs4S1rGWdIyzpKWcZa0jLOkZZwlLeMsaRlnSZt+/f4Dtz+lrFsPKi0AAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABkCAIAAACzY5qXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEeSURBVHhe7dMxAQAADMOgOa/1ycgDHrgBKQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJITU9q52cqP8elH7AAAAAElFTkSuQmCC',
  'data:image/png;base64,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',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABkCAIAAACzY5qXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATbSURBVHhe7ZNBqmApEAT7/sfo0/UtZlyEmwTny2uqxoJIYpMLMwTx16/ff0Tk/yS7iDSTXUSayS4izWQXkWayi0gz2UWkmewi0kx2EWkmu4g0k11EmskuIs1kF5FmsotIM9lFpJnsItJMdhFpJvsJY8yPiV9zSfYTxpgfE7/mkuwnjDE/Jn7NJdlP7Pzzd2Hlr3f+OzjmWxDUKJieeX9231jmwEr8mkuyn9hB+zWsVD78Co75FgQ1CqZn3p/dN5Y5sBK/5pLsJ3bQfg0rlQ+/gmO+BUGNgumZ92f3jWUOrMSvuST7iR20X8NK5cOv4JhvQVCjYHrm/dl9Y5kDK/FrLsl+Ygft17BS+fArOOZbENQomJ55f3bfWObASvyaS7Kf2EH7NaxUPvwKjvkWBDUKpmfen903ljmwEr/mkuwndtB+DSuVD7+CY74FQY2C6Zn3Z/eNZQ6sxK+5JPuJHbRfw0rlw6/gmG9BUKNgeub92X1jmQMr8WsuyX5iB+3XsFL58Cs45lsQ1CiYnnl/dt9Y5sBK/JpLsp/YQfs1rFQ+/AqO+RYENQqmZ96f3TeWObASv+aS7Cd20H4NK5UPv4JjvgVBjYLpmfdn941lDqzEr7kk+4kdtF/DSuXDr+CYb0FQo2B65v3ZfWOZAyvxay7JfmIH7dewUvnwKzjmWxDUKJieeX9231jmwEr8mkuyn9hB+zWsVD78Co75FgQ1CqZn3p/dN5Y5sBK/5pLsJ3bQfg0rlQ+/gmO+BUGNgumZ92f3jWUOrMSvuST7iR20X8NK5cOv4JhvQVCjYHrm/dl9Y5kDK/FrLsl+Ygft17BS+fArOOZbENQomJ55f3bfWObASvyaS7Kf2EH7NaxUPvwKjvkWBDUKpmfen903ljmwEr/mkuwndtB+DSuVD7+CY74FQY2C6Zn3Z/eNZQ6sxK+5JPuJHbRfw0rlw6/gmG9BUKNgeub92X1jmQMr8WsuyX5iB+3XsFL58Cs45lsQ1CiYnnl/dt9Y5sBK/JpLsp/YQfs1rFQ+/AqO+RYENQqmZ96f3TeWObASv+aS7Cd20H4NK5UPv4JjvgVBjYLpmfdn941lDqzEr7kk+4kdtF/DSuXDr+CYb0FQo2B65v3ZfWOZAyvxay7JfmIH7dewUvnwKzjmWxDUKJieeX9231jmwEr8mkuyn9hB+zWsVD78Co75FgQ1CqZn3p/dN5Y5sBK/5pLsJ3bQfg0rlQ+/gmO+BUGNgumZ92f3jWUOrMSvuST7iR20X8NK5cOv4JhvQVCjYHrm/dl9Y5kDK/FrLsl+Ygft17BS+fArOOZbENQomJ55f3bfWObASvyaS7Kf2EH7NaxUPvwKjvkWBDUKpmfen903ljmwEr/mkuwnjDE/Jn7NJdlPGGN+TPyaS7KfMMb8mPg1l2QXkWayi0gz2UWkmewi0kx2EWkmu4g0k11EmskuIs1kF5FmsotIM9lFpJnsItJMdhFpJruINJNdRJrJLiLNZBeRZrKLSDPZRaSZ7CLSTHYRaSa7iDSTXUSayS4izWQXkWayi0gz2UWkmewi0kx2EWkmu4g0k11EmskuIs1kF5FmsotIM9lFpJnsItJMdhFpJruINJNdRJrJLiLNZBeRZrKLSDPZRaSZ7CLSTHYRaSa7iDSTXUQ6+f3nX5Tv4ZYTzZpGAAAAAElFTkSuQmCC'
], function (texture) {
  init(texture);
});
textureCube.minFilter = THREE.LinearFilter;

function init(texture) {
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('mainCanvas'),
    // 增强渲染
    antialias: true,
    precision: 'highp'
  });
  renderer.setClearColor(0xaaaaaa);
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 100);
  camera.position.set(-3, 2, 3);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  // 车身（长方体）
  // 贴图材质
  busMaterial = new THREE.MeshLambertMaterial({
    envMap: texture
  });

  cube = new THREE.Mesh(new THREE.CubeGeometry(3, 1, 1), busMaterial);
  cube.castShadow = true;
  cube.receiveShadow = true;
  scene.add(cube);

  // 轮子（圆环面）*4
  geometry = new THREE.TorusGeometry(0.2, 0.07, 12, 18);
  material = new THREE.MeshPhongMaterial({
    color: 0x00aaff
  });
  wheel1 = new THREE.Mesh(geometry, material);
  wheel1.position.set(0.5, -0.5, 0.5);
  wheel2 = new THREE.Mesh(geometry, material);
  wheel2.position.set(0.5, -0.5, -0.5);
  wheel3 = new THREE.Mesh(geometry, material);
  wheel3.position.set(-0.5, -0.5, 0.5);
  wheel4 = new THREE.Mesh(geometry, material);
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
  plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 10, 10),
    new THREE.MeshLambertMaterial({
      color: 0x66cc66
    }));
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.77;
  plane.receiveShadow = true;
  scene.add(plane);

  // 光源
  ambientLight = new THREE.AmbientLight(0x888888);
  scene.add(ambientLight);

  directionalLight = new THREE.DirectionalLight(0x989898);
  directionalLight.position.set(5, 6, 4); // 平行光方向

  // 平行光阴影设置
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  scene.add(directionalLight);


  renderer.render(scene, camera);
  
}

