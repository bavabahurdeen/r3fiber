import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, useTexture } from "@react-three/drei";

const Earth = ({
  bumpUrl,
  distance,
  size,
  specularUrl,
  speed,
  textureUrl,
}: {
  size: number;
  distance: number;
  speed: number;
  textureUrl: string;
  bumpUrl: string;
  specularUrl: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const angleRef = useRef(0);
  useFrame((_, delta) => {
    angleRef.current += delta * speed;
    const x = Math.cos(angleRef.current) * distance;
    const z = Math.sin(angleRef.current) * distance;

    meshRef.current.position.set(x, 0, z);
  });

  const [texture, bump, specular] = useTexture([
    textureUrl,
    bumpUrl || "",
    specularUrl || "",
  ]);
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshPhongMaterial
        map={texture}
        bumpMap={bump}
        specularMap={specular || null}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
 <pointLight position={[1, 0, 0]} intensity={2} />
      <ambientLight intensity={0.2} />
      <Earth
        size={0.8}
        distance={8}
        speed={0.5}
        textureUrl="https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
        bumpUrl="https://threejs.org/examples/textures/planets/earth_bump_2048.jpg"
        specularUrl="https://threejs.org/examples/textures/planets/earth_specular_2048.jpg"
      />
      <OrbitControls/>
    </>
  );
};
export default function Planets() {
  return (
      <Canvas >
      <Scene />
    </Canvas>
  );
}
