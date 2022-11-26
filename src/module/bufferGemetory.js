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

const axes = new THREE.AxesHelper(3, 3, 3)

const bufferGemetory = new THREE.BufferGeometry()

console.log(bufferGemetory)
// 两个三角面片
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

  1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0
])

const bufferAttribute = new THREE.BufferAttribute(vertices, 3)
console.log(bufferAttribute)
bufferGemetory.setAttribute('position', bufferAttribute)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(bufferGemetory, material)

scene.add(axes)
scene.add(camera)
scene.add(mesh)

const control = new OrbitControls(camera, renderer.domElement)

function animate() {
  control.update()
  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

animate()
