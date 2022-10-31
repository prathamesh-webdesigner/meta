
import * as THREE from 'three';
import { OrbitControls } from '/js/three/OrbitControls.js';
// import { GLTFLoader } from '/js/three/GLTFLoader.js';

/*let scene, camera, renderer;*/

function init() { 

  const renderer = new THREE.WebGLRenderer({
    alpha:true,
    canvas: document.querySelector('#mybann')
  });
  const mybann = document.querySelector('#mybann');
  renderer.setSize(mybann.offsetWidth, mybann.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  // document.body.appendChild(renderer.domElement);
  // console.log(renderer)

  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x000000);
  // console.log(scene)
  /****************************************************
   * *************************************************camera */

  const camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,0.5,500);
  // camera.rotation.y = 45/180*Math.PI;
 
  camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 1;
  scene.add( camera );
  // console.log(camera)
/**********************************************************
 * *********************************************************controls */
 const controls = new OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  controls.minDistance = 10;
  controls.maxDistance = 50;
  function render() {

    renderer.render( scene, camera );

}

  controls.update();
  console.log(controls)
//left
const plight1 = new THREE.DirectionalLight( 0xfefefe, 2, 200 );
plight1.position.set( 40, 0, 0 );
scene.add( plight1 );
//right
const plight = new THREE.DirectionalLight( 0xfefefe, 2, 200 );
plight.position.set( 0, 0, -40 );
scene.add( plight );
// //bottom
const plight2 = new THREE.DirectionalLight( 0x9768fd, 2, 200 );
plight2.position.set( 0, 0, 40 );
scene.add( plight2 );
//   //top
const plight3 = new THREE.DirectionalLight( 0xfb09e3, 2, 200 );
plight3.position.set( -40, 0, 0 );
scene.add( plight3 );

// const gridHelper = new THREE.GridHelper(100, 10);
// scene.add(gridHelper);

 let loadedModel;

 const earth =  new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50),
 new THREE.MeshBasicMaterial({
    // color: 0xff0000
    map: new THREE.TextureLoader().load('model/01-3.jpg')
}))
scene.add(earth)
 
 function animate() {
  renderer.render(scene, camera);
  earth.scale.set(0.5, 0.5, 0.5);
  earth.rotation.y += 0.01;
  requestAnimationFrame(animate);
};
  animate();
}


init();
