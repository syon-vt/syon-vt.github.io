import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleVortex({ count = 10000, useNormalBlending = false }) {
  const meshRef = useRef();

  // Generate a glowing sphere texture map natively using Canvas2D for the PointsMaterial
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    
    // Create an intense radial gradient for a soft 3D sphere look
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    // Hardened gradient drop-off per user request so the spheres look dense and sharp rather than fuzzy
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)'); 
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.9)'); 
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');     
    
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(32, 32, 32, 0, Math.PI * 2);
    context.fill();
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Initialize random particle positions, velocities, colors, and original resting states
  const [positions, originalPositions, colors, randoms] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const randoms = new Float32Array(count);

    // Core brand colors
    const color1 = new THREE.Color('#00F5FF');
    const color2 = new THREE.Color('#9900cf');

    for (let i = 0; i < count; i++) {
      // Spawn particles in a wider volume to fill the screen beautifully
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 20;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Lock in original resting state to act as a spring-back anchor
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      randoms[i] = Math.random();
    }
    return [positions, originalPositions, colors, randoms];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Slow scenic drift for the entire mesh
    meshRef.current.rotation.y = time * 0.05;
    meshRef.current.rotation.z = time * 0.02;

    const positionsArray = meshRef.current.geometry.attributes.position.array;

    // Accurately map normalized pointer to actual 3D viewport boundaries via R3F viewport scaling
    const mouseX = (state.pointer.x * state.viewport.width) / 2;
    const mouseY = (state.pointer.y * state.viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positionsArray[i3];
      const y = positionsArray[i3 + 1];
      const z = positionsArray[i3 + 2];

      // Calculate distance to pointer gravity well
      const dx = mouseX - x;
      const dy = mouseY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Get original resting states
      const origX = originalPositions[i3];
      const origY = originalPositions[i3 + 1];
      const origZ = originalPositions[i3 + 2];

      // Balanced Attraction Mechanics: Gently increase particle density vigorously near the cursor
      if (dist < 12.0) {
        // Balanced pull factor (gentler than before, stronger than base)
        const pullStrength = (12.0 - dist) * 0.004;
        positionsArray[i3] += dx * pullStrength;
        positionsArray[i3 + 1] += dy * pullStrength;
        
        // Very gently pull into the foreground Z space
        positionsArray[i3 + 2] += (1.5 - z) * 0.02; 
        
        // Apply steady counter-acting spring force so they don't break background geometry completely
        positionsArray[i3] += (origX - x) * 0.02 + Math.sin(time + randoms[i] * 100) * 0.005;
        positionsArray[i3 + 1] += (origY - y) * 0.02 + Math.cos(time + randoms[i] * 100) * 0.005;
      } else {
        // Solid Spring Physics: Elegantly pull particles back to their original defined shape
        positionsArray[i3] += (origX - x) * 0.05 + Math.sin(time + randoms[i] * 100) * 0.01;
        positionsArray[i3 + 1] += (origY - y) * 0.05 + Math.cos(time + randoms[i] * 100) * 0.01;
        positionsArray[i3 + 2] += (origZ - z) * 0.05;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      {/* Render the custom sphere texture with additive blending for an intense glowing blob effect */}
      <pointsMaterial 
        size={0.16} 
        map={circleTexture} 
        vertexColors 
        transparent 
        opacity={0.9} 
        sizeAttenuation 
        blending={useNormalBlending ? THREE.NormalBlending : THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </points>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="w-full h-screen relative flex items-center justify-center">

      {/* Extended height to 150vh so the particles spill completely down behind the next Education page */}
      <div className="absolute top-0 left-0 w-full h-[150vh] z-0 pointer-events-none overflow-hidden">
        <Canvas camera={{ position: [0, 0, 15] }} style={{ pointerEvents: 'none' }} eventSource={document.body} eventPrefix="client">
          <ambientLight intensity={0.5} />
          <ParticleVortex count={9500} /> {/* Render bulk of the universe securely behind the text container */}
        </Canvas>
        {/* Thicker gradient fade at the bottom of the 150vh container */}
        <div className="absolute bottom-0 left-0 w-full h-[80vh] bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-10 pointer-events-none"></div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center max-w-4xl px-12 py-12 rounded-[2rem] bg-[#050505]/20 backdrop-blur-sm border border-white/10 border-b-transparent border-r-transparent shadow-[0_20px_40px_-5px_rgba(0,0,0,0.8)] pointer-events-none"
      >
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,1)]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          SYON VIJAE
        </h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-3xl font-medium text-[#00F5FF] mb-8 tracking-widest uppercase"
        >
          Computer Science Student
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed border-l-2 border-[#00F5FF]/50 pl-6 text-left drop-shadow-sm font-medium"
        >
          Computer Science student at VIT Vellore and Code2Create Finalist. Junior Core member at VinnovateIT, currently contributing to the web migration of campus applications. Focused on Python automation, local AI implementation, and systems optimization.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white font-mono text-xs uppercase tracking-widest pointer-events-none"
      >
        <span>Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>

      {/* Foreground Hover Swarm: Pushes right through and cleanly OVER the frosted glass text box natively! */}
      <div className="absolute top-0 left-0 w-full h-[150vh] z-40 pointer-events-none overflow-hidden">
        <Canvas camera={{ position: [0, 0, 15] }} style={{ pointerEvents: 'none' }} eventSource={document.body} eventPrefix="client" gl={{ alpha: true }}>
          <ambientLight intensity={0.5} />
          {/* Sparse 500-count array precisely interacting with mouse gravity but rendering geometrically ON TOP of HTML texts globally with Normal Blending to natively occlude white text */}
          <ParticleVortex count={500} useNormalBlending={true} />
        </Canvas>
      </div>
    </section>
  );
}
