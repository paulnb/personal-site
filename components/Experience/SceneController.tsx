// @ts-nocheck
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

export default function SceneController() {
  const scroll = useScroll()

  useFrame((state) => {
    const r1 = scroll.range(0, 0.4)
    const r2 = scroll.range(0.4, 0.6)

    // 1. Orbital movement
    const angle = r1 * Math.PI * 0.15 
    state.camera.position.x = Math.sin(angle) * 10
    state.camera.position.z = Math.cos(angle) * 10
    
    // --- THE FIX STARTS HERE ---
    
    // CALCULATING THE TARGET:
    // Your Group is at -4.8. Your Couple is at +2.2 inside it.
    // Real World Height = -4.8 + 2.2 = -2.6.
    
    // 2. The "Dive" target (The Phone)
    // We set Y to -1.3 (Slightly above the couple's faces for the phone)
    // Z is 2.5 (Close up)
    const zoomPosition = new THREE.Vector3(0.5, -1.3, 2.5) 
    
    state.camera.position.lerp(zoomPosition, r2)
    
    // 3. Look At Target (The Couple)
    // We lock the camera's focus exactly on their World Height (-2.6)
    // This creates a perfectly flat, straight-on angle. No looking down.
    state.camera.lookAt(0, -0.7, 0)
  })

  return null
}