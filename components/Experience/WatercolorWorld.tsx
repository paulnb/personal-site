// @ts-nocheck
import { useRef } from 'react'
import { Image, Float, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function WatercolorWorld() {
  const scroll = useScroll()
  const mountainRef = useRef()

  useFrame(() => {
    const r2 = scroll.range(0.4, 0.6)
    
    if (mountainRef.current) {
      // This is the "Blur" simulation: Fading out and moving back
      mountainRef.current.material.opacity = 0.8 - (r2 * 0.6)
      mountainRef.current.position.z = -5 - (r2 * 5) 
    }
  })

  return (
    <group>
      <Image 
        ref={mountainRef}
        url="/images/mountains.png" 
        scale={[20, 10]} 
        position={[0, 2, -5]} 
        transparent 
      />
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        <Image url="/images/carlo.png" scale={[3, 4]} position={[0, 0, 0]} transparent />
      </Float>
      <Float speed={3} floatIntensity={2}>
        <Image url="/images/cloud.png" scale={[2.5, 1.2]} position={[-4, -1, 3]} transparent />
      </Float>
    </group>
  )
}