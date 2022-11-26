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

const axes = new THREE.AxesHelper(4, 4, 4)
const control = new OrbitControls(camera, renderer.domElement)

control.enableDamping = true

// 纹理加载器
const textureLoader = new THREE.TextureLoader()
// 加载img
const texture = textureLoader.load('./images/1x.png')
console.log(texture)

// 放大滤镜
texture.magFilter = THREE.NearestFilter
// 缩小滤镜
texture.minFilter = THREE.NearestFilter

// 纹理属性
const material = new THREE.MeshBasicMaterial({
  map: texture
})
const geometry = new THREE.BoxGeometry(1, 1, 1)
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

scene.add(axes)
scene.add(camera)

function animate() {
  control.update()
  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

animate()
