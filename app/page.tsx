'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';

// Import your custom components
// Note: If these files are in 'components/Experience', the path '../components/...' is correct
import WatercolorWorld from '../components/Experience/WatercolorWorld';
import SceneController from '../components/Experience/SceneController';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // This effect ensures the 3D scene only renders on the client (browser)
  // which prevents "Hydration" errors in Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a simple background while the 3D engine is waking up
  if (!mounted) {
    return <div className="h-screen w-full bg-slate-50" />;
  }

  return (
    <main className="h-screen w-full bg-slate-50">
      {/* The Canvas is the container for all Three.js elements. 
        Everything inside here MUST be a 3D component or a R3F helper.
      */}
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        {/* Suspense handles the "Loading" state of your 3D models */}
        <Suspense fallback={null}>
          
          {/* pages={3} means the user can scroll 3 full screen heights */}
          <ScrollControls pages={3} damping={0.2}>
            
            {/* Logic & 3D Objects */}
            <SceneController />
            <WatercolorWorld />

            {/* This layer allows us to put normal HTML/Tailwind on top of the 3D world */}
            <Scroll html>
              <div className="w-screen">
                
                {/* PAGE 1: Intro */}
                <section className="h-screen flex items-end p-10 md:p-20">
                  <div className="max-w-xl bg-white/20 backdrop-blur-md p-8 rounded-2xl">
                    <h1 className="text-5xl font-serif text-slate-900">The Quiet Moments</h1>
                    <p className="mt-4 text-slate-800 font-medium">Some journeys are best shared in silence...</p>
                  </div>
                </section>

                {/* PAGE 2: The Kids Arrive */}
                <section className="h-screen flex items-center justify-start p-10 md:p-20">
                  <div className="max-w-sm bg-white/30 backdrop-blur-md p-6 rounded-xl border border-white/40">
                    <h2 className="text-2xl font-bold text-slate-900">Energy Returns</h2>
                    <p className="mt-2 text-slate-700">The peace of the lake is briefly interrupted by the joy of arrival.</p>
                  </div>
                </section>

                {/* PAGE 3: The Selfie / Final UI */}
                <section className="h-screen flex items-center justify-center p-6">
                  <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl max-w-sm border border-white/40 text-center">
                    <h2 className="text-3xl font-bold text-slate-900">Captured Forever</h2>
                    <p className="mt-4 text-slate-700 leading-relaxed">
                      A digital memory of a physical place. 
                      Welcome to my personal exhibit.
                    </p>
                    <div className="mt-8 flex flex-col gap-3">
                      <button className="py-4 px-6 bg-slate-900 text-white rounded-2xl font-bold hover:scale-105 transition-transform">
                        View Portfolio
                      </button>
                      <button className="py-4 px-6 bg-white/50 text-slate-900 rounded-2xl font-bold hover:bg-white/80 transition-colors">
                        Contact Me
                      </button>
                    </div>
                  </div>
                </section>


              </div>
            </Scroll>

          </ScrollControls>
        </Suspense>
      </Canvas>
    </main>
  );
}