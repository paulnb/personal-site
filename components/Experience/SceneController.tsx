// @ts-nocheck
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

export default function SceneController() {
  const scroll = useScroll()

  useFrame((state) => {
    // r1: First 40% - The Camera Orbits
    // r2: Next 60% - The Camera Dives
    const r1 = scroll.range(0, 0.4)
    const r2 = scroll.range(0.4, 0.6)

    // Orbital movement
    const angle = r1 * Math.PI * 0.15 
    state.camera.position.x = Math.sin(angle) * 10
    state.camera.position.z = Math.cos(angle) * 10
    
    // The "Dive" target - targeting the lower-right area of Carlo
    const zoomPosition = new THREE.Vector3(0.8, -0.5, 2.5) 
    state.camera.position.lerp(zoomPosition, r2)
    
    state.camera.lookAt(0, 0, 0)
  })

  return null
}