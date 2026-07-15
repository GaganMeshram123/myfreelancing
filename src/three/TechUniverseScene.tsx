import { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { technologies } from '../data/technologies';
import type { TechnologyData } from '../data/technologies';
import { useIsMobile } from '../hooks/useMediaQuery';
import ErrorBoundary from '../components/ErrorBoundary';
import { useTheme } from '../context/ThemeContext';

interface TechNodeProps {
  tech: TechnologyData;
  position: [number, number, number];
  onHover: (tech: TechnologyData | null) => void;
}

const TechNode = ({ tech, position, onHover }: TechNodeProps) => {
  const textRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const defaultColor = isDark ? '#FFFFFF' : '#18181B';
  const hoverColor = isDark ? '#3B82F6' : '#2563EB';

  useFrame((state) => {
    if (!textRef.current) return;
    
    // Always face the camera (billboarding)
    textRef.current.quaternion.copy(state.camera.quaternion);

    // Subtle floating scale effect when hovered
    const targetScale = hovered ? 1.4 : 1.0;
    textRef.current.scale.x = THREE.MathUtils.lerp(textRef.current.scale.x, targetScale, 0.1);
    textRef.current.scale.y = THREE.MathUtils.lerp(textRef.current.scale.y, targetScale, 0.1);
    textRef.current.scale.z = THREE.MathUtils.lerp(textRef.current.scale.z, targetScale, 0.1);
  });

  return (
    <group position={position}>
      <Text
        ref={textRef}
        fontSize={0.3}
        color={hovered ? hoverColor : defaultColor}
        font="https://fonts.gstatic.com/s/outfit/v11/Q337mx9c9qf8Tyc2alQ.woff" // Standard Outfit font URL or default fallback
        anchorX="center"
        anchorY="middle"
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(tech);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        {tech.name}
      </Text>
    </group>
  );
};

const Universe = ({ onHover }: { onHover: (tech: TechnologyData | null) => void }) => {
  const isMobile = useIsMobile();
  const radius = isMobile ? 3.0 : 4.0;
  const count = technologies.length;

  const nodes = useMemo(() => {
    return technologies.map((tech, i) => {
      // Golden spiral distribution on a sphere
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      return {
        tech,
        position: [x, y, z] as [number, number, number],
      };
    });
  }, [count, radius]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Continuous slow automatic rotation
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <TechNode
          key={i}
          tech={node.tech}
          position={node.position}
          onHover={onHover}
        />
      ))}
    </group>
  );
};

const TechGridFallback = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-8 w-full h-full overflow-y-auto no-scrollbar relative z-10">
      {technologies.map((tech) => (
        <div
          key={tech.name}
          className="glass p-4 rounded-xl flex flex-col justify-between border border-text-primary/5 relative"
        >
          <div className="text-sm font-extrabold text-text-primary">
            {tech.name.toUpperCase()}
          </div>
          <div className="text-[9px] font-mono font-bold tracking-wider text-accent-blue mt-2">
            {tech.category}
          </div>
        </div>
      ))}
    </div>
  );
};

export const TechUniverseScene = () => {
  const [hoveredTech, setHoveredTech] = useState<TechnologyData | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="w-full h-full relative">
      {/* Tech Overlay info */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 transition-all duration-300">
        <div className="h-16 flex flex-col justify-center items-center">
          {hoveredTech ? (
            <>
              <h4 className="text-xl font-bold tracking-widest text-accent-blue animate-pulse">
                {hoveredTech.name.toUpperCase()}
              </h4>
              <p className="text-xs text-text-secondary tracking-widest mt-1">
                {hoveredTech.category}
              </p>
            </>
          ) : (
            <p className="text-xs tracking-widest uppercase text-text-secondary opacity-60">
              DRAG TO ROTATE • HOVER TO EXPLORE
            </p>
          )}
        </div>
      </div>

      <ErrorBoundary fallback={<TechGridFallback />}>
        <Suspense fallback={<TechGridFallback />}>
          <Canvas
            camera={{ position: [0, 0, 6.5], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={isDark ? 0.5 : 0.8} />
            <pointLight position={[5, 5, 5]} intensity={isDark ? 1.0 : 1.2} color={isDark ? "#8B5CF6" : "#7C3AED"} />
            <pointLight position={[-5, -5, -5]} intensity={isDark ? 1.0 : 0.8} color={isDark ? "#3B82F6" : "#2563EB"} />
            
            <Universe onHover={setHoveredTech} />
            
            <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TechUniverseScene;
