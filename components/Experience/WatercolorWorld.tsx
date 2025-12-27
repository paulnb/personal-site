// @ts-nocheck
import { useRef, useMemo } from 'react'
import { Image, useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function WatercolorWorld() {
  const scroll = useScroll()
  const { camera, size } = useThree() 
  
  const kidsRef = useRef()
  const phoneRef = useRef()
  const benchRef = useRef()
  const mountainRef = useRef()

  // --- CONTAIN MATH (Keep exactly as is) ---
  const bgDepth = -20 
  const distance = camera.position.z - bgDepth 
  const vFov = (camera.fov * Math.PI) / 180
  const visibleHeight = 2 * Math.tan(vFov / 2) * distance
  const visibleWidth = visibleHeight * (size.width / size.height)
  const imageAspectRatio = 1.5 
  const screenAspectRatio = size.width / size.height

  let scaleW, scaleH
  if (screenAspectRatio > imageAspectRatio) {
    scaleH = visibleHeight
    scaleW = scaleH * imageAspectRatio
  } else {
    scaleW = visibleWidth
    scaleH = scaleW / imageAspectRatio
  }
  
  useFrame(() => {
    const r1 = scroll.range(0.2, 0.4)
    const r2 = scroll.range(0.6, 0.8)
    const r3 = scroll.range(0.8, 1.0)

    // KIDS ANIMATION
    if (kidsRef.current) {
      kidsRef.current.position.x = -12 + (r1 * 12)
      kidsRef.current.position.z = 2 - (r1 * 1.5)
      
      // FIX: Base height changed from -1.5 to 1.7
      // (Bench is at 2.2, so 1.7 puts kids' feet on the ground nicely)
      kidsRef.current.position.y = 1.7 + Math.abs(Math.sin(r1 * 20) * 0.2)
      
      kidsRef.current.rotation.z = Math.sin(r1 * 20) * 0.05
    }

    // PHONE POP
    if (phoneRef.current) {
      phoneRef.current.scale.setScalar(r2 * 1.2)
      phoneRef.current.material.opacity = r2
    }
    
    // BENCH FADE
    if (benchRef.current) {
      benchRef.current.material.opacity = 1 - (r3 * 0.5)
    }
  })

  return (
    // GROUP POSITION: Keep this! It's working perfectly.
    <group position={[0, -4.8, 0]}>
      
      <ambientLight intensity={1.5} />

      {/* BACKGROUND */}
      <Image 
        ref={mountainRef}
        url="/images/mountains_only.png" 
        scale={[scaleW, scaleH]} 
        position={[0, 6, bgDepth]} 
        transparent 
      />

      {/* MIDDLE GROUND: Couple
          Position: 2.2 looks perfect in your screenshot.
      */}
      <Image 
        ref={benchRef} 
        url="/images/couple_bench.png" 
        scale={[7, 4.6]} 
        position={[0, 2.2, 0]} 
        transparent 
      />

      {/* FOREGROUND: Kids
          Position: 1.7 (Just below bench seat level)
      */}
      <Image 
        ref={kidsRef} 
        url="/images/kids_running.png" 
        scale={[3, 2]} 
        position={[-12, 1.7, 2]} 
        transparent 
      />

      {/* PHONE FRAME 
          Position: 3.5 (Approx 1.3 units above the bench seat, near Dad's hand)
          Your previous 5.5 might be too high (floating in sky).
      */}
      <Image 
        ref={phoneRef} 
        url="/images/phone_frame.png" 
        scale={[0, 0]} 
        position={[0.5, 3.5, 1]} 
        transparent 
        opacity={0}
      />
    </group>
  )
}