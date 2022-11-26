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

//十六进制颜色随机
const color1 = () => {
  const r = Math.floor(Math.random() * 256).toString(16)
  const g = Math.floor(Math.random() * 256).toString(16)
  const b = Math.floor(Math.random() * 256).toString(16)
  const color = `#${`${Array(6).join(0)}${r}${g}${b}`.slice(-6)}`

  return color
}

// 创建50个三角面
for (let i = 0; i < 50; i++) {
  const geometry = new THREE.BufferGeometry()
  const points = new Float32Array(9)

  // 每个面三个点，需要9个坐标位置
  for (let j = 0; j < 9; j++) {
    points[j] = Math.random() * 4 - 2
  }

  const position = new THREE.BufferAttribute(points, 3)
  geometry.setAttribute('position', position)

  const material = new THREE.MeshBasicMaterial({
    color: color1()
    // transparent: true,
    // opacity: 0.5
  })
  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)
}

scene.add(axes)
scene.add(camera)

function animate() {
  control.update()
  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

animate()
