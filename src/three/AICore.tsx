import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../hooks/useMediaQuery';
import ErrorBoundary from '../components/ErrorBoundary';
import { useTheme } from '../context/ThemeContext';

const CoreGeometry = () => {
  const isMobile = useIsMobile();
  const coreRef = useRef<THREE.Mesh>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const coreColor = isDark ? '#3B82F6' : '#2563EB';
  const wireColor = isDark ? '#8B5CF6' : '#7C3AED';
  const ringColor = isDark ? '#06B6D4' : '#0891B2';
  const wireBlending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
  const wireOpacity = isDark ? 0.35 : 0.25;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    // Slow rotation
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.15;
      coreRef.current.rotation.x = time * 0.1;
      
      // Pulse scale slightly
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      coreRef.current.scale.set(pulse, pulse, pulse);

      // React to mouse
      coreRef.current.position.x = THREE.MathUtils.lerp(coreRef.current.position.x, x * 0.5, 0.1);
      coreRef.current.position.y = THREE.MathUtils.lerp(coreRef.current.position.y, y * 0.5, 0.1);
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.y = -time * 0.25;
      outerWireRef.current.rotation.x = -time * 0.08;
      
      // Follow core position
      outerWireRef.current.position.copy(coreRef.current!.position);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.4;
      ringRef.current.rotation.y = time * 0.2;
      
      ringRef.current.position.copy(coreRef.current!.position);
    }
  });

  return (
    <group>
      {/* 1. Interactive Distorted Metallic Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color={coreColor}
          roughness={isDark ? 0.1 : 0.2}
          metalness={isDark ? 0.9 : 0.7}
          distort={0.4}
          speed={2}
          bumpScale={0.05}
        />
      </mesh>

      {/* 2. Outer Cyan/Purple Wireframe Sphere */}
      <mesh ref={outerWireRef}>
        <icosahedronGeometry args={[2.0, isMobile ? 1 : 2]} />
        <meshBasicMaterial
          color={wireColor}
          wireframe={true}
          transparent={true}
          opacity={wireOpacity}
          blending={wireBlending}
        />
      </mesh>

      {/* 3. Orbiting Thin Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.6, 0.02, 8, 64]} />
        <meshBasicMaterial
          color={ringColor}
          transparent={true}
          opacity={isDark ? 0.5 : 0.35}
        />
      </mesh>

      {/* Additional smaller orbiting node */}
      <mesh position={[2.2, 1, -1]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={ringColor} />
      </mesh>
    </group>
  );
};

const AICoreFallback = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      {/* CSS glowing orb fallback */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-cyan opacity-40 blur-[40px] animate-pulse-slow"></div>
      <div className="absolute w-[180px] h-[180px] rounded-full border border-text-primary/10 flex items-center justify-center animate-spin" style={{ animationDuration: '12s' }}>
        <div className="w-[120px] h-[120px] rounded-full border border-text-primary/5 border-dashed"></div>
      </div>
    </div>
  );
};

export const AICore = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing min-h-[350px] md:min-h-[500px]">
      {/* Ambient background glow inside the canvas container */}
      <div className={`absolute inset-0 bg-radial-gradient from-accent-purple/5 to-transparent rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-40'}`}></div>

      <ErrorBoundary fallback={<AICoreFallback />}>
        <Suspense fallback={<AICoreFallback />}>
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={isDark ? 0.4 : 0.7} />
            
            {/* Colorful Spotlights representing core illumination */}
            <pointLight position={[10, 10, 10]} intensity={isDark ? 1.5 : 1.2} color={isDark ? "#3B82F6" : "#2563EB"} />
            <pointLight position={[-10, -10, -10]} intensity={isDark ? 1.2 : 0.8} color={isDark ? "#8B5CF6" : "#7C3AED"} />
            <pointLight position={[0, 0, 8]} intensity={isDark ? 1.0 : 0.6} color={isDark ? "#06B6D4" : "#0891B2"} />
            
            <CoreGeometry />

            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default AICore;
