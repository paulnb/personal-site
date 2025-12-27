// src/components/Experience/SceneController.js
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

export default function SceneController() {
  const scroll = useScroll()

  useFrame((state) => {
    // r1 is the first half of the scroll (0 to 0.5)
    // r2 is the second half (0.5 to 1)
    const r1 = scroll.range(0, 0.5)
    const r2 = scroll.range(0.5, 0.5)

    // ROTATION: Orbit camera 45 degrees
    const angle = r1 * Math.PI * 0.25 
    state.camera.position.x = Math.sin(angle) * 10
    state.camera.position.z = Math.cos(angle) * 10
    
    // ZOOM: Move toward the "phone" area
    const zoomTarget = new THREE.Vector3(0.5, -0.2, 5) 
    state.camera.position.lerp(zoomTarget, r2)
    
    state.camera.lookAt(0, 0, 0)
  })

  return null
}