import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(90);

renderer.render( scene, camera );

const loader = new GLTFLoader();

// Add Lights

const pointLight = new THREE.PointLight(0xfffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xfffff);
scene.add(pointLight, ambientLight);


// Add Torus

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });

const torus = new THREE.Mesh( geometry, material );
scene.add(torus);


// Kettle

loader.load( 'models/Kettle.glb', function ( gltf ) {

  gltf.scene.rotation.set(0, 0, 0);
  gltf.scene.scale.set(100, 100, 100);
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );



// Helpers

const showHelpers = true;

const lightHelper = new THREE.PointLightHelper(pointLight);

const gridHelper = new THREE.GridHelper(200, 50);

if (showHelpers) {
  scene.add(lightHelper, gridHelper);
}


// Orbit Controls

const controls = new OrbitControls( camera, renderer.domElement );

// Scroll Animation

function scrollAnimate() {

  const t = document.body.getBoundingClientRect().top;

}

document.body.onscroll = scrollAnimate;

// Animation Loop

function animate() {
  requestAnimationFrame( animate);
  torus.rotation.y += 0.1;
  torus.rotation.x += 0.01;

  controls.update();

  renderer.render( scene, camera );
}

animate();


// Content

const contentful = require('contentful')

const client = contentful.createClient({
  space: 'wrvwm704pktc',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'bqf8zKqM0Whl2BIbgYzfgjxRvpaTQpPFTrSZOiMdWeg'
})

client.getContentType('<content_type_id>')
.then((contentType) => console.log(contentType))
.catch(console.error)