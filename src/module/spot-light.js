import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.physicallyCorrectLights = true
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
scene.add(camera)

const geometry = new THREE.SphereGeometry(0.5, 20, 20)
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(geometry, material)
sphere.castShadow = true
sphere.receiveShadow = false
scene.add(sphere)

const planeGametory = new THREE.PlaneGeometry(15, 15, 20, 20)
const plane = new THREE.Mesh(planeGametory, material)
plane.position.set(0, -2, 0)
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true
scene.add(plane)

const light = new THREE.AmbientLight(0xffffff)
scene.add(light)

const spot = new THREE.SpotLight(0xffffff, 4)
spot.position.set(1, 1, 1)
spot.castShadow = true
spot.target = sphere
spot.distance = 20
spot.penumbra = 0.6
spot.decay = 0
// spot.intensity = 4
spot.shadow.camera.near = 0.5
spot.shadow.camera.far = 500
scene.add(spot)

const axes = new THREE.AxesHelper(4, 4, 4)
scene.add(axes)

const helper = new THREE.CameraHelper(spot.shadow.camera)
scene.add(helper)

const spotLightHelper = new THREE.SpotLightHelper(spot)
// scene.add(spotLightHelper)

const control = new OrbitControls(camera, renderer.domElement)
control.enableDamping = true

function animate() {
  control.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
