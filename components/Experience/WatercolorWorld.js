// src/components/Experience/WatercolorWorld.js
import { Image, Float } from '@react-three/drei'

export default function WatercolorWorld() {
  return (
    <group>
      {/* BACKGROUND: Mountains */}
      <Image 
        url="/images/mountains.png" 
        scale={[20, 10, 1]} 
        position={[0, 2, -5]} 
        transparent 
      />

      {/* MIDDLE GROUND: St. Carlo (The anchor) */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        <Image 
          url="/images/carlo.png" 
          scale={[3, 4, 1]} 
          position={[0, 0, 0]} 
          transparent
        />
      </Float>

      {/* FOREGROUND: Floating Clouds */}
      <Float speed={3} floatIntensity={2}>
        <Image 
          url="/images/cloud.png" 
          scale={[2.5, 1.2, 1]} 
          position={[-4, -1, 3]} 
          transparent
        />
      </Float>
    </group>
  )
}