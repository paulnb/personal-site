'use client';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import WatercolorWorld from '../components/Experience/WatercolorWorld';
import SceneController from '../components/Experience/SceneController';

export default function Home() {
  return (
    <main className="h-screen w-full bg-slate-50">
      {/* The Canvas is our 3D 'Window' */}
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        
        {/* We use 3 pages of scroll length (300vh) */}
        <ScrollControls pages={3} damping={0.2}>
          
          <SceneController />
          <WatercolorWorld />

          {/* This layer allows us to put normal HTML/Tailwind over the 3D */}
          <Scroll html>
            <div className="w-screen">
              {/* Page 1: Intro */}
              <div className="h-screen flex items-end p-20">
                <h1 className="text-5xl font-serif text-slate-800 opacity-80">
                  A Prayerful Journey
                </h1>
              </div>

              {/* Page 2: Spacer for the Zoom/Rotate transition */}
              <div className="h-screen" />

              {/* Page 3: Phone Screen Content */}
              <div className="h-screen flex items-center justify-center p-10">
                <div className="bg-white/70 backdrop-blur-lg p-12 rounded-3xl shadow-2xl max-w-lg border border-white/20">
                  <h2 className="text-3xl font-bold text-slate-900">St. Carlo Acutis</h2>
                  <p className="mt-4 text-slate-700 leading-relaxed">
                    "The highway to heaven." Transitioning from the physical mountains 
                    of Assisi to the digital world he pioneered.
                  </p>
                  <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                    Explore the Exhibit
                  </button>
                </div>
              </div>
            </div>
          </Scroll>

        </ScrollControls>
      </Canvas>
    </main>
  );
}