// Find the latest version by visiting https://unpkg.com/three.

import gsap from 'gsap'
import * as THREE from 'three';
import { OrbitControls } from '/js/three/OrbitControls.js';


const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
)
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;
const renderer = new THREE.WebGLRenderer({
    alpha:true,
    // canvas: document.querySelector('canvas')
  })

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)


const earth =  new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50),
 new THREE.MeshBasicMaterial({
    // color: 0xff0000
    map: new THREE.TextureLoader().load('model/01-3.jpg')
}))
scene.add(earth)

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

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
})

const starVerticies = []
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = (Math.random() - 0.5) * 2000
  starVerticies.push(x, y, z)
}

console.log(starVerticies)

starGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(starVerticies, 3)
)
const spaceTexture = new THREE.TextureLoader().load('/model/Vector.jpg');
scene.background = spaceTexture;

console.log(starGeometry)
console.log(starMaterial)

const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)

const mouse = {
  x: undefined,
  y: undefined
}

let frame = 0
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  raycaster.setFromCamera(mouse, camera)
  frame += 0.01

  
earth.rotation.y += 0.005
  stars.rotation.x += 0.0005
}

animate()

addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})

gsap.to('#christopherLis', {
  opacity: 1,
  duration: 1.5,
  y: 0,
  ease: 'expo'
})

gsap.to('#oneWithAn', {
  opacity: 1,
  duration: 1.5,
  delay: 0.3,
  y: 0,
  ease: 'expo'
})

gsap.to('#viewWorkBtn', {
  opacity: 1,
  duration: 1.5,
  delay: 0.6,
  y: 0,
  ease: 'expo'
})

document.querySelector('#viewWorkBtn').addEventListener('click', (e) => {
  e.preventDefault()
  gsap.to('#container', {
    opacity: 0
  })

  gsap.to(camera.position, {
    z: 25,
    ease: 'power3.inOut',
    duration: 2
  })
  gsap.to(camera.rotation, {
    x: 1.57,
    ease: 'power3.inOut',
    duration: 2
  })

  gsap.to(camera.position, {
    y: 1000,
    ease: 'power3.in',
    duration: 1,
    delay: 2
  })
})

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(innerWidth, innerHeight)
})