import gsap from 'gsap'
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
// const geometry = new THREE.SphereGeometry(1, 32, 16)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const mesh = new THREE.Mesh(geometry, material)

// 旋转
// mesh.rotation.set(Math.PI / 4, 0, 0)

scene.add(mesh)
scene.add(camera)
scene.add(axesHelper)

const controls = new OrbitControls(camera, renderer.domElement)

// 开启后必须再动画循环中调用 .update()
// 旋转
// controls.autoRotate = true

// 阻尼 惯性
controls.enableDamping = true
// 阻尼系数 0-1范围
// controls.dampingFactor = 0.03

// 设置动画
const animatePosition = gsap.to(mesh.position, {
  x: 3,
  duration: 3,
  // 往返
  yoyo: true,
  // -1 无限次
  repeat: -1,
  // 动画
  ease: 'back.inOut',
  onStart() {
    console.log('start')
  },
  onComplete() {
    console.log('done')
  }
})

window.addEventListener('dblclick', () => {
  // 双击控制全屏
  if (document.fullscreenElement === null) {
    renderer.domElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

gsap.to(mesh.rotation, {
  x: Math.PI * 2,
  y: Math.PI,
  z: Math.PI,
  duration: 3,
  yoyo: true,
  ease: 'power1.inOut',
  repeat: -1,
  delay: 2
})

function animate() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

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
