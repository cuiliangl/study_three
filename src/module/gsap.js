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

// 时钟
const clock = new THREE.Clock()

// 设置动画
const animatePosition = gsap.to(mesh.position, {
  x: 4,
  duration: 3,
  // 往返
  yoyo: true,
  // -1 无限次
  repeat: 2,
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
  console.log(animatePosition)
  if (animatePosition.isActive()) {
    animatePosition.pause()
  } else {
    console.log(33)
    animatePosition.resume()
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
  let time = clock.getDelta()

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
