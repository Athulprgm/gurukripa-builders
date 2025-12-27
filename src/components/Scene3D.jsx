import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// A sleek, architectural wireframe block representing construction
const ArchitectBlock = ({ position, scale = 1, delay = 0 }) => {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Gentle floating and floating rotation
    mesh.current.position.y = position[1] + Math.sin(t * 0.3 + delay) * 0.3;
    mesh.current.rotation.x = Math.sin(t * 0.1 + delay) * 0.1;
    mesh.current.rotation.y += 0.005;
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={mesh}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        {/* Wireframe look for blueprint/architectural feel */}
        <meshStandardMaterial
          color="#4ade80" // Greenish tint
          wireframe={true}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Internal Solid Core */}
      <mesh scale={[0.8, 0.8, 0.8]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#1F3D2B" // Deep green brand color
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

// Abstract collection of blocks forming a structure
const ConstructionScene = () => {
  const blocks = useMemo(() => {
    return [
      { pos: [0, 0, 0], scale: 1.2, delay: 0 },
      { pos: [-2, 1.5, -1], scale: 0.8, delay: 1 },
      { pos: [2.5, -1, 1], scale: 1, delay: 2 },
      { pos: [-1.5, -2, 0.5], scale: 0.6, delay: 3 },
      { pos: [1.5, 2, -1.5], scale: 0.7, delay: 4 },
    ];
  }, []);

  return (
    <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
      {blocks.map((block, i) => (
        <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <ArchitectBlock
            position={block.pos}
            scale={block.scale}
            delay={block.delay}
          />
        </Float>
      ))}
    </group>
  );
};

const Scene3D = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -5, -10]} intensity={1} color="#4ade80" />

        <ConstructionScene />

        <Environment preset="city" />
        {/* Subtle Fog for depth */}
        <fog attach="fog" args={["#0A120D", 5, 25]} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
