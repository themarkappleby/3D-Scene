/* global window THREE */

var scene, camera, renderer, controls

function init () {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 30000)
  camera.position.set(0, 0, 100)
  camera.rotation.set(0, -4.72, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.rotateSpeed = 0.1
  controls.update()
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
  controls.minDistance = 500
  controls.maxDistance = 1500

  const materialArray = []
  const textureFt = new THREE.TextureLoader().load('assets/barren_ft.jpg')
  const textureBk = new THREE.TextureLoader().load('assets/barren_bk.jpg')
  const textureUp = new THREE.TextureLoader().load('assets/barren_up.jpg')
  const textureDn = new THREE.TextureLoader().load('assets/barren_dn.jpg')
  const textureRt = new THREE.TextureLoader().load('assets/barren_rt.jpg')
  const textureLf = new THREE.TextureLoader().load('assets/barren_lf.jpg')

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
  scene.add(camera)
  scene.add(skybox)

  animate()
}

function animate () {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

init()
