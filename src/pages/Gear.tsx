import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { Mesh } from "three";

type GearProps = {
  position: [number, number, number];
  name: string;
  radius: number;
  rotationSpeed: number;
  teeth?: number;
  inverse?: boolean;
};

const Gear = ({
  position,
  name,
  radius,
  rotationSpeed,
  inverse,
}: GearProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * delta * (inverse ? -1 : 1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <cylinderGeometry args={[radius, radius, 0.5, 32]} />
      <meshStandardMaterial color={hovered ? "orange" : "silver"} wireframe />

      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-black text-white p-1 rounded text-sm">{name}</div>
        </Html>
      )}
    </mesh>
  );
};

const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#777" />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
    <Floor/>
     <Gear
        radius={1}
        inverse
        position={[0, 0, 0]}
        name="Main Gear"
        rotationSpeed={0.5}
      />
      <Gear
        radius={0.7}
        inverse
        position={[2.2, 0, 0]}
        name="Main Gear"
        rotationSpeed={0.5}
      />
      <Gear
        radius={0.7}
        inverse
        position={[-2.2, 0, 0]}
        name="Secondary Gear 1"
        rotationSpeed={-0.8}
      />
      <Gear
        radius={0.5}
        inverse
        position={[0, 0, 2.2]}
        name="Secondary Gear 2"
        rotationSpeed={0.8}
      />
      <OrbitControls />
    </>
  );
};

// Canvas Wrapper
export default function App() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Scene />
    </Canvas>
  );
}
