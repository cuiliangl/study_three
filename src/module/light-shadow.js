import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 灯光阴影
/**
 * 1. 材质要满足能够对光照有反应
 * 2. 设置渲染器开启阴影的计算： renderer.shadowMap.enabled = true
 * 3. 设置光照投射阴影 light.castShadow = true
 * 4. 设置物体的投射阴影 sphere.castShadow = true
 * 5. 设置物体接收阴影 plane.reactiveShadow = true
 */

const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.VSMShadowMap
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
// 球
const geometry = new THREE.SphereGeometry(0.5, 20, 20)
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(geometry, material)
// 投射阴影
sphere.castShadow = true
scene.add(axes)
scene.add(sphere)

const control = new OrbitControls(camera, renderer.domElement)
control.enableDamping = true

// 创建平面
const planeGametory = new THREE.PlaneGeometry(10, 10, 20, 20)
const plane = new THREE.Mesh(planeGametory, material)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
// 接收阴影
plane.receiveShadow = true
scene.add(plane)

const envLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(envLight)

const light = new THREE.DirectionalLight(0xffffff, 0.5)
light.position.set(1, 1, 1)
light.castShadow = true
// 模糊阴影的边缘
light.shadow.radius = 20
// 2 的幂次: 阴影贴图的分辨率
light.shadow.mapSize.set(2048, 2048)

light.shadow.camera.near = 0.5
light.shadow.camera.far = 500
console.log(light.shadow.camera)
light.shadow.camera.top = 5
light.shadow.camera.bottom = -5
light.shadow.camera.left = -5
light.shadow.camera.right = 5
light.target = sphere
scene.add(light)

const helper = new THREE.CameraHelper(light.shadow.camera)
scene.add(helper)

function animate() {
  control.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
