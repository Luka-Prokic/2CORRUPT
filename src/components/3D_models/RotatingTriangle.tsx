import React, { useRef } from "react";
import { Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RotatingTriangleProps {
  size?: number;
  color?: string;
  rotationSpeed?: number;
}

// Animated cube component
function AnimatedTriangle({
  size = 1,
  color = "#ff6b6b",
  rotationSpeed = 0.01,
}: RotatingTriangleProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Animation loop
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef}>
      <tetrahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Main component
export default function RotatingTriangle({
  size = 1.5,
  color = "#ff6b6b",
  rotationSpeed = 0.005,
}: RotatingTriangleProps) {
  return (
    <Canvas
      style={{ flex: 1 }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true }}
    >
      <Text
        position={[0, 2, 0]} // x, y, z
        fontSize={0.5}
        color="yellow"
        rotation={[0, 0, Math.PI / 4]} // rotate in radians
        anchorX="center"
        anchorY="middle"
      >
        SPIN
      </Text>
      
      {/* Lighting */}
      <ambientLight intensity={1} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />

      {/* Animated triangle */}
      <AnimatedTriangle
        size={size}
        color={color}
        rotationSpeed={rotationSpeed}
      />

      {/* Orbit controls for touch/mouse interaction */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate={false}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
    </Canvas>
  );
}
