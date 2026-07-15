import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import ErrorBoundary from '../components/ErrorBoundary';

interface ProcessShapeProps {
  activeStep: number;
}

const ProcessShape = ({ activeStep }: ProcessShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // We will hold references to different geometries
  const geometries = useRef<{ [key: number]: THREE.BufferGeometry }>({});

  useEffect(() => {
    // Pre-create geometries to prevent lag during swap
    geometries.current = {
      0: new THREE.SphereGeometry(1.4, 64, 64),
      1: new THREE.IcosahedronGeometry(1.6, 1),
      2: new THREE.TorusKnotGeometry(0.9, 0.28, 120, 16),
      3: new THREE.OctahedronGeometry(1.5, 0),
      4: new THREE.DodecahedronGeometry(1.4, 0),
    };

    return () => {
      Object.values(geometries.current).forEach((g) => g.dispose());
    };
  }, []);

  // Handle geometry swap and GSAP pop animation on step change
  useEffect(() => {
    if (!meshRef.current || !geometries.current[activeStep]) return;

    // Timeline for swap animation
    const tl = gsap.timeline();

    tl.to(meshRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        if (meshRef.current && geometries.current[activeStep]) {
          // Swap geometry
          meshRef.current.geometry = geometries.current[activeStep];
        }
      },
    });

    tl.to(meshRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.4,
      ease: 'back.out(1.7)',
    });

    // Material transitions
    if (materialRef.current) {
      if (activeStep === 0) {
        // Step 1: Smooth matte sphere
        gsap.to(materialRef.current, { roughness: 0.8, metalness: 0.1, color: '#3B82F6', duration: 0.4 });
      } else if (activeStep === 1) {
        // Step 2: Wireframe
        gsap.to(materialRef.current, { roughness: 0.5, metalness: 0.5, color: '#8B5CF6', duration: 0.4 });
      } else if (activeStep === 2) {
        // Step 3: Complex torus knot
        gsap.to(materialRef.current, { roughness: 0.2, metalness: 0.9, color: '#06B6D4', duration: 0.4 });
      } else if (activeStep === 3) {
        // Step 4: Refined object
        gsap.to(materialRef.current, { roughness: 0.1, metalness: 0.8, color: '#3B82F6', duration: 0.4 });
      } else if (activeStep === 4) {
        // Step 5: Glowing completed object
        gsap.to(materialRef.current, { roughness: 0.05, metalness: 0.95, color: '#8B5CF6', duration: 0.4 });
      }
    }
  }, [activeStep]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Rotation is constant
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.x = time * 0.15;

    // React to mouse slightly
    const { x, y } = state.pointer;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.3, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.3, 0.1);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.4, 64, 64]} />
      {activeStep === 4 ? (
        <MeshDistortMaterial
          ref={materialRef}
          color="#8B5CF6"
          roughness={0.05}
          metalness={0.9}
          distort={0.5}
          speed={3}
        />
      ) : (
        <meshStandardMaterial
          ref={materialRef}
          color="#3B82F6"
          roughness={0.8}
          metalness={0.1}
          wireframe={activeStep === 1}
        />
      )}
    </mesh>
  );
};

const ProcessFallback = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none min-h-[300px] md:min-h-[400px]">
      <div className="absolute w-[180px] h-[180px] rounded-2xl bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-cyan opacity-20 blur-[30px] animate-pulse-slow"></div>
      <div className="w-24 h-24 border border-white/5 rounded-xl flex items-center justify-center bg-[#0A0A0A] rotate-45 animate-pulse-slow">
        <span className="text-white/20 text-xs font-mono -rotate-45">PROCESS</span>
      </div>
    </div>
  );
};

export const Process3D = ({ activeStep }: { activeStep: number }) => {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px]">
      <ErrorBoundary fallback={<ProcessFallback />}>
        <Suspense fallback={<ProcessFallback />}>
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#3B82F6" />
            <spotLight position={[0, 5, 0]} intensity={1.2} color="#8B5CF6" />
            
            <ProcessShape activeStep={activeStep} />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Process3D;
