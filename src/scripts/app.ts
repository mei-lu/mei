import * as THREE from "three"

const App = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1 / 1, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(400, 400)

    const heroElement = document.querySelector("#hero-image")

    if (!heroElement) {
        return
    }

    heroElement.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5

    const animate = () => {
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        renderer.render(scene, camera)
    }

    renderer.setAnimationLoop(animate)
}

// Load

document.addEventListener("DOMContentLoaded", () => {
    App()
})
export default {}
