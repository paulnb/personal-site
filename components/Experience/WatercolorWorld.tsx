// @ts-nocheck
import { useRef } from 'react'
import { Image, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function WatercolorWorld() {
  const scroll = useScroll()
  const kidsRef = useRef()
  const phoneRef = useRef()
  const benchRef = useRef()

  useFrame(() => {
    const r1 = scroll.range(0.2, 0.4) // Kids running in
    const r2 = scroll.range(0.6, 0.8) // Phone appears
    const r3 = scroll.range(0.8, 1.0) // Final zoom blur

    // KIDS RUNNING: Move from left (-10) to the bench (-1)
    if (kidsRef.current) {
      // 1. HORIZONTAL: Move from left (-10) to the bench (-1)
      kidsRef.current.position.x = -10 + (r1 * 9)

      // 2. DEPTH: Move "away" from the camera toward the bench
      kidsRef.current.position.z = 2 - (r1 * 1.5) 

      // 3. THE HOP: Bouncing up and down as they run
      // Math.abs(Math.sin) creates a consistent "bouncing ball" motion
      kidsRef.current.position.y = -1.5 + Math.abs(Math.sin(r1 * 20) * 0.2)
      
      // 4. THE LEAN: Tilting forward slightly to show momentum
      kidsRef.current.rotation.z = Math.sin(r1 * 20) * 0.05
    }
    // THE SELFIE POP: Phone appears in Dad's hand area
    if (phoneRef.current) {
      phoneRef.current.scale.setScalar(r2 * 1.2) // Pops from size 0 to 1.2
      phoneRef.current.material.opacity = r2
    }
    
    // BLUR EFFECT: Bench fades as we "enter" the phone
    if (benchRef.current) {
      benchRef.current.material.opacity = 1 - (r3 * 0.5)
    }
  })

  return (
    <group>
      <ambientLight intensity={1.5} />

      {/* BACKGROUND: Mountains */}
      <Image url="/images/mountains_only.png" scale={[25, 12]} position={[0, 0, -5]} transparent />

      {/* MIDDLE GROUND: Couple on Bench */}
      <Image ref={benchRef} url="/images/couple_bench.png" scale={[6, 4]} position={[0, -1, 0]} transparent />

      {/* FOREGROUND: Kids (Starts off-screen left) */}
      <Image ref={kidsRef} url="/images/kids_running.png" scale={[3, 2]} position={[-10, -1.5, 2]} transparent />

      {/* THE "SELFIE" PHONE: Positioned near Dad's hand */}
      <Image 
        ref={phoneRef} 
        url="/images/phone_frame.png" 
        scale={[0, 0]} 
        position={[0.5, -0.2, 1]} 
        transparent 
        opacity={0}
      />
    </group>
  )
}