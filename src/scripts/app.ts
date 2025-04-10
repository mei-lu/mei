import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export const initHeartScene = () => {
    // Set up scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xfff0f5) // Light pink background

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 5

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const container = document.getElementById("hero-image") as HTMLElement

    // Match canvas size to container size
    const width = 500
    const height = 500

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputEncoding = THREE.sRGBEncoding

    if (container) {
        container.appendChild(renderer.domElement)
    } else {
        console.warn("#hero-image not found, appending to body instead.")
        document.body.appendChild(renderer.domElement)
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false // 🔒 Disable zoom

    // Load the heart model
    const loader = new GLTFLoader()

    // Path to your exported model
    const modelPath = "src/pages/assets/heart_in_love_gtlf.glb" // Update with your file path

    // Create a group to hold the heart and its animation components
    const heartGroup = new THREE.Group()
    scene.add(heartGroup)

    // Load the model
    loader.load(
        modelPath,
        (gltf) => {
            // Success callback
            console.log("Model loaded successfully")

            // Add the model to our group
            heartGroup.add(gltf.scene)

            // Center the model if needed
            const box = new THREE.Box3().setFromObject(gltf.scene)
            const center = box.getCenter(new THREE.Vector3())
            gltf.scene.position.x -= center.x
            gltf.scene.position.y -= center.y
            gltf.scene.position.z -= center.z

            // Scale if needed
            const scale = 1.0 // Adjust as needed
            gltf.scene.scale.set(scale, scale, scale)

            // Adjust material properties if needed
            gltf.scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh

                    // If you want to override materials
                    if (mesh.material) {
                        // For a single material
                        if (!Array.isArray(mesh.material)) {
                            const material =
                                mesh.material as THREE.MeshStandardMaterial
                            material.roughness = 0.0
                            material.metalness = 0.0
                            // Uncomment to override color
                            // material.color.set(0xff69b4); // Hot pink
                        }
                    }
                }
            })

            // Add orbital ring
            const ringGeometry = new THREE.TorusGeometry(2.5, 0.05, 16, 100)
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xff69b4,
                transparent: true,
                opacity: 0.7,
            })
            const ring = new THREE.Mesh(ringGeometry, ringMaterial)
            ring.rotation.x = Math.PI / 3
            heartGroup.add(ring)

            // Add sparkles to the ring
            addSparklesToRing(ring)
        },
        (progress) => {
            // Progress callback
            console.log(
                `Loading: ${((progress.loaded / progress.total) * 100).toFixed(2)}%`
            )
        },
        (error) => {
            // Error callback
            console.error("Error loading model:", error)
        }
    )

    // Create and add sparkles to the ring
    const addSparklesToRing = (ring: THREE.Mesh): void => {
        const sparkleCount = 3
        const sparkles: THREE.Mesh[] = []

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = createSparkle()
            const angle = (i / sparkleCount) * Math.PI * 2

            // Position sparkle on the ring
            const x = Math.cos(angle) * 2.5
            const y = Math.sin(angle) * 2.5 * Math.sin(ring.rotation.x)
            const z = Math.sin(angle) * 2.5 * Math.cos(ring.rotation.x)

            sparkle.position.set(x, y, z)
            heartGroup.add(sparkle)
            sparkles.push(sparkle)
        }

        // Store sparkles in userData for animation
        ;(ring as any).userData.sparkles = sparkles
    }

    // Create a sparkle mesh
    const createSparkle = (): THREE.Mesh => {
        const geometry = new THREE.BufferGeometry()

        // Create a four-pointed star
        const vertices = new Float32Array([
            0,
            0.3,
            0, // Top
            0,
            -0.3,
            0, // Bottom
            0,
            0,
            0, // Center
            0.3,
            0,
            0, // Right
            -0.3,
            0,
            0, // Left
        ])

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(vertices, 3)
        )
        geometry.setIndex([0, 2, 3, 1, 2, 3, 0, 2, 4, 1, 2, 4])

        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
        })

        return new THREE.Mesh(geometry, material)
    }

    // Animation loop
    const animate = (): void => {
        requestAnimationFrame(animate)

        // Rotate the entire heart group
        heartGroup.rotation.y += 0.01

        // Find the ring in our group
        heartGroup.traverse((child) => {
            if (
                child.type === "Mesh" &&
                (child as any).geometry.type === "TorusGeometry"
            ) {
                const ring = child as THREE.Mesh

                // Rotate the ring
                ring.rotation.z += 0.005

                // Animate sparkles if they exist
                const sparkles = (ring as any).userData.sparkles
                if (sparkles) {
                    sparkles.forEach((sparkle: THREE.Mesh, i: number) => {
                        const angle =
                            (i / sparkles.length) * Math.PI * 2 +
                            ring.rotation.z
                        const x = Math.cos(angle) * 2.5
                        const y =
                            Math.sin(angle) * 2.5 * Math.sin(ring.rotation.x)
                        const z =
                            Math.sin(angle) * 2.5 * Math.cos(ring.rotation.x)

                        sparkle.position.set(x, y, z)
                        sparkle.rotation.z += 0.02

                        // Pulsate the sparkles
                        const scale =
                            0.2 + 0.1 * Math.sin(Date.now() * 0.005 + i)
                        sparkle.scale.set(scale, scale, scale)
                    })
                }
            }
        })

        controls.update()
        renderer.render(scene, camera)
    }

    // Handle window resize
    // window.addEventListener("resize", () => {
    //     camera.aspect = window.innerWidth / window.innerHeight
    //     camera.updateProjectionMatrix()
    //     renderer.setSize(window.innerWidth, window.innerHeight)
    // })

    // Start the animation
    animate()
}
