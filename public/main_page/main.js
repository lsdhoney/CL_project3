import * as THREE from './three.js-master/build/three.module.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from './three.js-master/examples/jsm/loaders/FontLoader.js';


let chain, light1, light2;
let msg;

const canvas = document.querySelector('.webgl')
const clock = new THREE.Clock()
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 5)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOuput = true

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.2;
controls.maxDistance = 5;
controls.update();

init()
function init() {
   
    loadModel();
    addLights();
    addText();
    //animate();
    
    
}


function animate() {


    requestAnimationFrame(animate)

    let time = clock.getElapsedTime()
    light1.position.z = Math.sin(time*0.1)*5
    light1.position.x = Math.cos(time*0.7)*5

    light2.position.x = Math.sin(time*0.1)*5
    light2.position.y = Math.cos(time*0.7)*5
    
    controls.update();   
    renderer.render(scene, camera);

}

animate()


window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //render();
    
}

const loader2 = new FontLoader();


function addLights() {
    // const light = new THREE.DirectionalLight(0xffffff, 1)
    // light.position.set(2, 2, 5)
    // scene.add(light)

      
    light1 = new THREE.PointLight(0xFF0000, 3, 50)
    scene.add(light1)

    light2 = new THREE.PointLight(0xffffff, 1, 50)
    scene.add(light2)
    


}

function loadModel() {
    const loader = new GLTFLoader()
    loader.load('../assets/chain.glb', function (glb) {
        //console.log(glb)
        chain = glb.scene;
        chain.scale.set(0.5, 0.5, 0.5)
        scene.add(chain);
    }, function (xhr) {
        //console.log(xhr.loaded / xhr.total * 100 + "% loaded")
    }, function (error) {
        // console.log('error')
    })
}

function addText() {
    fetch('/msgs')
    .then(resp => resp.json())
    .then(data => {

        //console.log(data.data);
        for (let i = 0; i < data.data.length; i++) {
            let string = data.data[i].msg;

            console.log(data.data[i].msg);


            loader2.load('../assets/GothicPixels_Medium.json', function (font) {

                const matLite = new THREE.MeshBasicMaterial({
                    color: 0xf0f0f0,
                    transparent: true,
                    opacity: 1,
                    side: THREE.DoubleSide
                });

                const message = data.data[i].msg;
                const shapes = font.generateShapes(message, 100);
                const geometry = new THREE.ShapeGeometry(shapes);
                geometry.computeBoundingBox();
                const xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
                let xpos = ((Math.random() - 0.5) * 2) * 3000;
                let ypos = ((Math.random() - 0.5) * 2) * 3000;
                let zpos = ((Math.random() - 0.5) * 2) * 3000;

                geometry.translate(xpos, ypos, zpos);
                

                msg = new THREE.Mesh(geometry, matLite);
                msg.position.z = 0;
                msg.scale.set(0.001, 0.001, 0.001)
                msg.rotation.y = Math.random() *100;
                scene.add(msg);


            });

        }
    })
}