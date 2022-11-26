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

const axesHelper = new THREE.AxesHelper(3, 3, 3)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)
scene.add(camera)
scene.add(axesHelper)

const controls = new OrbitControls(camera, renderer.domElement)

// 阻尼 惯性
controls.enableDamping = true

window.addEventListener('resize', () => {
  // 1. 更新摄像头
  // 宽高比
  camera.aspect = innerWidth / innerHeight
  // 投影矩阵
  camera.updateProjectionMatrix()

  // 2. 更新渲染器
  renderer.setSize(innerWidth, innerHeight)
  renderer.setPixelRatio(devicePixelRatio)
})

function animate() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
