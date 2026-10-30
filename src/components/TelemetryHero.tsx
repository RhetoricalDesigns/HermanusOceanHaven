import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { 
  Wind, 
  Waves, 
  Compass, 
  ShieldCheck, 
  Zap, 
  Clock,
  Eye,
  Activity,
  Navigation,
  Droplets,
  Sunrise,
  Sun,
  Sunset,
  ArrowRight,
  TrendingUp,
  Thermometer,
  Gauge,
  Ship,
  Maximize2,
  ChevronDown,
  Cpu
} from 'lucide-react';
import { getTelemetryAtHour, TelemetryData } from '../services/telemetryService';

interface TelemetryHeroProps {
  onOpenBooking: (tourId?: string, category?: string) => void;
}

type ActivityCategory = 'whale' | 'shark' | 'paragliding' | 'surf-kite';

export const TelemetryHero: React.FC<TelemetryHeroProps> = ({ onOpenBooking }) => {
  // --- Decision Engine State ---
  const [thrillLevel, setThrillLevel] = useState<number>(0.5);
  const [activityType, setActivityType] = useState<ActivityCategory>('whale');
  const [timeWindow, setTimeWindow] = useState<number>(0);
  const [isHudCollapsed, setIsHudCollapsed] = useState(false);
  
  const [hour, setHour] = useState<number>(() => {
    const currentHour = new Date().getHours();
    return (currentHour >= 6 && currentHour <= 18) ? currentHour : 12;
  });
  
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Sync hour with timeWindow
  useEffect(() => {
    if (timeWindow > 0.5) setHour(17);
    else {
      const currentHour = new Date().getHours();
      setHour((currentHour >= 6 && currentHour <= 18) ? currentHour : 12);
    }
  }, [timeWindow]);

  const telemetry = useMemo(() => getTelemetryAtHour(hour), [hour]);

  // --- Expedition Readiness Logic ---
  const missionAnalysis = useMemo(() => {
    let score = 0;
    let recommendation = 'Analyzing...';
    let category: ActivityCategory = 'whale';

    if (activityType === 'paragliding') {
      score = (telemetry.windSpeed >= 5 && telemetry.windSpeed <= 15 ? 45 : 10) + (thrillLevel > 0.6 ? 35 : 15) + 20;
      recommendation = 'Tandem Paragliding';
      category = 'paragliding';
    } else if (activityType === 'whale') {
      score = (telemetry.swellHeight < 1.5 ? 45 : 10) + (thrillLevel < 0.4 ? 35 : 10) + 20;
      recommendation = 'Whale Safari';
      category = 'whale';
    } else if (activityType === 'shark') {
      score = (telemetry.visibility > 8 ? 45 : 15) + (thrillLevel > 0.7 ? 35 : 15) + 20;
      recommendation = 'Shark Cage Diving';
      category = 'shark';
    } else if (activityType === 'surf-kite') {
      score = (telemetry.windSpeed > 15 ? 45 : 10) + (thrillLevel > 0.8 ? 35 : 15) + 20;
      recommendation = 'Kite & Surf School';
      category = 'surf-kite';
    }

    return { score: Math.min(99, Math.max(10, score)), recommendation, category };
  }, [activityType, thrillLevel, telemetry]);

  // --- THREE.JS Graphics Engine ---
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = 800;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.05);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 5, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020617, 1);
    mountRef.current.appendChild(renderer.domElement);

    // 2. Procedural Ocean Plane
    const oceanGeometry = new THREE.PlaneGeometry(100, 100, 128, 128);
    const oceanMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      emissive: 0x0c4a6e,
      emissiveIntensity: 0.5,
    });
    const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
    ocean.rotation.x = -Math.PI / 2;
    scene.add(ocean);

    // 3. Volumetric Current Particles
    const particleCount = 2000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = Math.random() * 0.02 + 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0c4a6e, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x06b6d4, 2, 50);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);

    // 5. 3D Silhouette Group (Whale-like)
    const marineGroup = new THREE.Group();
    const bodyGeo = new THREE.CapsuleGeometry(1, 4, 4, 16);
    const bodyMat = new THREE.MeshBasicMaterial({ color: 0x020617, transparent: true, opacity: 0.8 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.z = Math.PI / 2;
    marineGroup.add(body);
    marineGroup.position.set(-20, -5, -30);
    scene.add(marineGroup);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Animate Ocean Vertices
      const posAttr = oceanGeometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        const z = 0.5 * Math.sin(x * 0.2 + elapsed * 1.5) + 
                  0.3 * Math.cos(y * 0.2 + elapsed * 1.2) * (telemetry.swellHeight);
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;

      // Animate Particles with Cursor Attraction
      const pPos = particleGeometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        
        // Soft attraction to mouse
        const dx = (mouseRef.current.x * 20) - positions[i * 3];
        const dz = (mouseRef.current.y * -20) - positions[i * 3 + 2];
        positions[i * 3] += dx * 0.005;
        positions[i * 3 + 2] += dz * 0.005;

        if (positions[i * 3 + 1] > 15) positions[i * 3 + 1] = -15;
      }
      pPos.needsUpdate = true;

      // Camera Damping (Depth adjustment based on Submersion/Activity)
      const targetY = activityType === 'shark' ? -2 : 6;
      const targetZ = thrillLevel > 0.7 ? 10 : 18;
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
      camera.lookAt(0, 0, 0);

      // Animate Marine Entity
      marineGroup.position.x += 0.02 * (telemetry.podsActive + 1);
      marineGroup.position.y = -5 + Math.sin(elapsed) * 1.5;
      if (marineGroup.position.x > 40) marineGroup.position.x = -40;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      const w = mountRef.current?.clientWidth || width;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    // Mouse Move
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      oceanGeometry.dispose();
      oceanMaterial.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, [telemetry, thrillLevel, activityType]);

  return (
    <section className="relative w-full h-[800px] overflow-hidden bg-[#020617] text-white font-sans selection:bg-cyan-500/30">
      
      {/* 1. 3D IMMERSIVE VIEWPORT */}
      <div ref={mountRef} className="absolute inset-0 z-0" />
      
      {/* Precision Scrims */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#020617]/80 via-transparent to-[#020617] pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.1)_0%,transparent_70%)] pointer-events-none" />

      {/* 2. SPATIAL HUD OVERLAY */}
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 py-10 flex flex-col justify-between">
        
        {/* Top Operational Strip */}
        <div className="flex items-start justify-between border-b border-white/5 pb-8">
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] mb-1">Biosphere Link</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${telemetry.status === 'CLEARED FOR DEPARTURE' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500 shadow-[0_0_10px_#f59e0b]'}`} />
                <span className="text-xs font-mono font-black uppercase tracking-tight">{telemetry.status}</span>
              </div>
            </div>
            <div className="hidden md:flex flex-col border-l border-white/10 pl-10">
               <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] mb-1">Coordinates</span>
               <span className="text-xs font-mono font-bold text-cyan-400">34.4215°S · 19.2486°E</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right">
                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Local Time</span>
                <span className="text-2xl font-mono font-black tabular-nums tracking-tighter text-white">{telemetry.time}</span>
             </div>
             <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                <Cpu className="w-6 h-6 text-cyan-500" />
             </div>
          </div>
        </div>

        {/* Central Core Console */}
        <div className="flex-1 flex flex-col items-center justify-center">
           <AnimatePresence mode="wait">
             {!isHudCollapsed ? (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="w-full grid grid-cols-1 lg:grid-cols-3 gap-16 items-center"
               >
                 {/* Left: Input Parameters */}
                 <div className="bg-slate-950/40 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] space-y-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                       <Maximize2 className="w-4 h-4 text-cyan-500" />
                       <h3 className="text-xs font-mono font-bold text-white uppercase tracking-[0.5em]">Command Input</h3>
                    </div>

                    <div className="space-y-4">
                       <label className="flex justify-between text-[10px] font-mono font-bold text-slate-500 uppercase">
                          <span>Thrill Level</span>
                          <span className="text-cyan-400">{Math.round(thrillLevel * 100)}%</span>
                       </label>
                       <input 
                         type="range" min="0" max="1" step="0.01" value={thrillLevel} 
                         onChange={(e) => setThrillLevel(parseFloat(e.target.value))}
                         className="w-full accent-cyan-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                       />
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Expedition Type</label>
                       <div className="grid grid-cols-2 gap-2">
                          {(['whale', 'shark', 'paragliding', 'surf-kite'] as ActivityCategory[]).map(type => (
                            <button
                              key={type}
                              onClick={() => setActivityType(type)}
                              className={`py-3 rounded-2xl border text-[9px] font-mono font-bold uppercase transition-all ${activityType === type ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
                            >
                              {type.replace('-', ' & ')}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Mission Window</label>
                       <div className="flex gap-2 p-1 bg-black/20 rounded-2xl border border-white/5">
                          <button onClick={() => setTimeWindow(0)} className={`flex-1 py-2 rounded-xl text-[9px] font-mono font-bold uppercase transition-all ${timeWindow === 0 ? 'bg-white/10 text-white' : 'text-slate-500'}`}>Current</button>
                          <button onClick={() => setTimeWindow(1)} className={`flex-1 py-2 rounded-xl text-[9px] font-mono font-bold uppercase transition-all ${timeWindow === 1 ? 'bg-white/10 text-white' : 'text-slate-500'}`}>Golden</button>
                       </div>
                    </div>
                 </div>

                 {/* Center: The Oracle Dial */}
                 <div className="relative flex flex-col items-center">
                    <div className="relative w-72 h-72 flex items-center justify-center">
                       <motion.div 
                         animate={{ rotate: 360 }}
                         transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                         className="absolute inset-0 border-2 border-white/5 rounded-full border-dashed" 
                       />
                       <div className="relative w-56 h-56 rounded-full bg-cyan-500/5 backdrop-blur-3xl border border-cyan-500/20 flex flex-col items-center justify-center text-center p-10">
                          <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-[0.4em] mb-3">Match Score</span>
                          <motion.div 
                            key={missionAnalysis.score}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-7xl font-black font-mono tracking-tighter"
                          >
                            {missionAnalysis.score}<span className="text-xl opacity-40">%</span>
                          </motion.div>
                          <span className="mt-2 text-[10px] font-mono font-bold text-slate-500 uppercase leading-tight">Systems Nominal</span>
                       </div>
                    </div>
                    <div className="mt-8 text-center space-y-2">
                       <h2 className="text-4xl font-black font-display tracking-tight uppercase leading-none">
                          The <span className="text-cyan-400">Deep Oracle.</span>
                       </h2>
                       <p className="text-xs font-mono text-slate-500 tracking-[0.3em] uppercase">Expedition Recommendation Engine</p>
                    </div>
                 </div>

                 {/* Right: Final Call */}
                 <div className="space-y-8">
                    <div className="p-8 bg-slate-950/40 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl">
                       <span className="text-[10px] font-mono font-bold text-cyan-500 uppercase tracking-[0.4em] block mb-4">Calculated Outcome</span>
                       <h4 className="text-2xl font-black uppercase mb-3 leading-tight">{missionAnalysis.recommendation}</h4>
                       <p className="text-sm text-slate-400 font-light leading-relaxed mb-8">
                          Cross-referencing {telemetry.windSpeed}kt wind vectors with {telemetry.swellHeight}m surface swells. Optimal mission window identified.
                       </p>
                       <button
                         onClick={() => onOpenBooking(undefined, missionAnalysis.category)}
                         className="group w-full py-6 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-2xl font-black font-mono text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                       >
                          Authorize Launch
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                       </button>
                    </div>
                 </div>
               </motion.div>
             ) : (
               <motion.button
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 onClick={() => setIsHudCollapsed(false)}
                 className="p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-3xl group"
               >
                 <Maximize2 className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
               </motion.button>
             )}
           </AnimatePresence>
        </div>

        {/* Bottom Detailed Telemetry Array */}
        <div className="flex flex-col gap-6">
           <div className="flex items-center justify-between">
              <button 
                onClick={() => setIsHudCollapsed(!isHudCollapsed)}
                className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.4em] hover:text-cyan-400 transition-colors"
              >
                 {isHudCollapsed ? 'Restore Command Hud' : 'Collapse Console View'}
                 <ChevronDown className={`w-4 h-4 transition-transform ${isHudCollapsed ? 'rotate-180' : ''}`} />
              </button>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-600 uppercase">Station</span>
                    <span className="text-[10px] font-mono font-bold text-white uppercase">HWH-OMEGA-01</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-600 uppercase">Feed</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase">Active</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Wind Vector', val: `${telemetry.windSpeed} kts`, icon: Wind, color: 'text-cyan-400' },
                { label: 'Swell Period', val: `${telemetry.swellPeriod} s`, icon: Waves, color: 'text-teal-400' },
                { label: 'Vis Clarity', val: `${telemetry.visibility} m`, icon: Eye, color: 'text-indigo-400' },
                { label: 'Sea Temp', val: `${telemetry.waterTemperatureCelsius}°C`, icon: Thermometer, color: 'text-orange-400' },
                { label: 'Bio Density', val: `0${telemetry.podsActive} Pods`, icon: Activity, color: 'text-pink-400' },
                { label: 'Atm Pressure', val: `${telemetry.atmosphericPressureHpa} hPa`, icon: Gauge, color: 'text-emerald-400' }
              ].map((w, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-xl group hover:bg-white/10 transition-all">
                   <div className="flex items-center justify-between mb-3">
                      <w.icon className={`w-4 h-4 ${w.color}`} />
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{w.label}</span>
                   </div>
                   <span className="text-xl font-mono font-black tracking-tighter tabular-nums">{w.val}</span>
                </div>
              ))}
           </div>
        </div>

      </div>

    </section>
  );
};
