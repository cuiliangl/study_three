import * as THREE from 'three'
import * as dat from 'dat.gui'
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

const geometry = new THREE.SphereGeometry(0.5, 32, 32)
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(geometry, material)
sphere.castShadow = true
sphere.receiveShadow = false
scene.add(sphere)

const planeGametory = new THREE.PlaneGeometry(20, 20)
const plane = new THREE.Mesh(planeGametory, material)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true
scene.add(plane)

const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

const pointLight = new THREE.PointLight(0xff0000, 1)
// pointLight.position.set(1, 2, 1)
pointLight.castShadow = true
pointLight.shadow.radius = 20
pointLight.decay = 0
pointLight.shadow.mapSize.set(512, 512)
scene.add(pointLight)

const smallBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0xfff000 })
)
smallBall.position.set(1, 2, 1)
smallBall.add(pointLight)
scene.add(smallBall)

const gui = new dat.GUI()
// gui.add(pointLight.position, 'x').min(-3).max(3).step(0.01)
// gui.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
// gui.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
gui.add(smallBall.position, 'x').min(-3).max(3).step(0.01)
gui.add(smallBall.position, 'y').min(-3).max(3).step(0.01)
gui.add(smallBall.position, 'z').min(-3).max(3).step(0.01)
gui.add(pointLight, 'distance').min(6).max(10).step(0.01)
gui.add(pointLight, 'decay').min(0).max(2).step(0.001)

const control = new OrbitControls(camera, renderer.domElement)
control.enableDamping = true

const axes = new THREE.AxesHelper(4, 4, 4)
scene.add(axes)

const ponitHelper = new THREE.PointLightHelper(pointLight, 1)
scene.add(ponitHelper)

const helper = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(helper)

const clock = new THREE.Clock()

function animate() {
  const time = clock.getElapsedTime()

  smallBall.position.x = Math.sin(time) * 3
  smallBall.position.y = 1.5 + Math.sin(time)
  smallBall.position.z = Math.cos(time) * 3
  control.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
