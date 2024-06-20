<template>
  <div id="app">
    <div v-for="n in sceneContainers" :ref="'sceneContainer' + n" class="scene-container" :key="n"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Scene, Group, BufferGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer, BoxGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const sceneContainers = [1, 2]; // 创建两个场景
const scenes = [];
const cameras = [];
const renderers = [];
let controls1, controls2
const initScene = () => {
  sceneContainers.forEach((n) => {
    // 创建渲染器
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth / 2, window.innerHeight)
    renderers.push(renderer)
    // 创建场景
    const scene = new Scene()
    scenes.push(scene)
    // 创建相机
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    cameras.push(camera)
    // 将渲染器添加到 DOM 中
    document.querySelector(`#app > div:nth-child(${n})`).appendChild(renderer.domElement)
    // 第一个场景添加鼠标控制
    if (n === 1) {
      controls1 = new OrbitControls(camera, renderer.domElement)
      controls1.addEventListener('change', syncCameras)
    }
    if (n === 2) {
      controls2 = new OrbitControls(camera, renderer.domElement)
      controls2.addEventListener('change', syncCameras2)
    }
  })
  renderGeometry()
  animate()
}
const renderGeometry = () => {
  scenes.forEach((scene, i) => {
    const geometry = new BoxGeometry()
    const material = new MeshBasicMaterial({ color: i === 0 ? 0x00ff00 : 0xff0000 })
    const cube = new Mesh(geometry, material)
    scene.add(cube)
  })
}
const syncCameras = () => {
  cameras[1].position.copy(cameras[0].position)
  cameras[1].rotation.copy(cameras[0].rotation)
}
const syncCameras2 = () => {
  cameras[0].position.copy(cameras[1].position)
  cameras[0].rotation.copy(cameras[1].rotation)
}
const animate = () => {
  requestAnimationFrame(animate);
  
  renderers.forEach((renderer, index) => {
    renderer.render(scenes[index], cameras[index])
  })
}
onMounted(() => {
  initScene()
})
</script>

<style>
#app {
  display: flex;
}
.scene-container {
  width: 50%;
  height: 100vh;
}
</style>
