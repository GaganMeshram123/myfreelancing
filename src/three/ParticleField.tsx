import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useIsMobile } from '../hooks/useMediaQuery';
import ErrorBoundary from '../components/ErrorBoundary';
import { useTheme } from '../context/ThemeContext';

const Particles = () => {
  const isMobile = useIsMobile();
  const count = isMobile ? 60 : 180;
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { theme } = useTheme();

  // Theme-specific configurations
  const isDark = theme === 'dark';
  const particleColor = isDark ? '#3B82F6' : '#2563EB';
  const lineColor = isDark ? '#8B5CF6' : '#7C3AED';
  const blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
  const lineOpacity = isDark ? 0.15 : 0.08;
  const particleOpacity = isDark ? 0.6 : 0.45;

  // Generate random points in a 3D volume
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    return [pos, vel];
  }, [count]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = positionsAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3] += velocities[i * 3];
      array[i * 3 + 1] += velocities[i * 3 + 1];
      array[i * 3 + 2] += velocities[i * 3 + 2];

      const bounds = 7.5;
      if (Math.abs(array[i * 3]) > bounds) velocities[i * 3] *= -1;
      if (Math.abs(array[i * 3 + 1]) > bounds) velocities[i * 3 + 1] *= -1;
      if (Math.abs(array[i * 3 + 2]) > bounds) velocities[i * 3 + 2] *= -1;
    }

    positionsAttr.needsUpdate = true;

    // Draw lines between close particles
    if (linesRef.current) {
      const linePositions = [];
      const threshold = 2.5;

      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = array[i * 3] - array[j * 3];
          const dy = array[i * 3 + 1] - array[j * 3 + 1];
          const dz = array[i * 3 + 2] - array[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < threshold) {
            linePositions.push(array[i * 3], array[i * 3 + 1], array[i * 3 + 2]);
            linePositions.push(array[j * 3], array[j * 3 + 1], array[j * 3 + 2]);
          }
        }
      }

      const lineGeom = linesRef.current.geometry;
      lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeom.attributes.position.needsUpdate = true;
    }

    // Camera tilt effect
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 1.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          color={particleColor}
          size={isMobile ? 0.05 : 0.08}
          sizeAttenuation={true}
          transparent={true}
          opacity={particleOpacity}
          depthWrite={false}
          blending={blending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color={lineColor}
          transparent={true}
          opacity={lineOpacity}
          depthWrite={false}
          blending={blending}
        />
      </lineSegments>
    </>
  );
};

export const ParticleField = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 -z-10 w-full h-full bg-transparent overflow-hidden pointer-events-none">
      {/* Background soft glowing lights */}
      <div 
        className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow transition-colors duration-500 ${
          isDark ? 'bg-accent-blue/10' : 'bg-accent-blue/[0.04]'
        }`}
      ></div>
      <div 
        className={`absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transform translate-x-1/2 translate-y-1/2 animate-pulse-slow transition-colors duration-500 ${
          isDark ? 'bg-accent-purple/10' : 'bg-accent-purple/[0.04]'
        }`}
        style={{ animationDelay: '2s' }}
      ></div>

      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={isDark ? 0.5 : 0.8} />
            <directionalLight position={[2, 2, 5]} intensity={isDark ? 1 : 1.5} />
            <Particles />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ParticleField;
