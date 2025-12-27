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

              {/* Page 3: The Phone Screen Content */}
              <div className="h-screen flex items-center justify-center p-10">
                {/* We use 'motion.div' from framer-motion to make the fade-in smooth */}
                <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl max-w-sm border border-white/40 text-center">
                  <div className="w-16 h-1.5 bg-slate-400/30 rounded-full mx-auto mb-6" /> {/* Phone 'Speaker' icon */}
                  
                  <h2 className="text-2xl font-bold text-slate-900">Digital Apostle</h2>
                  <p className="mt-4 text-slate-800 text-sm leading-relaxed">
                    "To always be close to Jesus, that's my life plan." 
                    Explore the intersection of faith and the internet.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <button className="p-4 bg-white/50 rounded-2xl text-xs font-bold hover:bg-white transition-all">
                      Eucharistic Miracles
                    </button>
                    <button className="p-4 bg-white/50 rounded-2xl text-xs font-bold hover:bg-white transition-all">
                      His Legacy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Scroll>

        </ScrollControls>
      </Canvas>
    </main>
  );
}