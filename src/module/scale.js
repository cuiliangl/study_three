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

// 坐标轴
const axesHelper = new THREE.AxesHelper(4, 4, 4)
// 立方体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 物料
const material = new THREE.MeshBasicMaterial({ color: 'red' })
// 网格
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 0, 0)
// 设置缩放
// mesh.scale.set(2, 2, 2)

const orbitControls = new OrbitControls(camera, renderer.domElement)

scene.add(mesh)
scene.add(camera)
scene.add(axesHelper)

function animate() {
  let { x, y, z } = mesh.scale

  mesh.scale.set((x += 0.01), (y += 0.01), (z += 0.01))
  if (mesh.scale.x > 2) {
    mesh.scale.set(0, 0, 0)
  }

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
