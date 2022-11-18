import gsap from 'gsap'
import * as THREE from 'three'
import * as dat from 'dat.gui'
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

// 开启后必须再动画循环中调用 .update()
// 旋转
// controls.autoRotate = true

// 阻尼 惯性
controls.enableDamping = true
// 阻尼系数 0-1范围
// controls.dampingFactor = 0.03

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

const gui = new dat.GUI()
gui
  .add(mesh.position, 'x')
  .min(0)
  .max(3)
  .step(0.01)
  .name('移动x轴')
  .onChange(val => {
    console.log(val)
  })
  .onFinishChange(val => {
    console.log('完全停下来', val)
  })

// 调色板
const palette = {
  color1: '#FF0000', // CSS string
  color2: [0, 128, 255], // RGB array
  color3: [0, 128, 255, 0.3], // RGB with alpha
  color4: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
}
gui
  .addColor(palette, 'color1')
  .name('颜色')
  .onChange(val => {
    console.log(val)
    material.color.set(val)
  })

gui.add(mesh, 'visible').name('是否显示')

const btns = {
  handle() {
    gsap.to(mesh.position, {
      x: 3,
      duration: 3,
      yoyo: true,
      repeat: 5
    })
  }
}
gui.add(btns, 'handle').name('按钮组')

const folder = gui.addFolder('设置立方体')
folder.add(mesh.material, 'wireframe')
