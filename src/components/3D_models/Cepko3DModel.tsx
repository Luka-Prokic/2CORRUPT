import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei/native";
import { Platform } from "react-native";
import { Asset } from "expo-asset";
import * as THREE from "three";

// Auto-generated style model loader, adapted to support web (public) and native (assets)
export function Model(props: any) {
  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      setUri('/bottle-cap.glb');
    } else {
      const asset = Asset.fromModule(require('../../../assets/models/bottle-cap.glb'));
      asset.downloadAsync().then(() => setUri(asset.localUri || asset.uri));
    }
  }, []);

  if (!uri) return null;

  const { nodes } = useGLTF(uri) as any;
  const capMesh = nodes.PET_Bottle_Cap as THREE.Mesh;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={capMesh.geometry}
        material={capMesh.material}
        scale={[-0.032, -0.038, -0.032]}
      />
    </group>
  );
}

if (typeof window !== 'undefined') {
  // Preload for web
  try { useGLTF.preload('/bottle-cap.glb'); } catch {}
}

export default function Cepko3DModel() {
  const meshRef = useRef<THREE.Group>(null);

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true }}>
      <ambientLight intensity={1} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Model ref={meshRef} />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom enableRotate />
    </Canvas>
  );
}
