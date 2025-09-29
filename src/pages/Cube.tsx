import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { DirectionalLight, Mesh } from "three";

const RotatingCube = ({ pos, crl }: { pos: [number, number, number]; crl: string }) => {
  const cuberef = useRef<Mesh>(null!);
  const [depthValue, setDepthValue] = useState(1);

  useFrame(() => {
    // cuberef.current.rotation.x += delta;
    // cuberef.current.rotation.y += delta;

    setDepthValue((d) => (d < 3 ? d + 0.1 : d));
  });

  return (
    <group position={pos} ref={cuberef}>
      <mesh>
        <boxGeometry args={[2.5, 2.5, Math.floor(depthValue),2, 2, 3]} />
        <meshStandardMaterial color={crl} wireframe  />
      </mesh>

      <mesh scale={[1.001, 1.001, 1.001]}>
        <boxGeometry args={[2, 2, 2, Math.floor(depthValue), 2, 3]} />
        <meshBasicMaterial  color="green" />
      </mesh>
    </group>
  );
};

const Scene = () => {
  const directionalLightRef = useRef<DirectionalLight>(null!);

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        position={[5, 10, 5]}
        intensity={0.5}
      />
      <ambientLight intensity={0.1} />

      <RotatingCube pos={[0, 0, 0]} crl="#A8FBD3" />

      <OrbitControls enableZoom />
    </>
  );
};
export default function Cube() {
  return (
<Canvas camera={{ position: [5, 4, 6], fov: 50 }}>
      <Scene />
    </Canvas>
  );
}
