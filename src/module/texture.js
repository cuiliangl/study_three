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
const texture = textureLoader.load('./images/mi.jpeg')
console.log(texture)

// offset 偏移 0.0--1.0
// texture.offset.x = 0.2
// texture.offset.y = -0.3

// 旋转的中心点
// texture.center.set(0.5, 0.5)

// 一周的弧度是 2PI
// 旋转 单位：弧度
// texture.rotation = Math.PI / 4

// 重复
// texture.repeat.set(2, 4)
// 设置纹理重复的模式
/**
 * ClampToEdgeWrapping: 默认值，纹理中的最后一个像素将延伸到网格的边缘
 * RepeatWrapping: 纹理将简单地重复到无穷大，其实就是面分割成多份重复
 * MirroredRepeatWrapping: 纹理将重复到无穷大，在每次重复时将进行镜像
 */
// texture.wrapS = THREE.RepeatWrapping
// texture.wrapT = THREE.MirroredRepeatWrapping

// console.log(texture.toJSON())

// 纹理属性
const material = new THREE.MeshBasicMaterial({
  // 颜色贴图
  map: texture
  // color: '#049ef4'
})
const geometry = new THREE.BoxGeometry(1, 1, 1)
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// 2. 回调的方式加载
// let material = null
// console.log(textureLoader)
// textureLoader.load(
//   '/images/mi.jpeg',
//   // succ
//   texture => {
//     console.log(texture)
//     material = new THREE.MeshBasicMaterial({
//       map: texture
//     })

//     const mesh = new THREE.Mesh(geometry, material)
//     scene.add(mesh)
//   },
//   // progress
//   event => {
//     console.log(event)
//   },
//   // err
//   err => {
//     console.log(err)
//   }
// )

scene.add(axes)
scene.add(camera)

function animate() {
  control.update()
  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

animate()
