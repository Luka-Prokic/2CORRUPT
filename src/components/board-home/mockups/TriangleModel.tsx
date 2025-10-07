import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface TriangleModelProps {
  color: string;
  size: number;
  rotationSpeed?: number;
  onClick?: () => void;
}

export function TriangleModel({
  color,
  size,
  rotationSpeed = 0.5,
  onClick,
}: TriangleModelProps) {
  const groupRef = useRef<Mesh>(null);

  useFrame((state: any, delta: any) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed; // Rotate around Y-axis
    }
  });

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Main body */}
      <mesh rotation={[0, 0, 0.26]}>
        <cylinderGeometry args={[(2 * size) / 3, (2 * size) / 3, size, 22]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Top container rim */}
      <mesh
        position={[-0.2, size / 2, 0]} // push it just above the main cylinder
        rotation={[0, 0, 0.26]}
      >
        <cylinderGeometry
          args={[
            (2 * size) / 2.8, // slightly wider
            (2 * size) / 2.8,
            size * 0.22, // much shorter
            22,
          ]}
        />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.6}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}
