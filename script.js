/* global window THREE */

var scene, camera, renderer

function init () {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000)
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
  controls.minDistance = 500
  controls.maxDistance = 1500

  const materialArray = []
  const textureFt = new THREE.TextureLoader().load('/assets/arid2_ft.jpg')
  const textureBk = new THREE.TextureLoader().load('/assets/arid2_bk.jpg')
  const textureUp = new THREE.TextureLoader().load('/assets/arid2_up.jpg')
  const textureDn = new THREE.TextureLoader().load('/assets/arid2_dn.jpg')
  const textureRt = new THREE.TextureLoader().load('/assets/arid2_rt.jpg')
  const textureLf = new THREE.TextureLoader().load('/assets/arid2_lf.jpg')

  materialArray.push(new THREE.MeshBasicMaterial({ map: textureFt }))
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureBk }))
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureUp }))
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureDn }))
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureRt }))
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureLf }))

  materialArray.forEach(material => {
    material.side = THREE.BackSide
  })

  const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000)
  const skybox = new THREE.Mesh(skyboxGeo, materialArray)
  scene.add(skybox)

  animate()
}

function animate () {
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

init()
