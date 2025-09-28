import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei/native";
import * as THREE from "three";
import { useTheme } from "../../config/ThemeContext";

interface SpinTriangleProps {
  size?: number;
  color?: string;
  idleRotationSpeed?: number;
  spinSpeed?: number;
}

function AnimatedSpinTriangle({
  size = 1,
  color = "#ff6b6b",
  idleRotationSpeed = 0.005,
  spinSpeed = 0.1,
}: SpinTriangleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinProgress, setSpinProgress] = useState(0);
  const { theme } = useTheme();

  // Handle click: trigger spin
  const handleClick = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      setSpinProgress(0);
    }
  };

  // Animation loop
  useFrame(() => {
    if (!meshRef.current) return;

    if (isSpinning) {
      meshRef.current.rotation.y += spinSpeed;
      setSpinProgress((p) => p + spinSpeed);

      // Stop spinning after 2π radians (360°)
      if (spinProgress + spinSpeed >= Math.PI * 2) {
        setIsSpinning(false);
        setSpinProgress(0);
      }
    } else {
      // Idle rotation
      meshRef.current.rotation.x += idleRotationSpeed;
      meshRef.current.rotation.y += idleRotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} onPointerDown={handleClick} castShadow receiveShadow>
      <tetrahedronGeometry args={[size, 6]} />
      <meshPhysicalMaterial
        color={color}
        metalness={1} // medium metallic
        roughness={0.6}
      />
      <Edges color={theme.border} scale={1} />
    </mesh>
  );
}

// Main component
export default function SpinTriangle({
  size = 1.5,
  color = "#ff6b6b",
  idleRotationSpeed = 0.005,
  spinSpeed = 0.1,
}: SpinTriangleProps) {
  return (
    <Canvas
      style={{ flex: 1 }}
      camera={{ position: [0, 0, 5], fov: 80 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.5} />

      <pointLight position={[-3, 1, 3]} intensity={1} />
      <pointLight position={[0, 1, 3]} intensity={5} />
      <pointLight position={[3, 1, 3]} intensity={1} />

      {/* Triangle */}
      <AnimatedSpinTriangle
        size={size}
        color={color}
        idleRotationSpeed={idleRotationSpeed}
        spinSpeed={spinSpeed}
      />
      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
    </Canvas>
  );
}
