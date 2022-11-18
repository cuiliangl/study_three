import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 1. 创建场景
const scene = new THREE.Scene()

// 2. 创建相机(透视相机)
/**
 * 参数：
 * 1. 垂直视野角度
 * 2. 宽高比
 * 3. 近端面
 * 4. 远端面
 */
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  1,
  1000
)
console.log(camera)

// 设置相机位置
camera.position.set(0, 0, 10)
// 添加到场景
scene.add(camera)

// 创建立方体
const boxGeometry = new THREE.BoxGeometry(3, 3, 3)
console.log(boxGeometry)

// 创建物料
const boxMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' })
console.log(boxMaterial)

// 根据集合体和物料创建网格
const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
console.log(mesh)
// 设置网格位置
// mesh.position.set(5, 0, 0)

// 几何体添加到场景
scene.add(mesh)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
console.log(renderer)

// 设置渲染器大小
renderer.setSize(innerWidth, innerHeight)

// 添加画布
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
/**
 * 参数：
 * 1. 将要被控制的相机
 * 2. 用于事件监听的HTML元素
 */
const orbitControls = new OrbitControls(camera, renderer.domElement)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

function animate() {
  mesh.position.x += 0.01
  mesh.position.y += 0.01
  mesh.position.z += 0.01

  if (mesh.position.x >= 2) {
    mesh.position.x = 0
    mesh.position.y = 0
    mesh.position.z = 0
  }

  // 渲染场景和相机
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
