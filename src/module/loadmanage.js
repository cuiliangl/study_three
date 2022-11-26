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

const loadingManageer = new THREE.LoadingManager()

loadingManageer.onStart = function (url, itemsLoaded, itemsTotal) {
  console.log(
    `开始加载：
    开始加载文件：${url}
    目前已记载完：${itemsLoaded} 个
    总共需加载：${itemsTotal} 个
    `
  )
}
loadingManageer.onLoad = () => {
  console.log('全部加载完成')
}
loadingManageer.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(
    `加载进度：
    当前加载的文件：${url}
    目前已记载完：${itemsLoaded} 个
    总共需加载：${itemsTotal} 个
    当前进度：${((itemsLoaded / itemsTotal) * 100).toFixed(2)}% 
  `
  )
}
loadingManageer.onError = url => {
  console.log(
    `加载出错：
    ${url}
    `
  )
}

const textureLoader = new THREE.TextureLoader(loadingManageer)
const texture = textureLoader.load(
  './images/plan/MetalDesignerWeaveSteel002_ROUGHNESS_2K_METALNESS.jpg'
)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  //   color: 'red',
  map: texture
})

const mesh = new THREE.Mesh(geometry, material)

scene.add(axes)
scene.add(camera)
scene.add(mesh)

function animate() {
  control.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
