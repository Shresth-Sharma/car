import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let object;
let controls;
let objToRender = 'eye';
const loader = new GLTFLoader();
var percenta = 0;
function newvalue(){
  percenta = 200;
}
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
    object1(object)
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    newvalue();
  },
  function (error) {
    console.error(error);
  }
  );
  function object1(a){
     object = a;
  }
const renderer = new THREE.WebGLRenderer({ alpha: true },{ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = 'myCanvas';
document.getElementById("container3D").appendChild(renderer.domElement);
renderer.setClearColor(0x000000, 0);
camera.position.z = 150;
camera.position.y = 0;
camera.position.x = 0;
var ambientLight = scene.children.find(child => child instanceof THREE.AmbientLight);
if (ambientLight) {
    ambientLight.intensity = 0;
}
var geometry = new THREE.BoxGeometry(2, 2, 2); // Width, Height, Depth
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.DirectionalLight(0x8B1E00, 0); // (color, intensity)
const cube1 = new THREE.DirectionalLight(0x8B1E00, 0); // (color, intensity)
scene.add(cube)
scene.add(cube1)
const topLight = new THREE.DirectionalLight(0x8B1E00, 0.2);
topLight.position.set(5,0,160)
topLight.castShadow = true;
const ambientLight1 = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1);
if (objToRender === "dino") {
  controls = new OrbitControls(camera, renderer.domElement);
}
var a = 230
var b = 2
var c = 1
var d = 0
var e = 0
var f = 50;
var g = 0;
var mouseXp = 0;
var mouseYp = 0;
var h = 1;
var j = 1;
var namex = 0;
var namey = 0;
function animate() {
  requestAnimationFrame(animate);
  if(percenta >= 100){

    cube.position.z = 120;
    cube.position.y = 0;
    cube.position.x = -40;
    cube1.position.z = 20;
    cube1.position.x = 120;
    cube1.position.y = 50;
    object.position.z = f;
    object.position.y = -27;
    object.rotation.y = d;
    object.rotation.x = g;
    if(a > 0 && h == 1){
      object.position.x = a;
      cube.intensity += b/25
      a -= b
    b -= 0.0085
    if(c==1 && a <= 100){
      c = 0
      document.getElementById('name').style.display = 'block';
    }
  }
  else if(d < Math.PI/2 && h == 1){
    object.position.x = a;
    cube1.intensity += e/100
    e += 0.75;
    f -= 1.5625;
    a -= 2.5;
    d += 0.05;
  }else if(g < 0.02 && h == 1){
    g += 0.0005;
  }
  else if(j ==1){
    j=0;
    document.getElementById('buttons').style.display = 'block';
  }
  else{
    h=0
    d += (mouseX - mouseXp)/20000;
    g += (mouseY - mouseYp)/10000;
  }
  mouseXp = mouseX;
  mouseYp = mouseY;
  renderer.render(scene, camera);
}
}

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}
//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
animate();