// src/app/page.js
'use client';
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import WatercolorWorld from '@/components/Experience/WatercolorWorld'
import SceneController from '@/components/Experience/SceneController'

export default function Home() {
  return (
    <main className="h-screen w-full bg-slate-100">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        {/* 'pages' determines how long the scroll is. 3 pages = 300vh */}
        <ScrollControls pages={3} damping={0.2}>
          
          <SceneController />
          <WatercolorWorld />

          <Scroll html>
            {/* Standard HTML Content that scrolls with the 3D */}
            <div className="w-full">
              <div className="h-screen flex items-end p-10">
                <h1 className="text-4xl font-serif">A Prayerful Journey...</h1>
              </div>
              <div className="h-[200vh]" /> {/* Spacer for the zoom effect */}
              <div className="h-screen flex items-center justify-center">
                 {/* Your SPA content starts here */}
                 <div className="bg-white/90 p-10 rounded-2xl shadow-xl">
                   <h2>St. Carlo Acutis Digital Exhibit</h2>
                 </div>
              </div>
            </div>
          </Scroll>

        </ScrollControls>
      </Canvas>
    </main>
  )
}