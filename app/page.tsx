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
                
                {/* PAGE 1: Intro Section */}
                <section className="h-screen flex items-end p-10 md:p-20">
                  <div className="max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-serif text-slate-800 opacity-90 leading-tight">
                      A Prayerful <br /> Journey
                    </h1>
                    <p className="mt-4 text-slate-600 font-medium">Scroll to explore</p>
                  </div>
                </section>

                {/* PAGE 2: The Transition Space */}
                <section className="h-screen" />

                {/* PAGE 3: The Phone Screen / Final Exhibit */}
                <section className="h-screen flex items-center justify-center p-6">
                  <div className="bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl max-w-sm border border-white/40 text-center">
                    {/* Visual hint that this is a "Phone" screen */}
                    <div className="w-16 h-1 bg-slate-400/20 rounded-full mx-auto mb-8" />
                    
                    <h2 className="text-2xl font-bold text-slate-900">Digital Apostle</h2>
                    <p className="mt-4 text-slate-700 text-sm leading-relaxed">
                      "The more Eucharist we receive, the more we will become like Jesus, 
                      so that on earth we will have a foretaste of heaven."
                    </p>
                    
                    <div className="grid grid-cols-1 gap-3 mt-10">
                      <button className="py-4 px-6 bg-blue-600/10 hover:bg-blue-600/20 text-blue-900 rounded-2xl text-xs font-bold transition-all uppercase tracking-widest">
                        Eucharistic Miracles
                      </button>
                      <button className="py-4 px-6 bg-slate-900/5 hover:bg-slate-900/10 text-slate-900 rounded-2xl text-xs font-bold transition-all uppercase tracking-widest">
                        The Legacy
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