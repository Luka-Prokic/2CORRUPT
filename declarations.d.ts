declare module 'expo-three' {
  export class Renderer {
    constructor(params: { gl: any });
    setSize(width: number, height: number): void;
    setPixelRatio(ratio: number): void;
    render(scene: any, camera: any): void;
    dispose(): void;
  }
}


declare module '@react-three/drei/native' {
  export * from '@react-three/drei';
}

declare module '*.glb' {
  const src: string;
  export default src;
}

declare module '*.gltf' {
  const src: string;
  export default src;
}

declare module 'base-64';

