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

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('../images/min-mi.png')
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({
  //   color: 'red',
  map: texture
  //   transparent: true
  //   opacity: 0.5
})

const mesh = new THREE.Mesh(geometry, material)
const axes = new THREE.AxesHelper(4, 4, 4)

// 环境光
const light = new THREE.AmbientLight(0x404040, 2)
console.log(light)

// 平行光
const directionalLight = new THREE.DirectionalLight(0x404040, 7)
directionalLight.position.set(10, 10, 10)

scene.add(axes)
scene.add(mesh)
scene.add(camera)
// scene.add(light)
scene.add(directionalLight)

// const ponitLight = new THREE.PointLight(0xff0000, 1, 100)
// ponitLight.position.set(10, 10, 10)
// scene.add(ponitLight)

const control = new OrbitControls(camera, renderer.domElement)
control.enableDamping = true

function animate() {
  control.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
