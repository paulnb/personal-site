// @ts-nocheck
import { useRef } from 'react'
import { Image, Float, useScroll, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function WatercolorWorld() {
  const scroll = useScroll()
  const mountainRef = useRef()
  const phoneRef = useRef()
  
  // 1. Load the 3D Model
  const { scene } = useGLTF('/models/phone.glb')

  useFrame((state) => {
    const r2 = scroll.range(0.4, 0.6)
    
    // Mountain blur/fade logic
    if (mountainRef.current) {
      mountainRef.current.material.opacity = 0.8 - (r2 * 0.6)
      mountainRef.current.position.z = -5 - (r2 * 5) 
    }

    // 2. Subtle Phone Animation
    if (phoneRef.current) {
      // The phone tilts slightly as you zoom in to catch the light
      phoneRef.current.rotation.y = Math.PI + (r2 * 0.5)
      phoneRef.current.rotation.z = r2 * 0.2
    }
  })

  return (
    <group>
      {/* Background Mountains */}
      <Image 
        ref={mountainRef}
        url="/images/mountains.png" 
        scale={[20, 10]} 
        position={[0, 2, -5]} 
        transparent 
      />

      {/* Carlo stays as a  watercolor cutout */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        <Image url="/images/carlo.png" scale={[3, 4]} position={[0, 0, 0]} transparent />
      </Float>

      {/* 3. The 3D Phone - Positioned where his hand would be */}
      <primitive 
        ref={phoneRef}
        object={scene} 
        scale={1.5} 
        position={[0.8, -0.5, 0.5]} // Adjust this to line up with Carlo's hand
        rotation={[0, Math.PI, 0]} 
      />

      <Float speed={3} floatIntensity={2}>
        <Image url="/images/cloud.png" scale={[2.5, 1.2]} position={[-4, -1, 3]} transparent />
      </Float>
      
      {/* Add a light so we can see the 3D phone's details */}
      <spotLight position={[10, 10, 10]} intensity={2} />
    </group>
  )
}s