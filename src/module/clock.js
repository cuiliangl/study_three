import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const renderer = new THREE.WebGLRenderer()

renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)

const axesHelper = new THREE.AxesHelper(4, 4, 4)
// const geometry = new THREE.SphereGeometry(1, 32, 16)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const mesh = new THREE.Mesh(geometry, material)

// 旋转
// mesh.rotation.set(Math.PI / 4, 0, 0)

scene.add(mesh)
scene.add(camera)
scene.add(axesHelper)

new OrbitControls(camera, renderer.domElement)

const clock = new THREE.Clock()

function animate() {
  let time = clock.getDelta()
  //   console.log(time * 1000)

  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  mesh.rotation.z += 0.01

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
